import React, { useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import './../css/Faqs.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

const faqsData = [
    {
        question: 'What is your return policy?',
        answer: 'You can return any item within 30 days of purchase for a full refund. The item must be unused and in its original packaging. Please visit our returns page for more details.'
    },
    {
        question: 'How do I track my order?',
        answer: 'Once your order has shipped, you will receive an email with a tracking number and a link to the carrier\'s website. You can use this to track your package in real-time.'
    },
    {
        question: 'Do you offer international shipping?',
        answer: 'Yes, we ship to over 50 countries worldwide. Shipping costs and delivery times vary depending on the destination. Please check our shipping policy for more information.'
    },
    {
        question: 'What payment methods do you accept?',
        answer: 'We accept all major credit cards (Visa, MasterCard, American Express), as well as PayPal, Apple Pay, and Google Pay for a secure and easy checkout experience.'
    }
];

const FaqItem = ({ faq, index, toggleFAQ }) => {
    return (
        <div className={`faq-item ${faq.open ? 'open' : ''}`} onClick={() => toggleFAQ(index)}>
            <div className="faq-question">
                <h4>{faq.question}</h4>
                <FontAwesomeIcon icon={faq.open ? faMinus : faPlus} />
            </div>
            <div className="faq-answer">
                <p>{faq.answer}</p>
            </div>
        </div>
    );
};

const Faqs = () => {
    const faqsRef = useRef(null);
    const isInView = useInView(faqsRef, { once: true, margin: "-100px 0px" });
    const [faqs, setFaqs] = useState(faqsData.map(faq => ({ ...faq, open: false })));

    const toggleFAQ = index => {
        setFaqs(
            faqs.map((faq, i) => {
                if (i === index) {
                    faq.open = !faq.open;
                } else {
                    faq.open = false; // This makes it an accordion
                }
                return faq;
            })
        );
    };

    return (
        <motion.div 
            ref={faqsRef}
            className="faqs-section"
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            <motion.h2 
                className="lp-section-title"
                initial={{ y: 30, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                Frequently Asked Questions
            </motion.h2>
            <motion.div 
                className="faqs-container"
                initial={{ y: 30, opacity: 0 }}
                animate={isInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
            >
                {faqs.map((faq, i) => (
                    <motion.div
                        key={i}
                        initial={{ y: 20, opacity: 0 }}
                        animate={isInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 + i * 0.1 }}
                    >
                        <FaqItem faq={faq} index={i} toggleFAQ={toggleFAQ} />
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
    );
};

export default Faqs; 