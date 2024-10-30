import React, { useMemo } from "react";
import { useAnimationContext } from "../../hooks/useAnimationContext";
import { GameOfLife3D, HighlightedCell } from "./GameOfLife3D";
import { Cell, GameOfLifeWorld } from "./gameOfLife";
import * as THREE from "three";

const world = new GameOfLifeWorld();

export const GameOfLifeAnimated: React.FC<{actor: string, startLives: Cell[]}> = ({actor, startLives}) => {
  const context = useAnimationContext();
  const progress = context.getGeneralValue(actor) ?? 0;
  const round = Math.floor(progress);
  const inRoundProgress = progress - round;
  
  const survivors = useMemo(() => {
    const cache = new Map();

    const calculateSurvivors = (r: number) => {
      if (r === 0) {
        return world.getCells(startLives);
      }

      if (!cache.has(r)) {
        cache.set(r, world.survivors(calculateSurvivors(r - 1)));
      }

      return cache.get(r);
    };

    return calculateSurvivors;
  }, [startLives]);

  const currentLives = survivors(round);
  const comingNext = [...survivors(round + 1)].filter((c: Cell) => !currentLives.has(c));
  const highlightCells: HighlightedCell[] = [];

  const highlightColor = new THREE.Color(0xff00ff);
  const deadDemo = context.getGeneralValue("deadDemo") ?? 0;
  if(deadDemo > 0) {
    highlightCells.push({
      cell: {x: 2, y: 0},
      color: highlightColor,
      progress: deadDemo,
    });
  }
  
  const aliveDemo = context.getGeneralValue("aliveDemo") ?? 0;
  if(aliveDemo > 0) {
    highlightCells.push({
      cell: {x: 2, y: -1},
      color: highlightColor,
      progress: aliveDemo,
    });
  }

  const neighborsBox = (cell: Cell, progress: number) => {
    return world.neighbourCells(cell).map((c) => ({
      cell: c,
      color: new THREE.Color(0x00ffff),
      progress,
    })
    );
  };

  const neighboursDemo = context.getGeneralValue("neighboursDemo") ?? 0;
  if(neighboursDemo > 0) {
    highlightCells.push(...neighborsBox({x: 2, y: -1}, neighboursDemo));
  }

  const neighboursDemoSurvive = context.getGeneralValue("neighboursDemoSurvive") ?? 0;
  if(neighboursDemoSurvive > 0) {
    highlightCells.push(...neighborsBox({x: 1, y: -1}, neighboursDemoSurvive));
  }

  return (
    <GameOfLife3D lives={currentLives} comingNext={comingNext} world={world} highightCells={highlightCells} progress={inRoundProgress}/>
  );
};
