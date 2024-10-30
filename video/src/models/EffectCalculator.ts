import {interpolate} from 'remotion'
import {spring} from 'remotion'
import { Action } from './Subtitles';

export class EffectCalculatorAndAction {
  action: Action;
  effectCalculator: EffectCalculator;

  constructor(action: Action, effectCalculator: EffectCalculator) {
    this.action = action;
    this.effectCalculator = effectCalculator;
  }
}

export default class EffectCalculator {
  persistStartFrame: number;
  frame: number;
  fps: number;
  PersisitDuration: number;
  startDuration: number;
  endDuration: number;


  // eslint-disable-next-line max-params
  constructor(duration: number, startTime: number, startDuration: number, endDuration: number, frame: number, fps: number) {
    this.startDuration = startDuration;
    this.endDuration = endDuration;
    this.persistStartFrame = (startTime + startDuration) * fps;
    this.frame = frame;
    this.fps = fps;
    this.PersisitDuration = duration - startDuration - endDuration;
    if(this.persistStartFrame < 0) {
      throw new Error('persistStartFrame < 0');
    }
  }

  get durationInFrames(): number {
    return this.PersisitDuration * this.fps;
  }

  get endFrame(): number {
    return this.persistStartFrame + this.durationInFrames;
  }

  get persistFrameRange(): [number, number] {
    return [this.persistStartFrame, this.endFrame];
  }

  get startFrameRange(): [number, number] {
    return [this.persistStartFrame - this.startDuration * this.fps, this.persistStartFrame];
  }

  get endFrameRange(): [number, number] {
    return [this.endFrame, this.endFrame + this.endDuration * this.fps];
  }

  timeWithIn(): number {
    return Math.min(this.durationInFrames / this.fps, Math.max(0, (this.frame - this.persistStartFrame) / this.fps));
  }

  isAfterPersist(): boolean {
    return this.frame > this.endFrame;
  }

  isAfterWhole(): boolean {
    return this.frame > this.endFrame + this.endDuration * this.fps;
  }

  isBeforePersist(): boolean {
    return this.frame < this.persistStartFrame;
  }

  isBeforeWhole(): boolean {
    return this.frame < this.persistStartFrame - this.startDuration * this.fps;
  }

  withInPersistDuration(): boolean {
    return this.frame >= this.persistStartFrame && !this.isAfterPersist();
  }

  withInWholeDuration(): boolean {
    return this.frame >= this.persistStartFrame - this.startDuration * this.fps && !this.isAfterWhole();
  }

  withInStartDuration(ratio: number): boolean {
    return this.frame < this.persistStartFrame && this.frame >= (this.persistStartFrame - this.startDuration * ratio * this.fps); 
  }

  withInEndDuration(ratio: number): boolean {
    return this.frame > this.endFrame && this.frame <= (this.endFrame + this.endDuration * ratio * this.fps); 
  }

  blink(timeIntervalShow: number, timeIntervalHide: number): boolean {
    if(!this.withInWholeDuration()) return false;
    return this.frame / this.fps % (timeIntervalShow + timeIntervalHide) < timeIntervalShow;
  }

  startProgress(): number {
    if(this.isBeforeWhole()) return 0;
    return 1 - Math.max(0, (this.persistStartFrame - this.frame) / (this.startDuration * this.fps));
  }

  private getSpring() {
    if(this.durationInFrames === 0) return 1;
    return spring({
      frame: this.frame - this.persistStartFrame,
      fps: this.fps,
      durationInFrames: this.durationInFrames,
      config: {
        damping: 50,
        mass: 0.5,
        stiffness: 200,
        overshootClamping: true,
      },
    });
  }

  interpolateSpring(outputRange: number[]): number {
    return interpolate(this.getSpring(), [0, 1], outputRange);
  }

  interpolateDuration(outputRange: number[]): number {
    if(this.persistFrameRange[0] === this.persistFrameRange[1]) return outputRange[1];
    return interpolate(this.frame, this.persistFrameRange, outputRange, {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
  }
}