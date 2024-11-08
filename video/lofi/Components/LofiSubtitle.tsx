import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';

type SubtitleProps = {
    text: string;
    color: string;
    fontSize?: number;
};

export const Subtitle: React.FC<SubtitleProps> = ({ text, color, fontSize = 60 }) => {
    return <div style={{ color, fontSize }}>{text}</div>;
};
