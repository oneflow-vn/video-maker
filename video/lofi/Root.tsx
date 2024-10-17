import { Composition } from 'remotion';
import { LofiComposition } from './Composition';
import { getMinutesWithHours, minutesToFrames } from './Utilities/Tools';
import { LofiContentSchema, lofiSchema } from './Schema/props.schema';

import './style.css';

// const calculateMetadata: CalculateMetadataFunction<lofiSchema> = ({
//   props,
//   defaultProps,
//   abortSignal,
// }) => {
//   return {
//     // Change the metadata
//     durationInFrames: props.duration,
//     // or transform some props
//     props,
//     // or add per-composition default codec
//     defaultCodec: "h264",
//   };
// };

export const RemotionRoot: React.FC = () => {
    const dProps: LofiContentSchema = {
        content: {
            totalHours: 0,
            backgroundPath: 'background.png',
            sections: [],
        },
        destination: 'youtube',
        durationInFrames: 0,
    };
    const fps = 30;
    // const totalFrames = 25320;
    // const minutes = getMinutesWithHours(dProps.totalHours);
    // const totalFrames = minutesToFrames(minutes, fps) + 30 + 120;
    return (
        <>
            <Composition
                id="MyComp"
                component={LofiComposition}
                durationInFrames={0}
                fps={fps}
                width={1920}
                height={1080}
                schema={lofiSchema}
                defaultProps={dProps as any}
                calculateMetadata={async ({ props, defaultProps, abortSignal }) => {
                    console.log('props: ', props);
                    const fps = 30;
                    const minutes = getMinutesWithHours(props.content.totalHours);
                    const totalFrames = minutesToFrames(minutes, fps) + 30 + 120;
                    return {
                        durationInFrames: totalFrames,
                        props,
                    };
                }}
            />
        </>
    );
};
