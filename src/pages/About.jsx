// src/pages/About.js
import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  FaUsers, 
  FaMapMarkerAlt, 
  FaStar, 
  FaAward,
  FaQuoteLeft,
  FaQuoteRight,
  FaPaperPlane,
  FaCheckCircle,
  FaHeart,
  FaGlobeAfrica,
  FaHandsHelping,
  FaLeaf,
  FaShieldAlt,
  FaUmbrellaBeach,
  FaMonument,
  FaSeedling,
  FaFish,
  FaRing,
  FaUsers as FaFamily,
  FaSchool,
  FaCar,
  FaMagic,
  FaHandshake,
  FaCompass,
  FaMapSigns
} from 'react-icons/fa';
import SectionTitle from '../components/SectionTitle';
import Footer from '../components/Footer';
import TeamBg from '../assets/image/teamBg.jpg';
import { teamMembers } from '../data';
import { color } from '../styles/color';

// Responsive breakpoints
const breakpoints = {
  mobile: '768px',
  tablet: '1024px',
  desktop: '1200px'
};

const AboutContainer = styled.div`
  background: linear-gradient(180deg, #f9f9f9 0%, #ffffff 100%);
  min-height: 100vh;
`;

const HeroSection = styled.section`
  padding: 158px 20px 90px;
  background: linear-gradient(135deg, rgba(44, 85, 48, 0.95), rgba(76, 175, 80, 0.85)),
              url(${TeamBg}) center/cover no-repeat;
  color: white;
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(0,0,0,0.3), rgba(0,0,0,0.1));
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 118px 15px 60px;
  }
`;

const HeroTitle = styled(motion.h1)`
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 20px;
  position: relative;
  z-index: 2;
  color: #ffffff;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3);

  @media (max-width: ${breakpoints.tablet}) {
    font-size: 2.8rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 2.3rem;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const HeroSubtitle = styled(motion.p)`
  font-size: 1.3rem;
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
  opacity: 0.95;
  position: relative;
  z-index: 2;
  font-weight: 300;
  font-style: italic;
  color: #fff8f0;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 1.1rem;
    padding: 0 10px;
  }
`;

const ContentWrapper = styled.div`
  width: 100%;
`;

// Full-width alternating section band (white / cream)
const SectionBand = styled.section`
  width: 100%;
  padding: 80px 20px;

  @media (max-width: ${breakpoints.mobile}) {
    padding: 55px 15px;
  }
`;

// Section Wrapper
const SectionWrapper = styled(motion.div)`
  max-width: 1200px;
  margin: 0 auto;

  > * {
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
  }
`;

// Section Header
const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: 50px;

  h2 {
    font-size: 2.5rem;
    color: ${color.heading};
    margin-bottom: 20px;
    font-weight: 700;
    position: relative;
    padding-bottom: 18px;

    &::after {
      content: '';
      position: absolute;
      left: 50%;
      bottom: 0;
      transform: translateX(-50%);
      width: 40px;
      height: 3px;
      background: ${color.primary};
      border-radius: 2px;
    }

    @media (max-width: ${breakpoints.mobile}) {
      font-size: 2rem;
    }
  }

  .section-subtitle,
  h5.section-subtitle {
    font-size: 1.2rem;
    color: ${color.textMuted};
    max-width: 800px;
    margin: 0 auto;
    line-height: 1.6;
    font-style: italic;

    @media (max-width: ${breakpoints.mobile}) {
      font-size: 1.1rem;
    }
  }

  p {
    font-size: 1.05rem;
    color: ${color.textDark};
    max-width: 850px;
    margin: 12px auto 0;
    line-height: 1.7;
  }
`;

