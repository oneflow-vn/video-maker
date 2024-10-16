import {
    SpeechSynthesisOutputFormat,
    SpeechConfig,
    AudioConfig,
    SpeechSynthesizer,
    SpeechSynthesisBoundaryType,
} from 'microsoft-cognitiveservices-speech-sdk';
import path from 'path';

import { error, log } from '../utils/log';
import { getPath } from '../config/defaultPaths';
import InterfaceJsonContent from '../models/InterfaceJsonContent';
import Segment from '../models/Segments';

class SyntheticService {


    private content: InterfaceJsonContent;

    constructor(content: InterfaceJsonContent) {
        this.content = content;
        this.content.renderData = [];
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
        segmentName: string,
    ): Promise<{ audioFilePath: string; segments: Segment[]; duration: number }> {
        // Mock data
        const audioFilePath = path.join(await getPath('assets'), `${segmentName}.wav`);
        const duration = 10;
        const segments: Segment[] = [
            {
                word: text,
                start: 0,
                end: duration,
            },
        ];

        return { audioFilePath, segments, duration };
    }

}

export default SyntheticService;
