// src/components/Footer.jsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { supabase } from '../supabase';
import {
  FaArrowUp,
  FaFacebook,
  FaInstagram,
  FaTripadvisor,
  FaTiktok,
  FaWhatsapp,
} from 'react-icons/fa';
import { FiClock, FiMail, FiMapPin, FiPhone } from 'react-icons/fi';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/zanstoneLogo.png';
import ZATI from '../assets/ZATI.png';
import tripadvisorLogo from '../assets/tripadvisor.png';
import viator from '../assets/viator.png';
import bpra from '../assets/bpra.png';
import { color } from '../styles/color';

const FooterContainer = styled.footer`
  background: linear-gradient(135deg, #222 0%, #333 100%);
  color: ${color.textLight};
  padding: 70px 20px 0;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, ${color.primary}, ${color.accent});
  }
`;

const FooterGrid = styled.div`
  max-width: 1300px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1.2fr 1.3fr;
  gap: 40px;
  position: relative;
  z-index: 2;

  @media (max-width: 1100px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 34px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
`;

const BrandColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (max-width: 480px) {
    align-items: center;
  }
`;

const BrandLogo = styled.img`
  height: 64px;
  width: auto;
  object-fit: contain;
  background: #ffffff;
  padding: 8px 14px;
  border-radius: 10px;
  align-self: flex-start;

  @media (max-width: 480px) {
    align-self: center;
  }
`;

const BrandTagline = styled.h3`
  font-size: 1.05rem;
  font-weight: 700;
  color: #ffffff;
  line-height: 1.4;
`;

const BrandText = styled.p`
  font-size: 0.88rem;
  color: #b8afa6;
  line-height: 1.7;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;

  a {
    width: 40px;
    height: 40px;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #d9d2c9;
    font-size: 1rem;
    transition: all 0.3s ease;

    &:hover {
      color: #ffffff;
      transform: translateY(-3px);
    }

    &.facebook:hover {
      background: #1877f2;
    }

    &.instagram:hover {
      background: linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888);
    }

    &.tripadvisor:hover {
      background: #00af87;
    }

    &.tiktok:hover {
      background: #000000;
    }

    &.whatsapp:hover {
      background: #25d366;
    }
  }
`;

const FooterColumn = styled.div`
  h4 {
    font-size: 0.95rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #ffffff;
    margin-bottom: 20px;
    position: relative;
    padding-bottom: 10px;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 34px;
      height: 2.5px;
      background: ${color.primary};
      border-radius: 2px;
    }
  }

  @media (max-width: 480px) {
    h4 {
      text-align: center;

      &::after {
        left: 50%;
        transform: translateX(-50%);
      }
    }
  }
`;

const FooterLink = styled(Link)`
  display: block;
  padding: 6px 0;
  font-size: 0.88rem;
  color: #b8afa6;
  transition: all 0.25s ease;

  &:hover {
    color: ${color.primary};
    transform: translateX(6px);
  }

  @media (max-width: 480px) {
    text-align: center;

    &:hover {
      transform: translateX(0);
    }
  }
`;

const ContactItem = styled.a`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 7px 0;
  font-size: 0.88rem;
  color: #b8afa6;
  transition: color 0.25s ease;

  svg {
    color: ${color.primary};
    font-size: 1rem;
    margin-top: 3px;
    flex-shrink: 0;
  }

  &:hover {
    color: #ffffff;
  }

  @media (max-width: 480px) {
    justify-content: center;
  }
`;

const NewsletterForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 4px;
`;

const NewsletterInput = styled.input`
  width: 100%;
  padding: 13px 16px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: #ffffff;
  font-size: 0.88rem;
  transition: all 0.3s ease;

  &::placeholder {
    color: #8f867d;
  }

  &:focus {
    outline: none;
    border-color: ${color.primary};
    background: rgba(255, 255, 255, 0.15);
  }
`;

const SubscribeButton = styled.button`
  background: linear-gradient(135deg, ${color.primary} 0%, ${color.accent} 100%);
  color: #ffffff;
  border: none;
  padding: 13px 25px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 700;
  font-size: 0.82rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 18px rgba(255, 125, 51, 0.35);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const FormMessage = styled.div`
  background: ${props => (props.$type === 'success' ? 'rgba(76, 175, 80, 0.1)' : 'rgba(244, 67, 54, 0.1)')};
  border: 1px solid ${props => (props.$type === 'success' ? '#4CAF50' : '#f44336')};
  color: ${props => (props.$type === 'success' ? '#7ddc94' : '#ff8a80')};
  padding: 10px 14px;
  border-radius: 8px;
  font-size: 0.85rem;
`;

const PartnersSection = styled.div`
  max-width: 1300px;
  margin: 55px auto 0;
  padding: 28px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  z-index: 2;
`;

const PartnersLabel = styled.h4`
  text-align: center;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #8f867d;
  margin-bottom: 20px;
