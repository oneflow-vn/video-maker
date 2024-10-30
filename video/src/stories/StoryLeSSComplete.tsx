import { Subtitle } from '../models/Subtitles';
import { AbsoluteFill  } from 'remotion';
import { ThreeDFrame } from '../video_components/ThreeDFrame';
import { Story } from '../video_components/Story';
import { LeSSComplete } from '../subtitles/LeSSComplete';

export const lessCompletePictureSubtitles: Subtitle[] = [
		{ leadingBlank: 1, duration: 3, text: "LeSS provides a minimal barely sufficient core: the LeSS rules. And on top of that it encourages experimentation influenced by the LeSS principles.", actions: [
			{ actor: "camera", actionType: "move", duration: 0, absolutePosition: [0, 0, 4] },
			{ actor: "camera", actionType: "camera look at", duration: 0, absolutePosition: [0, 0, -6] },
			{ actor: "camera", actionType: "move", duration: 3, absolutePosition: [0, 0, -4] },
			{ actor: "less complete arrow", actionType: "additive value change to", duration: 0, value: 0},
		]},
		{ leadingBlank: 1, duration: 3, text: "It has rules that provide a minimum core structure.", actions: [
			{ actor: "camera", actionType: "move", duration: 3, absolutePosition: [-6, 0, 1] },
			{ actor: "camera", actionType: "camera look at", duration: 3, absolutePosition: [0, 0, -3] },
		]},
		{ leadingBlank: 0, duration: 3, text: "Principles that guide experimentation and adoption.", actions: [
			{ actor: "less complete arrow", actionType: "additive value change to", duration: 3, value: 0.58},
		]},
		{ leadingBlank: 0, duration: 3, text: "And this is called a 'LeSS Complete Picture'", actions: [
			{ actor: "camera", actionType: "move", duration: 3, absolutePosition: [0, 0, 4] },
			{ actor: "camera", actionType: "camera look at", duration: 3, absolutePosition: [0, 0, -6] },
		]},
		{ leadingBlank: 1, duration: 5, text: "And this is called a 'LeSS Complete Picture'", actions: [
			{ actor: "camera", actionType: "move", duration: 3, absolutePosition: [6, 0, 1] },
			{ actor: "less complete arrow", actionType: "additive value change to", duration: 3, value: 1},
			{ actor: "camera", actionType: "camera look at", duration: 3, absolutePosition: [0, 0, -3] },
		]},
];


export const StoryLeSSComplete: React.FC = () => {
  return (
		<Story id="StoryLeSSComplete" width={720} height={720} subtitles={lessCompletePictureSubtitles}  >
    <AbsoluteFill style={{backgroundColor: "beige"}}>
			<ThreeDFrame>
				{/* <ambientLight intensity={0.5} /> */}
				<pointLight position={[10, 10, 10]} />
				<directionalLight castShadow position={[10, 20, 15]} intensity={.9} color={0xffffff} />	
				<LeSSComplete />
			</ThreeDFrame>
		</AbsoluteFill>
		</Story>
  );
};
