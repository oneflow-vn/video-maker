import path from "path";
import fs from "fs";
import axios from "axios";
import { ContentSection } from "models/InterfaceJsonContent";

class StoryComposerService {
    private content: any;
    private directory: string;

    constructor(content: any, directory: string) {
        this.content = content;
        this.directory = directory;
    }

    public async execute() {
        const voicesFile = path.join(this.directory, 'voices.json');
        const scenesFile = path.join(this.directory, 'scenes.json');

        if (fs.existsSync(voicesFile)) {
            const voicesContent = fs.readFileSync(voicesFile, {
                encoding: 'utf-8',
            });
            const voicesJson = JSON.parse(voicesContent);
            await this.composeVoices(voicesJson);
        }

        if (fs.existsSync(scenesFile)) {
            const scenesContent = fs.readFileSync(scenesFile, {
                encoding: 'utf-8',
            });
            const scenesJson = JSON.parse(scenesContent);
            await this.composeScenes(scenesJson);
        }

        try {
            this.content.backgroundPath = this.content.sections[0].background.path;
        } catch (e) {
            console.log('Error', e);
        }

        return this.content;
    }

    private composeVoices(json: any): Promise<any> {
        if (!Array.isArray(json)) {
            throw new Error('Voices should be an array');
        }

        const promises = json.map((voice: any, index) => {
            return this.composeVoice(voice, index);
        });

        return Promise.all(promises);
    }

    private async composeVoice(voice: any, index: number): Promise<void> {
       if (!voice.url) {
        return;
       }
       const filename = `voice-${index}.mp3`;
       await this.downloadFile(voice.url, filename);

         this.updateSection({
              voice: filename,
              bgm: {
                path: filename,
              }
         }, index);
    }

    private composeScenes(json: any): Promise<any> {
        if (!Array.isArray(json)) {
            throw new Error('Scenes should be an array');
        }

        const promises = json.map((scene: any, index) => {
            return this.composeScene(scene, index);
        });

        return Promise.all(promises);
    }

    private updateSection(section: any, index: number): void {
        if (!this.content.sections) {
            this.content.sections = [];
        }

        if (!this.content.sections[index]) {
            this.content.sections[index] = {};
        }

        this.content.sections[index] = {
            ...this.content.sections[index],
            ...section,
        };
    }

    private async composeScene(scene: any, index: number): Promise<void> {
        if (!scene.url) {
            return;
        }
        const filename = `scene-${index}.png`;
        await this.downloadFile(scene.url, filename);

        this.updateSection({
           background: {
            path: filename,
           }
        }, index);

        this.updateBackground(this.content.sections[index], index);
    }

    private updateBackground(section: ContentSection, index: number): void {
        if (!this.content.backgrounds) {
            this.content.backgrounds = [];
        }

        if (!this.content.backgrounds[index]) {
            this.content.backgrounds[index] = {};
        }

        const background = section.background;

        if (!background) {
            return;
        }

        if (!background.path) {
            return;
        }

        this.content.backgrounds[index] = {
            ...this.content.backgrounds[index],
            ...background,
            duration: section.duration,
        };

    }


    private async downloadFile(url: string, filename: string): Promise<string> {
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

export default StoryComposerService;