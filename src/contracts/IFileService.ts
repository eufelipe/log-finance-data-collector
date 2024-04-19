import { EventEmitter } from "events";

export interface IWriteStream extends EventEmitter {
  writable: boolean;
  write(
    chunk: any,
    encoding?: BufferEncoding,
    callback?: (error?: Error | null) => void
  ): boolean;
  end(chunk?: any, encoding?: BufferEncoding, callback?: () => void): void;
  getWritableStream(): NodeJS.WritableStream;
}

export interface IFileService {
  writeStream(path: string): Promise<IWriteStream>;
  delete(path: string): Promise<void>;
}
