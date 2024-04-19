import { EventEmitter } from "events";
import fs from "fs";

import { IWriteStream } from "@/contracts";

export class NodeWriteStreamAdapter
  extends EventEmitter
  implements IWriteStream
{
  private stream: fs.WriteStream;

  constructor(path: string) {
    super();
    this.stream = fs.createWriteStream(path);
    this.stream.on("close", () => this.emit("close"));
    this.stream.on("drain", () => this.emit("drain"));
    this.stream.on("error", (err) => this.emit("error", err));
    this.stream.on("finish", () => this.emit("finish"));
    this.stream.on("pipe", (src) => this.emit("pipe", src));
    this.stream.on("unpipe", (src) => this.emit("unpipe", src));
  }

  get writable(): boolean {
    return this.stream.writable;
  }

  write(
    chunk: any,
    encoding: BufferEncoding = "utf8",
    callback?: (error?: Error | null) => void
  ): boolean {
    return this.stream.write(chunk, encoding, callback);
  }

  end(
    chunk?: any,
    encoding: BufferEncoding = "utf8",
    callback?: () => void
  ): void {
    this.stream.end(chunk, encoding, callback);
  }

  getWritableStream(): NodeJS.WritableStream {
    return this.stream;
  }
}
