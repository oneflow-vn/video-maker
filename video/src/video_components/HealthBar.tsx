import styled from 'styled-components'
import React, { CSSProperties } from 'react';
import AnimationEffect from "./AnimationEffect";
import { useAnimationContext } from '../hooks/useAnimationContext';

const HealthBarContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border: 2px solid #fad052;
  border-radius: 8px;
`;

const BackgroundBar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #403c3d;
  border-radius: 6px;
`;

const ShadowBar = styled.div`
  position: absolute;
  top: 0%;
  left: 0;
  width: 100%;
  height: 50%;
  background-color: rgba(0,0,0,0.2);
  border-radius: 6px;
`;

interface HealthBarProps {
  actor: string;
  leftSide?: boolean;
  style?: React.CSSProperties;
}

const HealthBarStyled = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  background-color: #fad052;
  border-radius: 6px;
`;

const HealthBar: React.FC<HealthBarProps> = ({ actor, leftSide, style }) => {
  const hackedProgress = useAnimationContext().getGeneralValue(actor);

  const additionalStyle: CSSProperties = {
    [leftSide ? 'right': 'left']: 0,
    backgroundImage: hackedProgress === 0 ? `repeating-linear-gradient(
      ${leftSide ? '' : '-'}45deg,
      rgba(255, 0, 0, 0.7),
      rgba(255, 255, 255, 0.7) 10px,
      transparent 10px,
      transparent 20px
    )`: ''
  };

  return (
    <AnimationEffect actor={actor} style={style}>
      <HealthBarContainer>
        <BackgroundBar />
        <ShadowBar />
        <HealthBarStyled
          style={{...additionalStyle, width: `${Math.max(0, Math.min(100, hackedProgress ===0 ? 100 : hackedProgress ?? 0))}%` }}
          />
      </HealthBarContainer>
    </AnimationEffect>
  );
};

export default HealthBar;
