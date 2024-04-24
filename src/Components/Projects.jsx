import {motion} from "framer-motion"

const Projects = () => {
  return (
    <div className="border-b border-neutral-800 pb-20">
        <h2 className="my-20 text-center text-4xl">Projects</h2>
   
    <div className="">
    <motion.h2 
    whileInView={{opacity: 1, x: 0}}
    initial={{opacity: 0, x: -100}}
    transition={{Duration: 1.5}}
    className="my-20 text-center text-8xl">Coming soon...</motion.h2>
   
   </div>
    </div>
  )
}

export default Projects