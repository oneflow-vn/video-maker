import dotenv from 'dotenv';

dotenv.config();

export default {
    queueName: process.env.QUEUE_NAME || 'oneflow-video-render',
    concurrency: parseInt(process.env.QUEUE_CONCURRENCY || '1'),
    connection: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT || '6379'),
    },
};
