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
    <GemContext.Provider value={{ collectedGemsByType, updateGemCount }}>
      {children}
    </GemContext.Provider>
  );
}

export const useGemContext = () => useContext(GemContext);