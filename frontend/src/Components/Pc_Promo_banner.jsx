import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { useNavigate } from "react-router-dom";
import "../css/Pc_Promo_banner.css";
import bannerImage from "../projectImg/bannerh.webp";

const Pc_Promo_banner = () => {
  const navigate = useNavigate();
  const bannerRef = useRef(null);
  const imageRef = useRef(null);
  const isInView = useInView(bannerRef, { once: true, margin: "-100px 0px" });
  const isImageInView = useInView(imageRef, { once: true, margin: "-50px 0px" });

  return (
    <motion.div 
      ref={bannerRef}
      className="pc-featured-product-banner"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="pc-featured-content">
        <motion.div 
          className="pc-featured-text"
          initial={{ x: -100, opacity: 0 }}
          animate={isInView ? { x: 0, opacity: 1 } : { x: -100, opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.div 
            className="pc-featured-badge"
            initial={{ scale: 0, rotate: -10 }}
            animate={isInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -10 }}
            transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
          >
            🔥 NEW COLLECTION
          </motion.div>
          
          <motion.h2
            initial={{ y: 30, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            Dress in{" "}
            <motion.span 
              className="pc-title-highlight"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              Excellence
            </motion.span>
          </motion.h2>
          
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            Discover our latest collection of premium clothing that combines comfort, 
            style, and quality. From casual outfits to elegant party wear, find the 
            perfect pieces that match your lifestyle and express your unique personality.
          </motion.p>
          
          <motion.div 
            className="pc-featured-button-container"
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            <motion.button
              className="pc-featured-button"
              onClick={() => navigate("/allproducts?category=cloths")}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <span className="pc-button-text">Shop Clothing</span>
              <motion.span 
                className="pc-button-icon"
                whileHover={{ x: 4 }}
              >
                →
              </motion.span>
            </motion.button>
            <motion.button
              className="pc-featured-button-secondary"
              onClick={() => navigate("/about")}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <span className="pc-button-text">Watch Story</span>
            </motion.button>
          </motion.div>
          
          <motion.div 
            className="pc-featured-stats"
            initial={{ y: 30, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            {[
              { number: "500+", label: "Happy Customers" },
              { number: "50K+", label: "Rating" },
              { number: "4.9★", label: "Styles" }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                className="pc-stat-item"
                initial={{ scale: 0, y: 20 }}
                animate={isInView ? { scale: 1, y: 0 } : { scale: 0, y: 20 }}
                transition={{ 
                  type: "spring",
                  stiffness: 150,
                  damping: 10,
                  delay: 1.3 + index * 0.1 
                }}
                whileHover={{ scale: 1.1, y: -5 }}
              >
                <span className="pc-stat-number">{stat.number}</span>
                <span className="pc-stat-label">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="pc-featured-visual"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="pc-split-image-container" ref={imageRef}>
            <motion.div 
              className="pc-image-part pc-image-left"
              initial={{ x: -200, opacity: 0 }}
              animate={isImageInView ? { x: 0, opacity: 1 } : { x: -200, opacity: 0 }}
              transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
            >
              <img 
                src={bannerImage}
                alt="Hero Banner Left"
                className="pc-hero-image-part"
              />
            </motion.div>
            
            {/* Split Gap Content */}
            <div className="pc-split-gap-content">
              <motion.div 
                className="pc-gap-logo"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <div className="pc-logo-circle">
                  <span className="pc-logo-text">Goods4U</span>
                </div>
              </motion.div>
              
              <motion.div 
                className="pc-floating-products"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.0 }}
              >
                <div className="pc-product-icon pc-product-1">👟</div>
                <div className="pc-product-icon pc-product-2">👕</div>
                <div className="pc-product-icon pc-product-3">⌚</div>
                <div className="pc-product-icon pc-product-4">👜</div>
              </motion.div>
              
              <motion.div 
                className="pc-gap-text"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.2 }}
              >
                <span className="pc-gap-title">Discover</span>
                <span className="pc-gap-subtitle">Your Style</span>
              </motion.div>
            </div>
            
            <motion.div 
              className="pc-image-part pc-image-right"
              initial={{ x: 200, opacity: 0 }}
              animate={isImageInView ? { x: 0, opacity: 1 } : { x: 200, opacity: 0 }}
              transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
            >
              <img 
                src={bannerImage}
                alt="Hero Banner Right"
                className="pc-hero-image-part"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Pc_Promo_banner; 