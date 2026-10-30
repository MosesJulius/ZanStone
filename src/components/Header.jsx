// src/components/Header.jsx
import { useEffect, useRef, useState } from 'react';
import { FaFacebookF, FaInstagram, FaTripadvisor, FaWhatsapp } from 'react-icons/fa';
import { FiChevronDown, FiGlobe, FiMail, FiMapPin, FiMenu, FiPhone, FiStar, FiX } from 'react-icons/fi';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../assets/zanstoneLogo.png';
import { color } from '../styles/color';

/* ================= Top utility bar ================= */
const TopBar = styled.div`
  background: ${color.dark};
  color: #d9d2c9;
  font-size: 0.78rem;
  overflow: hidden;
  transition: max-height 0.35s ease, opacity 0.35s ease;
  max-height: ${props => (props.$hidden ? '0' : '44px')};
  opacity: ${props => (props.$hidden ? '0' : '1')};

  @media (max-width: 900px) {
    display: none;
  }
`;

const TopBarInner = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
`;

const TopBarGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 22px;

  a,
  span {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    color: #d9d2c9;
    transition: color 0.25s ease;

    &:hover {
      color: ${color.primary};
    }
  }

  svg {
    color: ${color.primary};
    font-size: 0.85rem;
  }
`;

const TopRating = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 7px;
  background: rgba(255, 179, 0, 0.14);
  border: 1px solid rgba(255, 179, 0, 0.5);
  border-radius: 999px;
  padding: 7px 14px;
  color: #ffd79a !important;
  font-weight: 700;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.18);
  transition: all 0.2s ease;

  strong {
    color: #ffffff;
    margin-left: 2px;
  }

  svg:last-of-type {
    color: #ffb300 !important;
  }

  &:hover {
    background: #ffb300;
    border-color: #ffb300;
    color: #2a2622 !important;

    strong {
      color: #2a2622;
    }

    svg:last-of-type {
      color: #2a2622 !important;
    }
  }
`;

const TopSocials = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  a {
    width: 26px;
    height: 26px;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.08);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #d9d2c9;
    font-size: 0.78rem;

    &:hover {
      background: ${color.primary};
      color: #fff;
    }
  }
`;

/* ================= Main navigation ================= */
const NavContainer = styled.nav`
  position: fixed;
  top: ${props => (props.$topHidden ? '0' : '44px')};
  left: 0;
  width: 100%;
  background: ${props =>
    props.$scrolled ? 'rgba(255, 255, 255, 0.92)' : 'rgba(255, 255, 255, 0.75)'};
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: ${props =>
    props.$scrolled ? '0 6px 24px rgba(42, 38, 34, 0.12)' : '0 2px 10px rgba(42, 38, 34, 0.06)'};
  z-index: 1000;
  transition: top 0.35s ease, box-shadow 0.3s ease;
  border-bottom: 1px solid ${color.border};

  @media (max-width: 900px) {
    top: 0;
  }
`;

const NavContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
  height: 74px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 18px;

  @media (max-width: 768px) {
    padding: 0 15px;
    height: 66px;
  }
`;

const LogoContainer = styled(Link)`
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  transition: transform 0.3s ease;
  flex-shrink: 0;

  &:hover {
    transform: scale(1.03);
  }
`;

const LogoImage = styled.img`
  height: 52px;
  width: auto;
  object-fit: contain;

  @media (max-width: 768px) {
    height: 44px;
  }

  @media (max-width: 480px) {
    height: 40px;
  }
`;

const NavMenu = styled.ul`
  display: flex;
  align-items: center;
  gap: 4px;
  list-style: none;
  margin: 0 auto;

  @media (max-width: 1100px) {
    display: none;
  }
`;

const NavItem = styled.li`
  position: relative;
`;

const NavLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 10px 14px;
  color: ${color.heading};
  font-size: 0.82rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  border-radius: 6px;
  transition: color 0.25s ease, background 0.25s ease;

  &:hover {
    color: ${color.primary};
  }

  svg {
    font-size: 0.7rem;
    transition: transform 0.25s ease;
  }

  ${props =>
    props.$active &&
    `
    color: ${color.primary};
  `}
`;

