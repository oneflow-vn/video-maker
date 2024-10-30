import {staticFile} from 'remotion'
import * as THREE from 'three';

import { TwoDImage } from '../video_components/TwoDImage';
import { ThreeDArrow } from '../video_components/ThreeDArrow';

export const LeSSComplete: React.FC = () => {
  return (
		<>
				<directionalLight castShadow position={[10, 20, 15]} intensity={.9} color={0xffffff} />	
				<TwoDImage actor="experiments" rotation={[0, 0, 0]} position={[0, 0, 0]} scale={1} url={staticFile("assets/less/complete/complete-experiments.png")} />
				<TwoDImage actor="guides" rotation={[0, 0, 0]} position={[0, 0, -2]} scale={1.5} url={staticFile("assets/less/complete/complete-guides.png")} />
				<TwoDImage actor="rules" rotation={[0, 0, 0]} position={[0, 0, -4]} scale={1.98} url={staticFile("assets/less/complete/complete-rules.png")} />
				<TwoDImage actor="principles" rotation={[0, 0, 0]} position={[0, 0, -6]} scale={2.4} url={staticFile("assets/less/complete/complete-principles.png")} />
				<ThreeDArrow actor="less complete arrow" points={[new THREE.Vector3(0.3, -0.5, -6), new THREE.Vector3(0.8, -0.8, -4), new THREE.Vector3(1.6, -1.2, 1), new THREE.Vector3(1, -2.4, 0.5), new THREE.Vector3(0.9, -2.1, 0.3), new THREE.Vector3(0.6, -2.1, -5), new THREE.Vector3(0.3, -1.1, -6)]}/>
			</>
  );
};
