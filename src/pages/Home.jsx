// src/pages/Home.js
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { FaGoogle, FaStar } from 'react-icons/fa';
import { FiBook, FiCheck, FiClock, FiEye, FiMapPin, FiMessageSquare, FiStar, FiUsers } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { dayTripsData, getHomeShowcaseDayTrips } from '../DataTripsData';
import adobe1 from "../assets/image/more/adobe1.jpg";
import adobe10 from "../assets/image/more/adobe10.jpg";
import adobe12 from "../assets/image/more/adobe12.jpg";
import adobe13 from "../assets/image/more/adobe13.jpg";
import adobe14 from "../assets/image/more/adobe14.jpg";
import sec18 from "../assets/image/more/sec18.jpg";
import sec25 from "../assets/image/more/sec25.jpg";
import sec26 from "../assets/image/more/sec26.jpg";
import sec28 from "../assets/image/more/sec28.jpg";
import sec3 from "../assets/image/more/sec3.jpg";
import sec33 from "../assets/image/more/sec33.jpg";
import sec35 from "../assets/image/more/sec35.jpg";
import sec38 from "../assets/image/more/sec38.jpg";
import sec8 from "../assets/image/more/sec8.jpg";
import zanstoneLogo from "../assets/zanstoneLogo.png";
import BookingFormModal from "../components/BookingFormModal";
import ContactForm from "../components/ContactForm";
import CtaBanner from '../components/CtaBanner';
import Footer from '../components/Footer';
import GetInspired from '../components/GetInspired';
import Hero from '../components/Hero';
import QuickLinks from '../components/QuickLinks';
import SafariExperience from '../components/SafariExperience';
import Testimonials from '../components/Testimonials';
import UspBar from '../components/UspBar';
import VideoGallery from '../components/VideoGallery';
import WhyChoose from '../components/WhyChoose';
import { supabase } from '../supabase';
import { allTours } from '../tourData';

// Responsive breakpoints
const breakpoints = {
  mobile: '768px',
  tablet: '1024px',
  desktop: '1200px'
};

const MainContent = styled.main`
  padding-top: 0;
`;

const HeroAboutWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;

// Booking Form Section Styles
const BookingFormSection = styled.section`
  padding: 60px 20px;
  background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #FF7D33, #FF6B6B, #FF7D33);
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 40px 15px;
  }
`;

const BookingFormContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 50px;
  align-items: start;

  @media (max-width: ${breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 30px;
  }
`;

const BookingInfo = styled(motion.div)`
  h2 {
    font-size: 2.5rem;
    color: #1a202c;
    margin-bottom: 20px;
    font-weight: 700;
    background: linear-gradient(135deg, #FF7D33, #FF6B6B);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;

    @media (max-width: ${breakpoints.mobile}) {
      font-size: 2rem;
    }
  }

  p {
    font-size: 1.1rem;
    color: #4a5568;
    line-height: 1.6;
    margin-bottom: 25px;

    @media (max-width: ${breakpoints.mobile}) {
      font-size: 1rem;
    }
  }
`;

const InfoFeatures = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 30px;
`;

const InfoFeature = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  
  svg {
    color: #FF7D33;
    font-size: 1.2rem;
    flex-shrink: 0;
  }
  
  span {
    color: #2d3748;
    font-size: 1rem;
    
    @media (max-width: ${breakpoints.mobile}) {
      font-size: 0.95rem;
    }
  }
`;

const FormWrapper = styled(motion.div)`
  background: white;
  padding: 35px;
  border-radius: 20px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
  border: 1px solid #e2e8f0;

  @media (max-width: ${breakpoints.mobile}) {
    padding: 25px 20px;
  }
`;

const FormTitle = styled.h3`
  font-size: 1.5rem;
  color: #1a202c;
  margin-bottom: 25px;
  text-align: center;
  font-weight: 600;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 0.9rem;
  font-weight: 600;
  color: #2d3748;
`;

const Input = styled.input`
  padding: 12px 15px;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #FF7D33;
    box-shadow: 0 0 0 3px rgba(255, 125, 51, 0.1);
  }
`;

const Select = styled.select`
  padding: 12px 15px;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #FF7D33;
    box-shadow: 0 0 0 3px rgba(255, 125, 51, 0.1);
  }
`;

const TextArea = styled.textarea`
  padding: 12px 15px;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #FF7D33;
    box-shadow: 0 0 0 3px rgba(255, 125, 51, 0.1);
  }
`;

const SubmitButton = styled.button`
  background: linear-gradient(135deg, #FF7D33, #FF6B6B);
  color: white;
  padding: 14px;
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 10px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(255, 125, 51, 0.3);
  }
`;

const SuccessMessage = styled(motion.div)`
  background: #48bb78;
  color: white;
  padding: 15px;
  border-radius: 12px;
  text-align: center;
  margin-top: 15px;
`;

const ErrorMessage = styled(motion.div)`
  background: #f56565;
  color: white;
  padding: 15px;
  border-radius: 12px;
  text-align: center;
  margin-top: 15px;
`;

const DreamAvatar = styled.img`
  position: absolute;
  top: -22px;
  right: -22px;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  border: 4px solid #FF7D33;
  object-fit: cover;
  background: #fff;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
  z-index: 3;
`;

const AboutSection = styled.section`
  padding: 80px 20px;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  position: relative;

  @media (max-width: ${breakpoints.mobile}) {
    padding: 50px 15px;
  }
`;

const AboutContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const AboutTitle = styled(motion.h2)`
  font-size: 2.8rem;
  margin-bottom: 40px;
  color: #1a202c;
  text-align: center;
  font-weight: 700;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 100px;
    height: 4px;
    background: linear-gradient(90deg, #FF7D33, #FF6B6B);
    border-radius: 2px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 2.2rem;
    margin-bottom: 30px;
  }

  @media (max-width: 480px) {
    font-size: 1.9rem;
  }
`;

const AboutSubtitle = styled(motion.h3)`
  font-size: 1.8rem;
  color: #2d3748;
  margin: 40px 0 20px 0;
  font-weight: 600;
  text-align: center;
  
  @media (max-width: ${breakpoints.mobile}) {
    font-size: 1.5rem;
    margin: 30px 0 15px 0;
  }
`;

const AboutText = styled(motion.p)`
  font-size: 1.1rem;
  line-height: 1.8;
  color: #4a5568;
  margin-bottom: 25px;
  text-align: justify;
  
  &:last-child {
    margin-bottom: 0;
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 1rem;
    line-height: 1.7;
    margin-bottom: 20px;
  }
`;

// Tabs Container for Why Choose Us Section
const TabsContainer = styled.div`
  margin: 50px 0;
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
  
  @media (max-width: ${breakpoints.mobile}) {
    margin: 30px 0;
    border-radius: 15px;
  }
