
import { Subtitle } from '../models/Subtitles';
import { AbsoluteFill } from 'remotion';
import { ThreeDFrame } from '../video_components/ThreeDFrame';
import { Story } from '../video_components/Story';
import { ScalableScrum, empiricalActions, growScrum1Actions, scaleScrumActions } from '../subtitles/scrum';

export const scalingScrumSubtitles: Subtitle[] = [
		{ leadingBlank: 0, duration: 4, text: "Principles that guide experimentation and adoption.", actions: [
			...growScrum1Actions,
		  { actor: "camera", actionType: "move", duration: 0, absolutePosition: [0, -1, 6] },
		]},
		{ leadingBlank: 0, duration: 5, text: "Principles that guide experimentation and adoption.", actions: [
			...scaleScrumActions,
		]},
		{ leadingBlank: 0, duration: 4, text: "Principles that guide experimentation and adoption.", actions: [
			...empiricalActions,
		]},
];

export const StoryScalingScrum: React.FC = () => {
  return (
		<Story id="StoryScalingScrum" width={720} height={720} subtitles={scalingScrumSubtitles}  >
    <AbsoluteFill style={{backgroundColor: "beige"}}>
			<ThreeDFrame    >
				<pointLight position={[10, 10, 10]} />
				<directionalLight castShadow position={[10, 20, 15]} intensity={.9} color={0xffffff} />	
				<ScalableScrum />
			</ThreeDFrame>
		</AbsoluteFill>
		</Story>
  );
};
