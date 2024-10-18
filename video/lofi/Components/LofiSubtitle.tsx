import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import { loadFont } from '@remotion/google-fonts/Courgette';

const { fontFamily } = loadFont(); // "Titan One"

type SubtitleProps = {
    text: string;
    color: string;
};


export const Subtitle: React.FC<SubtitleProps> = ({ text, color }) => {
	const frame = useCurrentFrame();
	const opacity = interpolate(frame, [30, 50], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});

	return (
		<div className="text-gray-600 text-5xl" style={{color, opacity, fontFamily }}>
			{text}
		</div>
	);
};
