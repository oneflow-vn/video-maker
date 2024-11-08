import { Command, Flags } from '@oclif/core';
import shell from 'shelljs';
import fs from 'fs';

import {
    GetContentService,
    PrepareResourceService,
    SyntheticService,
} from '../services';

export default class Remotion extends Command {
    static description = 'Remotion framework related commands';

    static examples = [
        '<%= config.bin %> <%= command.id %> upgrade',
        '<%= config.bin %> <%= command.id %> preview',
        '<%= config.bin %> <%= command.id %> render-example',
        '<%= config.bin %> <%= command.id %> render-thumb-example',
    ];

    static flags = {
        filename: Flags.string({
            char: 'f',
            description: 'filename with content',
        }),
        template: Flags.string({
            char: 't',
            description: 'template to use',
            options: ['podcast', 'lofi', 'mayst', 'src'],
            default: 'lofi',
        }),
        site: Flags.string({
            char: 's',
            description: 'site to use',
        }),
        composition: Flags.string({
            char: 'c',
            description: 'composition to use',
            default: 'Main',
        }),
        output: Flags.string({
            char: 'o',
            description: 'output file',
            default: 'out.mp4',
        }),
    };

    static args = [
        {
            name: 'command',
            required: true,
            description: 'Command to run',
            options: [
                'upgrade',
                'preview',
                'lambda-render',
                'lambda-render-thumb',
                'lambda-all',
                'render-example',
                'render-thumb-example',
            ],
        },
    ];

    public async run(): Promise<void> {
        const { args, flags } = await this.parse(Remotion);

        const { content, directory } = await new GetContentService().execute(
            flags.filename,
        );
        if (!content) {
            throw new Error('Content not found');
        }
        const durationInFrames = content.renderData
            ? Math.round(this.getFullDuration(content.renderData) * content.fps)
            : 1;

        await new SyntheticService(content, directory).execute();

        await new PrepareResourceService(content, directory).execute();

        const props = {
            content,
            destination: 'youtube',
            durationInFrames,
        };

        const propsPath = '/tmp/props.json';
        fs.writeFileSync(propsPath, JSON.stringify(props));

        let command = '';

        const { template, site, composition, output } = flags;

        const compPath = `video/${template}/index.tsx`;

        switch (args.command) {
            case 'upgrade':
                command = 'pnpm remotion upgrade';
                break;
            case 'preview':
                command = `pnpm remotion preview ${compPath} --props=${propsPath}`;
                break;
            case 'lambda-render':
                command = `pnpm remotion lambda render ${site} ${composition} out.mp4 --props=${propsPath}`;
                break;
            case 'lambda-render-thumb':
                command = `pnpm remotion lambda still ${site} ${composition} out.png --props=${propsPath}`;
                break;
            case 'lambda-all':
                command = `pnpm remotion lambda render ${site} Main out.mp4 --props=${propsPath} && pnpm remotion lambda still ${site} Thumbnail out.png --props=${propsPath}`;
                break;
            case 'render-example':
                command = `pnpm remotion render ${compPath} ${composition} out.mp4 --props=${propsPath}`;
                break;
            case 'render-thumb-example':
                command = `pnpm remotion still ${compPath} ${composition} thumb.png --props=${propsPath}`;
                break;
        }

        console.log(`Running command: ${command}`);

        shell.exec(command);
    }

    private getFullDuration(
        renderData: {
            duration: number;
        }[],
    ): number {
        const transitionDurationInSeconds = 2.9;

        return renderData.reduce((accumulator, currentValue, index) => {
            if (!renderData || index !== renderData.length - 1) {
                return (
                    accumulator +
                    currentValue.duration +
                    transitionDurationInSeconds
                );
            }

            return accumulator + currentValue.duration;
        }, 0);
    }
}
