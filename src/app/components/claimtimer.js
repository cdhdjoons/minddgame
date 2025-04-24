"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpCircle } from "lucide-react";
import questionDb from "../db/questionDb";

export default function ClaimTimer() {
    const TIMER_DURATION = 21600; // 6 hours in seconds

    const [time, setTime] = useState(TIMER_DURATION); // 10초 타이머
    const [onClaim, setOnClaim] = useState(false);
    const [n2o, setN2O] = useState(0);
    const timerRef = useRef(null);
    const hasFinished = useRef(false);
    const [tickets, setTickets] = useState(0);
    const [week, setWeek] = useState(0);
    

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

    const progressWidth = onClaim ? '0%' : `${((TIMER_DURATION - time) / TIMER_DURATION) * 100}%`;

    const activeClaim = () => {
        setOnClaim(true);
    }

    return (
        <AnimatePresence mode="wait">
            <motion.div className={` h-full flex flex-col justify-evenly items-center `}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
            >
                <div className="w-full h-[20%] flex justify-center items-center relative ">
                    <div className="w-[90%] py-[5%] h-full sm:w-[90%] relative flex flex-col justify-between items-center rounded-[23px] bg-mainBoxBg">
                        <div className="w-full flex justify-center gap-[10%] items-center  ">
                            <p className="  text-[#E1FF41] text-[4.5vmin] sm:text-[2.5vmin] font-bold">Earn SAGU</p>
                            <p className=" text-[#808080] text-[4.5vmin] sm:text-[2.5vmin] font-bold ">{formatTime(time)}</p>
                        </div>
                        <p className="text-white opacity-50 text-center text-[3vmin] sm:text-[1.5vmin]">AI is currently evaluating your response.</p>
                        <div className="w-full relative flex justify-center py-[2%] items-end ">
                            <div className="w-[80%] h-[1vmin] xs:h-[0.8vmin] sm:h-[0.7vmin] rounded-3xl bg-[#787880] relative ">
                                <div className="w-full bg-[#007AFF] rounded-3xl h-full absolute left-0" style={{ width: progressWidth }}></div>
                                <div className="w-[4vmin] sm:w-[2.5vmin] aspect-[1/1] bg-white rounded-full absolute -top-[150%] xs:-top-[200%] sm:-top-[150%]" style={{ left: progressWidth }}></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full h-[45%] py-[2%] flex justify-center items-center relative">
                    <div className={` bg-[#41A4FF] h-full w-[90%] px-[3%] py-[2%] rounded-[23px] flex flex-col gap-[2%] justify-between`}>
                        <div className="w-full px-[3%] rounded-[23px] flex items-center relative ">
                            <div className=" w-full flex justify-between z-10 ">
                                <div className="flex flex-col ">
                                    <div className=" flex justify-around">
                                        <p className="w-full text-[6vmin] sm:text-[2vmin] font-normal text-black ">This Week Question</p>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <p className={` text-black text-[3vmin] sm:text-[1.2vmin] `}>Verified Knowledge.<br />Real Rewards.</p>
                                    </div>
                                </div>
                                <div className="w-[18vmin] sm:w-[6vmin] aspect-[114/129] relative  ">
                                    <Image
                                        src="/image/sagu_main_icon.png"
                                        alt="main logo"
                                        layout="fill"
                                        objectFit="cover"
                                    />
                                </div>
                            </div>
                            <div className="absolute top-0 right-[5%] w-[60%] aspect-[2/1] bg-gradient-to-b from-[#E1FF41] to-white opacity-60 rounded-[80%] blur-2xl filter"></div>
                        </div>
                        <div className="w-full h-[50%] bg-[#E1FF41] px-[3%] py-2 flex items-center relative ">
                            <p className="w-full text-black text-[3.5vmin] sm:text-[2vmin]">{questionDb[week].question}</p>
                        </div>
                        <div className="w-full h-[15%] flex justify-center relative gap-[5%]  ">
                            <Link href="/balance" className="w-[45%] rounded-[24px] py-2  flex flex-col justify-center items-center relative bg-[#E1FF41] active:scale-90 transition-transform duration-100">
                                <p className=" text-black text-[3.5vmin] sm:text-[1.5vmin] z-10">Go to Answer</p>
                            </Link>
                            <Link href="/daily" className="w-[45%] rounded-[24px] py-2 flex flex-col justify-center items-center relative bg-[#FF9041] active:scale-90 transition-transform duration-100">
                                <p className=" text-black text-[3.5vmin] sm:text-[1.5vmin]">Get Tickets</p>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className=" w-[90%] h-[15%] flex justify-between  ">
                    <div className=" py-2 bg-mainBoxBg rounded-[23px] w-[47%] flex flex-col justify-center items-center relative">
                        <div className=" w-full flex justify-center gap-[10%]">
                            <div className="w-[8vmin] sm:w-[6vmin] aspect-[98/101] relative  ">
                                <Image
                                    src="/image/sagu_game.png"
                                    alt="main logo"
                                    layout="fill"
                                    objectFit="cover"
                                />
                            </div>
                            <p className={` text-white text-[5vmin] sm:text-[3vmin] font-bold
               mt-1 `}>{n2o >= 1000000 ? `${n2o / 1000000}m` : n2o >= 1000 ? `${n2o / 1000}k` : n2o}</p>
                        </div>
                        <p className=" w-full py-[2%] mt-[4%] text-center text-white text-[3.8vmin] xs:text-[4.5vmin] sm:text-[2.3vmin]
                        active:scale-90 transition-transform duration-200">Your SAGU Point</p>
                    </div>
                    <div className=" py-2 bg-mainBoxBg rounded-[23px] w-[47%] flex flex-col justify-center items-center relative">
                        <div className=" w-full flex justify-center gap-[10%]">
                            <div className="w-[8vmin] sm:w-[6vmin] aspect-[72/74] relative  ">
                                <Image
                                    src="/image/sagu_ticket_icon.png"
                                    alt="main logo"
                                    layout="fill"
                                    objectFit="cover"
                                />
                            </div>
                            <p className={` text-white text-[5vmin] sm:text-[3vmin] font-bold `}>{tickets}</p>
                        </div>
                        <p className=" w-full py-[2%] mt-[4%] text-center text-white text-[3.8vmin] xs:text-[4.5vmin] sm:text-[2.3vmin]
                        active:scale-90 transition-transform duration-200">Your Tickets</p>
                    </div>
                </div>
                <div className="  w-[90%] h-[13%] flex flex-col gap-[5%] justify-evenly items-center relative">
                    <div className="w-full text-white text-[4vmin] sm:text-[2vmin]">Join Our community</div>
                    <a href="https://x.com/SAGE_officialX" target="_blank" rel="noopener noreferrer" className="bg-white rounded-[30px] flex justify-between items-center w-full py-[1%] px-4">
                        <div className="w-[8vmin] sm:w-[5vmin] aspect-[60/60] relative  ">
                            <Image
                                src="/image/sagu_x_icon.png"
                                alt="main logo"
                                layout="fill"
                                objectFit="cover"
                            />
                        </div>
                        <p className="text-black text-[4vmin] sm:text-[2vmin]">Join our X , earn SAGU Point</p>
                        <p className="text-black h-full opacity-60">...</p>
                    </a>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

