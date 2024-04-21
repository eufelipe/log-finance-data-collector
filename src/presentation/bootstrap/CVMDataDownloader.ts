import { BASE_CVM_URL, CVM_ORIGIN_RAW_DIR, TEMP_DIR } from "@/app/constants";
import { CVMDataDownloaderUseCase, DownloadInput } from "@/domain";
import { ServiceFactory } from "@/factories";

type Input = {
  url: string;
  file: string;
  output: string;
  startYear: number;
  endYear: number;
};

const YEAR_KEY = "{YEAR}";

const httpClient = ServiceFactory.createHttpClient();
const fileService = ServiceFactory.createFileService();
const pathService = ServiceFactory.createPathService();
const zipService = ServiceFactory.createZipService();

const downloader = new CVMDataDownloaderUseCase(
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
): Input {
  const url = `${baseURL}/${type}/DADOS/`;
  const file = `${type}_cia_aberta_${YEAR_KEY}.zip`;
  const fileName = type.toLowerCase();

  const output = `${CVM_ORIGIN_RAW_DIR}/${fileName}`;

  return {
    url,
    file,
    output,
    startYear: start ?? 2010,
    endYear: end ?? new Date().getFullYear() - 1,
  };
}

const DATA: Input[] = [
  createDownloadInput(BASE_CVM_URL, "DFP"),
  createDownloadInput(BASE_CVM_URL, "ITR", 2011),
  createDownloadInput(BASE_CVM_URL, "FRE"),
  createDownloadInput(BASE_CVM_URL, "FCA"),
];

export default async function CVMDataDownloaderController() {
  for (const input of DATA) {
    const { startYear, endYear, url, file, output } = input;

    for (let year = startYear; year <= endYear; year++) {
      const fileName = file.replace(YEAR_KEY, String(year));
      const downloadInput: DownloadInput = {
        url,
        file: fileName,
        output,
      };

      try {
        await downloader.execute(downloadInput);
        console.log(`${fileName} Successfully processed data for ${year}`);
      } catch (error) {
        console.error(`Error processing data for ${year}:`, error);
      }
    }
  }
}
