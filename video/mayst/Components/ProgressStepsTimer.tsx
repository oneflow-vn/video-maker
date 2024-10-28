import { interpolate, useCurrentFrame } from 'remotion';
import React from 'react';
import { z } from 'zod';
import { lofiSectionSchema } from '../Schema/props.schema';

export const progressStepsTimerInputSchema = z.object({
    absoluteFrame: z.number().nullish(),
    type: z.number().min(1).max(3).default(1),
    countdownTextColour: z.string().nullish(),
    textColour: z.string().nullish(),
    processBarColour: z.string().nullish(),
    section: lofiSectionSchema.nullish(),
    subtitle: z.string().nullish(),
    durationInFrames: z.number().default(0),
});

export type ProgressStepsTimerInputSchema = z.infer<
    typeof progressStepsTimerInputSchema
>;

export const ProgressStepsTimer: React.FC<ProgressStepsTimerInputSchema> = ({
    type = 1,
    countdownTextColour: textColour = 'rgb(226 232 240)',
    processBarColour = 'rgb(148 163 184)',
    subtitle = '',
    durationInFrames = 0,
}) => {
    const frame = useCurrentFrame();

    const progress = interpolate(frame, [0, durationInFrames], [0, 100], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    const countUp = interpolate(
        frame,
        [0, durationInFrames],
        [0, durationInFrames / 30],
        {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
        },
    );

    const opacity = interpolate(frame, [140, 170], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    const countUpNumber = secondsToTimeFormat(Math.floor(countUp));
    let view = <></>;
    switch (type) {
        case 1:
            view = (
                <div
                    style={{
                        opacity: opacity,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '0.5rem',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            width: '100%',
                            alignItems: 'center',
                        }}
                    >
                        <span
                            style={{
                                fontSize: '4rem',
                                fontWeight: '500',
                                color: textColour || 'white',
                            }}
                        >
                            {countUpNumber}
                        </span>
                    </div>
                    <div
                        style={{
                            width: '100%',
                            outline: '1px solid #E5E7EB',
                            borderRadius: '9999px',
                            height: '2rem',
                            textAlign: 'center',
                            fontWeight: 'bold',
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <div
                            style={{
                                height: '1.5rem',
                                borderRadius: '9999px',
                                backgroundColor: processBarColour || 'white',
                                margin: '0.25rem',
                                width: `${progress}%`,
                            }}
                        ></div>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <span
                            style={{
                                fontSize: '2.5rem',
                                fontWeight: '300',
                                color: textColour || 'white',
                            }}
                        >
                            {subtitle}
                        </span>
                    </div>
                </div>
            );
            break;
    }

    return view;
};

function secondsToTimeFormat(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    const formattedMinutes = `${minutes < 10 ? '0' : ''}${minutes}`;
    const formattedSeconds = `${
        remainingSeconds < 10 ? '0' : ''
    }${remainingSeconds}`;

    return hours > 0
        ? `${hours}:${formattedMinutes}:${formattedSeconds}`
        : `${minutes}:${formattedSeconds}`;
}
