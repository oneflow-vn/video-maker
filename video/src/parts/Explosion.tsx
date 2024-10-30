import React from 'react';
import {staticFile} from 'remotion';
import { AnimatedGlb } from '../video_components/AnimatedGlb';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three-stdlib';

const url = staticFile('assets/animated_low_poly_explosion.glb') 

export const Explosion: React.FC<{
  actor: string,
}> = ({ actor }) => {
  return (
    <>
    <AnimatedGlb url={url} actor={actor}/>
    </>
  );
};

useLoader.preload(GLTFLoader, url);
