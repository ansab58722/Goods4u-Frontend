import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import '../css/Navbar-Desktop.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Productsfetch from '../features/Productsfetch';
import {
  faHome,
  faShoppingBag,
  faShoppingCart,
  faUser,
  faInfoCircle,
  faEnvelope,
  faSearch,
  faBars,
  faTimes
} from '@fortawesome/free-solid-svg-icons';

import { Link,useNavigate } from 'react-router-dom';
import { searchresultsfeature } from '../features/CartSlice';
import { useDispatch, useSelector } from 'react-redux';

const Navbardesktop = () => {
  const navRef = useRef(null);
  const isInView = useInView(navRef, { once: true, margin: "-200px 0px" });

  const [data, setData] = useState([]);
 const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isProfileOverlayOpen, setIsProfileOverlayOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearchActive, setIsSearchActive] = useState(false);
  const searchInputRef = useRef(null);

  //getproducts data

  useEffect(() => {
 const fetchData = async () => {

    await Productsfetch({setData});

    // console.log(data)
  };
  fetchData();
    
    const user = localStorage.getItem("User");
    if (user) {
      try {
        setUserData(JSON.parse(user));
      } catch (e) {
        console.error("Failed to parse user data from localStorage", e);
        setUserData(null);
      }
    }
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && !event.target.closest('.navbar-desktop')) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen]);