`;

const PartnersRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 24px;
  flex-wrap: wrap;
`;

const PartnerTile = styled.a`
  background: #ffffff;
  border-radius: 8px;
  padding: 12px;
  width: 176px;
  height: 136px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  img {
    max-width: 100%;
    max-height: 112px;
    width: auto;
    height: auto;
    object-fit: contain;
    filter: grayscale(100%);
    transition: filter 0.3s ease;
  }

  &:hover {
    transform: translateY(-4px) scale(1.05);
    box-shadow: 0 10px 24px rgba(0, 0, 0, 0.3);

    img {
      filter: grayscale(0%);
    }
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  margin-top: 10px;
  padding: 22px 0;
  max-width: 1300px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 18px;
  flex-wrap: wrap;
  font-size: 0.84rem;
  color: #8f867d;
  position: relative;
  z-index: 2;

  strong {
    color: #b8afa6;
    font-weight: 500;
  }
`;

const BottomLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
`;

const LegalLink = styled(Link)`
  color: #b8afa6;
  text-decoration: none;
  transition: color 0.2s ease;

  &:hover {
    color: ${color.primary};
  }
`;

const VisitorBadge = styled.span`
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 5px 12px;
  border-radius: 999px;
  color: #b8afa6;
`;

const ScrollToTop = styled.button`
  background: ${color.primary};
  color: #ffffff;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  transition: all 0.3s ease;

  &:hover {
    background: ${color.accent};
    transform: translateY(-3px);
    box-shadow: 0 8px 18px rgba(255, 125, 51, 0.4);
  }
