import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'motion/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faShoppingBag, 
  faTruck, 
  faCheckCircle, 
  faClock, 
  faTimesCircle,
  faEye,
  faDownload,
  faRedo,
  faCalendarAlt,
  faMapMarkerAlt,
  faCreditCard,
  faBox,
  faSignInAlt,
  faUserPlus
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import Navbardesktop from './Navbar-desktop';
import Footer from './Footer';
import '../css/Orders.css';

const Orders = () => {
  const heroRef = useRef(null);
  const ordersRef = useRef(null);
  const statsRef = useRef(null);
  
  const isHeroInView = useInView(heroRef, { once: true, margin: "-100px 0px" });
  const isOrdersInView = useInView(ordersRef, { once: true, margin: "-100px 0px" });
  const isStatsInView = useInView(statsRef, { once: true, margin: "-100px 0px" });

  const [selectedFilter, setSelectedFilter] = useState('all');
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Mock orders data 
  const mockOrders = [
    {
      id: 'ORD-001',
      date: '2024-01-15',
      status: 'delivered',
      total: 299.99,
      items: 3,
      trackingNumber: 'TRK123456789',
      shippingAddress: '123 Main St, New York, NY 10001',
      paymentMethod: 'Credit Card ending in 1234',
      items: [
        { name: 'Nike Air Max 270', price: 150.00, quantity: 1, image: '/Images/product_1.png' },
        { name: 'Adidas Ultraboost 22', price: 99.99, quantity: 1, image: '/Images/product_2.png' },
        { name: 'Puma RS-X', price: 50.00, quantity: 1, image: '/Images/product_3.png' }
      ]
    },
    {
      id: 'ORD-002',
      date: '2024-01-12',
      status: 'shipped',
      total: 149.99,
      items: 2,
      trackingNumber: 'TRK987654321',
      shippingAddress: '456 Oak Ave, Los Angeles, CA 90210',
      paymentMethod: 'PayPal',
      items: [
        { name: 'Levi\'s 501 Jeans', price: 79.99, quantity: 1, image: '/Images/product_4.png' },
        { name: 'H&M T-Shirt', price: 70.00, quantity: 1, image: '/Images/product_5.png' }
      ]
    },
    {
      id: 'ORD-003',
      date: '2024-01-10',
      status: 'processing',
      total: 89.99,
      items: 1,
      trackingNumber: null,
      shippingAddress: '789 Pine St, Chicago, IL 60601',
      paymentMethod: 'Credit Card ending in 5678',
      items: [
        { name: 'Zara Blazer', price: 89.99, quantity: 1, image: '/Images/product_6.png' }
      ]
    },
    {
      id: 'ORD-004',
      date: '2024-01-08',
      status: 'cancelled',
      total: 199.99,
      items: 2,
      trackingNumber: null,
      shippingAddress: '321 Elm St, Miami, FL 33101',
      paymentMethod: 'Credit Card ending in 9012',
      items: [
        { name: 'Gucci Handbag', price: 199.99, quantity: 1, image: '/Images/product_7.png' }
      ]
    }
  ];

  useEffect(() => {
    // Check authentication
    const user = localStorage.getItem("User");
    console.log("Orders page - User from localStorage:", user);
    
    if (user) {
      try {
        const parsedUser = JSON.parse(user);
        console.log("Orders page - Parsed user:", parsedUser);
        setUserData(parsedUser);
        setIsAuthenticated(true);
        
        // Simulate API call for authenticated users
        setTimeout(() => {
          setOrders(mockOrders);
          setIsLoading(false);
        }, 1000);
      } catch (e) {
        console.error("Failed to parse user data from localStorage", e);
        setIsAuthenticated(false);
        setIsLoading(false);
      }
    } else {
      console.log("Orders page - No user found, showing login prompt");
      setIsAuthenticated(false);
      setIsLoading(false);
    }
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered':
        return faCheckCircle;
      case 'shipped':
        return faTruck;
      case 'processing':
        return faClock;
      case 'cancelled':
        return faTimesCircle;
      default:
        return faBox;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return '#27ae60';
      case 'shipped':
        return '#3498db';
      case 'processing':
        return '#f39c12';
      case 'cancelled':
        return '#e74c3c';
      default:
        return '#95a5a6';
    }
  };

  const filteredOrders = selectedFilter === 'all' 
    ? orders 
    : orders.filter(order => order.status === selectedFilter);

  const orderStats = {
    total: orders.length,
    delivered: orders.filter(o => o.status === 'delivered').length,
    shipped: orders.filter(o => o.status === 'shipped').length,
    processing: orders.filter(o => o.status === 'processing').length
  };

  // Login Prompt Component
  const LoginPrompt = () => (
    <div className="orders-page">
      <Navbardesktop />
      
      {/* Hero Section */}
      <section className="orders-hero-section">
        <div className="orders-hero-content">
          <h1 className="orders-hero-title">
            My Orders
          </h1>
          <p className="orders-hero-subtitle">
            Please sign in to view your orders
          </p>
        </div>
      </section>

      {/* Login Prompt Section */}
      <section className="orders-login-prompt-section">
        <div className="orders-login-prompt-container">
          <div className="orders-login-prompt-card">
            <div className="orders-login-prompt-icon">
              <FontAwesomeIcon icon={faSignInAlt} />
            </div>
            <h2 className="orders-login-prompt-title">
              Sign In Required
            </h2>
            <p className="orders-login-prompt-text">
              You need to be signed in to view your order history. Please sign in to your account or create a new one to continue.
            </p>
            <div className="orders-login-prompt-actions">
              <Link to="/LoginSignup" className="orders-login-prompt-btn orders-login-prompt-btn-primary">
                <FontAwesomeIcon icon={faSignInAlt} />
                Sign In
              </Link>
              <Link to="/LoginSignup" className="orders-login-prompt-btn orders-login-prompt-btn-secondary">
                <FontAwesomeIcon icon={faUserPlus} />
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );

  // Debug logging
  console.log("Orders page - isAuthenticated:", isAuthenticated);
  console.log("Orders page - isLoading:", isLoading);
  console.log("Orders page - userData:", userData);

  // Show loading state
  if (isLoading) {
    return (
      <div className="orders-page">
        <Navbardesktop />
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading your orders...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, show login prompt
  if (!isAuthenticated) {
    console.log("Orders page - Rendering login prompt");
    return <LoginPrompt />;
  }

  console.log("Orders page - Rendering orders page for authenticated user");
  console.log("Orders page - orders array:", orders);
  console.log("Orders page - orders length:", orders.length);
  return (
    <div className="orders-main-container">
      <Navbardesktop />
      
      {/* Hero Section */}
      <section className="orders-hero-section">
        <div className="orders-hero-content">
          <h1 className="orders-hero-title">
            My Orders
          </h1>
          <p className="orders-hero-subtitle">
            Track and manage all your orders in one place
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="orders-stats-section">
        <div className="orders-stats-container">
          <div className="orders-stats-grid">
            <div className="orders-stat-card">
              <div className="orders-stat-icon">
                <FontAwesomeIcon icon={faShoppingBag} />
              </div>
              <h3 className="orders-stat-number">{orderStats.total}</h3>
              <p className="orders-stat-label">Total Orders</p>
            </div>
            <div className="orders-stat-card">
              <div className="orders-stat-icon">
                <FontAwesomeIcon icon={faCheckCircle} />
              </div>
              <h3 className="orders-stat-number">{orderStats.delivered}</h3>
              <p className="orders-stat-label">Delivered</p>
            </div>
            <div className="orders-stat-card">
              <div className="orders-stat-icon">
                <FontAwesomeIcon icon={faTruck} />
              </div>
              <h3 className="orders-stat-number">{orderStats.shipped}</h3>
              <p className="orders-stat-label">Shipped</p>
            </div>
            <div className="orders-stat-card">
              <div className="orders-stat-icon">
                <FontAwesomeIcon icon={faClock} />
              </div>
              <h3 className="orders-stat-number">{orderStats.processing}</h3>
              <p className="orders-stat-label">Processing</p>
            </div>
          </div>
        </div>
      </section>

      {/* Orders Section */}
      <section className="orders-history-section">
        <div className="orders-history-container">
          <h2 className="orders-history-title">
            Order History
          </h2>
          
          {isLoading ? (
            <div className="orders-loading-container">
              <div className="orders-loading-spinner"></div>
              <p className="orders-loading-text">Loading your orders...</p>
            </div>
          ) : orders.length === 0 ? (
            <div className="orders-empty-state">
              <div className="orders-empty-icon">
                <FontAwesomeIcon icon={faShoppingBag} />
              </div>
              <h3 className="orders-empty-title">No orders found</h3>
              <p className="orders-empty-text">You don't have any orders yet.</p>
            </div>
          ) : (
            <div className="orders-list-container">
              {orders.map((order, index) => (
                <div key={order.id} className="orders-order-card">
                  <div className="orders-order-header">
                    <div className="orders-order-info">
                      <h3>Order #{order.id}</h3>
                      <div className="orders-order-meta">
                        <span className="orders-order-date">
                          <FontAwesomeIcon icon={faCalendarAlt} />
                          {new Date(order.date).toLocaleDateString()}
                        </span>
                        <span className="orders-order-total">${order.total.toFixed(2)}</span>
                      </div>
                    </div>
                    <div className={`orders-order-status orders-status-${order.status}`}>
                      <FontAwesomeIcon icon={getStatusIcon(order.status)} />
                      <span>{order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span>
                    </div>
                  </div>
                  
                  <div className="orders-order-items">
                    {order.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="orders-order-item">
                        <img src={item.image} alt={item.name} className="orders-item-image" />
                        <div className="orders-item-details">
                          <h4>{item.name}</h4>
                          <p>Quantity: {item.quantity}</p>
                          <p className="orders-item-price">${item.price.toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="orders-order-actions">
                    <button className="orders-action-btn orders-action-btn-primary">
                      <FontAwesomeIcon icon={faEye} />
                      View Details
                    </button>
                    {order.status === 'delivered' && (
                      <button className="orders-action-btn orders-action-btn-secondary">
                        <FontAwesomeIcon icon={faRedo} />
                        Reorder
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Orders;
