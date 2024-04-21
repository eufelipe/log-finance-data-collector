import { CVM } from "@/domain/usecases/cvm";
import { ServiceFactory } from "@/factories";

import { tasks } from "./tasks";

export class ReportAggregatorController {
  private aggregator: InstanceType<typeof CVM.ReportAggregatorUseCase>;

  constructor() {
    const csvService = ServiceFactory.createCsvService();
    this.aggregator = new CVM.ReportAggregatorUseCase(csvService);
  }

  public async aggregateReports(): Promise<void> {
    for (const task of tasks) {
      try {
        console.log(
          `Processing ${task.basePath
            .replace("_", " ")
            .toUpperCase()} for ${task.names.join(", ")}`
        );
        await this.aggregator.execute(task);
        console.log(`Completed processing for ${task.basePath}`);
      } catch (error) {
        console.error(`Error processing ${task.basePath}:`, error);
      }
    }
  }
}

export default ReportAggregatorController;
