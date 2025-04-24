'use client'

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TICKETS_UPDATE_EVENT } from '../components/clientOnlyWarpper';
import Alert from '@mui/material/Alert';

export default function Tickets() {
    const [pop, setPop] = useState(false);
    const [n2o, setN2O] = useState(0);
    const [tickets, setTickets] = useState(0);


    useEffect(() => {
        // 초기 n2o 값 불러오기
        const storedN2O = localStorage.getItem("n2o");
        if (storedN2O !== null) {
            setN2O(Number(storedN2O));
        }
        // 초기 티켓 값 불러오기
        const storedTickets = localStorage.getItem("tickets");
        if (storedTickets !== null) {
            setTickets(Number(storedTickets));
        }
    }, []);

    const getTicket = (ticketNum, price) => {
        //티켓 가격보다 n2o가 작으면 팝업
        // console.log(n2o);
        if (n2o < Number(price)) {
            setPop(true);
            setTimeout(() => setPop(false), 1500); // 1.5초 후 복사 메시지 초기화
            return;
        }
        //가격이 성립하면 n2o 가격만큼 줄이고, 티켓 갯수만큼 늘어남(로컬스토리지, state 모두 업뎃)
        setN2O((prevN2O) => {
            const newN2O = prevN2O - price;
            if (newN2O < 0) {
                return prevN2O;
            }
            localStorage.setItem("n2o", newN2O);  // 로컬스토리지 업데이트
            return newN2O;  // 상태 업데이트
        });

        setTickets((prevTickets) => {
            const newTickets = prevTickets + ticketNum;
            localStorage.setItem("tickets", newTickets);  // 로컬스토리지 업데이트
            return newTickets;  // 상태 업데이트
        });

    }

    return (
        <div className="w-full flex justify-center relative gap-[5%]  ">
            <div onClick={() => getTicket(1, 500)} className="w-[45%] rounded-[24px] py-1  flex flex-col justify-center items-center relative bg-[#FF9041] active:scale-90 transition-transform duration-100">
                <p className=" text-black text-[3.5vmin] sm:text-[1.5vmin] z-10">1Ticket / 500 SAGU</p>
            </div>
            <div onClick={() => getTicket(5, 2000)} className="w-[45%] rounded-[24px] py-2 flex flex-col justify-center items-center relative bg-[#FF9041] active:scale-90 transition-transform duration-100">
                <p className=" text-black text-[3.5vmin] sm:text-[1.5vmin]">5Ticket / 2K SAGU</p>
            </div>
            {
                pop && (
                    <div className=" absolute w-[60%] top-[-550%] left-1/2 -translate-x-1/2 z-[999] "><Alert severity="error">Need more SAGU.</Alert></div>
                )
            }
            
        </div>
    );
}
