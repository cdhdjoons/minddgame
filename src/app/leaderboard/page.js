'use client'
import Image from "next/image";
import '../../../styles/leaderboard.css';
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from 'framer-motion';
import rankerDb from "../db/rankerDb";

export default function LeaderBoard() {

    const [n2o, setN2O] = useState(0);
    const [teleId, setTeleId] = useState('unknown');
    const [rank, setRank] = useState(0);
    //홀더 숫자 상승 
    const [holderCount, setHolderCount] = useState(125);

    useEffect(() => {
        // 초기 n2o 값 불러오기
        const storedN2O = localStorage.getItem("n2o");
        const baseDate = new Date("2025-02-19").getTime(); // 기준 날짜
        const now = Date.now(); // 현재 시간
        const twoDays = 1000 * 60 * 60 * 24 * 2; // 2일을 밀리초로
        const dayCount = Math.floor((now - baseDate) / twoDays);

        if (storedN2O !== null) {
            setN2O(Number(storedN2O));
        }
        setHolderCount(holderCount + (dayCount / 10));
        // console.log(dayCount);
    }, []);

    //랭킹 순위
    useEffect(() => {
        const randomRank = Math.floor(Math.random() * (98000 - 95000 + 1)) + 95000;

        setRank(randomRank);

    }, [n2o]);

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

    return (
        <AnimatePresence mode="wait">
            <motion.div className=" w-full h-full "
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
            >
                <div className=" w-full h-full max-w-[500px] relative flex flex-col justify-evenly items-center " >
                    <div className="w-[90%] max-w-[500px] px-[3%] flex flex-col items-start  ">
                        <div className=" w-full flex flex-col">
                            <p className="text-white text-[3.5vmin] sm:text-[2.5vmin] xs:text-[4.5vmin]">Union center</p>
                        </div>
                        <div className="w-[50vmin] sm:w-[40vmin] aspect-[306/59] relative">
                            <Image
                                src="/image/sagu_logo.png"
                                alt="main logo"
                                layout="fill"
                                objectFit="cover"
                            />
                        </div>
                    </div>
                    <div className=" flex flex-col items-center ">
                        <div className=" w-[25vmax] sm:w-[20vmax] aspect-[264/264] relative active:scale-90 transition-transform duration-200">
                            <Image
                                src="/image/pdb_rankcircle_border.png"
                                alt="main logo"
                                layout="fill"
                                objectFit="fill"
                                className="z-[90]"
                            />
                            <svg
                                className="absolute left-[50%] top-[50%] p-[4%] -translate-y-[50%] -translate-x-[50%] w-[115%] transform rotate-90" // 6시 방향부터 시작하도록 회전
                                viewBox="0 0 100 100"
                            >
                                <defs>
                                    <linearGradient id="gradientColors" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#F5C150" />
                                        <stop offset="50%" stopColor="#7E68E7" />
                                        <stop offset="100%" stopColor="#57B2FB" />
                                    </linearGradient>
                                </defs>
                                {/* 배경 원 */}
                                <circle
                                    cx="50"
                                    cy="50"
                                    r="40"
                                    stroke="black"
                                    strokeWidth="5"
                                    fill="none"
                                />
                                {/* 진행 원 */}
                                <circle
                                    cx="50"
                                    cy="50"
                                    r="40"
                                    stroke="url(#gradientColors)"
                                    strokeWidth="5"
                                    fill="none"
                                    strokeDasharray="251.2"
                                    strokeDashoffset={251.2 - (n2o / 10000) * 251.2}
                                    strokeLinecap="round"
                                    className="transition-all duration-300"
                                />
                            </svg>
                            <div className=" absolute left-[50%] top-[50%] p-[4%] -translate-y-[50%] -translate-x-[50%] w-[90%] h-[90%] rounded-full ">
                                <div className="w-full aspect-[1/1] relative rounded-full ">
                                    <Image
                                        src="/image/sagu_rank_main.png"
                                        alt="main logo"
                                        layout="fill"
                                        objectFit="fill"
                                    />
                                </div>
                            </div>
                            <p className=" absolute bottom-[-8%] left-[50%] -translate-x-1/2 text-[#7EFFCC] text-[3.5vmin] sm:text-[1.5vmin]">{teleId === undefined ? '--' : teleId}</p>
                            <div className=" absolute bottom-[5%] left-[50%] -translate-x-1/2 flex gap-[5px] z-[100]">
                                <p className=" text-[#7EFFCC] text-[2.8vmin] sm:text-[1vmin]">Rank</p>
                                <p className=" text-[#7EFFCC] text-[2.8vmin] sm:text-[1vmin]">{rank}</p>
                            </div>
                            <div className=" absolute bottom-[-20%] left-[50%] -translate-x-1/2 flex justify-between items-center gap-[5px]">
                                <p className=" text-[#7EFFCC] text-[4.8vmin] sm:text-[2vmin]">{n2o}</p>
                            </div>
                        </div>
                    </div>
                    <p className="w-full text-center text-[4vmax] sm:text-[4vmin] text-white mt-[5%] font-bold [-webkit-text-stroke:0.5px_black] ">{holderCount}k Holders</p>
                    <div className="  w-[90%] py-3 flex justify-center items-center max-h-[30vmax] sm:max-h-[500px] 
                     bg-[length:100%_100%] bg-no-repeat " >
                        <div className="scroll-container w-[85%] h-[95%] flex flex-col gap-3 overflow-scroll overflow-x-hidden">
                            {rankerDb.map((ranker, index) => (
                                <div key={ranker.name} className="w-full flex justify-stretch items-center " >
                                    <div className=" relative w-[20%] aspect-[98/101]">
                                        <Image
                                            src="/image/sagu_game.png"
                                            alt="main logo"
                                            layout="fill"
                                            objectFit="cover"
                                        />
                                    </div>
                                    <p className=" w-[45%] text-center text-white font-bold text-[3.5vmin] sm:text-[1.5vmin]">{ranker.name}</p>
                                    <p className=" flex-1 text-center text-white font-bold text-[4vmin] sm:text-[1.5vmin]">{ranker.score}</p>
                                    <p className=" flex-1 text-center text-white font-bold text-[4vmin] sm:text-[2vmin]">{index > 8 ? `0${index + 1}` : `00${index + 1}`}</p>
                                </div>
                            ))}

                        </div>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
