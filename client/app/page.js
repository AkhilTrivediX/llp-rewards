'use client'

import Image from "next/image";
import { useEffect, useState } from "react";
import {AnimatePresence, motion} from "motion/react"
import EdgeyModal from "./_components/modals/edgey";
import BigBuckModal from "./_components/modals/bigbuck";
import { useRouter } from "next/navigation";
import SallysModal from "./_components/modals/sallys";
import NYMCModal from "./_components/modals/nymc";

export default function Home() {
  const router = useRouter();
  const [showingModal, setShowingModal] = useState(null);

  useEffect(()=>{
    const token = localStorage.getItem("token");
    const brand = localStorage.getItem("brand");
    if(token && brand) router.push("/"+brand+"/coupons");
  },[])

  return (
    <main className="flex h-screen relative justify-end overflow-hidden">
      
      <Image src={"/LoginBackground.png"} alt="Login Background" width={1920} height={1080} className="w-[100vw]"/>
      <div className="flex flex-col justify-center items-center max-w-[583px] w-full bg-foreground gap-4 py-5 px-8">
        <h1 className="text-5xl md:text-7xl font-playfair-sc">LLIP REWARDS</h1>
        <h3 className="text-2xl md:text-3xl font-playfair">Sign in to unlock exclusive deals</h3>
        <div className="flex flex-col gap-4">
          <button className="w-[402px]  h-[84px] p-2 bg-sallys items-center justify-center flex cursor-pointer" onClick={()=>{setShowingModal("sallys")}}>
            <Image src={"/logos/sallys.svg"} width={135} height={39} alt="Sallys Logo"/>
          </button>
          <button className="w-[402px]  h-[84px] p-2 bg-bigbuck items-center justify-center flex cursor-pointer" onClick={()=>{setShowingModal("bigbuck")}}>
            <Image src={"/logos/bigbuck.svg"} width={259} height={43} alt="Big Buck"/>
          </button>
          <button className="w-[402px]  h-[84px] p-2 bg-nymc items-center justify-center flex cursor-pointer" onClick={()=>{setShowingModal("nymc")}}>
            <Image src={"/logos/nymc.svg"} width={206} height={40} alt="NYMC"/>
          </button>
          <button className="w-[402px]  h-[84px] p-2 bg-edgey items-center justify-center flex cursor-pointer" onClick={()=>{setShowingModal("edgey")}}>
            <Image src={"/logos/edgey.svg"} width={194} height={58} alt="Edgey"/>
          </button>
        </div>
      </div>
      <AnimatePresence mode="popLayout">
        {showingModal && <motion.div initial={{opacity: 0}} animate={{opacity: 0.5}} exit={{opacity: 0}} className="absolute top-0 left-0 w-full h-full bg-black z-1" onClick={()=>{setShowingModal(null)}} key="overlay"></motion.div>}
        {showingModal=="edgey" && <EdgeyModal key="edgeyModal"/>}
        {showingModal=="bigbuck" && <BigBuckModal key="bigbuckModal"/>}
        {showingModal=="sallys" && <SallysModal key="sallysModal"/>}
        {showingModal=="nymc" && <NYMCModal key="nymcModal"/>}
      </AnimatePresence>
    </main>
  );
}
