import React from 'react';
import { useFrame } from '@react-three/fiber';
import { Clone, useAnimations } from '@react-three/drei';
import { Group } from 'three/src/Three';
import { useAnimationContext } from '../hooks/useAnimationContext';
import { useGLTF } from '@react-three/drei';

export const AnimatedGlb: React.FC<{
  actor: string,
  url: string,
}> = ({ actor, url }) => {
	const animationContextWrapper = useAnimationContext();
	const {playing, time } = animationContextWrapper.getGLBAnimationAttributes(actor);

  const groupRef = React.useRef<Group | null>(null);
  const { scene, animations } = useGLTF(url);
  const { actions, mixer } = useAnimations(animations, groupRef);

  React.useEffect(() => {
    const keys = Object.keys(actions);
    keys.forEach((key) => {
      const action = actions[key];
      if(action) {
        action?.play();
      }
    });
  }, [actions, time, playing]);

  useFrame(() => {
    if(time !== undefined) {
      mixer.setTime(time);
      console.log(time)
    }
  });


  return (
    <group ref={groupRef} visible={playing}>
      <Clone object={scene} />
    </group>
  );
};
