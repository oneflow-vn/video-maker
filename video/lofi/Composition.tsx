import { AbsoluteFill, staticFile, Audio, Series } from 'remotion';
import { useCurrentFrame } from 'remotion';
// import { LofiLogo } from './Components/LofiLogo';
import { Background } from './Components/Background';
import { LofiVisualization } from './Components/LofiVisualization';
import { minutesToFrames, getMinutesWithHours } from './Utilities/Tools';
import { LofiIntro } from './Components/LofiIntro';
import { LofiContentSchema } from './Schema/props.schema';
import { ProgressStepsTimer } from './Components/ProgressStepsTimer';
import { LofiLogo } from './Components/LofiLogo';

import countdown from '../../assets/countdown.mp3';

export const LofiComposition: React.FC<LofiContentSchema> = ({
    content: LofiSchema
}) => {
    const { totalHours, sections, backgroundPath } = LofiSchema;
    const frame = useCurrentFrame();
    const introFrames = 120;

    return (
        <AbsoluteFill className="bg-gray-100 justify-center items-center">
            <Background backgroundPath={backgroundPath} />
            <LofiLogo />

            {/* use sections every item */}
            <Series>
                <Series.Sequence durationInFrames={introFrames}>
                    <Audio src={countdown} volume={0.1} />
                    <LofiIntro />
                </Series.Sequence>
                {sections.map((section, index) => {
                    let subtitle = section.subtitle;
                    const { durationFrames } = section;
                    return (
                        <Series.Sequence
                            durationInFrames={durationFrames}
                            key={'sqx_' + index}
                        >
                            <LofiVisualization section={section} />
                            <div className="p-8 w-1/4 fixed bottom-0 right-0">
                                <ProgressStepsTimer
                                    absoluteFrame={frame}
                                    type={1}
                                    // durationInFrames={progressTimerFrames}
                                    processBarColour={'bg-gray-100'}
                                    countdownTextColour={'text-white'}
                                    section={section}
                                    subtitle={subtitle}
                                />
                            </div>
                        </Series.Sequence>
                    );
                })}
            </Series>

            {/* <Sequence from={introFrames} durationInFrames={progressTimerFrames}>
				<ProgressTimer
					absoluteFrame={frame}
					type={2}
					durationInFrames={progressTimerFrames}
					processBarColour={'bg-gray-500'}
					isShowCountdown={true}
					isShowPercentage={true}
				/>
			</Sequence> */}
        </AbsoluteFill>
    );
};
