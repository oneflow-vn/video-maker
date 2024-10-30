import { Action, ThreeDAnimationAction } from '@/models/Subtitles';
import EffectCalculator, { EffectCalculatorAndAction } from './EffectCalculator';

export type GLBAnimationAttributes = {
  playing: boolean;
  time?: number;
  pauseAtTime?: number,
}

export default class GLBAnimationActioner {
  action: Action;
  effectCalculator: EffectCalculator;

  static defaultValue: GLBAnimationAttributes = {
    playing: true,
  };

  constructor(effectCalculator: EffectCalculatorAndAction) {
    this.effectCalculator = effectCalculator.effectCalculator;
    this.action = effectCalculator.action;
  }

  combine(prev: GLBAnimationAttributes): GLBAnimationAttributes {
    const current = this.getCurrentValue();
    const pauseAtTime = current.time === undefined ? current.pauseAtTime ?? prev.pauseAtTime : undefined;
    const time = current.time ?? prev.time ?? pauseAtTime;
    return {
      playing: time !== undefined,
      time,
      pauseAtTime,
    }
  }

  private getCurrentValue(): GLBAnimationAttributes {
    switch(this.action.actionType) {
      case '3d animation start':
        return  this.getAnimationAttributes(this.action);
      case '3d animation reverse':
        return this.getReverseAnimationAttributes(this.action);
      default:
        return { ...GLBAnimationActioner.defaultValue};
    }
  }

  private getReverseAnimationAttributes(action: ThreeDAnimationAction): GLBAnimationAttributes {
    const {time, ...rest} = this.getAnimationAttributes(action);
    if(time === undefined) return { ...rest}
    return { ...rest, time: this.effectCalculator.PersisitDuration - time}
  }

  private getAnimationAttributes(action: ThreeDAnimationAction): GLBAnimationAttributes {
    return { 
      playing: true,
      time: this.getAnimationTime(action),
      pauseAtTime: action.freezeBeforeStart && this.effectCalculator.isBeforePersist() ? 0 : undefined,
    }
  }

  private getAnimationTime(action: ThreeDAnimationAction): number | undefined {
    const percentage = action.percentage ?? 100;
    if (this.effectCalculator.withInPersistDuration()) {
     return this.effectCalculator.timeWithIn() * percentage / 100 * action.speed
    }

    if (this.effectCalculator.isAfterPersist() && action.pauseAtEnd) {
      return action.duration * percentage / 100 * action.speed;
    }

  }

}
