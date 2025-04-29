"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpCircle } from "lucide-react";
import questionDb from "../db/questionDb";
import Puzzle from "./puzzle";

export default function ClaimTimer() {
    const TIMER_DURATION = 21600; // 6 hours in seconds

    const [time, setTime] = useState(TIMER_DURATION); // 10초 타이머
    const [onClaim, setOnClaim] = useState(false);
    const [n2o, setN2O] = useState(0);
    const timerRef = useRef(null);
    const hasFinished = useRef(false);
    const [tickets, setTickets] = useState(0);
    const [week, setWeek] = useState(0);
    const [teleId, setTeleId] = useState('unknown');


    useEffect(() => {
        const checkTelegramSDK = () => {
            if (typeof window !== 'undefined' && window.Telegram) {
                const user = window.Telegram.WebApp.initDataUnsafe;
                if (user) {
                    console.log('Telegram User:', user);
                    if (user.user) {
                        setTeleId(user.user.first_name);
                    } else {
                        setTeleId('--')
                        setN2O(0)
                    }
                }
            } else {
                setTimeout(checkTelegramSDK, 1000); // 1초 후 다시 확인
            }
        };

        checkTelegramSDK(); // 초기 실행
    }, []);

    useEffect(() => {
        // localStorage에서 시작 시간 불러오기
        const storedStartTime = localStorage.getItem("timerStartTime");
        const lastCompletionTime = localStorage.getItem("lastCompletionTime");//timer 만료 후 체크위한 값


        if (storedStartTime) {
            const elapsedTime = Math.floor((Date.now() - Number(storedStartTime)) / 1000);
            const remainingTime = Math.max(TIMER_DURATION - elapsedTime, 0);

            if (remainingTime > 0) {
                hasFinished.current = false;
                setTime(remainingTime);
                setOnClaim(false);
                startInterval(remainingTime);
            } else {
                // Timer has finished while away
                if (!lastCompletionTime || lastCompletionTime !== storedStartTime) {
                    // Only increment N2O if we haven't recorded this completion
                    handleN2O();
                    localStorage.setItem("lastCompletionTime", storedStartTime);
                }
                localStorage.removeItem("timerStartTime");
                setOnClaim(true);
            }
        }

        // 초기 n2o 값 불러오기
        const storedN2O = localStorage.getItem("n2o");
        if (storedN2O) {
            setN2O(Number(storedN2O));
        }

        // 초기 티켓 값 불러오기
        const storedTickets = localStorage.getItem("tickets");
        if (storedTickets !== null) {
            setTickets(Number(storedTickets));
        }
        //몇 주 차 인지 값 불러오기
        const storedWeek = localStorage.getItem("week");
        if (storedWeek !== null) {
            setWeek(Number(storedWeek));
        }


        // Cleanup interval on unmount
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, []);

    const startInterval = () => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }

        timerRef.current = setInterval(() => {
            setTime((prev) => {
                if (prev <= 1) {
                    clearInterval(timerRef.current);
                    setOnClaim(true);
                    const currentStartTime = localStorage.getItem("timerStartTime");
                    localStorage.setItem("lastCompletionTime", currentStartTime);
                    localStorage.removeItem("timerStartTime");
                    if (!hasFinished.current) {
                        handleN2O();
                        hasFinished.current = true;
                    }
                    return 0; // Return 0 instead of 10
                }
                return prev - 1;
            });
        }, 1000);
    };

    const startTimer = () => {
        setOnClaim(false);
        setTime(TIMER_DURATION);
        hasFinished.current = false;
        localStorage.setItem("timerStartTime", Date.now().toString());
        startInterval();
    };

    const handleN2O = () => {
        const currentN2O = localStorage.getItem("n2o");
        const newN2O = (Number(currentN2O) || 0) + 2000; // 🔥 기존 값에 1000 더함
        localStorage.setItem("n2o", newN2O); // 🔥 업데이트된 값 저장
        setN2O(newN2O); // 🔥 상태 업데이트

    };



    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;

        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };


    // 프로그레스 바 너비 계산 (0% ~ 100%)

    // const progressWidth = onClaim ? '0%' : `${((TIMER_DURATION - time) / TIMER_DURATION) * 100}%`;
    const progressWidth = onClaim ? '0%' : `50%`;


    const activeClaim = () => {
        setOnClaim(true);
    }

    return (
        <AnimatePresence mode="wait">
            <motion.div className={` h-full flex flex-col justify-between items-center relative  `}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
            >
                <div className="w-full h-[25%] flex justify-center items-center relative ">
                    <div className="w-[90%] h-full sm:w-[90%] relative flex flex-col justify-between items-center bg-[#FD7601] rounded-sm border-2 border-black skew-x-[-5deg]">
                        <div className="w-full h-full flex justify-center gap-[5%] items-center skew-x-[5deg]">
                            <div className="w-[12vmin] sm:w-[6vmin] aspect-[66/69.66] relative  ">
                                <Image
                                    src="/image/md_user_pic.svg"
                                    alt="main logo"
                                    layout="fill"
                                    objectFit="cover"
                                />
                            </div>
                            <div className="flex flex-col w-[70%]">
                                <p className="  text-white text-[4.5vmin] sm:text-[2.5vmin] font-bold text-stroke-mini text-shadow-sm">{teleId}</p>
                                <div className="w-full flex justify-start items-center gap-2">
                                    <div className="w-[7.2vmin] sm:w-[3vmin] aspect-[1/1] relative  ">
                                        <Image
                                            src="/image/md_user_gem.svg"
                                            alt="main logo"
                                            layout="fill"
                                            objectFit="cover"
                                        />
                                    </div>
                                    <p className="text-[#93FF25] text-stroke-mini text-[3vmin]">13000</p>
                                </div>
                            </div>
                        </div>
                        <div className="w-full flex justify-between items-center bg-[#FF953A] pr-[1%]">
                            <div className="flex flex-col w-[70%] bg-[#FFC78E] pb-[1%]">
                                <div className="flex justify-between px-[2%] w-full">
                                    <p className="  text-white text-[4vmin] sm:text-[2vmin] font-bold text-stroke-mini text-shadow-sm">Bronze</p>
                                    <p className="  text-white text-[4vmin] sm:text-[2vmin] font-bold text-stroke-mini text-shadow-sm">8/20</p>
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
                                            <div className="w-full bg-[#FD7601] border-black border-[1px] h-full absolute left-0" style={{ width: progressWidth }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className=" absolute right-[26%] w-0 h-0 border-l-[10px] border-r-[10px] border-b-[15px] rotate-90 border-l-transparent border-r-transparent border-b-[#FFC78E]"
                            ></div>
                            <div className="w-[8vmin] sm:w-[6vmin] aspect-[31/25] relative">
                                <Image
                                    src="/image/md_point_icon.svg"
                                    alt="main logo"
                                    layout="fill"
                                    objectFit="cover"
                                />
                            </div>
                            <p className="mr-[2%] text-[5vmin] sm:text-[3vmin] font-bold text-stroke-mini text-shadow-sm">{n2o > 999 ? `${n2o / 1000}k` : n2o}</p>
                        </div>
                    </div>
                </div>
                <div className="w-full h-[70%] max-h-[70%] flex justify-center items-center relative">
                    <div className={` h-full w-full flex flex-col justify-between relative`}>
                        <div className="flex justify-start gap-[47%] px-[5%] w-full bg-[#FFDE32] border-b-[4px] border-[#FFA800]">
                            <p className="  text-white text-[4vmin] sm:text-[2vmin] font-bold text-stroke-mini text-shadow-sm">STAGE 001</p>
                            <p className="  text-white text-[4vmin] sm:text-[2vmin] font-bold text-stroke-mini text-shadow-sm">HIDDEN GEM</p>
                            <div className=" absolute top-[-6%] right-0">
                                <div className="w-[5vmax] aspect-[40/57] relative">
                                    <Image
                                        src="/image/md_fire_icon.svg"
                                        alt="main logo"
                                        layout="fill"
                                        objectFit="cover"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="h-full w-full flex justify-center items-center relative "  >
                            <div className=" absolute w-full h-full">
                                <div className="w-full h-full relative">
                                    <Image
                                        src="/image/game_back.png"
                                        alt="main logo"
                                        layout="fill"
                                        objectFit="cover"
                                    />
                                </div>
                            </div>
                            <Puzzle />
                        </div>
                    </div>
                </div>
                <div className="absolute w-full bottom-[0%]">
                    <div className="w-full aspect-[432/78] relative">
                        <Image
                            src="/image/md_hammer_bg.svg"
                            alt="main logo"
                            layout="fill"
                            objectFit="cover"
                        />
                    </div>
                </div>
                <div className=" absolute bottom-0 gap-[2%] pr-1 w-full flex justify-end items-center">
                    <p className="leading-3 text-[2vmax] text-white sm:text-[1.8vmin] font-bold text-stroke-mini text-shadow-sm -skew-x-12 -rotate-3 ">
                        Your <br />Magic Pick
                    </p>
                    <div className="w-[5vmax] aspect-[45/49] relative">
                        <Image
                            src="/image/md_hammer.svg"
                            alt="main logo"
                            layout="fill"
                            objectFit="cover"
                        />
                    </div>
                    <p className="leading-3 text-[2vmax] text-white sm:text-[3vmin] font-bold text-stroke-mini text-shadow-sm -skew-x-12 -rotate-3 ">
                        {tickets}
                    </p>
                </div>

            </motion.div>
        </AnimatePresence>
    );
};

