import axios from "axios";

import { IHttpClient } from "@/contracts";

export class AxiosHttpClient implements IHttpClient {
  async get(
    url: string,
    responseType: "stream"
  ): Promise<NodeJS.ReadableStream> {
    const response = await axios.get(url, { responseType });
    return response.data;
  }
}
