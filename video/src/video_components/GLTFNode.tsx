import { Clone } from '@react-three/drei';
import { useLoader } from '@react-three/fiber';
import React, { useEffect, useRef, useState } from 'react';
import { Box3, Box3Helper, Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export const GLTFNode: React.FC<{
  nodeName: string,
  url: string,
  recenter?: boolean,
  debugBox?: boolean,
}> = ({ nodeName, recenter, url, debugBox }) => {
  const gltf = useLoader(GLTFLoader, url);
  const [node, setNode] = useState<Group | null>(null);
  const [boxHelper, setBoxHelper] = useState<Box3Helper | null>(null);
  
  const meshRef = useRef<Group>(null);

  useEffect(() => {
    const updateNode = () => {
      if (gltf) {
        const foundNode = gltf.scene.getObjectByName(nodeName);
        if (foundNode) {
          if(recenter) {
            foundNode.position.set(0, 0, 0);
            foundNode.updateMatrixWorld();
          }
          setNode(foundNode as THREE.Group);

          if (debugBox) {
            const box = new Box3().setFromObject(foundNode);
            const helper = new Box3Helper(box);

            setBoxHelper(helper);
          }
        }
      }
    };

    updateNode();
  }, [gltf, nodeName, recenter, debugBox, url]);

  return (
    <group ref={meshRef}>
      {node && <Clone object={node} />}
      {boxHelper && <primitive object={boxHelper} />}
    </group>
  );
};
