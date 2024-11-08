import path from 'path';
import fs from 'fs';
import axios from 'axios';
import { ContentSection } from 'models/InterfaceJsonContent';
import { log } from 'utils/log';

const e2eStoryUrl =
    'https://n8n.oneflow.vn/webhook/a3d89320-486f-44cd-8402-ac4b7a30ea96';

const DESC_TMP = `[Truyện Audio] {title} - {author} | Tháng Năm Stories
-------------------------------------------------------------------

Tác giả: {author}
Thể loại: {genre}
Nguồn: Sưu tầm
Trạng thái: Full

-------------------------------------------------------------------
{desc}

-------------------------------------------------------------------
Tháng năm Stories, thang nam stories, #thangnamstories
#truyenhay #truyenaudio #truyendothi #truyenngontinh 
#truyenaudio #doctruyen #doctruyendemkhuya 
`;

class StoryComposerService {
    private content: any;
    private directory: string;
    private rawContent: any;
    voicesJson: any;
    scenesJson: any;
    loadContent: boolean | undefined;

    constructor(content: any, directory: string) {
        this.content = content;
        this.directory = directory;
    }

    public async execute({
        url,
        loadContent,
    }: { url?: string; loadContent?: boolean } = {}): Promise<any> {
        this.loadContent = loadContent;
        if (url) {
            await this.runE2EStory({ url });
        }

        const contentFile = path.join(this.directory, 'content.json');

        if (fs.existsSync(contentFile)) {
            const contentContent = fs.readFileSync(contentFile, {
                encoding: 'utf-8',
            });
            this.rawContent = JSON.parse(contentContent);

            if (Array.isArray(this.rawContent)) {
                this.rawContent = this.rawContent[0];
            }
        }
        
        await this.loadVoicesContent();

        if (this.voicesJson) {
            await this.composeVoices(this.voicesJson);
        }

        await this.loadScenesContent();

        if (this.scenesJson) {
            await this.composeScenes(this.scenesJson);
        }

        if (this.rawContent && this.rawContent.preface) {
            this.content.title = this.rawContent.preface?.title || '';
            this.content.subtitle = `Tác giả: ${
                this.rawContent.preface?.author || ''
            }`;
        }

        const openArtFolder = path.join(
            this.directory,
            'openart-download-images',
        );

        if (fs.existsSync(openArtFolder)) {
            this.composeOpenArt(openArtFolder);
        }

        // compose covers
        if (this.rawContent?.covers) {
            await this.composeCovers(this.rawContent.covers);
        }

        if(this.rawContent?.Title) { 
            this.content.title = this.rawContent.Title;
        }

        if(this.rawContent?.author) {
            this.content.subtitle = `Tác giả: ${this.rawContent.author}`;
        }

        this.content.backgroundMusicPath = "beneath_the_moonlight.mp3";

        await this.composeDesc()

        return this.content;
    }

