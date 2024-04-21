import * as fs from "fs";
import path from "path";
import util from "util";

import { Options as ParseOptions } from "csv-parse";
import { Options as StringifyOptions, stringify } from "csv-stringify";

import { parse } from "csv-parse";

import { ENCODING } from "@/app/constants";
import { ICsvService } from "@/contracts/ICsvService";

const mkdirAsync = util.promisify(fs.mkdir);

export class CsvService implements ICsvService {
  parseOptions: ParseOptions = {
    delimiter: ";",
    columns: true,
    relax_quotes: true,
  };

  stringifyOptions: StringifyOptions = {
    header: true,
    columns: undefined,
    delimiter: ";",
  };

  async readCsv(
    file: string,
    options: ParseOptions = this.parseOptions
  ): Promise<any[]> {
    return new Promise((resolve, reject) => {
      if (!fs.existsSync(file)) {
        reject(new Error("File does not exist"));
        return;
      }

      const records: any[] = [];

      const stream = fs
        .createReadStream(file)
        .pipe(parse(options))
        .on("data", (record) => {
          records.push(record);
        })
        .on("error", (error) => {
          reject(error);
        })
        .on("end", () => {
          resolve(records);
        });

      stream.on("readable", function () {
        let record;
        while ((record = stream.read())) {
          records.push(record);
        }
      });
    });
  }

  async writeCsv(
    file: string,
    data: any[],
    options: StringifyOptions = {}
  ): Promise<void> {
    return new Promise(async (resolve, reject) => {
      const directory = path.dirname(file);

      if (!fs.existsSync(directory)) {
        await mkdirAsync(directory, { recursive: true });
      }

      const effectiveOptions = { ...this.stringifyOptions, ...options };

      const output = fs.createWriteStream(file, { encoding: ENCODING });
      const csvStringifier = stringify(effectiveOptions);

      csvStringifier.on("error", (error) => reject(error));
      csvStringifier.on("finish", () => resolve());
      output.on("error", (error) => reject(error));

      csvStringifier.pipe(output);
      for (const row of data) {
        if (!csvStringifier.write(row)) {
          await new Promise<void>((resolve) =>
            csvStringifier.once("drain", resolve)
          );
        }
      }

      csvStringifier.end();
    });
  }

  concatCsv(dataArray: any[][]): any[] {
    return dataArray.flat();
  }
}