`;

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [visitorCount, setVisitorCount] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToReviews = () => {
    const el = document.getElementById('reviews');
    if (!el) return false;
    try {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } catch (err) {
      window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY);
    }
    // Fallback: if smooth scrolling gets interrupted, jump straight there
    setTimeout(() => {
      const target = el.getBoundingClientRect().top + window.scrollY - 90;
      if (Math.abs(window.scrollY - target) > 120) {
        window.scrollTo(0, target);
      }
    }, 900);
    return true;
  };

  const handleReviewsClick = e => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/');
      let attempts = 0;
      const timer = setInterval(() => {
        attempts += 1;
        if (scrollToReviews() || attempts > 30) clearInterval(timer);
      }, 150);
    } else {
      scrollToReviews();
    }
  };

  const socialLinks = {
    facebook: 'https://www.facebook.com/profile.php?id=61563624100258',
    instagram: 'https://www.instagram.com/zanstone_tours_and_safaris',
    tripadvisor: 'https://tripadvisor.com/zanstone_tours_and_safaris',
    tiktok: 'https://www.tiktok.com/@zanstone_tours_safaris',
    whatsapp: 'https://wa.me/255616543216',
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!email) {
      setMessage({ text: 'Please enter your email address', type: 'error' });
      return;
    }

    setIsSubmitting(true);
    setMessage({ text: '', type: '' });

    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call

      setMessage({
        text: 'Thank you for subscribing! You will receive updates from ZanStone Tours.',
        type: 'success',
      });
      setEmail('');
    } catch (error) {
      setMessage({
        text: 'Subscription failed. Please try again or contact us directly.',
        type: 'error',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Fetch visitor count from Supabase on mount and listen for updates
  useEffect(() => {
    let mounted = true;

    const fetchCount = async () => {
      try {
        const { data, error } = await supabase
          .from('site_stats')
          .select('count')
          .eq('counter_key', 'visits')
          .single();

        if (error) throw error;
        if (mounted && data) setVisitorCount(data.count);
      } catch (err) {
        console.error('[visitor] fetch error', err);
        const stored = parseInt(localStorage.getItem('zan_visits') || '0', 10);
        if (mounted) setVisitorCount(stored);
      }
    };

    fetchCount();

    const handler = e => {
      if (e && e.detail) setVisitorCount(e.detail);
    };

    window.addEventListener('visitorCountUpdated', handler);

    const channel = supabase
      .channel('public:site_stats')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'site_stats',
          filter: 'counter_key=eq.visits',
        },
        payload => {
          if (mounted && payload?.new) setVisitorCount(payload.new.count);
        }
      )
      .subscribe();

    return () => {
      mounted = false;
      window.removeEventListener('visitorCountUpdated', handler);
      if (channel && typeof channel.unsubscribe === 'function') {
        try {
          channel.unsubscribe();
        } catch (e) {
          /* ignore */
        }
      }
    };
  }, []);

  return (
    <FooterContainer>
      <FooterGrid>
        {/* Brand column */}
        <BrandColumn>
          <BrandLogo src={logo} alt="ZanStone Tours & Safaris" />
          <BrandTagline>Explore & Discover Your Travel Dreams With Us</BrandTagline>
          <BrandText>
            Your trusted partner for unforgettable Zanzibar beach holidays, day trips and
            Tanzania safaris. Based in Fuoni Uwandani, Zanzibar.
          </BrandText>
          <SocialLinks>
            <a
              href={socialLinks.facebook}
              className="facebook"
              aria-label="Facebook"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook />
            </a>
            <a
              href={socialLinks.instagram}
              className="instagram"
              aria-label="Instagram"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>
            <a
              href={socialLinks.tripadvisor}
              className="tripadvisor"
              aria-label="TripAdvisor"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTripadvisor />
            </a>
            <a
              href={socialLinks.tiktok}
              className="tiktok"
              aria-label="TikTok"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTiktok />
            </a>
            <a
              href={socialLinks.whatsapp}
              className="whatsapp"
              aria-label="WhatsApp"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp />
            </a>
          </SocialLinks>
        </BrandColumn>

        {/* Quick links */}
        <FooterColumn>
          <h4>Quick Links</h4>
          <FooterLink to="/dayTrips">Day Trips & Tours</FooterLink>
          <FooterLink to="/tours">Special Packages</FooterLink>
          <FooterLink to="/safaris">Safaris</FooterLink>
          <FooterLink to="/gallery">Gallery</FooterLink>
        </FooterColumn>

        {/* Company */}
        <FooterColumn>
          <h4>Explore More</h4>
          <FooterLink to="/about">About Us</FooterLink>
          <FooterLink to="/#reviews" onClick={handleReviewsClick}>Traveller Reviews</FooterLink>
          <FooterLink to="/contact">Make a Request</FooterLink>
          <FooterLink to="/contact">Contact Us</FooterLink>
          <FooterLink to="/terms">Terms &amp; Conditions</FooterLink>
        </FooterColumn>

        {/* Contact */}
        <FooterColumn>
          <h4>Contact Us</h4>
          <ContactItem href="tel:+255616543216">
            <FiPhone />
            <span>+255 616 543 216</span>
          </ContactItem>
          <ContactItem href="mailto:zanstonetoursandsafaris@gmail.com">
            <FiMail />
            <span>zanstonetoursandsafaris@gmail.com</span>
          </ContactItem>
          <ContactItem as="span">
            <FiMapPin />
            <span>Fuoni Uwandani, Zanzibar, Tanzania</span>
          </ContactItem>
          <ContactItem as="span">
            <FiClock />
            <span>Mon - Sun: 8:00 AM - 8:00 PM</span>
          </ContactItem>
        </FooterColumn>

        {/* Newsletter */}
        <FooterColumn>
          <h4>Stay Updated</h4>
          <BrandText style={{ marginBottom: '4px' }}>
            Subscribe for the latest offers, travel tips and exclusive updates.
          </BrandText>
          <NewsletterForm onSubmit={handleSubmit}>
            <NewsletterInput
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              disabled={isSubmitting}
            />
            <SubscribeButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Subscribing...' : 'Subscribe Now'}
            </SubscribeButton>
          </NewsletterForm>
          {message.text && (
            <FormMessage $type={message.type}>{message.text}</FormMessage>
          )}
        </FooterColumn>
      </FooterGrid>

      <PartnersSection>
        <PartnersLabel>Our Partners</PartnersLabel>
        <PartnersRow>
          <PartnerTile
            href="https://tripadvisor.com/zanstone_tours_and_safaris"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={tripadvisorLogo} alt="Tripadvisor" />
          </PartnerTile>
          <PartnerTile href="https://zato.or.tz" target="_blank" rel="noopener noreferrer">
            <img src={ZATI} alt="Zanzibar Association of Tourism Investors" />
          </PartnerTile>
          <PartnerTile href="https://www.viator.com" target="_blank" rel="noopener noreferrer">
            <img src={viator} alt="Viator" />
          </PartnerTile>
          <PartnerTile href="https://www.bpra.go.tz/" target="_blank" rel="noopener noreferrer">
            <img src={bpra} alt="BPRA - Zanzibar Business and Property Registration Agency" />
          </PartnerTile>
        </PartnersRow>
      </PartnersSection>

      <FooterBottom>
        <BottomLeft>
          <span>
            &copy; {new Date().getFullYear()} <strong>ZanStone Tours and Safaris</strong>. All
            rights reserved.
          </span>
          <LegalLink to="/terms">Terms &amp; Conditions</LegalLink>
          <span>Fuoni Uwandani, Zanzibar, Tanzania</span>
        </BottomLeft>
        <BottomLeft>
          <VisitorBadge>
            Visitors: {visitorCount !== null ? visitorCount.toLocaleString() : '—'}
          </VisitorBadge>
          <ScrollToTop onClick={scrollToTop} aria-label="Scroll to top">
            <FaArrowUp />
          </ScrollToTop>
        </BottomLeft>
      </FooterBottom>
    </FooterContainer>
  );
};

export default Footer;
