
import React, { memo } from 'react';
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

// Import first slide image for LCP optimization
import slide1Image from '../Images/desktop-slider1.webp';

const Heroarea = () => {
  const navigate = useNavigate();

  // Lightweight: no per-element motion. Keep a single, quick fade-in via CSS.
  return (
    <div style={{ minHeight: '500px', opacity: 1, transition: 'opacity 250ms ease-out' }}>
        <Swiper
          loop={true}
          pagination={{ clickable: true }}
          speed={600}
          navigation={true}
          autoplay={{ delay: 6000, disableOnInteraction: true }}
          modules={[Pagination, Navigation, Autoplay]}
          className="Ha_mySwiper"
          style={{ height: '500px' }}
        >
          {/* Men's Clothing Banner */}
          <SwiperSlide className='Ho_Swiperslide slide-1-container'>
            <div className="banner-container">
              <img
                src={slide1Image}
                alt="Men's Fashion Collection"
                className="responsive-bg-image slide-1"
                fetchpriority="high"
                decoding="async"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
              <div className="banner-content banner-content-left">
                <div className="banner-text">
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
                </div>
              </div>
            </div>
          </SwiperSlide>

          {/* Women's Clothing Banner */}
          <SwiperSlide className='Ho_Swiperslide'>
            <div className="banner-container">
              <div
                className="responsive-bg-image slide-2"
                role="img"
                aria-label="Women's Fashion Collection"
              />
              <div className="banner-content banner-content-left">
                <div className="banner-text">
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
                </div>
              </div>
            </div>
          </SwiperSlide>

          {/* Footwear Banner */}
          <SwiperSlide className='Ho_Swiperslide'>
            <div className="banner-container">
              <div
                className="responsive-bg-image slide-3"
                role="img"
                aria-label="Premium Footwear Collection"
              />
              <div className="banner-content banner-content-left">
                <div className="banner-text">
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
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
    </div>
  )
}

export default memo(Heroarea)