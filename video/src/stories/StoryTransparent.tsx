
import { Subtitle } from '../models/Subtitles';
import { AbsoluteFill, Img, staticFile } from 'remotion';
import { Story } from '../video_components/Story';
import AnimationEffect from '../video_components/AnimationEffect';

export const transparentSubtitles: Subtitle[] = [
{ leadingBlank: 1, duration: 3, text: 'The creators and trainers of Large-Scale Scrum have subtly updated the "Why LeSS?" article.', actions: [
	{ actor: "slice", actionType: "scale", duration: 2, outputRange: [1, 8]},
	{ actor: "slice", actionType: "move", duration: 2, absolutePosition: [80, 0]},

]},
];

export const StoryTransparent: React.FC = () => {
  return (
		<Story id="StoryTransparent" width={720} height={720} subtitles={transparentSubtitles}  >
		<link href='https://fonts.googleapis.com/css?family=Poppins' rel='stylesheet'/>
    <AbsoluteFill style={{backgroundColor: "beige"}}>

    <AbsoluteFill style={{ width: "100%", height: "90%", top: "20%", 
		clipPath: "polygon(0% 0%, 30% 0%, 70% 100%, 0% 100%)" }}>
			<AnimationEffect actor="slice" style={{ width: "150%", left: "-40%", top: "0%" }}>
				<Img src={staticFile('assets/slice.jpeg')} style={{ width: "100%" }}/>
			</AnimationEffect>
		</AbsoluteFill>
    <AbsoluteFill style={{ width: "100%", height: "90%", top: "20%", 
		clipPath: "polygon(30% 0%, 70% 100%, 100% 100%, 100% 0%)" }}>
			<AnimationEffect actor="whole" style={{ width: "80%", left: "30%", top: "0%" }}>
				<Img src={staticFile('assets/whole.jpeg')} style={{ width: "100%" }}/>
			</AnimationEffect>
		</AbsoluteFill>
    <AbsoluteFill style={{ width: "100%", height: "90%", top: "19.9%", 
		clipPath: "polygon(28% 0%, 68% 100%, 72% 100%, 32% 0%)", backgroundColor: "beige" }}/>
		<AbsoluteFill style={{ left: '14%', top: '6%', width: '80%', height: '20%'}}>
			<span style={{fontSize: '40px', fontFamily: "Poppins, sans serif", fontWeight: "bolder"}}>
				Transparency has value
			</span>
		</AbsoluteFill>
		</AbsoluteFill>
		</Story>
  );
};
