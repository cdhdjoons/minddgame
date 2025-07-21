'use client'

import Image from "next/image";
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from "react";
import Wallet from "../components/wallet";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import Tickets from "../components/tickets";

export default function DailyTask() {
    const [clickedMenus, setClickedMenus] = useState({});
    const [inviteFriendsCount, setInviteFriendsCount] = useState(0);
    const manifestUrl = "https://minddgame.vercel.app/tonconnect-manifest.json";

    const menu = [
        { title: 'Daily Reward', price: 100, icon: '/image/md_daily_1.svg', link: '/', color: 'bg-[#D2EB13]' },
        { title: 'RETWEET X', price: 500, icon: '/image/md_daily_2.svg', link: 'https://x.com/DiGi_MineD/status/1940768511389061568', color: 'bg-[#13EB75]' },
        { title: 'Visit X', price: 1000, icon: '/image/md_daily_3.svg', link: 'https://x.com/DiGi_MineD', color: 'bg-[#E113EB]' },
        { title: 'Invite Friends', price: 1000, icon: '/image/md_daily_4.svg', link: 'tg://resolve?start', color: 'bg-[#EB1317]' },
        { title: 'Visit Telegram', price: 1000, icon: '/image/md_daily_5.svg', link: 'https://t.me/mined_official', color: 'bg-[#093493]' },
    ]

    // UTC 날짜 문자열 반환 (YYYY-MM-DD 형식)
    const getUTCDay = () => {
        const now = new Date();
        return now.toISOString().split('T')[0]; // UTC 기준 YYYY-MM-DD
    };

    // localStorage에서 클릭 상태 불러오기
    useEffect(() => {
        const stored = localStorage.getItem('menuClicks');
        const storedInviteCount = localStorage.getItem('inviteFriendsCount');
        const currentUTCDay = getUTCDay();
        const updatedClicks = {};

        if (stored) {
            const parsed = JSON.parse(stored);

            // 오늘 날짜와 비교하여 초기화
            menu.forEach((item) => {
                if (item.title === 'Daily Reward' || item.title === 'RETWEET X') {
                    // 일일 초기화 항목: 오늘 날짜와 비교
                    updatedClicks[item.title] = parsed[item.title] === currentUTCDay;
                } else if (item.title === 'Invite Friends') {
                    // Invite Friends: 클릭 횟수에 따라 비활성화
                    updatedClicks[item.title] = Number(storedInviteCount) >= 5;
                } else {
                    // 영구 비활성화 항목: 클릭 여부만 확인
                    updatedClicks[item.title] = parsed[item.title] === true;
                }
            });
            setClickedMenus(updatedClicks);
        } else {
            // 초기 상태 설정
            menu.forEach((item) => {
                updatedClicks[item.title] = false;
            });
        }
        setClickedMenus(updatedClicks);
        setInviteFriendsCount(Number(storedInviteCount) || 0);
    }, []);

    // 클릭 핸들러
    const handleClick = (title, link, price) => {
        const currentUTCDay = getUTCDay();
        if (!clickedMenus[title]) {
            // 클릭 처리
            const updatedClicks = { ...clickedMenus, [title]: true };
            setClickedMenus(updatedClicks);

            // localStorage에 저장
            const storageData = { ...updatedClicks };

            if (title === 'Invite Friends') {
                // Invite Friends 클릭 횟수 증가
                const newCount = inviteFriendsCount + 1;
                setInviteFriendsCount(newCount);
                localStorage.setItem('inviteFriendsCount', newCount);
                if (newCount >= 5) {
                    // 5번 클릭 시 영구 비활성화
                    storageData[title] = true;
                } else {
                    // 5번 미만일 경우 클릭 가능 상태 유지
                    storageData[title] = false;
                    updatedClicks[title] = false;
                }
            } else if (title === 'Daily Reward' || title === 'RETWEET X') {
                // 일일 초기화 항목: 현재 날짜 저장
                storageData[title] = currentUTCDay;
            } else {
                // 영구 비활성화 항목: true로 설정
                storageData[title] = true;
            }

            setClickedMenus(updatedClicks);
            localStorage.setItem('menuClicks', JSON.stringify(storageData));

            // localStorage에 포인트 저장
            const storedPoint = localStorage.getItem('n2o') || 0;
            localStorage.setItem('n2o', Number(storedPoint) + price);

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

                    <div className=" w-full h-[85%] px-[2%] flex flex-col justify-evenly items-center overflow-x-hidden overflow-y-scroll  " >
                        {menu.map((item, index) => (
                            <a key={index} target="_blank" rel="noopener noreferrer" href={clickedMenus[item.title] ? item.link : ''}
                                onClick={(e) => {
                                    if (clickedMenus[item.title]) {
                                        e.preventDefault(); // 클릭 비활성화
                                    } else {
                                        handleClick(item.title, item.link, item.price);
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
                                        <div className="w-full flex flex-col justify-start items-center relative ">
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
                                                {item.title === 'Invite Friends' && (
                                                    <p className="text-white  text-stroke-middle text-[5vmin] w-full text-end">
                                                        (Count: {inviteFriendsCount}/5)
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        ))}
                        <Wallet />
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
