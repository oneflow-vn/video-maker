import * as THREE from 'three';
import {ThreeDObjectState} from './ThreeDObjectState';
import {InterpolateRanges} from './InterpolateRanges';
import { LazyState } from './LazyState';

export type TextReveal = {
	progress: number;
	cursorShow: boolean;
};

export type InterpolateFields =
	| 'glow'
	| 'rotationX'
	| 'rotationY'
	| 'rotationZ'
	| 'oscillateX'
	| 'oscillateY'
	| 'oscillateZ'
	| 'cameraLookAtX'
	| 'cameraLookAtY'
	| 'cameraLookAtZ'
	| 'opacity'
	| 'scale'
	| 'translateY'
	| 'translateX'
	| 'translateZ';

const allFields = [
	{name: 'glow', type: 'additive'},
	{name: 'rotationX', type: 'additive'},
	{name: 'rotationY', type: 'additive'},
	{name: 'rotationZ', type: 'additive'},
	{name: 'oscillateX', type: 'additive'},
	{name: 'oscillateY', type: 'additive'},
	{name: 'oscillateZ', type: 'additive'},
	{name: 'cameraLookAtX', type: 'additive'},
	{name: 'cameraLookAtY', type: 'additive'},
	{name: 'cameraLookAtZ', type: 'additive'},
	{name: 'opacity', type: 'multiplitive'},
	{name: 'scale', type: 'multiplitive'},
	{name: 'translateX', type: 'additive'},
	{name: 'translateY', type: 'additive'},
	{name: 'translateZ', type: 'additive'},
] as {name: InterpolateFields; type: 'additive' | 'multiplitive'}[];

export default class LazyThreeDObjectState {
	private lazyState: LazyState = new LazyState(allFields);

	setInterpolation(
		key: InterpolateFields,
		interpolateRange: InterpolateRanges
	): void {
		this.lazyState.setInterpolation(key, interpolateRange);
	}

	reduceInterpolate(
		frame: number,
		fps: number,
		field: InterpolateFields,
	): number | undefined {
		return this.lazyState.reduceInterpolate(frame, fps, field);
	}

	combine(prev: LazyThreeDObjectState): LazyThreeDObjectState {
		const result = new LazyThreeDObjectState();
		this.lazyState.combineInto(prev.lazyState, result.lazyState);
		return result;
	}


	get3DObjedctState(frame: number, fps: number): ThreeDObjectState {
		const result = new ThreeDObjectState();
		result.glow = this.reduceInterpolate(frame, fps, 'glow') ?? 0;
		result.scale = this.reduceInterpolate(frame, fps, 'scale') ?? 1;
		result.opacity = this.reduceInterpolate(frame, fps, 'opacity') ?? 1;

		const position = [0, 0, 0];
		(['translateX', 'translateY', 'translateZ'] as InterpolateFields[]).forEach(
			(key, index) => {
				const translate = this.reduceInterpolate(frame, fps, key);
				if (translate !== undefined) {
					position[index] = translate;
				}
			}
		);

		const oscillation = [0, 0, 0];
		(['oscillateX', 'oscillateY', 'oscillateZ'] as InterpolateFields[]).forEach(
			(key, index) => {
				const translate = this.reduceInterpolate(frame, fps, key);
				if (translate !== undefined) {
					oscillation[index] = translate;
				}
			}
		);
		result.position = new THREE.Vector3(
			position[0] + oscillation[0],
			position[1] + oscillation[1],
			position[2] + oscillation[2]
		);

		const cameraLookAt = [0, 0, 0];
		(
			['cameraLookAtX', 'cameraLookAtY', 'cameraLookAtZ'] as InterpolateFields[]
		).forEach((key, index) => {
			const translate = this.reduceInterpolate(frame, fps, key);
			if (translate !== undefined) {
				cameraLookAt[index] = translate;
			}
		});

		result.lookAtD = new THREE.Vector3(
			cameraLookAt[0],
			cameraLookAt[1],
			cameraLookAt[2]
		);

		const rotation = [0, 0, 0];
		(['rotationX', 'rotationY', 'rotationZ'] as InterpolateFields[]).forEach(
			(key, index) => {
				const translate = this.reduceInterpolate(frame, fps, key);
				if (translate !== undefined) {
					rotation[index] = translate;
				}
			}
		);
		result.rotation = new THREE.Euler(rotation[0], rotation[1], rotation[2]);

		return result;
	}

}
