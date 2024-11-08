import { Composition, useVideoConfig } from 'remotion';
import { LofiComposition } from './Composition';
import { getMinutesWithHours, minutesToFrames } from './Utilities/Tools';
import { LofiContentSchema, lofiSchema } from './Schema/props.schema';

import './style.css';

import { Thumbnail } from './Thumbnail';

export const RemotionRoot: React.FC = () => {
    const dProps: LofiContentSchema = {
        content: {
            backgrounds: [],
            duration: 0,
            totalHours: 0,
            backgroundPath: 'background.png',
            sections: [],
            title: '',
            subtitle: '',
            backgroundMusicPath: '',
            noIntro: false
        },
        destination: 'youtube',
        durationInFrames: 0,
    };
    const fps = 30;
    return (
        <>
            <Composition
                id="Main"
                component={LofiComposition}
                durationInFrames={0}
                fps={fps}
                width={1920}
                height={1080}
                schema={lofiSchema}
                defaultProps={dProps as any}
                calculateMetadata={async ({ props }) => {
                    const fps = 30;
                    const totalFrames = Math.round(props.content.duration * fps);
                    return {
                        durationInFrames: totalFrames,
                        props,
                    };
                }}
            />
            <Composition
                id="Thumbnail"
                component={Thumbnail}
                durationInFrames={1}
                fps={fps}
                width={1280}
                height={720}
                defaultProps={dProps as any}
            />
        </>
    );
};
