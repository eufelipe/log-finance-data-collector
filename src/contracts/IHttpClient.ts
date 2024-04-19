export interface IHttpClient {
  get(url: string, responseType: "stream"): Promise<NodeJS.ReadableStream>;
}
