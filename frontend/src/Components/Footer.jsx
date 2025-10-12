import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import '../css/Footer.css';

const Footer = () => {
  const footerRef = useRef(null);
  const isInView = useInView(footerRef, { once: true, margin: "-100px 0px" });

  return (
    <motion.footer 
      ref={footerRef}
      className="footer"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <motion.div 
        className="footer-content"
        initial={{ y: 30, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <motion.div 
          className="footer-section"
          initial={{ x: -50, opacity: 0 }}
          animate={isInView ? { x: 0, opacity: 1 } : { x: -50, opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <motion.h3
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            About Us
          </motion.h3>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            Your trusted destination for premium fashion and lifestyle products. We bring you the latest trends with quality and style.
          </motion.p>
          <motion.div 
            className="social-links"
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            <motion.a href="#" className="social-link" whileHover={{ scale: 1.1, y: -2 }}>
              <FontAwesomeIcon icon={faFacebook} />
            </motion.a>
            <motion.a href="#" className="social-link" whileHover={{ scale: 1.1, y: -2 }}>
              <FontAwesomeIcon icon={faTwitter} />
            </motion.a>
            <motion.a href="#" className="social-link" whileHover={{ scale: 1.1, y: -2 }}>
              <FontAwesomeIcon icon={faInstagram} />
            </motion.a>
            <motion.a href="#" className="social-link" whileHover={{ scale: 1.1, y: -2 }}>
              <FontAwesomeIcon icon={faLinkedin} />
            </motion.a>
          </motion.div>
        </motion.div>

        <motion.div 
          className="footer-section"
          initial={{ y: 50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <motion.h3
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
          >
            Quick Links
          </motion.h3>
          <motion.ul 
            className="footer-links"
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <li><Link to="/">Home</Link></li>
            <li><Link to="/allproducts">Shop</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><a href="#blog">Blog</a></li>
          </motion.ul>
        </motion.div>

        <motion.div 
          className="footer-section"
          initial={{ y: 50, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <motion.h3
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
          >
            Customer Service
          </motion.h3>
          <motion.ul 
            className="footer-links"
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Shipping Policy</a></li>
            <li><a href="#">Return Policy</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms & Conditions</a></li>
          </motion.ul>
        </motion.div>

        <motion.div 
          className="footer-section"
          initial={{ x: 50, opacity: 0 }}
          animate={isInView ? { x: 0, opacity: 1 } : { x: 50, opacity: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          <motion.h3
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
          >
            Contact Us
          </motion.h3>
          <motion.div 
            className="contact-info"
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <p><FontAwesomeIcon icon={faMapMarkerAlt} /> 123 Fashion Street, New York, NY 10001</p>
            <p><FontAwesomeIcon icon={faPhone} /> +1 234 567 890</p>
            <p><FontAwesomeIcon icon={faEnvelope} /> info@goods4u.com</p>
          </motion.div>
        </motion.div>
      </motion.div>

      <motion.div 
        className="footer-bottom"
        initial={{ y: 30, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
        transition={{ duration: 0.6, delay: 1.3 }}
      >
        <p>&copy; 2024 Fashion Store. All rights reserved.</p>
      </motion.div>
    </motion.footer>
  );
};

export default Footer; 