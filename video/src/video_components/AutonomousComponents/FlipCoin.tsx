import {AbsoluteFill, interpolate} from 'remotion'
import {spring} from 'remotion'
import React from 'react';
import autonomousComponent, { AutonomousComponentProps } from '../hoc/autonomousComponent';

interface CoinFlipProps extends AutonomousComponentProps {
  speed: number;
  interval: number;
  shift: number;
  children: React.ReactNode;
}

const CoinFlipInner: React.FC<CoinFlipProps> = ({frame, fps, speed, interval, shift, children}) => {
  const oneRotation = fps * speed;
  const oneRound = oneRotation + fps * interval;
  const rotationFrame = (frame + fps * shift) % oneRound;
  const rotation = rotationFrame <= oneRotation ? spring({
    frame: rotationFrame,
    fps,
    durationInFrames: oneRotation,
    config: {
      damping: 30,
      stiffness: 150,
      mass: 0.5,
    },
  }): 0;

  const animatedRotationY = interpolate(rotation, [0, 1], [0, 360]);

  const coinStyle: React.CSSProperties = {
    transform: `rotateY(${animatedRotationY}deg)`,
    transformStyle: 'preserve-3d',
  };

  return <AbsoluteFill style={coinStyle} >
    {children}
    </AbsoluteFill>;
};

export const FlipCoin = autonomousComponent(CoinFlipInner);
