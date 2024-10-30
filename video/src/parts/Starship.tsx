import {useLoader } from '@react-three/fiber';
import React from 'react';
import {staticFile, useVideoConfig} from 'remotion';
import { GLTFLoader } from 'three-stdlib';

const url = staticFile('assets/spacex_starship_sn24_superheavy_bn7.glb')
export const Starship: React.FC = () => {
	useVideoConfig();
	
	const { scene } = useLoader(GLTFLoader, url);

  return <group>
			<primitive object={scene} />
		</group>

};
useLoader.preload(GLTFLoader, url);