import {staticFile} from 'remotion'
import {Audio} from 'remotion'


import React, { CSSProperties } from 'react';

import { Subtitle } from '../models/Subtitles';
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
import { CalloutCloud } from '../video_components/CalloutCloud';
import HealthBar from '../video_components/HealthBar';
import { LightSource } from '../video_components/LightSource';
import { Markdown } from '../video_components/Markdown';
import { Explosion } from '../parts/Explosion';
import { Subtitles } from '../video_components/Subtitles';
import { Anchor } from '../video_components/Anchor';
import { fireActions, loadActions, loadedFireActions } from '../subtitles/booleans/common';

export const booleanParametersSutitles: Subtitle[] = [
	{
			leadingBlank: 1,
			duration: 5,
			text: "Hello, welcome to the Oh My Bad Boolean Series.",
			translations: {zhCN: "大家好，欢迎来到《我的布尔值的坏习惯》系列。",
		zhTW: "大家好，歡迎來到《我的布林值的壞習慣》系列。"},
			actions: [
        { actor: "camera", actionType: "move", duration: 0, absolutePosition: [0, 0, 8],},
				{ actor: "second title", actionType: "insert text", endingTimeAdjustment: 3, line: 1, column: 1, text: "Seeking High Cohesion, Loose Coupling design", startDuration: 1, endDuration: 2 },
			  { actor: "blaster assembly", actionType: "oscillate", delta: [0, 0.02, 0]},
				// { actor: "subtitles", actionType: "appear", duration: 1, offset: 1000 },
			],
	},
	{
			leadingBlank: 1,
			duration: 4.5,
			text: "In my game program, there's a powerful tool called a Blaster.",
			translations: {zhCN: "在我的游戏程序中，有一个强大的工具叫做Blaster。",
		zhTW: "在我的遊戲程式中，有一個強大的工具叫做Blaster。"},
			actions: [
					{ actor: "title", actionType: "disappear", startDuration: 1 },
					{ actor: "callee", actionType: "appear", startDuration: 1 },
			],
	},

	{
			leadingBlank: 1,
			duration: 4,
			text: "You can fire the Blaster whenever you want.",
			translations: {zhCN: "你可以随时发射Blaster。",
		zhTW: "你可以隨時發射Blaster。"},
			actions: [
				...fireActions,
				{ actor: "caller 2", actionType: "appear", startDuration: 0.2},
				{ actor: "caller 2", actionType: "highlight lines", endingTimeAdjustment: 3, lines: [2]},
				{ actor: "callee", actionType: "highlight lines", endingTimeAdjustment: 3, lines: [6, 10]},
			],
	},

	{
			leadingBlank: 1,
			duration: 3,
			text: "But if you load it first, ",
			translations: {zhCN: "但如果你先加载它，",
		zhTW: "但如果你先載入它，"},
			actions: [
				...loadActions,
				{ actor: "caller 1", actionType: "appear", startDuration: 0.2},
				{ actor: "caller 1", actionType: "highlight token", endingTimeAdjustment: 3, token: 'true'},
				{ actor: "callee", actionType: "highlight token", endingTimeAdjustment: 3, token: 'isLoad'},
				{ actor: "callee", actionType: "highlight lines", endingTimeAdjustment: 3, lines: [4, 14]},
			],
	},

	{
			leadingBlank: 0,
			duration: 4,
			text: "you can fire more powerful shots.",
			translations: {zhCN: "你就可以发射更强大的火力。",
		zhTW: "你就可以發射更強大的火力。"},
			actions: [
				...loadedFireActions,
				{ actor: "caller 1", actionType: "appear", startDuration: 0.2},
				{ actor: "caller 1", actionType: "highlight lines", endingTimeAdjustment: 3, lines: [2]},
				{ actor: "callee", actionType: "highlight lines", endingTimeAdjustment: 3, lines: [4, 6, 10, 14]},
			],
	},

	{
			leadingBlank: 1,
			duration: 4,
			text: "The function 'action' is called from many places in the code.",
			translations: {zhCN: "函数'action'在代码的许多地方被调用。",
		zhTW: "函數'action'在程式的許多地方被呼叫。"},
			actions: [
				{ actor: "caller 3", actionType: "appear", startDuration: 0.2},
				{ actor: "caller 1", actionType: "highlight token", endingTimeAdjustment: 3, token: 'action'},
				{ actor: "caller 2", actionType: "highlight token", endingTimeAdjustment: 3, token: 'action'},
				{ actor: "caller 3", actionType: "highlight token", endingTimeAdjustment: 3, token: 'action'},
				{ actor: "callee", actionType: "highlight token", endingTimeAdjustment: 3, token: 'action'},
				{ actor: "a1-action", actionType: "connect to", startDuration: 1, endingTimeAdjustment: 10, target: "callee-action", bentLevel: -30},
				{ actor: "a2-action", actionType: "connect to", startDuration: 1, endingTimeAdjustment: 10, target: "callee-action", bentLevel: -30},
				{ actor: "a3-action", actionType: "connect to", startDuration: 1, endingTimeAdjustment: 10, target: "callee-action", bentLevel: -30},
			],
	},

	{
			leadingBlank: 1,
			duration: 7,
			text: "Using a boolean parameter reduces the number of API calls users have to remember.",
			translations: {zhCN: "使用布尔参数可以减少用户需要记住的API调用个数。",
		zhTW: "使用布林參數可以減少使用者需要記住的API呼叫個數。"},
			actions: [
				{ actor: "caller 1", actionType: "highlight token", endingTimeAdjustment: 7, token: 'true'},
				{ actor: "caller 2", actionType: "highlight token", endingTimeAdjustment: 7, token: 'false'},
				{ actor: "caller 3", actionType: "highlight token", endingTimeAdjustment: 7, token: 'true'},
				{ actor: "callee", actionType: "highlight token", endingTimeAdjustment: 7, token: 'isLoad'},
			],
	},

	{
			leadingBlank: 1,
			duration: 4,
			text: "So, what's the problem with using a boolean parameter?",
			translations: {zhCN: "那么，使用布尔参数有什么问题呢？",
		zhTW: "那麼，使用布林參數有什麼問題呢？"},
			actions: [
			],
	},

	{
			leadingBlank: 1,
			duration: 5,
			text: "As we can see, every caller knows exactly what they want.",
			translations: {zhCN: "正如我们所看到的，每个调用者都清楚地知道他们想要什么。",
		zhTW: "正如我們所看到的，每個呼叫者都清楚地知道他們想要什麼。"},
			actions: [
				{ actor: "caller 1", actionType: "highlight token", endingTimeAdjustment: 7, token: 'true'},
				{ actor: "caller 2", actionType: "highlight token", endingTimeAdjustment: 7, token: 'false'},
				{ actor: "caller 3", actionType: "highlight token", endingTimeAdjustment: 7, token: 'true'},
			],
	},

	{
			leadingBlank: 1,
			duration: 5,
			text: "It means the condition 'is Load' in the 'action' function is redundant.",
			translations: {zhCN: "这意味着'action'函数中的条件'is Load'是多余的。",
		zhTW: "這意味著'action'函數中的條件'is Load'是多餘的。"},
			actions: [
				{ actor: "callee", actionType: "highlight lines", endingTimeAdjustment: 5, lines: [3, 5]},
				{ actor: "a1-param", actionType: "connect to", startDuration: 1, endingTimeAdjustment: 10, target: "callee-load", bentLevel: 30},
				{ actor: "a2-param", actionType: "connect to",  startDuration: 1,endingTimeAdjustment: 10, target: "callee-fire", bentLevel: 30},
				{ actor: "a3-param", actionType: "connect to",  startDuration: 1,endingTimeAdjustment: 10, target: "callee-load", bentLevel: 30},
			],
	},

	{
			leadingBlank: 1,
			duration: 6,
			text: "I've been inventing countering logics in the callee and callers to keep myself busy.",
			translations: {zhCN: "搞了半天我一直在调用者和被调用者之间发明反向逻辑，让自己忙得不亦乐乎。",
		zhTW: "搞了半天我一直在呼叫者和被呼叫者之間發明反向邏輯，讓自己忙得不亦樂乎。"},
			actions: [
				{ actor: "loose coupling health bar", actionType: "additive value change to", duration: 0.1, value: 100},
				{ actor: "loose coupling health bar", actionType: "additive value change to", duration: 1, value: 50, offset: 0.5},
			],
	},

	{
			leadingBlank: 1,
			duration: 8,
			text: "Say, now Caller 1 is proposing an interface change.",
			translations: {zhCN: "现在Caller 1提议了一个接口变更。",
		zhTW: "現在Caller 1提議了一個介面變更。"},
			actions: [
				{ actor: 'caller 1 callout1', actionType: 'appear', startDuration: 0.5},
				{ actor: "caller 1", actionType: "replace text", endingTimeAdjustment: 1, line: 2, match: 'true', replacement: '1000'},
				{ actor: "caller 1", actionType: "highlight token", endingTimeAdjustment: 8.9, token: '1000', style: 'wavy underline'},
			],
	},

	{
			leadingBlank: 1,
			duration: 6,
			text: "So we changed the API to take a parameter 'load Amount'.",
			translations: {zhCN: "因此，我们将API更改为采用'load Amount'参数。",
		zhTW: "因此，我們將API更改為採用'load Amount'參數。"},
			actions: [
				{ actor: 'callee callout1', actionType: 'appear', startDuration: 0.5},
				{ actor: "callee", actionType: "replace text", endingTimeAdjustment: 1, line: 2, match: 'isLoad', replacement: 'loadAmount'},
				{ actor: "caller 2", actionType: "highlight token", endingTimeAdjustment: 20, token: 'false', style: 'wavy underline', offset: 1},
				{ actor: "caller 3", actionType: "highlight token", endingTimeAdjustment: 20, token: 'true', style: 'wavy underline', offset: 1},
				{ actor: "callee", actionType: "replace text", endingTimeAdjustment: 1.5, line: 3, match: 'isLoad', replacement: 'loadAmount > 0', offset: 1.2},
				{ actor: "callee", actionType: "insert text", endingTimeAdjustment: 1, line: 4, column: 16, text: 'loadAmount', offset: 2.9},
				{ actor: "callee", actionType: "insert text", endingTimeAdjustment: 1, line: 13, column: 15, text: 'loadAmount', offset: 4.1},
			],
	},

	{
		leadingBlank: 1,
		duration: 6,
		text: "Caller 3 is happy with the new API.",
		translations: {zhCN: "Caller 3对新的API感到满意。",
			zhTW: "Caller 3對新的API感到滿意。"},
		actions: [
			{ actor: 'caller 1 callout1', actionType: 'disappear', startDuration: 1.5},
			{ actor: 'caller 3 callout1', actionType: 'appear', startDuration: 0.5},
			{ actor: "caller 3", actionType: "replace text", endingTimeAdjustment: 1, line: 2, match: 'true', replacement: '999999'},
		],
	},

	{
		leadingBlank: 1,
		duration: 6,
		text: "But Caller 2 is confused about why they are involved in this change.",
		translations: {zhCN: "但Caller 2对于他们为什么要参与这个变更感到困惑。",
			zhTW: "但Caller 2對於他們為什麼要參與這個變更感到困惑。"},
		actions: [
			{ actor: 'callee callout1', actionType: 'disappear', startDuration: 1.5},
			{ actor: 'caller 2 callout1', actionType: 'appear', startDuration: 0.5},
		],
	},

	{
		leadingBlank: 1,
		duration: 6,
		text: "The boolean parameter makes the callers and callee tightly coupled.",
		translations: {zhCN: "布尔参数使调用者和被调用者紧密耦合。",
			zhTW: "布林參數使呼叫者和被呼叫者緊密耦合。"},
		actions: [
			{ actor: "loose coupling health bar", actionType: "additive value change to", duration: 1, value: 10},
			{ actor: 'caller 2 callout1', actionType: 'disappear', startDuration: 0.5},
			{ actor: 'caller 3 callout1', actionType: 'disappear', startDuration: 0.5},
				{ actor: "a1-action", actionType: "connect to", startDuration: 1, endingTimeAdjustment: 6, target: "callee-action", bentLevel: -30},
				{ actor: "a2-action", actionType: "connect to",  startDuration: 1,endingTimeAdjustment: 6, target: "callee-action", bentLevel: -30},
				{ actor: "a3-action", actionType: "connect to",  startDuration: 1,endingTimeAdjustment: 6, target: "callee-action", bentLevel: -30},
				{ actor: "a1-param", actionType: "connect to",  startDuration: 1,endingTimeAdjustment: 6, target: "callee-load", bentLevel: 30},
				{ actor: "a2-param", actionType: "connect to",  startDuration: 1,endingTimeAdjustment: 6, target: "callee-fire", bentLevel: 30},
				{ actor: "a3-param", actionType: "connect to",  startDuration: 1,endingTimeAdjustment: 6, target: "callee-load", bentLevel: 30},
		],
	},

	{
		leadingBlank: 1,
		duration: 11,
		text: "This tight coupling introduces unnecessary complexity, makes changes harder and complicates collaboration.",
		translations: {zhCN: "这种紧密耦合引入了不必要的复杂性，使更改变得更困难，也使协作变得复杂。",
			zhTW: "這種緊密耦合引入了不必要的複雜性，使更改變得更困難，也使協作變得複雜。"},
		
		actions: [
			{ actor: "mask", actionType: "appear", startDuration: 0.2},
			{ actor: 'learning from tight coupling', actionType: 'appear', startDuration: 0.5},
			{ actor: "mask", actionType: "disappear", startDuration: 1, offset: 10},
			{ actor: 'learning from tight coupling', actionType: 'disappear', startDuration: 0.5, offset: 10},

		],
	},

	{
			leadingBlank: 1,
			duration: 6,
			text: "Just let callers call the methods they want.",
		translations: {zhCN: "让调用者调用他们想要的方法就好了。",
			zhTW: "讓呼叫者呼叫他們想要的方法就好了。"},	
			actions: [
			{ actor: "callee", actionType: "replace text", endingTimeAdjustment: 1, line: 13, match: " private", replacement: ""},
			{ actor: "caller 1", actionType: "replace text", endingTimeAdjustment: 1, line: 2, replacement: "  blaster.load(1000);\n  blaster.fire();", offset: 1},
			{ actor: "caller 2", actionType: "replace text", endingTimeAdjustment: 1, line: 2, replacement: "  blaster.fire();", offset: 2.5},
			{ actor: "caller 3", actionType: "replace text", endingTimeAdjustment: 1, line: 2, replacement: "  blaster.load(999999);\n  blaster.fire();", offset: 4},
			{ actor: "callee", actionType: "highlight lines", endingTimeAdjustment: 0.5, lines: [2, 3, 4, 5, 6, 7], offset: 5.5},
			{ actor: "callee", actionType: "delete lines", endingTimeAdjustment: 1, fromLine: 2, count: 7, offset: 6},

			],
	},

	{
			leadingBlank: 1,
			duration: 5,
			text: "This reduces complexity and dependencies, resulting in lower coupling.",
		translations: {zhCN: "这将减少复杂性和依赖关系，从而降低耦合度。",
			zhTW: "這將減少複雜性和依賴關係，從而降低耦合度。"},
			actions: [
				{ actor: "loose coupling health bar", actionType: "additive value change to", duration: 1, value: 90, offset: 0},
			],
	},


	{
			leadingBlank: 1,
			duration: 7,
			text: "However, there's a pitfall that might bring more significant problems than maintaining tight coupling.",
		translations: {zhCN: "然而，这里有一个陷阱，它可能带来比维持紧密耦合更严重的问题。",
			zhTW: "然而，這裡有一個陷阱，它可能帶來比維持緊密耦合更嚴重的問題。"},
			actions: [
			],
	},

	{
			leadingBlank: 1,
			duration: 4,
			text: "After load, the Blaster must be fired.",
		translations: {zhCN: "在加载之后，必须发射Blaster。",
			zhTW: "在載入之後，必須發射Blaster。"},
			actions: [
				...loadActions,
			  { actor: "caller 3", actionType: "highlight lines", endingTimeAdjustment: 5, lines: [2], offset: 0},
			],
	},

	{
			leadingBlank: 1,
			duration: 6,
			text: "Otherwise, it will explode.",
		translations: {zhCN: "否则，它会爆炸。",
			zhTW: "否則，它會爆炸。"},
			actions: [
			  { actor: "blaster temperature", actionType: "additive value change to", duration: 4, value: 1000, offset: 0},
			  { actor: "caller 3", actionType: "replace text", endingTimeAdjustment: 1, line: 3, replacement: "  this.survey();", offset: 0},
			  { actor: "caller 3", actionType: "highlight lines", endingTimeAdjustment: 3, lines: [3], offset: 2},
			  { actor: "blaster explosion", actionType: "3d animation start", duration: 1, speed: 1, offset: 4},
			  { actor: "blaster temperature", actionType: "additive value change to", duration: 2, value: 0, offset: 4},
			],
	},

	{
			leadingBlank: 1,
			duration: 5,
			text: "Well, no worries. Our current code is doing exactly that.",
		translations: {zhCN: "好吧，别担心。我们现在的代码正是这么做的。",
			zhTW: "好吧，別擔心。我們現在的程式碼正是這麼做的。"},
			actions: [
			  { actor: "caller 3", actionType: "replace text", endingTimeAdjustment: 1, line: 3, replacement: "  blaster.fire();", offset: 0},
			  { actor: "caller 1", actionType: "highlight lines", endingTimeAdjustment: 10, lines: [2, 3], offset: 1},
			  { actor: "caller 3", actionType: "highlight lines", endingTimeAdjustment: 10, lines: [2, 3], offset: 1},
			],
	},

	{
			leadingBlank: 1,
			duration: 5,
			text: "High cohesion means the things that belong together are together.",
		translations: {zhCN: "高内聚意味着应该在一起的东西在一起。",
			zhTW: "高內聚意味著應該在一起的東西在一起。"},
			actions: [
			],
	},

	{
			leadingBlank: 1,
			duration: 6,
			text: "My code doesn't seem to have that. And it makes the cohesion low.",
		translations: {zhCN: "我的代码似乎没有做到这一点。这导致内聚性较低。",
			zhTW: "我的程式碼似乎沒有做到這一點。這導致內聚性較低。"},
			actions: [
				{ actor: "high cohesion health bar", actionType: "additive value change to", duration: 1, value: 100, offset: 0.1},
				{ actor: "high cohesion health bar", actionType: "additive value change to", duration: 2, value: 50, offset: 0.2},
			  { actor: "callee", actionType: "highlight lines", endingTimeAdjustment: 0.5, lines: [5], offset: 1},
			  { actor: "callee", actionType: "highlight lines", endingTimeAdjustment: 0.5, lines: [5], offset: 2},
			  { actor: "callee", actionType: "highlight lines", endingTimeAdjustment: 0.5, lines: [5], offset: 3},
			  { actor: "callee", actionType: "highlight lines", endingTimeAdjustment: 0.5, lines: [5], offset: 4},
			  { actor: "callee", actionType: "highlight lines", endingTimeAdjustment: 0.5, lines: [5], offset: 5},
			],
	},

	{
			leadingBlank: 1,
			duration: 5,
			text: "Say caller 1 found a bug caused by the now more powerful loaded fire.",
		translations: {zhCN: "假设Caller 1发现了一个由于现在更强大的加载射击引起的bug。",
			zhTW: "假設Caller 1發現了一個由於現在更強大的載入射擊引起的bug。"},
			actions: [
			],
	},

	{
			leadingBlank: 0,
			duration: 5,
			text: "After loading, the blaster should be re-aimed before fire,",
		translations: {zhCN: "在发射之前，应该重新瞄准已加载的Blaster，",
			zhTW: "在發射之前，應該重新瞄準已載入的Blaster，"},
			actions: [
				...loadActions,
			  { actor: "caller 1", actionType: "insert text", endingTimeAdjustment: 2, line: 2, column: 21, text: "\n  blaster.reAim();", offset: 1},
			  { actor: "caller 1", actionType: "highlight token", endingTimeAdjustment: 4, token: "reAim", offset: 1},
			  { actor: "blaster assembly", actionType: "3d rotate", endingTimeAdjustment: 2, totalRotation: [-60, 45, 30], offset: 4},
			],
	},

	{
			leadingBlank: 0,
			duration: 5,
			text: "so as not to hurt teammates.",
		translations: {zhCN: "以免伤害到队友。",
			zhTW: "以免傷害到隊友。"},
			actions: [
				...loadedFireActions,
			  { actor: "blaster assembly", actionType: "3d rotate", endingTimeAdjustment: 2, totalRotation: [0, 0, 0], offset: 4},
			],
	},

	{
			leadingBlank: 0,
			duration: 5,
			text: "Caller 1 fixed the bug.",
		translations: {zhCN: "Caller 1修复了这个bug。",
			zhTW: "Caller 1修復了這個bug。"},
			actions: [
			  { actor: "caller 1 callout2", actionType: "appear", startDuration: 1, offset: 0},
			],
	},

	{
			leadingBlank: 1,
			duration: 4,
			text: "However, caller 3 is still buggy,",
		translations: {zhCN: "然而，没人发现Caller 3仍然存在bug，",
			zhTW: "然而，沒人發現Caller 3仍然存在bug，"},
			actions: [
				...loadActions,
			  { actor: "caller 3", actionType: "highlight lines", endingTimeAdjustment: 7, lines: [2, 3], offset: 0},
			],
	},

	{
			leadingBlank: 0,
			duration: 4,
			text: "but the code start to diverse.",
		translations: {zhCN: "并且代码开始变得不同了。",
			zhTW: "並且程式碼開始變得不同了。"},
			actions: [
				...loadedFireActions,
			  { actor: "blaster more powerful fire", actionType: "3d animation start", duration: 3, speed: 2 },
			  { actor: "teammate callout", actionType: "appear", startDuration: 0.2, offset: 1},
			  { actor: "caller 3 callout2", actionType: "appear", startDuration: 0.5, offset: 3},
			],
	},

	{
			leadingBlank: 0,
			duration: 4,
			text: "Again, it shows my code is not cohesive.",
		translations: {zhCN: "再次表明，我的代码并不具有内聚性。",
			zhTW: "再次表明，我的程式碼並不具有內聚性。"},
			actions: [
				{ actor: "high cohesion health bar", actionType: "additive value change to", duration: 2, value: 10, offset: 0.2},
			],
	},

	{
			leadingBlank: 0,
			duration: 10,
			text: "Due to the lack of cohesion, my code lost important domain concepts and the future changes will become error-prone.",
		translations: {zhCN: "由于缺乏内聚性，我的代码丢失了重要的领域概念，未来的更改将变得容易出错。",
			zhTW: "由於缺乏內聚性，我的程式碼丟失了重要的領域概念，未來的更改將變得容易出錯。"},
			actions: [
				{ actor: "mask", actionType: "appear", startDuration: 0.2},
				{ actor: "learning from low cohesion", actionType: "appear", startDuration: 0.5, offset: 0.2},
				{ actor: "mask", actionType: "disappear", startDuration: 1, offset: 10},
				{ actor: "learning from low cohesion", actionType: "disappear", startDuration: 0.5, offset: 10},
			],
	},

	{
			leadingBlank: 0,
			duration: 8,
			text: "The bug would have been avoided if I kept my code more cohesive.",
		translations: {zhCN: "如果我让我的代码更具内聚性，这个bug本可以避免的。",
			zhTW: "如果我讓我的程式碼更具內聚性，這個bug本可以避免的。"},
			actions: [
			  { actor: "teammate callout", actionType: "disappear", startDuration: 0.5, offset: 0},
			  { actor: "caller 3 callout2", actionType: "disappear", startDuration: 0.5, offset: 0},
			  { actor: "caller 1 callout2", actionType: "disappear", startDuration: 0.5, offset: 0},
			  { actor: "callee", actionType: "insert text", endingTimeAdjustment: 2, line: 4, column: 10, text: "\n\n  loadedFire(loadAmount) {\n    this.load(loadAmount);\n    this.fire();\n  };", offset: 1},
			  { actor: "callee", actionType: "insert text", endingTimeAdjustment: 0.5, line: 11, column: 2, text: "private ", offset: 3.5},
				{ actor: "high cohesion health bar", actionType: "additive value change to", duration: 1, value: 30, offset: 3.5},
			  { actor: "caller 1", actionType: "delete lines", endingTimeAdjustment: 0.5, fromLine: 2, count: 3, offset: 4.5},
			  { actor: "caller 1", actionType: "insert text", endingTimeAdjustment: 0.5, line: 1, column: 13, text: "\n  blaster.loadedFire(1000);", offset: 5.1},
			  { actor: "caller 3", actionType: "delete lines", endingTimeAdjustment: 0.5, fromLine: 2, count: 3, offset: 4.5},
			  { actor: "caller 3", actionType: "insert text", endingTimeAdjustment: 0.5, line: 1, column: 13, text: "\n  blaster.loadedFire(999999);\n", offset: 5.1},
				{ actor: "high cohesion health bar", actionType: "additive value change to", duration: 2, value: 70, offset: 5.5},
			  { actor: "callee", actionType: "insert text", endingTimeAdjustment: 1, line: 7, column: 26, text: "\n    this.reAim();", offset: 5.5},
			],
	},

	{
			leadingBlank: 1,
			duration: 6,
			text: "In conclusion, avoid boolean parameters, use meaningful names,",
		translations: {zhCN: "总之，建议你也慎用使用布尔参数，使用有意义的名称，",
			zhTW: "總之，建議你也慎用使用布林參數，使用有意義的名稱，"},
			actions: [
			  { actor: "callee", actionType: "highlight token", endingTimeAdjustment: 20, token: "loadedFire", offset: 1},
			],
	},

	{
			leadingBlank: 0,
			duration: 4,
			text: "and aim for high cohesion,",
		translations: {zhCN: "并追求高内聚，",
			zhTW: "並追求高內聚，"},
			actions: [
			  { actor: "callee", actionType: "highlight lines", endingTimeAdjustment: 20, lines: [6, 7,8,9,10], offset: 1},
			],
	},

	{
			leadingBlank: 0,
			duration: 10,
			text: "and loose coupling.",
		translations: {zhCN: "以及松耦合。",
			zhTW: "以及鬆耦合。"},
			actions: [
				{ actor: "a1-action", actionType: "connect to",  startDuration: 1,endingTimeAdjustment: 20, target: "callee-loadedfire", bentLevel: -30},
				{ actor: "a2-action", actionType: "connect to",  startDuration: 1,endingTimeAdjustment: 20, target: "callee-action", bentLevel: -30},
				{ actor: "a3-action", actionType: "connect to",  startDuration: 1,endingTimeAdjustment: 20, target: "callee-loadedfire", bentLevel: -30},
			],
	},



];

