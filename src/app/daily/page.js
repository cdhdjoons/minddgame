'use client'

import Image from "next/image";
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from "react";
import Wallet from "../components/wallet";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import Tickets from "../components/tickets";

export default function DailyTask() {
    const [clickedMenus, setClickedMenus] = useState({});
    const manifestUrl = "https://minddgame.vercel.app/tonconnect-manifest.json";

    const menu = [
        { title: 'Follow Our X', price: 30000, icon: '/image/md_daily_1.svg', link: '/', color: 'bg-[#D2EB13]' },
        { title: 'Join Telegram chat', price: 30000, icon: '/image/md_daily_2.svg', link: '/', color: 'bg-[#13EB75]' },
        { title: 'Visit our official web', price: 30000, icon: '/image/md_daily_3.svg', link: '/', color: 'bg-[#E113EB]' },
        { title: 'Visit Linktree', price: 30000, icon: '/image/md_daily_4.svg', link: '/', color: 'bg-[#EB1317]' },
        { title: 'Visit instargram', price: 30000, icon: '/image/md_daily_5.svg', link: '/', color: 'bg-[#093493]' },
    ]

    // UTC 날짜 문자열 반환 (YYYY-MM-DD 형식)
    const getUTCDay = () => {
        const now = new Date();
        return now.toISOString().split('T')[0]; // UTC 기준 YYYY-MM-DD
    };

    // localStorage에서 클릭 상태 불러오기
    useEffect(() => {
        const stored = localStorage.getItem('menuClicks');
        if (stored) {
            const parsed = JSON.parse(stored);
            const currentUTCDay = getUTCDay();

            // 오늘 날짜와 비교하여 초기화
            const updatedClicks = {};
            menu.forEach((item) => {
                if (parsed[item.title] && parsed[item.title] === currentUTCDay) {
                    updatedClicks[item.title] = true; // 오늘 클릭한 경우
                } else {
                    updatedClicks[item.title] = false; // 오늘 클릭하지 않음
                }
            });
            setClickedMenus(updatedClicks);
        } else {
            // 초기 상태 설정
            const initialClicks = {};
            menu.forEach((item) => {
                initialClicks[item.title] = false;
            });
            setClickedMenus(initialClicks);
        }
    }, []);

    // 클릭 핸들러
    const handleClick = (title, link) => {
        const currentUTCDay = getUTCDay();
        if (!clickedMenus[title]) {
            // 클릭 처리
            const updatedClicks = { ...clickedMenus, [title]: true };
            setClickedMenus(updatedClicks);

            // localStorage에 저장
            const storageData = { ...updatedClicks };
            menu.forEach((item) => {
                storageData[item.title] = updatedClicks[item.title] ? currentUTCDay : null;
            });
            localStorage.setItem('menuClicks', JSON.stringify(storageData));

            // localStorage에 포인트 저장
            const storedPoint = localStorage.getItem('n2o');
            localStorage.setItem('n2o', Number(storedPoint) + 30000);

            // 링크로 이동
            window.location.href = link;
        }
    };

    return (
        <TonConnectUIProvider manifestUrl={manifestUrl}>
            <AnimatePresence mode="wait">
                <motion.div className={` w-full h-full flex flex-col justify-between items-center overflow-scroll`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                >
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
                            MISSION
                        </p>
                    </div>
                    <p className=" text-[2vmax] sm:text-[1.3vmax] text-white text-stroke-middle flex flex-col justify-center items-center">Daily missions are updated at 00:00 UTC.<br /></p>

                    <div className=" w-full h-[85%] px-[2%] flex flex-col justify-evenly items-center overflow-hidden " >
                        {menu.map((item, index) => (
                            <a key={index} href={clickedMenus[item.title] ? '' : item.link}
                                onClick={(e) => {
                                    if (clickedMenus[item.title]) {
                                        e.preventDefault(); // 클릭 비활성화
                                    } else {
                                        handleClick(item.title, item.link);
                                    }
                                }}
                                className={`w-full h-[12%] sm:w-[90%] relative flex flex-col justify-between items-center ${clickedMenus[item.title] ? 'bg-[#585858]' : item.color} rounded-sm border-2 border-black skew-x-[-5deg]`}>
                                <div className="w-full h-full flex justify-evenly items-center skew-x-[5deg] relative">
                                    <div className="absolute top-[-20%] w-[105%] flex justify-end items-center">
                                        <div className="w-[11vmin] sm:w-[7vmin] aspect-[1/1] relative rotate-2 ">
                                            <Image
                                                src="/image/md_invite_check.svg"
                                                alt="main logo"
                                                layout="fill"
                                                objectFit="cover"
                                            />
                                        </div>
                                    </div>
                                    <div className="w-[12vmin] h-full sm:w-[20vmin] relative">
                                        <Image
                                            src={item.icon}
                                            alt="daily icon"
                                            layout="fill"
                                            objectFit="contain"
                                        />
                                    </div>
                                    <div className="flex flex-col w-[50%] h-full ">
                                        <div className="w-full flex flex-col justify-start items-center ">
                                            <p className="text-white text-stroke-middle text-[5vmin] w-full text-start">{item.title}</p>
                                            <div className="flex">
                                                <div className="w-[8vmin] sm:w-[3vmin] aspect-[31/25] relative  ">
                                                    <Image
                                                        src="/image/md_point_icon.svg"
                                                        alt="main logo"
                                                        layout="fill"
                                                        objectFit="cover"
                                                    />
                                                </div>
                                                <p className="text-white text-stroke-middle text-[5vmin]">+{item.price}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        ))}
                        {/* <div className="w-full h-[12%] sm:w-[90%] relative flex flex-col justify-between items-center bg-[#C8D65C] rounded-sm border-2 border-black skew-x-[-5deg]">
                            <div className="w-full h-full flex justify-center items-center skew-x-[5deg] relative">
                                <div className="absolute top-[-20%] w-[105%] flex justify-between items-center">
                                    <div className="w-[8vmin] sm:w-[3vmin] aspect-[39/39] relative rotate-2">
                                        <Image
                                            src="/image/md_invite_check.svg"
                                            alt="main logo"
                                            layout="fill"
                                            objectFit="cover"
                                        />
                                    </div>
                                    <div className="w-[7vmin] sm:w-[2vmin] aspect-[41.5/41.7] relative rotate-2 ">
                                        <Image
                                            src="/image/md_invite_info.svg"
                                            alt="main logo"
                                            layout="fill"
                                            objectFit="cover"
                                        />
                                    </div>
                                </div>
                                <div className="w-[18vmin] sm:w-[20vmin] aspect-[83/77] relative mt-[2%]">
                                    <Image
                                        src="/image/md_invite_gem_icon.svg"
                                        alt="main logo"
                                        layout="fill"
                                        objectFit="cover"
                                    />
                                </div>
                                <div className="flex flex-col w-[50%]">
                                    <div className="w-full flex justify-start items-center gap-2">
                                        <p className="text-white text-stroke-middle text-[4vmin]">Daily Reward</p>
                                        <div className="flex">
                                            <div className="w-[8vmin] sm:w-[3vmin] aspect-[31/25] relative  ">
                                                <Image
                                                    src="/image/md_point_icon.svg"
                                                    alt="main logo"
                                                    layout="fill"
                                                    objectFit="cover"
                                                />
                                            </div>
                                            <p className="text-white text-stroke-middle text-[4vmin]">+1,000</p>
                                        </div>
                                    </div>
                                </div>
                                <div className=" absolute bottom-[-30%] w-[70%] flex  justify-center items-center 
                                                        bg-[radial-gradient(ellipse,#F4D316,#552D00)] skew-x-[-5deg] border-black border-[1px]
                                                        active:scale-90 transition-transform duration-100">
                                    <p className=" text-[#F5D932] text-[4.5vmin] sm:text-[2.5vmin] text-stroke-middle">Get Reward</p>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </motion.div>
            </AnimatePresence>
        </TonConnectUIProvider>
    );
}
