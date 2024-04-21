import { CVMReportAggregatorUseCase } from "@/domain";
import { ServiceFactory } from "@/factories";
import { tasks } from "./tasks";

const csvService = ServiceFactory.createCsvService();

const concatingCvmDataUseCase = new CVMReportAggregatorUseCase(csvService);

export default async function CVMReportAggregator() {
  for (const task of tasks) {
    try {
      console.log(`Processing ${task.basePath} for ${task.names.join(", ")}`);
      await concatingCvmDataUseCase.execute(task);
      console.log(`Completed processing for ${task.basePath}`);
    } catch (error) {
      console.error(`Error processing ${task.basePath}:`, error);
    }
  }
}
