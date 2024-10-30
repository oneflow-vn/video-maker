import {LazyState} from './LazyState';
import BaseActioner from './BaseActioner';
import {InterpolateRangesLinear} from './InterpolateRanges';

class LazyGeneralState {
	lazyState: LazyState = new LazyState([{name: 'value', type: 'additive'}]);

	combine(prev: LazyGeneralState): LazyGeneralState {
		const result = new LazyGeneralState();
		this.lazyState.combineInto(prev.lazyState, result.lazyState);
		return result;
	}

	getGeneralValue(adjustedFrame: number, fps: number): number | undefined {

		const result =  this.lazyState.reduceInterpolate(adjustedFrame, fps, 'value');
		return result;
	}
}

export default class GeneralValueActioner extends BaseActioner<LazyGeneralState> {
	static defaultValue: LazyGeneralState = new LazyGeneralState();

	protected getState(): LazyGeneralState {
		switch (this.action.actionType) {
			case 'additive value change to':
				return this.additiveValueChange([0, this.action.value]);
			default:
				return new LazyGeneralState();
		}
	}

	private additiveValueChange(outputRange: [number, number]): LazyGeneralState {
		const result = new LazyGeneralState();
		result.lazyState.setInterpolation(
			'value',
			new InterpolateRangesLinear(this.frameRange, outputRange)
		);
		return result;
	}
}
