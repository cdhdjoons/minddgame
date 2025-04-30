'use client'

import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { TicketContext } from "./clientOnlyWarpper";
import { TICKETS_UPDATE_EVENT } from '../components/clientOnlyWarpper';
import { AnimatePresence, motion } from 'framer-motion';


export default function Footer() {
    // const { hasTickets } = useContext(TicketContext);
    const [menuColor, setMenuColor] = useState(0);
    // console.log(hasTickets);

    // const useTickets = () => {
    //     const nowTickets = localStorage.getItem("tickets");
    //     localStorage.setItem("tickets", Number(nowTickets) - 1);
    //     window.dispatchEvent(new Event(TICKETS_UPDATE_EVENT));

    // }

    return (
        <AnimatePresence mode="wait">
            <motion.div className="  w-full max-w-[500px]flex justify-center items-center fixed bottom-0 z-[999] "
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
            >
                <div className=" w-full  flex justify-evenly items-center bg-footerBg">
                    <Link href="/" >
                        <div className=" w-[15vmin] sm:w-[8vmin] aspect-[122/122] relative active:scale-90 transition-transform duration-200 ">
                            <Image
                                src="/image/md_home.png"
                                alt="meatIcon"
                                fill
                                style={{ objectFit: "cover" }}
                                priority
                            />
                        </div>
                    </Link>
                    <Link href="/daily" >
                        <div className="w-[15vmin] sm:w-[8vmin] aspect-[122/122] relative active:scale-90 transition-transform duration-200">
                            <Image
                                src="/image/md_task.png"
                                alt="meatIcon"
                                fill
                                style={{ objectFit: "cover" }}
                                priority

                            />
                        </div>
                    </Link>
                    {/* <Link href="/balance">
                        <div className="w-[15vmin] sm:w-[8vmin] aspect-[98/101] relative active:scale-90 transition-transform duration-200">
                            <Image
                                src="/image/sagu_game.png"
                                alt="meatIcon"
                                fill
                                style={{ objectFit: "cover" }}
                                priority

                            />
                        </div>
                    </Link> */}
                    <Link href="/invite">
                        <div className="w-[15vmin] sm:w-[8vmin] aspect-[122/122] relative active:scale-90 transition-transform duration-200">
                            <Image
                                src="/image/md_invite.png"
                                alt="meatIcon"
                                fill
                                style={{ objectFit: "cover" }}
                                priority

                            />
                        </div>
                    </Link>
                    <Link href="/leaderboard">
                        <div className="w-[15vmin] sm:w-[8vmin] aspect-[122/122] relative active:scale-90 transition-transform duration-200">
                            <Image
                                src="/image/md_rank.png"
                                alt="meatIcon"
                                fill
                                style={{ objectFit: "cover" }}
                                priority

                            />
                        </div>
                    </Link>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}