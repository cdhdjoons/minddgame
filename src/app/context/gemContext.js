'use client'
// /app/context/GemContext.js
import { createContext, useContext, useState, useEffect } from "react";

const GemContext = createContext();

export function GemProvider({ children }) {
  const [collectedGemsByType, setCollectedGemsByType] = useState({
    ruby: 0,
    sapphire: 0,
    emerald: 0,
    diamond: 0,
  });

  const [score, setScore] = useState(0); // 초기값을 0으로 설정

  useEffect(() => {
    // 클라이언트 환경에서만 localStorage 로드
    if (typeof window !== "undefined") {
      const savedScore = parseInt(localStorage.getItem("n2o")) || 0;
      setScore(savedScore);
      console.log(savedScore);
    }
  }, []);

  useEffect(() => {
    // 클라이언트 환경에서만 localStorage 저장
    if (typeof window !== "undefined") {
      localStorage.setItem("n2o", score);
    }

  }, [score]);
  console.log(score);

  useEffect(() => {
    const storedGemsByType = localStorage.getItem("collectedGemsByType")
      ? JSON.parse(localStorage.getItem("collectedGemsByType"))
      : { ruby: 0, sapphire: 0, emerald: 0, diamond: 0 };
    setCollectedGemsByType(storedGemsByType);
  }, []);

  const updateGemCount = (type) => {
    setCollectedGemsByType((prev) => {
      const updated = { ...prev, [type]: prev[type] + 1 };
      localStorage.setItem("collectedGemsByType", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <GemContext.Provider value={{ collectedGemsByType, updateGemCount, score, setScore }}>
      {children}
    </GemContext.Provider>
  );
}

export const useGemContext = () => useContext(GemContext);