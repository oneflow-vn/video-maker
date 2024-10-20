import { WebpackOverrideFn } from '@remotion/bundler';
import NodePolyfillPlugin from 'node-polyfill-webpack-plugin';

export const webpackOverride: WebpackOverrideFn = currentConfiguration => {
    currentConfiguration.plugins = currentConfiguration.plugins || [];

    currentConfiguration.plugins.push(new NodePolyfillPlugin());

    currentConfiguration.target = 'node';

    return currentConfiguration;
};
