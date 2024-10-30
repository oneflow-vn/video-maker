
import {staticFile} from 'remotion'
import {Img} from 'remotion'
import { Subtitle } from '../models/Subtitles';
import { AbsoluteFill } from 'remotion';
import { ThreeDFrame } from '../video_components/ThreeDFrame';
import { Anchor } from '../video_components/Anchor';
import { Story } from '../video_components/Story';
import { OddeLogo } from '../parts/OddeLogo';
import { OddeLogoInner } from '../parts/OddeLogoInner';
import { FlipCoin } from '../video_components/AutonomousComponents/FlipCoin';
import AnimationEffect from '../video_components/AnimationEffect';
import { ScalableScrum, empiricalActions, growScrum1Actions, scaleScrumActions } from '../subtitles/scrum';

export const lessInActionSubtitles: Subtitle[] = [
		{ leadingBlank: 0, duration: 3, text: "", actions: [
			{ actor: "lia", actionType: "connect to",  startDuration: 0, target: "org", bentLevel: 0, radiusSource: 50, offset: 0, strokeWidth: 3},
			{ actor: "lia", actionType: "connect to",  startDuration: 0, target: "product", bentLevel: 0, radiusSource: 50, offset: 0, strokeWidth: 3},
			{ actor: "lia", actionType: "connect to",  startDuration: 0, target: "dev", bentLevel: 0, radiusSource: 50, offset: 0, strokeWidth: 3},
		]},
		{ leadingBlank: 0, duration: 8, text: "", actions: [
			...growScrum1Actions,
		  { actor: "camera", actionType: "move", duration: 0, absolutePosition: [0, -1, 6] },
			...scaleScrumActions,
			...empiricalActions,

		]},
];

export const StoryLeSSInAction: React.FC = () => {
  return (
		<Story id="StoryLeSSInAction" width={720} height={720} subtitles={lessInActionSubtitles}  >
		<link href='https://fonts.googleapis.com/css?family=Poppins' rel='stylesheet'/>
    <AbsoluteFill style={{ backgroundColor: "black"}}/>
    <AbsoluteFill style={{color: "white", fontSize: '14px', fontFamily: "Poppins, sans serif"}}>
			<AbsoluteFill style={{top: "15%"}}>
				<Img src={staticFile('assets/lessinaction/handson.png')} style={{ width: "100%" }}/>
			</AbsoluteFill>
			<AbsoluteFill style={{background: "linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%)"}}/>
			<AbsoluteFill style={{ left: '5%', top: '15%', width: '90%', height: '0.5%', backgroundColor: "gray"}} />
			<AbsoluteFill style={{ left: '5%', top: '6%', width: '60%', height: '20%'}}>
				<span style={{}}>
					5-day fun product development <br/> for Product Developers in large organizations
				</span>
			</AbsoluteFill>
			<AbsoluteFill style={{ left: '60%', top: '6%', width: '40%', height: '20%'}}>
			<span>By Terry Yin & Ivan Zimine from<br/>
			April 15th to 19th, 2024 @ Singapore</span>
		</AbsoluteFill>
    <AbsoluteFill style={{ left: '88%', top: '2%', width: '10%', height: '20%'}}>
			<OddeLogo />
			<FlipCoin speed={2} interval={4} shift={0} >
			  <OddeLogoInner />
			</FlipCoin>
		</AbsoluteFill>
			<AbsoluteFill style={{fontSize: '18px'}}>
				<AbsoluteFill style={{ left: '3%', top: '35%', width: '50%', height: '20%'}}>
					<span style={{}}>
						Organizing with Large-Scale Scrum
					</span>
				</AbsoluteFill>
				<AbsoluteFill style={{ left: '35%', top: '20%', width: '40%', height: '20%'}}>
					<span style={{}}>
						Understanding Users & Product
					</span>
				</AbsoluteFill>
				<AbsoluteFill style={{ left: '62%', top: '35%', width: '40%', height: '20%'}}>
					<span style={{}}>
						Sustaining the Development
					</span>
				</AbsoluteFill>
			</AbsoluteFill>
			<AbsoluteFill style={{fontSize: '14px', color: "#bbb"}}>
				<AbsoluteFill style={{ left: '6%', top: '39%', width: '30%', height: '20%'}}>
					<span style={{}}>
						Scrum<br/>
						Feature Team<br/>
						Collaboration & Integration<br/>
					</span>
				</AbsoluteFill>
				<AbsoluteFill style={{ left: '38%', top: '24%', width: '30%', height: '20%'}}>
					<span style={{}}>
						Specification By Example<br/>
						Business Domain<br/>
						Whole Product Focus<br/>
					</span>
				</AbsoluteFill>
				<AbsoluteFill style={{ left: '66%', top: '39%', width: '35%', height: '20%'}}>
					<span style={{}}>
						Test-Driven Development<br/>
						Refactoring<br/>
						Continous Integration
					</span>
				</AbsoluteFill>
			</AbsoluteFill>
	
			<Anchor actor="org" style={{left: "30%", top: "55%"}}/>
			<Anchor actor="dev" style={{left: "70%", top: "55%"}}/>
			<Anchor actor="product" style={{left: "50%", top: "45%"}}/>
			<Anchor actor="lia" style={{left: "50%", top: "70%"}}/>
			<AnimationEffect actor="product developer" style={{ width: "20%", top: "60%", left: "40%" }}>
				<Img src={staticFile('assets/lessinaction/product-developer.png')} style={{ width: "100%" }}/>
			</AnimationEffect>
			<AbsoluteFill style={{ left: '70%', top: '85%', width: '20%', height: '20%'}}>
				<ThreeDFrame    >
					<pointLight position={[10, 10, 10]} />
					<directionalLight castShadow position={[10, 20, 15]} intensity={.9} color={0xffffff} />	
					<ScalableScrum />
				</ThreeDFrame>
			</AbsoluteFill>
		</AbsoluteFill>
		</Story>
  );
};
