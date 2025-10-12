import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "motion/react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "../css/Productcard.css";
import { Pagination, Navigation } from "swiper/modules";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { productselectedfeature, RelatedProductsFeature } from "../features/CartSlice";

const Productcards = ({ Data, category }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Animation refs
  const sectionRef = useRef(null);
  const filtersRef = useRef(null);
  const swiperRef = useRef(null);
  const viewAllRef = useRef(null);
  
  const isSectionInView = useInView(sectionRef, { once: true, margin: "-100px 0px" });
  const isFiltersInView = useInView(filtersRef, { once: true, margin: "-50px 0px" });
  const isSwiperInView = useInView(swiperRef, { once: true, margin: "-50px 0px" });
  const isViewAllInView = useInView(viewAllRef, { once: true, margin: "-50px 0px" });
  
  // State management
  const [fetched_items, set_fetched_items] = useState([]);
  const [allitems, setallitems] = useState([]);
  const [filtereditems, setfiltereditems] = useState([]);
  const [selectedgender, setselectedgender] = useState("");
  const [selectedcategory, setselectedcategory] = useState("");
  
  // Category flags
  const [isProductShoes, setisProductShoes] = useState(false);
  const [isProductCloths, setisProductCloths] = useState(false);
  const [isProductWatches, setisProductWatches] = useState(false);
  const [isProductElectronics, setisProductElectronics] = useState(false);

  // Set category flags based on prop
  useEffect(() => {
    setisProductCloths(category === "cloths");
    setisProductShoes(category === "shoes");
    setisProductWatches(category === "watches");
    setisProductElectronics(category === "electronics");
  }, [category]);

  // Initialize data
  useEffect(() => {
    if (Data && Data.length > 0) {
      set_fetched_items(Data);
      setallitems(Data);
    }
  }, [Data]);

  // Filter by gender
  const filteritems = (genderFilter) => {
    setselectedgender(genderFilter);
    setselectedcategory("");

    if (genderFilter !== "") {
      const updateitems = fetched_items.filter((item) => {
        return item.gender.toLowerCase() === genderFilter.toLowerCase();
      });
      setallitems(updateitems);
      setfiltereditems(updateitems);
    } else {
      setallitems(fetched_items);
      setfiltereditems([]);
    }
  };

  // Filter by category
  const filtercategory = (value) => {
    setselectedcategory(value);
    
    if (filtereditems.length === 0) {
      const updateitems = fetched_items.filter((item) => {
        return item.category.toLowerCase() === value.toLowerCase();
      });
      setallitems(updateitems);
    } else {
      const updateitems = filtereditems.filter((item) => {
        return item.category.toLowerCase() === value.toLowerCase();
      });
      setallitems(updateitems);
    }
  };

  // Handle product click
  const handleProductClick = async (Product) => {
    try {
      await dispatch(productselectedfeature(Product));
      dispatch(RelatedProductsFeature(Data));
      navigate("/product");
    } catch (error) {
      console.error("Error navigating to product:", error);
    }
  };

  // Get category title
  const getCategoryTitle = () => {
    switch (category) {
      case "cloths":
        return "Best Sellers in Clothing";
      case "shoes":
        return "Best Sellers in Footwear";
      case "watches":
        return "Best Sellers in Watches";
      case "electronics":
        return "Best Sellers in Electronics";
      default:
        return "Best Sellers";
    }
  };

  // Get category options
  const getCategoryOptions = () => {
    if (isProductShoes) {
      return [
        { value: "Running", label: "Running" },
        { value: "football", label: "Football" },
        { value: "casual", label: "Casual" }
      ];
    } else if (isProductCloths) {
      return [
        { value: "Blouse", label: "Blouse" },
        { value: "Jacket", label: "Jacket" },
        { value: "SweatShirt", label: "Sweatshirt" },
        { value: "Full Outfit", label: "Full Outfit" }
      ];
    }
    return [];
  };

  return (
    <motion.div 
      ref={sectionRef}
      className="pc-aa"
      initial={{ opacity: 0, y: 50 }}
      animate={isSectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.h1 
        className="pc-featuredcard-sectiontitle"
        initial={{ y: 30, opacity: 0 }}
        animate={isSectionInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {getCategoryTitle()}
      </motion.h1>

      <motion.div 
        ref={filtersRef}
        className="pc-featuredcard-filters"
        initial={{ y: 30, opacity: 0 }}
        animate={isFiltersInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <motion.h2 
          className="pc-featuredcard-filters-title"
          initial={{ y: 20, opacity: 0 }}
          animate={isFiltersInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          Filter Products
        </motion.h2>
        
        <motion.div 
          className="pc-featuredcard-filters-controls"
          initial={{ y: 20, opacity: 0 }}
          animate={isFiltersInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          {/* Gender Filter */}
          <select
            className="pc-featuredcard-selectbox"
            value={selectedgender}
            onChange={(e) => filteritems(e.target.value)}
          >
            <option value="">Select Gender</option>
            <option value="MEN">Men</option>
            <option value="WOMEN">Women</option>
            <option value="KID">Kids</option>
          </select>

          {/* Category Filter */}
          {(isProductShoes || isProductCloths) && (
            <select
              className="pc-featuredcard-selectbox"
              value={selectedcategory}
              onChange={(e) => filtercategory(e.target.value)}
            >
              <option value="">Select Category</option>
              {getCategoryOptions().map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          )}

          {/* Clear Filters Button */}
          {(selectedgender || selectedcategory) && (
            <button
              className="pc-featuredcard-clear-filters"
              onClick={() => {
                setselectedgender("");
                setselectedcategory("");
                setallitems(fetched_items);
                setfiltereditems([]);
              }}
            >
              Clear Filters
            </button>
          )}
        </motion.div>
      </motion.div>

      <motion.div
        ref={swiperRef}
        initial={{ opacity: 0, y: 30 }}
        animate={isSwiperInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Swiper
        initialSlide={0}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          500: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          600: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          850: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          1200: {
            slidesPerView: 4,
            spaceBetween: 30,
          },
        }}
        modules={[Pagination, Navigation]}
        className="pc-swiper"
      >
        {allitems.length > 0 ? (
          allitems.map((Product) => {
            const percent = Math.round(
              ((Product.old_price - Product.new_price) / Product.old_price) * 100
            );
            const hasDiscount = Product.old_price > Product.new_price;
            const saveAmount = (Product.old_price - Product.new_price).toFixed(2);
            
            return (
              <SwiperSlide key={Product.id || Product._id}>
                <motion.div
                  className="pc-featuredcard-productcard"
                  data-category={category}
                  onClick={() => handleProductClick(Product)}
                  style={{ cursor: "pointer" }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleProductClick(Product);
                    }
                  }}
                  initial={{ scale: 0.9, opacity: 0, y: 20 }}
                  animate={isSwiperInView ? { scale: 1, opacity: 1, y: 0 } : { scale: 0.9, opacity: 0, y: 20 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: 0.1 + (allitems.indexOf(Product) * 0.1),
                    ease: "easeOut"
                  }}
                  whileHover={{ 
                    scale: 1.05, 
                    y: -8,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {hasDiscount && (
                    <div className="pc-featuredcard-productbadge">{percent}% OFF</div>
                  )}
                  <div className="pc-featuredcard-productimage">
                    <img 
                      src={Product.imageURL} 
                      alt={Product.name || 'Product'} 
                      onError={(e) => {
                        e.target.src = '/Images/product_1.png'; // Fallback image
                      }}
                    />
                  </div>
                  <div className="pc-featuredcard-productcategory">
                    {Product.category}
                  </div>
                  <div className="pc-featuredcard-producttitle">
                    {Product.name}
                  </div>
                  <div className="pc-featuredcard-productdescription">
                    Premium quality {Product.category} for {Product.gender}
                  </div>
                  <div className="pc-featuredcard-productfeatures">
                    <span className="pc-featuredcard-feature">Premium Quality</span>
                    <span className="pc-featuredcard-feature">Comfortable</span>
                    <span className="pc-featuredcard-feature">Durable</span>
                  </div>
                  <div className="pc-featuredcard-productbottom">
                    <div className="pc-featuredcard-productprice">
                      {hasDiscount && (
                        <span className="pc-featuredcard-pricewas">
                          ${Product.old_price}
                        </span>
                      )}
                      <div className="pc-featuredcard-pricecontainer">
                        <span className="pc-featuredcard-pricenow">
                          ${Product.new_price}
                        </span>
                        {hasDiscount && (
                          <span className="pc-featuredcard-pricesave">
                            Save ${saveAmount}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="pc-featuredcard-productmeta">
                      <div className="pc-featuredcard-productrating">
                        <i className="bx bxs-star"></i>
                        <i className="bx bxs-star"></i>
                        <i className="bx bxs-star"></i>
                        <i className="bx bxs-star"></i>
                        <i className="bx bx-star"></i>
                        <span className="pc-featuredcard-ratingcount">128 Reviews</span>
                      </div>
                      <span className="pc-featuredcard-productstock">In Stock</span>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            );
          })
        ) : (
          <motion.div 
            className="pc-no-products"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isSwiperInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <p>No products found. Try adjusting your filters.</p>
          </motion.div>
        )}
        </Swiper>
      </motion.div>
      
      <motion.h1 
        ref={viewAllRef}
        className="pc-featuredcard-title"
        initial={{ y: 30, opacity: 0 }}
        animate={isViewAllInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        whileHover={{ 
          scale: 1.05, 
          y: -2,
          transition: { duration: 0.2 }
        }}
      >
        View All
      </motion.h1>
      
      <link
        href="https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css"
        rel="stylesheet"
      />
    </motion.div>
  );
};

export default Productcards;