//handle search suggestions 
 useEffect(() => {
   setSearchResults([])
    if (searchQuery.length>3) {
      const query=searchQuery.toLowerCase()
     
setIsSearchActive(true)
//console.log("datainsidesearcg",data[0].name.toLowerCase())


const results= data.filter(keyword=>
 //console.log(keyword.name.toLowerCase().includes(query))
  keyword.name?.toLowerCase().includes(query)|| keyword.category?.toLowerCase().includes(query)|| keyword.maincategory?.toLowerCase().includes(query)
  )
setSearchResults(results)
    
    }else{
      setIsSearchActive(false)
    }
    //console.log(searchResults)

  }, [searchQuery, data]);



  //console.log("setdata",data)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    // Prevent body scroll when mobile menu is open
    document.body.style.overflow = !isMobileMenuOpen ? 'hidden' : 'unset';
  };

  const toggleDropdown = (dropdownName) => {
    setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
  };

  const toggleProfileOverlay = (event) => {
    if (event) event.preventDefault();
    setIsProfileOverlayOpen(!isProfileOverlayOpen);
  };

  const handleSignOut = () => {
    localStorage.removeItem("User");
    setUserData(null);
    setIsProfileOverlayOpen(false);
    setIsMobileMenuOpen(false);
    document.body.style.overflow = 'unset';
  };

  const handleSearch =async  (e) => {
    e.preventDefault();
    // Implement search functionality

    await dispatch(searchresultsfeature(searchResults))


navigate(`/allproducts?category=search&maincategory=${searchResults[0].maincategory}`);
    
    console.log('Searching for:', searchQuery);
  };

  const handleSuggestionClick = async () => {
    try {
      await dispatch(searchresultsfeature(searchResults));
     navigate(`/allproducts?category=search&maincategory=${searchResults[0].maincategory}`);
    
    } finally {
      setSearchQuery('');
      setIsSearchActive(false);
      if (searchInputRef.current) {
        searchInputRef.current.blur();
      }
    }
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = 'unset';
  };

  const categories = [
    { name: 'Clothing', path: '/allproducts?category=cloths', icon: faShoppingBag },
    { name: 'Watches', path: '/allproducts?category=watches', icon: faShoppingBag },
    { name: 'Footwear', path: '/allproducts?category=footwears', icon: faShoppingBag },
    { name: 'Electronics', path: '/allproducts?category=electronics', icon: faShoppingBag }
  ];

  return (
    <motion.nav 
      ref={navRef}
      className="navbar-desktop"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={{ minHeight: '80px' }}
    >
      <motion.div 
        className="navbar-container"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        style={{ minHeight: '60px' }}
      >
        {/* Logo */}
        <motion.div 
          className="navbar-logo"
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.2 }}
        >
          <Link to="/" className="logo-link">
            <span className="logo-text">Goods4U</span>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <motion.ul 
          className="nav-links-desktop"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.li
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Link to="/" className="nav-link">
              <FontAwesomeIcon icon={faHome} className="nav-icon" />
              Home
            </Link>
          </motion.li>

          <motion.li 
            className="dropdown"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <button
              className="nav-link dropdown-toggle"
              onClick={() => toggleDropdown('categories')}
            >
              <FontAwesomeIcon icon={faShoppingBag} className="nav-icon" />
              Categories

              <FontAwesomeIcon
                icon={activeDropdown === 'categories' ? faTimes : faBars}
                className="dropdown-arrow"
              />
            </button>
            <ul className={`dropdown-menu ${activeDropdown === 'categories' ? 'active' : ''}`}>
              {categories.map((category) => (
                <li key={category.name}>
                  <Link to={category.path} onClick={() => setActiveDropdown(null)}>
                    <FontAwesomeIcon icon={category.icon} />
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.li>
          <motion.li
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Link to="/about" className="nav-link">
              <FontAwesomeIcon icon={faInfoCircle} className="nav-icon" />
              About
            </Link>
          </motion.li>
          <motion.li
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <Link to="/contact" className="nav-link">
              <FontAwesomeIcon icon={faEnvelope} className="nav-icon" />
              Contact
            </Link>
          </motion.li>
        </motion.ul>

        {/* Search Bar */}
        <motion.div 
          className="search-container"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 10, delay: 0.8 }}
        >
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
              ref={searchInputRef}
            />
            <button type="submit" className="search-button">
          

   <FontAwesomeIcon icon={faSearch}  />
            </button>
          </form>

          {isSearchActive && (
            <div className="searchSuggestionsContainer">
              <ul>
                {searchResults.map((results) => (
                  <li key={results._id || results.name} onClick={handleSuggestionClick}>
                    {results.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>
        {/* Desktop Icons */}
        <motion.div 
          className="nav-icons cart-profile"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
        >
          <Link to="/shoppingcart" className="icon-link" title="Shopping Cart">
            <FontAwesomeIcon icon={faShoppingCart} />
            <span className="cart-count">{useSelector((state) => state?.cart?.cart?.length)}</span>
          </Link>
        </motion.div>
        <motion.div 
          className="user-profile-section"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          <button
            className="icon-link profile-button"
            onClick={toggleProfileOverlay}
            title={userData ? 'Profile' : 'Login'}
          >
            <FontAwesomeIcon icon={faUser} />
          </button>

          {isProfileOverlayOpen && (
            <div className="profile-overlay">
              {userData ? (
                <>
                  <div className="profile-header">
                    <h4>Welcome back!</h4>
                    <p className="user-email">{userData.email}</p>
                  </div>
                  <div className="profile-actions">
                    <Link to="/orders" className="profile-action-btn" onClick={() => setIsProfileOverlayOpen(false)}>
                      My Orders
                    </Link>
                    <button className="profile-action-btn">Settings</button>
                    <button className="sign-out-button" onClick={handleSignOut}>
                      Sign Out
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="profile-header">
                    <h4>Welcome to Goods4U</h4>
                    <p>Please sign in to continue</p>
                  </div>
                  <div className="profile-actions">
                    <Link to="/LoginSignup" className="profile-action-btn">
                      Sign In
                    </Link>
                    <Link to="/LoginSignup" className="profile-action-btn secondary">
                      Create Account
                    </Link>
                  </div>
                </>
              )}
            </div>
          )}
        </motion.div>


        {/* Mobile Menu Button */}
        <motion.button
          className={`mobile-menu-button ${isMobileMenuOpen ? 'active' : ''}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 10, delay: 1.1 }}
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </motion.button>

        {/* Mobile Menu Overlay */}
        <div className={`mobile-menu-overlay ${isMobileMenuOpen ? 'active' : ''}`}>
        <div className="mobile-menu">
          <div className="mobile-menu-header">
            <h3>Menu</h3>
            <button
              className="mobile-menu-close"
              onClick={toggleMobileMenu}
              aria-label="Close mobile menu"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>

          {/* Mobile Search */}
          <div className="mobile-search">
            <form onSubmit={handleSearch} className="mobile-search-form">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="mobile-search-input"
              />
              <button type="submit" className="mobile-search-button">
               
                  
                <FontAwesomeIcon icon={faSearch} />
              
              </button>
            </form>

            {isSearchActive && (
              <div className="mobileSearchSuggestionsContainer">
                <ul>
                  {searchResults.map((results) => (
                    <li key={results._id || results.name} onClick={handleSuggestionClick}>
                      {results.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Mobile Navigation */}
          <ul className="nav-links-mobile">
            <li>
              <Link to="/" className="mobile-nav-link" onClick={closeMobileMenu}>
                <FontAwesomeIcon icon={faHome} />
                <span>Home</span>
              </Link>
            </li>
            <li>
              

          <Link to="/shoppingcart" className="mobile-nav-link" title="Shopping Cart">
            
            <FontAwesomeIcon icon={faShoppingCart} />
          
            <span> Shopping Cart</span>
          </Link>

            </li>



            <li className="mobile-dropdown">
              <button
                className="mobile-nav-link dropdown-toggle"
                onClick={() => toggleDropdown('mobile-categories')}
              >
                <FontAwesomeIcon icon={faShoppingBag} />
                <span>Categories</span>
                <FontAwesomeIcon
                  icon={activeDropdown === 'mobile-categories' ? faTimes : faBars}
                  className="dropdown-arrow"
                />
              </button>
              <ul className={`mobile-dropdown-menu ${activeDropdown === 'mobile-categories' ? 'active' : ''}`}>
                {categories.map((category) => (
                  <li key={category.name}>
                    <Link to={category.path} onClick={closeMobileMenu}>
                      <FontAwesomeIcon icon={category.icon} />
                      <span>{category.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            <li>
              <Link to="/about" className="mobile-nav-link" onClick={closeMobileMenu}>
                <FontAwesomeIcon icon={faInfoCircle} />
                <span>About</span>
              </Link>
            </li>
            <li>
              <Link to="/contact" className="mobile-nav-link" onClick={closeMobileMenu}>
                <FontAwesomeIcon icon={faEnvelope} />
                <span>Contact</span>
              </Link>
            </li>
          </ul>

          {/* Mobile Profile Section */}
          <div className="mobile-profile-section">
            {userData ? (
              <>
                <div className="mobile-user-info">
                  <FontAwesomeIcon icon={faUser} />
                  <div>
                    <p className="mobile-user-name">{userData.name || 'User'}</p>
                    <p className="mobile-user-email">{userData.email}</p>
                  </div>
                </div>
                <div className="mobile-profile-actions">
                  <Link to="/orders" className="mobile-profile-btn" onClick={closeMobileMenu}>
                    My Orders
                  </Link>
                  <button className="mobile-profile-btn">Settings</button>
                  <button className="mobile-sign-out-btn" onClick={handleSignOut}>
                    Sign Out
                  </button>
                </div>
              </>
            ) : (
              <div className="mobile-profile-actions">
                <Link to="/LoginSignup" className="mobile-profile-btn" onClick={closeMobileMenu}>
                  Sign In
                </Link>
                <Link to="/LoginSignup" className="mobile-profile-btn secondary" onClick={closeMobileMenu}>
                  Create Account
                </Link>
              </div>
            )}
          </div>
        </div>
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default Navbardesktop; 