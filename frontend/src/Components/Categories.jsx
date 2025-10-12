import React, { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { Link } from 'react-router-dom'
import "../css/Categories.css";
const Categories = () => {
  const cat1Ref = useRef(null);
  const cat2Ref = useRef(null);
  const cat3Ref = useRef(null);
  
  const cat1InView = useInView(cat1Ref, { once: true, margin: "50px 0px" });
  const cat2InView = useInView(cat2Ref, { once: true, margin: "50px 0px" });
  const cat3InView = useInView(cat3Ref, { once: true, margin: "50px 0px" });

  return (
    <div className='Categoriesmain'>
        <Link to="/allproducts?category=footwears" className="category-link">
          <motion.div 
            ref={cat1Ref}
            className='Cat1'
            initial={{ x: -100, opacity: 0 }}
            animate={cat1InView ? { x: 0, opacity: 1 } : { x: -100, opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            whileHover={{ scale: 1.05, y: -5 }}
          >
              <div className="cat1layer">
              <div className="cat1wrapper">
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={cat1InView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Footwears
              </motion.h1>
              </div>
              </div>
          </motion.div>
        </Link>
        <Link to="/allproducts?category=watches" className="category-link">
          <motion.div 
            ref={cat2Ref}
            className='Cat2'
            initial={{ y: 100, opacity: 0 }}
            animate={cat2InView ? { y: 0, opacity: 1 } : { y: 100, opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            whileHover={{ scale: 1.05, y: -5 }}
          >
          <div className="cat2layer">
              <div className="cat2wrapper">
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={cat2InView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Watches
              </motion.h1>
              </div>
              </div>
          </motion.div>
        </Link>
        <Link to="/allproducts?category=cloths" className="category-link">
          <motion.div 
            ref={cat3Ref}
            className='Cat3'
            initial={{ x: 100, opacity: 0 }}
            animate={cat3InView ? { x: 0, opacity: 1 } : { x: 100, opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            whileHover={{ scale: 1.05, y: -5 }}
          >
          <div className="cat3layer">
          <div className="cat3wrapper">
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={cat3InView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Cloths
              </motion.h1>
              </div>
              </div>
          </motion.div>
        </Link>

    



    </div>
  )
}

export default Categories