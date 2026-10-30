// src/components/Tours/ToursSection.js
import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FiClock, FiStar, FiMapPin, FiUsers, FiSearch } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import SectionTitle from '../components/SectionTitle';
import BookingFormModal from '../components/BookingFormModal';
import { allTours } from '../tourData';

const Section = styled.section`
  padding: 60px 0;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
  min-height: 100vh;
`;

const ToursContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 16px;
`;

const SearchContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
`;

const SearchBar = styled.div`
  position: relative;
  width: 100%;
  max-width: 500px;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 14px 20px 14px 50px;
  border: 2px solid #e2e8f0;
  border-radius: 20px;
  font-size: 0.95rem;
  background: white;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  
  &:focus {
    outline: none;
    border-color: #FF7D33;
    box-shadow: 0 0 0 3px rgba(255, 125, 51, 0.1), 0 6px 20px rgba(0, 0, 0, 0.12);
  }

  &::placeholder {
    color: #94a3b8;
  }
`;

const SearchIcon = styled(FiSearch)`
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  color: #94a3b8;
  width: 18px;
  height: 18px;
`;

const CompactGrid = styled.div`
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
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  position: relative;
  height: 380px;
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(255, 255, 255, 0.2);

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 16px 32px rgba(0, 0, 0, 0.12);
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #FF7D33, #FF6B6B, #FF7D33);
    background-size: 200% 100%;
    animation: shimmer 3s ease infinite;
    z-index: 2;
  }

  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }

  @media (max-width: 768px) {
    height: 360px;
  }

  @media (max-width: 480px) {
    height: 340px;
    border-radius: 14px;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  height: 210px;
  overflow: hidden;
  flex-shrink: 0;

  @media (max-width: 480px) {
    height: 190px;
  }
`;

const TourImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.5s ease;
  
  ${TourCard}:hover & {
    transform: scale(1.1);
  }
`;

const ImageOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.3));
  height: 40px;
  z-index: 1;
`;

const VIPBadge = styled.div`
  background: linear-gradient(135deg, #FFD700, #FFA500);
  color: #000;
  padding: 5px 10px;
  border-radius: 14px;
  font-size: 0.65rem;
  font-weight: 700;
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 3;
  box-shadow: 0 4px 12px rgba(255, 215, 0, 0.4);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);

  @media (max-width: 480px) {
    padding: 4px 8px;
    font-size: 0.6rem;
    top: 8px;
    right: 8px;
  }
`;

const TourContent = styled.div`
  padding: 9px;
  flex: 1;
  display: flex;
  flex-direction: column;

  @media (max-width: 480px) {
    padding: 8px;
  }
`;

const TourHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 6px;
  gap: 8px;
`;

const TourTitle = styled.h3`
  margin: 0;
  font-size: 1rem;
  color: #1a202c;
  line-height: 1.3;
  font-weight: 700;
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: 2.4rem;

  @media (max-width: 480px) {
    font-size: 0.95rem;
    min-height: 2.2rem;
  }
