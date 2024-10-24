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
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'end',
                opacity,
            }}
        >
            <div
                style={{
                    width: '50%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '1rem',
                }}
            >
                <div style={{ marginBottom: '10rem' }}>
                    <Title titleText={title} titleColor={'#fe2858'} />
                    <Subtitle text={subtitle} color={'#2af0ea'} />
                </div>
            </div>
            <div
                style={{
                    width: '50%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '1rem',
                }}
            ></div>
        </div>
    );
};
