import { ActionType, SubtitleWithFlashBack } from './Subtitles';
import { Subtitle } from '@/models/Subtitles';
import ObjectActioner from './ObjectActioner';
import { EffectCalculatorAndAction } from './EffectCalculator';
import GLBAnimationActioner, { GLBAnimationAttributes } from './GLBAnimationActioner';
import { Script } from './Script';
import { ThreeDObjectState } from "./ThreeDObjectState";
import CodeActioner, { TextTransformation } from './CodeActioner';
import GeneralActioner from './GeneralActioner';
import ConnectorsActioner, { ConnectorStates } from './ConnectorsActioner';


export default class AnimationContextWrapper {

  private currentSubtitle: Subtitle;
  private currentSubtitleEndTime: number;
  private script: Script;
  private frame: number;
  private language: string;

  constructor(frame: number, script: Script, language: string) {
    this.frame = frame;
    this.script = script;
    const { subtitle, endTime } = this.script.getSubtitleAndItsEndTimeAt(frame);
    this.currentSubtitle = subtitle;
    this.currentSubtitleEndTime = endTime;
    this.language = language;
  }

  getLanguage() {
    return this.language;
  }

  getGLBAnimationAttributes(actor: string): GLBAnimationAttributes {
    const result = this.getActionOfActor(actor)
      .map(effectCalculator => new GLBAnimationActioner(effectCalculator))
      .reduce((prev, curr) => curr.combine(prev), { ...GLBAnimationActioner.defaultValue});
    result.time = result.time ?? this.adjustedFrame / this.script.fps;
    return result;
  }

  get3DObjectStateOf(actor: string): ThreeDObjectState {
    return this.getActionOfActor(actor)
      .map(effectCalculator => new ObjectActioner(effectCalculator))
      .reduce((prev, curr) => curr.combine(prev), ObjectActioner.defaultValue)
      .get3DObjedctState(this.adjustedFrame, this.script.fps);
  }

  getTextTransformation(actor: string): TextTransformation {
     return this.getActionOfActor(actor)
      .map(effectCalculator => new CodeActioner(effectCalculator))
      .reduce((prev, curr) => curr.combine(prev), CodeActioner.defaultValue)
      .getTextTransfomation(this.adjustedFrame, this.script.fps);
  }

  getGeneralValue(actor: string): number | undefined {
     return this.getActionOfActor(actor)
      .map(effectCalculator => new GeneralActioner(effectCalculator))
      .reduce((prev, curr) => curr.combine(prev), GeneralActioner.defaultValue)
      .getGeneralValue(this.adjustedFrame, this.script.fps);
  }

  getConnectors(): ConnectorStates {
     return this.getActionByType("connect to")
      .map(effectCalculator => new ConnectorsActioner(effectCalculator))
      .reduce((prev, curr) => curr.combine(prev), ConnectorsActioner.defaultValue)
      .getConnectors(this.adjustedFrame, this.script.fps);
  }

  private isSubtitleWithFlashBack(subtitle: Subtitle): subtitle is SubtitleWithFlashBack {
    return subtitle && (subtitle as SubtitleWithFlashBack).flashBack !== undefined;
  }

  private getActionOfActor(actor: string): EffectCalculatorAndAction[] {
    return this.script.getActions(actor, this.adjustedFrame);
  }

  private getActionByType(actionType: ActionType): EffectCalculatorAndAction[] {
    return this.script.getActionsByType(actionType, this.adjustedFrame);
  }

  private get adjustedFrame(): number {
    if (this.isSubtitleWithFlashBack(this.currentSubtitle)) {
      const {flashBack} = this.currentSubtitle;
      const startTime = this.currentSubtitleEndTime - this.currentSubtitle.duration;
      const actualTimeWithInSubtitle = this.frame / this.script.fps - startTime;
      if(actualTimeWithInSubtitle < flashBack.duration) {
        const resulttime = actualTimeWithInSubtitle * flashBack.speed + flashBack.from;
        return resulttime * this.script.fps;
      }
    }
    return this.frame;
  }

  getCurrentSubtitleText() {
    const subtitle = this.currentSubtitle;
    const endTime = this.currentSubtitleEndTime;
    const translation = subtitle.translations && this.language ? subtitle.translations[this.language] : undefined;
    const text = translation ?? subtitle.text;
    return {
      subtitle,
      text: (!subtitle) || (this.frame > (endTime) * this.script.fps || this.frame < (endTime - subtitle.duration) * this.script.fps) ? '' : text,
    }
  }

};
