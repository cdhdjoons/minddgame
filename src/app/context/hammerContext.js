"use client";

import { createContext, useContext, useState, useEffect } from "react";

const HammerContext = createContext();

export function HammerProvider({ children }) {
    const [hammerCount, setHammerCount] = useState(0); // 서버와 클라이언트에서 동일한 초기값


    // 클라이언트에서만 localStorage 읽기
    useEffect(() => {
        const saved = localStorage.getItem("hammerCount");
        if (saved) {
            setHammerCount(parseInt(saved, 10));
        }
    }, []);

    // 1초마다 hammerCount 증가 (최대 1000)
    useEffect(() => {
        const interval = setInterval(() => {
            setHammerCount((prev) => {
                if (prev >= 900) {
                    localStorage.setItem("hammerCount", "900"); // 최대치 저장
                    clearInterval(interval); // 최대치 도달 시 타이머 중지
                    return prev; // 더 이상 증가하지 않음
                }
                const newCount = prev + 1;
                localStorage.setItem("hammerCount", newCount.toString());
                return newCount;
            });
        }, 1000);

        // 컴포넌트 언마운트 시 interval 정리
        return () => clearInterval(interval);
    }, [hammerCount]);

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
        <HammerContext.Provider value={{ hammerCount, decreaseHammer }}>
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