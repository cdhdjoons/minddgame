'use client'

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from 'framer-motion';
import Alert from '@mui/material/Alert';


export default function Invite() {
    const [copied, setCopied] = useState(false);
    // const [teleId, setTeleId] = useState('unknown');

    const handleCopyClick = () => {
        const link = "https://t.me/MineD_digi_bot"; // 복사할 링크

        // 클립보드에 링크를 복사
        navigator.clipboard.writeText(link).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 1500); // 2초 후 복사 메시지 초기화
        }).catch((err) => {
            console.error('클립보드 복사 실패:', err);
        });
    };

    // useEffect(() => {
    //         const checkTelegramSDK = () => {
    //             if (typeof window !== 'undefined' && window.Telegram) {
    //                 const user = window.Telegram.WebApp.initDataUnsafe;
    //                 if (user) {
    //                     console.log('Telegram User:', user.user);
    //                     if (user.user) {
    //                         setTeleId(user.user.username || '--');
    //                     } else {
    //                         setTeleId('--')
    //                     }
    //                 }
    //             } else {
    //                 setTimeout(checkTelegramSDK, 1000); // 1초 후 다시 확인
    //             }
    //         };
    
    //         checkTelegramSDK(); // 초기 실행
    //     }, []);
    return (
        <AnimatePresence mode="wait">
            <motion.div className=" w-full h-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
            >
                <div className=" w-full h-full max-w-[500px] relative flex flex-col justify-start items-center  " >
                    {copied ? <div className="absolute top-[10px] z-[999]"><Alert severity="success">Copy Complete.</Alert></div> : ''}
                    <div className="w-full max-w-[500px] flex flex-col items-start relative ">
                        <div className="w-full aspect-[402/100] relative flex justify-center items-center">
                            <Image
                                src="/image/md_title_bg.svg"
                                alt="main logo"
                                layout="fill"
                                objectFit="cover"
                            />
                        </div>
                        <p className="absolute text-[10vmin] sm:text-[5vmin] top-[5%] left-[5%] text-[#FFFEC4] text-shadow-lg text-stroke -rotate-3 tracking-tighter-3 -skew-x-12 ">
                            INVITE
                        </p>
                    </div>
                    <div className="w-[83%] h-[70%] flex flex-col justify-evenly bg-[#B95B0A] skew-x-[-5deg] ">
                        <p className="text-white text-stroke-middle text-[4.3vmin] text-center skew-x-[5deg]">Invite your friends<br />and get coins (new players only)</p>
                        <div className="w-full h-[80%] relative flex flex-col justify-between items-center  ">
                            <div className="ml-[13%] w-[38.5vmax] aspect-[554/710] relative skew-x-[5deg] ">
                                <Image
                                    src="/image/md_invite_main.png"
                                    alt="md_invite_test_icon"
                                    layout="fill"
                                    objectFit="fill"
                                />
                                <a target="_blank" rel="noopener noreferrer" href='https://t.me/MineD_digi_bot'
                                className="bg-[#CD0034] border-[1px] border-black w-[80%] absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] text-white text-stroke-middle text-[4.3vmin] text-center skew-x-[-5deg] rounded-[3px] active:scale-90 transition-transform duration-150 ease-in-out">INVITE NOW</a>
                            </div>
                        </div>
                    </div>
                    <div className=" absolute w-full h-[11%] flex justify-center items-center bottom-[8%]">
                        <div className="  w-[85%] h-full relative flex flex-col justify-between items-center bg-[#FD7601] rounded-sm border-2 border-black skew-x-[-5deg]">
                            <div className="w-full h-full flex justify-center items-center skew-x-[5deg] relative">
                                <div className="w-[23%] aspect-[83/77] relative ">
                                    <Image
                                        src="/image/md_invite_gem_icon.svg"
                                        alt="main logo"
                                        layout="fill"
                                        objectFit="cover"
                                    />
                                </div>
                                <div className="flex flex-col w-[50%]">
                                    <div className="w-full flex flex-col justify-start items-center">
                                        <p className="text-white text-stroke-middle text-[5vmin]">INVITE FRIENDS</p>
                                        <div className="flex">
                                            <div className="w-[10vmin] sm:w-[3vmin] aspect-[31/25] relative  ">
                                                <Image
                                                    src="/image/md_point_icon.svg"
                                                    alt="main logo"
                                                    layout="fill"
                                                    objectFit="cover"
                                                />
                                            </div>
                                            <p className="text-white text-stroke-middle text-[5vmin]">+5,000</p>
                                        </div>
                                    </div>
                                </div>
                                <div onClick={handleCopyClick} className=" absolute bottom-[-30%] w-[80%] flex justify-center items-center 
                                bg-[radial-gradient(ellipse,#F4D316,#552D00)] skew-x-[-5deg] border-black border-[1px]
                                active:scale-90 transition-transform duration-100">
                                    <p className=" text-[#F5D932] text-[4.2vmin] sm:text-[2.5vmin] text-stroke-middle active:scale-90 transition-transform duration-150 ease-in-out">COPY INVITE CODE</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
