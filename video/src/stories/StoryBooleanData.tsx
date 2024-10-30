
import {Audio} from 'remotion'
import {Img} from 'remotion'
import {random, staticFile} from 'remotion'
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
import { CodeHighlight } from '../video_components/CodeHighlight';
import { CSSProperties } from 'react';
import { ThreeAnimationEffect } from '../video_components/ThreeAnimationEffect';
import { GroupInitialState } from '../video_components/GroupInitialState';
import { ThinkingEmoji } from '../parts/ThinkingEmoji';
import { CalloutCloud } from '../video_components/CalloutCloud';
import { Markdown } from '../video_components/Markdown';
import { OddeLogo } from '../parts/OddeLogo';
import { OddeLogoInner } from '../parts/OddeLogoInner';
import { FlipCoin } from '../video_components/AutonomousComponents/FlipCoin';

export const booleanDataSubtitles: Subtitle[] = [

{ leadingBlank: 0, duration: 4, text: `Welcome to the third and final part of my 'Oh My Bad Boolean' series! `, translations: {
	zhCN: `欢迎来到我“我的坏布尔”系列的第三部分！`,
	zhTW: `歡迎來到我“我的壞布爾”系列的第三部分！`,
  }, actions: [
	{ actor: "gol", actionType: "additive value change to", duration: 0, value: 90},
	{ actor: "aliveDemo", actionType: "additive value change to", duration: 0, value: 0},
	{ actor: "deadDemo", actionType: "additive value change to", duration: 0, value: 0},
  { actor: "camera", actionType: "move", duration: 0, absolutePosition: [0, 20, -40],},
  { actor: "camera", actionType: "camera look at", duration: 0, absolutePosition: [0, 0, -30],},
	{ actor: "logos", actionType: "appear", startDuration: 0, endDuration: 1, endingTimeAdjustment: 20},
]},
{ leadingBlank: 1, duration: 7, text: `After exploring pitfalls with boolean parameters and return values, let's delve into 'Why Should We Rethink Our Boolean Data?'`, translations: {
	zhCN: `在探索布尔参数和返回值的缺陷之后，让我们深入探讨“为什么我们应该重新思考我们的布尔数据？”`,
	zhTW: `在探索布爾參數和返回值的缺陷之後，讓我們深入探討“為什麼我們應該重新思考我們的布爾數據？”`,
}, actions: [
		{ actor: "second title", actionType: "insert text", endingTimeAdjustment: 3, line: 1, column: 1, text: "Keep it simple, but not simpler", startDuration: 1, endDuration: 1 },
]},
{ leadingBlank: 1, duration: 3, text: `Our first example is on deck.`, translations: {
	zhCN: `我们的第一个例子已经准备好了。`,
	zhTW: `我們的第一個例子已經準備好了。`,
}, actions: [
	{ actor: "title", actionType: "disappear", startDuration: 1, offset: 0 },
]},

{ leadingBlank: 0, duration: 4, text: `Picture an infinite, two-dimensional grid of square cells.`, translations: {
	zhCN: `想象一个无限的二维方格单元网格。`,
	zhTW: `想像一個無限的二維方格單元網格。`,
}, actions: [
  { actor: "camera", actionType: "camera look at", duration: 3, absolutePosition: [0.7, 0, -0.6], offset: 1},
	{ actor: "gol", actionType: "additive value change to", duration: 4, value: 100},
  { actor: "camera", actionType: "move", duration: 2, absolutePosition: [-1, 2, -0.4], offset: 3},
]},

{ leadingBlank: 1, duration: 3, text: `Each cell is either dead or alive.`, translations: {
	zhCN: `每个单元格要么死亡，要么活着。`,
	zhTW: `每個單元格要麼死亡，要麼活著。`,	
}, actions: [
	{ actor: "deadDemo", actionType: "additive value change to", duration: 0.5, value: 1, offset: 1},
	{ actor: "deadDemo", actionType: "additive value change to", duration: 0.5, value: 0, offset: 2},
	{ actor: "aliveDemo", actionType: "additive value change to", duration: 0.5, value: 1, offset: 2},
]},
{ leadingBlank: 1, duration: 4, text: `Each cell is surrounded by eight neighbors.`, translations: {
	zhCN: `每个单元格周围都有八个邻居。`,
	zhTW: `每個單元格周圍都有八個鄰居。`,
}, actions: [
	{ actor: "neighboursDemo", actionType: "additive value change to", duration: 0.5, value: 1, offset: 1},
	{ actor: "aliveDemo", actionType: "additive value change to", duration: 0.5, value: 0, offset: 4},
]},

{ leadingBlank: 1, duration: 5, text: `A living cell dies if it has one or no living neighbors - it's as if in isolation.`, translations: {
	zhCN: `如果一个活单元格只有一个或没有活邻居，它就会孤独而死。`,
	zhTW: `如果一個活單元格只有一個或沒有活鄰居，它就會孤獨而死。`,
}, actions: [
	{ actor: "gol", actionType: "additive value change to", duration: 3, value: 100.8},
	{ actor: "wind", actionType: "additive value change to", duration: 1, value: 1, offset: 2},
	{ actor: "neighboursDemo", actionType: "additive value change to", duration: 0.5, value: 0, offset: 5},
]},

{ leadingBlank: 1, duration: 4, text: `It survives if there are two or three neighbors.`, translations: {
	zhCN: `如果有两个或三个邻居，它就会存活下来。`,
	zhTW: `如果有兩個或三個鄰居，它就會存活下來。`,
}, actions: [
	{ actor: "gol", actionType: "additive value change to", duration: 5, value: 103},
	{ actor: "neighboursDemoSurvive", actionType: "additive value change to", duration: 0.5, value: 1, offset: 1},
]},

{ leadingBlank: 1, duration: 5, text: `It dies if there are four or more neighbors due to overcrowding.`, translations: {
	zhCN: `如果有四个或更多的邻居，它就会因为过度拥挤而死亡。`,
	zhTW: `如果有四個或更多的鄰居，它就會因為過度擁擠而死亡。`,
}, actions: [
	{ actor: "gol", actionType: "additive value change to", duration: 3, value: 103.8, offset: 1},
]},

{ leadingBlank: 1, duration: 6, text: `A dead cell springs to life if exactly 3 neighbors are alive, as if through reproduction`, translations: {
	zhCN: `如果有三个邻居活着，一个死单元格就会复活，就像是通过繁殖一样。`,
	zhTW: `如果有三個鄰居活著，一個死單元格就會復活，就像是通過繁殖一樣。`,
}, actions: [
	{ actor: "gol", actionType: "additive value change to", duration: 0.5, value: 104.2, offset: 0},
	{ actor: "neighboursDemoSurvive", actionType: "additive value change to", duration: 0.5, value: 0, offset: 5},
	{ actor: "gol", actionType: "additive value change to", duration: 2, value: 105, offset: 2},
]},

{ leadingBlank: 1, duration: 5, text: `These simple rules yield a complex dance of life and death.`, translations: {
	zhCN: `这些简单的规则产生了复杂的生死舞蹈。`,
	zhTW: `這些簡單的規則產生了複雜的生死舞蹈。`,
}, actions: [
	{ actor: "gol", actionType: "additive value change to", duration: 5, value: 108},
]},

{ leadingBlank: 0, duration: 5, text: `Welcome to Conway's Game of Life.`, translations: {
	zhCN: `欢迎来到康威的生命游戏。`,
	zhTW: `歡迎來到康威的生命遊戲。`,
}, actions: [
	{ actor: "gol", actionType: "additive value change to", duration: 20, value: 200},
  { actor: "camera", actionType: "move", duration: 5, absolutePosition: [20, 30, 0],},
]},

{ leadingBlank: 1, duration: 6, text: `It's a popular programming exercise to calculate the next state based on the current state.`, translations: {
	zhCN: `根据当前状态计算下一个状态是一种流行的编程练习。`,
	zhTW: `根據當前狀態計算下一個狀態是一種流行的編程練習。`,
}, actions: [
  { actor: "camera", actionType: "move", duration: 5, absolutePosition: [20, 30, -10],},
]},
{ leadingBlank: 1, duration: 4, text: `My first thought was, 'Why not use a 2D array of Booleans?'`, translations: {
	zhCN: `我的第一个想法是，“为什么不使用一个布尔值的二维数组呢？”`,
	zhTW: `我的第一個想法是，“為什麼不使用一個布爾值的二維數組呢？”`,
}, actions: [
	{ actor: "array", actionType: "appear", startDuration: 1},
	{ actor: "array", actionType: "3d rotate", endingTimeAdjustment: 0, totalRotation: [40, 0, -65], offset: 0},
]},
{ leadingBlank: 1, duration: 4, text: `'Living cells are true, dead cells are false. Simple.'`, translations: {
	zhCN: `“活单元格是真的，死单元格是假的。很简单。”`,
	zhTW: `“活單元格是真的，死單元格是假的。很簡單。”`,
}, actions: [
	{ actor: "array", actionType: "3d rotate", endingTimeAdjustment: 2, totalRotation: [0, 0, 0], offset: 0},
	{ actor: "mask", actionType: "appear", startDuration: 0.2, persistUntilSubtitleId: "2nd example"},
]},
{ leadingBlank: 1, duration: 5, text: `To simplify further, I opted for a smaller world, a 3x3 cell grid.`, translations: {
	zhCN: `为了进一步简化，我选择了一个更小的世界，一个3x3的单元格网格。`,
	zhTW: `為了進一步簡化，我選擇了一個更小的世界，一個3x3的單元格網格。`,
}, actions: [
	{ actor: "array", actionType: "delete lines", endingTimeAdjustment: 1, fromLine: 2, count: 11, offset: 1},
	{ actor: "array", actionType: "insert text", endingTimeAdjustment: 1, line: 1, column: 2, text: `
  [ false, true, false ],
  [ false, true, false ],
  [ true, true, false ]`, startDuration: 1, endDuration: 0 },

]},
{ leadingBlank: 1, duration: 5, text: `But this is where I stumbled into the trap of 'illusory simplicity.'`, translations: {
	zhCN: `但这就是我陷入“虚假简单”的陷阱的地方。`,
	zhTW: `但這就是我陷入“虛假簡單”的陷阱的地方。`,
}, actions: [
]},
{ leadingBlank: 1, duration: 6, text: `This approach, seemingly simple, unexpectedly added complexity by forcing me to handle boundary cases.`, translations: {
	zhCN: `这种看似简单的方法，却出乎意料地增加了复杂性，因为它迫使我处理边界情况。`,
	zhTW: `這種看似簡單的方法，卻出乎意料地增加了複雜性，因為它迫使我處理邊界情況。`,
}, actions: [
			  { actor: "thinker", actionType: "rotate and rise", duration: 2, value: 3, offset: 0 },
	{ actor: "boundary callout", actionType: "appear", startDuration: 1, endingTimeAdjustment: 4, endDuration: 0, offset: 2},
]},
{ leadingBlank: 1, duration: 6, text: `A more elegant solution, though, is to track the coordinates of living cells.`, translations: {
	zhCN: `但是，一个更优雅的解决方案是跟踪活單元格的坐标。`,
	zhTW: `但是，一個更優雅的解決方案是跟踪活單元格的坐標。`,
}, actions: [
			  { actor: "thinker", actionType: "disappear", startDuration: 1 },
				{ actor: "positions", actionType: "appear", startDuration: 1},
]},
{ leadingBlank: 1, duration: 3, text: `This sidesteps the boundary problem,`, translations: {
	zhCN: `这避开了边界问题，`,
	zhTW: `這避開了邊界問題，`,
}, actions: [
	{ actor: "positions", actionType: "insert text", endingTimeAdjustment: 2, line: 5, column: 20, text: `
  {x: -2, y: -3},
  {x: -200, y: 999999},`, startDuration: 1, endDuration: 0 },
]},
{ leadingBlank: 1, duration: 4, text: `and boundaries can be added later if needed.`, translations: {
	zhCN: `如果需要，边界可以在以后添加。`,
	zhTW: `如果需要，邊界可以在以後添加。`,
}, actions: [
]},
{ leadingBlank: 1, duration: 6, text: `This is where 'Einstein's Razor,' a principle akin to Occam's Razor, comes into play.`, translations: {
	zhCN: `这就是“爱因斯坦剃刀”（一种类似于奥卡姆剃刀的原则）发挥作用的地方。`,
	zhTW: `這就是“愛因斯坦剃刀”（一種類似於奧卡姆剃刀的原則）發揮作用的地方。`,
}, actions: [
	{ actor: "einstein's razor", actionType: "appear", startDuration: 1, persistUntilSubtitleId: "oversimple"},
	{ actor: "einstein quote", actionType: "insert text", endingTimeAdjustment: 3, line: 1, column: 1, text: 
	`"Make everything as simple as possible,
but not simpler."

  -- Einstein's Razor`, startDuration: 1, endDuration: 1 },
]},
{ leadingBlank: 1, duration: 5, text: `It advises us to 'Make everything as simple as possible, but not simpler.'`, translations: {
	zhCN: `它建议我们“尽可能简单，但不要过于简单”。`,
	zhTW: `它建議我們“盡可能簡單，但不要過於簡單”。`,
}, actions: [
]},
{ id: "oversimple", leadingBlank: 1, duration: 6, text: `In this case, using booleans might oversimplify and inadvertently add complexity.`, translations: {
	zhCN: `在这种情况下，使用布尔值可能会过于简单化，无意中增加复杂性。`,
	zhTW: `在這種情況下，使用布爾值可能會過於簡單化，無意中增加複雜性。`,
}, actions: [
]},
{ id: "2nd example", leadingBlank: 2, duration: 4, text: `Moving on to our second example.`, translations: {
	zhCN: `接下来是我们的第二个例子。`,
	zhTW: `接下來是我們的第二個例子。`,
}, actions: [
	{ actor: "game of life", actionType: "disappear", startDuration: 0.2},
]},
{ leadingBlank: 1, duration: 5, text: `Consider a course management system where courses can be public and carry price information.`, translations: {
	zhCN: `考虑一个课程管理系统，课程可以是公开的，并携带价格信息。`,
	zhTW: `考慮一個課程管理系統，課程可以是公開的，並攜帶價格信息。`,
}, actions: [
	{ actor: "public course", actionType: "appear", startDuration: 1, persistUntilSubtitleId: "summary"},
	{ actor: "public course", actionType: "highlight lines", endingTimeAdjustment: 2, lines: [3], offset: 1},
	{ actor: "public course", actionType: "highlight lines", endingTimeAdjustment: 2, lines: [4, 5, 6], offset: 3},
]},
{ leadingBlank: 1, duration: 4, text: `But when a course is private, the price becomes irrelevant.`, translations: {
	zhCN: `但是当课程是私有的时候，价格就没有意义了。`,
	zhTW: `但是當課程是私有的時候，價格就沒有意義了。`,
}, actions: [
	{ actor: "private course", actionType: "appear", startDuration: 1, persistUntilSubtitleId: "summary"},
	{ actor: "private course", actionType: "highlight lines", endingTimeAdjustment: 2, lines: [3], offset: 2},
]},
{ leadingBlank: 1, duration: 5, text: `This inconsistency contravenes the Principle of Least Astonishment.`, translations: {
	zhCN: `这种不一致违反了最小惊讶原则(the Principle of Least Astonishment)。`,
	zhTW: `這種不一致違反了最小驚訝原則(the Principle of Least Astonishment)。`,
}, actions: [
	{ actor: "confused course", actionType: "appear", startDuration: 1, persistUntilSubtitleId: "summary"},
	{ actor: "confused course", actionType: "highlight lines", endingTimeAdjustment: 4, lines: [3], offset: 1},
	{ actor: "confused course", actionType: "highlight lines", endingTimeAdjustment: 3, lines: [4], offset: 2, style: 'wavy underline'},
]},
{ leadingBlank: 1, duration: 7, text: `Whether 'isPrivate' encapsulates a concrete business concept depends heavily on the business domain`, translations: {
	zhCN: `“isPrivate”是否封装了一个具体的业务概念，这在很大程度上取决于业务领域。`,
	zhTW: `“isPrivate”是否封裝了一個具體的業務概念，這在很大程度上取決於業務領域。`,
}, actions: [
]},
{ leadingBlank: 1, duration: 6, text: `But with only boolean it is not enough to maintain the consistency.`, translations: {
	zhCN: `但是只有布尔值是不够的，无法保持一致性。`,
	zhTW: `但是只有布爾值是不夠的，無法保持一致性。`,
}, actions: [
]},
{id: "summary", leadingBlank: 1, duration: 6, text: `In conclusion, while Boolean data is the simplest data type, it can sometimes be deceptively simple.`, translations: {
	zhCN: `总之，布尔数据是最简单的数据类型，但有时会具有欺骗性的简单性。`,
	zhTW: `總之，布爾數據是最簡單的數據類型，但有時會具有欺騙性的簡單性。`,
}, actions: [
	{ actor: "logos", actionType: "appear", startDuration: 2},
	{ actor: "mask", actionType: "appear", startDuration: 0.5 },
	{ actor: "conclusion", actionType: "appear", startDuration: 1 },
]},
{ leadingBlank: 1, duration: 6, text: `If it fails to effectively represent the problem at hand, other complexities creep in.`, translations: {
	zhCN: `如果它不能有效地表示手头的问题，那么其他复杂性就会悄然而至。`,
	zhTW: `如果它不能有效地表示手頭的問題，那麼其他複雜性就會悄然而至。`,
}, actions: [
]},
{ leadingBlank: 1, duration: 5, text: `Remember Einstein's Razor and the Principle of Least Astonishment.`, translations: {
	zhCN: `记住爱因斯坦剃刀和最小惊讶原则。`,
	zhTW: `記住愛因斯坦剃刀和最小驚訝原則。`,
}, actions: [
]},
{ leadingBlank: 1, duration: 5, text: `Strive to make illegal states unrepresentable.`, translations: {
	zhCN: `努力使非法状态根本无法表达。`,
	zhTW: `努力使非法狀態根本無法表達。`,
}, actions: [
]},
{ leadingBlank: 1, duration: 10, text: `Thanks for watching! There's so much more about booleans I'd love to share. Maybe another time. Next, let's explore the art of copy-pasting. Stay tuned!`, translations: {
	zhCN: `谢谢观看！关于布尔值，我还有很多想分享的。也许下次吧。接下来，让我们探索一下复制粘贴的艺术。敬请期待！`,
	zhTW: `謝謝觀看！關於布爾值，我還有很多想分享的。也許下次吧。接下來，讓我們探索一下複製粘貼的藝術。敬請期待！`,
}, actions: [
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

const announceBoardStyle: CSSProperties = { 
				paddingTop: '20px',
				paddingLeft: '10px',
	fontFamily: 'Poppins', left: '0%', top: '35%', width: '100%', height: '45%', backgroundColor: 'rgba(0, 114, 160, 0.8)' }


	const bigArray = `[
  [false, false, true, true, false, false, true, false],
  [true, false, false, false, true, false, false, false],
  [true, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false],
  [false, false, false, false, false, true, false, false],
  [false, true, false, false, true, false, false, false],
  [false, true, false, false, false, false, true, false],
  [false, false, false, false, false, false, false, false],
  [false, false, true, false, true, false, false, false],
  [false, false, true, false, false, false, false, false],
  [false, true, false, false, true, false, false, false],
]`

const listOfPos = `[
  {x: 1, y: 0},
  {x: 1, y: 1},
  {x: 0, y: 2},
  {x: 1, y: 2},
]`

const publicCourse = `publicCourse = {
  name: "Boolean Master",
  isPrivate: false,
  price: Money(100, "USD"),
  earlyBirdPrice: Money(80, "USD"),
  earlyBirdDeadline: Date("2020-01-01"),
}`

const privateCourse = `privateCourse = {
  name: "Boolean Deep Dive",
  sPrivate: true,
}`

const confusedCourse = `confusedCourse = {
  name: "Three States of Boolean",
  isPrivate: true,
  price: Money(100, "USD"),
}`

const conclusion = `## Conclusion

* Boolean data is the simplest data type, but it can be too simple.
* Remember Einstein's Razor:
  * "_Make things as simple as possible, but not simpler._"
* Remember the Principle of Least Astonishment
* Make illegal states unrepresentable
`;

export const StoryBooleanData: React.FC = () => {
  return (
		<Story id="StoryBooleanData" width={720} height={720} subtitles={booleanDataSubtitles} language='zhCN' >
		<link href='https://fonts.googleapis.com/css?family=Poppins' rel='stylesheet'/>
		<Audio src={staticFile("assets/audios/boolean3ch.mp3")} />
    <AbsoluteFill style={{fontFamily: "Poppins"}}>
    <AbsoluteFill style={{backgroundColor: "black", perspective: "400px"}}>
    <AnimationEffect actor="game of life" style={{transformStyle: "preserve-3d"}}>
			<ThreeDFrame>
				{/* <ambientLight intensity={0.5} /> */}
				<directionalLight castShadow position={[10, 20, 15]} intensity={5} color={0xffffff} />	
				<GameOfLifeAnimated actor="gol" startLives={gliders} />
			</ThreeDFrame>
			<WindBlow actor="wind" style={{left: "35%", width: "20%", top: "18%"}} />
			<AnimationEffect actor="mask" style={{backgroundColor: "rgba(0, 0, 0, 0.7)"}}/>
			<CodeHighlight actor="array" codeString={bigArray} style={{ left: '2%', top: '25%', width: '60%', height: '20%', perspective: "400px", transformStyle: "preserve-3d", overflow: 'visible', backgroundColor: "rgba(0,0,0,0)" }} preStyle={{backgroundColor: "rgba(0,0,0,0.7)"}} />
			<CodeHighlight actor="positions" codeString={listOfPos} style={{ left: '55%', top: '25%', width: '60%', height: '20%', perspective: "400px", transformStyle: "preserve-3d", overflow: 'visible', backgroundColor: "rgba(0,0,0,0)" }} preStyle={{backgroundColor: "rgba(0,0,0,0.7)"}} />

			<AnimationEffect actor="einstein's razor" style={{backgroundColor: "rgba(0,0,0, 0.8)", width: "100%", height: "100%"}}>
				<Img src={staticFile("assets/Einstein_1921.jpg")} style={{position: "absolute", width: "100%"}}/>
				<Markdown actor="einstein quote" md="" style={{ left: '10%', top: '50%', width: '40%', height: '60%', perspective: "400px", transformStyle: "preserve-3d", overflow: 'visible', fontSize: "xx-large"}} />
			</AnimationEffect>

		</AnimationEffect>
		</AbsoluteFill>
		<CalloutCloud actor='boundary callout' style={{top: '45%', left: "2%"}} tailShift={5} tailHeightPx={50}>
			<span style={{ fontSize: '30px', margin: 0 }} > 🤔 How many neighbours does (0, 0) have? (2, 2)? 🤔 </span>
		</CalloutCloud>

		<CodeHighlight actor="public course" codeString={publicCourse} style={{ left: '10%', top: '10%', width: '80%', height: '20%', perspective: "400px", transformStyle: "preserve-3d", overflow: 'visible', backgroundColor: "rgba(0,0,0,0)" }} preStyle={{backgroundColor: "rgba(100,100,100,0.7)"}} />
		<CodeHighlight actor="private course" codeString={privateCourse} style={{ left: '10%', top: '40%', width: '80%', height: '20%', perspective: "400px", transformStyle: "preserve-3d", overflow: 'visible', backgroundColor: "rgba(0,0,0,0)" }} preStyle={{backgroundColor: "rgba(100,100,100,0.7)"}} />
		<CodeHighlight actor="confused course" codeString={confusedCourse} style={{ left: '10%', top: '60%', width: '80%', height: '20%', perspective: "400px", transformStyle: "preserve-3d", overflow: 'visible', backgroundColor: "rgba(0,0,0,0)" }} preStyle={{backgroundColor: "rgba(100,100,100,0.7)"}} />

		<AnimationEffect actor="title" style={announceBoardStyle} >
			<span style={{
				display: 'block',
				paddingTop: '30px',
			fontSize: '36px',
			color: 'white',
			fontWeight: 'bold',
		}}>Why Do I Have To Reconsider My Boolean Data?</span>
			<CodeHighlight actor="second title" style={{
				position: 'relative',
				paddingTop: '35px',
				display: 'block',
			fontSize: '30px',
			color: 'white',
			fontFamily: 'IBM Plex Mono',
		}} language="html" codeString=""/>
		</AnimationEffect>

    <Markdown actor="conclusion" style={{...announceBoardStyle, top: "15%", height: "60%", paddingTop: "20p", fontFamily: "Poppins", fontSize: "x-large"}}
			md={conclusion}
		 />
			<AnimationEffect actor="logos">
			<AbsoluteFill style={{ left: '85%', top: '8.0%', width: '10%', height: '20%'}}>
				<span style={{fontSize: '20px', color: "white", fontFamily: "Poppins, sans serif"}}>terry@</span>
			</AbsoluteFill>
			<AbsoluteFill style={{ left: '90%', top: '2%', width: '12%', height: '20%'}}>
				<OddeLogo />
				<FlipCoin speed={2} interval={20} shift={0} >
					<OddeLogoInner />
				</FlipCoin>
			</AbsoluteFill>
			</AnimationEffect>

		<AbsoluteFill style={{position: 'absolute', left: '0%', top: '0%', width: '100%', height: '100%'}}>
			<ThreeDFrame>
				<directionalLight castShadow position={[10, 20, 15]} intensity={15} color={0xffffff} />	
				<ThreeAnimationEffect actor="thinker">
					<GroupInitialState rotation={[-0.8, -0, 0.9]} position={[10, -0.5, -6]} scale={4}>
					<ThinkingEmoji/>
					</GroupInitialState>
				</ThreeAnimationEffect>
			</ThreeDFrame>
		</AbsoluteFill>
			<AnimationEffect actor="subtitles">
				<Subtitles scale={1}/>
			</AnimationEffect>
		</AbsoluteFill>
		</Story>
  );
};
