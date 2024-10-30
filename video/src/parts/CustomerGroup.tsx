import React, { CSSProperties } from 'react';
import {AbsoluteFill, Img, staticFile} from 'remotion';
import AnimationEffect from '../video_components/AnimationEffect';

export const CustomerGroup: React.FC<{style?: CSSProperties}> = ({ style }) => {

  return (
      <AbsoluteFill style={style}>
				<div style={{position: 'relative', left: '0%', top:'0%', width: '100%', height: '100%'}}>
					<AnimationEffect actor="worried-mom">
					  <Img src={staticFile("assets/WorriedMom.svg")} style={{position: 'absolute', left: '20%', top: '15%', width: '80%'}} />
					</AnimationEffect>
					<AnimationEffect actor="happy-mom">
					  <Img src={staticFile("assets/HappyMom.svg")} style={{position: 'absolute', left: '20%', top: '15%', width: '80%'}} />
					</AnimationEffect>
					<Img src={staticFile("assets/BabyUser.svg")} style={{position: 'absolute', left: '0%', top: '25%', width: '50%'}} />
				</div>
      </AbsoluteFill>
  );
};