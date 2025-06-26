'use client'

import { useRouter } from "next/navigation";
import SallysLogo from "../../../components/logos/sallys";
import Image from "next/image";
import { useEffect, useState } from "react";
import getCoupons from "../../../actions/getCoupons";
import {motion} from 'motion/react'

export default function Page(){

    const router = useRouter();
    const [coupons, setCoupons] = useState([]);
    const [username, setUsername] = useState('');

    useEffect(()=>{
        const token = localStorage.getItem("token");
        const brand = localStorage.getItem("brand");
        if(!token || !brand || brand !== "sallys"){
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
        <main className="flex flex-col bg-white">
            <div className="flex items-center justify-between">
                <SallysLogo className="w-[132px] h-[81px] ml-4 fill-sallys"/>
                <div className="flex mr-4 gap-2">
                    <Image src="/pfp.png" width={40} height={40} alt="Profile Picture" className="rounded-full w-[40px] h-[40px]"/>
                    <div className="flex flex-col font-playfair h-full justify-between items-start">
                        <div className="text-xl font-bold leading-none text-black">{username}</div>
                        <button className="underline text-gray-500 p-0 leading-none cursor-pointer" onClick={()=>{
                            localStorage.removeItem("token");
                            localStorage.removeItem("brand");
                            router.push("/");
                        }}>Logout</button>
                    </div>
                </div>
            </div>
            <div className="relative w-full h-[450px] z-10">
                <Image width={1000} height={450} src="/sallysHero.jpg" alt="Sallys Hero" className="w-full h-[450px] object-cover grayscale contrast-100 brightness-60 absolute -z-[1]"/>
                <div className="w-full h-full flex flex-col items-center justify-center">
                    <Image src="/arrow.svg" width={218} height={32} alt="arrow"/>
                    <div className="text-7xl font-caveat text-white m-2">You've got Mail!</div>
                    <Image src="/arrow.svg" width={218} height={32} alt="arrow" className="rotate-180"/>
                </div>
            </div>
            <div className="flex flex-col p-4 gap-4">
                <div className="font-chivo text-4xl font-bold px-8 pb-4 text-black">You have {coupons.length || "no"} {coupons.length === 1 ? "coupon" : "coupons"} available{coupons.length?":":"."}</div>
                <div className="flex flex-col md:grid md:grid-cols-2 gap-4">
                    {coupons.map((coupon, i)=>(<Coupon key={i} delay={i*0.1} description={coupon.description} expiry={coupon.expiryTime} style={i%3==2} highlighted={i%3==2}/>))}
                </div>
            </div>
            <footer className="text-center uppercase font-chivo text-lg text-[#9497A8] ">© 2025 LLP Corp. Thanks for shopping with Sally’s! All rights reserved.</footer>
        </main>
    )
}

function Coupon({description, expiry, style, highlighted, delay}){
    const [claimed, setClaimed] = useState(false);
    return(
        <motion.div initial={{y: "200px", opacity: 0}} animate={{y: "0px", opacity: 1}} transition={{bounce: 0, delay}} className={`${highlighted?"col-span-2":""} font-chivo text-white rounded-2xl ${style?"bg-[#1446A0]":"bg-sallys"} py-4 px-8 flex flex-col justify-between gap-2 relative overflow-hidden z-10`}>
            <Image src={style?"/sallyCoupon2.jpg":"/sallyCoupon1.jpg"} fill alt="Sally's Coupon" className="object-cover -z-10"/>
            <div className={`absolute top-0 left-0 -z-10 w-full h-full bg-gradient-to-r ${style?"from-[#1446A0] to-[#1446A0]/20":"from-sallys to-sallys/20"}`}/>
            <div className="couponWave absolute w-full h-full top-0 left-0 -z-10 opacity-10"/>
            <div className="text-4xl font-bold">{description}</div>
            <div className="flex items-end justify-between w-full">
                <div className={`uppercase text-xl cursor-pointer relative`} onClick={()=>{setClaimed(true)}}>
                    <span>Redeem Now</span>
                    <motion.div initial={{width: "100%"}} animate={{width: claimed?"0%":"100%"}} className="h-[2px] bg-white absolute right-0 bottom-0"></motion.div>
                    <motion.div initial={{width: "0%"}} animate={{width: claimed?"100%":"0%"}} className="h-[2px] bg-white absolute left-0 top-1/2 -translate-y-1/2"></motion.div>
                </div>
                <div className="font-bold opacity-50">Expires {formatDate(expiry)}</div>
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