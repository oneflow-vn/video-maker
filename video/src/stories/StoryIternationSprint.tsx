
import { Action, Subtitle } from '../models/Subtitles';
import { AbsoluteFill } from 'remotion';
import { ThreeDFrame } from '../video_components/ThreeDFrame';
import { Story } from '../video_components/Story';
import { Scrum } from '../parts/Scrum';
import { Subtitles } from '../video_components/Subtitles';

export const growScrumActions: Action[] = [
			{ actor: "scrum1", actionType: "additive value change to", duration: 2, value: 1},
		];

export const iterationSprint: Subtitle[] = [
	{ leadingBlank: 0, duration: 0.5, text: [ "One Sprint", "can have multiple Iterations."],
	  flashBack: {from: 40, duration: 3, speed: 0.5} },
	{ leadingBlank: 0, duration: 3, text: "One Sprint", actions: [
		...growScrumActions,
		{ actor: "camera", actionType: "move", duration: 0, absolutePosition: [0, -1, 6] },
	]},
	{ leadingBlank: 0, duration: 5, text:[ "One Sprint", "can have multiple Iterations."], actions: [
		{ actor: "camera", actionType: "move", duration: 2, absolutePosition: [1, -6, 3.0] },
	]},
];

export const StoryInterationSprint: React.FC = () => {
  return (
		<Story id="StoryIterationSprint" width={720} height={720} subtitles={iterationSprint}  >
		<link href='https://fonts.googleapis.com/css?family=Poppins' rel='stylesheet'/>
    <AbsoluteFill style={{backgroundColor: "", fontFamily: "Poppins"}}>
			<ThreeDFrame    >
				<pointLight position={[10, 10, 10]} />
				<directionalLight castShadow position={[10, 20, 15]} intensity={.9} color={0xffffff} />	
				<Scrum actor="scrum1" headActor='scrum head' bendingActor='bending1' coils={3} />
			</ThreeDFrame>
				<Subtitles scale={1.6}/>
		</AbsoluteFill>
		</Story>
  );
};
