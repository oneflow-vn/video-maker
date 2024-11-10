import fs from 'fs';
import path from 'path';

import { error, log } from '../utils/log';
import { getLatestFileCreated } from '../utils/getFiles';
import { getPath } from '../config/defaultPaths';
import InterfaceJsonContent from '../models/InterfaceJsonContent';
import format from '../config/format';

export default class GetContentService {
    // eslint-disable-next-line
    public async execute(
        filename?: string,
        videoFormat?: 'portrait' | 'landscape' | 'square',
    ): Promise<{
        content: InterfaceJsonContent;
        file: string;
        directory: string;
    }> {

        if (filename && !filename.endsWith('.json')) {
           filename = filename + '/props.json';
        }

        const contentPath = await getPath('content');
        const cwdPath = process.cwd();

        let contentFilePath = filename
            ? path.resolve(contentPath, filename)
            : await getLatestFileCreated('json', contentPath);

        // If the file is not in the default path, try to find it in the cwd
        if (filename) {
            const relativePath = path.resolve(cwdPath, filename);
            if (fs.existsSync(relativePath)) {
                contentFilePath = relativePath;
            }
        }

        log(`Getting content from ${contentFilePath}`, 'GetContentService');

        try {
            const content = fs.readFileSync(contentFilePath, {
                encoding: 'utf-8',
            });

            const jsonContent = JSON.parse(content) as InterfaceJsonContent;

            if (videoFormat) {
                jsonContent.width = format[videoFormat].width;
                jsonContent.height = format[videoFormat].height;
            }

            const directory = path.dirname(contentFilePath);

            return { content: jsonContent, file: contentFilePath, directory };
        } catch {
            error(`${contentFilePath} not found`, 'GetContentService');
            process.exit(1);
        }
    }

    public async getBulkContent(): Promise<{
        content: InterfaceJsonContent[];
        files: string[];
    }> {
        const contentPath = await getPath('content');
        const filesNames = fs.readdirSync(contentPath);

        const allFiles = filesNames.map((file) => path.resolve(contentPath, file));

        // filter only folders that has a props.json file
        const files = allFiles.filter((file) => {
            const isDirectory = fs.statSync(file).isDirectory();
            if (!isDirectory) {
                return false;
            }

            const propsPath = path.resolve(file, 'props.json');
            return fs.existsSync(propsPath);
        });

        return { files, content: [] };
    }
}