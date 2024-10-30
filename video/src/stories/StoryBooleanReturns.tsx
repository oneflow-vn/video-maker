import {Audio} from 'remotion'
import {staticFile} from 'remotion'
import {Img} from 'remotion'


import React, { CSSProperties } from 'react';

import { Action, Subtitle } from '../models/Subtitles';
import { AbsoluteFill } from 'remotion';
import AnimationEffect from '../video_components/AnimationEffect';
import { ThreeDFrame } from '../video_components/ThreeDFrame';
import { ThreeAnimationEffect } from '../video_components/ThreeAnimationEffect';
import { OddeLogo } from '../parts/OddeLogo';
import { OddeLogoInner } from '../parts/OddeLogoInner';
import { FlipCoin } from '../video_components/AutonomousComponents/FlipCoin';
import { Story } from '../video_components/Story';
import { Blaster } from '../parts/Blaster';
import { GroupInitialState } from '../video_components/GroupInitialState';
import { RocketPlume } from '../parts/RocketPlume';
import { CodeHighlight } from '../video_components/CodeHighlight';
import HealthBar from '../video_components/HealthBar';
import { Markdown } from '../video_components/Markdown';
import { Subtitles } from '../video_components/Subtitles';
import { Anchor } from '../video_components/Anchor';
import { fireActions } from '../subtitles/booleans/common';
import { ThinkingEmoji } from '../parts/ThinkingEmoji';
import { Explosion } from '../parts/Explosion';
import { Helmet } from '../parts/Helmet';

const popupActios: Action[] = [
				{ actor: "helmet position", actionType: "move", duration: 1, absolutePosition: [0, 0.8, 0] },
				{ actor: "helmet", actionType: "3d rotate", endingTimeAdjustment: 1, totalRotation: [20, 0, 0] },
				{ actor: "blaster assembly", actionType: "move", duration: 1, absolutePosition: [0, 0, 0], offset: 0.5 },
		];
const hideActions: Action[] = [
				{ actor: "helmet position", actionType: "move", duration: 0.5, absolutePosition: [0, -3.1, 0] },
				{ actor: "helmet", actionType: "3d rotate", endingTimeAdjustment: 0.5, totalRotation: [-60, 20, 0], offset: 0.3 },
				{ actor: "blaster assembly", actionType: "move", duration: 0.5, absolutePosition: [5, -10, -4] },
		];
