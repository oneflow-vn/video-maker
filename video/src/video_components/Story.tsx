import {Composition} from 'remotion'
import { AnimationContextProvider } from '../hooks/useAnimationContext';
import { Subtitle } from '../models/Subtitles';
import autonomousComponent from './hoc/autonomousComponent';
import React from 'react';
import AnimationContextWrapper from '../models/AnimationContextWrapper';
import { Connectors } from './private/Connectors';
import { Script } from "../models/Script";
import AnimationEffect from './AnimationEffect';

export const Story: React.FC<{id: string, subtitles: Subtitle[], width?: number, height?: number, language?: string, children: React.ReactNode}> = (({
  subtitles, id, width, height, language, children}) => {
  const globalFps = 30;
  const script = new Script(subtitles, globalFps);
  const InnerStory = autonomousComponent(({frame}) => {
    const animationContextWrapper = new AnimationContextWrapper(frame, script, language ?? 'en');

    return (
      <AnimationContextProvider value={animationContextWrapper}>
        {children}
        <AnimationEffect actor="connectors">
          <Connectors />
        </AnimationEffect>
      </AnimationContextProvider>
    );
  });

  return <Composition
    id={ id }
    component={ InnerStory }
    durationInFrames={script.getTotalFrame()}
    fps={globalFps}
    width={width ?? 1024}
    height={height ?? 720}
    />
});
