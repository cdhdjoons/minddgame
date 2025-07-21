'use client'

import Image from "next/image";
import ClaimTimer from "./components/claimtimer";
import Intro from "./components/intro";
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from "react";
import questionDb from "./db/questionDb";

export default function Home() {


  return (
    <div className=" w-full h-full">
      <div className=" w-full h-full max-w-[500px] relative flex flex-col " >
        <Intro />
        <AnimatePresence mode="wait">
          <motion.div className="w-full flex justify-between relative "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
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
                MINE.D
              </p>
              <div className="w-full flex justify-end items-center px-[5%] absolute bottom-0 ">
                <p className=" text-[5vmin] sm:text-[2vmin] text-[#FFFEC4] text-shadow-lg text-stroke -rotate-3 tracking-tighter-3 -skew-x-12 ">
                  PRODUCE by
                </p>
                <div className="w-[11vmin] sm:w-[6vmin] aspect-[1/1] relative">
                  <Image
                    src="/image/md_produce_icon.svg"
                    alt="main logo"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </div>
            </div>

          </motion.div>
        </AnimatePresence>
        <ClaimTimer />

      </div>
    </div>
  );
}
