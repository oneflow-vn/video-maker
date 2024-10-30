import EffectCalculator from './EffectCalculator';

export abstract class InterpolateRanges {
	abstract inputRange: number[];

	getInterpolateValue(
		frame: number,
		fps: number,
		prev: number | undefined
	): number {
		const effectCalculator: EffectCalculator = new EffectCalculator(
			(this.inputRange[this.inputRange.length - 1] - this.inputRange[0]) / fps,
			this.inputRange[0] / fps,
			0,
			0,
			frame,
			fps
		);

		return this.calculate(effectCalculator, prev);
	}

	abstract asPreviousValue(
		prev: number | undefined,
		frame: number
	): number | undefined;

	protected abstract calculate(
		effectCalculator: EffectCalculator,
		prev?: number
	): number;
}

export class InterpolateRangesOscillate extends InterpolateRanges {
	inputRange: number[];
	distance: number;

	constructor(inputRange: number[], distance: number) {
		super();
		this.inputRange = inputRange;
		this.distance = distance;
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	asPreviousValue(prev: number | undefined, frame: number): number | undefined {
		return prev;
	}

	protected calculate(effectCalculator: EffectCalculator, prev?: number) {
		const result =
			-Math.sin(effectCalculator.timeWithIn() * Math.PI * 2) * this.distance;
		return result + (prev ?? 0);
	}
}

export class InterpolateRangesSpring extends InterpolateRanges {
	outputRange: number[];
	inputRange: number[];

	constructor(inputRange: number[], outputRange: number[]) {
		super();
		this.inputRange = inputRange;
		this.outputRange = outputRange;
	}

	protected calculate(effectCalculator: EffectCalculator, prev?: number) {
		const outputRange = [...this.outputRange];
		if (prev) {
			outputRange[0] = prev;
		}

		return effectCalculator.interpolateSpring(outputRange);
	}

	asPreviousValue(prev: number | undefined, frame: number): number | undefined {
		if (frame >= this.inputRange[this.inputRange.length - 1])
			return this.outputRange[this.outputRange.length - 1];
		return prev;
	}
}

export class InterpolateRangesLinear extends InterpolateRanges {
	inputRange: number[];
	private outputRange: number[];

	constructor(inputRange: number[], outputRange: number[]) {
		super();
		this.inputRange = inputRange;
		this.outputRange = outputRange;
	}

	protected calculate(effectCalculator: EffectCalculator, prev?: number) {
		const outputRange = [...this.outputRange];
		if (prev) {
			outputRange[0] = prev;
		}

		return effectCalculator.interpolateDuration(outputRange);
	}

	asPreviousValue(prev: number | undefined, frame: number): number | undefined {
		if (frame >= this.inputRange[this.inputRange.length - 1])
			return this.outputRange[this.outputRange.length - 1];
		return prev;
	}
}
