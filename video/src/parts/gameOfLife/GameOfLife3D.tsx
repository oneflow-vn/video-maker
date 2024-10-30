import {interpolate} from 'remotion'
import React  from 'react';
import { Cell, GameOfLifeWorld } from './gameOfLife';
import { useThree } from '@react-three/fiber';
import { CellPane } from './CellPane';
import * as THREE from 'three';
import { interpolateColors } from 'remotion';

export interface HighlightedCell {
	cell: Cell;
	color: THREE.Color;
	progress: number;
}

const gridSize = 1;
const ballRadius = gridSize / 3;
const startColor = "#00aa00"

function getColor(neighbourCount: number, progress: number) {
	if (neighbourCount === 1) {
		return interpolateColors(progress, [0, 1],  [startColor, "#00ffff"]);
	} 
 if (neighbourCount > 3) {
		return interpolateColors(progress, [0, 0.5],  [startColor, "#ff7700"]);
	}
	return startColor;
}

function getRadius(neighbourCount: number, progress: number) {
	if (neighbourCount === 1 || neighbourCount > 3) {
		return interpolate(progress, [0.7, 1],  [ballRadius, 0], {extrapolateLeft: "clamp", extrapolateRight: "clamp"});
	} 
	return ballRadius;
}

export const GameOfLife3D: React.FC<{lives: Set<Cell>, comingNext: Cell[], world: GameOfLifeWorld, highightCells: HighlightedCell[], progress: number}>  = ({lives, comingNext, world, highightCells, progress}) => {
	const { scene } = useThree();
	
	React.useEffect(() => {
		scene.fog = new THREE.Fog('skyblue', 0, 100);
	}, [scene]);

	return <group>
				<gridHelper args={[500, 500]} position={[gridSize / 2, 0, gridSize / 2]} />
				{highightCells.map(({cell, progress, color}, idx) => (
					<CellPane key={idx} cellToHighlight={cell} progress={progress} color={color} />
				))}

				{[...lives].map((life, idx) => {
					const neighbourCount = world.getAliveNeighbourCount(lives, life);
					const color = getColor(neighbourCount, progress);
					const radius = getRadius(neighbourCount, progress);
					return <mesh key={idx} position={[life.x, 0, life.y]}>
						<sphereGeometry args={[radius, 32, 32, 0, 2 * Math.PI, 0, Math.PI / 2]} />
						<meshPhysicalMaterial color={color} />
					</mesh>
				})}

				{comingNext.map((life, idx) => {
					const color = interpolateColors(progress, [0.8, 1],  ["#00ff00", startColor]);
					const radius = interpolate(progress, [0.8, 1],  [0, ballRadius], {extrapolateLeft: "clamp", extrapolateRight: "clamp"});
					return <mesh key={idx} position={[life.x, 0, life.y]}>
						<sphereGeometry args={[radius, 32, 32, 0, 2 * Math.PI, 0, Math.PI / 2]} />
						<meshPhysicalMaterial color={color} />
					</mesh>
				})}

			</group>
};
