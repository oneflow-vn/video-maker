import { worker } from './renderer.worker';

export async function startWorker() {
    try {
        await worker.run();
        console.log('Worker started');
        return worker;
    } catch (err) {
        return console.error('Worker failed to start:', err);
    }
}
