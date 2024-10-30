import React  from 'react';

import { Box, Text } from '@react-three/drei';
import { ThreeAnimationEffect } from './ThreeAnimationEffect';

export const BoxWithText: React.FC<{actor: string, text: string}> = ({
  actor, text}) => {
  const boxSize: [number, number, number] = [3, 1.5, 2];

  return <ThreeAnimationEffect actor={actor} position={[0, 0, 0]} rotation={[0, 0, 0]} scale={1}>
      <Box position={[0, 0, -boxSize[2]/2]} args={boxSize} >
        <meshStandardMaterial color="orange" />
      </Box>
      <Text color="#000" anchorX="center" anchorY="middle" position={[0, 0, 0.01]}
      fontSize={0.5} >
        {text}
      </Text>
  </ThreeAnimationEffect>
};
