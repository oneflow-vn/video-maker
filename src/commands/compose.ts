import { Command, Flags } from '@oclif/core';
import path from 'path';
import fs from 'fs';
import { getPath } from '../config/defaultPaths';

import {
    ExportDataService,
    GetContentService,
    InitContentService,
    StoryComposerService,
    ScenesComposerService,
    SyncContentService
} from '../services';

export default class Compose extends Command {
    static description = 'Compose content';

    static examples = ['<%= config.bin %> <%= command.id %> story -d <dir>'];

    static flags = {
        filename: Flags.string({
            char: 'f',
            description: 'Get content directory/file path',
        }),
        url: Flags.string({
            char: 'u',
            description: 'Get content from url',
        }),
        local: Flags.boolean({
            char: 'l',
            description: 'Get content from local',
            default: false,
        }),
    };

    static args = [
        {
            name: 'preset',
            required: true,
            description: 'Preset to compose content',
            options: ['story', 'podcast', 'lofi', 'scenes', 'sync'],
        },
    ];

    public async run(): Promise<void> {
        const { args, flags } = await this.parse(Compose);

        switch (args.preset) {
            case 'story':
                await this.composeStory(flags);
                break;
            case 'scenes':
                await this.composeScenes(flags);
                break;
            case 'sync':
                await this.syncContent(flags);
                break;
            default:
        }

        this.config;
    }

    private async syncContent(flags): Promise<void> {
        const directory = await getPath('content');
        const results = await new SyncContentService().execute(directory);

        for (const result of results) {
           await this.composeStory({
                filename: result.contentDir,
                local: flags.local,
            });
        }
    }

    private async composeStory(flags: any): Promise<void> {
        const filename = 'props.json';
        let directory = path.join(process.cwd(), flags.filename || 'content');
        let filePath = `${directory}/${filename}`;

        if (flags.filename && fs.existsSync(flags.filename)) {
            directory = fs.statSync(flags.filename).isDirectory() ? flags.filename : path.dirname(flags.filename);
            filePath = fs.statSync(flags.filename).isDirectory() ? `${flags.filename}/${filename}` : flags.filename;
        }

        if (!fs.existsSync(filePath)) {
            // init content
            await new InitContentService().execute(filename, directory);
        }

        let { content, file } = await new GetContentService().execute(filePath);

        if (!fs.existsSync(directory)) {
            fs.mkdirSync(directory);
        }

        content = await new StoryComposerService(content, directory).execute({
            url: flags.url,
            loadContent: !flags.local,
        });

        await new ExportDataService(content).execute(file);
    }

    private async composeScenes(flags: any): Promise<void> {
        const filename = 'props.json';
        const directory = path.join(process.cwd(), flags.dir || 'content');
        const filePath = `${directory}/${filename}`;

        if (!fs.existsSync(filePath)) {
            fs.writeFileSync(filePath, '');
        }

        let { content, file } = await new GetContentService().execute(filePath);

        if (!fs.existsSync(directory)) {
            fs.mkdirSync(directory);
        }

        content = await new ScenesComposerService(content, directory).execute();

        await new ExportDataService(content).execute(file);
    }
}
