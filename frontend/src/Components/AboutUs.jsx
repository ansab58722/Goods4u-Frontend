import React from 'react';
import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import Navbardesktop from './Navbar-desktop';
import Footer from './Footer';
import '../css/AboutUs.css';
import introVideo from '../vedios/intro.mp4';
import teamImage1 from '../Images/1.jpg';
import teamImage2 from '../Images/2.jpg';
import teamImage3 from '../Images/3.jpg';
import teamImage4 from '../Images/4.jpg';

const AboutUs = () => {
  const heroRef = useRef(null);
  const storyRef = useRef(null);
  const valuesRef = useRef(null);
  const teamRef = useRef(null);
  
  const isHeroInView = useInView(heroRef, { once: true, margin: "-100px 0px" });
  const isStoryInView = useInView(storyRef, { once: true, margin: "-100px 0px" });
  const isValuesInView = useInView(valuesRef, { once: true, margin: "-100px 0px" });
  const isTeamInView = useInView(teamRef, { once: true, margin: "-100px 0px" });

  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      image: teamImage1,
      description: "Passionate about fashion and sustainability, Sarah founded Goods4U with a vision to make premium fashion accessible to everyone."
    },
    {
      name: "Michael Chen",
      role: "Head of Design",
      image: teamImage2, 
      description: "With over 10 years in fashion design, Michael ensures every product meets our high standards of quality and style."
    },
    {
      name: "Emily Rodriguez",
      role: "Customer Experience Director",
      image: teamImage3,
      description: "Emily leads our customer service team, ensuring every customer has an exceptional shopping experience."
    },
    {
      name: "David Wilson",
      role: "Marketing Director",
      image: teamImage4,
      description: "David brings innovative marketing strategies to help Goods4U reach new audiences and build lasting customer relationships."
    }
  ];

  const values = [
    {
      icon: "🎯",
      title: "Quality First",
      description: "We never compromise on quality. Every product is carefully selected and tested to meet our high standards."
    },
    {
      icon: "🌱",
      title: "Sustainability",
      description: "We're committed to sustainable fashion practices and supporting eco-friendly brands and materials."
    },
    {
      icon: "💝",
      title: "Customer Care",
      description: "Your satisfaction is our priority. We provide exceptional service and support throughout your journey."
    },
    {
      icon: "🚀",
      title: "Innovation",
      description: "We embrace new technologies and trends to bring you the latest in fashion and shopping experience."
    }
  ];

  return (
   <div className="aboutUs-page">
      <Navbardesktop />
      
      {/* Hero Section */}
      <motion.section 
        ref={heroRef}
        className="aboutUs-hero"
        initial={{ opacity: 0, y: 50 }}
        animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8 }}
      >
        <div className="aboutUs-hero-background"></div>
        <div className="aboutUs-hero-content">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            About Goods4U
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Your trusted partner in premium fashion and lifestyle
          </motion.p>
        </div>
      </motion.section>

      {/* Our Story Section */}
      <motion.section 
        ref={storyRef}
        className="aboutUs-our-story"
        initial={{ opacity: 0, y: 50 }}
        animate={isStoryInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8 }}
      >
        <div className="aboutUs-container">
          <div className="aboutUs-story-content">
            <div className="aboutUs-story-text">
              <motion.h2
                initial={{ opacity: 0, x: -30 }}
                animate={isStoryInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Our Story
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, x: -30 }}
                animate={isStoryInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Founded in 2020, Goods4U began as a small startup with a big dream: to make premium fashion 
                accessible to everyone. What started as a passion project has grown into a trusted platform 
                serving thousands of customers worldwide.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, x: -30 }}
                animate={isStoryInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                We believe that everyone deserves to look and feel their best, regardless of their budget. 
                That's why we carefully curate our collection, partnering with the best brands to bring you 
                quality products at unbeatable prices.
              </motion.p>
            </div>
            <motion.div 
              className="aboutUs-story-video"
              initial={{ opacity: 0, x: 30 }}
              animate={isStoryInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <video 
                src={introVideo}
                autoPlay
                muted
                loop
                playsInline
                className="aboutUs-intro-video"
              />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Our Values Section */}
      <motion.section 
        ref={valuesRef}
        className="aboutUs-our-values"
        initial={{ opacity: 0, y: 50 }}
        animate={isValuesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8 }}
      >
        <div className="aboutUs-container">
          <motion.h2
            className="aboutUs-section-title"
            initial={{ opacity: 0, y: 30 }}
            animate={isValuesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Our Values
          </motion.h2>
          <div className="aboutUs-values-grid">
            {values.map((value, index) => (
              <motion.div
                key={index}
                className="aboutUs-value-card"
                initial={{ opacity: 0, y: 30 }}
                animate={isValuesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 0.4 + (index * 0.1) }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <div className="aboutUs-value-icon">{value.icon}</div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Our Team Section */}
      <motion.section 
        ref={teamRef}
        className="aboutUs-our-team"
        initial={{ opacity: 0, y: 50 }}
        animate={isTeamInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8 }}
      >
        <div className="aboutUs-container">
          <motion.h2
            className="aboutUs-section-title"
            initial={{ opacity: 0, y: 30 }}
            animate={isTeamInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Meet Our Team
          </motion.h2>
          <div className="aboutUs-team-grid">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                className="aboutUs-team-card"
                initial={{ opacity: 0, y: 30 }}
                animate={isTeamInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 0.4 + (index * 0.1) }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <div className="aboutUs-team-image">
                  <img src={member.image} alt={member.name} />
                </div>
                <div className="aboutUs-team-info">
                  <h3>{member.name}</h3>
                  <p className="aboutUs-team-role">{member.role}</p>
                  <p className="aboutUs-team-description">{member.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Stats Section */}
      <motion.section 
        className="aboutUs-stats-section"
        initial={{ opacity: 0, y: 50 }}
        animate={isTeamInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <div className="aboutUs-container">
          <div className="aboutUs-stats-grid">
            <motion.div 
              className="aboutUs-stat-item"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isTeamInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <h3>50K+</h3>
              <p>Happy Customers</p>
            </motion.div>
            <motion.div 
              className="aboutUs-stat-item"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isTeamInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <h3>1000+</h3>
              <p>Products</p>
            </motion.div>
            <motion.div 
              className="aboutUs-stat-item"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isTeamInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.8, delay: 1.0 }}
            >
              <h3>50+</h3>
              <p>Brands</p>
            </motion.div>
            <motion.div 
              className="aboutUs-stat-item"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isTeamInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.8, delay: 1.1 }}
            >
              <h3>24/7</h3>
              <p>Support</p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
};

export default AboutUs;
