import { AnimatedGlb } from '../video_components/AnimatedGlb';
import {useLoader } from '@react-three/fiber';
import React from 'react';
import {staticFile, useVideoConfig} from 'remotion';
import { GLTFLoader } from 'three-stdlib';

const url = staticFile('assets/slugterra gun.gltf')

export const Blaster: React.FC<{actor: string}> = ({actor}) => {
	useVideoConfig();
	
  return <AnimatedGlb url={url} actor={actor} />

};
useLoader.preload(GLTFLoader, url);