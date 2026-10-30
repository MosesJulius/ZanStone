// src/pages/DayTrips.jsx

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useSearchParams } from 'react-router-dom';
import { FiClock, FiUsers, FiMapPin, FiStar, FiFilter, FiSearch } from 'react-icons/fi';
import { FaStar } from 'react-icons/fa';
import { dayTripsData, getAllDayTrips, getFeaturedDayTrips, isZanzibarPackage } from '../DataTripsData';
import { safaris as parkSafaris } from './Safaris';
import BookingFormModal from '../components/BookingFormModal';
import Footer from '../components/Footer';
import { color } from '../styles/color';

// Responsive breakpoints
const breakpoints = {
  mobile: '768px',
  tablet: '1024px',
  desktop: '1200px'
};

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
`;

const HeroSection = styled.section`
  background: linear-gradient(135deg, #4CAF50, #2E7D32);
  padding: 158px 20px 90px;
  color: white;
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '☀️';
    position: absolute;
    top: 20px;
    right: 20px;
    font-size: 150px;
    opacity: 0.1;
    transform: rotate(15deg);
  }

  &::after {
    content: '🌴';
    position: absolute;
    bottom: 20px;
    left: 20px;
    font-size: 150px;
    opacity: 0.1;
    transform: rotate(-15deg);
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 118px 15px 60px;
  }
`;

const HeroTitle = styled(motion.h1)`
  font-size: 3.4rem;
  margin-bottom: 18px;
  font-weight: 800;
  color: ${color.white};
  position: relative;
  z-index: 2;
  text-shadow: 0 2px 12px rgba(0, 0, 0, 0.28);

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 2.4rem;
  }

  @media (max-width: 480px) {
    font-size: 1.9rem;
  }
`;

const HeroSubtitle = styled(motion.p)`
  font-size: 1.25rem;
  font-style: italic;
  max-width: 800px;
  margin: 0 auto;
  color: #FFF8F0;
  opacity: 0.95;
  line-height: 1.6;
  position: relative;
  z-index: 2;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 1.05rem;
  }
`;

const ContentContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 60px 20px;

  @media (max-width: ${breakpoints.mobile}) {
    padding: 40px 15px;
  }
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  color: ${color.heading};
  margin-bottom: 44px;
  font-weight: 700;
  text-align: center;
  position: relative;
  display: block;

  &::after {
    content: '';
    position: absolute;
    bottom: -14px;
    left: 50%;
    transform: translateX(-50%);
    width: 46px;
    height: 3px;
    background: linear-gradient(90deg, #4CAF50, #2E7D32);
    border-radius: 2px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 2rem;
    margin-bottom: 34px;
  }
`;

const FilterBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  flex-wrap: wrap;
  gap: 20px;
  background: white;
  border: 1px solid ${color.border};
  padding: 18px 20px;
  border-radius: 14px;
  box-shadow: 0 6px 20px rgba(42, 38, 34, 0.05);

  @media (max-width: ${breakpoints.mobile}) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  background: #f1f5f9;
  border: 1px solid ${color.border};
  border-radius: 8px;
  padding: 0 15px;
  flex: 1;
  max-width: 400px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  &:focus-within {
    border-color: ${color.primary};
    box-shadow: 0 0 0 3px rgba(255, 125, 51, 0.12);
  }

  svg {
    color: ${color.textMuted};
    font-size: 1.2rem;
  }

  input {
    border: none;
    background: none;
    padding: 12px;
    width: 100%;
    font-size: 1rem;
    outline: none;
    color: ${color.textDark};

    &::placeholder {
      color: ${color.textMuted};
    }
  }

  @media (max-width: ${breakpoints.mobile}) {
    max-width: 100%;
  }
`;

const FilterButtons = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

const FilterButton = styled.button`
  padding: 10px 20px;
  border: 1px solid ${props => (props.active ? color.primary : color.border)};
  background: ${props => (props.active ? '#4CAF50' : 'white')};
  color: ${props => (props.active ? 'white' : color.textDark)};
  border-radius: 999px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 14px rgba(255, 125, 51, 0.22);
    border-color: ${color.primary};
    color: ${props => (props.active ? 'white' : color.primary)};
  }

  svg {
    font-size: 1rem;
  }
`;

const ToursGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 30px;
  margin-top: 40px;

  @media (max-width: ${breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }

  @media (max-width: ${breakpoints.mobile}) {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
    margin-top: 20px;
  }

  @media (max-width: 480px) {
    gap: 10px;
  }
`;

