import { interpolate } from 'remotion';
import { useCurrentFrame } from 'remotion';
import React from 'react';
import { Title } from './LofiTitle';
import { Subtitle } from './LofiSubtitle';

export const LofiMain: React.FC<{
    title: string;
    subtitle: string;
}> = ({ title, subtitle }) => {
    const frame = useCurrentFrame();
    const opacity = interpolate(frame, [140, 170], [0, 1], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });
    return (
        <div
            className="absolute top-0 left-0 w-full h-full flex justify-center items-end"
            style={{ opacity }}
        >
            <div className="w-1/2 flex flex-col justify-center items-center mt-4">
                <div className="mb-40">
                    <Title titleText={title} titleColor={'#fe2858'} />
                    <Subtitle text={subtitle} color={'#2af0ea'} />
                </div>
            </div>
            <div className="w-1/2 flex flex-col justify-center items-center mt-4"></div>
        </div>
    );
};
