import EffectCalculator, { EffectCalculatorAndAction } from "./EffectCalculator"
import { Script } from "./Script";
import { Action } from "./Subtitles";

const getActionDuration = (action: Action, startTime: number, script: Script): number => {
	if ('duration' in action) {
		return action.duration;
	}

	let result: number | undefined;

	if(action.persistUntilSubtitleId) {
	  result = script.getStartTimeOfSubtitleById(action.persistUntilSubtitleId) - startTime;
	}

	if(action.endingTimeAdjustment !== undefined) {
		if (result === undefined) {
			result = 0;
		}
		result += action.endingTimeAdjustment;
	}
	return result ?? Number.MAX_SAFE_INTEGER;
}

const getStartDuration = (action: Action): number | undefined => {
	if ('startDuration' in action) {
		return action.startDuration;
	}
}

const getEndDuration = (action: Action): number | undefined => {
	if ('endDuration' in action) {
		return action.endDuration;
	}
}

export const createEffectCalculator = (action: Action, startTime: number, frame: number, script: Script): EffectCalculatorAndAction => {
	const startDuration = getStartDuration(action) ?? 0;
	const endDuration = getEndDuration(action) ?? 0;
	const duration = getActionDuration(action, startTime, script);
	return new EffectCalculatorAndAction(action, new EffectCalculator(duration, startTime + (action.offset ?? 0), startDuration, endDuration, frame, script.fps));
}