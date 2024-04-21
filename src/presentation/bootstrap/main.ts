import { ServiceFactory } from "@/factories";

import CVMDataDownloader from "./CVMDataDownloader";
import CVMReportAggregator from "./CVMReportAggregator";

const statusService = ServiceFactory.createStatusService();

(async function () {
  const canSetup = await statusService.canSetup();

  if (!canSetup) {
    await CVMDataDownloader();
    await CVMReportAggregator();
    await statusService.saveStatus();
  }
})();
