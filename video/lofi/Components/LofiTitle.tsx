import { interpolate } from 'remotion';
import { useCurrentFrame } from 'remotion';
import React from 'react';

import { loadFont } from '@remotion/google-fonts/Roboto';

const { fontFamily } = loadFont(); // "Titan One"

export const Title: React.FC<{
    titleText: string;
    titleColor: string;
    fontSize: number;
}> = ({ titleText, titleColor, fontSize = 120 }) => {

    return (
        <div
            style={{
            color: titleColor,
            fontFamily: fontFamily,
            fontSize: fontSize,
            fontWeight: 'bold',
            lineHeight: '1.5',
            }}
        >
            {titleText}
        </div>
    );
};