const TourCard = styled(motion.div)`
  background: white;
  border: 1px solid ${color.border};
  border-radius: 14px;
  overflow: hidden;
  box-shadow: 0 6px 18px rgba(42, 38, 34, 0.06);
  transition: transform 0.4s ease, box-shadow 0.4s ease;
  cursor: pointer;
  position: relative;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 18px 36px rgba(255, 125, 51, 0.18);
  }

  @media (max-width: ${breakpoints.mobile}) {
    border-radius: 12px;
    box-shadow: 0 4px 14px rgba(42, 38, 34, 0.08);

    &:hover {
      transform: translateY(-4px);
    }
  }
`;

const CardImageContainer = styled.div`
  position: relative;
  height: 300px;
  overflow: hidden;
  border-radius: 14px 14px 0 0;

  @media (max-width: ${breakpoints.mobile}) {
    height: 180px;
    border-radius: 12px 12px 0 0;
  }

  @media (max-width: 480px) {
    height: 150px;
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: brightness(1.12) saturate(1.05);
  transition: transform 0.5s ease;

  ${TourCard}:hover & {
    transform: scale(1.05);
  }

  @media (max-width: ${breakpoints.mobile}) {
    ${TourCard}:hover & {
      transform: scale(1.05);
    }
  }
`;

const StatusBadge = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  background: ${props => props.color || 'linear-gradient(135deg, #FFD700, #FFA500)'};
  color: ${props => props.textColor || (props.$vip ? color.white : color.heading)};
  border: 1px solid ${props => (props.$vip ? 'transparent' : 'rgba(255, 125, 51, 0.35)')};
  padding: 7px 14px;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 700;
  z-index: 2;
  box-shadow: 0 4px 12px rgba(42, 38, 34, 0.14);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  white-space: nowrap;

  @media (max-width: ${breakpoints.mobile}) {
    padding: 4px 8px;
    font-size: 0.55rem;
    top: 8px;
    right: 8px;
  }
`;

const CardContent = styled.div`
  padding: 14px;
  display: flex;
  flex-direction: column;
  flex: 1;

  @media (max-width: ${breakpoints.mobile}) {
    padding: 8px;
  }

  @media (max-width: 480px) {
    padding: 7px;
  }
`;

const TourName = styled.h3`
  font-size: 1.4rem;
  color: ${color.heading};
  margin-bottom: 10px;
  font-weight: 700;
  line-height: 1.4;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 1rem;
    margin-bottom: 6px;
    line-height: 1.3;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    height: 2.6rem;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
    height: 2.4rem;
  }
`;

const TourShortDesc = styled.p`
  color: ${color.textMuted};
  font-size: 0.95rem;
  line-height: 1.6;
  margin-bottom: 8px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 0.75rem;
    line-height: 1.4;
    margin-bottom: 8px;
    -webkit-line-clamp: 2;
  }

  @media (max-width: 480px) {
    font-size: 0.7rem;
  }
`;

const TourMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-bottom: 8px;
  padding-bottom: 8px;
  border-bottom: 1px solid ${color.border};

  @media (max-width: ${breakpoints.mobile}) {
    gap: 8px;
    margin-bottom: 8px;
    padding-bottom: 8px;
  }
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  color: ${color.textDark};
  font-size: 0.9rem;
  font-weight: 500;

  svg {
    color: ${color.primary};
    font-size: 1rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 0.7rem;
    gap: 3px;
    
    svg {
      font-size: 0.8rem;
    }
  }

  @media (max-width: 480px) {
    font-size: 0.65rem;
    
    svg {
      font-size: 0.7rem;
    }
  }
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 8px;

  .stars {
    display: flex;
    gap: 2px;
  }

  .rating-number {
    font-weight: 700;
    color: ${color.heading};
    margin-left: 5px;
  }

  .reviews {
    color: ${color.textMuted};
    font-size: 0.85rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    margin-bottom: 8px;
    
    .stars svg {
      width: 12px;
      height: 12px;
    }
    
    .rating-number {
      font-size: 0.8rem;
    }
    
    .reviews {
      font-size: 0.7rem;
    }
  }
`;

const Star = styled(FaStar)`
  color: ${props => props.filled ? '#FFC107' : color.border};
`;

const PriceSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;

  @media (max-width: ${breakpoints.mobile}) {
    margin-top: 8px;
  }
`;

const CardActions = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  margin-top: auto;
  padding-top: 10px;
`;

const BookNowButton = styled.button`
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, ${color.primary}, ${color.primaryDark});
  color: white;
  border: none;
  padding: 11px 16px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 0.82rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(255, 125, 51, 0.3);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 22px rgba(255, 125, 51, 0.45);
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 7px 12px;
    font-size: 0.68rem;
    letter-spacing: 0.04em;
  }

  @media (max-width: 480px) {
    padding: 6px 10px;
    font-size: 0.62rem;
  }
`;

const Price = styled.div`
  .amount {
    font-size: 1.5rem;
    font-weight: 700;
    color: ${color.primary};
  }

  .note {
    font-size: 0.8rem;
    color: ${color.textMuted};
    display: block;
  }

  @media (max-width: ${breakpoints.mobile}) {
    .amount {
      font-size: 1rem;
    }
    
    .note {
      font-size: 0.6rem;
    }
  }

  @media (max-width: 480px) {
    .amount {
      font-size: 0.9rem;
    }
  }
`;

const ViewDetailsButton = styled(Link)`
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: 2px solid ${color.primary};
  color: ${color.primary};
  padding: 9px 16px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 700;
  font-size: 0.82rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    background: rgba(255, 125, 51, 0.08);
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 6px 12px;
    font-size: 0.68rem;
    border-radius: 6px;
    letter-spacing: 0.04em;
  }

  @media (max-width: 480px) {
    padding: 5px 10px;
    font-size: 0.62rem;
  }
`;

const FeaturedSection = styled.section`
  border: 1px solid ${color.border};
  border-radius: 16px;
  padding: 48px 30px 40px;
  box-shadow: 0 8px 26px rgba(42, 38, 34, 0.05);
  margin-bottom: 60px;

  @media (max-width: ${breakpoints.mobile}) {
    padding: 32px 14px 24px;
    margin-bottom: 30px;
    border-radius: 14px;
  }
`;

const NoResults = styled.div`
  text-align: center;
  padding: 60px 20px;
  background: white;
  border: 1px solid ${color.border};
  border-radius: 14px;
  box-shadow: 0 6px 20px rgba(42, 38, 34, 0.05);

  h3 {
    font-size: 1.8rem;
    color: ${color.heading};
    margin-bottom: 10px;
  }

  p {
    color: ${color.textMuted};
    font-size: 1.1rem;
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 30px 15px;
    
    h3 {
      font-size: 1.4rem;
    }
    
    p {
      font-size: 0.9rem;
    }
  }
`;

const isSafariTour = (tour) =>
  /mikumi|selous|nyerere|ruaha/i.test(`${tour.location} ${tour.name}`) ||
  (/safari/i.test(tour.name) && !/safari blue/i.test(tour.name));

const mapSafariToCard = (safari) => ({
  id: `safari-${safari.id}`,
  name: safari.title,
  shortDescription: safari.description,
  description: safari.description,
  duration: safari.duration,
  groupSize: safari.groupSize || 'Private tour',
  location: safari.location || 'Tanzania',
  rating: safari.rating || 5,
  reviewCount: safari.reviewCount || 0,
  price: safari.price,
  priceNote: safari.priceNote || 'Price based on',
  status: safari.status || 'Safari',
  image: safari.image,
  whatsappMessage: safari.whatsappMessage,
  detailPath: safari.detailPath || null,
});

const FILTER_META = {
  zanzibar: {
    title: 'All Zanzibar Tours 🏝️',
    subtitle: 'Every Zanzibar experience — island day tours and ocean adventures.',
    section: 'All Zanzibar Tours',
  },
  safari: {
    title: 'Tanzania Safaris 🦁',
    subtitle: 'Our ZanStone experiences in Zanzibar — ocean adventures led by local experts.',
    section: 'All Safaris',
  },
  daytrip: {
    title: 'Day Trips in Zanzibar ☀️',
    subtitle: 'Discover the best of Zanzibar in a single day! From marine adventures to cultural tours, we offer unforgettable experiences tailored just for you.',
    section: 'All Day Trips',
  },
  all: {
    title: 'Zanzibar & Safaris 🌍',
    subtitle: 'All our tours in one place — every ZanStone experience.',
    section: 'All Tours',
  },
};

