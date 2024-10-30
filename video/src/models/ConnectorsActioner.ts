import BaseActioner from './BaseActioner';
import EffectCalculator, { EffectCalculatorAndAction } from './EffectCalculator';
import { ConnectAction } from './Subtitles';

export interface ConnectorState {
	action: ConnectAction,
	frameRange: [number, number];
	startProgress: number;
}

export interface ConnectorStates {
	connectors: ConnectorState[];
}

class LazyConnectorsState {
	connectors: ConnectorStates = {connectors: []};

	combine(prev: LazyConnectorsState): LazyConnectorsState {
		const result = new LazyConnectorsState();
		result.connectors.connectors = [...prev.connectors.connectors, ...this.connectors.connectors];
		return result;
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	getConnectors(adjustedFrame: number, fps: number): ConnectorStates {
		return this.connectors;
	}
}

export default class ConnectorsActioner extends BaseActioner<LazyConnectorsState> {
  effectCalculator: EffectCalculator;

  constructor(effectCalculator: EffectCalculatorAndAction) {
		super(effectCalculator)
    this.effectCalculator = effectCalculator.effectCalculator;
  }

	static defaultValue: LazyConnectorsState = new LazyConnectorsState();

	protected getState(): LazyConnectorsState {
		switch (this.action.actionType) {
			case 'connect to':
				return this.additiveValueChange(this.action);
			default:
				return new LazyConnectorsState();
		}
	}

	private additiveValueChange(action: ConnectAction): LazyConnectorsState {
		const result = new LazyConnectorsState();
		if(this.effectCalculator.withInWholeDuration()) {
		  result.connectors.connectors = [{action, frameRange: this.frameRange, startProgress: this.effectCalculator.startProgress()}];
		}
		return result;
	}
}
