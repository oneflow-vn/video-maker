import {InterpolateRanges} from './InterpolateRanges';
import {InterpolatesOfField} from './InterpolatesOfField';

export class LazyState {
	protected interpolateRanges: Map<string, InterpolatesOfField>;

	constructor(
		allFields: {name: string; type: 'additive' | 'multiplitive'}[]
	) {
		this.interpolateRanges = new Map();
		allFields.forEach(({name, type}) => {
			this.interpolateRanges.set(name, new InterpolatesOfField(type));
		});
	}

  private sureGetField(key: string): InterpolatesOfField {
		const field = this.interpolateRanges.get(key);
		if (!field) {
			throw new Error(`Unknown interpolation field ${key}`);
		}
		return field;
	}

	setInterpolation(
		key: string,
		interpolateRange: InterpolateRanges
	): void {
		const field = this.sureGetField(key);
		field.add(interpolateRange);
	}

	combineInto(prev: LazyState, output: LazyState): void {
		this.interpolateRanges.forEach((interpolateRange, key) => {
			const combined = interpolateRange.combine(prev.sureGetField(key));
			output.interpolateRanges.set(key, combined);
		});
	}

	reduceInterpolate(
		frame: number,
		fps: number,
		field: string
	): number | undefined {
		return this.sureGetField(field).reduceInterpolate(frame, fps);
	}
}
