import {Vector2, Vector3} from '@react-three/fiber';
import LazyThreeDObjectState, {InterpolateFields} from './LazyThreeDObjectState';
import BaseActioner from './BaseActioner';
import {
	InterpolateRangesLinear,
	InterpolateRangesSpring,
	InterpolateRangesOscillate,
} from './InterpolateRanges';
import EffectCalculator, { EffectCalculatorAndAction } from './EffectCalculator';

const toVector3 = (
	value: number | Vector2 | Vector3
): [number, number, number] => {
	if (typeof value === 'number') {
		return [value, 0, 0];
	}
	if (value.length === 2) {
		return [...value, 0];
	}
	if (value.length === 3) {
		return [...value];
	}
	throw new Error('Unsupported input type');
};

export default class ObjectActioner extends BaseActioner<LazyThreeDObjectState> {
	static defaultValue: LazyThreeDObjectState = new LazyThreeDObjectState();
  effectCalculator: EffectCalculator;

  constructor(effectCalculator: EffectCalculatorAndAction) {
		super(effectCalculator);
    this.effectCalculator = effectCalculator.effectCalculator;
  }

	protected getState(): LazyThreeDObjectState {
		switch (this.action.actionType) {
			case 'scale':
				return this.scale(this.action.outputRange);
			case 'move':
				return this.move([0, 0, 0], this.action.absolutePosition);
			case 'move and return':
				return this.moveAndReturn(this.action.absolutePosition);
			case 'appear':
				return this.getAppearStyle([0, 1]);
			case 'disappear':
				return this.getAppearStyle([1, 0]);
			case 'glow':
				return this.glow();
			case 'rotate and rise':
				return this.scale([0, 1])
					.combine(this.move([0, -this.action.value, 0], [0, 0, 0]))
					.combine(this.rotateFrom([0, -360, 0]));
			case 'oscillate':
				return this.oscillate(this.action.delta);
			case 'camera look at':
				return this.cameraLookAt(this.action.absolutePosition);
			case '3d rotate':
				return this.rotate(this.action.totalRotation);
			case '3d rotate and back':
				return this.rotateAndBack(this.action.totalRotation);
			default:
				return new LazyThreeDObjectState();
		}
	}

	private glow(): LazyThreeDObjectState {
		const result = new LazyThreeDObjectState();
		result.setInterpolation(
			'glow',
			new InterpolateRangesLinear(this.frameRange, [0, 1])
		);
		return result;
	}

	private getAppearStyle(outputRange: number[]): LazyThreeDObjectState {
		const result = new LazyThreeDObjectState();
		result.setInterpolation(
			'opacity',
			new InterpolateRangesLinear(this.effectCalculator.startFrameRange, outputRange)
		);
		result.setInterpolation(
			'opacity',
			new InterpolateRangesLinear(this.effectCalculator.endFrameRange, outputRange.slice().reverse())
		);
		return result;
	}

	private move(
		from: [number, number, number],
		distances: number | Vector2 | Vector3
	): LazyThreeDObjectState {
		const result = new LazyThreeDObjectState();
		const vector: [number, number, number] = toVector3(distances);

		(['translateX', 'translateY', 'translateZ'] as InterpolateFields[]).forEach(
			(key, index) => {
				result.setInterpolation(
					key,
					new InterpolateRangesSpring(this.frameRange, [
						from[index],
						vector[index],
					])
				);
			}
		);

		return result;
	}

	private moveAndReturn(
		distances: number | Vector2 | Vector3
	): LazyThreeDObjectState {
		const result = new LazyThreeDObjectState();
		const vector: [number, number, number] = toVector3(distances);
		(['translateX', 'translateY', 'translateZ'] as InterpolateFields[]).forEach(
			(key, index) => {
				result.setInterpolation(
					key,
					new InterpolateRangesSpring(this.effectCalculator.startFrameRange, [
						0,
						vector[index],
					])
				);
				result.setInterpolation(
					key,
					new InterpolateRangesSpring(this.effectCalculator.endFrameRange, [
						vector[index],
						0,
					])
				);
			}
		);
		return result;
	}



	private oscillate(distances: number | Vector3 | Vector2): LazyThreeDObjectState {
		const result = new LazyThreeDObjectState();
		const vector: [number, number, number] = toVector3(distances);

		(['oscillateX', 'oscillateY', 'oscillateZ'] as InterpolateFields[]).forEach(
			(key, index) => {
				result.setInterpolation(
					key,
					new InterpolateRangesOscillate(
						this.frameRange,
						vector[index]
					)
				);
			}
		);
		return result;
	}

	private scale(outputRange: number[]): LazyThreeDObjectState {
		const result = new LazyThreeDObjectState();
		result.setInterpolation(
			'scale',
			new InterpolateRangesSpring(this.frameRange, outputRange)
		);
		return result;
	}

	private cameraLookAt(position: number | Vector3 | Vector2): LazyThreeDObjectState {
		const result = new LazyThreeDObjectState();

		(
			['cameraLookAtX', 'cameraLookAtY', 'cameraLookAtZ'] as InterpolateFields[]
		).forEach((key, index) => {
			result.setInterpolation(
				key,
				new InterpolateRangesSpring(this.frameRange, [
					0,
					toVector3(position)[index],
				])
			);
		});
		return result;
	}

	private rotate(rotation: [number, number, number]): LazyThreeDObjectState {
		return this.rotateFromTo(this.frameRange, [0, 0, 0], rotation);
	}

	private rotateAndBack(
		rotation: [number, number, number]
	): LazyThreeDObjectState {
		return this.rotateFromTo(this.effectCalculator.endFrameRange, rotation, [0, 0, 0]).combine(
			this.rotateFromTo(this.effectCalculator.startFrameRange, [0, 0, 0], rotation)
		)
	}

	private rotateFrom(rotation: [number, number, number]): LazyThreeDObjectState {
		return this.rotateFromTo(this.frameRange, rotation, [0, 0, 0]);
	}

	private rotateFromTo(
		inputRange: [number, number],
		from: [number, number, number],
		to: [number, number, number]
	): LazyThreeDObjectState {
		const result = new LazyThreeDObjectState();
		(['rotationX', 'rotationY', 'rotationZ'] as InterpolateFields[]).forEach(
			(key, index) => {
				result.setInterpolation(
					key,
					new InterpolateRangesSpring(inputRange, [
						(Math.PI * from[index]) / 180,
						(Math.PI * to[index]) / 180,
					])
				);
			}
		);
		return result;
	}

}
