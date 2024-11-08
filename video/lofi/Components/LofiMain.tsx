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
                    alignItems: 'flex-start',
                    marginTop: '1rem',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    paddingLeft: '70px',
                    paddingBottom: '10px',
                    marginBottom: '70px'
                }}
            >
                <div>
                    <Title titleText={title} fontSize={48} titleColor={'rgb(200 200 200)'} />
                    <Subtitle text={subtitle} fontSize={36} color={'rgb(209 209 209)'} />
                </div>
            </div>
            <div
                style={{
                    width: '50%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: '1rem',
                }}
            >
            </div>
        </div>
    );
};
