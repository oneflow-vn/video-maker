import { Worker } from 'bullmq';
import config from './config';

import { default as processor } from './renderer.processor';

export const worker = new Worker('renderer', processor, {
    connection: config.connection,
    concurrency: config.concurrency,
    autorun: false,
});

worker
    .on('ready', () => console.log('Worker ready'))
    .on('active', job => console.log(`Processing job ${job.id}`))
    .on('progress', (job, progress) =>
        console.log(`Job ${job.id} is ${progress}% done`),
    )
    .on('failed', (job, err) => {
        if (job) {
            console.error(`Job ${job.id} failed:`, err);
        } else {
            console.error('Job failed:', err);
        }
    })
    .on('error', err => console.error('Worker error:', err))
    .on('completed', job => console.log(`Job ${job.id} completed`));

console.log('Worker listening for jobs');