`;

const TabsHeader = styled.div`
  display: flex;
  background: linear-gradient(90deg, #FF7D33, #FF6B6B);
  overflow-x: auto;
  
  &::-webkit-scrollbar {
    height: 0;
  }
`;

const TabButton = styled.button`
  flex: 1;
  min-width: 200px;
  padding: 20px;
  background: ${props => props.active ? 'rgba(255, 255, 255, 0.2)' : 'transparent'};
  border: none;
  color: white;
  font-size: 1.1rem;
  font-weight: ${props => props.active ? '700' : '600'};
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  
  &:hover {
    background: rgba(255, 255, 255, 0.15);
  }
  
  @media (max-width: ${breakpoints.mobile}) {
    padding: 15px 10px;
    font-size: 1rem;
    min-width: 150px;
  }
  
  @media (max-width: 480px) {
    font-size: 0.9rem;
    padding: 12px 8px;
  }
`;

const TabContent = styled(motion.div)`
  padding: 40px;
  
  @media (max-width: ${breakpoints.mobile}) {
    padding: 25px 20px;
  }
  
  @media (max-width: 480px) {
    padding: 20px 15px;
  }
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 20px 0;
`;

const FeatureItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 15px;
  margin-bottom: 20px;
  padding: 15px;
  background: #f8fafc;
  border-radius: 12px;
  border-left: 4px solid #FF7D33;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  @media (max-width: ${breakpoints.mobile}) {
    padding: 12px;
    gap: 12px;
    margin-bottom: 15px;
  }
`;

const FeatureIcon = styled.div`
  background: linear-gradient(135deg, #FF7D33, #FF6B6B);
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  
  svg {
    color: white;
    font-size: 1.2rem;
  }
  
  @media (max-width: ${breakpoints.mobile}) {
    width: 32px;
    height: 32px;
    
    svg {
      font-size: 1rem;
    }
  }
`;

const FeatureText = styled.div`
  flex: 1;
  
  h4 {
    margin: 0 0 8px 0;
    color: #2d3748;
    font-size: 1.2rem;
    font-weight: 600;
    
    @media (max-width: ${breakpoints.mobile}) {
      font-size: 1.1rem;
      margin-bottom: 6px;
    }
  }
  
  p {
    margin: 0;
    color: #4a5568;
    line-height: 1.6;
    font-size: 1rem;
    
    @media (max-width: ${breakpoints.mobile}) {
      font-size: 0.95rem;
      line-height: 1.5;
    }
  }
`;

const Tagline = styled(motion.div)`
  text-align: center;
  margin: 40px 0;
  padding: 30px;
  background: linear-gradient(135deg, rgba(255, 125, 51, 0.1), rgba(255, 107, 107, 0.1));
  border-radius: 20px;
  border: 2px solid rgba(255, 125, 51, 0.2);
  
  p {
    font-size: 1.3rem;
    color: #2d3748;
    font-style: italic;
    font-weight: 500;
    line-height: 1.6;
    
    @media (max-width: ${breakpoints.mobile}) {
      font-size: 1.1rem;
    }
  }
  
  @media (max-width: ${breakpoints.mobile}) {
    margin: 30px 0;
    padding: 20px;
  }
`;

// Stats Section
const StatsSection = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin: 50px 0;
  
  @media (max-width: ${breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @media (max-width: ${breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: 15px;
    margin: 30px 0;
  }
`;

const StatCard = styled(motion.div)`
  background: white;
  padding: 25px;
  border-radius: 15px;
  text-align: center;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
  border: 1px solid #e2e8f0;
  
  @media (max-width: ${breakpoints.mobile}) {
    padding: 20px;
  }
`;

const StatNumber = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: #FF7D33;
  margin-bottom: 10px;
  
  @media (max-width: ${breakpoints.mobile}) {
    font-size: 2rem;
  }
`;

const StatLabel = styled.div`
  font-size: 1rem;
  color: #4a5568;
  font-weight: 500;
  
  @media (max-width: ${breakpoints.mobile}) {
    font-size: 0.9rem;
  }
`;

// Contact CTA
const ContactCTA = styled.div`
  text-align: center;
  margin-top: 50px;
  padding: 30px;
  background: linear-gradient(135deg, #FF7D33, #FF6B6B);
  border-radius: 20px;
  color: white;
  
  h3 {
    margin: 0 0 15px 0;
    font-size: 1.8rem;
    
    @media (max-width: ${breakpoints.mobile}) {
      font-size: 1.5rem;
    }
  }
  
  p {
    margin: 0 0 25px 0;
    font-size: 1.1rem;
    opacity: 0.95;
    
    @media (max-width: ${breakpoints.mobile}) {
      font-size: 1rem;
    }
  }
  
  @media (max-width: ${breakpoints.mobile}) {
    margin-top: 30px;
    padding: 25px 20px;
  }
`;

const CTALink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: white;
  color: #FF7D33;
  padding: 15px 30px;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 700;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
  }
  
  @media (max-width: ${breakpoints.mobile}) {
    padding: 12px 24px;
    font-size: 1rem;
  }
`;

const SectionDivider = styled.div`
  height: 100px;
  background: linear-gradient(to bottom, #f9f9f9, #fff);

  @media (max-width: ${breakpoints.mobile}) {
    height: 60px;
  }
`;

const CommentSection = styled.section`
  padding: 80px 20px;
  background: #f9f9f9;

  @media (max-width: ${breakpoints.mobile}) {
    padding: 50px 15px;
  }
`;

const CommentSectionTitle = styled(motion.h2)`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 50px;
  color: #333;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 3px;
    background: linear-gradient(90deg, #FF7D33, #FF6B6B);
    border-radius: 2px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 2rem;
    margin-bottom: 30px;
  }

  @media (max-width: 480px) {
    font-size: 1.75rem;
  }
`;

// Google Reviews Section - Horizontal Scroll
const GoogleReviewsSection = styled.section`
  padding: 60px 20px;
  background: white;
  overflow: hidden;
  position: relative;

  @media (max-width: ${breakpoints.mobile}) {
    padding: 40px 15px;
  }
`;

const GoogleReviewsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
`;

const GoogleReviewsScrollContainer = styled.div`
  display: flex;
  gap: 25px;
  overflow-x: auto;
  scroll-behavior: smooth;
  padding: 20px 10px 40px 10px;
  margin: 0 -10px;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    height: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: linear-gradient(90deg, #FF7D33, #FF6B6B);
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(90deg, #E56C2B, #E05555);
  }

  @media (max-width: ${breakpoints.mobile}) {
    gap: 15px;
    padding: 15px 5px 30px 5px;
    margin: 0 -5px;
  }
`;

const GoogleReviewCard = styled(motion.div)`
  background: white;
  border-radius: 16px;
  padding: 25px;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
  border: 1px solid #e8e8e8;
  transition: all 0.3s ease;
  min-width: 320px;
  max-width: 350px;
  flex-shrink: 0;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.12);
  }

  @media (max-width: ${breakpoints.mobile}) {
    min-width: 280px;
    max-width: 300px;
    padding: 20px;
    border-radius: 12px;
  }

  @media (max-width: 480px) {
    min-width: 260px;
    max-width: 280px;
    padding: 18px;
  }
`;

const GoogleReviewHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
`;

const ReviewerInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const ReviewerAvatar = styled.div`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: linear-gradient(135deg, #FF7D33, #E56C2B);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 1rem;
  flex-shrink: 0;

  @media (max-width: ${breakpoints.mobile}) {
    width: 40px;
    height: 40px;
    font-size: 0.9rem;
  }
`;

const ReviewerName = styled.div`
  h4 {
    margin: 0;
    font-size: 1rem;
    color: #333;
    font-weight: 600;
  }
  
  p {
    margin: 3px 0 0;
    color: #666;
    font-size: 0.85rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    h4 {
      font-size: 0.95rem;
    }
    
    p {
      font-size: 0.8rem;
    }
  }
`;

const GoogleRating = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  background: #f8f9fa;
  padding: 6px 10px;
  border-radius: 15px;
  
  span {
    color: #333;
    font-weight: 600;
    font-size: 0.95rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 5px 8px;
    
    span {
      font-size: 0.9rem;
    }
    
    svg {
      width: 14px;
      height: 14px;
    }
  }
`;

const ReviewText = styled.p`
  color: #555;
  line-height: 1.6;
  font-size: 0.95rem;
  margin-bottom: 15px;
  font-style: italic;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 0.9rem;
    line-height: 1.5;
    -webkit-line-clamp: 3;
    margin-bottom: 12px;
  }
`;

const ReviewDate = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #888;
  font-size: 0.85rem;
  
  svg {
    color: #4285F4;
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 0.8rem;
    
    svg {
      width: 14px;
      height: 14px;
    }
  }
`;

const ScrollButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 20px;

  @media (max-width: ${breakpoints.mobile}) {
    gap: 10px;
    margin-top: 15px;
  }
`;

const ScrollButton = styled.button`
  background: linear-gradient(135deg, #FF7D33, #E56C2B);
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 1.2rem;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 5px 15px rgba(255, 125, 51, 0.3);
  }

  &:disabled {
    background: #cccccc;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }

  @media (max-width: ${breakpoints.mobile}) {
    width: 35px;
    height: 35px;
    font-size: 1rem;
  }
`;

const ViewGoogleReviewsButton = styled.a`
  display: block;
  text-align: center;
  margin: 30px auto 0;
  background: #4285F4;
  color: white;
  padding: 12px 24px;
  border-radius: 10px;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  max-width: 280px;
  width: fit-content;

  &:hover {
    background: #3367D6;
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(66, 133, 244, 0.3);
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 10px 20px;
    font-size: 0.9rem;
    max-width: 250px;
    margin-top: 25px;
  }
`;

// Gallery Section Container
const GallerySection = styled.section`
  padding: 80px 20px;
  background: ${props => props.background || 'white'};

  @media (max-width: ${breakpoints.mobile}) {
    padding: 50px 15px;
  }
`;

const GallerySectionTitle = styled(motion.h2)`
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 50px;
  color: #333;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 3px;
    background: linear-gradient(90deg, #FF7D33, #FF6B6B);
    border-radius: 2px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 2rem;
    margin-bottom: 30px;
  }

  @media (max-width: 480px) {
    font-size: 1.75rem;
  }
`;

// Vertical Tours Section Styles
const VerticalToursSection = styled.section`
  padding: 80px 20px;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);

  @media (max-width: ${breakpoints.mobile}) {
    padding: 40px 15px;
  }
`;

const ToursContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  text-align: center;
  font-size: 2.5rem;
  color: #1a202c;
  margin-bottom: 50px;
  font-weight: 700;
  background: linear-gradient(135deg, #1a202c, #2d3748);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 2rem;
    margin-bottom: 30px;
  }

  @media (max-width: 480px) {
    font-size: 1.8rem;
  }
`;

const ToursGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 20px;
  padding: 20px 0;

  @media (min-width: 1400px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (max-width: 1399px) and (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }

  @media (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }

  @media (max-width: 380px) {
    grid-template-columns: 1fr;
    gap: 12px;
  }
`;

const TourCard = styled(motion.div)`
  background: white;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  position: relative;
  height: ${props => props.$isMobile ? '300px' : '400px'};
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-12px);
    box-shadow: 0 20px 50px rgba(255, 125, 51, 0.2);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #FF7D33, #FF6B6B, #FF7D33);
    z-index: 2;
  }

  @media (max-width: ${breakpoints.mobile}) {
    height: 280px;
    border-radius: 16px;
    
    &:hover {
      transform: translateY(-8px);
    }
  }

  @media (max-width: 480px) {
    height: 260px;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  overflow: hidden;
  height: ${props => props.$isMobile ? '150px' : '230px'};

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(42, 38, 34, 0.35) 0%, rgba(42, 38, 34, 0) 45%);
    pointer-events: none;
  }

  @media (max-width: ${breakpoints.mobile}) {
    height: 150px;
  }

  @media (max-width: 480px) {
    height: 135px;
  }
`;

const TourImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(1.12) saturate(1.05);
  transition: transform 0.5s ease;
  
  ${TourCard}:hover & {
    transform: scale(1.08);
  }
`;

const VIPBadge = styled.div`
  background: linear-gradient(135deg, #FFD700, #FFA500);
  color: #000;
  padding: 6px 10px;
  border-radius: 15px;
  font-size: 0.7rem;
  font-weight: 700;
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 3;
  box-shadow: 0 3px 10px rgba(255, 215, 0, 0.3);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  white-space: nowrap;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 0.6rem;
    padding: 4px 8px;
    border-radius: 12px;
    top: 8px;
    right: 8px;
  }

  @media (max-width: 480px) {
    font-size: 0.55rem;
    padding: 3px 6px;
  }
`;

const TourContent = styled.div`
  padding: ${props => props.$isMobile ? '5px 10px' : '8px 14px'};
  display: flex;
  flex-direction: column;
  flex: 1;
  justify-content: space-between;

  @media (max-width: ${breakpoints.mobile}) {
    padding: 5px 10px;
  }

  @media (max-width: 480px) {
    padding: 4px 8px;
  }
`;

const TourHeader = styled.div`
  margin-bottom: ${props => props.$isMobile ? '3px' : '4px'};
`;

const TourTitle = styled.h3`
  margin: 0;
  font-size: ${props => props.$isMobile ? '0.95rem' : '1.15rem'};
  color: #0f172a;
  line-height: 1.4;
  font-weight: 700;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  height: ${props => props.$isMobile ? '2.8em' : '2.8em'};
  background: linear-gradient(135deg, #1a202c 0%, #2d3748 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    font-size: 0.85rem;
    line-height: 1.25;
  }
`;

const TourPrice = styled.div`
  background: transparent;
  color: #FF7D33;
  padding: ${props => props.$isMobile ? '2px 0' : '4px 0'};
  border-radius: 0;
  font-weight: 700;
  font-size: ${props => props.$isMobile ? '0.85rem' : '1.05rem'};
  display: inline-block;
  box-shadow: none;
  margin-bottom: ${props => props.$isMobile ? '6px' : '8px'};
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 0.8rem;
    padding: 2px 0;
  }
`;

const TourDescription = styled.p`
  color: #718096;
  font-size: ${props => props.$isMobile ? '0.7rem' : '0.85rem'};
  line-height: 1.5;
  margin-bottom: ${props => props.$isMobile ? '10px' : '15px'};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  height: ${props => props.$isMobile ? '2.1em' : '2.55em'};

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 0.65rem;
  }
`;

const TourFeatures = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${props => props.$isMobile ? '4px' : '8px'};
  margin-bottom: ${props => props.$isMobile ? '3px' : '4px'};
`;

const Feature = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
  color: #4a5568;
  font-size: ${props => props.$isMobile ? '0.6rem' : '0.75rem'};
  font-weight: 500;
  
  svg {
    color: #FF7D33;
    flex-shrink: 0;
    width: ${props => props.$isMobile ? '9px' : '12px'};
    height: ${props => props.$isMobile ? '9px' : '12px'};
  }

  @media (max-width: 480px) {
    font-size: 0.55rem;
    
    svg {
      width: 8px;
      height: 8px;
    }
  }
`;

const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: ${props => props.$isMobile ? '8px' : '15px'};
  width: 100%;
`;

const CardActions = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  margin-top: auto;
  padding-top: 4px;
  border-top: 1px solid #f1ece6;
`;

const BookNowButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #FF7D33, #E56C2B);
  color: #ffffff;
  border: none;
  padding: ${props => props.$isMobile ? '6px 12px' : '6px 16px'};
  border-radius: 10px;
  text-decoration: none;
  font-weight: 700;
  font-size: ${props => props.$isMobile ? '0.75rem' : '0.9rem'};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  min-width: ${props => props.$isMobile ? '70px' : '100px'};
  box-shadow: 0 4px 15px rgba(255, 125, 51, 0.3);
  flex: 1;
  text-align: center;
  cursor: pointer;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 25px rgba(255, 125, 51, 0.5);
    letter-spacing: 0.5px;
  }

  @media (max-width: 480px) {
    padding: 7px 12px;
    font-size: 0.7rem;
    min-width: 60px;
  }
`;

const DetailsButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: 2px solid #FF7D33;
  color: #FF7D33;
  padding: ${props => props.$isMobile ? '6px 12px' : '6px 16px'};
  border-radius: 10px;
  text-decoration: none;
  font-weight: 700;
  font-size: ${props => props.$isMobile ? '0.75rem' : '0.9rem'};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  min-width: ${props => props.$isMobile ? '70px' : '100px'};
  text-align: center;
  flex: 1;

  &:hover {
    transform: translateY(-3px);
    background: rgba(255, 125, 51, 0.08);
    letter-spacing: 0.5px;
  }

  @media (max-width: 480px) {
    padding: 7px 12px;
    font-size: 0.7rem;
    min-width: 60px;
  }
`;

const ViewAllButton = styled(Link)`
  display: block;
  text-align: center;
  margin-top: 40px;
  background: linear-gradient(135deg, #FF7D33, #E56C2B);
  color: white;
  padding: 15px 30px;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 700;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  max-width: 200px;
  margin-left: auto;
  margin-right: auto;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 25px rgba(255, 125, 51, 0.4);
  }

  @media (max-width: ${breakpoints.mobile}) {
    margin-top: 30px;
    padding: 12px 24px;
    font-size: 1rem;
    max-width: 180px;
  }
`;

// Mobile Gallery Toggle
const MobileGalleryToggle = styled.div`
  display: none;
  
  @media (max-width: ${breakpoints.mobile}) {
    display: flex;
    justify-content: center;
    margin-bottom: 30px;
    gap: 10px;
  }
`;

const GalleryToggleButton = styled.button`
  background: ${props => props.active ? 'linear-gradient(135deg, #FF7D33, #E56C2B)' : 'white'};
  color: ${props => props.active ? 'white' : '#333'};
  border: 2px solid ${props => props.active ? 'transparent' : '#e2e8f0'};
  padding: 12px 24px;
  border-radius: 25px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: ${props => props.active ? '0 4px 15px rgba(255, 125, 51, 0.3)' : '0 2px 8px rgba(0, 0, 0, 0.1)'};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  }
`;

// Limited Gallery Preview
const GalleryPreview = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const LimitedGalleryContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 30px;

  @media (max-width: ${breakpoints.tablet}) {
    grid-template-columns: repeat(3, 1fr);
    gap: 15px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
  }
`;

const GalleryImage = styled(motion.div)`
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  height: 200px;
  cursor: pointer;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);

  &:hover {
    .gallery-overlay {
      opacity: 1;
    }
    
    img {
      transform: scale(1.05);
    }
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }

  @media (max-width: ${breakpoints.tablet}) {
    height: 180px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    height: 150px;
  }
`;

const GalleryOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
`;

const ViewMoreGalleryButton = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin: 40px auto 0;
  background: linear-gradient(135deg, #FF7D33, #E56C2B);
  color: white;
  padding: 15px 30px;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 700;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  max-width: 250px;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 25px rgba(255, 125, 51, 0.4);
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 12px 24px;
    font-size: 1rem;
    max-width: 200px;
  }
`;

// Image Modal Styles
const ImageModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 20px;
  backdrop-filter: blur(5px);
`;

const ImageModalContent = styled(motion.div)`
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);

  @media (max-width: ${breakpoints.mobile}) {
    max-width: 95vw;
    max-height: 85vh;
    border-radius: 8px;
  }
`;

const ImageModalImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  max-height: 85vh;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: rgba(0, 0, 0, 0.6);
  border: none;
  color: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.5rem;
  transition: all 0.3s ease;
  z-index: 2001;

  &:hover {
    background: rgba(0, 0, 0, 0.8);
    transform: scale(1.1);
  }

  @media (max-width: ${breakpoints.mobile}) {
    top: 10px;
    right: 10px;
    width: 35px;
    height: 35px;
    font-size: 1.2rem;
  }
`;

const ImageInfo = styled.div`
  padding: 15px 20px;
  background: white;
  text-align: center;
  border-top: 1px solid #e0e0e0;

  p {
    margin: 0;
    color: #666;
    font-size: 0.9rem;
    font-weight: 500;
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 12px 15px;
    
    p {
      font-size: 0.85rem;
    }
  }
`;

// Images Container for About Section
const AboutImagesContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 24px;
  margin-top: 40px;
  flex-wrap: wrap;

  @media (max-width: ${breakpoints.mobile}) {
    gap: 15px;
    margin-top: 30px;
  }
`;

const AboutImage = styled.img`
  width: 400px;
  height: 260px;
  object-fit: cover;
  border-radius: 18px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.12);
  
  @media (max-width: ${breakpoints.tablet}) {
    width: 300px;
    height: 200px;
  }
  
  @media (max-width: ${breakpoints.mobile}) {
    width: 100%;
    max-width: 350px;
    height: 200px;
  }
  
  @media (max-width: 480px) {
    max-width: 100%;
    height: 180px;
  }
