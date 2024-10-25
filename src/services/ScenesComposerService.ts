import path from 'path';
import fs from 'fs';
import axios from 'axios';
import { ContentSection } from 'models/InterfaceJsonContent';
import { log } from 'utils/log';

class ScenesComposerService {
    private content: any;
    private directory: string;


    constructor(content: any, directory: string) {
        this.content = content;
        this.directory = directory;
    }

    public async execute(): Promise<any> {
        const filePath = path.join(this.directory, 'scenes.txt');
        let scenesInput = [] as any;

        if (fs.existsSync(filePath)) {
            const scenesContent = fs.readFileSync(filePath, {
                encoding: 'utf-8',
            });

            scenesInput = scenesContent.split('\n');
        }

        await this.composeScenes(scenesInput);


        return this.content;
    }

    private async composeScenes(scenesInput: any): Promise<void> {
        const scenes = [] as any;

        for (const scene of scenesInput) {
            if (scene && this.isRemoteUrl(scene)) {
                const url = scene;
                const filename = path.basename(url);

                await this.downloadFile(url, filename);
            }
        }

        this.content.scenes = scenes;
    }

    private isRemoteUrl(url: string): boolean {
        return url.startsWith('http') || url.startsWith('https');
    }

    
    private async downloadFile(url: string, filename: string): Promise<string> {
        log(`Downloading ${filename}`, 'StoryComposerService');

        const res = await axios.get(url, {
            responseType: 'stream',
        });

        const filePath = path.join(this.directory, filename);

        const writer = fs.createWriteStream(filePath);

        res.data.pipe(writer);

        return new Promise((resolve, reject) => {
            writer.on('finish', () => {
                resolve(filePath);
            });
            writer.on('error', reject);
        });
    }
}

export default ScenesComposerService;
