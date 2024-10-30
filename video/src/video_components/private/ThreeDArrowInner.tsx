import {useMemo} from 'react'
import {useRef} from 'react'
import React  from 'react';

import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

// eslint-disable-next-line max-params
function createPartialTubeGeometry(curve: THREE.CatmullRomCurve3, percentage: number, radialSegments = 8, tubularSegments = 50, radius = 0.1) {
  const segmentPercentage = Math.max(Math.min(percentage, 1), 0);
  const segmentCount = Math.round(tubularSegments * segmentPercentage);

  const fullTubeGeometry = new THREE.TubeGeometry(curve, tubularSegments, radius, radialSegments, false);

  const vertices = fullTubeGeometry.getAttribute('position').array;
  const normals = fullTubeGeometry.getAttribute('normal').array;
  const uvs = fullTubeGeometry.getAttribute('uv').array;

  const indices = [];
  for (let i = 0; i < segmentCount; i++) {
    for (let j = 0; j < radialSegments; j++) {
      const a = i * (radialSegments + 1) + j;
      const b = a + radialSegments + 1;
      indices.push(a, b, a + 1);
      indices.push(b, b + 1, a + 1);
    }
  }

  const partialTubeGeometry = new THREE.BufferGeometry();
  partialTubeGeometry.setIndex(indices);
  partialTubeGeometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  partialTubeGeometry.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
  partialTubeGeometry.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));

  return partialTubeGeometry;
}



export const ThreeDArrowInner: React.FC<{percentage: number, points: THREE.Vector3[], color: THREE.Color, emissive: THREE.Color, tubeRadius: number}> = ({percentage, points, color, emissive, tubeRadius}) => {
  // Create a curved line
  const curve = new THREE.CatmullRomCurve3(points);

  const tubeMaterial = new THREE.MeshStandardMaterial({ color,
    emissive,
  emissiveIntensity: 0.3, // Adjust the intensity to control the glow amount
  side: THREE.DoubleSide  });


  // Calculate arrow properties
  const arrowLength = tubeRadius * 4;

  // Create arrowhead geometry (cone)
  const arrowHeadRadius = tubeRadius * 2;
  const arrowHeadHeight = arrowLength;
  const arrowHeadGeometry = useMemo(() => new THREE.ConeGeometry(arrowHeadRadius, arrowHeadHeight, 32)
  , [arrowHeadRadius, arrowHeadHeight]);

  // Calculate arrowhead position and orientation
  const arrowHead = useRef<THREE.Mesh>(null);
	const mesh = useRef<THREE.Mesh>(null);

	useFrame(() => {
    if (mesh.current) {
			const newGeometry = createPartialTubeGeometry(curve, percentage, 8, 150, tubeRadius);
			mesh.current.geometry.dispose();
			mesh.current.geometry = newGeometry;

			// Update arrowhead position and direction
			if (arrowHead.current) {
				const arrowPosition = curve.getPointAt(percentage);
				const arrowDirection = curve.getTangentAt(percentage);

				arrowHead.current.position.copy(arrowPosition);
				arrowHead.current.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), arrowDirection.clone().normalize());
			}
		}
  });
	
  return (
		<>
		<mesh ref={mesh} material={tubeMaterial} />
			{percentage !== 0 && <mesh
        ref={arrowHead}
        geometry={arrowHeadGeometry}
        material={new THREE.MeshStandardMaterial({
           color,
          emissive,
        emissiveIntensity: 0.3, // Adjust the intensity to control the glow amount
           })}
      />}

		</>
  );
};
