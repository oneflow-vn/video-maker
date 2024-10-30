
import {random} from 'remotion'
import {interpolate} from 'remotion'
import { Subtitle } from '../models/Subtitles';
import { AbsoluteFill } from 'remotion';
import { Story } from '../video_components/Story';
import { ThreeDFrame } from '../video_components/ThreeDFrame';
import { GameOfLifeAnimated } from '../parts/gameOfLife/GameOfLifeAnimated';
import { Cell } from '../parts/gameOfLife/gameOfLife';
import { Subtitles } from '../video_components/Subtitles';
import AnimationEffect from '../video_components/AnimationEffect';
import { WindBlow } from '../parts/WindBlow';

export const gameOfLifeSubtitles: Subtitle[] = [

{ leadingBlank: 0, duration: 4, text: `Imagine an infinite, two-dimensional grid of square cells.`, actions: [
	{ actor: "gol", actionType: "additive value change to", duration: 0, value: 90},
	{ actor: "aliveDemo", actionType: "additive value change to", duration: 0, value: 0},
	{ actor: "deadDemo", actionType: "additive value change to", duration: 0, value: 0},
  { actor: "camera", actionType: "move", duration: 0, absolutePosition: [0, 20, -40],},
  { actor: "camera", actionType: "camera look at", duration: 0, absolutePosition: [0, 0, -30],},
  { actor: "camera", actionType: "camera look at", duration: 3, absolutePosition: [0.7, 0, -0.6], offset: 1},
	{ actor: "gol", actionType: "additive value change to", duration: 4, value: 100},
  { actor: "camera", actionType: "move", duration: 2, absolutePosition: [-1, 2, -0.4], offset: 3},
]},
{ leadingBlank: 1, duration: 4, text: `Each cell is either dead or alive.`, actions: [
	{ actor: "deadDemo", actionType: "additive value change to", duration: 0.5, value: 1, offset: 1},
	{ actor: "deadDemo", actionType: "additive value change to", duration: 0.5, value: 0, offset: 3},
	{ actor: "aliveDemo", actionType: "additive value change to", duration: 0.5, value: 1, offset: 3},
]},
{ leadingBlank: 1, duration: 4, text: `Surrounding every cell are eight neighbors.`, actions: [
	{ actor: "neighboursDemo", actionType: "additive value change to", duration: 0.5, value: 1, offset: 1},
	{ actor: "aliveDemo", actionType: "additive value change to", duration: 0.5, value: 0, offset: 4},
]},

{ leadingBlank: 1, duration: 5, text: `A living cell will die if it has one or no alive neighour, as if in isolation.`, actions: [
	{ actor: "gol", actionType: "additive value change to", duration: 3, value: 100.8},
	{ actor: "wind", actionType: "additive value change to", duration: 1, value: 1, offset: 2},
	{ actor: "neighboursDemo", actionType: "additive value change to", duration: 0.5, value: 0, offset: 5},
]},

{ leadingBlank: 1, duration: 4, text: `It will survive if there are two or three neighbours.`, actions: [
	{ actor: "gol", actionType: "additive value change to", duration: 5, value: 103},
	{ actor: "neighboursDemoSurvive", actionType: "additive value change to", duration: 0.5, value: 1, offset: 1},
]},

{ leadingBlank: 1, duration: 5, text: `It will die if there are four or more neighbours, as if overcrowding.`, actions: [
	{ actor: "gol", actionType: "additive value change to", duration: 3, value: 103.8, offset: 1},
]},

{ leadingBlank: 1, duration: 5, text: `A dead cell with exactly 3 alive neighbours will come to life, as if reproduction.`, actions: [
	{ actor: "gol", actionType: "additive value change to", duration: 0.5, value: 104.2, offset: 0},
	{ actor: "neighboursDemoSurvive", actionType: "additive value change to", duration: 0.5, value: 0, offset: 5},
	{ actor: "gol", actionType: "additive value change to", duration: 2, value: 105, offset: 2},
]},

{ leadingBlank: 1, duration: 5, text: `From these simple rules, a complex dance of life and death unfolds.`, actions: [
	{ actor: "gol", actionType: "additive value change to", duration: 5, value: 108},
]},

{ leadingBlank: 0, duration: 7, text: `This is the Game of Life, a zero-player game born from the minds of mathematicians and computer scientists.`, actions: [
	{ actor: "gol", actionType: "additive value change to", duration: 0, value: 0},
	{ actor: "gol", actionType: "additive value change to", duration: 20, value: 200},
  { actor: "camera", actionType: "move", duration: 7, absolutePosition: [20, 30, 0],},
]},

{ leadingBlank: 1, duration: 8, text: `It is also a popular programming exercise, to calculate the next step of a given state.`, actions: [
  { actor: "camera", actionType: "move", duration: 5, absolutePosition: [20, 30, -10],},
]},

];


export function generateRandomCells(n: number, d: number, seed: number): Cell[] {
  // Calculate the size of the grid
  const gridSize = Math.ceil(Math.sqrt(n / d));

  // Create an empty array to hold the cells
  const cells: Cell[] = [];

  // Keep generating cells until we have enough
  while (cells.length < n) {
    const x = Math.floor(interpolate(random(seed++), [0, 1], [-gridSize/2, gridSize/2]));
    const y = Math.floor(interpolate(random(seed++), [0, 1], [-gridSize/2, gridSize/2]));

    // Only add the cell if it's not already in the array
    if (!cells.some(cell => cell.x === x && cell.y === y)) {
      cells.push({ x, y });
    }
  }

  return cells;
}

// Const gliders: Cell[] = generateRandomCells(30, 0.2, 0);
const gliders: Cell[] = generateRandomCells(2000, 0.3, 30000);

export const StoryGameOfLife: React.FC = () => {
  return (
		<Story id="StoryGameOfLife" width={720} height={720} subtitles={gameOfLifeSubtitles}  >
		<link href='https://fonts.googleapis.com/css?family=Poppins' rel='stylesheet'/>
    <AbsoluteFill style={{backgroundColor: "black"}}>
			<ThreeDFrame>
				{/* <ambientLight intensity={0.5} /> */}
				<directionalLight castShadow position={[10, 20, 15]} intensity={5} color={0xffffff} />	
				<GameOfLifeAnimated actor="gol" startLives={gliders} />
			</ThreeDFrame>
		</AbsoluteFill>
		<WindBlow actor="wind" style={{left: "35%", width: "20%", top: "18%"}} />
			<AnimationEffect actor="subtitles">
				<Subtitles scale={1}/>
			</AnimationEffect>
		</Story>
  );
};
