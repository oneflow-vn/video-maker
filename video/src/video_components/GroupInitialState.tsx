import React from 'react';

export const GroupInitialState: React.FC<{
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  children: React.ReactNode;
}> = ({ position, rotation, scale, children }) => {
  return (
    <group scale={scale} position={position} rotation={ rotation || [0, 0, 0]}>
      { children }
    </group>
  );
}
