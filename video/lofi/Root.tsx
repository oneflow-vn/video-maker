import { Composition } from 'remotion';
import { LofiComposition } from './Composition';
import { getMinutesWithHours, minutesToFrames } from './Utilities/Tools';
import { LofiContentSchema, lofiSchema } from './Schema/props.schema';
import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

import './style.css';

// @ts-ignore
import fontVarelmo from '../../assets/Fontvn-DVN-Varelmo.ttf';

const fontFamily = "Varelmo";
 
loadFont({
  family: fontFamily,
  url: fontVarelmo,
  weight: "500",
}).then(() => {
  console.log("Font loaded!");
});

export const RemotionRoot: React.FC = () => {
    const dProps: LofiContentSchema = {
        content: {
            backgrounds: [],
            duration: 0,
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
                calculateMetadata={async ({ props }) => {
                    const fps = 30;
                    const totalFrames = Math.round(props.content.duration * fps);
                    return {
                        durationInFrames: totalFrames,
                        props,
                    };
                }}
            />
        </>
    );
};
