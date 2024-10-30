import {useEffect} from 'react'
import {useRef} from 'react'
import {useAnimationContext} from '../hooks/useAnimationContext';
import React, {CSSProperties} from 'react';
import AnimationEffect from '../video_components/AnimationEffect';

export const WindBlow: React.FC<{actor: string; style: CSSProperties}> = ({
	actor,
	style,
}) => {
	const context = useAnimationContext();
	const wholeProgress = context.getGeneralValue(actor) ?? 0;

	const svgRef = useRef<SVGSVGElement>(null);

	useEffect(() => {
		const svg = svgRef.current;
		if (!svg) {
			return;
		}

		const paths = svg.querySelectorAll('path');

		paths.forEach((path) => {
			path.style.stroke = 'rgba(255,255,255,0.3)';
			const pathLength = path.getTotalLength();
			const progress = Math.min(1, wholeProgress * 2);
			const progressDisappear = Math.max(0, wholeProgress * 2 - 1);
			path.style.strokeDasharray = `${pathLength} ${pathLength}`;
			if (progress < 1) {
				path.style.strokeDashoffset = `${pathLength - progress * pathLength}`;
			} else if (progressDisappear > 0) {
				path.style.strokeDashoffset = `-${progressDisappear * pathLength}`;
			} else {
				path.style.strokeDashoffset = '0';
			}
		});
	}, [wholeProgress]);

	return (
		<AnimationEffect actor={actor} style={style}>
		<svg
      ref={svgRef}
			version="1.1"
			fill='none'
			id="Capa_1"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 24 24"
			xmlSpace="preserve"
		>
			<g id="SVGRepo_bgCarrier" strokeWidth="0" /><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" /><g id="SVGRepo_iconCarrier"> <path d="M2 15H18.5C20.43 15 22 16.57 22 18.5C22 20.43 20.43 22 18.5 22C16.57 22 15 20.43 15 18.5V18" stroke="#292D32" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" /> <path d="M2 12H18.5C20.42 12 22 10.43 22 8.5C22 6.58 20.42 5 18.5 5C16.58 5 15 6.57 15 8.5V9" stroke="#292D32" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" /> <path d="M2 9H9.31C10.8 9 12 7.79 12 6.31C12 4.82 10.79 3.62 9.31 3.62C7.82 3.62 6.62 4.83 6.62 6.31V6.69" stroke="#292D32" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" /> </g>
			</svg>
		</AnimationEffect>
	);
};