`;

// Tour Category Toggle Styles
const TourToggleSection = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 50px;
  flex-wrap: wrap;

  @media (max-width: ${breakpoints.mobile}) {
    gap: 15px;
    margin-bottom: 30px;
  }

  @media (max-width: 480px) {
    gap: 10px;
  }
`;

const TourToggleButton = styled.button`
  padding: 20px 50px;
  font-size: 1.4rem;
  font-weight: 700;
  border: 2px solid #FF7D33;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
  background: ${props => props.active ? 'linear-gradient(135deg, #FF7D33, #E56C2B)' : 'white'};
  color: ${props => props.active ? 'white' : '#FF7D33'};
  box-shadow: ${props => props.active ? '0 8px 25px rgba(255, 125, 51, 0.3)' : '0 4px 12px rgba(255, 125, 51, 0.1)'};

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${props => props.active ? '0 12px 35px rgba(255, 125, 51, 0.4)' : '0 8px 20px rgba(255, 125, 51, 0.2)'};
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 16px 40px;
    font-size: 1.2rem;
  }

  @media (max-width: 480px) {
    padding: 14px 32px;
    font-size: 1.05rem;
  }
`;

// Day Trip Section Component
const DayTripSection = () => {
  const [dayTrips, setDayTrips] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= parseInt(breakpoints.mobile));
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Get eye-catching showcase day trips (safaris + Zanzibar) or first 8 tours
    const featured = getHomeShowcaseDayTrips(isMobile ? 6 : 8);
    setDayTrips(featured.length > 0 ? featured : dayTripsData.slice(0, isMobile ? 6 : 8));
  }, [isMobile]);

  // Helper function to format price display
  const formatPrice = (price) => {
    if (!price) return 'Contact';
    
    if (typeof price === 'string') {
      if (price === 'Contact for pricing') return 'Contact';
      if (price.length > 15) return 'Contact';
      return price;
    }
    
    if (typeof price === 'object') {
      const firstTier = Object.entries(price)[0];
      if (firstTier) {
        return firstTier[1];
      }
    }
    
    return 'Contact';
  };

  return (
    <>
    <VerticalToursSection id="day-trips" style={{ background: 'linear-gradient(135deg, #fff9f0 0%, #fff 100%)' }}>
      <ToursContainer>
        <SectionTitle style={{ background: 'linear-gradient(135deg, #4CAF50, #45a049)', WebkitBackgroundClip: 'text' }}>
          ☀️ Zanzibar Special Excursions
        </SectionTitle>
        
        <AboutText style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 40px' }}>
          Discover the best of Zanzibar in a single day! Our expertly curated day trips 
          offer authentic experiences, from cultural tours to marine adventures.
        </AboutText>

        <ToursGrid>
          {dayTrips.map((trip, index) => (
            <TourCard
              key={trip.id}
              $isMobile={isMobile}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <ImageContainer $isMobile={isMobile}>
                <TourImage 
                  src={trip.image} 
                  alt={trip.name}
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400&h=240&fit=crop';
                  }}
                />
                
                {trip.status && (
                  <VIPBadge style={{ 
                    background: 'linear-gradient(135deg, #FFD700, #FFA500)',
                    top: '10px',
                    right: '10px',
                    color: '#000'
                  }}>
                    ⭐ {trip.status}
                  </VIPBadge>
                )}
              </ImageContainer>

              <TourContent $isMobile={isMobile}>
                <TourHeader $isMobile={isMobile}>
                  <TourTitle $isMobile={isMobile}>{trip.name}</TourTitle>
                </TourHeader>

                <TourFeatures $isMobile={isMobile}>
                  {trip.duration && (
                    <Feature $isMobile={isMobile}>
                      <FiClock /> {typeof trip.duration === 'string' && trip.duration.includes('Full Day') ? 'Full Day' : trip.duration}
                    </Feature>
                  )}
                  {trip.groupSize && (
                    <Feature $isMobile={isMobile}>
                      <FiUsers /> {trip.groupSize}
                    </Feature>
                  )}
                </TourFeatures>

                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  paddingTop: '2px'
                }}>
                  <TourPrice $isMobile={isMobile} style={{ marginBottom: 0 }}>
                    {formatPrice(trip.price)}
                  </TourPrice>
                </div>

                <CardActions>
                  <BookNowButton
                    type="button"
                    $isMobile={isMobile}
                    onClick={() => setShowBookingModal(true)}
                  >
                    Book Now
                  </BookNowButton>

                  <DetailsButton 
                    to={`/TripsDetails/${trip.id}`}
                    $isMobile={isMobile}
                  >
                    View Details
                  </DetailsButton>
                </CardActions>
              </TourContent>
            </TourCard>
          ))}
        </ToursGrid>

        <ViewAllButton to="/dayTrips" style={{ background: 'linear-gradient(135deg, #4CAF50, #45a049)' }}>
          View All Trips
        </ViewAllButton>
      </ToursContainer>
    </VerticalToursSection>
    <AnimatePresence>
      <BookingFormModal open={showBookingModal} onClose={() => setShowBookingModal(false)} />
    </AnimatePresence>
    </>
  );
};

