import {useLoader } from '@react-three/fiber';
import React from 'react';
import {staticFile, useVideoConfig} from 'remotion';
import { GLTFLoader } from 'three-stdlib';

const url = staticFile('assets/thinking_emoji.glb')
export const ThinkingEmoji: React.FC = () => {
	useVideoConfig();
	
	const { scene } = useLoader(GLTFLoader, url);

  return <group>
			<primitive object={scene} />
		</group>

};
useLoader.preload(GLTFLoader, url);