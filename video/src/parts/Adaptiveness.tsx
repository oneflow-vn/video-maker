import React, { CSSProperties } from 'react';
import AnimationEffect from '../video_components/AnimationEffect';

export const Adaptiveness: React.FC<{style?: CSSProperties}> = ({ style }) => {
  return (
      <div style={{ ...style, perspective: "500px", transformStyle: "preserve-3d", height: "60px"}}>
				<AnimationEffect actor="adaptiveness-text" style={{ textAlign: "center", bottom: "0%", fontSize: "50px", fontWeight: "bolder" }}>
					ADAPTIVENESS
				</AnimationEffect>
				<AnimationEffect actor="agility-text" style={{
					transformOrigin: "50% 100%",
					 textAlign: "center", color: "rgba(0, 0, 0, 0.5)", bottom: "0%", fontSize: "50px", fontWeight: "bolder", letterSpacing: "25px" }}>
					<span>AGILITY</span>
				</AnimationEffect>
      </div>
  );
};