import { AbsoluteFill, staticFile, Audio, Series } from 'remotion';
import { useCurrentFrame } from 'remotion';
// import { LofiLogo } from './Components/LofiLogo';
import { Background } from './Components/Background';
import { LofiVisualization } from './Components/LofiVisualization';
import { LofiIntro } from './Components/LofiIntro';
import { LofiContentSchema } from './Schema/props.schema';
import { ProgressStepsTimer } from './Components/ProgressStepsTimer';
import { LogoText } from './LogoText';
import { BackgroundSeries } from './Components/BackgroundSeries';
import { Title } from './Components/LofiTitle'
import { Subtitle } from './Components/LofiSubtitle';

export const LofiComposition: React.FC<LofiContentSchema> = ({
    content: LofiSchema,
}) => {
    const { totalHours, sections, backgroundPath, duration, backgrounds, title, subtitle } =
        LofiSchema;
    const durationInFrames = duration * 30;
    const frame = useCurrentFrame();
    const introFrames = 120;

    return (
        <AbsoluteFill className="bg-gray-100 justify-center items-center">
            <Background backgroundPath={backgroundPath} />
            {backgrounds && <BackgroundSeries backgrounds={backgrounds} />}

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
                <div style={{ top: '15%', left: '10%', position: 'absolute' }}>
                    <Title titleText={title} titleColor={'blue'} />
                    <Subtitle text={subtitle} color={'red'} />
                </div>
            </AbsoluteFill>

            <div className="p-8 w-1/4 fixed bottom-0 right-0">
                <ProgressStepsTimer
                    absoluteFrame={frame}
                    durationInFrames={durationInFrames}
                    type={1}
                    processBarColour={'bg-gray-100'}
                    countdownTextColour={'text-white'}
                    section={null}
                    subtitle={''}
                />
            </div>
            <LogoText />
        </AbsoluteFill>
    );
};
