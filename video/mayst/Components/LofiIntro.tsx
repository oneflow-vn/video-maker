import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';

const fontFamily = 'OoohBaby';

const cursor: React.CSSProperties = {
    height: 120,
    width: 8,
    display: 'inline-block',
    backgroundColor: 'white',
    marginLeft: 4,
    marginTop: -4,
};

export const LofiIntro = () => {
    const frame = useCurrentFrame();
    const text = 'Tháng Năm Stories';
    // A new character every 3 frames
    const charsShown = Math.floor(frame / 3);
    const textToShow = text.slice(0, charsShown);
    // Show the cursor while the text is typing, then start blinking
    const cursorShown =
        textToShow.length === text.length ? Math.floor(frame / 10) % 2 === 1 : true;

    const opacity = interpolate(frame, [90, 120], [1, 0], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
    });

    return (
        <AbsoluteFill style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', opacity }}>
            <div
                style={{
                    fontSize: '9rem',
                    color: 'white',
                    fontWeight: 'bold',
                    fontFamily,
                    textShadow: '0px 4px 3px rgba(0, 0, 0, 0.4), 0px 8px 13px rgba(0, 0, 0, 0.1), 0px 18px 23px rgba(0, 0, 0, 0.1)'
                }}
            >
                {textToShow}
                <span
                    style={{
                        ...cursor,
                        verticalAlign: 'middle',
                        opacity: Number(cursorShown),
                    }}
                />
            </div>
        </AbsoluteFill>
    );
};
