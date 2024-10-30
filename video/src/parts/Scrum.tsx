import React  from 'react';

import * as THREE from 'three';
import { useAnimationContext } from '../hooks/useAnimationContext';
import { ThreeDArrow } from '../video_components/ThreeDArrow';
import { GroupInitialState } from '../video_components/GroupInitialState';


// eslint-disable-next-line max-params
function generateSpiralCirclePoints(
  circleRadius: number,
  zIncrement: number,
  numberOfPoints: number,
  numberOfTurns: number,
  bending: number,
): THREE.Vector3[] {
  const points: THREE.Vector3[] = [];

  const startAngle = bending / 1.5;
  const trueNumberOfTurns = numberOfTurns - startAngle * numberOfTurns / Math.PI ;

  for (let i = 0; i <= numberOfPoints; i++) {
    const angle = ((2 * Math.PI + startAngle) * trueNumberOfTurns * i ) / numberOfPoints;
    const x = circleRadius * Math.sin(angle);
    const y = -circleRadius * Math.cos(angle) + bending;
    const z = (zIncrement * i) / numberOfPoints;

    points.push(new THREE.Vector3(x, y, z));
  }

  return points;
}

export const Scrum: React.FC<{actor: string, headActor?: string, bendingActor?: string, rotationZ?: number, color?: THREE.Color, coils?: number}> = ({actor, headActor, bendingActor, rotationZ, color, coils}) => {
  const context = useAnimationContext();
  const headMove = headActor ? (context.getGeneralValue(headActor) ?? 0) : 0;
  const trueBending = bendingActor? (context.getGeneralValue(bendingActor) ?? 0) : 0;
  const totalCols = coils ?? 1;

  const radius = 1;
  const spiralCirclePoints = generateSpiralCirclePoints(
    radius,
    1+0.2 * totalCols,
    20 * totalCols,
    totalCols,
    trueBending
  );


  const oneSprint = [new THREE.Vector3(-2.4, -radius, -1), ...spiralCirclePoints, new THREE.Vector3(1, -radius, 1+0.2 * totalCols), new THREE.Vector3(2, -radius + headMove, 1 + .3 * totalCols)]

  const daily = generateSpiralCirclePoints(
    0.3,
    0,
    10,
    1,
    1.5
  );


  return (
    <>
    <GroupInitialState position={[0,0, 0]} rotation={[0, 0, rotationZ ?? 0]} scale={1}>
      <ThreeDArrow actor={actor} tubeRadius={0.2} color={color ?? new THREE.Color(0x59788e)} points={oneSprint}/>
      <GroupInitialState position={[1, 0 + trueBending, 0]} rotation={[0, 0, 0]} scale={1}>
        <ThreeDArrow actor={actor} tubeRadius={0.1} color={color ?? new THREE.Color(0xed7117)} points={daily}/>
      </GroupInitialState>
    </GroupInitialState>
    </>
  );
};
