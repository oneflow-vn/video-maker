import React from 'react';
import {staticFile} from 'remotion';
import { AnimatedGlb } from '../video_components/AnimatedGlb';
import { GroupInitialState } from '../video_components/GroupInitialState';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three-stdlib';

const url = staticFile('assets/simple_engine_plume_test.glb')

export const RocketPlume: React.FC<{
  position: [number, number, number]
  scale: number,
  actor: string,
}> = ({position, scale, actor}) => {
  return (
    <GroupInitialState rotation={[Math.PI, 0, 0]} position={position} scale={scale}>
      <AnimatedGlb url={url} actor={actor} />
    </GroupInitialState>
  );
};

useLoader.preload(GLTFLoader, url);
