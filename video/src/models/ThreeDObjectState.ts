import {CSSProperties} from 'react';
import * as THREE from 'three';

export class ThreeDObjectState {
	glow: number;
	opacity: number;
	scale: number;
	position: THREE.Vector3;
	rotation: THREE.Euler;
	lookAtD: THREE.Vector3;

	constructor() {
		this.glow = 0;
		this.opacity = 1;
		this.scale = 1;
		this.position = new THREE.Vector3();
		this.rotation = new THREE.Euler();
		this.lookAtD = new THREE.Vector3();
	}

	toStyle(): CSSProperties {
		const transforms: string[] = [];

		transforms.push(`scale(${this.scale})`);

		['translateX', 'translateY', 'translateZ'].forEach((key, index) => {
			const translate = this.position.getComponent(index);
			if (translate !== undefined) {
				transforms.push(`${key}(${translate}px)`);
			}
		});

		['rotatex', 'rotatey', 'rotatez'].forEach((key, index) => {
			const rotate = this.rotation.toArray()[index];
			if (rotate !== undefined) {
				transforms.push(`${key}(${rotate}rad)`);
			}
		});

		const result: CSSProperties = {};

		if (transforms.length > 0) {
			result.transform = transforms.join(' ');
		}

		result.opacity = this.opacity;

		return result;
	}

	toShadowStyle(): CSSProperties {
		const result: CSSProperties = {};
		result.opacity = 1 - this.glow;
		result.transform = `scale(${1 + this.glow * 0.2})`;
		return result;
	}

}
