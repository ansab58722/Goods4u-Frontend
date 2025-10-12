import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from 'swiper/react';
import "../css/Productdetail.css"
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
      <div className="star-rating">
        {[...Array(5)].map((_, index) => (
          <FontAwesomeIcon
            key={product.id+index+"SR"}
            icon={index < rating ? faStar : farHeart}
            className={index < rating ? 'star-filled' : 'star-empty'}
          />
        ))}
      </div>
    )
  }

    return (
        <>
            {/* Related Products */}
            < div className="related-products" >
                <h2>You Might Also Like</h2>
                <Swiper
                    slidesPerView={1}
                    spaceBetween={30}
                    navigation={true}
                    pagination={{ clickable: true }}
                    modules={[Navigation, Pagination]}
                    className="related-products-swiper"
                    breakpoints={{
                        640: {
                            slidesPerView: 2,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 3,
                            spaceBetween: 30,
                        },
                        1024: {
                            slidesPerView: 4,
                            spaceBetween: 30,
                        },
                    }}
                >
                    {relatedProducts.map(product => (
                        <SwiperSlide key={product.id + "RP"}>
                            <div className="related-product-card" onClick={async () => {
                                await dispatch(productselectedfeature(product));
                                setproduct(product)
                                navigate("/product");
                            }}>
                                <img src={product.imageURL} alt={product.name} style={{ objectPosition: "top" }} />
                                <div className="product-info">
                                    <h4>{product.name}</h4>
                                    <div className="product-meta">
                                        <StarRating rating={4.1} />
                                        <span className="price">₹{product.new_price}</span>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div >




        </>









    )

}

export default Related_product_card;