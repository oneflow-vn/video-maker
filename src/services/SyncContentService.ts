import fs from 'fs';
import path from 'path';

import { error, log } from '../utils/log';
import { getLatestFileCreated } from '../utils/getFiles';
import { getPath } from '../config/defaultPaths';
import InterfaceJsonContent from '../models/InterfaceJsonContent';
import format from '../config/format';
import axios from 'axios';

const REMOTE_CONTENT_URL =
    'https://n8n.oneflow.vn/webhook/26e39d0c-78d4-4f98-9229-9d9d4ef7d7e9';

export default class SyncContentService {
    private api: any;

    constructor() {
        this.api = axios.create({
            baseURL: REMOTE_CONTENT_URL,
            timeout: 10000,
        });
    }

    // eslint-disable-next-line
    public async execute(directory: string) {
        try {
            log(
                `Syncing content from ${REMOTE_CONTENT_URL}`,
                'GetContentService',
            );

            const response = await this.api.get(REMOTE_CONTENT_URL);
            
            const { data } = response;

            const { rows } = data;

            const results = [] as any[];

            for (const row of rows) {
                const { slug, Title, Id } = row;

                const subDirectory = `${slug}`

                log(`Syncing content ${Title}`, 'SyncContentService');

                const contentDir = path.join(directory, subDirectory);
                const contentPath = path.join(contentDir, 'content.json');

                // create directory if not exists
                if (!fs.existsSync(contentDir)) {
                    fs.mkdirSync(contentDir);
                }

                fs.writeFileSync(contentPath, JSON.stringify(row, null, 4));

                log(`Synced content ${Title}.json`, 'SyncContentService');

                results.push({
                    contentDir,
                    slug,
                    Title,
                    Id,
                });
            }

            return results;
        } catch(e) {
            error(e, 'SyncContentService');
            process.exit(1);
        }
    }
}
