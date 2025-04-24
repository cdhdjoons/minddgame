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
    const manifestUrl = "https://sagugame.vercel.app/tonconnect-manifest.json"; // 여기에 실제 manifest URL을 입력하세요


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
                localStorage.setItem("n2o", nowN2O + 3000);
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
            <motion.div className={` `}
                key="ton-ui"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
            >

                {onWallet ? <div className="absolute top-[10px] z-[999]"><Alert severity="success">Connect Wallet Complete.</Alert></div> : ''}
                {disabledWalletTask ?
                    <div className=" bg-taskBg2 w-[36vmax] sm:w-[20vmax] aspect-[438/101] relative active:scale-90 transition-transform duration-200">
                        <Image
                            src="/image/jet_taskconnect_off.png"
                            alt="main logo"
                            layout="fill"
                            objectFit="cover"
                        />
                    </div>
                    :
                    <div onClick={connectWallet} className=" bg-taskBg2 w-[36vmax] sm:w-[20vmax] aspect-[438/101] relative active:scale-90 transition-transform duration-200">
                        <Image
                            src="/image/jet_taskconnect.png"
                            alt="main logo"
                            layout="fill"
                            objectFit="cover"
                        />
                    </div>
                }
            </motion.div>
        </AnimatePresence>
    );
}
