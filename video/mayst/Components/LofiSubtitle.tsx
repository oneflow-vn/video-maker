import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';

type SubtitleProps = {
    text: string;
    color: string;
    fontSize?: number;
};

const defaultFontSize = 60;

export const Subtitle: React.FC<SubtitleProps> = ({ text, color, fontSize = defaultFontSize }) => {
    return <div style={{ color, fontSize }}>{text}</div>;
};
