import {InterpolateRanges} from './InterpolateRanges';

export class InterpolatesOfField {
	private ranges: InterpolateRanges[] = [];
	private type: 'additive' | 'multiplitive';

  constructor(type: 'additive' | 'multiplitive') {
    this.type = type;
  }

	add(interpolateRange: InterpolateRanges) {
		this.ranges.push(interpolateRange);
	}

	combine(prev: InterpolatesOfField | undefined): InterpolatesOfField {
		const result = new InterpolatesOfField(this.type);
		result.ranges = [...(prev?.ranges || []), ...this.ranges];
		return result;
	}

	public reduceInterpolate(
		frame: number,
		fps: number,
	): number | undefined {
		const defaultValue = this.type === 'additive' ? 0 : 1;
		const values = this.getInterpolateValues(frame, fps);
		if (values.length === 0) return undefined;
		const oper = this.type === 'additive' ? (a: number, b: number) => a+b : (a: number, b: number) => a*b;
		return values.reduce(oper, defaultValue);
	}

	private getInterpolateValues(frame: number, fps: number): number[] {
		const result: number[] = [];
		if (this.ranges.length === 0) return [];
		let prev: number | undefined;
		let current = this.ranges[0];
		for (let i = 0; i < this.ranges.length; i++) {
			if (frame >= this.ranges[i].inputRange[0]) {
				current = this.ranges[i];
				const prevAny = this.ranges[i - 1];
				if (i > 0) {
					prev = prevAny.asPreviousValue(prev, frame);
				}
				if (frame < current.inputRange[current.inputRange.length - 1]) {
					result.push(current.getInterpolateValue(frame, fps, prev));
				}
			}
		}
		if (result.length === 0) {
			result.push(current.getInterpolateValue(frame, fps, prev));
		}
		return result;
	}
}
