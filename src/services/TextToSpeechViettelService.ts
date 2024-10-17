import path from 'path';

import { error, log } from '../utils/log';
import { getPath } from '../config/defaultPaths';
import InterfaceJsonContent from '../models/InterfaceJsonContent';
import Segment from '../models/Segments';
import ViettelaiClient, {
    TtsReturnOption,
    Voice,
} from 'vendors/viettelai/ViettelaiClient';
import mp3Duration from 'mp3-duration';
import fs from 'fs';

class TextToSpeechVettelService {
    private voice: Voice;
    private viettelaiToken: string;
    private content: InterfaceJsonContent;
    private vietelaiClient: ViettelaiClient;

    constructor(content: InterfaceJsonContent) {
        this.content = content;

        if (!process.env.VETTELAI_TTS_KEY) {
            error('Vettelai TTS key is not defined', 'TextToSpeechService');
            return;
        }

        this.viettelaiToken = process.env.VETTELAI_TTS_KEY;
        this.voice = 'hn-thanhha';
        this.content.renderData = [];

        this.vietelaiClient = new ViettelaiClient(this.viettelaiToken);
    }

    public async execute({
        synthesizeIntro,
        synthesizeEnd,
    }: {
        synthesizeIntro?: boolean;
        synthesizeEnd?: boolean;
    }): Promise<InterfaceJsonContent> {
        const synthesizePromises: Promise<void>[] = [];

        if (synthesizeIntro) {
            synthesizePromises.push(this.synthesizeIntro());
        }

        synthesizePromises.push(this.synthesizeNews());

        await Promise.all(synthesizePromises);

        if (synthesizeEnd) {
            await this.synthesizeEnd();
        }

        return this.content;
    }

    private async synthesizeIntro(): Promise<void> {
        if (!this.content.intro?.text) {
            log('Intro text is not defined, skipping...', 'TextToSeechService');
            return;
        }

        if (typeof this.content.renderData !== 'object') {
            error('Render data is not defined', 'TextToSeechService');
            throw new Error('Render data is not defined');
        }

        log(`Synthesizing Intro`, 'TextToSpeechService');
        const { audioFilePath, segments, duration } = await this.synthesize(
            this.content.intro.text,
            'intro',
        );

        this.content.renderData[0] = {
            text: this.content.intro.text,
            duration,
            audioFilePath,
            segments,
        };
    }

    private async synthesizeNews(): Promise<void> {
        const synthesizePromises = this.content.chapters.map(
            async (news, index) => {
                log(`Synthesizing news ${index}`, 'TextToSpeechService');

                const { audioFilePath, segments, duration } =
                    await this.synthesize(news.text, index.toString(), news);

                if (typeof this.content.renderData !== 'object') {
                    error('Render data is not defined', 'TextToSeechService');
                    throw new Error('Render data is not defined');
                }

                this.content.renderData[index + 1] = {
                    text: news.text,
                    duration,
                    audioFilePath,
                    segments,
                };
            },
        );

        await Promise.all(synthesizePromises);
    }

    private async synthesizeEnd(): Promise<void> {
        if (!this.content.end?.text) {
            log('End text is not defined, skipping...', 'TextToSeechService');
            return;
        }

        if (typeof this.content.renderData !== 'object') {
            error('Render data is not defined', 'TextToSeechService');
            throw new Error('Render data is not defined');
        }

        log('Synthesizing end', 'TextToSpeechService');
        const { audioFilePath, segments, duration } = await this.synthesize(
            this.content.end.text,
            'end',
        );

        this.content.renderData.push({
            text: this.content.end.text,
            duration,
            audioFilePath,
            segments,
        });
    }

    private async synthesize(
        text: string,
        sufix: string,
        ctx?: any,
    ): Promise<{
        audioFilePath: string;
        duration: number;
        segments: Segment[];
    }> {
        const tmpPath = await getPath('tmp');
        const segments: Segment[] = [];

        const audioFilePathInp = path.join(tmpPath, `audio_${sufix}.mp3`);

        if (ctx?.audio) {
            const audioFilePathSrc = ctx.audio;
            const duration = await this.getDuration(audioFilePathSrc);

            // copy audio file to tmp folder
            const audioFilePath = path.join(tmpPath, `audio_${sufix}.mp3`);

            await this.copyAudioFile(audioFilePath, audioFilePath);

            return { audioFilePath, duration, segments };
        }

        const audioFilePath = await this.vietelaiClient.synthesizeToFile(
            {
                text,
                voice: this.voice,
                speed: 0.9,
                tts_return_option: TtsReturnOption.MP3,
                without_filter: false,
            },
            audioFilePathInp,
        );

        const duration = await this.getDuration(audioFilePath);

        return { audioFilePath, duration, segments };
    }

    private async copyAudioFile(
       from: string,
       to: string
    ): Promise<string> {
      return new Promise((resolve, reject) => {
        fs.copyFile(from, to, (err) => {
          if (err) {
            reject(err);
            return;
          }

          resolve(to);
        });
      });
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

export default TextToSpeechVettelService;
