import React, { useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faEnvelope, 
  faPhone, 
  faMapMarkerAlt, 
  faClock,
  faPaperPlane,
  faUser,
  faMessage,
  faCheckCircle
} from '@fortawesome/free-solid-svg-icons';
import Navbardesktop from './Navbar-desktop';
import Footer from './Footer';
import '../css/ContactUs.css';

const ContactUs = () => {
  const heroRef = useRef(null);
  const formRef = useRef(null);
  const infoRef = useRef(null);
  const mapRef = useRef(null);
  
  // Individual refs for each info card
  const emailCardRef = useRef(null);
  const phoneCardRef = useRef(null);
  const visitCardRef = useRef(null);
  const hoursCardRef = useRef(null);
  
  const isHeroInView = useInView(heroRef, { once: true, margin: "-100px 0px" });
  const isFormInView = useInView(formRef, { once: true, margin: "-100px 0px" });
  const isInfoInView = useInView(infoRef, { once: true, margin: "-100px 0px" });
  const isMapInView = useInView(mapRef, { once: true, margin: "-100px 0px" });
  
  // Individual triggers for each info card
  const isEmailCardInView = useInView(emailCardRef, { once: true, margin: "-50px 0px" });
  const isPhoneCardInView = useInView(phoneCardRef, { once: true, margin: "-50px 0px" });
  const isVisitCardInView = useInView(visitCardRef, { once: true, margin: "-50px 0px" });
  const isHoursCardInView = useInView(hoursCardRef, { once: true, margin: "-50px 0px" });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: faEnvelope,
      title: "Email Us",
      details: ["info@goods4u.com", "support@goods4u.com"],
      description: "Send us an email anytime"
    },
    {
      icon: faPhone,
      title: "Call Us",
      details: ["+1 234 567 890", "+1 234 567 891"],
      description: "Mon-Fri from 8am to 5pm"
    },
    {
      icon: faMapMarkerAlt,
      title: "Visit Us",
      details: ["123 Fashion Street", "New York, NY 10001"],
      description: "Come see our showroom"
    },
    {
      icon: faClock,
      title: "Business Hours",
      details: ["Mon-Fri: 8:00 AM - 6:00 PM", "Sat: 10:00 AM - 4:00 PM"],
      description: "We're here to help"
    }
  ];

  return (
    <div className="contactPage-contact-us-page">
    <Navbardesktop />
    
    {/* Hero Section */}
    <motion.section 
        ref={heroRef}
        className="contactPage-contact-hero"
        initial={{ opacity: 0, y: 50 }}
        animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8 }}
    >
        <div className="contactPage-hero-background"></div>
        <div className="contactPage-hero-content">
            <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                Get In Touch
            </motion.h1>
            <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 0.4 }}
            >
                We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </motion.p>
        </div>
    </motion.section>

    {/* Contact Form & Info Section */}
    <section className="contactPage-contact-main">
        <div className="contactPage-container">
            <div className="contactPage-contact-grid">
                
                {/* Contact Form */}
                <motion.div 
                    ref={formRef}
                    className="contactPage-contact-form-section"
                    initial={{ opacity: 0, x: -50 }}
                    animate={isFormInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="contactPage-form-container">
                        <h2>Send us a Message</h2>
                        <p>Fill out the form below and we'll get back to you within 24 hours.</p>
                        
                        {isSubmitted ? (
                            <motion.div 
                                className="contactPage-success-message"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                <FontAwesomeIcon icon={faCheckCircle} className="contactPage-success-icon" />
                                <h3>Message Sent Successfully!</h3>
                                <p>Thank you for contacting us. We'll get back to you soon.</p>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit} className="contactPage-contact-form">
                                <motion.div 
                                    className="contactPage-form-group"
                                    initial={{ opacity: 0, x: -30 }}
                                    animate={isFormInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                                    transition={{ duration: 0.6, delay: 0.1 }}
                                >
                                    <div className="contactPage-input-wrapper">
                                        <FontAwesomeIcon icon={faUser} className="contactPage-input-icon" />
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="Your Name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                </motion.div>

                                <motion.div 
                                    className="contactPage-form-group"
                                    initial={{ opacity: 0, x: -30 }}
                                    animate={isFormInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                                    transition={{ duration: 0.6, delay: 0.2 }}
                                >
                                    <div className="contactPage-input-wrapper">
                                        <FontAwesomeIcon icon={faEnvelope} className="contactPage-input-icon" />
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="Your Email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                </motion.div>

                                <motion.div 
                                    className="contactPage-form-group"
                                    initial={{ opacity: 0, x: -30 }}
                                    animate={isFormInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                                    transition={{ duration: 0.6, delay: 0.3 }}
                                >
                                    <div className="contactPage-input-wrapper">
                                        <FontAwesomeIcon icon={faMessage} className="contactPage-input-icon" />
                                        <input
                                            type="text"
                                            name="subject"
                                            placeholder="Subject"
                                            value={formData.subject}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                </motion.div>

                                <motion.div 
                                    className="contactPage-form-group"
                                    initial={{ opacity: 0, x: -30 }}
                                    animate={isFormInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                                    transition={{ duration: 0.6, delay: 0.4 }}
                                >
                                    <div className="contactPage-textarea-wrapper">
                                        <FontAwesomeIcon icon={faMessage} className="contactPage-input-icon" />
                                        <textarea
                                            name="message"
                                            placeholder="Your Message"
                                            rows="6"
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            required
                                        ></textarea>
                                    </div>
                                </motion.div>

                                <motion.button
                                    type="submit"
                                    className="contactPage-submit-btn"
                                    disabled={isLoading}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={isFormInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                                    transition={{ duration: 0.6, delay: 0.5 }}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    {isLoading ? (
                                        <div className="contactPage-loading-spinner"></div>
                                    ) : (
                                        <>
                                            <FontAwesomeIcon icon={faPaperPlane} />
                                            Send Message
                                        </>
                                    )}
                                </motion.button>
                            </form>
                        )}
                    </div>
                </motion.div>

                {/* Contact Information */}
                <motion.div 
                    ref={infoRef}
                    className="contactPage-contact-info-section"
                    initial={{ opacity: 0, x: 50 }}
                    animate={isInfoInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="contactPage-info-container">
                        <motion.h2
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInfoInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                            transition={{ duration: 0.8 }}
                        >
                            Contact Information
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInfoInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            Reach out to us through any of these channels.
                        </motion.p>
                        
                        <div className="contactPage-contact-info-grid">
                            {contactInfo.map((info, index) => {
                                // Get the appropriate ref and trigger for each card
                                const cardRef = [emailCardRef, phoneCardRef, visitCardRef, hoursCardRef][index];
                                const isCardInView = [isEmailCardInView, isPhoneCardInView, isVisitCardInView, isHoursCardInView][index];
                                
                                return (
                                    <motion.div
                                        key={index}
                                        ref={cardRef}
                                        className="contactPage-info-card"
                                        initial={{ opacity: 0, y: 30, scale: 0.9 }}
                                        animate={isCardInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.9 }}
                                        transition={{ duration: 0.6, ease: "easeOut" }}
                                        whileHover={{ y: -5, scale: 1.02, transition: { duration: 0.3 } }}
                                    >
                                        <motion.div 
                                            className="contactPage-info-icon"
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={isCardInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                                            transition={{ duration: 0.5, delay: 0.2 }}
                                        >
                                            <FontAwesomeIcon icon={info.icon} />
                                        </motion.div>
                                        <motion.div 
                                            className="contactPage-info-content"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={isCardInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                                            transition={{ duration: 0.6, delay: 0.3 }}
                                        >
                                            <h3>{info.title}</h3>
                                            <div className="contactPage-info-details">
                                                {info.details.map((detail, idx) => (
                                                    <motion.p 
                                                        key={idx}
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={isCardInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                                                        transition={{ duration: 0.4, delay: 0.4 + (idx * 0.1) }}
                                                    >
                                                        {detail}
                                                    </motion.p>
                                                ))}
                                            </div>
                                            <motion.p 
                                                className="contactPage-info-description"
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={isCardInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                                                transition={{ duration: 0.4, delay: 0.6 }}
                                            >
                                                {info.description}
                                            </motion.p>
                                        </motion.div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    </section>

    {/* Map Section */}
    <motion.section 
        ref={mapRef}
        className="contactPage-map-section"
        initial={{ opacity: 0, y: 50 }}
        animate={isMapInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8 }}
    >
        <div className="contactPage-container">
            <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={isMapInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8 }}
            >
                Find Us
            </motion.h2>
            <motion.div 
                className="contactPage-map-container"
                initial={{ opacity: 0, y: 50 }}
                animate={isMapInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.8, delay: 0.2 }}
            >
                <div className="contactPage-map-placeholder">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={isMapInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <FontAwesomeIcon icon={faMapMarkerAlt} className="contactPage-map-icon" />
                    </motion.div>
                    <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        animate={isMapInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                    >
                        Our Location
                    </motion.h3>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={isMapInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    >
                        123 Fashion Street, New York, NY 10001
                    </motion.p>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={isMapInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.8, delay: 0.7 }}
                    >
                        Visit our showroom to see our latest collections
                    </motion.p>
                </div>
            </motion.div>
        </div>
    </motion.section>

    <Footer />
</div>
  );
};

export default ContactUs;