`;

const TourPrice = styled.div`
  background: linear-gradient(135deg, #FF7D33, #FF6B6B);
  color: white;
  padding: 5px 10px;
  border-radius: 8px;
  font-weight: 700;
  font-size: 0.9rem;
  white-space: nowrap;
  box-shadow: 0 4px 12px rgba(255, 125, 51, 0.3);
  flex-shrink: 0;

  @media (max-width: 480px) {
    font-size: 0.85rem;
    padding: 4px 8px;
  }
`;

const TourDescription = styled.p`
  color: #64748b;
  font-size: 0.8rem;
  line-height: 1.4;
  margin-bottom: 7px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: 2.2rem;
  flex-shrink: 0;

  @media (max-width: 480px) {
    font-size: 0.75rem;
    margin-bottom: 6px;
    min-height: 2rem;
  }
`;

const TourFeatures = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 6px;
  flex-shrink: 0;

  @media (max-width: 480px) {
    gap: 6px;
    margin-bottom: 5px;
  }
`;

const Feature = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  color: #475569;
  font-size: 0.7rem;
  font-weight: 500;
  
  svg {
    color: #FF7D33;
    flex-shrink: 0;
    width: 12px;
    height: 12px;
  }

  @media (max-width: 480px) {
    font-size: 0.65rem;
    
    svg {
      width: 11px;
      height: 11px;
    }
  }
`;

const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: auto;
  padding-top: 7px;
  border-top: 1px solid #f1f5f9;
  flex-shrink: 0;

  @media (max-width: 480px) {
    padding-top: 6px;
  }
`;

const CardActions = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const Stars = styled.div`
  display: flex;
  gap: 1px;
`;

const Star = styled.div`
  color: ${props => props.filled ? '#FFD700' : '#e2e8f0'};
  font-size: 0.75rem;

  @media (max-width: 480px) {
    font-size: 0.7rem;
  }
`;

const ReviewCount = styled.span`
  color: #64748b;
  font-size: 0.7rem;
  font-weight: 500;

  @media (max-width: 480px) {
    font-size: 0.65rem;
  }
`;

const BookNowButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #FF7D33, #E56C2B);
  color: white;
  border: none;
  padding: 7px 14px;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 700;
  font-size: 0.75rem;
  transition: all 0.3s ease;
  cursor: pointer;
  line-height: 1;
  box-shadow: 0 4px 12px rgba(255, 125, 51, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(255, 125, 51, 0.45);
  }

  @media (max-width: 480px) {
    padding: 6px 10px;
    font-size: 0.7rem;
  }
`;

const DetailsButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: 2px solid #FF7D33;
  color: #FF7D33;
  padding: 5px 10px;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 700;
  font-size: 0.75rem;
  transition: all 0.3s ease;
  min-width: 60px;
  cursor: pointer;
  line-height: 1;
  
  &:hover {
    transform: translateY(-1px);
    background: rgba(255, 125, 51, 0.08);
    color: #FF7D33;
  }

  @media (max-width: 480px) {
    padding: 4px 8px;
    font-size: 0.7rem;
    min-width: 55px;
    border-radius: 5px;
  }
`;

const EmptyState = styled(motion.div)`
  text-align: center;
  padding: 60px 20px;
  
  h3 {
    font-size: 1.3rem;
    color: #1e293b;
    margin-bottom: 10px;
    font-weight: 600;
  }
  
  p {
    color: #64748b;
    font-size: 0.9rem;
    line-height: 1.5;
  }
`;

const ResultsCount = styled.div`
  color: #64748b;
  font-size: 0.85rem;
  margin-bottom: 16px;
  text-align: center;

  @media (max-width: 480px) {
    font-size: 0.8rem;
    margin-bottom: 14px;
  }
`;

const ToursSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showBookingModal, setShowBookingModal] = useState(false);

  // Get all tours (excluding transfer)
  const getToursToShow = () => {
    const { transfer, ...otherCategories } = allTours;
    let tours = Object.values(otherCategories).flat();

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      tours = tours.filter(tour => 
        tour.name.toLowerCase().includes(query) ||
        (tour.description && tour.description.toLowerCase().includes(query)) ||
        (tour.location && tour.location.toLowerCase().includes(query))
      );
    }

    return tours;
  };

  const toursToShow = getToursToShow();

  // Compact description getter
  const getDescription = (tour) => {
    const isVipTour = tour.comprehensiveImage && tour.category === 'vip';
    
    if (isVipTour) {
      return "VIP luxury experience with premium service";
    }
    
    if (tour.description) {
      return tour.description.length > 60 
        ? `${tour.description.substring(0, 60)}...` 
        : tour.description;
    }
    
    return "Premium tour experience with expert guides";
  };

  // Safe time getter
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

  // Get tour type/category
  const getTourType = (tour) => {
    if (tour.category === 'vip') return 'VIP';
    if (tour.category === 'private') return 'Private';
    if (tour.category === 'sharing') return 'Group';
    return 'Tour';
  };

  // Safe image getter
  const getImage = (tour) => {
    const isVipTour = tour.comprehensiveImage && tour.category === 'vip';
    if (isVipTour && tour.comprehensiveImage) {
      return tour.image;
    }
    return tour.image || tour.image;
  };

  // Check if tour is VIP
  const isVipTour = (tour) => {
    return tour.comprehensiveImage && tour.category === 'vip';
  };

  // Generate random rating between 4.0 and 5.0
  const getRandomRating = (tourId) => {
    return (4 + Math.random()).toFixed(1);
  };

  return (
    <Section id="tours">
      <ToursContainer>
        <SectionTitle>
          Discover Amazing Tours
        </SectionTitle>

        {/* Centered Search */}
        <SearchContainer>
          <SearchBar>
            <SearchIcon />
            <SearchInput
              type="text"
              placeholder="Search tours by name, location, or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </SearchBar>
        </SearchContainer>

        {/* Results Count */}
        {toursToShow.length > 0 && (
          <ResultsCount>
            Showing {toursToShow.length} {toursToShow.length === 1 ? 'tour' : 'tours'}
            {searchQuery && ` for "${searchQuery}"`}
          </ResultsCount>
        )}

        <AnimatePresence mode="wait">
          {toursToShow.length > 0 ? (
            <CompactGrid>
              {toursToShow.map((tour, index) => (
                <TourCard
                  key={tour.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ y: -6 }}
                >
                  <ImageContainer>
                    <TourImage 
                      src={getImage(tour)} 
                      alt={tour.name}
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400&h=240&fit=crop';
                      }}
                    />
                    <ImageOverlay />
                    {isVipTour(tour) && <VIPBadge>⭐ Special</VIPBadge>}
                  </ImageContainer>

                  <TourContent>
                    <TourHeader>
                      <TourTitle>{tour.name}</TourTitle>
                    </TourHeader>

                    <TourDescription>
                      {getDescription(tour)}
                    </TourDescription>

                    <TourFeatures>
                      <Feature>
                        <FiClock />
                        <span>{getTime(tour)}</span>
                      </Feature>
                      <Feature>
                        <FiUsers />
                        <span>{getTourType(tour)}</span>
                      </Feature>
                      <Feature>
                        <FiMapPin />
                        <span>{tour.location || "Various"}</span>
                      </Feature>
                    </TourFeatures>

                    <CardFooter>
                      <Rating>
                        <Stars>
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star key={star} filled={star <= 4}>
                              ★
                            </Star>
                          ))}
                        </Stars>
                        <ReviewCount>
                          {getRandomRating(tour.id)}
                        </ReviewCount>
                      </Rating>
                      <CardActions>
                        <BookNowButton type="button" onClick={() => setShowBookingModal(true)}>
                          Book Now
                        </BookNowButton>
                        <DetailsButton to={`/tours/${tour.id}`}>
                          View
                        </DetailsButton>
                      </CardActions>
                    </CardFooter>
                  </TourContent>
                </TourCard>
              ))}
            </CompactGrid>
          ) : (
            <EmptyState
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <h3>No tours found</h3>
              <p>
                {searchQuery 
                  ? `We couldn't find any tours matching "${searchQuery}". Try adjusting your search.`
                  : "We couldn't find any tours available at the moment."}
              </p>
            </EmptyState>
          )}
        </AnimatePresence>
      </ToursContainer>

      <BookingFormModal open={showBookingModal} onClose={() => setShowBookingModal(false)} />
    </Section>
  );
};

export default ToursSection;