// Content with Icon
const ContentWithIcon = styled(motion.div)`
  display: flex;
  align-items: flex-start;
  gap: 30px;
  margin-bottom: 40px;
  padding: 30px;
  background: rgba(248, 249, 250, 0.6);
  border-radius: 14px;
  border: 1px solid ${color.border};
  box-shadow: 0 8px 24px rgba(42, 38, 34, 0.05);

  @media (max-width: ${breakpoints.mobile}) {
    flex-direction: column;
    gap: 20px;
    padding: 25px 20px;
  }

  .content-icon {
    flex-shrink: 0;
    width: 64px;
    height: 64px;
    border-radius: 50%;
    color: ${color.primary};
    font-size: 1.8rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 4px;

    @media (max-width: ${breakpoints.mobile}) {
      font-size: 1.6rem;
      margin-top: 0;
    }
  }

  .content-text {
    flex: 1;

    h3 {
      font-size: 1.8rem;
      color: ${color.heading};
      margin-bottom: 15px;
      font-weight: 600;

      @media (max-width: ${breakpoints.mobile}) {
        font-size: 1.5rem;
      }
    }

    p {
      font-size: 1.1rem;
      line-height: 1.8;
      color: ${color.textDark};
      margin-bottom: 15px;

      @media (max-width: ${breakpoints.mobile}) {
        font-size: 1.05rem;
      }
    }

    ul {
      margin: 15px 0;
      padding-left: 20px;
      
      li {
        margin-bottom: 10px;
        line-height: 1.6;
        color: ${color.textDark};
        font-size: 1.05rem;

        @media (max-width: ${breakpoints.mobile}) {
          font-size: 1rem;
        }
      }
    }
  }
`;

// Services Grid
const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 40px;
  margin-top: 50px;

  @media (max-width: ${breakpoints.tablet}) {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: 25px;
  }
`;

const ServiceCard = styled(motion.div)`
  background: white;
  border-radius: 14px;
  padding: 40px 30px;
  text-align: center;
  box-shadow: 0 8px 24px rgba(42, 38, 34, 0.06);
  border: 1px solid ${color.border};
  transition: all 0.4s ease;
  height: 100%;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 18px 40px rgba(42, 38, 34, 0.12);
    border-color: ${color.accent};
  }

  .service-icon {
    width: 76px;
    height: 76px;
    border-radius: 50%;
    color: ${color.primary};
    font-size: 2rem;
    margin: 0 auto 25px;
    display: flex;
    align-items: center;
    justify-content: center;

    @media (max-width: ${breakpoints.mobile}) {
      width: 66px;
      height: 66px;
      font-size: 1.8rem;
    }
  }

  h4 {
    font-size: 1.6rem;
    color: ${color.heading};
    margin-bottom: 15px;
    font-weight: 700;

    @media (max-width: ${breakpoints.mobile}) {
      font-size: 1.4rem;
    }
  }

  p {
    color: ${color.textMuted};
    line-height: 1.7;
    font-size: 1.05rem;
    margin-bottom: 20px;

    @media (max-width: ${breakpoints.mobile}) {
      font-size: 1rem;
    }
  }

  .service-features {
    text-align: left;
    margin-top: 20px;
    
    li {
      margin-bottom: 8px;
      padding-left: 5px;
      color: ${color.textDark};
      font-size: 1rem;
      line-height: 1.5;

      &::marker {
        color: ${color.primary};
      }
    }
  }
`;

// Stats Container
const StatsContainer = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
  background: linear-gradient(135deg, #ffffff, #f8f9fa);

  @media (max-width: ${breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${breakpoints.mobile}) {
    grid-template-columns: 1fr;
    gap: 25px;
  }
`;

const StatItem = styled(motion.div)`
  text-align: center;
  padding: 30px 20px;
  background: white;
  border-radius: 14px;
  box-shadow: 0 8px 24px rgba(42, 38, 34, 0.06);
  transition: all 0.3s ease;
  border: 1px solid ${color.border};

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 18px 40px rgba(42, 38, 34, 0.12);
    border-color: ${color.accent};
  }

  .stat-icon {
    width: 66px;
    height: 66px;
    border-radius: 50%;
    color: ${color.primary};
    font-size: 1.7rem;
    margin: 0 auto 20px;
    display: flex;
    align-items: center;
    justify-content: center;

    @media (max-width: ${breakpoints.mobile}) {
      margin-bottom: 15px;
    }
  }

  h3 {
    font-size: 2.8rem;
    color: ${color.primary};
    margin-bottom: 10px;
    font-weight: 800;

    @media (max-width: ${breakpoints.mobile}) {
      font-size: 2.3rem;
    }
  }

  p {
    color: ${color.textMuted};
    font-size: 1.1rem;
    font-weight: 600;
    margin: 0;

    @media (max-width: ${breakpoints.mobile}) {
      font-size: 1rem;
    }
  }
`;

