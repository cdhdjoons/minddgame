'use client'

import { useState, useEffect } from "react";
import GameCanvas from "./canvas";
import { AnimatePresence, motion } from 'framer-motion';

export default function Puzzle({ setTotalGems }) {
  const [gameState, setGameState] = useState({
    grid: [],
    gems: [],
    collectedGems: 0,
  });

  const GRID_SIZE = 5;

  // 게임 초기화 함수
  const initializeGame = () => {
    const initialGrid = Array(GRID_SIZE)
      .fill()
      .map(() =>
        Array(GRID_SIZE)
          .fill()
          .map(() => ({
            depth: 10, // 1~10 사이의 랜덤 깊이
            state: "intact",
          }))
      );

    // 보석 위치 설정 (겹치지 않도록)
    const initialGems = [];
    const occupied = new Set();

    const addGem = (row, col, size) => {
      let positions = [];
      if (size === 1) {
        positions = [`${row},${col}`];
      } else if (size === 4) { // 2x2
        if (row + 1 >= GRID_SIZE || col + 1 >= GRID_SIZE) return false;
        positions = [
          `${row},${col}`,
          `${row},${col + 1}`,
          `${row + 1},${col}`,
          `${row + 1},${col + 1}`,
        ];
      } else if (size === 3) { // 1x3
        if (row + 2 >= GRID_SIZE) return false;
        positions = [
          `${row},${col}`,
          `${row + 1},${col}`,
          `${row + 2},${col}`,
        ];
      } else if (size === 2) { // 2x1
        if (col + 1 >= GRID_SIZE) return false;
        positions = [
          `${row},${col}`,
          `${row},${col + 1}`,
        ];
      }

      if (positions.some((pos) => occupied.has(pos))) return false;
      positions.forEach((pos) => occupied.add(pos));
      initialGems.push({ row, col, size, collected: false });
      return true;
    };

    let gemsAdded = 0;
    const targetGems = Math.floor(Math.random() * (4 - 2 + 1)) + 2; // 2~4 사이 랜덤 개수
    while (gemsAdded < targetGems) {
      const row = Math.floor(Math.random() * GRID_SIZE);
      const col = Math.floor(Math.random() * GRID_SIZE);
      const sizeRandom = Math.random();
      let size;
      if (sizeRandom < 0.25) size = 1; // 1x1 (25%)
      else if (sizeRandom < 0.5) size = 4; // 2x2 (25%)
      else if (sizeRandom < 0.75) size = 3; // 1x3 (25%)
      else size = 2; // 2x1 (25%)

      if (addGem(row, col, size)) {
        gemsAdded++;
        setTotalGems(targetGems);
      }
    }

    return {
      grid: initialGrid,
      gems: initialGems,
      collectedGems: 0,
    };
  };

  // 초기화
  useEffect(() => {
    setGameState(initializeGame());
  }, []);

  // 게임 리셋 함수
  const resetGame = () => {
    setGameState(initializeGame());
  };

  // "치대" 버튼 기능
  const handleChisel = () => {
    const newGrid = [...gameState.grid.map((row) => [...row])];
    for (let row = 0; row < GRID_SIZE; row++) {
      for (let col = 0; col < GRID_SIZE; col++) {
        if (newGrid[row]?.[col]?.state === "intact") {
          newGrid[row][col].depth -= 1;
          if (newGrid[row][col].depth === 0) {
            newGrid[row][col].state = "broken";
          }
          setGameState((prev) => ({ ...prev, grid: newGrid }));
          return;
        }
      }
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div className="px-[13%] sm:px-[5%] max-w-[500px] w-full h-full flex justify-center items-center bg-no-repeat bg-cover z-[998]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }} >
        <div className="w-full aspect-[1/1] bg-transparent max-w-[800px] min-w-[200px] flex justify-center rounded-2xl " >
          <GameCanvas gameState={gameState} setGameState={setGameState} resetGame={resetGame} />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}