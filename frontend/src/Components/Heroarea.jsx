
import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'motion/react';
import { useNavigate } from 'react-router-dom';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import "../css/Heroarea.css"
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// import required modules

import { Navigation, Pagination, Autoplay } from 'swiper/modules';

const Heroarea = () => {
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const isInView = useInView(heroRef, { once: true, margin: "-100px 0px" });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading time to ensure smooth transition
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      ref={heroRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView && isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 1, ease: "easeOut" }}
      style={{ minHeight: '500px' }}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={isInView && isLoaded ? { scale: 1, opacity: 1 } : { scale: 0.95, opacity: 0 }}
        transition={{ duration: 1.2, delay: 0.3 }}
      >
        <Swiper
          loop={true}
          pagination={{
            clickable: true,
          }}

          speed={1900}
          navigation={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          modules={[Pagination, Navigation, Autoplay]}
          className="Ha_mySwiper"
          style={{ height: '500px' }}
        >
          {/* Men's Clothing Banner */}
          <SwiperSlide className='Ho_Swiperslide slide-1-container'>
            <div className="banner-container">
              <motion.div
                className="responsive-bg-image slide-1"
                initial={{ scale: 1.1, opacity: 0 }}
                animate={isInView && isLoaded ? { scale: 1, opacity: 1 } : { scale: 1.1, opacity: 0 }}
                transition={{ duration: 1.5, delay: 0.5 }}
                role="img"
                aria-label="Men's Fashion Collection"
              />
              <div className="banner-content banner-content-left">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={isInView && isLoaded ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                  transition={{ duration: 1, delay: 0.8 }}
                  className="banner-text"
                >
                  <h1 className="banner-title">STYLE THAT SPEAKS</h1>
                  <h2 className="banner-subtitle">Men's Premium Collection</h2>
                  <p className="banner-description">
                    Discover our curated selection of men's clothing that combines comfort, style, and sophistication.
                    From casual wear to formal attire, find your perfect look.
                  </p>
                  <div className="banner-cta">
                    <button 
                      className="btn-primary banner-btn"
                      onClick={() => navigate('/allproducts?category=cloths')}
                    >
                      Shop Men's
                    </button>
                    <button 
                      className="btn-secondary banner-btn"
                      onClick={() => navigate('/allproducts?category=cloths')}
                    >
                      View Collection
                    </button>
                  </div>
                </motion.div>
              </div>
            </div>
          </SwiperSlide>

          {/* Women's Clothing Banner */}
          <SwiperSlide className='Ho_Swiperslide'>
            <div className="banner-container">
              <motion.div
                className="responsive-bg-image slide-2"
                initial={{ scale: 1.1, opacity: 0 }}
                animate={isInView && isLoaded ? { scale: 1, opacity: 1 } : { scale: 1.1, opacity: 0 }}
                transition={{ duration: 1.5, delay: 0.6 }}
                role="img"
                aria-label="Women's Fashion Collection"
              />
              <div className="banner-content banner-content-left">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={isInView && isLoaded ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                  transition={{ duration: 1, delay: 0.8 }}
                  className="banner-text"
                >
                  <h1 className="banner-title">ELEGANCE REDEFINED</h1>
                  <h2 className="banner-subtitle">Women's Fashion Hub</h2>
                  <p className="banner-description">
                    Step into a world of timeless elegance with our women's collection.
                    From trendy casuals to stunning formal wear, express your unique style.
                  </p>
                  <div className="banner-cta">
                    <button 
                      className="btn-primary banner-btn"
                      onClick={() => navigate('/allproducts?category=cloths')}
                    >
                      Shop Women's
                    </button>
                    <button 
                      className="btn-secondary banner-btn"
                      onClick={() => navigate('/allproducts?category=cloths')}
                    >
                      New Arrivals
                    </button>
                  </div>
                </motion.div>
              </div>
            </div>
          </SwiperSlide>

          {/* Footwear Banner */}
          <SwiperSlide className='Ho_Swiperslide'>
            <div className="banner-container">
              <motion.div
                className="responsive-bg-image slide-3"
                initial={{ scale: 1.1, opacity: 0 }}
                animate={isInView && isLoaded ? { scale: 1, opacity: 1 } : { scale: 1.1, opacity: 0 }}
                transition={{ duration: 1.5, delay: 0.7 }}
                role="img"
                aria-label="Premium Footwear Collection"
              />
              <div className="banner-content banner-content-left">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={isInView && isLoaded ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                  transition={{ duration: 1, delay: 0.8 }}
                  className="banner-text"
                >
                  <h1 className="banner-title">STEP IN STYLE</h1>
                  <h2 className="banner-subtitle">Premium Footwear</h2>
                  <p className="banner-description">
                    Walk with confidence in our premium footwear collection.
                    From sneakers to formal shoes, find the perfect pair for every occasion.
                  </p>
                  <div className="banner-cta">
                    <button 
                      className="btn-primary banner-btn"
                      onClick={() => navigate('/allproducts?category=footwears')}
                    >
                      Shop Shoes
                    </button>
                    <button 
                      className="btn-secondary banner-btn"
                      onClick={() => navigate('/allproducts?category=footwears')}
                    >
                      Best Sellers
                    </button>
                  </div>
                </motion.div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </motion.div>
    </motion.div>
  )
}

export default Heroarea