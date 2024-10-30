import {Audio} from 'remotion'
import React from 'react';
import { Subtitle } from '../models/Subtitles';
import { AbsoluteFill, staticFile } from 'remotion';
import { Subtitles } from '../video_components/Subtitles';
import AnimationEffect from '../video_components/AnimationEffect';
import { Starship } from '../parts/Starship';
import { ThreeDFrame } from '../video_components/ThreeDFrame';
import { ThreeAnimationEffect } from '../video_components/ThreeAnimationEffect';
import { StarshipPlume } from '../parts/StarshipPlume';
import { Explosion } from '../parts/Explosion';
import { GroupInitialState } from '../video_components/GroupInitialState';
import { OddeLogo } from '../parts/OddeLogo';
import { OddeLogoInner } from '../parts/OddeLogoInner';
import { FlipCoin } from '../video_components/AutonomousComponents/FlipCoin';
import { Story } from '../video_components/Story';
import { ProblemDomain } from '../parts/ProblemDomain';

const storyFailureVsFailureSubtitles: Subtitle[] = [
	{ leadingBlank: 0, duration: 3, scale: 1.5, position: 'center', text: [
			"Learning by Failures",
			"vs",
			"Learning from Failures",
		],
	  flashBack: {from: 40, duration: 3, speed: 0.5} },

	{ leadingBlank: 0.5, duration: 4, text: "SpaceX is celebrating their rocket explosion.", actions: [
			{ actor: "camera", actionType: "move", duration: 0, absolutePosition: [0, 0, 30] },
			{ actor: "camera", actionType: "camera look at", duration: 0, absolutePosition: [0, 16, 0] },
			{ actor: "starship", actionType: "rotate and rise", duration: 3, value: 4 },
			{ actor: "starship", actionType: "oscillate", endingTimeAdjustment: 10, delta: [0, 0.1, 0] },
	]},
	{ leadingBlank: 0, duration: 5, text: "Software developers also have different attitudes towards failures.", actions: [
			{ actor: "blue background", actionType: "disappear", startDuration: 5 },
			{ actor: "starship", actionType: "move", duration: 5, absolutePosition: [0, 20, 0] },
			{ actor: "camera", actionType: "camera look at", duration: 6, absolutePosition: [0, 21, 0] },
			{ actor: "camera", actionType: "move", duration: 6, absolutePosition: [0, 0, 10] },
	]},
	{ leadingBlank: 0, duration: 1.5, text: "", actions: [
			{ actor: "starship", actionType: "3d rotate", endingTimeAdjustment: 20, totalRotation: [0, 240, 0] },
			{ actor: "stage", actionType: "scale", duration: 2, outputRange: [1, 0.5] },
	]},

	{ leadingBlank: 0.5, duration: 1.5, text: "Repeated failures alone", actions: [
			{ actor: "problem domain", actionType: "appear", startDuration: 1 },
	]},

	{ leadingBlank: 0.2, duration: 1, text: "Repeated failures alone", actions: [
			{ actor: "stage", actionType: "move", duration: 0.1, absolutePosition: [-700, 0, 0] },
			{ actor: "explosion", actionType: "3d animation start", duration: 1, speed: 1 },
	]},
	{ leadingBlank: 0, duration: 0.9, text: "Repeated failures alone", actions: [
			{ actor: "stage", actionType: "move", duration: 0.1, absolutePosition: [-710, 200, 0] },
			{ actor: "explosion", actionType: "3d animation start", duration: 0.9, speed: 1.1 },
	]},
	{ leadingBlank: 0, duration: 0.8, text: "Repeated failures alone", actions: [
			{ actor: "stage", actionType: "move", duration: 0.1, absolutePosition: [-630, 150, 0] },
			{ actor: "explosion", actionType: "3d animation start", duration: 0.8, speed: 1.2 },
	]},
	{ leadingBlank: 0, duration: 0.7, text: "Repeated failures alone", actions: [
			{ actor: "stage", actionType: "move", duration: 0.1, absolutePosition: [-650, 200, 0] },
			{ actor: "explosion", actionType: "3d animation start", duration: 0.7, speed: 1.3 },
	]},


	{ leadingBlank: 0, duration: 2, text: "do not necessarily lead to success.", actions: [
			{ actor: "problem domain", actionType: "scale", duration: 2, outputRange: [6, 1.5]},
	]},
	{ leadingBlank: 0, duration: 3, text: "do not necessarily lead to success.", actions: [
			{ actor: "success", actionType: "appear", startDuration: 2 },
	]},




	{ leadingBlank: 0.5, duration: 3, text: "Learning from the failure", actions: [
			{ actor: "problem domain", actionType: "disappear", startDuration: 2 },
			{ actor: "stage", actionType: "scale", duration: 2, outputRange: [0.5, 1] },
			{ actor: "stage", actionType: "move", duration: 2, absolutePosition: [0, 0] },
			{ actor: "explosion", actionType: "3d animation reverse", duration: 1, speed: 1, percentage: 50, pauseAtEnd: true },
	]},
	{ leadingBlank: 0, duration: 4, text: "is more valuable than merely experiencing them.", actions: [
	]},
	{ leadingBlank: 0.5, duration: 4, text: "For software developers, error messages contain crucial information.", actions: [
			{ actor: "error-msg", actionType: "appear", startDuration: 1 },
	]},
	{ leadingBlank: 0, duration: 5, text: "Reading and understanding them makes sure you solve the right problem.", actions: [
			{ actor: "success", actionType: "appear", startDuration: 1 },
	]},
	{ leadingBlank: 0.5, duration: 4, text: "Improving error messages benefits your peers.", actions: [
			{ actor: "team", actionType: "appear", startDuration: 1 },
	]},
	{ leadingBlank: 0, duration: 2, text: "In conclusion,", actions: []},
	{ leadingBlank: 0, duration: 5, text: "read the error message!", scale: 2.5, position: 'center', actions: []},
];

