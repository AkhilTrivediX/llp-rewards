'use client'

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import getCoupons from "../../../actions/getCoupons";
import {motion} from 'motion/react'
import BigBuckLogo from "../../../components/logos/bigbuck";


export default function Page(){

    const router = useRouter();
    const [coupons, setCoupons] = useState([]);
    const [username, setUsername] = useState('');

    useEffect(()=>{
        const token = localStorage.getItem("token");
        const brand = localStorage.getItem("brand");
        if(!token || !brand || brand !== "bigbuck"){
            localStorage.removeItem("token");
            localStorage.removeItem("brand");
            router.push("/");
        }

        getCoupons(token).then(data=>{
            setCoupons(data.coupons)
            setUsername(data.username)
        })
        
    },[])
    return(
        <main className="flex flex-col bg-[#32343E]">
            <div className="flex items-center justify-between bg-[#9497A8]">
                <BigBuckLogo className="w-[259px] h-[87px] ml-4 fill-bigbuck"/>
                <div className="flex mr-4 gap-2">
                    <Image src="/pfp.png" width={40} height={40} alt="Profile Picture" className="rounded-full w-[40px] h-[40px]"/>
                    <div className="flex flex-col font-playfair h-full justify-between items-start">
                        <div className="text-xl font-bold leading-none text-black">{username}</div>
                        <button className="underline text-gray-600 p-0 leading-none cursor-pointer" onClick={()=>{
                            localStorage.removeItem("token");
                            localStorage.removeItem("brand");
                            router.push("/");
                        }}>Logout</button>
                    </div>
                </div>
            </div>
            <div className="relative w-full h-[450px] z-10 flex items-center justify-center">
                <Image width={1000} height={450} src="/bigBuckHero.jpg" alt="BigBuck Hero" className="w-full h-[450px] object-cover absolute -z-[1]"/>
                <div className="w-full h-full bg-bigbuck/20 absolute top-0 left-0 -z-1"/>
                <div className="flex flex-col items-center justify-center px-4 py-2 bg-black/40">
                    <div className="uppercase font-agdasima font-bold text-6xl text-white tracking-widest [word-spacing:0.3rem]">Deals in your End Zone</div>
                    <div className="uppercase font-agdasima font-bold text-2xl text-white tracking-widest [word-spacing:0.1rem]">Score Gear, Supplies, And Steals before the Buzzer.</div>
                </div>
            </div>
            <div className="flex flex-col p-4 gap-4">
                <div className="font-agdasima text-4xl font-bold px-8 pb-4 text-white">You have {coupons.length || "no"} {coupons.length === 1 ? "coupon" : "coupons"} available{coupons.length?":":"."}</div>
                <div className="flex flex-col md:grid md:grid-cols-2 gap-4">
                    {coupons.map((coupon, i)=>(<Coupon key={i} delay={i*0.1} description={coupon.description} expiry={coupon.expiryTime} style={i%3==2} highlighted={i%3==2}/>))}
                </div>
            </div>
            <footer className="text-center uppercase font-agdasima font-bold text-lg text-[#9497A8] tracking-widest [word-spacing:0.1rem]">© 2025 LLP Corp. Deals powered by BIGBUCK. All rights reserved.</footer>
        </main>
    )
}

function Coupon({description, expiry, style, highlighted, delay}){
    const [claimed, setClaimed] = useState(false);
    return(
        <motion.div initial={{y: "200px", opacity: 0}} animate={{y: "0px", opacity: 1}} transition={{bounce: 0, delay}} className={`${highlighted?"col-span-2":""} font-agdasima text-white ${style?"bg-[#24BD75]":"bg-bigbuck"} py-4 px-8 flex flex-col justify-between gap-2 relative overflow-hidden z-10`}>
            <Image src={style?"/bigbuckCoupon2.jpg":"/bigbuckCoupon1.jpg"} fill alt="BIGBUCK Coupon" className="object-cover -z-10"/>
            <div className={`absolute top-0 left-0 -z-10 w-full h-full bg-gradient-to-r ${style?"from-[#24BD75] to-[#24BD75]/20":"from-bigbuck to-bigbuck/20"}`}/>
            <div className="couponWave absolute w-full h-full top-0 left-0 -z-10 opacity-10"/>
            <div className="text-4xl font-bold">{description}</div>
            <div className="flex items-end justify-between w-full">
                <div className={`uppercase text-xl cursor-pointer relative`} onClick={()=>{setClaimed(true)}}>
                    <span>Redeem Now</span>
                    <motion.div initial={{width: "100%"}} animate={{width: claimed?"0%":"100%"}} className="h-[2px] bg-white absolute right-0 bottom-0"></motion.div>
                    <motion.div initial={{width: "0%"}} animate={{width: claimed?"100%":"0%"}} className="h-[2px] bg-white absolute left-0 top-1/2 -translate-y-1/2"></motion.div>
                </div>
                <div className="font-bold opacity-50 tracking-wider">Expires {formatDate(expiry)}</div>
            </div>
            {claimed?<motion.div initial={{opacity: 0}} animate={{opacity: 0.5}} className="absolute top-0 left-0 w-full h-full bg-black z-10"/>:null}
        </motion.div>
    )
}

function formatDate(isoString) {
  const date = new Date(isoString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}