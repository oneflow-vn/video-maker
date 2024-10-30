import React, { CSSProperties } from 'react';
import { useAnimationContext } from "../hooks/useAnimationContext";
import stringToValidHtmlId from '../models/stringToValidHtmlId';

function getStylePresence(style: CSSProperties): CSSProperties | undefined {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {opacity, transform, transformOrigin, ...rest} = style;
  if (Object.keys(rest).length !== 0) return style;
  if (
    opacity === undefined ||
    Number(opacity) === 1 ||
    Number(opacity) < 0.01
  )
    return undefined;
  return style;
}

interface StageProps {
  actor: string;
  children?: React.ReactNode;
  style?: CSSProperties;
}

const AnimationEffect: React.FC<StageProps> = ({ actor, style, children }) => {
  const animationContextWrapper = useAnimationContext();
  const threeDObjectState = animationContextWrapper.get3DObjectStateOf(actor);
  const effectStyle: CSSProperties = threeDObjectState.toStyle();
  const shadowEffectStyle: CSSProperties | undefined = getStylePresence(threeDObjectState.toShadowStyle());

  return (
    <>
    <div id={stringToValidHtmlId(actor)} style={{position: 'absolute', width: '100%', height:'100%',  ...(style || {}), ...effectStyle}}>
      {children}
    </div>
    { shadowEffectStyle && <div style={{ position: 'absolute', width: '100%', height: '100%', ...(style || {}),  ...shadowEffectStyle}} >
      {children}
      </div> }
    </>
  );
};

export default AnimationEffect;
