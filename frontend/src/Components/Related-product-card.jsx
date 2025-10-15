import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from 'swiper/react';
import "../css/Related-product-card.css"
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { productselectedfeature} from "../features/CartSlice";
import { useNavigate } from "react-router-dom";
import { Navigation, Pagination } from 'swiper/modules';
import { faStar,} from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Related_product_card = ({product,setproduct}) => {

      const dispatch = useDispatch()
        const navigate = useNavigate();
  const relatedProducts =useSelector((state) => state.cart.Relatedproducts)


const StarRating = ({ rating }) => {

    return (
      <div className="Related-product-star-rating">
        {[...Array(5)].map((_, index) => (
          <FontAwesomeIcon
            key={product.id+index+"SR"}
            icon={index < rating ? faStar : farHeart}
            className={index < rating ? 'Related-product-star-filled' : 'Related-product-star-empty'}
          />
        ))}
      </div>
    )
  }

    // Handle empty or loading states
    if (!relatedProducts || relatedProducts.length === 0) {
        return (
            <div className="Related-product-related-products">
                <h2>You Might Also Like</h2>
                <div className="Related-product-empty">
                    <h3>No Related Products</h3>
                    <p>We couldn't find any related products at the moment.</p>
                </div>
            </div>
        );
    }

    return (
        <>
            {/* Related Products */}
            <div className="Related-product-related-products">
                <h2>You Might Also Like</h2>
                <Swiper
                    slidesPerView={1}
                    spaceBetween={0}
                    navigation={true}
                    pagination={{ clickable: true }}
                    modules={[Navigation, Pagination]}
                    className={"Related-product-related-products-swiper"}
                    breakpoints={{
                        400: {
                            slidesPerView: 1,
                            spaceBetween: 15,
                            centeredSlides: true,
                        },
                        640: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                            centeredSlides: false,
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 25,
                            centeredSlides: false,
                        },
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 25,
                            centeredSlides: false,
                        },
                        1200: {
                            slidesPerView: 4,
                            spaceBetween: 30,
                            centeredSlides: false,
                        },
                    }}
                >
                    {relatedProducts.map(product => (
                        <SwiperSlide key={product.id + "RP"}>
                            <div className="Related-product-related-product-card" onClick={async () => {
                                await dispatch(productselectedfeature(product));
                                setproduct(product)
                                navigate("/product");
                            }}>
                                <img src={product.imageURL} alt={product.name} style={{ objectPosition: "center" }} />
                                <div className="Related-product-product-info">
                                    <h4 title={product.name}>{product.name}</h4>
                                    <div className="Related-product-product-meta">
                                        <StarRating rating={4.1} />
                                        <span className="Related-product-price">₹{product.new_price}</span>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>




        </>









    )

}

export default Related_product_card;