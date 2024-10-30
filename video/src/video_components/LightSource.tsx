import React from 'react';
import { useAnimationContext } from '../hooks/useAnimationContext';

export const LightSource: React.FC<{
	actor: string,
	color: string,
	position: [number, number, number],
}> = ({actor, color, position}) => {
	const animationContextWrapper = useAnimationContext();
	const intensity = animationContextWrapper.getGeneralValue(actor);

	return (
		<directionalLight
			position={position}
			intensity={intensity}
			color={color}
		/>	
	);
};
