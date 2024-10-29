import {
    AbsoluteFill,
    staticFile,
    Audio,
    Series,
    getInputProps,
} from 'remotion';
import { useCurrentFrame } from 'remotion';
// import { LofiLogo } from './Components/LofiLogo';
import { Background } from './Components/Background';
import { LofiVisualization } from './Components/LofiVisualization';
import { LofiIntro } from './Components/LofiIntro';
import { LofiContentSchema } from './Schema/props.schema';
import { ProgressStepsTimer } from './Components/ProgressStepsTimer';
import { LogoText } from './LogoText';
import { BackgroundSeries } from './Components/BackgroundSeries';
import { LofiMain } from './Components/LofiMain';
import { FirefliesOverlay } from './Components/Overlays/FirefliesOverlay';

const { content } = getInputProps() as LofiContentSchema;

export const LofiComposition: React.FC<LofiContentSchema> = () => {
    const {
        sections,
        backgroundPath,
        duration,
        backgrounds,
        backgroundMusicPath,
        title,
        subtitle,
        noIntro,
    } = content;

    const durationInFrames = duration * 30;
    const frame = useCurrentFrame();
    const introFrames = 120;

    return (
        <AbsoluteFill
            style={{
                backgroundColor: '#f3f4f6',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Background backgroundPath={backgroundPath} />
            {backgrounds && <BackgroundSeries backgrounds={backgrounds} />}

            {backgroundMusicPath && (
                <Audio
                    src={staticFile(backgroundMusicPath)}
                    loop={true}
                    volume={0.35}
                />
            )}

            <Series>
                {!noIntro && (
                    <Series.Sequence durationInFrames={introFrames}>
                        <LofiIntro />
                    </Series.Sequence>
                )}
                {sections.map((section, index) => {
                    const { durationFrames } = section;
                    return (
                        <Series.Sequence
                            durationInFrames={durationFrames}
                            key={'sqx_' + index}
                        >
                            <LofiVisualization section={section} />
                        </Series.Sequence>
                    );
                })}
            </Series>

            <AbsoluteFill>
                <LofiMain title={title} subtitle={subtitle} />
            </AbsoluteFill>

            <div
                style={{
                    padding: '2rem',
                    width: '25%',
                    position: 'fixed',
                    bottom: '2.5rem',
                    right: '0',
                }}
            >
                <ProgressStepsTimer
                    absoluteFrame={frame}
                    durationInFrames={durationInFrames}
                    type={1}
                    processBarColour={'rgb(243 244 246)'}
                    countdownTextColour={'white'}
                    section={null}
                    subtitle={''}
                />
            </div>

            <FirefliesOverlay />

            <LogoText />
        </AbsoluteFill>
    );
};
