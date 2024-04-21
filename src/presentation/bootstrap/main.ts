import { ServiceFactory } from "@/factories";

async function runDownloader() {
  const { DataDownloaderController } = await import(
    "@/presentation/controllers"
  );

  const controller = new DataDownloaderController();
  await controller.downloadData();
}

async function runAggregation() {
  const { ReportAggregatorController } = await import(
    "@/presentation/controllers"
  );

  const controller = new ReportAggregatorController();
  await controller.aggregateReports();
}

(async function () {
  const statusService = ServiceFactory.createStatusService();
  const canSetup = await statusService.canSetup();

  if (!canSetup) {
    await runDownloader();
    await runAggregation();
    await statusService.saveStatus();
  }
})();
