import {
    linearTiming,
    TransitionSeries,
} from '@remotion/transitions';

import { fade } from '@remotion/transitions/fade';
import { Background } from './Background';
import { useVideoConfig } from 'remotion';

type BackgroundSeriesProps = {
    backgrounds: {
        path: string;
        duration: number;
        durationInFrames?: number;
    }[];
};

export const BackgroundSeries: React.FC<BackgroundSeriesProps> = ({
    backgrounds,
}: BackgroundSeriesProps) => {
    const { fps } = useVideoConfig();
    return (
        <TransitionSeries>
            {backgrounds.map((background, index) => (
                <>
                    <TransitionSeries.Transition
                        timing={linearTiming({ durationInFrames: 200 })}
                        presentation={fade()}
                    />
                    <TransitionSeries.Sequence durationInFrames={background.duration * fps}>
                        <Background backgroundPath={background.path} />
                    </TransitionSeries.Sequence>
                </>
            ))}
        </TransitionSeries>
    );
};
