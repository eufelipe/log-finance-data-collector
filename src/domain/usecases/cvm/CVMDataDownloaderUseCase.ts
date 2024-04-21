import {
  IFileService,
  IHttpClient,
  IPathService,
  IZipService,
} from "@/contracts";

import { IUseCase } from "@/domain";

export type DownloadInput = {
  url: string;
  file: string;
  output: string;
};

export class CVMDataDownloaderUseCase implements IUseCase<DownloadInput, void> {
  constructor(
    private httpClient: IHttpClient,
    private fileService: IFileService,
    private zipService: IZipService,
    private pathService: IPathService,
    private tempDir: string
  ) {}

  async execute(input: DownloadInput): Promise<void> {
    await this.downloadAndExtract(input);
  }

  private async downloadAndExtract(input: DownloadInput): Promise<void> {
    const { url, file, output } = input;

    const zipPath = this.pathService.resolve(this.tempDir, file);
    try {
      const responseStream = await this.httpClient.get(url + file, "stream");
      const writeStreamAdapter = await this.fileService.writeStream(zipPath);
      const nativeWriteStream = writeStreamAdapter.getWritableStream();

      responseStream.pipe(nativeWriteStream);

      return new Promise((resolve, reject) => {
        nativeWriteStream.on("finish", async () => {
          try {
            const extractPath = this.pathService.resolve(output);
            await this.zipService.extract(zipPath, extractPath);
            await this.fileService.delete(zipPath);
            resolve();
          } catch (error) {
            reject(error);
          }
        });

        nativeWriteStream.on("error", (error) => {
          this.fileService.delete(zipPath);
          reject(error);
        });
      });
    } catch (error) {
      console.error("Failed to download:", error);
      throw error;
    }
  }
}

export default CVMDataDownloaderUseCase;
