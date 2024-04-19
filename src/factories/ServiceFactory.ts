import {
  IFileService,
  IHttpClient,
  IPathService,
  IZipService,
} from "@/contracts";

import {
  AxiosHttpClient,
  NodeFileService,
  NodePathService,
  ZipExtractorService,
} from "@/services";

export class ServiceFactory {
  static createHttpClient(): IHttpClient {
    return new AxiosHttpClient();
  }

  static createFileService(): IFileService {
    return new NodeFileService();
  }

  static createZipService(): IZipService {
    return new ZipExtractorService();
  }

  static createPathService(): IPathService {
    return new NodePathService();
  }
}
