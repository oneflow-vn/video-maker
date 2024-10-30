import { Action } from "../models/Subtitles";
import { Scrum } from '../parts/Scrum';

export const growScrum1Actions: Action[] = [
			{ actor: "scrum1", actionType: "additive value change to", duration: 2, value: 1},
		];
export const scaleScrumActions: Action[] = [
			{ actor: "scrum2", actionType: "additive value change to", duration: 0.1, value: 1},
			{ actor: "scrum3", actionType: "additive value change to", duration: 0.1, value: 1},
			{ actor: "bending1", actionType: "additive value change to", duration: 3, value: 0},
			{ actor: "bending2", actionType: "additive value change to", duration: 3, value: 0.44},
			{ actor: "bending3", actionType: "additive value change to", duration: 3, value: 0.88},
		];

export const empiricalActions: Action[] = [
			{ actor: "scrum head", actionType: "additive value change to", duration: 2, value: 0.4},
		];

export const ScalableScrum: React.FC = () => {
  return (
		<>
				<Scrum actor="scrum1" headActor='scrum head' bendingActor='bending1'/>
				<Scrum actor="scrum2" headActor='scrum head' bendingActor="bending2"/>
				<Scrum actor="scrum3" headActor='scrum head' bendingActor="bending3"/>
		</>
  );
};
