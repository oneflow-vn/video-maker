import { Command, Flags } from '@oclif/core';
import path from 'path';
import fs from 'fs';
import { getPath } from '../config/defaultPaths';

import { ExportDataService, GetContentService, InitContentService, StoryComposerService } from '../services'

export default class Compose extends Command {
    static description = 'Compose content';

    static examples = [
        '<%= config.bin %> <%= command.id %> story -d <dir>',
    ];

    static flags = {
        dir: Flags.string({
            char: 'd',
            description: 'Get content directory path',
        }),
        url: Flags.string({
            char: 'u',
            description: 'Get content from url',
        }),
        loadContent: Flags.boolean({
            char: 'l',
            description: 'Load content remotely',
            default: true,
            allowNo: true,            
        }),
    };

    static args = [
        {
            name: 'preset',
            required: true,
            description: 'Preset to compose content',
            options: ['story', 'podcast', 'lofi'],
        },
    ];

    public async run(): Promise<void> {
        const {
            args,
            flags,
        } = await this.parse(Compose);

        switch (args.preset) {
            case 'story':
                await this.composeStory(flags);
                break;
            default:
        }

        this.config;
    }

    private async composeStory(flags: any): Promise<void> {
        const filename = 'props.json';
        const directory = path.join(process.cwd(), flags.dir || 'content');
        const filePath = `${directory}/${filename}`;

        if (!fs.existsSync(filePath)) {
            // init content
            await new InitContentService().execute(filename, directory);
        }

        let { content, file } = await new GetContentService().execute(filePath);

        if (!fs.existsSync(directory)) {
            fs.mkdirSync(directory);
        }

        content = await new StoryComposerService(content, directory).execute({ url: flags.url, loadContent: flags.loadContent });

        await new ExportDataService(content).execute(file);
    }

}