// Team Section
const TeamSection = styled.section`
  max-width: 1200px;
  margin: 0 auto;
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 50px;
  margin-top: 60px;

  @media (max-width: ${breakpoints.tablet}) {
    gap: 40px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 30px;
    margin-top: 50px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 25px;
  }
`;

const TeamMember = styled(motion.div)`
  background: white;
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(42, 38, 34, 0.06);
  text-align: center;
  padding-bottom: 30px;
  transition: all 0.4s ease;
  border: 1px solid ${color.border};
  position: relative;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 22px 48px rgba(42, 38, 34, 0.14);
    border-color: ${color.accent};
  }
`;

const TeamImageWrapper = styled.div`
  position: relative;
  overflow: hidden;
  height: 320px;

  @media (max-width: ${breakpoints.mobile}) {
    height: 280px;
  }

  @media (max-width: 480px) {
    height: 320px;
  }
`;

const TeamImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.7s ease;
`;

const TeamInfo = styled.div`
  padding: 25px 20px 0;

  @media (max-width: ${breakpoints.mobile}) {
    padding: 20px 15px 0;
  }
`;

const TeamName = styled.h4`
  font-size: 1.6rem;
  color: ${color.heading};
  margin-bottom: 8px;
  font-weight: 700;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 1.4rem;
  }
`;

const TeamRole = styled.p`
  color: ${color.primary};
  font-weight: 600;
  margin-bottom: 15px;
  font-size: 1.1rem;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 1rem;
  }
`;

// Subscription Section
const SubscriptionSection = styled(motion.section)`
  max-width: 1000px;
  margin: 0 auto;
  padding: 80px 60px;
  background: white;
  border-radius: 14px;
  text-align: center;
  box-shadow: 0 12px 36px rgba(42, 38, 34, 0.08);
  border: 1px solid ${color.border};
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #2c5530, #4CAF50);
  }

  @media (max-width: ${breakpoints.tablet}) {
    padding: 60px 40px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 50px 25px;
    border-radius: 12px;
  }
`;

const SubscriptionTitle = styled.h2`
  font-size: 2.8rem;
  margin-bottom: 25px;
  color: ${color.heading};
  font-weight: 800;
  position: relative;
  padding-bottom: 18px;
  display: inline-block;

  &::after {
    content: '';
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
    width: 40px;
    height: 3px;
    background: ${color.primary};
    border-radius: 2px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 2.2rem;
    margin-bottom: 20px;
  }
`;

const SubscriptionText = styled.p`
  font-size: 1.2rem;
  margin-bottom: 50px;
  color: ${color.textMuted};
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.7;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 1.1rem;
    margin-bottom: 40px;
  }
`;

const SubscriptionForm = styled.form`
  display: flex;
  max-width: 600px;
  margin: 0 auto;
  gap: 15px;
  position: relative;

  @media (max-width: ${breakpoints.mobile}) {
    flex-direction: column;
    gap: 15px;
  }
`;

const EmailInput = styled.input`
  flex: 1;
  padding: 18px 22px;
  border: 1px solid ${color.border};
  border-radius: 8px;
  font-size: 1.05rem;
  outline: none;
  transition: all 0.3s ease;
  background: rgba(248, 249, 250, 0.8);
  color: ${color.heading};

  &:focus {
    border-color: ${color.primary};
    box-shadow: 0 0 0 3px rgba(255, 125, 51, 0.15);
    background: white;
  }

  &::placeholder {
    color: ${color.textMuted};
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 16px 20px;
    font-size: 1rem;
  }
