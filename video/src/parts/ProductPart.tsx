import {useLoader } from '@react-three/fiber';
import React from 'react';
import {staticFile} from 'remotion';
import {roundedRect} from '../helpers/rounded-rectangle';
import { TextureLoader } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { GLTFNode } from '../video_components/GLTFNode';
import { GroupInitialState } from '../video_components/GroupInitialState';

const url = staticFile('assets/shape_sorting_box/scene.gltf')
useLoader.preload(GLTFLoader, url);

export const ProductPart: React.FC = () => {

	const boxSize = 1.4;
	const edge = 0.06;
	// Calculate a rounded rectangle for the phone screen
	const screenGeometry = roundedRect({
			width: boxSize - edge * 2,
			height: boxSize - edge * 2,
			radius: 0,
		});

	const servicePersonTexture = useLoader(TextureLoader, staticFile('assets/ProductPart1.svg'));

	return (
		<>
		<GroupInitialState scale={0.1} rotation={[0, Math.PI, 0]}>
      <GLTFNode recenter url={url} nodeName="Box"/>
		</GroupInitialState>

			<mesh position={[-boxSize/2+edge, edge,boxSize/2 + 0.001]}>
				<shapeGeometry args={[screenGeometry]}/>
					<meshBasicMaterial
						toneMapped={false}
						map={servicePersonTexture}
					/>
			</mesh>

		</>
	);
};