export const StoryFailureVsFailure: React.FC = () => {
  return (
		<Story id="StoryFailureVsFailure" width={720} height={720} subtitles={storyFailureVsFailureSubtitles}  >
		<Audio src={staticFile("assets/audios/output.mp3")} />
    <AbsoluteFill style={{ backgroundColor: '#00abf0'}}>
      <AnimationEffect actor="blue background">
        <AbsoluteFill style={{ backgroundColor: '#e1f6ff'}}/>
			</AnimationEffect>
			<AbsoluteFill style={{ left: '10%', top: '2%', width: '70%', height: '100%'}}>
				<AnimationEffect actor="problem domain">
						<AnimationEffect actor="success">
					<AbsoluteFill style={{ left: '75%', top: '45%', width: '10%', height: '10%'}}>
						<span style={{fontSize: "30px", fontWeight: "bolder", color: "#228800"}}>SUCCESS</span>
					</AbsoluteFill>
						</AnimationEffect>
					<ProblemDomain />
				</AnimationEffect>
			</AbsoluteFill>
      <AnimationEffect actor="stage">
				<AbsoluteFill style={{position: 'absolute', left: '0%', top: '0%', width: '100%', height: '100%'}}>
          <ThreeDFrame >
						<directionalLight
							castShadow
							position={[50, 100, 50]}
							intensity={200}
							color={0xffffff}
						/>	
            <ThreeAnimationEffect actor="starship">
              <Starship/>
              <StarshipPlume/>
              <GroupInitialState position={[0, 0, 0]} scale={0.2} >
								<ambientLight intensity={20} color={0xff0000} />
                <Explosion actor="explosion" />
							</GroupInitialState>
            </ThreeAnimationEffect>
          </ThreeDFrame>
      </AbsoluteFill>
			</AnimationEffect>
			<Subtitles scale={2} />
    </AbsoluteFill>
    <AbsoluteFill style={{ left: '80%', top: '5%', width: '10%', height: '20%'}}>
			<span style={{fontSize: '28px'}}>terry@</span>
		</AbsoluteFill>
    <AbsoluteFill style={{ left: '90%', top: '2%', width: '10%', height: '20%'}}>
			<OddeLogo />
			<FlipCoin speed={2} interval={4} shift={1} >
			  <OddeLogoInner />
			</FlipCoin>
		</AbsoluteFill>
		</Story>
  );
};