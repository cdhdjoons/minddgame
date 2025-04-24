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
                <motion.div className=" z-[99] w-full h-lvh max-w-[500px] max-h-[1080px] bg-black
              flex justify-center items-center overflow-hidden absolute duration-300 "
                    initial={false}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                >
                    <div className="w-[30vmax] sm:w-[25vmax] aspect-[402/119] relative">
                        <Image
                            src="/image/sagu_intro_logo.png"
                            alt="main logo"
                            layout="fill"
                            objectFit="cover"
                        />
                    </div>
                </motion.div>) : ''}
        </AnimatePresence>
    );
}
