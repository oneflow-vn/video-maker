import { Command, Flags } from '@oclif/core';
import shell from 'shelljs';
import fs from 'fs';

import { GetContentService, PrepareResourceService } from '../services';

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
            options: ['podcast', 'lofi'],
            default: 'podcast',
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

        await new PrepareResourceService(content, directory).execute();

        const props = {
            content,
            destination: 'youtube',
            durationInFrames,
        };

        const propsPath = '/tmp/props.json';
        fs.writeFileSync(propsPath, JSON.stringify(props));

        let command = '';

        const { template } = flags;

        const compPath = `video/${template}/index.tsx`;

        switch (args.command) {
            case 'upgrade':
                command = 'pnpm remotion upgrade';
                break;
            case 'preview':
                command = `pnpm remotion preview ${compPath} --props=${propsPath}`;
                break;
            case 'render-example':
                command = `pnpm remotion render ${compPath} Main out.mp4 --props=${propsPath}`;
                break;
            case 'render-thumb-example':
                command = `pnpm remotion still ${compPath} Thumbnail thumb.png --props=${propsPath}`;
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
