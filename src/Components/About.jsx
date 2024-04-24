import aboutImg from "../assets/about.jpg"
import { motion } from "framer-motion"


const About = () => {
  return (
    <div className="border-b border-neutral-900 pb-4">
        <h2 className="my-20 text-center text-4xl">
            About <span className="text-neutral-500">Me</span>
        </h2>
        <div className="flex flex-wrap">
         <motion.div 
           whileInView={{opacity: 1, x: 0}}
           initial={{opacity: 0, X: -100}}
           transition={{Duration: 1.5}}
         
         className="w-full lg:w-1/2 lg:p-8">
           <div className="flex items-center justify-center">
               <img className='rounded-2xl' src={aboutImg} alt="" />
           </div>
         </motion.div>
         <div className="w-full lg:w-1/2">
             <div className="flex justify-center lg:justify-start"> 
             <motion.p 
             whileInView={{opacity: 1, x: 0}}
             initial={{opacity: 0, X: -100}}
             transition={{Duration: 1.5}}
             className="my-2 maxw-xl py-6">
             I'm new to front-end development and eager to collaborate 
             with others who are on a similar journey. 
             I believe in the power of collective learning and
            look forward to contributing to projects that help me
            grow while supporting others in their growth. 
            If you're interested in exploring new technologies 
            and solving problems together, 
             I'd love to connect and create something meaningful.
             </motion.p>
             </div>
         </div>
        </div>

    </div>
  )
}

export default About