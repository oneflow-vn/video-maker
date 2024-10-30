import React from 'react';
import {AbsoluteFill } from 'remotion';
import useParentSize from '../hooks/useParentSize';
import { ThreeDFrameInner } from './private/ThreeDFrameInner';
import { ThreeCanvas } from '@remotion/three';

const container: React.CSSProperties = {
	width: '100%',
	height: '100%',
	// Border: '1px solid red',
};

export const ThreeDFrame: React.FC<{
	debug?: boolean,
  children: React.ReactNode;
}> = ({debug, children}) => {
	const {ref, metrics} = useParentSize();

	return (
		<AbsoluteFill ref={ref} style={container} >
		<ThreeCanvas linear width={metrics.width} height={metrics.height} >
			<ThreeDFrameInner debug={debug}>
				{children}
			</ThreeDFrameInner>
		</ThreeCanvas>
		</AbsoluteFill>
	);
};
