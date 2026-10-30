// src/pages/Contact.js
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiInstagram, FiSend } from 'react-icons/fi';
import { FaTiktok, FaWhatsapp } from 'react-icons/fa';
import Footer from '../components/Footer';
import { color } from '../styles/color';
import ContactForm from '../components/ContactForm';

// LocalStorage utility functions
const SocialStorage = {
  getClicks: (platform) => {
    if (typeof window === 'undefined') return 0;
    const data = localStorage.getItem('socialClicks');
    if (data) {
      try {
        const clicks = JSON.parse(data);
        return clicks[platform] || 0;
      } catch (error) {
        console.error('Error parsing social clicks:', error);
        return 0;
      }
    }
    return 0;
  },

  setClicks: (platform, count) => {
    if (typeof window === 'undefined') return;
    const data = localStorage.getItem('socialClicks');
    let clicks = data ? JSON.parse(data) : {};
    clicks[platform] = count;
    localStorage.setItem('socialClicks', JSON.stringify(clicks));
  },

  getAllClicks: () => {
    if (typeof window === 'undefined') return {};
    const data = localStorage.getItem('socialClicks');
    return data ? JSON.parse(data) : {};
  },

  getTotalClicks: () => {
    const clicks = SocialStorage.getAllClicks();
    return Object.values(clicks).reduce((total, count) => total + count, 0);
  }
};

const PageWrapper = styled.div`
  background: ${color.cream};
  min-height: 100vh;
`;

const HeroSection = styled.section`
  padding: 158px 20px 90px;
  background: linear-gradient(135deg, #4CAF50, #2E7D32);
  color: ${color.white};
  text-align: center;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 118px 15px 60px;
  }
`;

const HeroTitle = styled(motion.h1)`
  font-size: 3.2rem;
  font-weight: 800;
  margin-bottom: 18px;
  color: ${color.white};
  position: relative;
  z-index: 2;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.3);

  @media (max-width: 1024px) {
    font-size: 2.6rem;
  }

  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

const HeroSubtitle = styled(motion.p)`
  font-size: 1.25rem;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.6;
  font-style: italic;
  font-weight: 300;
  color: #fff8f0;
  opacity: 0.95;
  position: relative;
  z-index: 2;

  @media (max-width: 768px) {
    font-size: 1.05rem;
  }