const codeString = `class Blaster {
  action(isLoad) {
    if(isLoad) {
      this.load();
    }
    this.fire();
  }

  fire() {
    // ...
  }

  private load() {
    // ...
  }
}`;

const caller1 = `  // Caller 1
  blaster.action(true);
	`;

const caller2 = `  // Caller 2
  blaster.action(false);
	`;

const caller3 = `  // Caller 3
  blaster.action(true);
	`;

const learningCoupling = `## This tight coupling:

* introduces unnecessary complexity.
* makes changes harder.
* complicates collaboration.`;

const learningCohesion = `## This low cohesion:

* ignores immportant domain concepts.
* makes future changes error-prone.`;

const announceBoardStyle: CSSProperties = { 
				paddingTop: '20px',
				paddingLeft: '10px',
	fontFamily: 'Roboto, sans-serif', left: '0%', top: '40%', width: '100%', height: '40%', backgroundColor: 'rgba(0, 114, 160, 0.8)' }

export const StoryBooleanParameters: React.FC = () => {
  return (
		<Story id="StoryBooleanParameters" width={1024} height={720} subtitles={booleanParametersSutitles}  >
		<Audio src={staticFile("assets/audios/boolean1.mp3")} />
    <AbsoluteFill style={{ backgroundColor: '#000', fontFamily: 'Roboto, sans-serif', }}>
      <AnimationEffect actor="stage">
				<AbsoluteFill style={{position: 'absolute', left: '0%', top: '0%', width: '100%', height: '100%'}}>
          <ThreeDFrame>
						<directionalLight
							castShadow
							position={[10, 20, 15]}
							intensity={15}
							color={0xffffff}
						/>	
						<LightSource actor="blaster temperature" position={[0, 0, 15]} color="#ff0000" />
						<GroupInitialState rotation={[0, Math.PI * 3 / 2, 0]} position={[-5, 0, 0]} scale={0.15}>
							<Explosion actor="blaster explosion" />
						</GroupInitialState>
						<GroupInitialState rotation={[0, Math.PI, 0]} position={[-3, 3.5, 0]} scale={1}>
            <ThreeAnimationEffect actor="blaster assembly" >
								<Blaster actor="blaster"/>
								<GroupInitialState rotation={[0, 0, Math.PI * 3 / 2]} position={[0, 0, 0]} scale={1}>
									<RocketPlume actor="blaster fire" position={[-0.6, -3, 0.3]} scale={1.8}/>
									<RocketPlume actor="blaster powerful fire" position={[-0.6, -3, 0.3]} scale={4}/>
									<RocketPlume actor="blaster more powerful fire" position={[-0.6, -3, 0.3]} scale={8}/>
								</GroupInitialState>
            </ThreeAnimationEffect>
						</GroupInitialState>
          </ThreeDFrame>
      </AbsoluteFill>
			</AnimationEffect>
		<CodeHighlight actor="caller 1" codeString={caller1} style={{ left: '5%', top: '32%', width: '40%', height: '20%', }}>
			<Anchor actor="a1-action" style={{left: "50%", top: "20px"}}/>
			<Anchor actor="a1-param" style={{left: "78%", top: "35px"}}/>
		</CodeHighlight>
		<CodeHighlight actor="caller 2" codeString={caller2} style={{ left: '5%', top: '52%', width: '40%', height: '20%', }}>
			<Anchor actor="a2-action" style={{left: "50%", top: "20px"}}/>
			<Anchor actor="a2-param" style={{left: "78%", top: "35px"}}/>
		</CodeHighlight>
		<CodeHighlight actor="caller 3" codeString={caller3} style={{ left: '5%', top: '74%', width: '40%', height: '20%', }}>
			<Anchor actor="a3-action" style={{left: "50%", top: "20px"}}/>
			<Anchor actor="a3-param" style={{left: "78%", top: "35px"}}/>
		</CodeHighlight>
		<CodeHighlight actor="callee" codeString={codeString} style={{ left: '55%', top: '30%', width: '40%', height: '50%', }}>
			<Anchor actor="callee-action" style={{left: "15px", top: "25px"}}/>
			<Anchor actor="callee-load" style={{left: "60px", top: "75px"}}/>
			<Anchor actor="callee-fire" style={{left: "60px", top: "125px"}}/>
			<Anchor actor="callee-loadedfire" style={{left: "15px", top: "120px"}}/>
		</CodeHighlight>

		<CalloutCloud actor='caller 1 callout1' style={{top: '10%', left: "2%"}} tailShift={-70} tailHeightPx={100}>
			<span style={{ fontSize: '30px', margin: 0 }} > 🤔 Can we pass the load amount to action()? 💡  </span>
		</CalloutCloud>
		<CalloutCloud actor='caller 1 callout2' style={{top: '25%', left: "10%"}} tailShift={-70} tailHeightPx={20}>
			<span style={{ fontSize: '30px', margin: 0 }} > 🎉🎉🎉 Yeah! Ticket closed! 🎉🎉🎉 </span>
		</CalloutCloud>
		<CalloutCloud actor='callee callout1' style={{top: '21%', left: "20%"}} tailShift={20}>
			<span style={{ fontSize: '30px', margin: 0 }} > Absolutely! Let's update the interface. 🛠️  </span>
		</CalloutCloud>
		<CalloutCloud actor='caller 3 callout1' style={{top: '63%', left: "5%"}} tailShift={-20}>
			<span style={{ fontSize: '30px', margin: 0 }} > Woohoo! 🎉 Just what I needed! </span>
		</CalloutCloud>
		<CalloutCloud actor='caller 3 callout2' style={{top: '63%', left: "30%"}} tailShift={-20}>
			<span style={{ fontSize: '30px', margin: 0, backgroundColor: "#ffaaaa"}} >Oops. SORRY!!!!!!!! </span>
		</CalloutCloud>
		<CalloutCloud actor='caller 2 callout1' style={{top: '41%', left: "4%"}} tailShift={-40}>
			<span style={{ fontSize: '30px', margin: 0 , backgroundColor: "#ffaaaa"}} > 😠 What?! Why change it? What amount? 🚫  </span>
		</CalloutCloud>
		<CalloutCloud actor='teammate callout' style={{top: '13%', left: "calc(100% - 180px)"}} tailShift={110}>
			<span style={{ fontSize: '30px', margin: 0 , backgroundColor: "#ffaaaa"}} > Ouch! Hey!  </span>
		</CalloutCloud>

    <AnimationEffect actor="mask" style={{backgroundColor: "rgba(0, 0, 0, 0.7)"}}/>

    <Markdown actor="learning from tight coupling" style={announceBoardStyle}
			md={learningCoupling}
		 />
    <Markdown actor="learning from low cohesion" style={announceBoardStyle}
			md={learningCohesion}
		 />


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
    }}>Why Is My Boolean Parameter Bad?</span>

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
			<span style={{fontFamily: 'sans-serif', fontSize: '15px', color: "#408fdd", textAlign: 'center'}}>Loose<br/>Coupling</span>
		</AbsoluteFill>
    <AbsoluteFill style={{ left: '90%',  top: '0.5%', width: '10%', height: '10%'}}>
			<span style={{fontFamily: 'sans-serif', fontSize: '15px', color: "#ff8e00", textAlign: 'center'}}>high<br/>Cohesion</span>
		</AbsoluteFill>
		<HealthBar leftSide actor="loose coupling health bar" style={{ left: '10%', top: '2.4%', width: '40%', height: '3%'}}/>
    <AbsoluteFill style={{ left: '50%', top: '2.4%', width: '40%', height: '3%'}}>
		<HealthBar actor="high cohesion health bar" />
		</AbsoluteFill>
    <AbsoluteFill style={{ marginLeft: 'auto', marginRight: 'auto', top: '-2%', width: '12%', height: '20%'}}>
			<OddeLogo />
			<FlipCoin speed={2} interval={30} shift={0} >
			  <OddeLogoInner />
			</FlipCoin>
		</AbsoluteFill>
		</Story>
  );
};