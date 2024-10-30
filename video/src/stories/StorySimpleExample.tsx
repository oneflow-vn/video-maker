
import { Subtitle } from '../models/Subtitles';
import { AbsoluteFill } from 'remotion';
import { Story } from '../video_components/Story';
import { Subtitles } from '../video_components/Subtitles';
import AnimationEffect from '../video_components/AnimationEffect';
import { CalloutCloud } from '../video_components/CalloutCloud';

export const simpleExampleSubtitles: Subtitle[] = [

{ leadingBlank: 0, duration: 2, text: `this is an example` },
{ leadingBlank: 1, duration: 4, text: `I can move` ,
 actions: [
	{ actor: "callout", actionType: "move", absolutePosition: [400, 300], duration: 3 },
]},
{ leadingBlank: 0, duration: 3, text: `a new title`,
 actions: [
	{ actor: "callout", actionType: "move", absolutePosition: [400, 10], duration: 3 },
 ]
 },
];


export const StorySimpleExample: React.FC = () => {
  return (
		<Story id="StorySimpleExample" width={720} height={720} subtitles={simpleExampleSubtitles} language='zhCN' >
		<link href='https://fonts.googleapis.com/css?family=Poppins' rel='stylesheet'/>
    <AbsoluteFill style={{fontFamily: "Poppins", backgroundColor: "green"}}>

			<CalloutCloud actor='callout' style={{top: '40px', left: "20px"}} tailShift={5} tailHeightPx={50}>
				<span style={{ fontSize: '30px', margin: 0 }} > Hello world! </span>
			</CalloutCloud>

			<AnimationEffect actor="subtitles">
				<Subtitles scale={1}/>
			</AnimationEffect>
		</AbsoluteFill>
		</Story>
  );
};
