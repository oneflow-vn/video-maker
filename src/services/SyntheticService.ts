import path from 'path';
import { log } from '../utils/log';
import InterfaceJsonContent, {
    ContentSection,
    ContentSectionVoice,
} from '../models/InterfaceJsonContent';
import mp3Duration from 'mp3-duration';
import fs from 'fs';

class SyntheticService {
    private content: InterfaceJsonContent;
    private directory: string;

    constructor(content: InterfaceJsonContent, directory: string) {
        this.content = content;
        this.directory = directory;
        this.content.renderData = [];
    }

    public async execute(): Promise<InterfaceJsonContent> {
        log('Synthesizing content', 'SyntheticService');

        this.content.duration = 0;
        this.content.durationFrames = 0;
        this.content.totalHours = 0;

        if (this.content.sections) {
            await this.synthesizeSections();
        }

        return this.content;
    }

    private async synthesizeSections(): Promise<void> {
        if (!this.content.sections) {
            return;
        }
        const promises = this.content.sections.map(async section => {
            return this.synthesizeSection(section);
        });

        await Promise.all(promises);
    }

    private async synthesizeSection(section: ContentSection): Promise<void> {
        section.duration = 0;
        section.durationFrames = 0;

        if (section.bgm) {
            await this.synthesizeAudio(section.bgm);

            this.addSectionDuration(section, section.bgm);
        }

        if (section.startVoice) {
            await this.synthesizeAudio(section.startVoice);

            this.addSectionDuration(section, section.startVoice);
        }

        if (section.endVoice) {
            await this.synthesizeAudio(section.endVoice);

            this.addSectionDuration(section, section.endVoice);
        }

        this.addTotalDuration(section);
    }

    private addTotalDuration(section: ContentSection): void {
        if (!section.duration) {
            return;
        }

        if (!this.content.duration) {
            this.content.duration = 0;
        }

        this.content.duration += section.duration;

        if (!this.content.durationFrames) {
            this.content.durationFrames = 0;
        }

        if (section.durationFrames) {
            this.content.durationFrames += section.durationFrames;
        }

        this.content.totalHours = this.content.duration / 3600;
    }

    private async synthesizeAudio(audio: ContentSectionVoice): Promise<void> {
        if (!audio) {
            return;
        }

        const audioFilePath = path.join(this.directory, audio.path);

        if (!audioFilePath) {
            return;
        }

        if (!fs.existsSync(audioFilePath)) {
            return;
        }

        const duration = await this.getDuration(audioFilePath);

        // set the duration of the audio
        audio.duration = duration;

        // calculate duration in frames
        if (this.content.fps) {
            audio.durationFrames = Math.round(duration * this.content.fps);
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

        if (!background.path) {
            return;
        }

        this.content.backgrounds[index] = {
            ...this.content.backgrounds[index],
            ...background,
        };

    }

    private addSectionDuration(
        section: ContentSection,
        audio: ContentSectionVoice,
    ): void {
        if (!audio.duration) {
            return;
        }

        if (!section.duration) {
            section.duration = 0;
        }

        section.duration += audio.duration;

        if (!section.durationFrames) {
            section.durationFrames = 0;
        }

        if (audio.durationFrames) {
            section.durationFrames += audio.durationFrames;
        }
    }

    private async getDuration(audioFilePath: string): Promise<number> {
        return new Promise((resolve, reject) => {
            mp3Duration(audioFilePath, (err, duration) => {
                if (err) {
                    reject(err);
                    return;
                }

                resolve(duration);
            });
        });
    }
}

export default SyntheticService;
