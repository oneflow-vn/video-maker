import React, { CSSProperties } from 'react';
import {AbsoluteFill, Img, staticFile} from 'remotion';
import AnimationEffect from '../video_components/AnimationEffect';

export const Company: React.FC<{style?: CSSProperties}> = ({ style }) => {
  return (
		<AnimationEffect actor="company" style={style}>
			<AbsoluteFill>
				<svg width="100%" height="100%" viewBox="0 0 100 120">
				<defs>
					<linearGradient id="linear" x1="0%" y1="0%" x2="100%" y2="0%">
					<stop offset="0%" stopColor="#95a"/>
					<stop offset="100%" stopColor="#0a5"/>
					</linearGradient>
					</defs>
					<rect x="1" y="10" width="98" height="108" rx="10" ry="10" fill="rgb(0, 0, 0, 0.3)" stroke='black' strokeWidth={1} />
					<rect x="20" y="1" width="60" height="18" rx="10" ry="10" fill="white" stroke='black' strokeWidth={1} />
					<text x="50" y="13.5" fontSize={10} fontWeight="bolder" textAnchor="middle" fill="url(#linear)">COMPANY</text>
				</svg>
			</AbsoluteFill>
			<AnimationEffect actor="business person" style={{left: '78%', top: '60%', width: '15%'}} >
				<Img src={staticFile("assets/less/service_person.svg")} width="100%"/>
				<span>Business person</span>
			</AnimationEffect>
		</AnimationEffect>
  );
};