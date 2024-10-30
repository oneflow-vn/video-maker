import React, { useEffect } from 'react';
import { useAnimationContext } from '../hooks/useAnimationContext';
import { useThree } from '@react-three/fiber';

export const UnderCamera: React.FC<{
  children: React.ReactNode;
}> = ({children}) => {
	const animationContextWrapper = useAnimationContext();
	const { position, lookAtD } = animationContextWrapper.get3DObjectStateOf("camera");


	// Place a camera and set the distance to the object.
	// Then make it look at the object.
	const camera = useThree((state) => state.camera);
	useEffect(() => {
		camera.position.set(position.x,  position.y, position.z);
		camera.near = 0.2;
		camera.lookAt(lookAtD.x,  lookAtD.y,  lookAtD.z);
	}, [camera, lookAtD, position]);


	return (
		<group>{children}</group>
	);
};