// Vertical Tours Component for Home Page
const VerticalTours = () => {
  const [featuredTours, setFeaturedTours] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [tourType, setTourType] = useState('zanzibar');

  const getFeaturedTours = () => {
    const allFeaturedTours = [];
    const categories = ['vip', 'private', 'sharing', 'optional'];
    
    categories.forEach(category => {
      if (allTours[category]) {
        const tours = allTours[category];
        // Filter by tour type
        const filteredTours = tours.filter(tour => {
          if (tourType === 'zanzibar') {
            return tour.location === 'Zanzibar' || !tour.location || tour.isBased === 'Zanzibar';
          } else if (tourType === 'daytrip') {
            return tour.category === 'daytrip' || tour.isDayTrip === true || tour.duration?.toLowerCase().includes('day');
          } else {
            return tour.location === 'Tanzania' || tour.isBased === 'Tanzania' || tour.name.includes('Safari') || tour.name.includes('Serengeti') || tour.name.includes('Crater');
          }
        });
        allFeaturedTours.push(...filteredTours);
      }
    });
    
    // If no tours found for selected type, show all tours
    if (allFeaturedTours.length === 0) {
      categories.forEach(category => {
        if (allTours[category]) {
          allFeaturedTours.push(...allTours[category]);
        }
      });
    }
    
    const shuffled = [...allFeaturedTours].sort(() => 0.5 - Math.random());
    
    if (isMobile) {
      return shuffled.slice(0, 6);
    }
    return shuffled.slice(0, 10);
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= parseInt(breakpoints.mobile));
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    const updateTours = () => {
      setFeaturedTours(getFeaturedTours());
    };
    
    updateTours();
    window.addEventListener('resize', updateTours);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('resize', updateTours);
    };
  }, [isMobile, tourType]);

  const getDescription = (tour) => {
    const isVipTour = tour.comprehensiveImage && tour.category === 'vip';
    if (isVipTour) return "VIP luxury experience with premium service";
    if (tour.description) {
      const maxLength = isMobile ? 60 : 80;
      return tour.description.length > maxLength 
        ? `${tour.description.substring(0, maxLength)}...` 
        : tour.description;
    }
    return "Premium tour experience with expert guides";
  };

  const getTime = (tour) => {
    const isVipTour = tour.comprehensiveImage && tour.category === 'vip';
    if (isVipTour) return "Flexible";
    if (tour.time) {
      return tour.time.includes('--') 
        ? tour.time.split('--')[0].trim() 
        : tour.time;
    }
    return "Flexible";
  };

  const getTourType = (tour) => {
    if (tour.category === 'vip') return 'VIP';
    if (tour.category === 'private') return 'Private';
    if (tour.category === 'sharing') return 'Group';
    if (tour.category === 'daytrip' || tour.isDayTrip) return 'Day Trip';
    return 'Tour';
  };

  const getPerPersonPrice = (tour) => {
    if (!tour.price) return 'Contact';
    
    const price = tour.price;
    
    // Get the first price option (everything before the "|" character)
    const firstPrice = price.split('|')[0].trim();
    
    return firstPrice || 'Contact';
  };

  const getImage = (tour) => {
    const isVipTour = tour.comprehensiveImage && tour.category === 'vip';
    if (isVipTour && tour.comprehensiveImage) {
      return tour.image;
    }
    return tour.image || tour.image;
  };

  const isVipTour = (tour) => {
    return tour.comprehensiveImage && tour.category === 'vip';
  };

  const isDayTrip = (tour) => {
    return tour.category === 'daytrip' || tour.isDayTrip === true;
  };

  const handleSafariClick = () => {
    document.getElementById('safari-experience')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDayTripClick = () => {
    document.getElementById('day-trips')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <VerticalToursSection id="tours">
      <ToursContainer>
        <TourToggleSection>
          <TourToggleButton
            active={tourType === 'daytrip'}
            onClick={handleDayTripClick}
          >
            ☀️ Zanzibar Trips
          </TourToggleButton>
          <TourToggleButton
            active={false}
            onClick={handleSafariClick}
            as="button"
          >
            🦁 Safari Tanzania
          </TourToggleButton>
        </TourToggleSection>
        
        <motion.div
          key={tourType}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4 }}
        >
          <ToursGrid>
            {featuredTours.map((tour, index) => (
            <TourCard
              key={tour.id}
              $isMobile={isMobile}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: index * 0.1,
                ease: "easeInOut" 
              }}
              whileHover={{ y: -5 }}
            >
              <ImageContainer $isMobile={isMobile}>
                <TourImage 
                  src={getImage(tour)} 
                  alt={tour.name}
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400&h=240&fit=crop';
                  }}
                />
                {isVipTour(tour) && <VIPBadge>⭐ Special</VIPBadge>}
                                {isDayTrip(tour) && <VIPBadge style={{ background: 'linear-gradient(135deg, #4CAF50, #45a049)' }}>☀️ Day Trip</VIPBadge>}
              </ImageContainer>

              <TourContent $isMobile={isMobile}>
                <TourHeader $isMobile={isMobile}>
                  <TourTitle $isMobile={isMobile}>{tour.name}</TourTitle>
                </TourHeader>

                <div style={{ flex: 1 }} />

                <div style={{ marginBottom: '12px' }}>
                  <TourPrice $isMobile={isMobile}>
                    {getPerPersonPrice(tour)}
                  </TourPrice>
                </div>

                <CardFooter $isMobile={isMobile}>
                  <DetailsButton 
                    to={`/tours/${tour.id}`}
                    $isMobile={isMobile}
                  >
                    View Details
                  </DetailsButton>
                </CardFooter>
              </TourContent>
            </TourCard>
          ))}
          </ToursGrid>
        </motion.div>

        {tourType === 'daytrip' ? (
                        <ViewAllButton to="/day-trips" style={{ background: 'linear-gradient(135deg, #4CAF50, #45a049)' }}>
            View All Day Trips
          </ViewAllButton>
        ) : (
          <ViewAllButton to="/tourSection">
            View All Tours
          </ViewAllButton>
        )}
      </ToursContainer>
    </VerticalToursSection>
  );
};

