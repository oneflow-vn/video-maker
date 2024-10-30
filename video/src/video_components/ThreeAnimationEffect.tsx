import React from 'react';
import {useAnimationContext} from '../hooks/useAnimationContext';
import {GroupInitialState} from './GroupInitialState';

export const ThreeAnimationEffect: React.FC<{
	actor: string;
	position?: [number, number, number];
	rotation?: [number, number, number];
	scale?: number;
	children: React.ReactNode;
}> = ({
	actor,
	position: intialPosition,
	rotation: initialRotation,
	scale: initialScale,
	children,
}) => {
	const animationContextWrapper = useAnimationContext();
	const {scale, position, rotation, opacity} =
		animationContextWrapper.get3DObjectStateOf(actor);

	return (
		<GroupInitialState
			position={position.toArray() as [number, number, number]}
		>
			<GroupInitialState position={intialPosition}>
				<GroupInitialState
					rotation={rotation.toArray() as [number, number, number]}
				>
					<GroupInitialState
						scale={scale * (initialScale ?? 1)}
						rotation={initialRotation}
					>
						{opacity > 0.1 && children}
					</GroupInitialState>
				</GroupInitialState>
			</GroupInitialState>
		</GroupInitialState>
	);
};
