export interface ICsvService {
  readCsv(file: string, options?: any): Promise<any[]>;
  writeCsv(file: string, data: any[], options?: any): Promise<void>;
  concatCsv(dataArray: any[][]): any[];
}
