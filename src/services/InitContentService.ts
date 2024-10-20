import fs from 'fs';
import path from 'path';

import { error, log } from '../utils/log';
import { getLatestFileCreated } from '../utils/getFiles';
import { getPath } from '../config/defaultPaths';
import InterfaceJsonContent from '../models/InterfaceJsonContent';
import format from '../config/format';

export default class InitContentService {
    // eslint-disable-next-line
    public async execute(
        filename?: string,
        directory?: string,
        videoFormat?: 'portrait' | 'landscape' | 'square',
    ): Promise<{
        content: InterfaceJsonContent;
        file: string;
        directory: string;
    }> {
        if (!filename) {
            filename = 'props.json';
        }

        const contentPath = await getPath('content');
        const cwdPath = directory || process.cwd();
        const relativePath = path.resolve(cwdPath, filename);
        const contentFilePath = relativePath;

        const contentDir = path.dirname(contentFilePath);

        log(`Init content from ${contentFilePath}`, 'GetContentService');

        try {

            const content = {
                "title": "",
                "subtitle": "",
                "fps": 30,
                "width": 1920,
                "height": 1080,
                "renderData": [],
                "backgroundPath": "scene-0.png",
                "duration": 4002.4040000000005,
                "durationFrames": 120073,
                "totalHours": 1.111778888888889
            } as unknown as InterfaceJsonContent;

            if (!fs.existsSync(contentDir)) {
                fs.mkdirSync(contentDir, { recursive: true });
            }

            fs.writeFileSync(contentFilePath, JSON.stringify(content, null, 4));

            return { content, file: contentFilePath, directory: contentPath };
        } catch {
            error(`${contentFilePath} not found`, 'GetContentService');
            process.exit(1);
        }
    }
}