// Ultra-Slim Smooth Neumorphism Booking Form
const BookingFormComponent = () => {
  const [formData, setFormData] = useState({
    adults: '2',
    children: '0',
    arrivalDate: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeField, setActiveField] = useState(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const WHATSAPP_PHONE = '255616543216';
  
  const formatWhatsAppMessage = (data) => {
    const today = new Date().toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
    
    return `🏝️ *NEW TRIP REQUEST* 🏝️
    
👥 Adults: ${data.adults}
👶 Children: ${data.children}
📅 Arrival: ${data.arrivalDate || 'Not specified'}
🕐 Submitted: ${today}

*Ready to design this dream trip!* ✨`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.arrivalDate) {
      alert('Please select your arrival date');
      return;
    }
    const sanitizedData = {
      adults: formData.adults || '1',
      children: formData.children || '0',
      arrivalDate: formData.arrivalDate
    };
    setIsSubmitting(true);
    try {
      const message = formatWhatsAppMessage(sanitizedData);
      window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`, '_blank');
      setShowSuccess(true);
      setFormData({ adults: '2', children: '0', arrivalDate: '' });
      setTimeout(() => setShowSuccess(false), 4000);
    } catch (error) {
      alert('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFieldChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const inputStyle = (field) => ({
    width: '100%',
    boxSizing: 'border-box',
    padding: isMobile ? '9px 11px' : '10px 12px',
    border: `1px solid ${activeField === field ? '#FF7D33' : '#EFE3D6'}`,
    borderRadius: '6px',
    background: activeField === field ? 'rgba(255, 125, 51, 0.05)' : '#ffffff',
    color: '#18252d',
    fontSize: isMobile ? '0.92rem' : '0.95rem',
    fontWeight: 600,
    outline: 'none',
    transition: 'background 0.2s ease, border-color 0.2s ease'
  });

  const labelStyle = {
    display: 'block',
    color: '#FF7D33',
    textTransform: 'uppercase',
    fontSize: isMobile ? '0.68rem' : '0.72rem',
    fontWeight: 700,
    letterSpacing: '0.06em',
    marginBottom: '5px'
  };

  const fieldShellStyle = {
    minWidth: 0
  };

  const formCardStyle = {
    background: 'rgba(255, 255, 255, 0.97)',
    backdropFilter: 'blur(8px)',
    border: 'none',
    borderRadius: isMobile ? '12px' : '12px',
    padding: isMobile ? '22px 18px' : '28px',
    width: '100%',
    boxSizing: 'border-box',
    boxShadow: '0 25px 60px rgba(0, 0, 0, 0.3)',
    position: 'relative'
  };

  const submitStyle = {
    width: '100%',
    minHeight: isMobile ? '46px' : '50px',
    background: 'linear-gradient(135deg, #FF7D33, #E56C2B)',
    border: 'none',
    borderRadius: '8px',
    color: 'white',
    fontSize: isMobile ? '0.92rem' : '1rem',
    fontWeight: 700,
    letterSpacing: '0.04em',
    cursor: isSubmitting ? 'not-allowed' : 'pointer',
    opacity: isSubmitting ? 0.75 : 1,
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    boxShadow: '0 10px 25px rgba(255, 125, 51, 0.4)'
  };

  const trustTextStyle = {
    color: '#9ca3af',
    fontSize: isMobile ? '0.7rem' : '0.72rem',
    margin: '12px 0 0',
    textAlign: 'center',
    lineHeight: 1.45
  };

  const formGridStyle = {
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(2, minmax(0, 1fr))',
    gap: isMobile ? '10px' : '14px',
    marginBottom: isMobile ? '12px' : '14px'
  };

  return (
    <>
    <div style={formCardStyle}>
              <DreamAvatar src={zanstoneLogo} alt="ZanStone" />
              <div style={{
                marginBottom: isMobile ? '16px' : '22px',
                position: 'relative',
                zIndex: 2
              }}>
                <h2 style={{
                  color: '#2A2622',
                  fontSize: isMobile ? '1.3rem' : '1.5rem',
                  lineHeight: 1.25,
                  margin: 0,
                  fontWeight: 800
                }}>
                  LET'S PLAN YOUR
                  <br />
                  DREAM TRIP TOGETHER!
                </h2>
              </div>

              <form onSubmit={handleSubmit}>
                <div style={formGridStyle}>
                  <div style={fieldShellStyle}>
                    <label htmlFor="booking-adults" style={labelStyle}>ADULTS</label>
                    <input
                      id="booking-adults"
                      type="number"
                      inputMode="numeric"
                      min="1"
                      max="10"
                      value={formData.adults}
                      onChange={(e) => handleFieldChange('adults', e.target.value)}
                      onFocus={() => setActiveField('adults')}
                      onBlur={() => setActiveField(null)}
                      style={inputStyle('adults')}
                      placeholder="2"
                    />
                  </div>

                  <div style={fieldShellStyle}>
                    <label htmlFor="booking-children" style={labelStyle}>CHILDREN</label>
                    <input
                      id="booking-children"
                      type="number"
                      inputMode="numeric"
                      min="0"
                      max="8"
                      value={formData.children}
                      onChange={(e) => handleFieldChange('children', e.target.value)}
                      onFocus={() => setActiveField('children')}
                      onBlur={() => setActiveField(null)}
                      style={inputStyle('children')}
                      placeholder="0"
                    />
                  </div>
                </div>

                <div style={{ ...fieldShellStyle, marginBottom: isMobile ? '16px' : '18px' }}>
                  <label htmlFor="booking-arrival" style={labelStyle}>ARRIVAL DATE</label>
                  <input
                    id="booking-arrival"
                    type="date"
                    name="arrivalDate"
                    value={formData.arrivalDate}
                    onChange={(e) => handleFieldChange('arrivalDate', e.target.value)}
                    onFocus={() => setActiveField('date')}
                    onBlur={() => setActiveField(null)}
                    required
                    min={new Date().toISOString().split('T')[0]}
                    style={inputStyle('date')}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={submitStyle}
                  onMouseEnter={(e) => {
                    if (!isSubmitting) {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 16px 30px rgba(255, 125, 51, 0.34)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 12px 24px rgba(255, 125, 51, 0.28)';
                  }}
                >
                  {isSubmitting ? 'Opening WhatsApp...' : 'START CUSTOMIZING'}
                </button>

                <p style={trustTextStyle}>
                  No strings attached. We'll design your trip - no cost, no commitment.
                </p>
              </form>
            </div>

        {/* Success Toast - Slim */}
          {showSuccess && (
          <div style={{
            position: 'fixed',
            bottom: '24px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'linear-gradient(135deg, #00AA6C, #008C5A)',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '40px',
            fontSize: '12px',
            fontWeight: '600',
            zIndex: 1000,
            animation: 'slideUp 0.3s ease',
            whiteSpace: 'nowrap',
            boxShadow: '5px 5px 12px #c8c9ce, -5px -5px 12px #ffffff'
          }}>
            ✓ WhatsApp opened!
          </div>
        )}

      <style>
        {`
          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateX(-50%) translateY(15px);
            }
            to {
              opacity: 1;
              transform: translateX(-50%) translateY(0);
            }
          }
          
          input[type="date"]::-webkit-calendar-picker-indicator {
            cursor: pointer;
            opacity: 0.4;
          }
          
          input[type="date"]::-webkit-calendar-picker-indicator:hover {
            opacity: 0.8;
          }
          
          button {
            cursor: pointer;
          }
        `}
      </style>
    </>
  );
};
// Google Reviews Component
const GoogleReviews = () => {
  const scrollContainerRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const reviews = [
    {
      id: 1,
      name: "Catherine Lyimo",
      initials: "CL",
      rating: 5.0,
      date: "a weeks ago",
      review: "Zanstone tour is extremely good, high hospitality, caring for customers ensuring maximum efficiency and it provides good adventure and experience to visitors both from abroad and local visitors",
    },
    {
      id: 2,
      name: "Diana Renatus",
      initials: "DR",
      rating: 5.0,
      date: "a weeks ago",
      review: "I had a very experience with zan stone tours and safaris. they were friendly, helpful and professional. Everything was organized well and on time. I really enjoyed the tour and I recommend them.",
    },
    {
      id: 3,
      name: "Petro Kennedy",
      initials: "PK",
      rating: 5.0,
      date: "a weeks ago",
      review: "Zanstone Tours and Safaris delivered excellent service from start to finish. Very reliable, safe, and fun. We enjoyed every moment of our tour. Definitely worth it!",
    },
    {
      id: 4,
      name: "Samson Mataligana",
      initials: "SM",
      rating: 5.0,
      date: "a weeks ago",
      review: "Amazing services from ZanstoneTours and Safaris.from booking to tour day everything was perfectly organised on time.The guide was more than friendly,and more attentive to every need ,I truly enjoyed the journey , lots of joy,funny nd worthy.To everyone who needs to spend I recommend to use Zanstone Tours and Safaris.Thank you for fantasy and joyfully moments from you!",
    },
    {
      id: 5,
      name: "Baraka Robert",
      initials: "BR",
      rating: 5.0,
      date: "a weeks ago",
      review: "Amazing time in Zanzibar with my fiance, For sure we get what we want because of zanstone tours and safaris. I really recommend this company for anyone want to visit. Zanzibar hakuna matata 🫶🫶🫶🫶",
    },
    {
      id: 6,
      name: "Khadija Juma",
      initials: "KJ",
      rating: 5.0,
      date: "a weeks ago",
      review: "We had an unforgettable experience with Zanstone Tours and Safaris. Everything was perfectly planned from start to finish, and the guide went above and beyond to make sure we were comfortable and happy. This exceeded our expectations. I would definitely recommend them to anyone looking for a reliable and professional tour company. Thank you for the amazing memories!",
    }
  ];

  const checkScrollButtons = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    checkScrollButtons();
    const container = scrollContainerRef.current;
    
    if (container) {
      container.addEventListener('scroll', checkScrollButtons);
      window.addEventListener('resize', checkScrollButtons);
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', checkScrollButtons);
      }
      window.removeEventListener('resize', checkScrollButtons);
    };
  }, []);

  return (
    <GoogleReviewsSection id="google-reviews">
      <GoogleReviewsContainer>
        <SectionTitle>Google Reviews</SectionTitle>
        
        <GoogleReviewsScrollContainer ref={scrollContainerRef}>
          {reviews.map((review, index) => (
            <GoogleReviewCard
              key={review.id}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <GoogleReviewHeader>
                <ReviewerInfo>
                  <ReviewerAvatar>
                    {review.initials}
                  </ReviewerAvatar>
                  <ReviewerName>
                    <h4>{review.name}</h4>
                    <p>{review.location}</p>
                  </ReviewerName>
                </ReviewerInfo>
                <GoogleRating>
                  <FaStar color="#FFD700" size={16} />
                  <span>{review.rating}</span>
                </GoogleRating>
              </GoogleReviewHeader>
              
              <ReviewText>
                "{review.review}"
              </ReviewText>
              
              <ReviewDate>
                <FaGoogle size={14} />
                <span>{review.date}</span>
              </ReviewDate>
            </GoogleReviewCard>
          ))}
        </GoogleReviewsScrollContainer>

        <ScrollButtons>
          <ScrollButton 
            onClick={scrollLeft} 
            disabled={!canScrollLeft}
            aria-label="Scroll reviews left"
          >
            ←
          </ScrollButton>
          <ScrollButton 
            onClick={scrollRight} 
            disabled={!canScrollRight}
            aria-label="Scroll reviews right"
          >
            →
          </ScrollButton>
        </ScrollButtons>

        <ViewGoogleReviewsButton 
          href="https://www.google.co.tz/search?sca_esv=7e23b67cda9c6a45&sxsrf=ANbL-n6vn1e6YM5JahkcFehlLcXPplMuOQ:1770416660914&si=AL3DRZEsmMGCryMMFSHJ3StBhOdZ2-6yYkXd_doETEE1OR-qOXtDghIQFj-_6Q_OCkwW1RHOOVc_Z1ytez2Cy25jsxPnz9Lcp9JLE67Ndtnnk5ijdl_iFKC49-9he98IrD_CteNw12CXwJXR8dyZxTz0Oi4dDhiGUg%3D%3D&q=zanstone+tours+and+safaris+Reviews&sa=X&ved=2ahUKEwiLnLaB9MWSAxV73wIHHRRIAlgQ0bkNegQIJRAF&biw=958&bih=992&dpr=1" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          <FaGoogle size={18} />
          View All Reviews on Google
        </ViewGoogleReviewsButton>
      </GoogleReviewsContainer>
    </GoogleReviewsSection>
  );
};

// Combined Gallery Component for Mobile
const CombinedGallery = () => {
  const [activeGallery, setActiveGallery] = useState('images');
  const [isMobile, setIsMobile] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= parseInt(breakpoints.mobile));
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && selectedImage) {
        setSelectedImage(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedImage]);

  const sampleImages = [
    { id: 1, src: sec18, alt: 'Zanzibar Beach' },
    { id: 2, src: sec3, alt: 'Stone Town' },
    { id: 3, src: sec25, alt: 'Safari Experience' },
    { id: 4, src: sec38, alt: 'Spice Tour' },
    { id: 5, src: adobe10, alt: 'Adventure Tour' },
    { id: 6, src: sec33, alt: 'Cultural Experience' },
    { id: 7, src: sec35, alt: 'Beach Relaxation' },
    { id: 8, src: sec28, alt: 'Historical Tour' },
    { id: 9, src: sec26, alt: 'Wildlife Safari' },
    { id: 10, src: sec8, alt: 'Local Cuisine' },
    { id: 11, src: adobe1, alt: 'Scenic Views' },
    { id: 12, src: adobe12, alt: 'Sunset Experience' },
    { id: 13, src: adobe13, alt: 'Nightlife Experience' },
    { id: 14, src: adobe14, alt: 'Cultural Heritage' }
    
  ];

  if (!isMobile) {
    return (
      <GallerySection id="gallery">
        <GallerySectionTitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          Gallery
        </GallerySectionTitle>
        
        <GalleryPreview>
          <LimitedGalleryContainer>
            {sampleImages.map((image, index) => (
              <GalleryImage
                key={image.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedImage(image)}
              >
                <img src={image.src} alt={image.alt} />
                <GalleryOverlay className="gallery-overlay">
                  <FiEye size={30} color="white" />
                </GalleryOverlay>
              </GalleryImage>
            ))}
          </LimitedGalleryContainer>
          
          <ViewMoreGalleryButton to="/gallery">
            View More Photos
          </ViewMoreGalleryButton>
        </GalleryPreview>
      </GallerySection>
    );
  }

  return (
    <GallerySection id="gallery">
      <GallerySectionTitle
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        Gallery
      </GallerySectionTitle>
      
      <MobileGalleryToggle>
        <GalleryToggleButton
          active={activeGallery === 'images'}
          onClick={() => setActiveGallery('images')}
        >
          📸 Photos
        </GalleryToggleButton>
        <GalleryToggleButton
          active={activeGallery === 'videos'}
          onClick={() => setActiveGallery('videos')}
        >
          🎥 Videos
        </GalleryToggleButton>
      </MobileGalleryToggle>

      {activeGallery === 'images' && (
        <>
          <LimitedGalleryContainer>
            {sampleImages.slice(0, 6).map((image, index) => (
              <GalleryImage
                key={image.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => setSelectedImage(image)}
              >
                <img src={image.src} alt={image.alt} />
                <GalleryOverlay className="gallery-overlay">
                  <FiEye size={24} color="white" />
                </GalleryOverlay>
              </GalleryImage>
            ))}
          </LimitedGalleryContainer>
          
          <ViewMoreGalleryButton to="/gallery">
            View More Photos
          </ViewMoreGalleryButton>
        </>
      )}
      
      {activeGallery === 'videos' && <VideoGallery />}

      {selectedImage && (
        <ImageModalOverlay onClick={() => setSelectedImage(null)}>
          <ImageModalContent onClick={(e) => e.stopPropagation()}>
            <ImageModalImage src={selectedImage.src} alt={selectedImage.alt} />
            <ImageInfo>{selectedImage.alt}</ImageInfo>
            <CloseButton onClick={() => setSelectedImage(null)}>✕</CloseButton>
          </ImageModalContent>
        </ImageModalOverlay>
      )}
    </GallerySection>
  );
};

const Home = () => {
  const [activeTab, setActiveTab] = useState('intro');
  const [commentsUpdated, setCommentsUpdated] = useState(false);

  const tabs = [
    { id: 'intro', label: 'About Us' },
    { id: 'why', label: 'Why Choose Us' },
    { id: 'values', label: 'Our Values' },
    { id: 'commitment', label: 'Our Commitment' }
  ];

  const handleCommentAdded = () => {
    setCommentsUpdated(prev => !prev);
  };

  // Increment global visitor counter for home page visits via Supabase
  useEffect(() => {
    const incrementVisitor = async () => {
      try {
        // Increment counter in Supabase
        const { data, error } = await supabase
          .from('site_stats')
          .update({ count: supabase.rpc('increment', { counter_key: 'visits' }) })
          .eq('counter_key', 'visits')
          .select();

        // Fallback: if RPC doesn't work, do a manual increment
        if (!data || data.length === 0) {
          const { data: current } = await supabase
            .from('site_stats')
            .select('count')
            .eq('counter_key', 'visits')
            .single();

          if (current) {
            await supabase
              .from('site_stats')
              .update({ count: current.count + 1 })
              .eq('counter_key', 'visits');
            console.log('[visitor] incremented to', current.count + 1);
            window.dispatchEvent(new CustomEvent('visitorCountUpdated', { detail: current.count + 1 }));
          }
        } else {
          console.log('[visitor] incremented via RPC');
          window.dispatchEvent(new CustomEvent('visitorCountUpdated', { detail: data[0]?.count }));
        }
      } catch (err) {
        console.error('[visitor] increment error', err);
      }
    };

    incrementVisitor();
  }, []);

  return (
    <>
      <HeroAboutWrapper>
        <Hero bookingCard={<BookingFormComponent />} />
        <UspBar />
        <QuickLinks />

        {/* Day trips grid */}
        <DayTripSection />

        {/* Safaris strip */}
        <SafariExperience />

        <AboutSection id="about">
          <AboutContent>
            <AboutTitle
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            >
              Discover Zanzibar & Tanzania With Us
            </AboutTitle>

            {/* Main Introduction */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <AboutText>
                ZanStone Tours and Safaris is your trusted and dedicated travel partner for extraordinary journeys across Zanzibar and mainland Tanzania. We are passionate about creating authentic, meaningful, and unforgettable travel experiences that allow visitors to fully immerse themselves in the beauty, culture, and wildlife of East Africa.
              </AboutText>
              
              <AboutText>
                Our mission is to connect travelers with the true spirit of the region through carefully designed beach holidays, cultural explorations, and world-class wildlife safaris that leave lasting memories.
              </AboutText>
            </motion.div>

            {/* Stats Section */}
            <StatsSection>
              <StatCard
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <StatNumber>1000+</StatNumber>
                <StatLabel>Happy Travelers</StatLabel>
              </StatCard>
              
              <StatCard
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <StatNumber>30+</StatNumber>
                <StatLabel>Destinations</StatLabel>
              </StatCard>
              
              <StatCard
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <StatNumber>3+</StatNumber>
                <StatLabel>Years Experience</StatLabel>
              </StatCard>
              
              <StatCard
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <StatNumber>24/7</StatNumber>
                <StatLabel>Support</StatLabel>
              </StatCard>
            </StatsSection>

            {/* Tagline */}
            <Tagline
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <p>
                "At ZanStone Tours and Safaris, we believe that every traveler is unique. That is why we specialize in tailor-made itineraries that perfectly balance relaxation, adventure, culture, and discovery."
              </p>
            </Tagline>

            {/* Tabs Section */}
            <TabsContainer>
              <TabsHeader>
                {tabs.map((tab) => (
                  <TabButton
                    key={tab.id}
                    active={activeTab === tab.id}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    {tab.label}
                  </TabButton>
                ))}
              </TabsHeader>

              <AnimatePresence mode="wait">
                {activeTab === 'intro' && (
                  <TabContent
                    key="intro"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <AboutSubtitle>Experience the Magic with ZanStone Tours & Safaris</AboutSubtitle>

                    <AboutText>Your Premier Gateway to Zanzibar and Tanzania Safaris</AboutText>
                    
                    <AboutText>
Welcome to ZanStone Tours & Safaris, the best tour operator in Zanzibar dedicated to creating authentic, immersive, and unforgettable island adventures. Based in the historic Stone Town, we take pride in being the leading experts in curated Zanzibar holiday packages for 2026. Our mission is to show you the hidden soul of the Spice Islands, from our world-famous turquoise waters to the rich cultural heritage that defines our home.                </AboutText>
                    <AboutText>Exclusive Zanzibar Excursions & Water Adventures</AboutText>
                    <AboutText>
We specialize in a diverse range of activities tailored to every traveler’s dream. Dive into our Mnemba Island snorkeling trips to witness vibrant marine life, or relax on the pristine white sands of our Nakupenda Sandbank picnic tours. For culture enthusiasts, our private Stone Town walking tours and aromatic Zanzibar spice plantation excursions offer a deep dive into the island’s history and flavors. If you are seeking relaxation, experience the ultimate Nungwi and Kendwa sunset cruise on a traditional local dhow, or join our Safari Blue sharing tour for a full day of ocean exploration                </AboutText>
                  <AboutText>Wildlife Encounters & Nature Tours</AboutText>
                <AboutText>
Nature lovers can explore the rare flora and fauna of Jozani Forest, home to the endemic Red Colobus monkeys, or visit the Prison Island giant tortoises. One of our most unique highlights is the Salaam Cave turtle interaction, where you can swim with these majestic creatures in a natural aquarium. Whether it’s horse riding in the Zanzibar ocean or a Pungume Sandbank boat trip, we bring you closer to nature than ever before.
Seamless Safaris to Mainland Tanzania
                </AboutText>
                
                <AboutText>
Beyond the beaches, ZanStone Tours & Safaris bridges your island stay with the vast African wilderness. We provide seamless and affordable day safaris from Zanzibar to Mikumi National Park, often called "Little Serengeti." For those seeking a deeper adventure, we offer Selous Game Reserve (Nyerere National Park) safari packages, including overnight stays that capture the essence of the "Big Five."                </AboutText>
                
                <AboutText>
                  Why Choose ZanStone?
                </AboutText>
                 <AboutText>
At ZanStone, we prioritize your comfort and safety. From VIP Zanzibar airport transfers and private luxury transportation to budget-friendly sharing trips, we cater to solo travelers, couples on honeymoon, and families alike. Our expert local guides are not just professionals; they are storytellers who ensure a personalized experience with every mile.
Discover the best of Zanzibar and Tanzania safaris with ZanStone Tours & Safaris—where your dream vacation becomes a lifetime memory.
                </AboutText>
              </TabContent>
            )}

            {activeTab === 'why' && (
              <TabContent
                key="why"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <AboutSubtitle>Why Choose ZanStone Tours and Safaris? 🌍</AboutSubtitle>
                
                <AboutText>
At ZanStone, we prioritize your comfort and safety. From VIP Zanzibar airport transfers and private luxury transportation to budget-friendly sharing trips, we cater to solo travelers, couples on honeymoon, and families alike. Our expert local guides are not just professionals; they are storytellers who ensure a personalized experience with every mile.
Discover the best of Zanzibar and Tanzania safaris with ZanStone Tours & Safaris—where your dream vacation becomes a lifetime memory.
                </AboutText>

                <FeatureList>
                  <FeatureItem>
                    <FeatureIcon>
                      <FiMapPin />
                    </FeatureIcon>
                    <FeatureText>
                      <h4>Deep Local Expertise</h4>
                      <p>At ZanStone, we prioritize your comfort and safety. From VIP Zanzibar airport transfers and private luxury transportation to budget-friendly sharing trips, we cater to solo travelers, couples on honeymoon, and families alike. Our expert local guides are not just professionals; they are storytellers who ensure a personalized experience with every mile.
Discover the best of Zanzibar and Tanzania safaris with ZanStone Tours & Safaris—where your dream vacation becomes a lifetime memory.
</p>                    </FeatureText>
                  </FeatureItem>

                  <FeatureItem>
                    <FeatureIcon>
                      <FiUsers />
                    </FeatureIcon>
                    <FeatureText>
                      <h4>Tailor-Made & Flexible Itineraries</h4>
                      <p>Every traveler is unique. We specialize in customized Zanzibar itineraries, whether you are planning a luxury honeymoon, a family vacation, or a budget-friendly group tour. We design your journey around your pace, interests, and budget.</p>                    </FeatureText>
                  </FeatureItem>

                  <FeatureItem>
                    <FeatureIcon>
                      <FiStar />
                    </FeatureIcon>
                    <FeatureText>
                      <h4>Professional Licensed Guides</h4>
                      <p>Our team consists of licensed Zanzibar guides and experienced safari drivers who are passionate about storytelling. They bring destinations to life with deep insights into Swahili culture, marine life, and wildlife behavior, ensuring an educational and thrilling adventure.</p>
                    </FeatureText>
                  </FeatureItem>

                  <FeatureItem>
                    <FeatureIcon>
                      <FiCheck />
                    </FeatureIcon>
                    <FeatureText>
                      <h4>Safety, Comfort & Quality Gear</h4>
                      <p>Your safety is our priority. We provide well-maintained 4x4 safari vehicles, reliable and safe boats for ocean excursions, and high-quality snorkeling equipment. Plus, our private Zanzibar airport transfers ensure you travel in comfort from the moment you land.</p>
                    </FeatureText>
                  </FeatureItem>

                  <FeatureItem>
                    <FeatureIcon>
                      <FiBook />
                    </FeatureIcon>
                    <FeatureText>
                      <h4>Transparent Pricing – No Hidden Fees</h4>
                      <p>We believe in honesty. All our Zanzibar tour prices and safari packages are clearly detailed. What we promise is exactly what we deliver—no surprises, no hidden costs, just fair and transparent pricing.</p>
                    </FeatureText>
                  </FeatureItem>

                  <FeatureItem>
                    <FeatureIcon>
                      <FiMessageSquare />
                    </FeatureIcon>
                    <FeatureText>
                      <h4>Worldwide Trust & Reliability</h4>
                      <p>From Europe to America and Asia, travelers choose ZanStone for our professionalism and quick communication. Our high ratings and repeat guests are a testament to our commitment to excellence and authentic Tanzanian hospitality</p>
                    </FeatureText>
                  </FeatureItem>
                </FeatureList>
              </TabContent>
            )}

            {activeTab === 'values' && (
              <TabContent
                key="values"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <AboutSubtitle>Our Core Values</AboutSubtitle>
                
                <AboutText>
                  At ZanStone Tours and Safaris, our values are the foundation of everything we do:
                </AboutText>

                <FeatureList>
                  <FeatureItem>
                    <FeatureIcon>
                      <span>🌱</span>
                    </FeatureIcon>
                    <FeatureText>
                      <h4>Sustainable Tourism</h4>
                      <p>We are committed to responsible tourism that protects the environment and supports local communities.</p>
                    </FeatureText>
                  </FeatureItem>

                  <FeatureItem>
                    <FeatureIcon>
                      <span>🤝</span>
                    </FeatureIcon>
                    <FeatureText>
                      <h4>Authentic Experiences</h4>
                      <p>We connect travelers with genuine cultural experiences and authentic local interactions.</p>
                    </FeatureText>
                  </FeatureItem>

                  <FeatureItem>
                    <FeatureIcon>
                      <span>💙</span>
                    </FeatureIcon>
                    <FeatureText>
                      <h4>Passion for Service</h4>
                      <p>We are passionate about creating memorable experiences and exceed expectations in every journey.</p>
                    </FeatureText>
                  </FeatureItem>
                </FeatureList>
              </TabContent>
            )}

            {activeTab === 'commitment' && (
              <TabContent
                key="commitment"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <AboutSubtitle>Our Commitment to You</AboutSubtitle>
                
                <AboutText>
                  With ZanStone Tours and Safaris, your dream journey in Zanzibar and Tanzania becomes a reality — crafted with care, guided with expertise, and filled with unforgettable moments. 🌴🦁🌊
                </AboutText>

                <AboutText>
                  We are committed to:
                </AboutText>

                <FeatureList>
                  <FeatureItem>
                    <FeatureIcon>
                      <FiCheck />
                    </FeatureIcon>
                    <FeatureText>
                      <h4>Personalized Attention</h4>
                      <p>We listen to your needs and preferences to create the perfect itinerary for you.</p>
                    </FeatureText>
                  </FeatureItem>

                  <FeatureItem>
                    <FeatureIcon>
                      <FiCheck />
                    </FeatureIcon>
                    <FeatureText>
                      <h4>24/7 Support</h4>
                      <p>We are available round the clock to assist you during your journey.</p>
                    </FeatureText>
                  </FeatureItem>

                  <FeatureItem>
                    <FeatureIcon>
                      <FiCheck />
                    </FeatureIcon>
                    <FeatureText>
                      <h4>Quality Assurance</h4>
                      <p>We continuously monitor and improve our services to ensure the highest quality.</p>
                    </FeatureText>
                  </FeatureItem>
                </FeatureList>
              </TabContent>
            )}
          </AnimatePresence>
        </TabsContainer>

      
      </AboutContent>
    </AboutSection>
      </HeroAboutWrapper>
      
      <Testimonials key={commentsUpdated}/>
      <GoogleReviews />
      <CommentSection id="reviews">
        <CommentSectionTitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          Share Your Experience
        </CommentSectionTitle>
        <ContactForm onCommentAdded={handleCommentAdded} />
      </CommentSection>

      <WhyChoose />

      <GetInspired />

      <SectionDivider />

      <CombinedGallery />

      <CtaBanner />
      
      <Footer />
    </>
  );
};

export default Home;
