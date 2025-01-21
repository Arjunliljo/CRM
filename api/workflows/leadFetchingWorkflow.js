import { proxyActivities } from "@temporalio/workflow";

const { fetchAndSaveLeads } = proxyActivities({
  startToCloseTimeout: "1 minute",
});

export async function periodicFetchWorkflow() {
  const accessToken = process.env.FACEBOOK_ACCESS_TOKEN;

  if (!accessToken) {
    throw new Error("Access token is required");
  }

  while (true) {
    await fetchAndSaveLeads(accessToken);

    // Sleep for 20 minutes (20 * 60 * 1000 milliseconds)
    await new Promise((resolve) => setTimeout(resolve, 20 * 60 * 1000));
  }
}
