import { Command, Flags } from '@oclif/core';

import { startWorker as renderer } from '../workers/renderer';

export default class Worker extends Command {
    static description = 'Run a worker';

    static examples = ['<%= config.bin %> <%= command.id %>'];

    static flags = {};

    static args = [
        {
            name: 'worker',
            required: true,
            description: 'Worker to run',
            options: ['renderer'],
        },
    ];

    public async run(): Promise<void> {
        const { args } = await this.parse(Worker);

        switch (args.worker) {
            case 'renderer':
                await renderer();
                break;
        }
    }
}
