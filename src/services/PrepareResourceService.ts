import axios, { AxiosInstance } from 'axios';
import fs from 'fs';

import { log } from '../utils/log';
import InterfaceJsonContent, {
    ContentSection,
} from '../models/InterfaceJsonContent';
import { getPath } from 'config/defaultPaths';
import path from 'path';

export default class PrepareResourceService {
    private content: InterfaceJsonContent;
    private directory: string;

    constructor(content: InterfaceJsonContent, directory: string) {
        this.content = content;
        this.directory = directory;
    }

    public async execute(): Promise<InterfaceJsonContent> {
        try {
            log(`Preparing resources for ${this.content.title}`);

            if (!this.content) {
                throw new Error('Content is missing');
            }

            const targetPath = await getPath('public');

            log(
                `Copying files from ${this.directory} to ${targetPath}`,
                'PrepareResourceService',
            );

            this.copyFileRecursive(this.directory, targetPath);

            const assetsPath = await getPath('assets');

            log(
                `Copying files from ${assetsPath} to ${targetPath}`,
                'PrepareResourceService',
            );

            this.copyFileRecursive(assetsPath, targetPath);

            if (this.content?.chapters?.length > 0) {
                this.prepareChapters();
            }

            return this.content;
        } catch (error) {
            log('Error while preparing resources', 'PrepareResourceService');
            throw error;
        }
    }

    private prepareChapters() {
        const chapterPromises = this.content.chapters.map(
            async (chapter, index) => {
                log(`Preparing resources for chapter ${index}`);
                await this.prepareChapter(chapter, index);
            },
        );

        return Promise.all(chapterPromises);
    }

    private async prepareChapter(chapter: any, index: number) {
        if (chapter?.background) {
            log(`Preparing background for chapter ${index}`);
            const image = await this.prepareImage(chapter.background, index);

            // update renderData with image path
            if (this.content.renderData && this.content.renderData[index + 1]) {
                this.content.renderData[index + 1].backgroundImage = image;
            }
        }

        if (chapter?.video) {
            log(`Preparing video for chapter ${index}`);
            const video = await this.prepareVideo(chapter.video, index);

            // update renderData with video path
            if (this.content.renderData && this.content.renderData[index + 1]) {
                this.content.renderData[index + 1].backgroundVideo = video;
            }
        }

        if (chapter?.gif) {
            log(`Preparing gif for chapter ${index}`);
            const gif = await this.prepareGif(chapter.gif, index);

            // update renderData with gif path
            if (this.content.renderData && this.content.renderData[index + 1]) {
                this.content.renderData[index + 1].backgroundGif = gif;
            }
        }
    }

    private async prepareVideo(
        videoUrl: string,
        index: number,
    ): Promise<string> {
        const tmpPath = await getPath('tmp');
        const ext = videoUrl.split('.').pop();
        const videoPath = await this.copyFile(
            videoUrl,
            `${tmpPath}/video_${index}.${ext}`,
        );

        return videoPath;
    }

    private async prepareImage(
        imageUrl: string,
        index: number,
    ): Promise<string> {
        const tmpPath = await getPath('tmp');
        const ext = imageUrl.split('.').pop();
        const imagePath = await this.copyFile(
            imageUrl,
            `${tmpPath}/background_${index}.${ext}`,
        );

        return imagePath;
    }

    private async prepareGif(gifUrl: string, index: number): Promise<string> {
        const tmpPath = await getPath('tmp');
        const ext = gifUrl.split('.').pop();
        const gifPath = await this.copyFile(
            gifUrl,
            `${tmpPath}/gif_${index}.${ext}`,
        );

        return gifPath;
    }

    private async copyFile(from: string, to: string): Promise<string> {
        return new Promise((resolve, reject) => {
            fs.copyFile(from, to, err => {
                if (err) {
                    reject(err);
                    return;
                }

                resolve(to);
            });
        });
    }

    private copyFileRecursive(from: string, to: string) {
        fs.readdirSync(from).forEach(file => {
            const fromPath = `${from}/${file}`;
            const toPath = `${to}/${file}`;

            if (fs.lstatSync(fromPath).isDirectory()) {
                if (!fs.existsSync(toPath)) {
                    fs.mkdirSync(toPath);
                }

                this.copyFileRecursive(fromPath, toPath);
                return;
            }

            // handle file duplication
            if (fs.existsSync(toPath)) {
                fs.unlinkSync(toPath);
            }

            fs.copyFileSync(fromPath, toPath);
        });
    }
}
