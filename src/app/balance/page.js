'use client'

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TICKETS_UPDATE_EVENT } from '../components/clientOnlyWarpper';
import Alert from '@mui/material/Alert';
import questionDb from "../db/questionDb";
import { CheckCircle } from 'lucide-react';
import { useHammer } from "../context/hammerContext";

export default function Balance() {
  const [n2o, setN2O] = useState(0);
  const [pop, setPop] = useState(false);
  const [okPop, setOkPop] = useState(0);
  const [currentRank, setCurrentRank] = useState('no rank');
  const [isGoldDisabled, setIsGoldDisabled] = useState(false);
  const [isSilverDisabled, setIsSilverDisabled] = useState(false);
  const [isBronzeDisabled, setIsBronzeDisabled] = useState(false);
  const { updateRank } = useHammer();


  const ONE_WEEK_MS = 7 * 24 * 60 * 60 * 1000; // 1주일 (밀리초)

  // 페이지 로드 시 localStorage에서 상태 확인
  useEffect(() => {
    const storedPoint = localStorage.getItem('n2o');
    const storedRank = localStorage.getItem('currentRank');
    const storedTimestamp = localStorage.getItem('rankTimestamp');

    if (storedPoint) {
      setN2O(storedPoint);
    }

    if (storedRank && storedTimestamp) {
      const timestamp = parseInt(storedTimestamp, 10);
      const currentTime = new Date().getTime();

      // 1주일이 지났는지 확인
      if (currentTime - timestamp < ONE_WEEK_MS) {
        setCurrentRank(storedRank);
        // 랭크에 따라 버튼 비활성화 설정
        if (storedRank === 'gold') {
          setIsGoldDisabled(true);
          setIsSilverDisabled(true);
          setIsBronzeDisabled(true);
        } else if (storedRank === 'silver') {
          setIsGoldDisabled(false);
          setIsSilverDisabled(true);
          setIsBronzeDisabled(true);
        } else if (storedRank === 'bronze') {
          setIsGoldDisabled(false);
          setIsSilverDisabled(false);
          setIsBronzeDisabled(true);
        } else {
          setIsGoldDisabled(false);
          setIsSilverDisabled(false);
          setIsBronzeDisabled(false);
        }
      } else {
        // 1주일 경과 시 no rank로 리셋
        setCurrentRank('no rank');
        setIsGoldDisabled(false);
        setIsSilverDisabled(false);
        setIsBronzeDisabled(false);
        localStorage.setItem('currentRank', 'no rank');
        localStorage.setItem('rankTimestamp', currentTime.toString());
      }
    }
  }, []);

  //랭크 카드 핸들러
  const handleRankChange = (rank, price) => {
    const nowN2O = Number(localStorage.getItem("n2o")) || 0;
    const currentTime = new Date().getTime();

    if (n2o < price) {
      setPop(true);
      setTimeout(() => setPop(false), 1500); // 1.5초 후 메시지 초기화
      return
    }
    updateRank(rank);
    setN2O(nowN2O - price);
    setCurrentRank(rank);
    localStorage.setItem('currentRank', rank);
    localStorage.setItem("n2o", nowN2O - price);
    localStorage.setItem('rankTimestamp', currentTime.toString());

    // 랭크에 따라 버튼 비활성화 설정
    if (rank === 'gold') {
      setIsGoldDisabled(true);
      setIsSilverDisabled(true);
      setIsBronzeDisabled(true);
    } else if (rank === 'silver') {
      setIsGoldDisabled(false);
      setIsSilverDisabled(true);
      setIsBronzeDisabled(true);
    } else if (rank === 'bronze') {
      setIsGoldDisabled(false);
      setIsSilverDisabled(false);
      setIsBronzeDisabled(true);
    } else {
      setIsGoldDisabled(false);
      setIsSilverDisabled(false);
      setIsBronzeDisabled(false);
    }
  };

  //boost 버튼 핸들러
  const POPUP_DURATION = 1500; // 팝업 표시 시간 (ms)

  const addHammer = (point, reward) => {
    try {
      // localStorage에서 값 가져오기 및 유효성 검사
      const nowHammer = Number(localStorage.getItem("hammerCount")) || 0;
      const nowN2O = Number(localStorage.getItem("n2o")) || 0;

      // n2o 부족 체크
      if (nowN2O < point) {
        setPop(true);
        setTimeout(() => setPop(false), POPUP_DURATION);
        return;
      }

      // 상태 및 localStorage 업데이트
      setN2O(nowN2O - point);
      localStorage.setItem("hammerCount", nowHammer + reward);
      localStorage.setItem("n2o", nowN2O - point);
    } catch (error) {
      console.error("Error in addHammer:", error);
      // 필요 시 사용자에게 에러 알림
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className=" w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="w-full h-full relative flex flex-col items-center justify-between pb-[2%] " >
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
              BOOST
            </p>
          </div>
          <div className="w-full h-[90%] py-[2%] flex flex-col justify-evenly items-center relative ">
            <p className="text-white text-[4vmin] sm:text-[3vmax] w-full h-[7%] px-[3%] ">Purchasing a boost will instantly<br />recharge your pickaxe.</p>
            <div className="w-full h-[30%] flex justify-evenly">
              <div onClick={() => addHammer(30000, 500)} className="w-[47%] aspect-[148/176.5] relative active:scale-90 transition-transform duration-100 ">
                <Image
                  src="/image/md_boost_1.svg"
                  alt="main logo"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
              <div onClick={() => addHammer(50000, 1000)} className="w-[47%] aspect-[148/176.5] relative active:scale-90 transition-transform duration-100">
                <Image
                  src="/image/md_boost_2.svg"
                  alt="main logo"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
            </div>
            <div className="w-full h-[55%] flex flex-col justify-between">
              <div className=" w-full aspect-[560/132] relative active:scale-90 transition-transform duration-100">
                {isGoldDisabled ? <Image
                  src="/image/md_gold_rank_off.png"
                  alt="main logo"
                  layout="fill"
                  objectFit="cover"
                /> : <Image
                  src="/image/md_gold_rank.png"
                  alt="main logo"
                  layout="fill"
                  objectFit="cover"
                  onClick={() => handleRankChange('gold', 6000)}
                />}
              </div>
              <div className=" w-full aspect-[582/132] relative active:scale-90 transition-transform duration-100">
                {isSilverDisabled ? <Image
                  src="/image/md_silver_rank_off.png"
                  alt="main logo"
                  layout="fill"
                  objectFit="contain"
                /> : <Image
                  src="/image/md_silver_rank.png"
                  alt="main logo"
                  layout="fill"
                  objectFit="contain"
                  onClick={() => handleRankChange('silver', 3000)}
                />}
              </div>
              <div className=" w-full aspect-[593/132] relative active:scale-90 transition-transform duration-100">
                {isBronzeDisabled ? <Image
                  src="/image/md_bronze_rank_off.png"
                  alt="main logo"
                  layout="fill"
                  objectFit="contain"
                /> : <Image
                  src="/image/md_bronze_rank.png"
                  alt="main logo"
                  layout="fill"
                  objectFit="contain"
                  onClick={() => handleRankChange('bronze', 1200)}
                />}
              </div>
            </div>
          </div>
          {
            pop && (
              <div className="w-[70%] absolute top-[10px] left-1/2 -translate-x-1/2 z-[999] "><Alert severity="error">Need More Point.</Alert></div>
            )
          }
          {
            okPop === 1 ? (
              <div className="w-full h-full bg-black opacity-80 absolute text-center flex justify-center items-center">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6, ease: 'easeOut' }}
                  className="font-bold text-[4vmin] sm:text-[2vmin] flex flex-col items-center justify-center">
                  <CheckCircle className="w-10 h-10 text-blue-400" />
                  <span>The AI has approved your response.<br />SAGU will be distributed in 6 hours.<br />Thank you!🤖</span>
                  {/* Circular Countdown */}
                  <div className="relative w-16 h-16 mt-2">
                    <svg height="64" width="64">
                      <circle
                        stroke="#41A4FF"
                        fill="transparent"
                        strokeWidth={stroke}
                        r={normalizedRadius}
                        cx="32"
                        cy="32"
                        strokeDasharray={circumference}
                        strokeDashoffset={circumference - progress}
                        strokeLinecap="round"
                        style={{ transition: 'stroke-dashoffset 0.2s ease-out' }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center text-lg font-semibold">
                      {count}
                    </div>
                  </div>
                </motion.div>
              </div>
            ) : okPop === 2 ? (
              <div className="w-[70%] absolute top-[10px] left-1/2 -translate-x-1/2 z-[999] "><Alert severity="error">It's not appropriate answer. Try again.</Alert></div>
            ) : ""
          }

        </div>
      </motion.div>
    </AnimatePresence>
  );
}
