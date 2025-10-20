import React, { useState, useEffect } from 'react'
import "../css/Productdetail.css"
import { useDispatch, useSelector } from "react-redux";
import { addTocart } from "../features/CartSlice";
import Navbardesktop from './Navbar-desktop';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruck, faUndo, faShieldAlt, faCheck, faStar, faHeart, faShare, faShoppingCart, faEye } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import Related_product_card from './Related-product-card.jsx';
import Footer from './Footer.jsx';
import { useNavigate,Navigate, useLocation} from 'react-router-dom';



const Productdetail = () => {


       ;
  const dispatch = useDispatch()
    const navigate = useNavigate();

    const fetched_product =useSelector((state) => state?.cart?.selectedproduct);



  const [size, setsize] = useState(0)
  const [color, setcolor] = useState("")
  const [isAddedToCart, setIsAddedToCart] = useState(false)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState('description')
  const [isImageZoomed, setIsImageZoomed] = useState(false)
  
const[product,setproduct]=useState(fetched_product !== undefined ?fetched_product:alert("adas"))
  const [mainimg, setmainimg] = useState( product.imageURL!== undefined ?product.imageURL:"" )
  const [Allproductimagesofvarient, setAllproductimagesofvarient] = useState(
  product?.colors?.[0]?.images ?? []
);
  //console.log( useSelector((state) => state.cart.Relatedproducts))

 
  useEffect(() => {
  


  setmainimg(product?.imageURL)
setAllproductimagesofvarient(product?.colors?.[0]?.images)

  window.scrollTo({
      top: 5,
    });


    }, [product]);

      

  const reviews = [
    { id: 1, name: 'Sarah M.', rating: 5, comment: 'Absolutely love these! Perfect fit and so comfortable.', date: '2 days ago' },
    { id: 2, name: 'Mike R.', rating: 4, comment: 'Great quality, fast shipping. Would recommend!', date: '1 week ago' },
    { id: 3, name: 'Emma L.', rating: 5, comment: 'Exceeded my expectations. The material is premium.', date: '2 weeks ago' }
  ]



  const handleAddToCart = () => {

    if (size !== 0 && color !== "") {
      const selectedproduct = {
        id: product.id + color + size,
        name: product.name,
        brand: product.brand,
        category: product.category,
        gender: product.gender,
        imageURL: product.imageURL,
        imageURL2: product.imageURL2,
        is_in_inventory: product.is_in_inventory,
        items_left: product.items_left,
        maincategory: product.maincategory,
        new_price: product.new_price,
        old_price: product.old_price,
        quantity: quantity,
        selectedcolor: color,
        selectedsize: size,
      }
      dispatch(addTocart(selectedproduct))
      setIsAddedToCart(true)
      setTimeout(() => {
        setIsAddedToCart(false)
      }, 1000)


    } else {

      alert("please select color and size before adding to cart")

    }


  }

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted)
  }

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
//console.log(product)
if (!fetched_product || fetched_product.length === 0) return window.history.back();
  return (
    <div className="Product-details-mainproductdetail">
      <Navbardesktop />

      {/* Breadcrumb Navigation */}
      <div className="product-breadcrumb">
        <div className="breadcrumb-container">
          <a href="/" className="breadcrumb-link">Home</a>
          <span className="breadcrumb-separator">/</span>
          <a href="/allproducts" className="breadcrumb-link">Products</a>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current" title={product.name}>{product.name}</span>
        </div>
      </div>

      {/* Hero Section */}
      <div className="product-hero">
        <div className="hero-background"></div>
        <div className="productDetail-hero-content">
          <h1>Discover Your Perfect Fit</h1>
          <p>Premium quality meets exceptional comfort</p>
        </div>
      </div>

      <div className="Product-details-mainproductdetailwrapper">
        {/* Product Gallery */}
        <div className="Product-details-product-gallery">
          <div className="Product-details-main-image-container">
            <img
              className={`Product-details-productmainimage ${isImageZoomed ? 'zoomed' : ''}`}
              src={mainimg}
              alt="Product"
              onMouseEnter={() => setIsImageZoomed(true)}
              onMouseLeave={() => setIsImageZoomed(false)}
            />
            <div className="image-overlay">
              <button className="overlay-btn wishlist-btn" onClick={toggleWishlist}>
                <FontAwesomeIcon icon={isWishlisted ? faHeart : farHeart} />
              </button>
              <button className="overlay-btn share-btn">
                <FontAwesomeIcon icon={faShare} />
              </button>
              <button className="overlay-btn zoom-btn">
                <FontAwesomeIcon icon={faEye} />
              </button>
            </div>
          </div>

          <div className="thumbnail-gallery">


            {

              Allproductimagesofvarient.map((varientimg,index) => {

                return (

                  <img
                    src={varientimg}
                    alt="1stimage"
                    key={index+"ti"}
                    className={`productimgs ${mainimg === varientimg ? 'aactive' : ''}`}
                    onClick={() => {

                      setmainimg(varientimg)
                    }}
                  />


                )






              })



            }


          </div>
        </div>

        {/* Product Details */}
        <div className="product-details">
          <div className="product-header">
            <h1 className='productdetailname' title={product.name}>{product.name}</h1>
            <div className="product-rating">
              <StarRating rating={4.5} />
              <span className="rating-text">4.5 (128 reviews)</span>
            </div>
          </div>

          <div className="price-section">
            <h2 className="productdetailprice">${product.new_price}</h2>
            {product.old_price && (
              <span className="old-price">${product.old_price}</span>
            )}
            <span className="discount-badge">Save 20%</span>
          </div>

          {/* Color Selection */}
          <div className="selection-section">
            <h3>Color: <span className="selected-value">{color || 'Select a color'}</span></h3>
            <div className="color-options">

              {product.colors.map((product,index) => {


                return (
                  <div className={`color-option ${color === product.name ? 'active' : ''}`}
                  key={index+"cs"} onClick={() => {
                  

                    setAllproductimagesofvarient(product.images)
                    //console.log("productimglink",AllproductimagesofColor)
                    setcolor(product.name)
                  }}>
                    <div className="color-circle black" style={{backgroundColor:product.name.toLowerCase()}}></div>
                    <span>{product.name}</span>
                  </div>

                )

              })
              }

            </div>
          </div>

          {/* Size Selection */}
          <div className="selection-section">
            <h3>Size: <span className="selected-value">{size || 'Select a size'}</span></h3>
            <div className="sizediv">
              {product.sizes.map((sizeOption) => (
                <div
                  key={sizeOption+"s"}
                  className={`sizebox ${size === sizeOption ? 'aactive' : ''}`}
                  onClick={() => setsize(sizeOption)}
                >
                  {sizeOption}
                </div>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="quantity-section">
            <h3>Quantity</h3>
            <div className="quantity-selector">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="Product-details-action-buttons">
            <button
              className={`Product-details-addtocartbutn ${isAddedToCart ? 'success' : ''}`}
              onClick={handleAddToCart}
            >
              <FontAwesomeIcon icon={faShoppingCart} />
              {isAddedToCart ? 'Added to Cart!' : 'Add to Cart'}
            </button>
            <button className="Product-details-buy-now-btn" 
             onClick={() => navigate('/shoppingcart')}
            >
              Buy Now
            </button>
          </div>

          {/* Product Highlights */}
          <div className="product-highlights">
            <div className="highlight-item">
              <FontAwesomeIcon icon={faTruck} />
              <div>
                <h4>Free Shipping</h4>
                <p>On orders over $100</p>
              </div>
            </div>
            <div className="highlight-item">
              <FontAwesomeIcon icon={faUndo} />
              <div>
                <h4>Easy Returns</h4>
                <p>30 day return policy</p>
              </div>
            </div>
            <div className="highlight-item">
              <FontAwesomeIcon icon={faShieldAlt} />
              <div>
                <h4>Secure Payment</h4>
                <p>100% secure checkout</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Tabs */}
      <div className="product-tabs">
        <div className="tabs-header">
          <button
            className={`tab-btn ${activeTab === 'description' ? 'active' : ''}`}
            onClick={() => setActiveTab('description')}
          >
            Description
          </button>
          <button
            className={`tab-btn ${activeTab === 'features' ? 'active' : ''}`}
            onClick={() => setActiveTab('features')}
          >
            Features
          </button>
          <button
            className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
            onClick={() => setActiveTab('reviews')}
          >
            Reviews ({reviews.length})
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'description' && (
            <div className="description-content">
              <h3>Product Description</h3>
              <p>Experience the perfect blend of style and comfort with our premium quality product.
                Designed for durability and performance, this item features the latest technology
                and materials to ensure the best experience for our customers.</p>
              <p>Made with breathable materials and ergonomic design, this product provides
                exceptional comfort for extended wear. The innovative construction ensures
                long-lasting performance while maintaining a sleek, modern appearance.</p>
            </div>
          )}

          {activeTab === 'features' && (
            <div className="features-content">
              <h3>Key Features</h3>
              <div className="features-grid">
                <div className="feature-item">
                  <FontAwesomeIcon icon={faCheck} />
                  <span>Premium quality materials</span>
                </div>
                <div className="feature-item">
                  <FontAwesomeIcon icon={faCheck} />
                  <span>Comfortable fit and design</span>
                </div>
                <div className="feature-item">
                  <FontAwesomeIcon icon={faCheck} />
                  <span>Durable construction</span>
                </div>
                <div className="feature-item">
                  <FontAwesomeIcon icon={faCheck} />
                  <span>Easy to maintain</span>
                </div>
                <div className="feature-item">
                  <FontAwesomeIcon icon={faCheck} />
                  <span>Breathable fabric</span>
                </div>
                <div className="feature-item">
                  <FontAwesomeIcon icon={faCheck} />
                  <span>Anti-slip sole</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="reviews-content">
              <div className="reviews-summary">
                <div className="overall-rating">
                  <h3>4.5</h3>
                  <StarRating rating={4.5} />
                  <p>Based on 128 reviews</p>
                </div>
              </div>
              <div className="reviews-list">
                {reviews.map(review => (
                  <div key={review.id+"R"} className="review-item">
                    <div className="review-header">
                      <h4>{review.name}</h4>
                      <StarRating rating={review.rating} />
                      <span className="review-date">{review.date}</span>
                    </div>
                    <p>{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      
< Related_product_card product={product} setproduct={setproduct}  />

      {/* Footer */}
      <Footer />

      
    </div>
  )

 

}

export default Productdetail