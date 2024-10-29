import { AudioData, useAudioData, visualizeAudio } from '@remotion/media-utils';
import {
    AbsoluteFill,
    Audio,
    Sequence,
    interpolate,
    staticFile,
    useCurrentFrame,
    useVideoConfig,
} from 'remotion';
// import speechSrc from './speech.mp3';
// import musicSrc from './music.mp3';
// import { AudioWaveform } from './visualizations/AudioWaveform';
import { BarsVisualization } from './visualizations/BarsVisualization';
import { LofiSectionSchema } from '../Schema/props.schema';
import { isFirstSection, isPomodoro } from '../Schema/props';

/**
 * Component API:s
 *
 * There are quite a few props that will allow for
 * customizing the components and easily creating new
 * variations for the end user.
 *
 * You could even expose some props to the end user
 * in a settings panel so they can tweak and create
 * their own variation.
 */

/**
 * Audio Sensitivity
 *
 * Each component takes optional `maxDb` and `minDb` props
 * that affect the "sensitivity" of the visualization.
 * They are set at sensible defaults, but I recommend
 * exposing these properties to the user to they can
 * adjust how much the visualizations react to the audio.
 *
 * Note: decibels are negative values (or zero)!
 * Sensible values for `minDb` and `maxDb` are in the range
 * of -120 to 0.
 */

const combineValues = (length: number, sources: Array<number[]>): number[] => {
    return Array.from({ length }).map((_, i) => {
        return sources.reduce((acc, source) => {
            // pick the loudest value for each frequency bin
            return Math.max(acc, source[i]);
        }, 0);
    });
};

const visualizeMultipleAudio = ({
    sources,
    ...options
}: {
    frame: number;
    fps: number;
    numberOfSamples: number;
    sources: Array<AudioData>;
    smoothing?: boolean | undefined;
}) => {
    const sourceValues = sources.map(source => {
        return visualizeAudio({ ...options, audioData: source });
    });
    return combineValues(options.numberOfSamples, sourceValues);
};

export const LofiVisualization: React.FC<{ section: LofiSectionSchema }> = ({
    section,
}) => {
    // console.log('yyy');
    const { fps } = useVideoConfig();
    const frame = useCurrentFrame();
    // const speechData = useAudioData(speechSrc);

    // console.log(section);
    const bgm = staticFile(section.bgm.path);
    const musicData = useAudioData(bgm);

    // if (!speechData) return null;
    if (!musicData) return null;

    // I suggest using either 1024, or 512.
    // Larger number = finer details
    // Smaller number = faster computation
    const nSamples = 512;

    // console.log('frame: ', frame);

    const visualizationValues = visualizeMultipleAudio({
        fps,
        frame,
        sources: [musicData],
        numberOfSamples: nSamples,
    });

    // optional: use only part of the values
    const frequencyData = visualizationValues.slice(0, 0.7 * nSamples);
    const isFirst = isFirstSection(section);

    const volume = interpolate(
        frame,
        [0, 300, section.durationFrames - 300, section.durationFrames],
        [1, 1, 1, 1],
        {
            extrapolateLeft: 'clamp',
        },
    );
    return (
        <AbsoluteFill>
            <Sequence from={0} durationInFrames={Infinity}>
                <Audio src={bgm} volume={volume} />
                <div
                    style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'row',
                        gap: '2px',
                        justifyContent: 'center',
                    }}
                >
                    <div
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            display: 'flex',
                            transform: 'scaleX(-1)',
                            opacity: '0.8',
                        }}
                    >
                        <BarsVisualization
                            frequencyData={frequencyData}
                            width={600}
                            height={140}
                            lineThickness={8}
                            gapSize={8}
                            roundness={4}
                            placement={'middle'}
                            color={'rgba(255, 255, 255, 0.4)'}
                            maxAmplitude={1}
                        />
                    </div>
                </div>
            </Sequence>
            {isFirst ? (
                <>
                    <Sequence
                        from={0}
                        durationInFrames={section.startVoice?.durationFrames}
                    >
                        <Audio
                            src={staticFile(section.startVoice?.path || '')}
                        />
                    </Sequence>
                    <Sequence
                        from={
                            section.durationFrames -
                            (section.endVoice?.durationFrames || 0)
                        }
                        durationInFrames={section.endVoice?.durationFrames}
                    >
                        <Audio src={staticFile(section.endVoice?.path || '')} />
                    </Sequence>
                </>
            ) : (
                <>
                    <Sequence
                        from={
                            section.durationFrames -
                            (section.startVoice?.durationFrames || 0)
                        }
                        durationInFrames={section.startVoice?.durationFrames}
                    >
                        <Audio
                            src={staticFile(section.startVoice?.path || '')}
                        />
                    </Sequence>
                </>
            )}
        </AbsoluteFill>
    );
};
