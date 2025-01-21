import { Worker } from '@temporalio/worker';
import { getTemporalConfig } from '../config/temporalConfig.js';
import * as activities from '../activities/metaLeadsActivity.js';

async function runWorker() {
  const temporalConfig = getTemporalConfig();

  const worker = await Worker.create({
    workflowsPath: require.resolve('../workflows/metaLeadsWorkflow.js'),
    activities,
    taskQueue: 'meta-leads-queue',
    ...temporalConfig,
  });

  await worker.run();
}