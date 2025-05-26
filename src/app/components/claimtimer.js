"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from 'framer-motion';
import Puzzle from "./puzzle";
import { useHammer } from "../context/hammerContext";
import { useGemContext } from "../context/gemContext";
import RankBar from "./rankBar";

export default function ClaimTimer() {
    const [n2o, setN2O] = useState(0);
    const [teleId, setTeleId] = useState('unknown');
    const [totalGems, setTotalGems] = useState(0);
    const { hammerCount } = useHammer();
    const { collectedGemsByType } = useGemContext(); // GemProvider에서 collectedGemsByType 가져오기

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
        const storedN20 = localStorage.getItem('n2o');
        setN2O(Number(storedN20));
    }, []);

    return (
        <AnimatePresence mode="wait">
            <motion.div className={` h-full flex flex-col justify-between items-center relative pb-1 overflow-hidden `}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
            >
                <div className="w-full h-[17%] flex justify-center items-center relative  ">
                    <div className="w-[90%] h-full sm:w-[90%] relative flex flex-col justify-between items-center bg-[#FD7601] rounded-sm border-2 border-black skew-x-[-5deg]">
                        <div className="w-full h-full flex justify-center py-[1%] gap-[5%] items-center skew-x-[5deg]">
                            <div className="w-[10vmin] sm:w-[6vmin] aspect-[66/69.66] relative  ">
                                <Image
                                    src="/image/md_user_pic.svg"
                                    alt="main logo"
                                    layout="fill"
                                    objectFit="cover"
                                />
                            </div>
                            <div className="flex flex-col w-[70%]">
                                <p className="  text-white text-[4.5vmin] sm:text-[2.5vmin] font-bold text-stroke-mini text-shadow-sm">{teleId}</p>
                                <div className=" w-full flex">
                                    <div className="w-full flex justify-start items-center gap-2">
                                        <div className="w-[6.5vmin] sm:w-[3vmin] aspect-[1/1] relative  ">
                                            <Image
                                                src="/image/gem_small.svg"
                                                alt="main logo"
                                                layout="fill"
                                                objectFit="cover"
                                            />
                                        </div>
                                        <p className="text-[#93FF25] text-stroke-mini text-[3vmin]">{collectedGemsByType.ruby}</p>
                                    </div>
                                    <div className="w-full flex justify-start items-center gap-2">
                                        <div className="w-[6.5vmin] sm:w-[3vmin] aspect-[1/1] relative  ">
                                            <Image
                                                src="/image/gem_large.svg"
                                                alt="main logo"
                                                layout="fill"
                                                objectFit="cover"
                                            />
                                        </div>
                                        <p className="text-[#93FF25] text-stroke-mini text-[3vmin]">{collectedGemsByType.diamond}</p>
                                    </div>
                                    <div className="w-full flex justify-start items-center gap-2">
                                        <div className="w-[6.5vmin] sm:w-[3vmin] aspect-[1/1] relative  ">
                                            <Image
                                                src="/image/gem_2x1_icon.svg"
                                                alt="main logo"
                                                layout="fill"
                                                objectFit="cover"
                                            />
                                        </div>
                                        <p className="text-[#93FF25] text-stroke-mini text-[3vmin]">{collectedGemsByType.emerald}</p>
                                    </div>
                                    <div className="w-full flex justify-start items-center gap-2">
                                        <div className="w-[6.5vmin] sm:w-[3vmin] aspect-[1/1] relative  ">
                                            <Image
                                                src="/image/gem_1x3_icon.svg"
                                                alt="main logo"
                                                layout="fill"
                                                objectFit="cover"
                                            />
                                        </div>
                                        <p className="text-[#93FF25] text-stroke-mini text-[3vmin]">{collectedGemsByType.sapphire}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full flex justify-between items-center bg-[#FF953A] pr-[1%]">
                            {/* <div className="flex flex-col w-[70%] bg-[#FFC78E] pb-[1%]">
                                <div className="flex justify-between px-[2%] w-full">
                                    <p className="  text-white text-[4vmin] sm:text-[2vmin] font-bold text-stroke-mini text-shadow-sm capitalize">{currentRank}</p>
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
                            </div> */}
                            <RankBar />
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
                <div className="w-full h-[8%] py-[2%] px-[2%] flex justify-between items-center relative ">
                    <Link href="/daily" className="w-[30%] h-full bg-[#FD7601] border-[1px] border-black skew-x-[-10deg] rounded-sm flex justify-center items-center">
                        <div className=" w-full h-[85%] text-center text-white font-semibold bg-[#F49D52] flex justify-center items-center text-stroke-mini">
                            <span className="text-[5vmin] tracking-tighter skew-x-[10deg]">MISSION</span>
                        </div>
                    </Link>
                    <Link href="/leaderboard" className="w-[30%] h-full bg-[#FD7601] border-[1px] border-black skew-x-[-10deg] rounded-sm flex justify-center items-center">
                        <div className=" w-full h-[85%] text-center text-white font-semibold bg-[#F49D52] flex justify-center items-center text-stroke-mini">
                            <span className="text-[5vmin] tracking-tighter skew-x-[10deg]">RANK</span>
                        </div>
                    </Link>
                    <Link href="/balance" className="w-[30%] h-full bg-[#FD7601] border-[1px] border-black skew-x-[-10deg] rounded-sm flex justify-center items-center">
                        <div className=" w-full h-[85%] text-center text-white font-semibold bg-[#F49D52] flex justify-center items-center text-stroke-mini">
                            <span className="text-[5vmin] tracking-tighter skew-x-[10deg]">BOOST</span>
                        </div>
                    </Link>
                </div>
                <div className="w-full h-[70%] flex flex-col justify-center items-center relative ">
                    <div className={` h-full w-full flex flex-col justify-between relative`}>
                        <div className="flex justify-start gap-[47%] px-[5%] w-full bg-[#FFDE32] border-b-[4px] border-[#FFA800]">
                            <p className="  text-white text-[4vmin] sm:text-[2vmin] font-bold text-stroke-mini text-shadow-sm">STAGE 001</p>
                            <p className="  text-white text-[4vmin] sm:text-[2vmin] font-bold text-stroke-mini text-shadow-sm">HIDDEN GEM</p>
                            <div className=" absolute top-[-6%] right-0 ">
                                <div className="w-[5vmax] aspect-[40/57] relative flex justify-center items-center z-50">
                                    <Image
                                        src="/image/md_fire_icon.svg"
                                        alt="main logo"
                                        layout="fill"
                                        objectFit="cover"
                                    />
                                    <p className="text-white text-[5vmin] z-30 ">{totalGems}</p>
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
                            <Puzzle setTotalGems={setTotalGems} />
                        </div>
                    </div>
                    <div className=" w-full h-[10%] flex justify-center items-center bg-gradient-to-r from-[#FD7601] to-[#F39A4D] ">
                        <div className=" gap-[2%] w-full flex justify-evenly items-center">
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
                                {hammerCount}
                            </p>
                        </div>
                    </div>
                </div>


            </motion.div>
        </AnimatePresence>
    );
};

