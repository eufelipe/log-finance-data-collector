import { CVMFinancialDataDownloader, DownloadDFPInput } from "@/domain";
import { ServiceFactory } from "@/factories";

type DownloadInput = {
  url: string;
  file: string;
  output: string;
  startYear: number;
  endYear: number;
};

const BASE_CVM_URL = "https://dados.cvm.gov.br/dados/CIA_ABERTA/DOC";
const YEAR_KEY = "{YEAR}";
const BASE_DIR = "DATA/raw_data_cvm";
const TEMP_DIR = "DATA/temp";

const httpClient = ServiceFactory.createHttpClient();
const fileService = ServiceFactory.createFileService();
const pathService = ServiceFactory.createPathService();
const zipService = ServiceFactory.createZipService();

const downloader = new CVMFinancialDataDownloader(
  httpClient,
  fileService,
  zipService,
  pathService,
  TEMP_DIR
);

function createDownloadInput(
  baseURL: string,
  type: string,
  start?: number,
  end?: number
): DownloadInput {
  const url = `${baseURL}/${type}/DADOS/`;
  const file = `${type}_cia_aberta_${YEAR_KEY}.zip`;
  const fileName = type.toLowerCase();

  const output = `${BASE_DIR}/${fileName}`;

  return {
    url,
    file,
    output,
    startYear: start ?? 2010,
    endYear: end ?? new Date().getFullYear() - 1,
  };
}

const DATA: DownloadInput[] = [
  createDownloadInput(BASE_CVM_URL, "DFP"),
  createDownloadInput(BASE_CVM_URL, "ITR", 2011),
  createDownloadInput(BASE_CVM_URL, "FRE"),
  createDownloadInput(BASE_CVM_URL, "FCA"),
];

async function processDownloads() {
  for (const input of DATA) {
    const { startYear, endYear, url, file, output } = input;

    for (let year = startYear; year <= endYear; year++) {
      const fileName = file.replace(YEAR_KEY, String(year));

      const downloadDFPInput: DownloadDFPInput = {
        url,
        file: fileName,
        output,
      };

      downloader
        .execute(downloadDFPInput)
        .then(() => {
          console.log(`${fileName} Successfully processed data for ${year}`);
        })
        .catch((error) => {
          console.error(`Error processing data for ${year}:`, error);
        });
    }
  }
}

(async function () {
  processDownloads();
})();
