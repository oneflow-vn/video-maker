import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';

type SubtitleProps = {
    text: string;
    color: string;
};

const fontSize = 60;

export const Subtitle: React.FC<SubtitleProps> = ({ text, color }) => {
    return <div style={{ color, fontSize }}>{text}</div>;
};
