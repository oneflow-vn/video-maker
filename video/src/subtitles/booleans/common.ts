import { Action } from "@/models/Subtitles";

export const fireActions: Action[] =
[
			  { actor: "blaster fire", actionType: "3d animation start", duration: 2, speed: 2 },
			  { actor: "blaster assembly", actionType: "move and return", startDuration: 0.1, endDuration: 0.4, endingTimeAdjustment: 0.6, absolutePosition: [0.5, 0, 0]},
];

export const loadedFireActions: Action[] =
[
				...fireActions,
			  { actor: "blaster", actionType: "3d animation reverse", duration: 2, speed: 4, pauseAtEnd: true, freezeBeforeStart: true },
			  { actor: "blaster temperature", actionType: "additive value change to", duration: 2, value: 0 },
			  { actor: "blaster powerful fire", actionType: "3d animation start", duration: 3, speed: 2 },
];

export const loadActions: Action[] =
[
			  { actor: "blaster", actionType: "3d animation start", duration: 1.2, speed: 3, pauseAtEnd: true, freezeBeforeStart: true },
			  { actor: "blaster temperature", actionType: "additive value change to", duration: 1.2, value: 50 },
			  { actor: "blaster assembly", actionType: "3d rotate and back", startDuration: 0.4, endDuration: 0.8, endingTimeAdjustment: 1.2,  totalRotation: [0, 0, -30]},
]