import {enableTailwind} from '@remotion/tailwind';
import {WebpackOverrideFn} from '@remotion/bundler';

export const webpackOverride: WebpackOverrideFn = (currentConfiguration) => {

    currentConfiguration.resolve = {
        ...currentConfiguration.resolve,
        fallback: {
            ...currentConfiguration.resolve?.fallback,
        }
    }

	return enableTailwind(currentConfiguration);
};