export const booleanReturnsSutitles: Subtitle[] = [
		{ leadingBlank: 0, duration: 3, text: "Welcome back to the Oh My Bad Boolean Series!",
			translations: {
				zhCN: "欢迎回到《布尔值的坏习惯》系列！",
				zhTW: "歡迎回到《布林值的壞習慣》系列！",
			},
			actions:[
        { actor: "camera", actionType: "move", duration: 0, absolutePosition: [0, 0, 8],},
			  { actor: "caller", actionType: "appear" },
			  { actor: "soldier", actionType: "disappear"},
			  { actor: "blaster assembly", actionType: "oscillate", delta: [0, 0.02, 0]},
				{ actor: "clear intention health bar", actionType: "additive value change to", duration: 0, value: 100},
				{ actor: "high cohesion health bar", actionType: "additive value change to", duration: 0, value: 0},
				{ actor: "helmet position", actionType: "move", duration: 0, absolutePosition: [0, -3.1, 0] },
				{ actor: "helmet", actionType: "3d rotate", endingTimeAdjustment: 0, totalRotation: [-60, 20, 0] },
				{ actor: "blaster assembly", actionType: "move", duration: 0, absolutePosition: [10, -16, 0], offset: 0.5 },
			  { actor: "mask", actionType: "appear", startDuration: 0.2, persistUntilSubtitleId: "intro to blaster"},

		] },
		{ leadingBlank: 1, duration: 4, text: "Today's question: Why Are My Boolean Return Values Sometimes Bad?", translations: {
				zhCN: "今天的话题是：为什么我的布尔型返回值也有问题？",
				zhTW: "今天的話題是：為什麼我的布林值返回值也有問題？",
		}, actions:[
		] },
		{ leadingBlank: 1, duration: 3, text: "And how can we make our code reveal my STYLE.", translations: {
			zhCN: "以及如何让代码展现我独到的风格。",
			zhTW: "以及如何讓程式碼展現我獨到的風格。",
		}, actions:[
				{ actor: "second title", actionType: "insert text", endingTimeAdjustment: 3, line: 1, column: 1, text: "and make our code reveal my STYLE", startDuration: 1, endDuration: 1 },
				{ actor: "punk head", actionType: "rotate and rise", duration: 1, value: 5 },
		] },
		{ leadingBlank: 1, duration: 5, text: "Oops, sorry, not 'my STYLE'. Should be 'its true intention'.",  translations: {
			zhCN: "哎呀，不好意思，不是“我的风格”，应该是“它的真实意图”。",
			zhTW: "哎呀，不好意思，不是「我的風格」，應該是「它的真實意圖」。",
		},actions:[
				{ actor: "second title", actionType: "replace text", endingTimeAdjustment: 4, line: 1, match: "my STYLE", replacement: "its true intention", startDuration: 0, endDuration: 2 },
				{ actor: "title", actionType: "disappear", startDuration: 1, offset: 5 },
				{ actor: "punk head", actionType: "move", duration: 2, absolutePosition: [-850,-1250,0] },
				{ actor: "punk head", actionType: "scale", duration: 2, outputRange: [1,0.5] },
		] },
		{ id: "intro to blaster" ,leadingBlank: 1, duration: 3, text: "Remeber the Blaster in my game program?",  translations: {
			zhCN: "还记得我的游戏程序中的Blaster吗？",
			zhTW: "還記得我的遊戲程式中的Blaster嗎？",
		},actions:[
			  { actor: "blaster", actionType: "3d animation reverse", duration: 2, speed: 4, pauseAtEnd: true, freezeBeforeStart: true },
		] },
		{ leadingBlank: 1, duration: 2, text: "You can pop up,",  translations: {
			zhCN: "你可以跳出来，",
			zhTW: "你可以跳出來，",
		},actions:[
			{ actor: "caller", actionType: "highlight lines", endingTimeAdjustment: 2, lines: [3]},
			...popupActios,
		] },
		{ leadingBlank: 0, duration: 2, text: "and fire,",  translations: {
			zhCN: "然后开火，",
			zhTW: "然後開火，",
		},actions:[
			  { actor: "caller", actionType: "highlight lines", endingTimeAdjustment: 3, lines: [4]},
				...fireActions,
				{ actor: "caller-fire", actionType: "connect to",  startDuration: 1, target: "callee-fire", bentLevel: -100, endingTimeAdjustment: 5},
		] },
		{ leadingBlank: 0, duration: 4, text: "then quickly hide again like a sneaky ninjia.",  translations: {
			zhCN: "然后迅速躲起来。",
			zhTW: "然後迅速躲起來。",
		},actions:[
			  { actor: "caller", actionType: "highlight lines", endingTimeAdjustment: 3, lines: [5]},
			  ...hideActions
		] },
		{ leadingBlank: 0, duration: 3, text: "It's called a pop up attack.",  translations: {
			zhCN: "这就是所谓的跳出攻击 pop up attack。",
			zhTW: "這就是所謂的跳出攻擊 pop up attack。",
		},actions:[
		] },
		{ leadingBlank: 1, duration: 5, text: "But wait, the Blaster's fire function returned a boolean value? What's up with that?",  translations: {
			zhCN: "但是等等，Blaster的fire函数返回了一个布尔值？这是怎么回事？",
			zhTW: "但是等等，Blaster的fire函數返回了一個布林值？這是怎麼回事？",
		},actions:[
				{ actor: "callee", actionType: "insert text", endingTimeAdjustment: 3, line: 2, column: 2, text: "Boolean ", startDuration: 1, endDuration: 1 },
			  { actor: "thinker", actionType: "rotate and rise", duration: 4, value: 3, offset: 4 },
		] },
		{ leadingBlank: 1, duration: 6, text: "Does it mean the shot was successful? It exploded? No ammo left?	",  translations: {
			zhCN: "这是不是意味着射击成功了？它爆炸了？没有弹药了？",
			zhTW: "這是不是意味著射擊成功了？它爆炸了？沒有彈藥了？",
		},actions:[
			  ...popupActios,
			  { actor: "callee", actionType: "highlight lines", endingTimeAdjustment: 6, lines: [2]},
			  { actor: "blaster explosion", actionType: "3d animation start", duration: 1, speed: 1, offset: 3},
		] },
		{ leadingBlank: 1, duration: 5, text: "Talk about a mystery wrapped in an enigma!	What is its intention?",  translations: {
			zhCN: "这是一个包含在谜团中的谜团！它的意图是什么？",
			zhTW: "這是一個包含在謎團中的謎團！它的意圖是什麼？",
		},actions:[
				{ actor: "clear intention health bar", actionType: "additive value change to", duration: 2, value: 50, offset: 1},
		] },
		{ leadingBlank: 1, duration: 5, text: "This forced actions on callers, like writing a log.",  translations: {
			zhCN: "这迫使调用者采取行动，例如写日志。",
			zhTW: "這迫使調用者採取行動，例如寫日誌。",
		},actions:[
				{ actor: "caller", actionType: "insert text", endingTimeAdjustment: 1, line: 4, column: 2, text: "if(", startDuration: 1, endDuration: 0 },
				{ actor: "caller", actionType: "replace text", endingTimeAdjustment: 3, line: 4, match: ";", replacement: "){\n    log(\"Somebody should look at this.\");\n  }", startDuration: 1, endDuration: 1, offset: 2 },
		] },
		{ leadingBlank: 0, duration: 4, text: "and distracts from the main logic flow.",  translations: {
			zhCN: "并且分散了主要的逻辑流程。",
			zhTW: "並且分散了主要的邏輯流程。",
		},actions:[
				{ actor: "clear intention health bar", actionType: "additive value change to", duration: 1, value: 10, offset: 1},
		] },
		{ leadingBlank: 2, duration: 9, text: "Potential problems with a boolean return value: the meaning might not be clear and it force the caller to do something and disrupt the main logic flow",  translations: {
			zhCN: "布尔返回值的潜在问题：含义可能不清楚，它迫使调用者做某事并破坏主要的逻辑流程",
			zhTW: "布林返回值的潛在問題：含義可能不清楚，它迫使調用者做某事並破壞主要的邏輯流程",
		},actions:[
			  { actor: "thinker", actionType: "disappear", startDuration: 1 },
			  { actor: "mask", actionType: "appear", startDuration: 0.2, persistUntilSubtitleId: "solution1"},
				{ actor: "learning from not return", actionType: "appear", startDuration: 1, persistUntilSubtitleId: "solution1" },
			  ...hideActions,
		] },
		{ id: "solution1", leadingBlank: 1, duration: 5, text: "Let's fix this. You don't have to return anything if there's no meaningful thing to return.",  translations: {
			zhCN: "让我们来修复这个问题。如果没有有意义的东西要返回，您就不必返回任何东西。",
			zhTW: "讓我們來修復這個問題。如果沒有有意義的東西要返回，您就不必返回任何東西。",
		},actions:[
			{ actor: "callee", actionType: "replace text", endingTimeAdjustment: 3, line: 2, match: "Boolean", replacement: "void", startDuration: 1, endDuration: 1, offset: 2 },
		] },
		{ id: "solution1", leadingBlank: 1, duration: 5, text: "When failing to fire is a surprise, the function should throw an exception.",  translations: {
			zhCN: "当无法发射属于意外情况时，函数应抛出异常。",
			zhTW: "當無法發射屬於意外情況時，函數應拋出異常。",
		},actions:[
				{ actor: "callee", actionType: "insert text", endingTimeAdjustment: 4, line: 3, column: 20, text: "\n    throw new Error('...');", startDuration: 1, endDuration: 1, offset: 2 },
		] },
		{ leadingBlank: 1, duration: 4, text: "Now callers can choose where to handle the exceptional situation.",  translations: {
			zhCN: "现在，调用者可以选择在哪里处理异常情况。",
			zhTW: "現在，調用者可以選擇在哪裡處理異常情況。",
		},actions:[
		] },
		{ leadingBlank: 1, duration: 4, text: "We should do this more often in test automation.",  translations: {
			zhCN: "我们应该在测试自动化中经常这样做。",
			zhTW: "我們應該在測試自動化中經常這樣做。",
		},actions:[
		] },
		{ leadingBlank: 1, duration: 6, text: "Some languages, like Go, prefer a more explicit approach for error situations.",  translations: {
			zhCN: "一些语言（例如Go）更喜欢对错误情况采用更明确的方法。",
			zhTW: "一些語言（例如Go）更喜歡對錯誤情況採用更明確的方法。",
		},actions:[
		] },
		{ leadingBlank: 1, duration: 5, text: "The idea stays the same - separate exceptional situations from the main logic.",  translations: {
			zhCN: "思想仍然是一样的-将异常情况与主要逻辑分开。",
			zhTW: "思想仍然是一樣的-將異常情況與主要邏輯分開。",
		},actions:[
		] },
		{ leadingBlank: 1, duration: 5, text: "Avoiding forced actions on callers improves code readability.",  translations: {
			zhCN: "避免对调用者的强制操作可以提高代码的可读性。",
			zhTW: "避免對調用者的強制操作可以提高代碼的可讀性。",
		},actions:[
			  { actor: "caller", actionType: "delete lines", endingTimeAdjustment: 1, fromLine: 4, count: 3, offset: 1},
				{ actor: "caller", actionType: "insert text", endingTimeAdjustment: 1, line: 4, column: 2, text: "this.blaster.fire();\n  ", startDuration: 1, endDuration: 0 },
				{ actor: "clear intention health bar", actionType: "additive value change to", duration: 1, value: 100, offset: 3},
		] },

		{ leadingBlank: 1, duration: 4, text: "Now, let's look at another example with the Blaster's safety feature.",  translations: {
			zhCN: "现在，让我们看看Blaster的另一个示例: 保险开关。",
			zhTW: "現在，讓我們看看Blaster的另一個示例: 保險開關。",
		},actions:[
			{ actor: "caller", actionType: "disappear" },
			{ actor: "soldier", actionType: "appear"},
			{ actor: "callee", actionType: "delete lines", endingTimeAdjustment: 1, fromLine: 3, count: 2},
		] },

		{ leadingBlank: 1, duration: 6, text: "The Blaster has a isSafetyOn function, and you can set the safety on or off as well.",  translations: {
			zhCN: "Blaster有一个isSafetyOn函数，您也可以设置安全开关。",
			zhTW: "Blaster有一個isSafetyOn函數，您也可以設置安全開關。",
		},actions:[
			{ actor: "callee", actionType: "move", duration: 1, absolutePosition: [-240, 80, 0] },
			{ actor: "callee", actionType: "insert text", endingTimeAdjustment: 4, line: 4, column: 0, text: "  Boolean isSafetyOn() {...}\n  void setSafetyOff(fingerprint) {...}", startDuration: 1, endDuration: 0 },
		] },

		{ leadingBlank: 1, duration: 5, text: "The soldier need to check if the safety is on. And if so, switch it off before firing.",  translations: {
			zhCN: "在开火前士兵需要检查保险是否启动。如果是这样，将其关闭。",
			zhTW: "在開火前士兵需要檢查保險是否啟動。如果是這樣，將其關閉。",
		},actions:[
			{ actor: "camera", actionType: "camera look at", duration: 3, absolutePosition: [0, -6, -1] },
			{ actor: "camera", actionType: "move", duration: 3, absolutePosition: [6, -8, 0] },
			{ actor: "soldier", actionType: "insert text", endingTimeAdjustment: 4, line: 2, column: 30, text: "\n  if(this.blaster.isSafetyOn()) {\n    this.blaster.setSefetyOff(this.fingerprint);\n  }", startDuration: 1, endDuration: 0, offset: 1 },
		] },

		{ leadingBlank: 1, duration: 6, text: "The Soldier class LIKES the feature of their Blaster a lot, and is too focused on the Blaster's feature.",  translations: {
			zhCN: "士兵类非常喜欢他们的Blaster的功能，以至于过于关注Blaster的功能。",
			zhTW: "士兵類非常喜歡他們的Blaster的功能，以至於過於關注Blaster的功能。",
		},actions:[
				{ actor: "soldier", actionType: "highlight token", endingTimeAdjustment: 7, token: 'blaster', offset: 1},
				{ actor: "high cohesion health bar", actionType: "additive value change to", duration: 0.1, value: 100, offset: 2},
		] },

		{ leadingBlank: 1, duration: 3, text: "Which make the Blaster code less cohesive.",  translations: {
			zhCN: "这使得Blaster代码内聚性差。",
			zhTW: "這使得Blaster代碼內聚性差。",
		},actions:[
				{ actor: "high cohesion health bar", actionType: "additive value change to", duration: 2, value: 50, offset: 1},
		] },

		{ leadingBlank: 1, duration: 3, text: "and blurs Soldier's intention.",  translations: {
			zhCN: "并模糊了Soldier class的意图。",
			zhTW: "並模糊了Soldier class的意圖。",
		},actions:[
				{ actor: "clear intention health bar", actionType: "additive value change to", duration: 1, value: 60, offset: 1},
		] },

		{ leadingBlank: 1, duration: 5, text: "This is called a Feature Envy.",  translations: {
			zhCN: "这被称为Feature Envy。",
			zhTW: "這被稱為Feature Envy。",
		},actions:[
			{ actor: "camera", actionType: "camera look at", duration: 1, absolutePosition: [0, 0, 0] },
			{ actor: "camera", actionType: "move", duration: 1, absolutePosition: [0, 0, 0] },
			{ actor: "feature envy", actionType: "appear", startDuration: 1, endDuration: 1, endingTimeAdjustment: 5 },
		] },

		{ leadingBlank: 1, duration: 8, text: "We could extract part of it to a method of the Solider class first.",  translations: {
			zhCN: "我们可以先将其部分提取到Solider类的方法中。",
			zhTW: "我們可以先將其部分提取到Solider類的方法中。",
		},actions:[
				{ actor: "soldier", actionType: "highlight lines", endingTimeAdjustment: 5, lines: [3, 4, 5]},
			  { actor: "soldier", actionType: "insert text", endingTimeAdjustment: 3, line: 9, column: 30, text: "\nvoid ensureSafetyOff(fingerprint) {\n  if(this.blaster.isSafetyOn()) {\n    this.blaster.setSefetyOff(fingerprint);\n  }\n}", startDuration: 1, endDuration: 0, offset: 1 },
				{ actor: "soldier-extract-start", actionType: "connect to",  startDuration: 1, target: "soldier-extract-end", bentLevel: 150, endingTimeAdjustment: 3, offset: 2},
			  { actor: "soldier", actionType: "delete lines", endingTimeAdjustment: 1, fromLine: 3, count: 3, offset: 5},
			  { actor: "soldier", actionType: "insert text", endingTimeAdjustment: 1, line: 3, column: 0, text: "  this.endsureSafetyOff(this.fingerprint);\n", offset: 6},
		] },

		{ leadingBlank: 1, duration: 5, text: "Then move the new method to the Blaster class to stop the Feature Envy.",  translations: {
			zhCN: "然后将新方法移动到Blaster类中以停止Feature Envy。",
			zhTW: "然後將新方法移動到Blaster類中以停止Feature Envy。",
		},actions:[
				{ actor: "soldier-extract-end", actionType: "connect to",  startDuration: 1, target: "callee-fire", bentLevel: 50, endingTimeAdjustment: 5, offset: 2},
				{ actor: "soldier", actionType: "highlight lines", endingTimeAdjustment: 4, lines: [8, 9, 10,11,12]},
			  { actor: "callee", actionType: "insert text", endingTimeAdjustment: 3, line: 1, column: 30, text: "\n  void ensureSafetyOff(fingerprint) {\n    if(this.isSafetyOn()) {\n      this.setSefetyOff(fingerprint);\n    }\n  }", startDuration: 1, endDuration: 0, offset: 1 },
			  { actor: "soldier", actionType: "insert text", endingTimeAdjustment: 1, line: 3, column: 6, text: ".blaster", offset: 4},
		] },

		{ leadingBlank: 1, duration: 6, text: "Before we finish the move, you might have noticed that the method just becomes slimmer.",  translations: {
			zhCN: "在我们完成移动之前，您可能已经注意到该方法变瘦了。",
			zhTW: "在我們完成移動之前，您可能已經注意到該方法變瘦了。",
		},actions:[
				{ actor: "soldier-left", actionType: "connect to",  startDuration: 1, target: "callee-left", bentLevel: 0, endingTimeAdjustment: 5, offset: 2},
				{ actor: "soldier-right", actionType: "connect to",  startDuration: 1, target: "callee-right", bentLevel: 0, endingTimeAdjustment: 5, offset: 2},
		] },

		{ leadingBlank: 1, duration: 5, text: "This is because now the operation of the data is closer to the source of the data.",  translations: {
			zhCN: "这是因为现在数据的操作更接近数据的来源。",
			zhTW: "這是因為現在數據的操作更接近數據的來源。",
		},actions:[
			  { actor: "soldier", actionType: "delete lines", endingTimeAdjustment: 1, fromLine: 8, count: 5, offset: 3},
		] },

		{ leadingBlank: 1, duration: 5, text: "This Feature Envy problem is not unique to boolean return values.",  translations: {
			zhCN: "这种Feature Envy问题并不是布尔返回值所特有的。",
			zhTW: "這種Feature Envy問題並不是布爾返回值所特有的。",
		},actions:[
				{ actor: "clear intention health bar", actionType: "additive value change to", duration: 1, value: 90},
				{ actor: "high cohesion health bar", actionType: "additive value change to", duration: 2, value: 80, offset: 1},
		] },

		{ leadingBlank: 1, duration: 6, text: "But I feel a boolean return value is more likely to leak internal state, leading to lower cohesion.",  translations: {
			zhCN: "但我觉得布尔返回值更有可能泄漏内部状态，导致内聚性降低。",
			zhTW: "但我覺得布爾返回值更有可能洩漏內部狀態，導致內聚性降低。",
		},actions:[
		] },

		{ leadingBlank: 1, duration: 5, text: "In conclusion, boolean return values are not inherently bad",  translations: {
			zhCN: "总之，布尔返回值本身并不是坏的",
			zhTW: "總之，布爾返回值本身並不是壞的",
		},actions:[
			  { actor: "mask", actionType: "appear", startDuration: 0.2, endingTimeAdjustment: 100},
				{ actor: "conclusion", actionType: "appear", startDuration: 1 },
		] },

		{ leadingBlank: 0, duration: 10, text: "but be cautious with the ambiguous ones. Use meaningful return values, follow Tell, Don't Ask, and adhere to Command-Query Separation.",  translations: {
			zhCN: "但是对于模棱两可的返回值要小心。使用有意义的返回值，遵循Tell，Don't Ask，并遵守Command-Query Separation。",
			zhTW: "但是對於模棱兩可的返回值要小心。使用有意義的返回值，遵循Tell，Don't Ask，並遵守Command-Query Separation。",
		},actions:[
		] },
		{ leadingBlank: 0, duration: 10, text: "Thanks for watching. I still have one more Oh My Bad Boolean episode to share. As always, happy coding!",  translations: {
			zhCN: "感谢观看。我还有一个《我的布尔值坏习惯》的部分要分享。编码愉快！",
			zhTW: "感謝觀看。我還有一個《我的布爾值壞習慣》的部分要分享。編碼愉快！",
		},actions:[
		] },

];