const NavDropdown = styled.div`
  position: absolute;
  top: calc(100% + 10px);
  left: 0;
  min-width: 250px;
  background: #ffffff;
  border: 1px solid ${color.border};
  border-radius: 10px;
  box-shadow: 0 22px 45px rgba(42, 38, 34, 0.16);
  padding: 8px;
  opacity: ${props => (props.$open ? '1' : '0')};
  visibility: ${props => (props.$open ? 'visible' : 'hidden')};
  transform: ${props => (props.$open ? 'translateY(0)' : 'translateY(8px)')};
  transition: all 0.22s ease;
  z-index: 1001;

  &::before {
    content: '';
    position: absolute;
    top: -10px;
    left: 0;
    right: 0;
    height: 10px;
  }
`;

const DropdownLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 11px 14px;
  font-size: 0.88rem;
  font-weight: 500;
  color: ${color.textDark};
  border-radius: 7px;
  transition: all 0.2s ease;

  &:hover {
    background: ${color.cream};
    color: ${color.primary};
    padding-left: 18px;
  }

  svg {
    font-size: 0.8rem;
    opacity: 0;
    transition: opacity 0.2s ease;
  }

  &:hover svg {
    opacity: 1;
  }
`;

const NavActions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
`;

const RequestButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: ${color.primary};
  color: #ffffff;
  padding: 12px 22px;
  border-radius: 6px;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  white-space: nowrap;

  &:hover {
    background: ${color.primaryDark};
    transform: translateY(-2px);
    box-shadow: 0 10px 22px rgba(255, 125, 51, 0.35);
  }

  @media (max-width: 768px) {
    padding: 10px 14px;
    font-size: 0.72rem;
  }
`;

const MobileMenuButton = styled.button`
  background: none;
  border: none;
  color: ${color.heading};
  font-size: 1.6rem;
  cursor: pointer;
  display: none;
  align-items: center;
  justify-content: center;
  padding: 6px;

  &:hover {
    color: ${color.primary};
  }

  @media (max-width: 1100px) {
    display: flex;
  }
`;

/* ================= Language switcher ================= */
const LanguageWrapper = styled.div`
  position: relative;
  flex-shrink: 0;
`;

const LanguageButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #ffffff;
  border: 2px solid ${props => (props.$open ? color.primaryDark : color.primary)};
  color: #2A2622;
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  cursor: pointer;
  padding: 7px 15px;
  border-radius: 999px;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.28);
  transition: all 0.2s ease;

  &:hover {
    background: #ffffff;
    border-color: ${color.primaryDark};
    color: #2A2622;
  }

  svg:first-child {
    color: ${color.primary};
    font-size: 0.92rem;
  }

  svg:last-child {
    font-size: 0.75rem;
    transition: transform 0.2s ease;
    transform: ${props => (props.$open ? 'rotate(180deg)' : 'rotate(0deg)')};
  }
`;

const FlagText = styled.span`
  font-size: 1rem;
  line-height: 1;
`;

const LanguageMenu = styled.div`
  position: fixed;
  top: 54px;
  right: max(24px, calc((100vw - 1400px) / 2 + 20px));
  width: 190px;
  padding: 8px;
  border-radius: 12px;
  background: #ffffff;
  border: 1px solid ${color.border};
  box-shadow: 0 18px 40px rgba(42, 38, 34, 0.18);
  opacity: ${props => (props.$open ? '1' : '0')};
  visibility: ${props => (props.$open ? 'visible' : 'hidden')};
  transform: ${props => (props.$open ? 'translateY(0)' : 'translateY(-6px)')};
  transition: opacity 0.18s ease, transform 0.18s ease, visibility 0.18s ease;
  z-index: 1100;
`;

const LanguageOption = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 11px;
  border: none;
  border-radius: 8px;
  background: ${props => (props.$active ? '#FFF1E6' : 'transparent')};
  color: ${props => (props.$active ? color.primaryDark : color.heading)};
  font-size: 0.88rem;
  font-weight: ${props => (props.$active ? '700' : '500')};
  text-align: left;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease;

  &:hover {
    background: ${props => (props.$active ? '#FFE3D0' : 'rgba(255, 125, 51, 0.12)')};
    color: ${props => (props.$active ? color.primaryDark : color.primary)};
  }
`;

const HiddenTranslateRoot = styled.div`
  position: fixed;
  left: -9999px;
  top: -9999px;
  width: 1px;
  height: 1px;
  overflow: hidden;
`;

/* ================= Mobile menu ================= */
const MobileOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(42, 38, 34, 0.55);
  opacity: ${props => (props.$open ? '1' : '0')};
  visibility: ${props => (props.$open ? 'visible' : 'hidden')};
  transition: all 0.3s ease;
  z-index: 1050;
`;