`;

const SubscribeButton = styled(motion.button)`
  padding: 18px 40px;
  background: linear-gradient(135deg, #2c5530, #4CAF50);
  color: ${color.white};
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: all 0.3s ease;
  box-shadow: 0 8px 20px rgba(255, 125, 51, 0.28);

  &:hover:not(:disabled) {
    background: linear-gradient(135deg, #4CAF50, #2c5530);
    transform: translateY(-3px);
    box-shadow: 0 12px 28px rgba(229, 108, 43, 0.35);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  @media (max-width: ${breakpoints.mobile}) {
    width: 100%;
    padding: 16px 30px;
    font-size: 1rem;
    justify-content: center;
  }
`;

const SuccessMessage = styled(motion.div)`
  background: linear-gradient(135deg, #e8f5e9, #c8e6c9);
  color: ${color.primaryDark};
  padding: 25px;
  border-radius: 12px;
  margin-top: 30px;
  font-weight: 600;
  box-shadow: 0 8px 20px rgba(255, 125, 51, 0.12);
  border: 1px solid ${color.accent};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  font-size: 1.1rem;

  @media (max-width: ${breakpoints.mobile}) {
    padding: 20px;
    font-size: 1rem;
    margin-top: 25px;
    flex-direction: column;
    text-align: center;
  }
`;

const ErrorMessage = styled(motion.div)`
  background: linear-gradient(135deg, #ffebee, #ffcdd2);
  color: #c62828;
  padding: 20px;
  border-radius: 12px;
  margin-top: 25px;
  font-weight: 500;
  border: 1px solid #ffcdd2;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;

  @media (max-width: ${breakpoints.mobile}) {
    padding: 18px;
    font-size: 0.95rem;
    margin-top: 20px;
  }
`;

const About = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const stats = [
    { number: '1000+', label: 'Happy Travelers', icon: <FaUsers /> },
    { number: '30+', label: 'Tours Available', icon: <FaMapMarkerAlt /> },
    { number: '98%', label: 'Satisfaction Rate', icon: <FaStar /> },
    { number: '15+', label: 'Professional Guides', icon: <FaAward /> }
  ];

  const services = [
    {
      icon: <FaUmbrellaBeach />,
      title: 'Zanzibar Beach Holidays',
      description: 'Luxurious beach getaways along Zanzibar\'s stunning coastlines including Nungwi, Kendwa, Paje, and Jambiani.',
      features: [
        'Premium escapes to Nungwi,Kendwa & Paje',
        'Iconic trips like Nakupenda SandBank',
        'Breathtaking island destinations',
        'Prison Island & Mnemba Atoll tours'
      ]
    },
    {
      icon: <FaMonument />,
      title: 'Cultural & Historical Experiences',
      description: 'Step into history with guided tours of Stone Town, a UNESCO World Heritage Site.',
      features: [
        'Discover Swahili, Arab, Persian influences',
        'Visit authentic local villages',
        'Meaningful cultural exchange',
        'Traditional architecture & markets'
      ]
    },
    {
      icon: <FaSeedling />,
      title: 'Spice Tours & Nature Adventures',
      description: 'Explore Zanzibar\'s famous spice plantations and enjoy eco-friendly nature experiences.',
      features: [
        'Learn about cloves, nutmeg, cinnamon',
        'Traditional farming techniques',
        'Nature walks & scenic viewpoints',
        'Biodiversity conservation'
      ]
    },
    {
      icon: <FaFish />,
      title: 'Marine Activities',
      description: 'Exciting ocean adventures for water lovers in the crystal-clear Indian Ocean.',
      features: [
        'Dolphin watching expeditions',
        'Snorkeling in vibrant coral reefs',
        'Traditional dhow sailing',
        'Island-hopping trips'
      ]
    },
    {
      icon: <FaShieldAlt />,
      title: 'Tanzania Wildlife Safaris',
      description: 'Unforgettable safaris to Tanzania\'s most famous national parks.',
      features: [
        'Serengeti & Ngorongoro Crater',
        'Tarangire & Mikumi National Parks',
        'Selous (Nyerere) National Park',
        'Private & group safari options'
      ]
    },
    {
      icon: <FaRing />,
      title: 'Honeymoon Packages',
      description: 'Dreamy romantic escapes perfect for couples seeking unforgettable memories.',
      features: [
        'Luxury beach stays',
        'Private boat trips',
        'Candlelit dinners',
        'Intimate safari adventures'
      ]
    },
    {
      icon: <FaFamily />,
      title: 'Family & Group Travel',
      description: 'Kid-friendly and group-friendly itineraries tailored for all ages.',
      features: [
        'Family beach trips',
        'School group tours',
        'Corporate retreats',
        'Customized group activities'
      ]
    },
    {
      icon: <FaSchool />,
      title: 'Village Tours & Community',
      description: 'Meaningful experiences connecting with local communities.',
      features: [
        'Meet local families',
        'Learn traditional crafts',
        'School visits & donations',
        'Support local development'
      ]
    },
    {
      icon: <FaCar />,
      title: 'Private Transfers',
      description: 'Reliable, comfortable transfers throughout your journey.',
      features: [
        'Airport pickup on arrival',
        'Hotel transfers across Zanzibar',
        'Professional drivers',
        'Stress-free travel'
      ]
    },
    {
      icon: <FaMagic />,
      title: 'Fully Customized Tours',
      description: 'Personalized itineraries based on your preferences and dreams.',
      features: [
        'Tailored to your interests',
        'Flexible schedules',
        'Budget-friendly options',
        'Unique local experiences'
      ]
    }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!email) {
      setError('Please enter your email address');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      setTimeout(() => {
        console.log('New subscription:', email);
        
        setIsSubscribed(true);
        setIsLoading(false);
        setEmail('');
        
        setTimeout(() => {
          setIsSubscribed(false);
        }, 5000);
      }, 1500);

    } catch (err) {
      console.error('Subscription error:', err);
      setError('Failed to subscribe. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <>
      <AboutContainer>
        <HeroSection>
          <HeroTitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Discover Our Story
          </HeroTitle>
          <HeroSubtitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Authentic Zanzibar Experiences Handcrafted with Passion and Professional Excellence
          </HeroSubtitle>
        </HeroSection>

        <ContentWrapper>
          {/* Our Story Section */}
          <SectionBand $tone="white">
          <SectionWrapper
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <SectionHeader>
              <h2>Our Story</h2>
              <p className="section-subtitle">
                The Heart of ZanStone Tours & Safaris
              </p>
               <p className="section-subtitle">
                Ambassadors of the Spice Island & The Great Savannah
              </p>
            </SectionHeader>

            <ContentWithIcon
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="content-icon">
                <FaHeart />
              </div>
              <div className="content-text">
                <h3>Authentic Zanzibar Experiences</h3>
                <p>
                 ZanStone Tours & Safaris is a proudly locally owned and operated company based in Fuoni Uwandani, Zanzibar. We are more than just a tour operator; we are ambassadors of our land, culture, and wildlife. Our story is rooted in a deep passion for sharing the authentic beauty of East Africa with the world in a responsible, inspiring, and professional way.</p>
              
                <p>
                  Our expertise lies in crafting well-planned, personalized journeys that seamlessly blend stunning 
                  natural landscapes, rich cultural heritage, and world-class wildlife encounters. Whether you are 
                  dreaming of relaxing on pristine beaches, exploring historic Stone Town, swimming in turquoise waters, 
                  or embarking on an African safari, we ensure every moment of your trip is carefully designed and 
                  beautifully executed.
                </p>
              </div>
            </ContentWithIcon>

            <ContentWithIcon
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="content-icon">
                <FaGlobeAfrica />
              </div>
              <div className="content-text">
                <h3>Beyond Tourism - We Are Storytellers</h3>
                <p>
                  At ZanStone Tours and Safaris, our passion goes far beyond tourism. We see ourselves as storytellers 
                  of Zanzibar and Tanzania — sharing the history, traditions, and spirit of our people through immersive 
                  travel experiences. From the crystal-clear Indian Ocean surrounding Zanzibar to the vast golden 
                  savannahs of Serengeti, Ngorongoro, Tarangire, Mikumi, and Selous, we create journeys that allow 
                  travelers to connect deeply with nature, wildlife, and local communities.
                </p>
                <p>
                  With strong roots in Zanzibar and well-established safari operations across Tanzania, we combine 
                  local knowledge, professional guiding, and high-quality services to deliver beach holidays, cultural 
                  tours, and wildlife safaris that are safe, comfortable, and truly memorable.
                </p>
              </div>
            </ContentWithIcon>
          </SectionWrapper>
          </SectionBand>

          {/* Who We Are Section */}
          <SectionBand $tone="cream">
          <SectionWrapper
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <SectionHeader>
              <h2>Who We Are</h2>
              <p className="section-subtitle">
Local Experts, Passionate Storytellers              </p>
            </SectionHeader>

            <ContentWithIcon
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="content-icon">
                <FaUsers />
              </div>
              <div className="content-text">
                <h3>Our Passionate Team</h3>
                <p>
               We are a dedicated team of travel specialists, licensed local guides, and skilled safari drivers who call Tanzania home. For us, travel is not just work—it is our heritage. Our strength lies in our deep local expertise; we understand the rhythm of Zanzibar’s tides, the best seasons for Big Five sightings, and the cultural heartbeat of the Swahili people.
At ZanStone, we go beyond standard, pre-packaged itineraries. We design experiences that reveal hidden treasures—from secret beaches away from the crowds to genuine cultural exchanges in local villages.

                </p>
                <p>
                  Our greatest strength lies in our local expertise, personal connections to the destinations, and 
                  meticulous attention to detail. We understand the rhythm of Zanzibar's tides, the best seasons for 
                  wildlife sightings, and the cultural heartbeat of local communities. This deep knowledge allows us 
                  to craft journeys that are not only beautiful but meaningful and immersive.
                </p>
              </div>
            </ContentWithIcon>

            <ContentWithIcon
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="content-icon">
                <FaCompass />
              </div>
              <div className="content-text">
                <h3>Beyond Standard Itineraries</h3>
                <p>
                  At ZanStone Tours and Safaris, we go far beyond standard, pre-packaged itineraries. Instead, we 
                  design experiences that reveal the hidden treasures of Zanzibar and Tanzania. Our guests discover 
                  secret beaches away from the crowds, visit genuine local villages, engage with rich traditions, 
                  and explore prime wildlife locations at the best times of day. Every trip is carefully planned to 
                  ensure comfort, excitement, and unforgettable moments.
                </p>
                <p>
                  Whether you are wandering through the historic winding alleys of Stone Town, breathing in the scents 
                  of fresh spices on a traditional plantation tour, sailing across turquoise waters, or standing in awe 
                  of Africa's majestic wildlife in its natural habitat — each experience is thoughtfully curated with 
                  care and purpose.
                </p>
              </div>
            </ContentWithIcon>
          </SectionWrapper>
          </SectionBand>

          {/* Stats Section */}
          <SectionBand $tone="white">
          <StatsContainer
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            {stats.map((stat, index) => (
              <StatItem
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="stat-icon">{stat.icon}</div>
                <h3>{stat.number}</h3>
                <p>{stat.label}</p>
              </StatItem>
            ))}
          </StatsContainer>
          </SectionBand>

          {/* What We Do Section */}
          <SectionBand $tone="cream">
          <SectionWrapper
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <SectionHeader>
              <h2>What We Do</h2>
              <h5 className="section-subtitle">
Crafted Experiences for Every Traveler              </h5>
<p>Whether you are an adventure seeker, a honeymooner, or a family, we provide high-quality, seamless travel solutions across Zanzibar and Mainland Tanzania</p>
            </SectionHeader>

            <ServicesGrid>
              {services.map((service, index) => (
                <ServiceCard
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="service-icon">{service.icon}</div>
                  <h4>{service.title}</h4>
                  <p>{service.description}</p>
                  <ul className="service-features">
                    {service.features.map((feature, idx) => (
                      <li key={idx}>• {feature}</li>
                    ))}
                  </ul>
                </ServiceCard>
              ))}
            </ServicesGrid>
          </SectionWrapper>
          </SectionBand>

          {/* Our Commitment Section */}
          <SectionBand $tone="white">
          <SectionWrapper
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <SectionHeader>
              <h2>Our Heart</h2>
              <p className="section-subtitle">
                Building trust, fostering connections, and promoting responsible tourism
              </p>
            </SectionHeader>

            <ContentWithIcon
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="content-icon">
                <FaHandshake />
              </div>
              <div className="content-text">
                <h3>Community & Responsible Tourism</h3>
                <p>
                  AWe believe that travel should benefit everyone. Our Village Tours with School Donations allow you to connect deeply with the local community. By visiting local schools and supporting community projects, your journey with ZanStone helps protect the environment and empowers the people of Zanzibar and Tanzania.
                </p>
                <p>
                  Our goal is not just to meet your expectations, but to exceed them. Every trip is carefully designed 
                  to ensure reliability, comfort, and safety, while providing authentic experiences that leave lasting 
                  impressions. We communicate honestly, plan meticulously, and deliver services with professionalism, 
                  warmth, and attention to detail.
                </p>
                <p>
                  We believe in responsible tourism that respects local communities, preserves the environment, and 
                  supports sustainable development. By choosing ZanStone Tours and Safaris, you are not only enjoying 
                  a once-in-a-lifetime journey, but also contributing to the wellbeing of the people and places you visit.
                </p>
                <p>
                  Your adventure with us is more than a trip — it is a meaningful experience, thoughtfully crafted to 
                  create unforgettable memories while leaving a positive impact on Zanzibar and Tanzania. 🌍✨
                </p>
              </div>
            </ContentWithIcon>
          </SectionWrapper>
          </SectionBand>

          {/* Team Section */}
          <SectionBand $tone="cream">
          <TeamSection>
            <SectionHeader>
              <h2>Meet Our Expert Team</h2>
              <p className="section-subtitle">
                Passionate professionals dedicated to creating unforgettable Zanzibar experiences
              </p>
            </SectionHeader>
            <TeamGrid>
              {teamMembers.map((member, index) => (
                <TeamMember
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.03 }}
                >
                  <TeamImageWrapper>
                    <TeamImage src={member.image} alt={member.name} />
                  </TeamImageWrapper>
                  <TeamInfo>
                    <TeamName>{member.name}</TeamName>
                    <TeamRole>{member.role}</TeamRole>
                  </TeamInfo>
                </TeamMember>
              ))}
            </TeamGrid>
          </TeamSection>
          </SectionBand>

          {/* Subscription Section */}
          <SectionBand $tone="white">
          <SubscriptionSection
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <SubscriptionTitle>Stay Connected</SubscriptionTitle>
            <SubscriptionText>
              Subscribe to our newsletter and be the first to know about exclusive offers, 
              new tour packages, and travel inspiration for your perfect Zanzibar adventure.
            </SubscriptionText>
            
            <SubscriptionForm onSubmit={handleSubmit}>
              <EmailInput
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError('');
                }}
                required
                disabled={isLoading}
              />
              <SubscribeButton
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: isLoading ? 1 : 1.05 }}
                whileTap={{ scale: isLoading ? 1 : 0.95 }}
              >
                <FaPaperPlane />
                {isLoading ? 'Subscribing...' : 'Subscribe Now'}
              </SubscribeButton>
            </SubscriptionForm>

            {error && (
              <ErrorMessage
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                ⚠️ {error}
              </ErrorMessage>
            )}

            {isSubscribed && (
              <SuccessMessage
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <FaCheckCircle size={24} />
                <span>
                  🎉 Thank you for subscribing! Welcome to the ZanStone family. 
                  You'll receive our latest updates and exclusive offers soon.
                </span>
              </SuccessMessage>
            )}
          </SubscriptionSection>
          </SectionBand>
        </ContentWrapper>
      </AboutContainer>

      <Footer />
    </>
  );
};

export default About;