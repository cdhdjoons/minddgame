'use client';

import { useState, useEffect } from 'react';
import Image from "next/image";


export default function RankBar() {
    const [currentRank, setCurrentRank] = useState('no rank');
    const [timeLeft, setTimeLeft] = useState('');
    const [progressPercentage, setProgressPercentage] = useState(0);

    const ONE_WEEK_MS = 7 * 24 * 60 * 60 * 1000; // 1주일 (밀리초)
    const UPDATE_INTERVAL = 1000 * 60 * 60; // 1시간 (밀리초)

    // 남은 시간 포맷팅 함수 (일과 시간만 표시)
    const formatTimeLeft = (ms) => {
        if (ms <= 0) return '0day 0hour';
        const days = Math.floor(ms / (1000 * 60 * 60 * 24));
        const hours = Math.floor((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        return `${days}Day ${hours}hour left`;
    };

    // 페이지 로드 시 및 타이머 업데이트
    useEffect(() => {
        const updateTimer = () => {
            const storedRank = localStorage.getItem('currentRank');
            const storedTimestamp = localStorage.getItem('rankTimestamp');
            const currentTime = new Date().getTime();

            if (storedRank && storedTimestamp) {
                const timestamp = parseInt(storedTimestamp, 10);
                const timeElapsed = currentTime - timestamp;
                const timeRemaining = ONE_WEEK_MS - timeElapsed;
                const percentage = Math.max(0, (timeRemaining / ONE_WEEK_MS) * 100);

                if (timeRemaining > 0) {
                    setTimeLeft(formatTimeLeft(timeRemaining));
                    setProgressPercentage(percentage);
                    setCurrentRank(storedRank);
                } else {
                    // 1주일 경과 시 기본값으로 리셋
                    setCurrentRank('no rank');
                    setTimeLeft('');
                    setProgressPercentage(0);
                    localStorage.setItem('currentRank', 'no rank');
                    localStorage.setItem('rankTimestamp', currentTime.toString());
                }
            } else {
                setTimeLeft('');
                setProgressPercentage(0);
            }
        };

        updateTimer(); // 초기 호출
        const interval = setInterval(updateTimer, UPDATE_INTERVAL); // 1시간마다 업데이트

        return () => clearInterval(interval); // 컴포넌트 언마운트 시 정리
    }, []);
    // console.log(timeLeft);
    return (
        <div className="flex flex-col w-[70%] bg-[#FFC78E] pb-[1%]">
            <div className="flex justify-between px-[2%] w-full">
                <p className="  text-white text-[4vmin] sm:text-[2vmin] font-bold text-stroke-mini text-shadow-sm capitalize">{currentRank}</p>
                <p className="  text-white text-[4vmin] sm:text-[2vmin] font-bold text-stroke-mini text-shadow-sm">{timeLeft}</p>
            </div>
            <div className="flex justify-start items-center px-[2%] w-full relative">
                <div className="w-[6.5vmin] sm:w-[6vmin] aspect-[25/25] relative skew-x-[5deg] z-10 ">
                    <Image
                        src="/image/md_user_tier.svg"
                        alt="main logo"
                        layout="fill"
                        objectFit="cover"
                    />
                </div>
                <div className="w-full absolute left-[7%]">
                    <div className="w-[90%] h-5 border-[#4C85EB] border-[1px] bg-[#23273C] relative rounded-sm ">
                        <div className="w-full bg-[#FD7601] border-black border-[1px] h-full absolute left-0" style={{ width: `${100 - progressPercentage}%` }}></div>
                    </div>
                </div>
            </div>
        </div>
    );
}