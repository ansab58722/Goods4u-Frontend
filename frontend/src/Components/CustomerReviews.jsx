import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import './../css/CustomerReviews.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';
import { Navigation, Pagination, EffectCoverflow } from 'swiper/modules';

const reviewsData = [
    { name: 'Jessica P.', rating: 5, review: 'Absolutely love my new shoes! They are so comfortable and stylish. The shipping was incredibly fast.', avatar: 'https://i.pravatar.cc/150?img=1' },
    { name: 'Mark T.', rating: 4, review: 'Great quality product and the customer service was very helpful. The shoes fit perfectly.', avatar: 'https://i.pravatar.cc/150?img=2' },
    { name: 'Sarah L.', rating: 5, review: 'I am blown away by the quality. These are the best pair of running shoes I have ever owned.', avatar: 'https://i.pravatar.cc/150?img=3' },
    { name: 'David R.', rating: 5, review: 'The user experience on the website is fantastic. So easy to find what I was looking for!', avatar: 'https://i.pravatar.cc/150?img=4' },
    { name: 'Emily S.', rating: 4, review: 'Good value for the price. The shoes are durable and look great. Will probably buy another pair soon.', avatar: 'https://i.pravatar.cc/150?img=5' },
    { name: 'Chris B.', rating: 5, review: 'A truly premium product. From the packaging to the shoe itself, everything was top-notch. Highly recommend!', avatar: 'https://i.pravatar.cc/150?img=6' }
];

const StarRating = ({ rating }) => {
    const totalStars = 5;
    return (
        <div className="star-rating">
            {[...Array(totalStars)].map((_, index) => (
                <FontAwesomeIcon key={index} icon={index < rating ? solidStar : regularStar} />
            ))}
        </div>
    );
};

const CustomerReviews = () => {
    const reviewsRef = useRef(null);
    const isInView = useInView(reviewsRef, { once: true, margin: "-100px 0px" });

    return (
        <motion.div 
            ref={reviewsRef}
            className="reviews-section lp-section-gray"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            <motion.h2 
                className="lp-section-title"
                initial={{ y: 30, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                What Our Customers Say
            </motion.h2>
            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.95, opacity: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
            >
                <Swiper
                    effect={'coverflow'}
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={'auto'}
                    coverflowEffect={{
                        rotate: 50,
                        stretch: 0,
                        depth: 100,
                        modifier: 1,
                        slideShadows: true,
                    }}
                    pagination={{ clickable: true }}
                    navigation={true}
                    modules={[EffectCoverflow, Pagination, Navigation]}
                    className="C_reviews_Swiper"
                >
                    {reviewsData.map((review, index) => (
                        <SwiperSlide key={index}>
                            <motion.div 
                                className="review-card"
                                initial={{ y: 50, opacity: 0 }}
                                animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
                                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                                whileHover={{ scale: 1.05, y: -5 }}
                            >
                                <div className="review-header">
                                    <img src={review.avatar} alt={review.name} className="review-avatar" />
                                    <div className="review-info">
                                        <h4>{review.name}</h4>
                                        <StarRating rating={review.rating} />
                                    </div>
                                </div>
                                <p className="review-text">"{review.review}"</p>
                            </motion.div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </motion.div>
        </motion.div>
    );
};

export default CustomerReviews;