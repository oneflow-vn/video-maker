import React  from 'react';

import * as THREE from 'three';
import { useAnimationContext } from '../hooks/useAnimationContext';
import { ThreeDArrowInner } from './private/ThreeDArrowInner';

export const ThreeDArrow: React.FC<{actor: string, points: THREE.Vector3[], color?: THREE.Color, emissive?: THREE.Color, tubeRadius?: number}> = ({
  actor, points, color, emissive, tubeRadius}) => {
  const percentage = useAnimationContext().getGeneralValue(actor) ?? 0;
  const sureColor = color ?? new THREE.Color(0x000000)

  return <ThreeDArrowInner points={points} color={sureColor} emissive={emissive ?? sureColor} percentage={percentage} tubeRadius={tubeRadius ?? 0.1}/>
};
