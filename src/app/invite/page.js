'use client'

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { franklinGothic } from "../../../styles/fonts";
import { AnimatePresence, motion } from 'framer-motion';
import Alert from '@mui/material/Alert';


export default function Invite() {
    const [copied, setCopied] = useState(false);

    const handleCopyClick = () => {
        const link = "Coming Soon"; // 복사할 링크

        // 클립보드에 링크를 복사
        navigator.clipboard.writeText(link).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 1500); // 2초 후 복사 메시지 초기화
        }).catch((err) => {
            console.error('클립보드 복사 실패:', err);
        });
    };
    return (
        <AnimatePresence mode="wait">
            <motion.div className=" w-full h-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
            >
                <div className=" w-full h-full max-w-[500px] gap-[3%] relative flex flex-col justify-between items-center " >
                    {copied ? <div className="absolute top-[10px] z-[999]"><Alert severity="success">Copy Complete.</Alert></div> : ''}
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
                            INVITE
                        </p>
                    </div>
                    <div className="w-[90%] h-full flex flex-col justify-evenly">
                        <div className="w-full relative flex justify-center ">
                            <div className=" w-[25vmax] sm:w-[30vmin] aspect-[342/195] relative ">
                                <Image
                                    src="/image/md_invite_test_icon.svg"
                                    alt="md_invite_test_icon"
                                    layout="fill"
                                    objectFit="fill"
                                />
                            </div>
                        </div>
                        <div className=" w-full relative flex flex-col justify-around items-center font-normal drop-shadow-lg">
                            <div className="flex flex-col pb-[5%] ">
                                <p className=" text-white text-[8vmin] sm:text-[4vmin] font-bold">How it works</p>
                                <p className=" text-white text-[4vmin] sm:text-[2.3vmin] font-bold">Share your invitation link</p>
                                {/* <p className=" text-white text-[3vmin] sm:text-[1.7vmin]">Get a question pass for each friend who joins</p> */}
                            </div>
                            <div className="flex flex-col items-center pb-[5%]">
                                <p className=" text-white text-[4vmin] sm:text-[2.3vmin] font-bold">Your friends join MIND.D</p>
                                <p className=" text-white text-[3vmin] sm:text-[1.7vmin]">They start contributing and earning Point too</p>
                            </div>
                            {/* <p className=" text-white text-[4vmin] sm:text-[2.5vmin] font-bold">1 friend = 1 question pass</p> */}
                            {/* <p className=" text-white text-[4vmin] sm:text-[2.5vmin]">Equivalent to 2000 SAGU</p> */}
                        </div>
                        {/* <div className="w-full flex justify-center relative gap-[5%]  ">
                            <div onClick={handleCopyClick} className="w-[45%] rounded-[24px] py-3  flex flex-col justify-center items-center relative bg-[#E1FF41] active:scale-90 transition-transform duration-100">
                                <p className=" text-black text-[3.5vmin] sm:text-[1.5vmin] z-10">Invite a friend</p>
                            </div>
                            <div onClick={handleCopyClick} className="w-[45%] rounded-[24px] py-3 flex flex-col justify-center items-center relative bg-[#FF9041] active:scale-90 transition-transform duration-100">
                                <p className=" text-black text-[3.5vmin] sm:text-[1.5vmin]">Copy Link</p>
                            </div>
                        </div> */}
                        <div className="w-full h-[17%] sm:w-[90%] relative flex flex-col justify-between items-center bg-[#C8D65C] rounded-sm border-2 border-black skew-x-[-5deg]">
                            <div className="w-full h-full flex justify-center items-center skew-x-[5deg] relative">
                                <div className="absolute top-[-20%] w-[105%] flex justify-between items-center">
                                    <div className="w-[10vmin] sm:w-[5vmin] aspect-[39/39] relative rotate-2">
                                        <Image
                                            src="/image/md_invite_check.svg"
                                            alt="main logo"
                                            layout="fill"
                                            objectFit="cover"
                                        />
                                    </div>
                                    <div className="w-[9vmin] sm:w-[4vmin] aspect-[41.5/41.7] relative rotate-2 ">
                                        <Image
                                            src="/image/md_invite_info.svg"
                                            alt="main logo"
                                            layout="fill"
                                            objectFit="cover"
                                        />
                                    </div>
                                </div>
                                <div className="w-[30vmin] sm:w-[20vmin] aspect-[83/77] relative mt-[5%]">
                                    <Image
                                        src="/image/md_invite_gem_icon.svg"
                                        alt="main logo"
                                        layout="fill"
                                        objectFit="cover"
                                    />
                                </div>
                                <div className="flex flex-col w-[50%]">
                                    <div className="w-full flex flex-col justify-start items-center gap-2">
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
                                            <p className="text-white text-stroke-middle text-[5vmin]">+30,000</p>
                                        </div>
                                    </div>
                                </div>
                                <div onClick={handleCopyClick} className=" absolute bottom-[-30%] w-[75%] py-2 flex  justify-center items-center 
                                bg-[radial-gradient(ellipse,#F4D316,#552D00)] skew-x-[-5deg] border-black border-[1px]
                                active:scale-90 transition-transform duration-100">
                                    <p className=" text-[#F5D932] text-[4.5vmin] sm:text-[2.5vmin] text-stroke-middle">COPY INVITE CODE</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
