import { ENCODING } from "@/app/constants";
import { ICsvService } from "@/contracts/ICsvService";
import { IUseCase } from "@/domain/entities/IUseCase";

interface ConcatCvmDataOptions {
  names: string[];
  baseDir: string;
  basePath: string;
  outputDir: string;
  startYear: number;
  endYear: number;
  encoding: string;
  transformation?: (row: any) => any;
  filter?: (row: any) => boolean;
}

export class CVMReportAggregatorUseCase
  implements IUseCase<ConcatCvmDataOptions, void>
{
  options = {
    delimiter: ";",
    columns: true,
    encoding: ENCODING,
    relax_quotes: true,
  };

  constructor(private readonly csvService: ICsvService) {}

  async execute(options: ConcatCvmDataOptions): Promise<void> {
    const {
      names,
      baseDir,
      basePath,
      outputDir,
      startYear,
      endYear,
      transformation,
      filter,
      encoding,
    } = options;

    for (const name of names) {
      let combinedData: any[] = [];

      for (let year = startYear; year <= endYear; year++) {
        const fileName = `${baseDir}/${basePath}${name}_${year}.csv`;
        let data = await this.csvService.readCsv(fileName, {
          ...this.options,
          encoding,
        });

        if (transformation) {
          data = data.map(transformation);
        }

        if (filter) {
          data = data.filter(filter);
        }

        combinedData = combinedData.concat(data);
      }

      const outputFileName = `${outputDir}/${basePath}${name}_${startYear}-${endYear}.csv`;
      await this.csvService.writeCsv(outputFileName, combinedData);
    }
  }
}

export default CVMReportAggregatorUseCase;
