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
        const storedRank = localStorage.getItem("rank");
        const storedN2O = localStorage.getItem("n2o");

        // 저장된 n2o와 현재 n2o를 비교하여 변경 여부 확인
        if (storedRank && storedN2O === n2o.toString()) {
            // 저장된 rank가 있고, n2o가 변경되지 않았다면 저장된 rank 사용
            setRank(Number(storedRank));
        } else {
            // n2o가 변경되었거나 저장된 rank가 없으면 새로 생성
            const randomRank = Math.floor(Math.random() * (98000 - 95000 + 1)) + 95000;
            setRank(randomRank);
            localStorage.setItem("rank", randomRank.toString());
        }
    }, [n2o]);

    // n2o가 변경될 때마다 rank를 localStorage에 저장
    useEffect(() => {
        if (rank !== 0) {
            // rank가 0이 아닌 경우에만 저장하여 초기값 문제 방지
            localStorage.setItem("rank", rank.toString());
        }
    }, [rank]);

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
                <div className=" w-full h-full max-w-[500px] relative flex flex-col justify-between items-center " >
                    <div className="w-full max-w-[500px] flex flex-col items-start relative ">
                        <div className="w-full aspect-[402/100] relative">
                            <Image
                                src="/image/md_title_bg.svg"
                                alt="main logo"
                                layout="fill"
                                objectFit="cover"
                            />
                        </div>
                        <p className="absolute text-[10vmin] sm:text-[5vmin] top-[5%] left-[5%] text-[#FFFEC4] text-shadow-lg text-stroke -rotate-3 tracking-tighter-3 -skew-x-12 ">
                            RANK
                        </p>
                    </div>
                    <div className="w-[90%] max-w-[500px] flex flex-col items-start relative  ">
                        <p className=" text-[5vmin] sm:text-[5vmin]  text-white text-shadow-sm text-stroke-middle leading-5 ">
                            Your rank will increase based on your
                            accumulated points.
                        </p>
                        <p className=" text-[4vmin] sm:text-[5vmin]  text-white text-shadow-none text-stroke-middle leading-4 ">
                            The higher the rank you reach,<br />
                            the more special benefits you will receive.
                        </p>
                    </div>
                    <p className=" text-[7vmin] sm:text-[6vmin] py-2 text-[#FFC11E] text-shadow-none text-stroke-middle leading-4 ">
                        {teleId}
                    </p>
                    <div className=" w-full flex flex-col items-center ">
                        <div className=" w-[90%] relative flex justify-center items-center ">
                            <div className="w-[50%] aspect-[180/113] relative rounded-full ">
                                <Image
                                    src="/image/md_rank_logo.svg"
                                    alt="main logo"
                                    layout="fill"
                                    objectFit="fill"
                                />
                            </div>
                            {/* <div className=" absolute bottom-[5%] left-[50%] -translate-x-1/2 flex gap-[5px] z-[100]">
                                <p className=" text-[#7EFFCC] text-[2.8vmin] sm:text-[1vmin]">Rank</p>
                                <p className=" text-[#7EFFCC] text-[2.8vmin] sm:text-[1vmin]">{rank}</p>
                            </div> */}
                            <div className=" absolute top-[50%] left-[50%] -translate-y-1/2 -translate-x-1/2 flex justify-between items-center gap-[5px]">
                                <p className=" text-white text-[5.5vmin] sm:text-[3.5vmin]">{rank}</p>
                            </div>
                        </div>
                    </div>
                    {/* <p className="w-full text-center text-[4vmax] sm:text-[4vmin] text-white mt-[5%] font-bold [-webkit-text-stroke:0.5px_black] ">{holderCount}k Holders</p> */}
                    <div className=" w-[90%] h-[50%] py-3 flex justify-center items-center " >
                        <div className="scroll-container w-[85%] h-[95%] flex flex-col gap-3 overflow-scroll overflow-x-hidden">
                            {rankerDb.map((ranker, index) => (
                                <div key={ranker.name} className="w-full flex justify-stretch items-center bg-[#00112D] " >
                                    <div className=" relative w-[20%] aspect-[67/60]">
                                        <Image
                                            src="/image/md_rank_num.svg"
                                            alt="rank logo"
                                            layout="fill"
                                            objectFit="cover"
                                        />
                                        <p className=" absolute top-[50%] left-[50%] -translate-y-1/2 -translate-x-1/2 text-center text-white font-bold text-[6.5vmin] sm:text-[4vmin]">{index > 8 ? `${index + 1}` : `${index + 1}`}</p>
                                    </div>
                                    <p className=" w-[45%] text-center text-white font-bold text-[3.5vmin] sm:text-[1.5vmin]">{ranker.name}</p>
                                    <div className="w-[8vmin] sm:w-[6vmin] aspect-[31/25] relative">
                                        <Image
                                            src="/image/md_point_icon.svg"
                                            alt="main logo"
                                            layout="fill"
                                            objectFit="cover"
                                        />
                                    </div>
                                    <p className=" flex-1 text-center text-white font-bold text-[4vmin] sm:text-[1.5vmin]">{ranker.score}</p>
                                </div>
                            ))}

                        </div>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
