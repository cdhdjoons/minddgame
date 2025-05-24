'use client'
import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from 'framer-motion';


export default function Intro() {
    const [showIntro, setShowIntro] = useState(false);

    useEffect(() => {
        const hasSeenIntro = sessionStorage.getItem("introSeen");

        if (!hasSeenIntro) {
            setShowIntro(true);
            sessionStorage.setItem("introSeen", "true");
        }

        const timer = setTimeout(() => {
            setShowIntro(false);
        }, 2000); // 2초 후 실행

        return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 정리
    }, []);

    return (
        <AnimatePresence mode="wait">
            {showIntro ? (
                <motion.div className=" z-[999] w-full h-lvh max-w-[500px] max-h-[1080px] 
              flex justify-center items-center overflow-hidden absolute duration-300 "
                    initial={false}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                >
                    <div className="w-full h-full relative flex justify-center items-center">
                        <Image
                            src="/image/md_bg.png"
                            alt="main logo"
                            layout="fill"
                            objectFit="cover"
                            priority
                        />
                        <p className="text-[20vmin] sm:text-[5vmin] text-[#FFFEC4] text-shadow-lg text-stroke -rotate-3 tracking-tighter-3 -skew-x-12 ">
                            MINE.D
                        </p>
                    </div>
                </motion.div>) : ''}
        </AnimatePresence>
    );
}
