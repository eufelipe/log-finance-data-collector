export interface IZipService {
  extract(zipPath: string, extractPath: string): Promise<void>;
}
