import extract from "extract-zip";

import { IZipService } from "@/contracts";

export class ZipExtractorService implements IZipService {
  async extract(zipPath: string, extractPath: string): Promise<void> {
    await extract(zipPath, { dir: extractPath });
  }
}
