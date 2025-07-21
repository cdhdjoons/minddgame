'use client'

import Image from "next/image";
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from "react";
import { TonConnectButton, useTonConnectUI } from '@tonconnect/ui-react';
import Alert from '@mui/material/Alert';

export default function Wallet() {
    const [tonConnectUI] = useTonConnectUI();
    //task list 버튼 관리
    const [disabledWalletTask, setDisabledWalletTask] = useState(false);
    //wallet address 존재여부
    const [onWallet, setOnWallet] = useState(false);
    const manifestUrl = "https://minddgame.vercel.app/tonconnect-manifest.json"; // 여기에 실제 manifest URL을 입력하세요


    //  TON Connect 인스턴스 설정
    useEffect(() => {
        const storedWalletTask = localStorage.getItem("DisabledWalletTask");

        if (storedWalletTask !== null) {
            setDisabledWalletTask(storedWalletTask === "true"); // 문자열을 Boolean으로 변환
        }

        if (!manifestUrl) {
            console.error("manifestUrl is required.");
        }
    }, []);
    // 지갑 연결 확인
    useEffect(() => {
        const unsubscribe = tonConnectUI.onStatusChange((wallet) => {
            setDisabledWalletTask(!!wallet);

            if (wallet) {
                const storedWalletTask = localStorage.getItem("DisabledWalletTask");
                if (storedWalletTask !== null) {
                    return
                }
                const nowN2O = Number(localStorage.getItem("n2o")) || 0;
                setDisabledWalletTask(true);
                setOnWallet(true);
                setTimeout(() => setOnWallet(false), 1500);
                localStorage.setItem("DisabledWalletTask", "true");
                localStorage.setItem("n2o", nowN2O + 1000);
            }
        });
        return () => unsubscribe();
    }, [tonConnectUI]);


    //connect wallet 함수
    const connectWallet = async () => {
        if (disabledWalletTask) {
            tonConnectUI.disconnect();
        } else {
            tonConnectUI.openModal();
        }

    };

    return (
        <AnimatePresence mode="wait">
            <motion.div className={`w-full h-[12%] `}
                key="ton-ui"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
            >

                {onWallet ? <div className="absolute top-[10px] z-[999]"><Alert severity="success">Connect Wallet Complete.</Alert></div> : ''}
                {disabledWalletTask ?
                    <div className=" w-full h-full sm:w-[90%] relative flex flex-col justify-between items-center bg-[#585858] rounded-sm border-2 border-black skew-x-[-5deg]">
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
                                    src='/image/md_daily_4.svg'
                                    alt="daily icon"
                                    layout="fill"
                                    objectFit="contain"
                                />
                            </div>
                            <div className="flex flex-col w-[50%] h-full ">
                                <div className="w-full flex flex-col justify-start items-center ">
                                    <p className="text-white text-stroke-middle text-[5vmin] w-full text-start">Linked Wallet</p>
                                    <div className="flex">
                                        <div className="w-[8vmin] sm:w-[3vmin] aspect-[31/25] relative  ">
                                            <Image
                                                src="/image/md_point_icon.svg"
                                                alt="main logo"
                                                layout="fill"
                                                objectFit="cover"
                                            />
                                        </div>
                                        <p className="text-white text-stroke-middle text-[5vmin]">+1000</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    <div onClick={connectWallet} className="w-full h-full sm:w-[90%] relative flex flex-col justify-between items-center bg-red-400 rounded-sm border-2 border-black skew-x-[-5deg]">
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
                                    src='/image/md_daily_4.svg'
                                    alt="daily icon"
                                    layout="fill"
                                    objectFit="contain"
                                />
                            </div>
                            <div className="flex flex-col w-[50%] h-full ">
                                <div className="w-full flex flex-col justify-start items-center ">
                                    <p className="text-white text-stroke-middle text-[5vmin] w-full text-start">Link Wallet</p>
                                    <div className="flex">
                                        <div className="w-[8vmin] sm:w-[3vmin] aspect-[31/25] relative  ">
                                            <Image
                                                src="/image/md_point_icon.svg"
                                                alt="main logo"
                                                layout="fill"
                                                objectFit="cover"
                                            />
                                        </div>
                                        <p className="text-white text-stroke-middle text-[5vmin]">+1000</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </motion.div>
        </AnimatePresence>
    );
}
