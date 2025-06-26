import Image from "next/image";
import {motion} from "motion/react"

export default function EdgeyModal(){
    return(
        <motion.main initial={{y: "100%"}} animate={{y: "0%"}} exit={{y: "-200%"}} transition={{bounce: 0}} className="w-[515px] h-[349px] py-6  px-16 flex flex-col items-center justify-center gap-8 bg-edgey absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 overflow-hidden">
            <motion.div initial={{y: "-200%"}} animate={{y: "0%"}} exit={{y: "-200%"}} transition={{delay: 0.1, bounce: 0}} ><Image src={"/logos/edgey.svg"} width={387} height={128} alt="Edgey Logo"/></motion.div>
            <motion.div className="flex flex-col items-center w-full gap-4 text-black">
                <motion.input initial={{y: "200px"}} animate={{y: "0%"}} exit={{y: "200px"}} transition={{delay: 0, bounce: 0}} placeholder="Username" className="bg-white w-full h-[35px] py-1 px-4"/>
                <motion.input type="password" initial={{y: "200px"}} animate={{y: "0%"}} exit={{y: "200px"}} transition={{delay: 0.1, bounce: 0}} placeholder="Password" className="bg-white w-full h-[35px] py-1 px-4"/>
                <motion.button type="submit" initial={{y: "200px"}} animate={{y: "0%"}} exit={{y: "200px"}} transition={{delay: 0.2, bounce: 0}} className="bg-white/40 font-bold w-[max-content] py-1 px-8">Log in</motion.button>
            </motion.div>
        </motion.main>
    )
}