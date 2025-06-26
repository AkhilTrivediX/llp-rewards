'use client'

import Image from "next/image";
import {AnimatePresence, motion} from "motion/react"

import { IoIosWarning } from "react-icons/io";
import { useCallback, useEffect, useState } from "react";
import login from "../../../actions/login";
export default function BigBuckModal(){
    const [showError, setShowError] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(()=>{
        setShowError(false);
    },[username, password])

    const handleLogin = useCallback(async (e)=>{
        e.preventDefault();
        const token = await login(username, password, "bigbuck");
        if(token){
            localStorage.setItem("token", token);
            localStorage.setItem("brand", "bigbuck");
            window.location.href = "bigbuck/coupons";
        }
        else setShowError(true);

    },[username, password])
    return(
        <motion.main initial={{y: "100%"}} animate={{y: "0%"}} exit={{y: "-200%"}} transition={{bounce: 0}}  className="-translate-x-1/2 -translate-y-1/2 z-10 bg-bigbuck w-[515px] h-[349px] py-6  px-16 flex flex-col items-center justify-center gap-16 absolute top-1/2 left-1/2">
            <div className="overflow-hidden relative  py-6 px-16 flex flex-col items-center justify-center gap-16 ">
                <motion.div initial={{y: "-200%"}} animate={{y: "0%"}} exit={{y: "-200%"}} transition={{delay: 0.1, bounce: 0}} ><Image src={"/logos/bigbuck.svg"} width={387} height={128} alt="BigBuck Logo"/></motion.div>
                <motion.div className="flex flex-col items-center w-full gap-4 text-black font-agdasima text-3xl">
                    <motion.input initial={{y: "200px"}} animate={{y: "0%"}} exit={{y: "200px"}} transition={{delay: 0, bounce: 0}} placeholder="Username" value={username} onChange={(e)=>{setUsername(e.target.value)}} className="bg-white w-full h-[35px] py-1 px-4"/>
                    <motion.input type="password" initial={{y: "200px"}} animate={{y: "0%"}} exit={{y: "200px"}} transition={{delay: 0.1, bounce: 0}} placeholder="Password" value={password} onChange={(e)=>{setPassword(e.target.value)}} className="bg-white w-full h-[35px] py-1 px-4"/>
                    <motion.button type="submit" initial={{y: "200px"}} animate={{y: "0%"}} exit={{y: "200px"}} transition={{delay: 0.2, bounce: 0}} className="bg-white/40 w-[max-content] py-1 px-8 text-white cursor-pointer" onClick={handleLogin}>Log in</motion.button>
                </motion.div>
            </div>
            <AnimatePresence>
                {showError && <motion.div initial={{y: "50px", opacity: 0}} animate={{y: "0px", opacity: 1}} exit={{y: "50px", opacity: 0}} transition={{delay: 0, bounce: 0, duration: 0.2}} className="absolute top-[105%] left-1/2 -translate-x-1/2 z-20 bg-bigbuck text-white p-2 flex items-center gap-2 w-[max-content]">
               <IoIosWarning /> Invalid Username or Password.
                </motion.div>}
            </AnimatePresence>
        </motion.main>
    )
}