// Helper function to format price display
const formatPrice = (price) => {
  if (!price) return 'Contact';
  
  if (typeof price === 'string') {
    // If it's a long string, shorten it
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

// Merge lists without showing the same package twice
// (safari cards reuse the same tours with a `safari-` id prefix)
const dedupeById = (tours) => {
  const seen = new Set();
  return tours.filter(tour => {
    const key = String(tour.id).replace(/^safari-/, '');
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};

const DayTripsPage = () => {
  const [searchParams] = useSearchParams();
  const filterParam = searchParams.get('filter');
  const meta = FILTER_META[filterParam];

  const safariCards = parkSafaris.map(mapSafariToCard);
  const baseTours =
    filterParam === 'safari'
      ? dedupeById([...dayTripsData.filter(isSafariTour), ...safariCards])
      : filterParam === 'zanzibar'
        ? dayTripsData.filter(isZanzibarPackage)
        : filterParam === 'daytrip'
          ? dayTripsData.filter(tour => tour.isDayTrip)
          : filterParam === 'all'
            ? dedupeById([...dayTripsData, ...safariCards])
            : dayTripsData;

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTours, setFilteredTours] = useState(dayTripsData);
  const [activeFilter, setActiveFilter] = useState('all');
  const [featuredTours, setFeaturedTours] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Get featured tours (limit based on screen size)
    const limit = window.innerWidth <= 768 ? 2 : 3;
    setFeaturedTours(getFeaturedDayTrips(limit));

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Filter tours based on search term and active filter
    let filtered = baseTours;

    if (searchTerm) {
      filtered = filtered.filter(tour => 
        tour.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tour.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tour.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (activeFilter === 'featured') {
      filtered = filtered.filter(tour => tour.featured);
    } else if (activeFilter === 'best-seller') {
      filtered = filtered.filter(tour => tour.status?.includes('Best-Seller'));
    } else if (!filterParam && !searchTerm) {
      // Featured tours are already shown in the section above — don't repeat them
      const featuredIds = new Set(featuredTours.map(tour => tour.id));
      filtered = filtered.filter(tour => !featuredIds.has(tour.id));
    }

    setFilteredTours(filtered);
  }, [searchTerm, activeFilter, filterParam, featuredTours]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setActiveFilter('all');
  };

  return (
    <PageContainer>

      
      <HeroSection>
        <HeroTitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {meta ? meta.title : 'Zanzibar Day Trips ☀️'}
        </HeroTitle>
        <HeroSubtitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {meta ? meta.subtitle : (
            <>
              Discover the best of Zanzibar in a single day! From marine adventures to cultural tours,
              we offer unforgettable experiences tailored just for you.
            </>
          )}
        </HeroSubtitle>
      </HeroSection>

      <ContentContainer>
        {!filterParam && activeFilter === 'all' && !searchTerm && featuredTours.length > 0 && (
          <FeaturedSection>
            <SectionTitle>Featured Day Trips</SectionTitle>
            <ToursGrid>
              {featuredTours.map((tour, index) => (
                <TourCard
                  key={tour.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <CardImageContainer>
                    <CardImage src={tour.image} alt={tour.name} />
                    {tour.status && (
                      <StatusBadge $vip={tour.status.includes('VIP')}>⭐ {tour.status}</StatusBadge>
                    )}
                  </CardImageContainer>
                  
                  <CardContent>
                    <TourName>{tour.name}</TourName>
                    {!isMobile && <TourShortDesc>{tour.shortDescription}</TourShortDesc>}
                    
                    <TourMeta>
                      <MetaItem>
                        <FiClock /> {tour.duration}
                      </MetaItem>
                      <MetaItem>
                        <FiUsers /> {isMobile ? tour.groupSize.split(' ')[0] : tour.groupSize}
                      </MetaItem>
                      <MetaItem>
                        <FiMapPin /> {tour.location}
                      </MetaItem>
                    </TourMeta>

                    {!isMobile && (
                      <Rating>
                        <div className="stars">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} filled={i < Math.floor(tour.rating)} />
                          ))}
                        </div>
                        <span className="rating-number">{tour.rating}</span>
                        {tour.reviewCount > 0 && (
                          <span className="reviews">({tour.reviewCount} reviews)</span>
                        )}
                      </Rating>
                    )}

                    <PriceSection>
                      <Price>
                        <span className="amount">{formatPrice(tour.price)}</span>
                        {!isMobile && <span className="note">{tour.priceNote}</span>}
                      </Price>
                    </PriceSection>

                    <CardActions>
                      <BookNowButton type="button" onClick={() => setShowBookingModal(true)}>
                        Book Now
                      </BookNowButton>
                      {tour.detailPath !== null && (
                        <ViewDetailsButton to={tour.detailPath || `/TripsDetails/${tour.id}`}>
                          {isMobile ? 'View' : 'View Details'}
                        </ViewDetailsButton>
                      )}
                    </CardActions>
                  </CardContent>
                </TourCard>
              ))}
            </ToursGrid>
          </FeaturedSection>
        )}

        <SectionTitle>{meta ? meta.section : 'All Day Trips'}</SectionTitle>

        <FilterBar>
          <SearchBox>
            <FiSearch />
            <input
              type="text"
              placeholder="Search tours..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </SearchBox>

          <FilterButtons>
            <FilterButton
              active={activeFilter === 'all'}
              onClick={() => setActiveFilter('all')}
            >
              <FiFilter /> {isMobile ? 'All' : 'All Tours'}
            </FilterButton>
            <FilterButton
              active={activeFilter === 'featured'}
              onClick={() => setActiveFilter('featured')}
            >
              <FiStar /> {isMobile ? 'Featured' : 'Featured'}
            </FilterButton>
            <FilterButton
              active={activeFilter === 'best-seller'}
              onClick={() => setActiveFilter('best-seller')}
            >
              ⭐ {isMobile ? 'Best' : 'Best Sellers'}
            </FilterButton>
          </FilterButtons>
        </FilterBar>

        <AnimatePresence mode="wait">
          {filteredTours.length > 0 ? (
            <ToursGrid
              as={motion.div}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              {filteredTours.map((tour, index) => (
                <TourCard
                  key={tour.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  whileHover={{ y: -5 }}
                >
                  <CardImageContainer>
                    <CardImage src={tour.image} alt={tour.name} />
                    {tour.status && (
                      <StatusBadge $vip={tour.status.includes('VIP')}>⭐ {tour.status}</StatusBadge>
                    )}
                  </CardImageContainer>
                  
                  <CardContent>
                    <TourName>{tour.name}</TourName>
                    {!isMobile && <TourShortDesc>{tour.shortDescription}</TourShortDesc>}
                    
                    <TourMeta>
                      <MetaItem>
                        <FiClock /> {tour.duration}
                      </MetaItem>
                      <MetaItem>
                        <FiUsers /> {isMobile ? tour.groupSize.split(' ')[0] : tour.groupSize}
                      </MetaItem>
                      <MetaItem>
                        <FiMapPin /> {tour.location}
                      </MetaItem>
                    </TourMeta>

                    {!isMobile && (
                      <Rating>
                        <div className="stars">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} filled={i < Math.floor(tour.rating)} />
                          ))}
                        </div>
                        <span className="rating-number">{tour.rating}</span>
                        {tour.reviewCount > 0 && (
                          <span className="reviews">({tour.reviewCount} reviews)</span>
                        )}
                      </Rating>
                    )}

                    <PriceSection>
                      <Price>
                        <span className="amount">{formatPrice(tour.price)}</span>
                        {!isMobile && <span className="note">{tour.priceNote}</span>}
                      </Price>
                    </PriceSection>

                    <CardActions>
                      <BookNowButton type="button" onClick={() => setShowBookingModal(true)}>
                        Book Now
                      </BookNowButton>
                      {tour.detailPath !== null && (
                        <ViewDetailsButton to={tour.detailPath || `/TripsDetails/${tour.id}`}>
                          {isMobile ? 'View' : 'View Details'}
                        </ViewDetailsButton>
                      )}
                    </CardActions>
                  </CardContent>
                </TourCard>
              ))}
            </ToursGrid>
          ) : (
            <NoResults
              as={motion.div}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <h3>No tours found</h3>
              <p>Try adjusting your search or filters</p>
              <FilterButton onClick={clearFilters} style={{ marginTop: '20px', display: 'inline-flex' }}>
                Clear Filters
              </FilterButton>
            </NoResults>
          )}
        </AnimatePresence>
      </ContentContainer>

      <BookingFormModal open={showBookingModal} onClose={() => setShowBookingModal(false)} />
      <Footer />
    </PageContainer>
  );
};

export default DayTripsPage;