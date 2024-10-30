import React, { CSSProperties } from "react";
import AnimationEffect from "./AnimationEffect";

export const Anchor: React.FC<{actor: string, style?: CSSProperties}> = ({actor, style}) => {
  return (
			<AnimationEffect actor={actor} style={{width: "1px", height: "1px", ...style}}/>
  );
};
