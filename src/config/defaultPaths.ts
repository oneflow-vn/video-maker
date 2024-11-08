import fs from 'fs';
import path from 'path';
import { Config } from '@oclif/core';

const assetsPath = path.resolve(__dirname, '..', '..', 'assets');
const remotionPath = path.resolve(__dirname, '..', '..', 'video');
const publicPath = path.resolve(__dirname, __dirname.includes('dist') ? '..' : '', '..', '..', 'public');
const contentPath = path.resolve(__dirname, '..', '..', 'content');
const outputPath = path.resolve(__dirname, '..', '..', 'out');

export const getPath = async (
    pathname: 'content' | 'assets' | 'tmp' | 'remotion' | 'public' | 'output',
) => {
    const config = await Config.load();

    switch (pathname) {
        case 'content':
            return contentPath;
        case 'assets':
            return assetsPath;
        case 'tmp':
            const tmpPath = path.resolve(config.cacheDir);

            if (!fs.existsSync(tmpPath)) {
                fs.mkdirSync(tmpPath, { recursive: true });
            }

            return tmpPath;
        case 'remotion':
            return remotionPath;
        case 'output':
            return outputPath;
        case 'public':
            return publicPath;
        default:
            throw new Error(`Unknown path: ${pathname}`);
    }
};