const MobileMenu = styled.div`
  position: fixed;
  top: 0;
  right: ${props => (props.$open ? '0' : '-100%')};
  width: min(360px, 88vw);
  height: 100vh;
  background: linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%);
  z-index: 1100;
  transition: right 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  box-shadow: -8px 0 30px rgba(42, 38, 34, 0.2);
  overflow-y: auto;
`;

const MobileMenuHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid ${color.border};

  img {
    height: 44px;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.6rem;
  color: ${color.heading};
  cursor: pointer;
  display: flex;

  &:hover {
    color: ${color.primary};
  }
`;

const MobileMenuBody = styled.div`
  padding: 16px 20px 30px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const MobileNavLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 6px;
  font-size: 0.95rem;
  font-weight: 600;
  color: ${color.heading};
  border-bottom: 1px solid ${color.border};
  transition: color 0.2s ease, padding 0.2s ease;

  &:hover {
    color: ${color.primary};
    padding-left: 12px;
  }
`;

const MobileAccordionButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 6px;
  font-size: 0.95rem;
  font-weight: 600;
  color: ${color.heading};
  background: none;
  border: none;
  border-bottom: 1px solid ${color.border};
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: ${color.primary};
  }

  svg {
    transition: transform 0.25s ease;
    transform: ${props => (props.$open ? 'rotate(180deg)' : 'rotate(0deg)')};
  }
`;

const MobileSubList = styled.div`
  display: ${props => (props.$open ? 'flex' : 'none')};
  flex-direction: column;
  background: ${color.cream};
  border-radius: 8px;
  margin: 6px 0 10px;
  overflow: hidden;
`;

const MobileSubLink = styled(Link)`
  padding: 12px 18px;
  font-size: 0.88rem;
  font-weight: 500;
  color: ${color.textDark};
  border-bottom: 1px solid ${color.border};
  transition: all 0.2s ease;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: #ffffff;
    color: ${color.primary};
    padding-left: 24px;
  }
`;

const MobileMenuFooter = styled.div`
  margin-top: auto;
  padding: 20px;
  border-top: 1px solid ${color.border};
  display: flex;
  flex-direction: column;
  gap: 12px;

  a {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 13px 18px;
    border-radius: 6px;
    font-size: 0.82rem;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
  }
`;

const MobileRequestLink = styled(Link)`
  background: ${color.primary};
  color: #ffffff;
`;

const MobileWhatsAppLink = styled.a`
  background: #25d366;
  color: #ffffff;
`;

const MobileLanguageLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${color.textDark};

  svg {
    color: ${color.primary};
    font-size: 0.95rem;
  }
`;

const MobileLanguageGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const MobileLanguageChip = styled.button`
  padding: 8px 14px;
  border-radius: 999px;
  border: 1.5px solid ${props => (props.$active ? color.primary : color.border)};
  background: ${props => (props.$active ? '#FFF1E6' : '#ffffff')};
  color: ${props => (props.$active ? color.primaryDark : color.heading)};
  font-size: 0.78rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${color.primary};
    color: ${props => (props.$active ? color.primaryDark : color.primary)};
  }
`;

const MobileContactRow = styled.a`
  display: flex !important;
  justify-content: flex-start !important;
  gap: 10px;
  padding: 10px 0 !important;
  font-size: 0.85rem !important;
  font-weight: 500 !important;
  text-transform: none !important;
  letter-spacing: 0 !important;
  color: ${color.textDark};

  svg {
    color: ${color.primary};
  }
