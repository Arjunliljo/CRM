/* global process */
import axios from 'axios';
import { Queue, Worker } from 'bullmq';

// Redis upstash connection config
export const redisConnection = {
  host: process.env.REDIS_HOST_NAME, 
  port: 6379,             
  password: process.env.REDIS_PASSWORD, 
};

// Initialize the Queue and Worker
export const fetchQueue = new Queue('fetch-api-queue', {
  connection: redisConnection,
});

export const worker = new Worker(
  'fetch-api-queue',
  async (job) => {
    try {
      // Simulating fetching data from an external API
      const response = await axios.get(job.data.url);
      console.log('Fetched Data:', response.data);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  },
  {
    connection: redisConnection,
  }
);