const codeString = `class Blaster {
  fire() {
    // ...
  }

}`;

const caller = `// class Soldier
popUpAttack() {
  this.popUp();
  this.blaster.fire();
  this.hide();
}
	`;

const learningFromException = `## This boolean return value:

* The meaning is unclear.
* Also makes the caller lose focus.`;

const conclusion = `## Conclusion

* Boolean return values are not inherently bad.
* Be cautious with ambiguous boolean return values.
* Look for Feature Envy. Avoid leaking internal state.
* Good principles:
	* Command-Query Separation (CQS)
	* Tell, Don't Ask
`;

const announceBoardStyle: CSSProperties = { 
				paddingTop: '20px',
				paddingLeft: '10px',
				fontSize: "x-large",
	left: '0%', top: '35%', width: '100%', height: '45%', backgroundColor: 'rgba(0, 114, 160, 0.8)' }

export const StoryBooleanReturns: React.FC = () => {
  return (
		<Story id="StoryBooleanReturns" width={1024} height={720} subtitles={booleanReturnsSutitles}>
		  <Audio src={staticFile("assets/audios/boolean2.mp3")} />

    <AbsoluteFill style={{ backgroundColor: '#000', fontFamily: 'Roboto, sans-serif', }}>

      <AnimationEffect actor="stage">
				<AbsoluteFill style={{position: 'absolute', left: '0%', top: '0%', width: '100%', height: '100%', zIndex:2000}}>
          <ThreeDFrame>
						<directionalLight castShadow position={[10, 20, 15]} intensity={15} color={0xffffff} />	
						<GroupInitialState rotation={[0, Math.PI * 3 / 2, 0]} position={[-0, 0, 0]} scale={0.15}>
							<Explosion actor="blaster explosion" />
						</GroupInitialState>
						<GroupInitialState rotation={[0.7, Math.PI * 1.3, 0]} position={[1, 2.5, 0]} scale={1}>
							<ThreeAnimationEffect actor="blaster assembly" >
									<Blaster actor="blaster"/>
									<GroupInitialState rotation={[0, 0, Math.PI * 3 / 2]} position={[0, 0, 0]} scale={1}>
										<RocketPlume actor="blaster fire" position={[-0.6, -3, 0.3]} scale={1.8}/>
									</GroupInitialState>
							</ThreeAnimationEffect>
						</GroupInitialState>
						<ThreeAnimationEffect actor="helmet position">
							<GroupInitialState rotation={[0, 0, 0]} position={[-1, 1, 4]} scale={0.03}>
								<ThreeAnimationEffect actor="helmet">
									<Helmet />
								</ThreeAnimationEffect>
							</GroupInitialState>
						</ThreeAnimationEffect>
          </ThreeDFrame>
				</AbsoluteFill>
			</AnimationEffect>

			<CodeHighlight actor="caller" codeString={caller} style={{ left: '5%', top: '15%', width: '60%', height: '20%', backgroundColor: "rgba(0,0,0,0)" }} preStyle={{backgroundColor: "rgba(0,0,0,0.7)"}}>
				<Anchor actor="caller-fire" style={{left: "245px", top: "80px"}}/>
			</CodeHighlight>
			<CodeHighlight actor="soldier" codeString={caller} style={{ left: '20%', top: '10%', width: '80%', height: '20%', backgroundColor: "rgba(0,0,0,0)" }} preStyle={{backgroundColor: "rgba(0,0,0,0.7)"}}>
				<Anchor actor="soldier-extract-start" style={{left: "6px", top: "80px"}}/>
				<Anchor actor="soldier-extract-end" style={{left: "6px", top: "250px"}}/>
				<Anchor actor="soldier-left" style={{left: "26px", top: "220px"}}/>
				<Anchor actor="soldier-right" style={{left: "515px", top: "220px"}}/>
			</CodeHighlight>
			<CodeHighlight actor="callee" codeString={codeString} style={{ left: '35%', top: '45%', width: '50%', height: '50%', backgroundColor: "rgba(0,0,0,0)" }} preStyle={{backgroundColor: "rgba(0,0,0,0.7)"}}>
				<Anchor actor="callee-fire" style={{left: "150px", top: "25px"}}/>
				<Anchor actor="callee-left" style={{left: "50px", top: "75px"}}/>
				<Anchor actor="callee-right" style={{left: "430px", top: "75px"}}/>
			</CodeHighlight>

				<AbsoluteFill style={{position: 'absolute', left: '0%', top: '0%', width: '100%', height: '100%'}}>
          <ThreeDFrame>
						<directionalLight castShadow position={[10, 20, 15]} intensity={15} color={0xffffff} />	
						<ThreeAnimationEffect actor="thinker">
							<GroupInitialState rotation={[0, -0.5, 0]} position={[2.8, -0.5, 0]} scale={1}>
							<ThinkingEmoji/>
							</GroupInitialState>
						</ThreeAnimationEffect>
          </ThreeDFrame>
				</AbsoluteFill>

    <AnimationEffect actor="mask" style={{backgroundColor: "rgba(0, 0, 0, 0.7)"}}/>
    <Markdown actor="learning from not return" style={announceBoardStyle}
			md={learningFromException}
		 />

    <Markdown actor="conclusion" style={{...announceBoardStyle, top: "15%", height: "60%", paddingTop: "20p"}}
			md={conclusion}
		 />

    <AnimationEffect actor="feature envy" style={{ top: "15%"}}>
			<Img src={staticFile('assets/feature-envy.jpeg')} width="100%"/>
		</AnimationEffect>


    <AnimationEffect actor="subtitles">
			<Subtitles scale={1}/>
		</AnimationEffect>
    </AbsoluteFill>

    <AnimationEffect actor="title" style={announceBoardStyle} >
			<span style={{
				display: 'block',
				paddingTop: '30px',
      fontSize: '36px',
			color: 'white',
      fontWeight: 'bold',
			fontFamily: 'Roboto, sans-serif',
    }}>Why Are My Boolean Return Values Sometimes Bad?</span>

			<CodeHighlight actor="second title" style={{
				position: 'relative',
				paddingTop: '35px',
				display: 'block',
      fontSize: '30px',
			color: 'white',
			fontFamily: 'IBM Plex Mono',
    }} language="html" codeString=""/>

    <AbsoluteFill style={{ top: '85%', left: "82%", height: '10%'}}>
			<span style={{fontFamily: 'Roboto, sans-serif',fontSize: '20px', color: "white"}}>terry@Odd-e</span>
		</AbsoluteFill>

		</AnimationEffect>
    <AbsoluteFill style={{ left: '0%',  top: '0.5%', width: '10%', height: '10%'}}>
			<span style={{fontFamily: 'sans-serif', fontSize: '15px', color: "#408fdd", textAlign: 'center'}}>Clear<br/>Intention</span>
		</AbsoluteFill>
    <AbsoluteFill style={{ left: '90%',  top: '0.5%', width: '10%', height: '10%'}}>
			<span style={{fontFamily: 'sans-serif', fontSize: '15px', color: "#ff8e00", textAlign: 'center'}}>high<br/>Cohesion</span>
		</AbsoluteFill>
		<HealthBar leftSide actor="clear intention health bar" style={{ left: '10%', top: '2.4%', width: '40%', height: '3%'}}/>
    <AbsoluteFill style={{ left: '50%', top: '2.4%', width: '40%', height: '3%'}}>
		<HealthBar actor="high cohesion health bar" />
		</AbsoluteFill>
		<AnimationEffect actor="punk head" style={{ left: '50%', top: '60%', width: '20%', height: '40%'}}>
			<Img src={staticFile("assets/punk-head.svg")} style={{position: 'absolute', width: '100%'}} />
		</AnimationEffect>

    <AbsoluteFill style={{ marginLeft: 'auto', marginRight: 'auto', top: '-4%', width: '12%', height: '20%'}}>
			<OddeLogo />
			<FlipCoin speed={2} interval={30} shift={0} >
			  <OddeLogoInner />
			</FlipCoin>
		</AbsoluteFill>
		</Story>
  );
};