import React from 'react';
import { Cell } from './gameOfLife';
import { useThree } from '@react-three/fiber';
import { Plane } from '@react-three/drei';
import * as THREE from 'three';

function createGradientTexture(color1: THREE.Color, color2: THREE.Color, alpha: number): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const ctx = canvas.getContext('2d')!;
  const gradient = ctx.createRadialGradient(50, 50, 0, 50, 50, 70);

  canvas.width = 100;
  canvas.height = 100;

  gradient.addColorStop(0, `${color1.getStyle().substring(0, color2.getStyle().length -1)},${alpha})`);
  gradient.addColorStop(1, `${color2.getStyle().substring(0, color2.getStyle().length -1)},${alpha * alpha})`);

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const texture = new THREE.CanvasTexture(canvas);
  return texture;
}

export const CellPane: React.FC<{ cellToHighlight: Cell, color: THREE.Color, progress: number }> = ({ cellToHighlight, color, progress }) => {
  const { size } = useThree();
  const cellSize = 1;

  const gradientTexture = createGradientTexture(
    color,
		color,
		progress / 3,
  );

  return (
    <>
      <gridHelper args={[size.width, size.height]} position={[cellSize / 2, 0, cellSize / 2]} />
      <Plane
				args={[cellSize, cellSize]}
				position={[cellToHighlight.x, 0.001, cellToHighlight.y]}
				rotation-x={-Math.PI / 2}
				 >
        <meshBasicMaterial transparent map={gradientTexture} />
      </Plane>
    </>
  );
};
