import { BASE_CVM_URL, CVM_ORIGIN_RAW_DIR, TEMP_DIR } from "@/app/constants";
import { IDownloadInput } from "@/contracts";

import { CVM } from "@/domain/usecases/cvm";

import { ServiceFactory } from "@/factories";

type Input = {
  url: string;
  file: string;
  output: string;
  startYear: number;
  endYear: number;
};

const YEAR_KEY = "{YEAR}";

export class DataDownloaderController {
  private downloader: InstanceType<typeof CVM.DataDownloaderUseCase>;
  private httpClient = ServiceFactory.createHttpClient();
  private fileService = ServiceFactory.createFileService();
  private pathService = ServiceFactory.createPathService();
  private zipService = ServiceFactory.createZipService();
  private data: Input[];

  constructor() {
    this.downloader = new CVM.DataDownloaderUseCase(
      this.httpClient,
      this.fileService,
      this.zipService,
      this.pathService,
      TEMP_DIR
    );
    this.data = [
      this.createDownloadInput(BASE_CVM_URL, "DFP"),
      this.createDownloadInput(BASE_CVM_URL, "ITR", 2011),
      this.createDownloadInput(BASE_CVM_URL, "FRE"),
      this.createDownloadInput(BASE_CVM_URL, "FCA"),
    ];
  }

  private createDownloadInput(
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

  public async downloadData(): Promise<void> {
    for (const input of this.data) {
      const { startYear, endYear, url, file, output } = input;

      for (let year = startYear; year <= endYear; year++) {
        const fileName = file.replace(YEAR_KEY, String(year));
        const downloadInput: IDownloadInput = {
          url,
          file: fileName,
          output,
        };

        try {
          await this.downloader.execute(downloadInput);
          console.log(`${fileName} Successfully processed data for ${year}`);
        } catch (error) {
          console.error(`Error processing data for ${year}:`, error);
        }
      }
    }
  }
}

export default DataDownloaderController;
