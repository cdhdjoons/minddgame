"use client";

import { createContext, useContext, useState, useEffect } from "react";

const HammerContext = createContext();

export function HammerProvider({ children }) {
    const [hammerCount, setHammerCount] = useState(0); // 서버와 클라이언트에서 동일한 초기값
    const [rank, setRank] = useState("no rank"); // 기본 rank: bronze

    // rank에 따른 증가 속도
    const getIncrement = (rank) => {
        switch (rank) {
            case "gold":
                return 2;
            case "silver":
                return 1.5;
            case "bronze":
                return 1.2;
            default:
                return 1; // 잘못된 rank일 경우 기본값
        }
    };

    // rank에 따른 최대치
    const getMaxCount = (rank) => {
        switch (rank) {
            case "gold":
                return 5000;
            case "silver":
                return 3000;
            case "bronze":
                return 2000;
            default:
                return 1000; // 잘못된 rank일 경우 기본값
        }
    };

    // 클라이언트에서만 localStorage 읽기
    useEffect(() => {
        const savedCount = localStorage.getItem("hammerCount");
        const savedRank = localStorage.getItem("currentRank");

        if (savedCount) {
            const count = parseFloat(savedCount);
            const maxCount = getMaxCount(savedRank);
            setHammerCount(count > maxCount ? maxCount : count); // 최대치 초과 방지
        }
        if (savedRank && ["gold", "silver", "bronze"].includes(savedRank)) {
            setRank(savedRank);
        } else {
            localStorage.setItem("currentRank", "no rank"); // 기본값 설정
        }
    }, []);

    console.log(rank);
    // 1.5초마다 hammerCount 증가
    useEffect(() => {
        const interval = setInterval(() => {
            setHammerCount((prev) => {
                const maxCount = getMaxCount(rank);
                if (prev >= maxCount) {
                    localStorage.setItem("hammerCount", maxCount.toString());
                    clearInterval(interval);
                    return maxCount;
                }
                const increment = getIncrement(rank);
                const newCount = prev + increment;
                localStorage.setItem("hammerCount", newCount.toString());
                return newCount;
            });
        }, 1500);

        return () => clearInterval(interval);
    }, [rank]);

    // rank 변경 함수
    const updateRank = (newRank) => {
        if (["gold", "silver", "bronze", "no rank"].includes(newRank)) {
            setRank(newRank);
            // hammerCount가 새로운 rank의 maxCount를 초과하지 않도록 조정
            setHammerCount((prev) => {
                const maxCount = getMaxCount(newRank);
                const newCount = Math.min(prev, maxCount);
                localStorage.setItem("hammerCount", newCount.toString());
                return newCount;
            });
        }
    };


    // hammerCount 감소 함수
    const decreaseHammer = () => {
        setHammerCount((prev) => {
            if (prev <= 0) {
                localStorage.setItem("hammerCount", "0"); // 최소치 저장
                return 0; // 0 이하로 내려가지 않음
            }
            const newCount = prev - 1;
            localStorage.setItem("hammerCount", newCount.toString());
            return newCount;
        });
    };


    return (
        <HammerContext.Provider value={{ hammerCount, decreaseHammer, rank, updateRank }}>
            {children}
        </HammerContext.Provider>
    );
}

// 커스텀 훅
export function useHammer() {
    const context = useContext(HammerContext);
    if (!context) {
        throw new Error("useHammer must be used within a HammerProvider");
    }
    return context;
}