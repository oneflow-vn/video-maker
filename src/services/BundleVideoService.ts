import path from 'path';
import { bundle } from '@remotion/bundler';

import { log } from '../utils/log';
import { getPath } from '../config/defaultPaths';

type BundleVideoServiceProps = {
    template: string;
};

export default class BundleVideoService {
    public async execute(
        { template = 'podcast' }: BundleVideoServiceProps = {
            template: 'podcast',
        },
    ): Promise<string> {
        log(`Bundling video`, 'BundleVideoService');
        const bundled = await bundle(
            require.resolve(
                path.resolve(await getPath('remotion'), template, 'index.js'),
            ),
        );

        return bundled;
    }
}
