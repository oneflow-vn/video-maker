import { RenderArgs } from './renderer.interface';
import { Job } from 'bullmq';

export default (job: Job<RenderArgs>) => {
    console.log(`Processing job ${job.id} with data: ${job.data}`);
    return Promise.resolve();
};
