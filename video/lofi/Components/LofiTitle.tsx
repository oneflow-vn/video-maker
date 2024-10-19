import { interpolate } from 'remotion';
import { useCurrentFrame } from 'remotion';
import React from 'react';

import { loadFont } from '@remotion/google-fonts/Roboto';

const { fontFamily } = loadFont(); // "Titan One"
const fontSize = 120;

export const Title: React.FC<{
    titleText: string;
    titleColor: string;
}> = ({ titleText, titleColor }) => {
    return (
        <div
            style={{ color: titleColor, fontFamily, fontSize }}
            className="font-bold leading-relaxed"
        >
            {' '}
            {titleText}
        </div>
    );
};