`;

const ContactContainer = styled.div`
  padding: 70px 20px 80px;
  max-width: 1200px;
  margin: 0 auto;
  background: linear-gradient(135deg, #f8f9ff 0%, #f0f4ff 100%);
  min-height: 100vh;
`;

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  margin-bottom: 80px;
  align-items: start;

  @media (max-width: 968px) {
    grid-template-columns: 1fr;
    gap: 40px;
  }
`;

const ContactInfo = styled(motion.div)`
  h3 {
    font-size: 2.2rem;
    margin-bottom: 30px;
    color: ${color.heading};
    font-weight: 700;
    position: relative;
    padding-bottom: 16px;

    &::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: 0;
      width: 40px;
      height: 3px;
      background: ${color.primary};
      border-radius: 2px;
    }
  }
`;

const ContactItem = styled(motion.div)`
  display: flex;
  align-items: flex-start;
  margin-bottom: 20px;
  padding: 20px;
  background: white;
  border-radius: 14px;
  box-shadow: 0 8px 24px rgba(42, 38, 34, 0.06);
  transition: all 0.3s ease;
  border: 1px solid ${color.border};

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 16px 36px rgba(42, 38, 34, 0.12);
    border-color: ${color.accent};
  }
`;

const ContactIcon = styled.div`
  margin-right: 18px;
  color: ${color.primary};
  font-size: 1.4rem;
  background: linear-gradient(135deg, #f0f4ff 0%, #e6eeff 100%);
  width: 54px;
  height: 54px;
  border-radius: 50%;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ContactText = styled.div`
  flex: 1;
  
  h4 {
    margin: 0 0 8px 0;
    font-size: 1.3rem;
    color: ${color.heading};
    font-weight: 600;
  }

  p {
    margin: 0;
    color: ${color.textMuted};
    line-height: 1.6;
    font-size: 1rem;
  }

  a {
    color: ${color.primary};
    text-decoration: none;
    font-weight: 500;
    transition: all 0.3s ease;
    display: inline-flex;
    align-items: center;
    gap: 5px;

    &:hover {
      color: ${color.primaryDark};
      transform: translateX(3px);
    }
  }
`;

const SocialMediaGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-top: 30px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const SocialButton = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 15px 20px;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${props => props.variant === 'tiktok' ? '#000000' : 
               props.variant === 'instagram' ? 'linear-gradient(45deg, #405DE6, #5851DB, #833AB4, #C13584, #E1306C, #FD1D1D)' :
               'linear-gradient(135deg, #25D366, #128C7E)'};
  color: white;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
    transition: left 0.5s;
  }

  &:hover::before {
    left: 100%;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  }
`;

const ClickCount = styled.span`
  background: rgba(255, 255, 255, 0.2);
  padding: 2px 8px;
  border-radius: 20px;
  font-size: 0.8rem;
  margin-left: auto;
`;

const StatsContainer = styled(motion.div)`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: ${color.heading};
  padding: 24px;
  border-radius: 14px;
  margin-top: 30px;
  text-align: center;
  border: 1px solid ${color.border};
  box-shadow: 0 8px 24px rgba(42, 38, 34, 0.06);
`;

const StatsTitle = styled.h4`
  margin: 0 0 10px 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: ${color.heading};
  position: relative;
  padding-bottom: 12px;
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
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  margin-top: 15px;
`;

const StatItem = styled.div`
  text-align: center;
  
  .stat-number {
    font-size: 1.5rem;
    font-weight: 800;
    color: ${color.primary};
    margin-bottom: 5px;
  }
  
  .stat-label {
    font-size: 0.8rem;
    color: ${color.textMuted};
  }
`;

const MapContainer = styled(motion.div)`
  margin-top: 80px;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  height: 450px;
  position: relative;
  border: 3px solid white;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 18px;
    padding: 3px;
    background: linear-gradient(135deg, ${color.primary}, ${color.primaryDark});
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }

  iframe {
    width: 100%;
    height: 100%;
    border: none;
    filter: saturate(1.1) contrast(1.05);
  }
`;

const SectionDivider = styled.div`
  height: 3px;
  background: linear-gradient(90deg, transparent, ${color.primary}, transparent);
  margin: 60px 0;
  opacity: 0.6;
`;

const Contact = () => {
  const [socialClicks, setSocialClicks] = useState({
    tiktok: 0,
    instagram: 0,
    whatsapp: 0
  });

  const [totalClicks, setTotalClicks] = useState(0);

  // Load clicks from localStorage on component mount
  useEffect(() => {
    const savedClicks = SocialStorage.getAllClicks();
    setSocialClicks(prev => ({
      ...prev,
      ...savedClicks
    }));
    setTotalClicks(SocialStorage.getTotalClicks());
  }, []);

  const updateClickCount = (platform) => {
    const newCount = (socialClicks[platform] || 0) + 1;
    
    // Update state
    setSocialClicks(prev => ({
      ...prev,
      [platform]: newCount
    }));
    
    // Update localStorage
    SocialStorage.setClicks(platform, newCount);
    
    // Update total clicks
    setTotalClicks(SocialStorage.getTotalClicks());
  };

  const handleTiktokClick = () => {
    updateClickCount('tiktok');
    window.open("https://www.tiktok.com/@zanstone_tours_safaris", "_blank");
  };

  const handleInstagramClick = () => {
    updateClickCount('instagram');
    window.open("https://www.instagram.com/zanstone_tours_and_safaris", "_blank");
  };

  const handleWhatsappClick = () => {
    updateClickCount('whatsapp');
    window.open("https://wa.me/255616543216", "_blank");
  };

  const mapUrl = "https://www.google.com/maps?q=Fuoni%20Uwandani,%20Zanzibar,%20Tanzania&output=embed";

  const contactItems = [
    {
      icon: <FiMapPin />,
      title: "Our Office",
      content: "Fuoni Uwandani, Zanzibar, Tanzania",
      delay: 0.1
    },
    {
      icon: <FiPhone />,
      title: "Phone",
      content: <a href="tel:+255616543216">+255 616 543 216</a>,
      delay: 0.2
    },
    {
      icon: <FiMail />,
      title: "Email",
      content: <a href="mailto:zanstonetoursandsafaris@gmail.com">zanstonetoursandsafaris@gmail.com</a>,
      delay: 0.3
    }
  ];

  return (
    <>
      <PageWrapper>
        <HeroSection>
          <HeroTitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Get In Touch
          </HeroTitle>
          <HeroSubtitle
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </HeroSubtitle>
        </HeroSection>

        <ContactContainer>
        <ContactGrid>
          <ContactInfo
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3>Contact Information</h3>
            
            {contactItems.map((item, index) => (
              <ContactItem
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: item.delay }}
                viewport={{ once: true }}
              >
                <ContactIcon>
                  {item.icon}
                </ContactIcon>
                <ContactText>
                  <h4>{item.title}</h4>
                  <p>{item.content}</p>
                </ContactText>
              </ContactItem>
            ))}

            <SocialMediaGrid>
              <SocialButton
                variant="tiktok"
                onClick={handleTiktokClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaTiktok size={20} />
                TikTok
                <ClickCount>{socialClicks.tiktok}</ClickCount>
              </SocialButton>

              <SocialButton
                variant="instagram"
                onClick={handleInstagramClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiInstagram size={20} />
                Instagram
                <ClickCount>{socialClicks.instagram}</ClickCount>
              </SocialButton>

              <SocialButton
                variant="whatsapp"
                onClick={handleWhatsappClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaWhatsapp size={20} />
                WhatsApp
                <ClickCount>{socialClicks.whatsapp}</ClickCount>
              </SocialButton>
            </SocialMediaGrid>

            <StatsContainer
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <StatsTitle>Social Engagement</StatsTitle>
              <StatsGrid>
                <StatItem>
                  <div className="stat-number">{totalClicks}</div>
                  <div className="stat-label">Total Clicks</div>
                </StatItem>
                <StatItem>
                  <div className="stat-number">{socialClicks.tiktok + socialClicks.instagram}</div>
                  <div className="stat-label">Social Media</div>
                </StatItem>
                <StatItem>
                  <div className="stat-number">{socialClicks.whatsapp}</div>
                  <div className="stat-label">WhatsApp</div>
                </StatItem>
              </StatsGrid>
            </StatsContainer>
          </ContactInfo>
          
          <ContactForm />
        </ContactGrid>

        <SectionDivider />

        <MapContainer
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <iframe 
            src={mapUrl}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Fuoni Uwandani, Zanzibar Location Map"
          />
        </MapContainer>
        </ContactContainer>
      </PageWrapper>

      <Footer/>
    </>
  );
};

export default Contact;