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
        const link = "https://t.me/sagu_knowledge_bot"; // 복사할 링크

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
                <div className=" w-full h-full max-w-[500px] py-[5%] gap-[3%] relative flex flex-col justify-evenly items-center " >
                    {copied ? <div className="absolute top-[10px] z-[999]"><Alert severity="success">Copy Complete.</Alert></div> : ''}
                    <div className="w-[90%] max-w-[500px] px-[3%] flex flex-col items-start relative ">
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
                    <div className="w-[90%] h-full flex flex-col justify-between rounded-[23px]">
                        <div className="w-full relative flex justify-center ">
                            <div className=" w-[25vmax] sm:w-[30vmin] aspect-[497/612] relative ">
                                <Image
                                    src="/image/sagu_invite_main.png"
                                    alt="scroll"
                                    layout="fill"
                                    objectFit="fill"
                                />
                            </div>
                        </div>
                        <div className=" w-full  relative flex flex-col justify-around items-start font-normal drop-shadow-lg">
                            <div className="flex flex-col pb-[5%] ">
                                <p className=" text-white text-[8vmin] sm:text-[4vmin] font-bold">How it works</p>
                                <p className=" text-white text-[4vmin] sm:text-[2.3vmin] font-bold">Share your invitation link</p>
                                <p className=" text-white text-[3vmin] sm:text-[1.7vmin]">Get a question pass for each friend who joins</p>
                            </div>
                            <div className="flex flex-col pb-[5%]">
                                <p className=" text-white text-[4vmin] sm:text-[2.3vmin] font-bold">Your friends join SageUnion</p>
                                <p className=" text-white text-[3vmin] sm:text-[1.7vmin]">They start contributing and earning SAGU too</p>
                            </div>
                            <p className=" text-white text-[4vmin] sm:text-[2.5vmin] font-bold">1 friend = 1 question pass</p>
                            <p className=" text-white text-[4vmin] sm:text-[2.5vmin]">Equivalent to 2000 SAGU</p>
                        </div>
                        <div className="w-full flex justify-center relative gap-[5%]  ">
                            <div onClick={handleCopyClick} className="w-[45%] rounded-[24px] py-3  flex flex-col justify-center items-center relative bg-[#E1FF41] active:scale-90 transition-transform duration-100">
                                <p className=" text-black text-[3.5vmin] sm:text-[1.5vmin] z-10">Invite a friend</p>
                            </div>
                            <div onClick={handleCopyClick} className="w-[45%] rounded-[24px] py-3 flex flex-col justify-center items-center relative bg-[#FF9041] active:scale-90 transition-transform duration-100">
                                <p className=" text-black text-[3.5vmin] sm:text-[1.5vmin]">Copy Link</p>
                            </div>
                        </div>

                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
