import React, { useRef } from 'react'
import { motion, useInView } from 'motion/react'
import { useNavigate } from 'react-router-dom'
import "../css/VedioHero.css";
import herovedio from "../vedios/footwear.mp4"

function VedioHero() {
    const navigate = useNavigate();
    const ref = useRef(null);
    const isInView = useInView(ref, { 
        once: true, 
        margin: "-100px 0px" 
    });

    return (
        <motion.div 
            ref={ref}
            className="video-hero-container"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8 }}
        >
            <motion.div 
                className="video-section"
                initial={{ x: -100, opacity: 0 }}
                animate={isInView ? { x: 0, opacity: 1 } : { x: -100, opacity: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
            >
                <div className="video-wrapper">
                    <motion.video 
                        className="hero-video" 
                        src={herovedio} 
                        muted 
                        autoPlay 
                        loop 
                        playsInline
                        initial={{ scale: 1.1, opacity: 0 }}
                        animate={isInView ? { scale: 1, opacity: 1 } : { scale: 1.1, opacity: 0 }}
                        transition={{ duration: 1.2, delay: 0.4 }}
                        whileHover={{ scale: 1.02 }}
                    />
                    <motion.div 
                        className="video-overlay"
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ delay: 0.8, duration: 0.6 }}
                    />
                </div>
            </motion.div>

            <motion.div 
                className="content-section"
                initial={{ x: 100, opacity: 0 }}
                animate={isInView ? { x: 0, opacity: 1 } : { x: 100, opacity: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
            >
                <div className="content-wrapper">
                    <motion.div 
                        className="content-inner"
                        initial={{ y: 50, opacity: 0 }}
                        animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                    >
                        <motion.div 
                            className="badge"
                            initial={{ scale: 0, rotate: -10 }}
                            animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -10 }}
                            transition={{ 
                                type: "spring", 
                                stiffness: 200, 
                                damping: 10,
                                delay: 0.7 
                            }}
                            whileHover={{ scale: 1.05, rotate: 2 }}
                        >
                            <span className="badge-text">New Collection</span>
                        </motion.div>
                        
                        <motion.h1 
                            className="hero-title"
                            initial={{ y: 30, opacity: 0 }}
                            animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
                            transition={{ duration: 0.8, delay: 0.9 }}
                        >
                            Step Into
                            <motion.span 
                                className="title-highlight"
                                initial={{ scaleX: 0 }}
                                animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                                transition={{ duration: 0.6, delay: 1.2 }}
                                whileHover={{ scale: 1.05 }}
                            >
                                Style
                            </motion.span>
                        </motion.h1>
                        
                        <motion.p 
                            className="hero-description"
                            initial={{ y: 20, opacity: 0 }}
                            animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                            transition={{ duration: 0.6, delay: 1.1 }}
                        >
                            Discover our latest collection of premium footwear designed for comfort, 
                            crafted for confidence. Whether you're chasing dreams or catching flights, 
                            your perfect pair awaits.
                        </motion.p>
                        
                        <motion.div 
                            className="hero-stats"
                            initial={{ y: 30, opacity: 0 }}
                            animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
                            transition={{ duration: 0.8, delay: 1.3 }}
                        >
                            {[
                                { number: "500+", label: "Styles" },
                                { number: "50K+", label: "Happy Customers" },
                                { number: "4.9★", label: "Rating" }
                            ].map((stat, index) => (
                                <motion.div 
                                    key={index}
                                    className="stat-item"
                                    initial={{ scale: 0, y: 20 }}
                                    animate={isInView ? { scale: 1, y: 0 } : { scale: 0, y: 20 }}
                                    transition={{ 
                                        type: "spring",
                                        stiffness: 150,
                                        damping: 10,
                                        delay: 1.5 + index * 0.1 
                                    }}
                                    whileHover={{ scale: 1.1, y: -5 }}
                                >
                                    <span className="stat-number">{stat.number}</span>
                                    <span className="stat-label">{stat.label}</span>
                                </motion.div>
                            ))}
                        </motion.div>
                        
                        <motion.div 
                            className="cta-buttons"
                            initial={{ y: 30, opacity: 0 }}
                            animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
                            transition={{ duration: 0.8, delay: 1.7 }}
                        >
                            <motion.button 
                                className="btn-primary btn-large"
                                onClick={() => navigate("/allproducts?category=footwears")}
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                                <span>Shop Collection</span>
                                <motion.svg 
                                    className="btn-icon" 
                                    viewBox="0 0 24 24" 
                                    fill="none"
                                    whileHover={{ x: 4 }}
                                >
                                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </motion.svg>
                            </motion.button>
                            <motion.button 
                                className="btn-secondary btn-large"
                                onClick={() => navigate("/about")}
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                            >
                                <span>Watch Story</span>
                                <motion.svg 
                                    className="btn-icon" 
                                    viewBox="0 0 24 24" 
                                    fill="none"
                                    whileHover={{ x: 4, scale: 1.1 }}
                                >
                                    <path d="M8 5V19L19 12L8 5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </motion.svg>
                            </motion.button>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.div>
        </motion.div>
    )
}

export default VedioHero
