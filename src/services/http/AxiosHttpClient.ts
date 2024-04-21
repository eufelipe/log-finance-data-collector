import axios from "axios";

import { ENCODING } from "@/app/constants";
import { IHttpClient } from "@/contracts";

export class AxiosHttpClient implements IHttpClient {
  async get(
    url: string,
    responseType: "stream"
  ): Promise<NodeJS.ReadableStream> {
    const response = await axios.get(url, {
      responseType,
      responseEncoding: ENCODING,
    });
    return response.data;
  }
}
