import React, { useEffect, useState } from "react";
import Navbardesktop from "../Components/Navbar-desktop";
import "../css/Allproducts.css";
import "../css/Productcard.css";
import { useDispatch, useSelector } from "react-redux";
import { addTocart, productselectedfeature, RelatedProductsFeature } from "../features/CartSlice";
import { useLocation } from 'react-router-dom';
import Footer from "../Components/Footer.jsx";
import { useNavigate, Link } from "react-router-dom";
import Spinner from "../Components/Spinner.jsx";
import Faqs from "../Components/Faqs.jsx";
import CustomerReviews from "../Components/CustomerReviews.jsx";
import Filters from "../Components/Filters.jsx";
import Productsfetch from "../features/Productsfetch.js";


const Allproducts = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const category = params.get('category');
  const maincategory = params.get('maincategory');


  const [fetched_items, set_fetched_items] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [visibleProducts, setVisibleProducts] = useState(8);
  const fetched_results = useSelector((state) => state?.cart?.searchresults);
  const [allitems, setallitems] = useState(fetched_items);
  //checks if product page is getting data from search to disable category filter
  const [productCategory, setproductCategory] = useState("");
  const [Data, setData] = useState([])
  // Scroll to top when component mounts or category changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [category]);

  useEffect(() => {

    const fetchdata = async () => {

      setIsLoading(true);

      switch (category) {

        case 'search':

          try {

            set_fetched_items(fetched_results);
            setallitems(fetched_results);
            setproductCategory(maincategory)

          } catch (error) {

            console.error("Error:", error);
          }
          finally {
            setIsLoading(false);
            // Scroll to top after search data is loaded
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }


          break;


        case 'cloths':
          setproductCategory('Cloths')
          try {
            //getting data from fetch product feature
            await Productsfetch({ setData }, "cloths");;
            //  setShoesData(data.data)
          } catch (error) {
            console.error("Error:", error);
          } finally {
            setIsLoading(false);
            // Scroll to top after cloths data is loaded
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }

          break;

        //electronics data not available so 
        case 'electronics':

          set_fetched_items([]);
          setallitems([]);

          setIsLoading(false);
          // Scroll to top after electronics data is loaded
          window.scrollTo({ top: 0, behavior: 'smooth' });

          break;

        case 'watches':


          set_fetched_items([]);
          setallitems([]);


          setIsLoading(false);
          // Scroll to top after watches data is loaded
          window.scrollTo({ top: 0, behavior: 'smooth' });

          break;

        case 'footwears':
          setproductCategory('Footwears')
          try {

            await Productsfetch({ setData }, "footwears");;

          }
          catch (error) {
            console.error("Error:", error);
          } finally {
            setIsLoading(false);
            // Scroll to top after footwears data is loaded
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }

          break;

        default:
          // Logic if no category or unrecognized category
          setproductCategory('all')

          try {
            // Fetch all products

            await Productsfetch({ setData }, "alldata");

          } catch (error) {
            console.error("Error:", error);
          } finally {
            setIsLoading(false);
            // Scroll to top after default case is handled
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
          break;
      }

    }

      ;

    fetchdata();
  }, [category, fetched_results]);
//setfetched data
 useEffect(() => {

 set_fetched_items(Data);
            setallitems(Data);



  }, [Data]);



  const [filtereditems, setfiltereditems] = useState(0);


  const filteritems = (genderFilter) => {
    const updateitems = fetched_items.filter((item) => {
      return item.gender.toLowerCase() === genderFilter.toLowerCase();
    });
    setallitems(updateitems);
    setfiltereditems(updateitems);
  };

  const filtercategory = (value, filter) => {
    //checks if any filter is applied or not

    if (filtereditems === 0) {
      const updateitems = fetched_items.filter((item) => {
        return item.category.toLowerCase() === value.toLowerCase();
      });
      setallitems(updateitems);
    } else {
      //if filter is applied it will further filter it

      const updateitems = filtereditems.filter((item) => {
        return item.category.toLowerCase() === value.toLowerCase();
      });
      //setfilteredcategoryitems(updateitems);
      setallitems(updateitems);
    }
  };

  const filterprice = (e) => {
    //price filter
    let tempdata = [...allitems];
    const sortOrder = typeof e === "string" ? e : e.target.value;

    if (sortOrder === "high-to-low") {
      const sorteditems = tempdata.sort((a, b) => b.new_price - a.new_price);
      setallitems(sorteditems);
    } else {
      const sorteditems = tempdata.sort((a, b) => a.new_price - b.new_price);
      setallitems(sorteditems);
    }
  };

  const removecheck = (e) => {
    document.querySelectorAll(".filter-checkbox[data-group='category']").forEach((element) => {
      element.checked = false;
    });
    document.querySelectorAll(".filter-checkbox[data-group='price']").forEach((element) => {
      element.checked = false;
    });
    e.target.checked = true;
  };

  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Handle escape key to close mobile filters
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && showMobileFilters) {
        setShowMobileFilters(false);
      }
    };

    if (showMobileFilters) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [showMobileFilters]);

 
  return (
    <div>
      <Navbardesktop />

      {/* Cool Page Header */}
      <div className="allproducts-page-header">
        <h1>Explore Our Collection</h1>
        <p>
          Find your perfect pair from our curated selection of premium footwear.
        </p>
      </div>

      {/* Mobile filter button */}
      <button
        className="allproducts-mobile-filter-btn"
        onClick={() => setShowMobileFilters(true)}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 4H21V6.172L13.172 14H11V20L9 18V14H6.828L3 10.172V4Z" fill="currentColor" />
        </svg>
        Filter Products
      </button>

      {/* Mobile filter modal */}
      {showMobileFilters && (
        <div
          className="allproducts-mobile-filter-modal"
          onClick={(e) => {
            if (e.target.className === 'allproducts-mobile-filter-modal') {
              setShowMobileFilters(false);
            }
          }}
        >
          <div className="allproducts-mobile-filter-content">
            <div className="mobile-filter-header">
              <h3>Filter Products</h3>
              <button
                className="allproducts-mobile-filter-close"
                onClick={() => setShowMobileFilters(false)}
                aria-label="Close filters"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>

            <Filters
              removecheck={removecheck} filteritems={filteritems}
              fetched_items={fetched_items} setallitems={setallitems}
              filtercategory={filtercategory} filterprice={filterprice}
              productCategory={productCategory}
            />
          </div>
        </div>
      )}

      <div className="producscontainer">
        {/* Desktop filter area (hidden on mobile) */}
        <div className="allproducts-filterarea allproducts-filterarea-desktop">




          <Filters
            removecheck={removecheck} filteritems={filteritems}
            fetched_items={fetched_items} setallitems={setallitems}
            filtercategory={filtercategory} filterprice={filterprice}
            productCategory={productCategory}
          />



        </div>

        <div className="allproducts-main-content">
          {/* Featured Product Banner */}
          <div className="featured-product-banner">
            <div className="featured-text">
              <h2>Summer Collection is Here!</h2>
              <p>Up to 40% OFF on selected styles. Don't miss out!</p>
              <button className="featured-button">Shop Now</button>
            </div>
            <div className="featured-image">
              <img src="/Images/hero_image.png" alt="Featured Product" />
            </div>
          </div>

          {/* Top bar with Breadcrumbs and Sorting */}
          <div className="allproducts-top-bar">
            <div className="allproducts-breadcrumbs">
              <Link to="/">Home</Link> / <span>{category}</span>
            </div>
            <div className="allproducts-sorting">
              <select onChange={filterprice} className="sorting-dropdown">
                <option value="low-to-high">Sort by Price: Low to High</option>
                <option value="high-to-low">Sort by Price: High to Low</option>
              </select>
            </div>
          </div>

          {isLoading ? (
            <div className="allproducts-spinner-container">
              <div className="loading-content">
                <Spinner />
                <p className="loading-text">Loading products...</p>
              </div>
            </div>
          ) : allitems?.length === 0 ? (
            <div className="no-products-container">
              <div className="no-products-content">
                <div className="no-products-icon">🔍</div>
                <h3 className="no-products-title">No Products Found</h3>
                <p className="no-products-message">
                  We couldn't find any products in this category. Try browsing other categories or check back later.
                </p>
                <button
                  className="no-products-button"
                  onClick={() => navigate('/')}
                >
                  Browse All Categories
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="allproducts-productsarea">
                {allitems?.slice(0, visibleProducts).map((Product) => {
                  const percent = Math.round(
                    ((Product.old_price - Product.new_price) /
                      Product.old_price) *
                    100
                  );
                  const hasDiscount = Product.old_price > Product.new_price;
                  const saveAmount = (
                    Product.old_price - Product.new_price
                  ).toFixed(2);
                  return (

                    <div
                      className="pc-featuredcard-productcard"
                      onClick={() => {
                        dispatch(productselectedfeature(Product));
                        dispatch(RelatedProductsFeature(allitems));
                        navigate("/product");
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      {hasDiscount && (
                        <div className="pc-featuredcard-productbadge">{percent}% OFF</div>
                      )}
                      <div className="pc-featuredcard-productimage">
                        <img src={Product.imageURL} alt={Product.name} />
                      </div>
                      <div className="pc-featuredcard-productcategory">
                        {Product.category}
                      </div>
                      <div className="pc-featuredcard-producttitle">{Product.name}</div>
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
                    </div>



                  );
                })}
              </div>

              {visibleProducts < allitems?.length && (
                <div className="allproducts-load-more-container">
                  <button
                    onClick={() => setVisibleProducts((prev) => prev + 8)}
                    className="load-more-btn"
                  >
                    Load More
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <CustomerReviews />
      <Faqs />

      <Footer />
    </div>
  );
};

export default Allproducts;
