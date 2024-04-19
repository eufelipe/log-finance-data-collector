import fs from "fs";
import path from "path";
import util from "util";

import { NodeWriteStreamAdapter } from "./NodeWriteStreamAdapter";

import { IFileService, IWriteStream } from "@/contracts";

const mkdirAsync = util.promisify(fs.mkdir);
const unlinkAsync = util.promisify(fs.unlink);

export class NodeFileService implements IFileService {
  async writeStream(pathStr: string): Promise<IWriteStream> {
    const dir = path.dirname(pathStr);
    await mkdirAsync(dir, { recursive: true });
    return new NodeWriteStreamAdapter(pathStr);
  }

  async delete(path: string): Promise<void> {
    await unlinkAsync(path);
  }
}