    private async composeDesc() {
        const descFile = path.join(this.directory, 'desc.txt');

        const desc = DESC_TMP;

        const descContent = desc
            .replaceAll('{title}', this.rawContent.title || this.rawContent.Title)
            .replaceAll('{author}', this.rawContent.author)
            .replaceAll('{genre}', this.rawContent.genre)
            .replaceAll('{desc}', this.rawContent.desc);

        return new Promise((resolve, reject) => {
            fs.writeFile(
                descFile,
                descContent,
                err => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(descFile);
                    }
                },
            );
        });

    }

    private async composeOpenArt(openArtFolder: string) {
        // list all files in the directory
        const files = fs.readdirSync(openArtFolder);

        // filename: openart-image_43e99245_1729484218198_1024.jpeg
        // sort files by timestamp
        const sortedFiles = files.sort((a, b) => {
            // openart-image_43e99245_1729484218198_1024.jpeg -> 1729484218198
            const aTimestamp = parseInt(a.split('_')[2], 10);
            const bTimestamp = parseInt(b.split('_')[2], 10);

            return aTimestamp - bTimestamp;
        });

        const promises = sortedFiles.map((file, index) => {
            // copy file to the directory
            // scene-{index}.jpeg
            const filename = `scene-${index}.jpeg`;
            const src = path.join(openArtFolder, file);
            const dest = path.join(this.directory, filename);

            return new Promise((resolve, reject) => {
                fs.copyFile(src, dest, err => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(dest);
                    }
                });
            });
        });

        return Promise.all(promises);
    }

    private async runE2EStory({ url }: { url: string }): Promise<void> {
        const res = await axios.post(
            e2eStoryUrl,
            {
                url,
            },
            {
                // 1 hour timeout
                timeout: 1000 * 60 * 60,
            },
        );

        this.rawContent = res.data;

        const contentFile = path.join(this.directory, 'content.json');

        // fs.writeFileSync(contentFile, JSON.stringify(this.rawContent, null, 4));

        return new Promise((resolve, reject) => {
            fs.writeFile(
                contentFile,
                JSON.stringify(this.rawContent, null, 4),
                err => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve();
                    }
                },
            );
        });
    }

    private async loadScenesContent() {
        const scenesFile = path.join(this.directory, 'scenes.json');

        if (fs.existsSync(scenesFile)) {
            const scenesContent = fs.readFileSync(scenesFile, {
                encoding: 'utf-8',
            });
            this.scenesJson = JSON.parse(scenesContent);
        }

        if (this.rawContent.scenes) {
            this.scenesJson = this.rawContent.scenes;
        }
    }

    private async loadVoicesContent() {
        const voicesFile = path.join(this.directory, 'voices.json');

        if (fs.existsSync(voicesFile)) {
            const voicesContent = fs.readFileSync(voicesFile, {
                encoding: 'utf-8',
            });
            this.voicesJson = JSON.parse(voicesContent);
        }

        if (this.rawContent.voices) {
            this.voicesJson = this.rawContent.voices;
        }

        await this.composeVoices(this.voicesJson);
    }

    private async composeVoices(json: any): Promise<any> {
        if (!Array.isArray(json)) {
            throw new Error('Voices should be an array');
        }

        const promises = json.map((voice: any, index) => {
            return this.composeVoice(voice, index);
        });

        return Promise.all(promises);
    }

    private async composeCovers(covers: any): Promise<void> {
        if (!Array.isArray(covers)) {
            throw new Error('Covers should be an array');
        }

        this.content.covers = [];

        const promises = covers.map((cover: any, index) => {
            return this.composeCover(cover, index);
        });

        await Promise.all(promises);

        if (this.content.covers.length > 0) {
            this.content.backgroundPath = 'cover-0.png';
        }
    }

    private async composeCover(cover: any, index: number): Promise<void> {
        if (!cover.url) {
            return;
        }

        const filename = `cover-${index}.png`;

        if (this.loadContent) {
            console.log('Downloading cover', cover.url);
            await this.downloadFile(cover.url, filename);
        }

        this.content.covers[index] = {
            ...cover,
        };
    }

    private async composeVoice(voice: any, index: number): Promise<void> {
        if (!voice.url) {
            return;
        }
        const filename = `voice-${index}.mp3`;

        if (this.loadContent) {
            await this.downloadFile(voice.url, filename);
        }

        this.updateSection(
            {
                voice: filename,
                bgm: {
                    path: filename,
                },
            },
            index,
        );
    }

    private async composeScenes(json: any): Promise<any> {
        if (!Array.isArray(json)) {
            throw new Error('Scenes should be an array');
        }

        const promises = json.map((scene: any, index) => {
            return this.composeScene(scene, index);
        });

        await this.saveScenesToContentCsv(json);

        return Promise.all(promises);
    }

    private async saveScenesToContentCsv(scenes: any): Promise<void> {
        const csvPath = path.join(this.directory, 'content.csv');
        const csvContent = scenes.map((scene: any, index: number) => {
            return {
                scene: JSON.stringify(scene.prompt),
            };
        });

        // if not exits scenes.csv, save scenes to content.csv
        if (fs.existsSync(csvPath)) {
            fs.unlinkSync(csvPath);
        }

        const csvContentString = csvContent
            .map((scene: any) => {
                return `${scene.scene}`;
            })
            .join('\n');

        fs.writeFileSync(csvPath, csvContentString);
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

    private isRemoteUrl(url: string): boolean {
        return url.startsWith('http') || url.startsWith('https');
    }

    private async composeScene(scene: any, index: number): Promise<void> {
        try {
            if (!scene.url) {
                return;
            }

            const extRaw = scene.url.split('.').pop();
            const ext = ['jpg', 'jpeg', 'png', 'webp'].includes(extRaw)
                ? extRaw
                : 'png';

            const filename = `scene-${index}.${ext}`;

            if (this.loadContent && this.isRemoteUrl(scene.url)) {
                await this.downloadFile(scene.url, filename);
            }

            this.updateSection(
                {
                    background: {
                        path: filename,
                    },
                },
                index,
            );

            this.updateBackground(this.content.sections[index], index);
        } catch (e) {
            log(`Error composing scene ${index}`, 'StoryComposerService');
        }
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

        if (!background?.path) {
            return;
        }

        this.content.backgrounds[index] = {
            ...this.content.backgrounds[index],
            ...background,
            duration: section.duration,
        };
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

export default StoryComposerService;
