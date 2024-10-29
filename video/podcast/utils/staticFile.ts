import { getInputProps, staticFile } from 'remotion';
import { LofiContentSchema } from '../../lofi/Schema/props.schema';

const { assetsHost } = getInputProps() as LofiContentSchema;

const getAssetsHost = () => {
    return assetsHost || '';
};

export const staticFileRel = (path: string) => {
    const assetsHost = getAssetsHost();
    if (assetsHost) {
        return `${assetsHost}/${path}`;
    }

    return staticFile(path.substring(path.lastIndexOf('/') + 1));
};
