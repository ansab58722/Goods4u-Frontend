import React, { useRef } from 'react'
import { motion, useInView } from 'motion/react'

const Bestsellers = () => {
  const bestsellersRef = useRef(null);
  const isInView = useInView(bestsellersRef, { once: true, margin: "-100px 0px" });

  return (
    <motion.div
      ref={bestsellersRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.h2
        initial={{ y: 30, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Bestsellers
      </motion.h2>






    </motion.div>
  )
}

export default Bestsellers