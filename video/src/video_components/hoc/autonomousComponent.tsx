import React, { ComponentType } from 'react';
import { useCurrentFrame, useVideoConfig } from 'remotion';

export type AutonomousComponentProps = {
  frame: number;
  fps: number;
};

export default function autonomousComponent<P extends AutonomousComponentProps>(
  WrappedComponent: ComponentType<P>
): React.FC<Omit<P, keyof AutonomousComponentProps>> {
  return (props: Omit<P, keyof AutonomousComponentProps>) => {
    // Get the current frame number and video configuration
    const frame = useCurrentFrame();
    const { fps } = useVideoConfig();

    // Pass the frame number and fps to the wrapped component
    return (
      <WrappedComponent
        {...(props as P)}
        frame={frame}
        fps={fps}
      />
    );
  };
}