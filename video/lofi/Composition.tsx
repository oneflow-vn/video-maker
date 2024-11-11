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

const { content } = getInputProps() as LofiContentSchema;

export const LofiComposition: React.FC<LofiContentSchema> = () => {
    const { sections, backgroundPath, duration, backgrounds, title, subtitle } =
        content;

    const durationInFrames = duration * 30;
    const frame = useCurrentFrame();
    const introFrames = 120;

    const titleLines = title.split('-');

    const chapter = (titleLines.length > 1 ? titleLines[titleLines.length - 1] : '').trim();

    const firstLine = title.replace(` - ${chapter}`, '').trim();

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

            <Audio src={staticFile('beneath_the_moonlight.mp3')} loop={true} volume={0.15}/>

            <Series>
                <Series.Sequence durationInFrames={introFrames}>
                    <LofiIntro />
                </Series.Sequence>
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
                <LofiMain title={firstLine} subtitle={subtitle} />
            </AbsoluteFill>

            <div
                style={{
                    padding: '2rem',
                    width: '25%',
                    position: 'fixed',
                    bottom: '60px',
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
                    subtitle={chapter}
                    idleOpacity={0.8}
                />
            </div>
            <LogoText />
        </AbsoluteFill>
    );
};