`;

/* ================= Data ================= */
const LANGUAGES = [
  { code: 'en', short: 'EN', label: 'English', flag: '🇬🇧' },
  { code: 'pl', short: 'PL', label: 'Polish', flag: '🇵🇱' },
  { code: 'de', short: 'DE', label: 'German', flag: '🇩🇪' },
  { code: 'it', short: 'IT', label: 'Italian', flag: '🇮🇹' },
  { code: 'fr', short: 'FR', label: 'French', flag: '🇫🇷' },
  { code: 'es', short: 'ES', label: 'Spanish', flag: '🇪🇸' },
];

const NAV_ITEMS = [
  { label: 'Home', to: '/' },
  {
    label: 'Day Trips',
    to: '/dayTrips',
    children: [
      { label: 'All Day Trips & Tours', to: '/dayTrips' },
      { label: 'Special Packages', to: '/tours' },
    ],
  },
  {
    label: 'Safaris',
    to: '/safaris',
    children: [
      { label: 'All Safaris', to: '/safaris' },
    ],
  },
  { label: 'Gallery', to: '/gallery' },
  { label: 'About Us', to: '/about' },
  { label: 'Reviews', to: '#reviews' },
  { label: 'Contact', to: '/contact' },
];

const PHONE = '+255 616 543 216';
const EMAIL = 'zanstonetoursandsafaris@gmail.com';
const WHATSAPP_URL = 'https://wa.me/255616543216';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [openAccordion, setOpenAccordion] = useState(null);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(
    () => localStorage.getItem('zanstone-language') || 'en'
  );
  const languageRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setLanguageOpen(false);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    window.googleTranslateElementInit = () => {
      if (!window.google?.translate?.TranslateElement) return;

      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'en',
          includedLanguages: LANGUAGES.map(language => language.code).join(','),
          autoDisplay: false,
        },
        'google_translate_element'
      );
    };

    if (!document.querySelector('script[src*="translate_a/element.js"]')) {
      const script = document.createElement('script');
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);
    } else if (window.google?.translate?.TranslateElement) {
      window.googleTranslateElementInit();
    }
  }, []);

  useEffect(() => {
    const handleDocumentClick = event => {
      if (!languageRef.current?.contains(event.target)) {
        setLanguageOpen(false);
      }
      if (!event.target.closest?.('[data-nav-item]')) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleDocumentClick);
    return () => document.removeEventListener('mousedown', handleDocumentClick);
  }, []);

  useEffect(() => {
    if (currentLanguage !== 'en') {
      applyGoogleTranslate(currentLanguage);
    }
  }, [currentLanguage]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const applyGoogleTranslate = languageCode => {
    const combo = document.querySelector('.goog-te-combo');

    if (!combo) {
      setTimeout(() => applyGoogleTranslate(languageCode), 350);
      return;
    }

    combo.value = languageCode === 'en' ? '' : languageCode;
    combo.dispatchEvent(new Event('change'));
  };

  const clearGoogleTranslateCookie = () => {
    document.cookie = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname};`;

    const hostParts = window.location.hostname.split('.');
    if (hostParts.length > 1) {
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${hostParts
        .slice(-2)
        .join('.')};`;
    }
  };

  const handleLanguageChange = languageCode => {
    setCurrentLanguage(languageCode);
    setLanguageOpen(false);
    localStorage.setItem('zanstone-language', languageCode);

    if (languageCode === 'en') {
      clearGoogleTranslateCookie();
      window.location.reload();
      return;
    }

    document.cookie = `googtrans=/en/${languageCode}; path=/;`;
    applyGoogleTranslate(languageCode);
  };

  const closeMobileMenu = () => {
    setMenuOpen(false);
    setOpenAccordion(null);
  };

  const handleNavClick = item => {
    closeMobileMenu();
    setOpenDropdown(null);

    if (item === '#reviews' || item?.to === '#reviews') {
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
    }
  };

  const selectedLanguage =
    LANGUAGES.find(language => language.code === currentLanguage) || LANGUAGES[0];

  const isActive = to => to !== '#reviews' && location.pathname === to;

  return (
    <>
      <TopBar $hidden={scrolled}>
        <TopBarInner>
          <TopBarGroup>
            <a href={`tel:${PHONE.replace(/\s/g, '')}`}>
              <FiPhone />
              {PHONE}
            </a>
            <a href={`mailto:${EMAIL}`}>
              <FiMail />
              {EMAIL}
            </a>
            <span>
              <FiMapPin />
              Fuoni Uwandani, Zanzibar, Tanzania
            </span>
          </TopBarGroup>

          <TopBarGroup>
            <TopRating
              href="#reviews"
              onClick={e => {
                e.preventDefault();
                handleNavClick('#reviews');
              }}
            >
              <FiStar />
              <strong>4.9</strong> Google Reviews
            </TopRating>

            <LanguageWrapper ref={languageRef}>
              <LanguageButton
                type="button"
                $open={languageOpen}
                onClick={() => setLanguageOpen(open => !open)}
                aria-label="Change language"
                aria-expanded={languageOpen}
              >
                <FiGlobe />
                <span>{selectedLanguage.label}</span>
                <FiChevronDown />
              </LanguageButton>
              <LanguageMenu $open={languageOpen && !scrolled}>
                {LANGUAGES.map(language => (
                  <LanguageOption
                    key={language.code}
                    type="button"
                    $active={currentLanguage === language.code}
                    onClick={() => handleLanguageChange(language.code)}
                  >
                    <FlagText>{language.flag}</FlagText>
                    <span>{language.label}</span>
                  </LanguageOption>
                ))}
              </LanguageMenu>
            </LanguageWrapper>

            <TopSocials>
              <a
                href="https://www.facebook.com/profile.php?id=61563624100258"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://www.instagram.com/zanstone_tours_and_safaris"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
              <a
                href="https://www.tripadvisor.com/zanstone_tours_and_safaris"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TripAdvisor"
              >
                <FaTripadvisor />
              </a>
            </TopSocials>
          </TopBarGroup>
        </TopBarInner>
      </TopBar>

      <NavContainer $scrolled={scrolled} $topHidden={scrolled}>
        <NavContent>
          <LogoContainer to="/" onClick={closeMobileMenu}>
            <LogoImage src={logo} alt="ZanStone Tours & Safaris" />
          </LogoContainer>

          <NavMenu>
            {NAV_ITEMS.map(item => (
              <NavItem
                key={item.label}
                data-nav-item
                onMouseEnter={() => item.children && setOpenDropdown(item.label)}
                onMouseLeave={() => item.children && setOpenDropdown(null)}
              >
                <NavLink
                  to={item.to}
                  $active={isActive(item.to)}
                  onClick={() => handleNavClick(item)}
                >
                  {item.label}
                  {item.children && <FiChevronDown />}
                </NavLink>
                {item.children && (
                  <NavDropdown
                    $open={openDropdown === item.label}
                    onClick={() => setOpenDropdown(null)}
                  >
                    {item.children.map(child => (
                      <DropdownLink key={child.label} to={child.to}>
                        {child.label}
                        <FiChevronDown style={{ transform: 'rotate(-90deg)' }} />
                      </DropdownLink>
                    ))}
                  </NavDropdown>
                )}
              </NavItem>
            ))}
          </NavMenu>

          <NavActions>
            <RequestButton to="/contact">Make a Request</RequestButton>
            <MobileMenuButton onClick={() => setMenuOpen(true)} aria-label="Open menu">
              <FiMenu />
            </MobileMenuButton>
          </NavActions>
        </NavContent>
      </NavContainer>

      <MobileOverlay $open={menuOpen} onClick={closeMobileMenu} />
      <MobileMenu $open={menuOpen}>
        <MobileMenuHeader>
          <img src={logo} alt="ZanStone Tours & Safaris" />
          <CloseButton onClick={closeMobileMenu} aria-label="Close menu">
            <FiX />
          </CloseButton>
        </MobileMenuHeader>

        <MobileMenuBody>
          {NAV_ITEMS.map(item =>
            item.children ? (
              <div key={item.label}>
                <MobileAccordionButton
                  $open={openAccordion === item.label}
                  onClick={() =>
                    setOpenAccordion(open => (open === item.label ? null : item.label))
                  }
                >
                  {item.label}
                  <FiChevronDown />
                </MobileAccordionButton>
                <MobileSubList $open={openAccordion === item.label}>
                  {item.children.map(child => (
                    <MobileSubLink key={child.label} to={child.to} onClick={closeMobileMenu}>
                      {child.label}
                    </MobileSubLink>
                  ))}
                </MobileSubList>
              </div>
            ) : (
              <MobileNavLink
                key={item.label}
                to={item.to}
                onClick={() => handleNavClick(item)}
              >
                {item.label}
              </MobileNavLink>
            )
          )}
        </MobileMenuBody>

        <MobileMenuFooter>
          <MobileLanguageLabel>
            <FiGlobe /> Language
          </MobileLanguageLabel>
          <MobileLanguageGrid>
            {LANGUAGES.map(language => (
              <MobileLanguageChip
                key={language.code}
                type="button"
                $active={currentLanguage === language.code}
                onClick={() => handleLanguageChange(language.code)}
              >
                {language.label}
              </MobileLanguageChip>
            ))}
          </MobileLanguageGrid>
          <MobileContactRow href={`tel:${PHONE.replace(/\s/g, '')}`}>
            <FiPhone /> {PHONE}
          </MobileContactRow>
          <MobileContactRow href={`mailto:${EMAIL}`}>
            <FiMail /> {EMAIL}
          </MobileContactRow>
          <MobileRequestLink to="/contact" onClick={closeMobileMenu}>
            Make a Request
          </MobileRequestLink>
          <MobileWhatsAppLink
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaWhatsapp /> Chat on WhatsApp
          </MobileWhatsAppLink>
        </MobileMenuFooter>
      </MobileMenu>

      <HiddenTranslateRoot id="google_translate_element" />
    </>
  );
};

export default Header;
