// src/pages/TourDetails.jsx (or DayTripsDetails.jsx)

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FaStar, FaWhatsapp } from 'react-icons/fa';
import { FiArrowLeft, FiCalendar, FiCheck, FiClock, FiHome, FiMapPin, FiStar, FiUsers, FiX } from 'react-icons/fi';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import BookingFormModal from '../components/BookingFormModal';
import Footer from '../components/Footer';
import { getDayTripById, getPriceTiersForTour } from '../DataTripsData'; // Fixed import path
import { allTours } from '../tourData';
import { color } from '../styles/color';

const breakpoints = {
  mobile: '768px',
  tablet: '1024px',
  desktop: '1200px'
};

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #ffffff 100%);
`;

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  width: fit-content;
  margin-bottom: 26px;
  padding: 10px 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  color: #4a5568;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    transform: translateX(-5px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    color: #FF7D33;
  }
`;

const HeroNav = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 26px;

  ${BackButton} {
    margin-bottom: 0;
  }
`;

const HomeButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  width: fit-content;
  padding: 10px 20px;
  background: ${color.primary};
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  color: #ffffff;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    transform: translateX(-5px);
    background: ${color.primaryDark};
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

const ErrorWrap = styled.div`
  padding-top: 150px;

  @media (max-width: ${breakpoints.mobile}) {
    padding-top: 110px;
  }

  ${BackButton} {
    margin-left: 40px;
    background: ${color.white};
    border-color: ${color.border};
    color: ${color.heading};

    &:hover {
      background: ${color.primary};
      border-color: ${color.primary};
      color: #ffffff;
    }

    @media (max-width: ${breakpoints.mobile}) {
      margin-left: 20px;
    }
  }
`;

const HeroSection = styled.section`
  position: relative;
  display: flex;
  align-items: flex-end;
  min-height: 680px;
  overflow: hidden;
  padding: 150px 60px 60px;

  @media (max-width: ${breakpoints.mobile}) {
    min-height: 480px;
    padding: 110px 20px 34px;
  }
`;

const HeroImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: ${props => props.$filter || 'brightness(1.3) saturate(1.1)'};
`;

const HeroOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 70%, rgba(0, 0, 0, 0.22));
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 1;
  color: #ffffff;
  max-width: 850px;
`;

const HeroTitle = styled(motion.h1)`
  font-size: clamp(2.1rem, 4vw, 3.4rem);
  font-weight: 800;
  line-height: 1.15;
  color: #ffffff;
  margin-bottom: 20px;
  text-shadow: 0 2px 14px rgba(0, 0, 0, 0.28);
`;

const HeroBadges = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;

const HeroBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: ${(props) => (props.$soft ? 'rgba(255, 255, 255, 0.94)' : (props.$bg || 'rgba(255, 255, 255, 0.2)'))};
  color: ${(props) => (props.$soft ? color.primaryDark : '#ffffff')};
  border: 1px solid ${(props) => (props.$soft ? 'rgba(255, 125, 51, 0.35)' : 'transparent')};
  padding: 8px 18px;
  border-radius: 30px;
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: 0.04em;

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 0.82rem;
    padding: 6px 14px;
  }
`;

const ContentContainer = styled.div`
  max-width: 1240px;
  margin: 0 auto;
  padding: 70px 20px;
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 40px;

  @media (max-width: ${breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 30px;
    padding: 50px 18px;
  }
`;

const MainContent = styled.div``;

const Sidebar = styled.div`
  @media (max-width: ${breakpoints.tablet}) {
    order: -1;
  }
`;

const InfoCard = styled.div`
  background: ${color.white};
  border: 1px solid ${color.border};
  border-radius: 14px;
  padding: 30px;
  box-shadow: 0 14px 38px rgba(42, 38, 34, 0.09);
  position: sticky;
  top: 135px;

  @media (max-width: ${breakpoints.tablet}) {
    position: static;
  }
`;

const PriceBox = styled.div`
  margin-bottom: 30px;
  padding-bottom: 30px;
  border-bottom: 1px solid ${color.border};
`;

const PriceTableTitle = styled.div`
  text-align: center;
  font-size: 1.35rem;
  font-weight: 700;
  color: ${color.heading};
  margin-bottom: 16px;
`;

const PriceTablePackage = styled.div`
  text-align: center;
  font-size: 1.1rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: ${color.textMuted};
  margin-bottom: 20px;
`;

const PriceTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  @media (max-width: ${breakpoints.mobile}) {
    display: block;
    overflow-x: auto;
  }
`;

const PriceTierHead = styled.th`
  background: ${color.heading};
  color: ${color.white};
  font-size: 1.05rem;
  font-weight: 700;
  padding: 16px 12px;
  border: 1px solid ${color.border};
`;

const PriceTierCell = styled.td`
  text-align: center;
  padding: 22px 12px;
  border: 1px solid ${color.border};
  background: ${color.cream};

  .from {
    display: block;
    font-size: 1rem;
    font-style: italic;
    color: ${color.textMuted};
  }

  .amount {
    display: block;
    font-size: 2.1rem;
    font-weight: 800;
    color: ${color.primary};
    margin: 6px 0;
  }

  .unit {
    display: block;
    font-size: 1rem;
    font-weight: 600;
    color: ${color.textMuted};
  }
`;

const QuickInfo = styled.div`
  margin-bottom: 30px;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 15px 0;
  border-bottom: 1px solid ${color.border};

  &:last-child {
    border-bottom: none;
  }

  svg {
    color: ${color.primary};
    font-size: 1.3rem;
  }

  div {
    flex: 1;
  }

  .label {
    color: ${color.textMuted};
    font-size: 0.9rem;
    margin-bottom: 5px;
  }

  .value {
    color: ${color.heading};
    font-weight: 600;
    font-size: 1.1rem;
  }
`;

const RatingBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
  padding: 20px;
  background: #f8fafc;
  border: 1px solid ${color.border};
  border-radius: 12px;
`;

const RatingScore = styled.div`
  .number {
    font-size: 2rem;
    font-weight: 800;
    color: ${color.heading};
    line-height: 1;
  }
  
  .stars {
    display: flex;
    gap: 4px;
    margin: 5px 0;
  }
  
  .reviews {
    color: ${color.textMuted};
    font-size: 0.9rem;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 30px;
`;

const BookButton = styled.button`
  background: linear-gradient(135deg, #FF7D33, #E56C2B);
  color: #ffffff;
  text-align: center;
  padding: 16px;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 700;
  font-size: 0.95rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
  width: 100%;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 22px rgba(255, 125, 51, 0.32);
  }

  @media (max-width: ${breakpoints.mobile}) {
    padding: 14px;
    font-size: 0.9rem;
  }
`;

const WhatsAppButton = styled.a`
  background: linear-gradient(135deg, #25D366, #128C7E);
  color: #ffffff;
  text-align: center;
  padding: 16px;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 700;
  font-size: 0.95rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 22px rgba(37, 211, 102, 0.32);
  }

  @media (max-width: ${breakpoints.mobile}) {
    font-size: 0.9rem;
  }
`;

const Section = styled.section`
  margin-bottom: 55px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h2`
  font-size: clamp(1.5rem, 2.6vw, 2rem);
  color: ${color.heading};
  margin-bottom: 30px;
  font-weight: 700;

  &::after {
    content: '';
    display: block;
    width: 40px;
    height: 3px;
    background: linear-gradient(90deg, #FF7D33, #FF6B6B);
    margin-top: 14px;
  }
`;

const Description = styled.div`
  color: ${color.textDark};
  line-height: 1.85;
  font-size: 1.05rem;
  white-space: pre-line;

  p {
    margin-bottom: 20px;
  }
`;

const HighlightsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-top: 30px;

  @media (max-width: ${breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const HighlightItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 18px;
  background: #f8fafc;
  border: 1px solid ${color.border};
  border-radius: 12px;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${color.accent};
    box-shadow: 0 10px 22px rgba(42, 38, 34, 0.07);
    transform: translateY(-2px);
  }

  svg {
    color: ${color.primary};
    font-size: 1.2rem;
    flex-shrink: 0;
  }

  span {
    color: ${color.textDark};
    font-weight: 500;
  }
`;

const TipsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
  margin-top: 30px;

  @media (max-width: ${breakpoints.tablet}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: ${breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const TipCard = styled.div`
  background: ${color.white};
  border: 1px solid ${color.border};
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 6px 18px rgba(42, 38, 34, 0.06);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 12px 26px rgba(42, 38, 34, 0.1);
  }
`;

const TipImage = styled.img`
  width: 100%;
  height: 130px;
  object-fit: cover;
`;

const TipText = styled.p`
  padding: 16px;
  color: ${color.textDark};
  font-weight: 500;
  line-height: 1.55;
  font-size: 0.95rem;
`;

const InclusionsExclusions = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 30px;
  margin-top: 30px;

  @media (max-width: ${breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const ListCard = styled.div`
  background: ${(props) => (props.$type === 'included' ? '#f0fdf4' : '#fef2f2')};
  border: 1px solid ${color.border};
  border-radius: 14px;
  padding: 26px;
  box-shadow: 0 8px 22px rgba(42, 38, 34, 0.06);
`;

const ListTitle = styled.h3`
  display: flex;
  align-items: center;
  gap: 10px;
  color: ${color.heading};
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid ${color.border};

  svg {
    color: ${(props) => (props.$type === 'included' ? color.primary : color.textMuted)};
  }
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

const ListItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 12px;
  color: ${(props) => (props.$type === 'included' ? color.textDark : color.textMuted)};
  font-size: 0.95rem;
  line-height: 1.55;

  svg {
    flex-shrink: 0;
    margin-top: 3px;
    color: ${(props) => (props.$type === 'included' ? color.primary : color.textMuted)};
  }
`;

const PhotoGallery = styled.div`
  margin-top: 50px;
`;

const GalleryTitle = styled.h2`
  font-size: clamp(1.5rem, 2.6vw, 2rem);
  color: ${color.heading};
  margin-bottom: 30px;
  font-weight: 700;

  &::after {
    content: '';
    display: block;
    width: 40px;
    height: 3px;
    background: ${color.primary};
    margin-top: 14px;
  }
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;

  @media (max-width: ${breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }
`;

const GalleryItem = styled(motion.div)`
  overflow: hidden;
  border-radius: 12px;
  border: 1px solid ${color.border};
  background: ${color.creamDark};
`;

const GalleryImage = styled.img`
  display: block;
  width: 100%;
  height: 250px;
  object-fit: cover;
  cursor: pointer;
  filter: brightness(1.12) saturate(1.05);
  transition: transform 0.5s ease;

  &:hover {
    transform: scale(1.06);
  }
`;

const ImageModal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 40px;
  cursor: pointer;
`;

const ModalImage = styled.img`
  max-width: 90vw;
  max-height: 90vh;
  object-fit: contain;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 500px;
  padding-top: 80px;
  font-size: 1.2rem;
  color: ${color.textMuted};
`;

const ErrorContainer = styled.div`
  text-align: center;
  padding: 30px 20px 100px;

  h2 {
    font-size: 2rem;
    color: ${color.heading};
    margin-bottom: 20px;
  }

  p {
    color: ${color.textMuted};
    margin-bottom: 30px;
  }
`;

const DayTripsDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tour, setTour] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false); // State for booking form

  useEffect(() => {
    // Try to find tour in dayTripsData first, then in allTours
    let foundTour = getDayTripById(id);
    
    if (!foundTour) {
      // Search in allTours categories
      const categories = ['vip', 'private', 'sharing', 'optional'];
      for (const category of categories) {
        if (allTours[category]) {
          foundTour = allTours[category].find(t => t.id === id);
          if (foundTour) break;
        }
      }
    }

    if (foundTour) {
      setTour(foundTour);
    }
    setLoading(false);
  }, [id]);

  const handleWhatsAppClick = () => {
    const phoneNumber = '+255616543216';
    const message = `Hello! I'm interested in the ${tour?.name} tour. Can you provide more information?`;
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleBookNow = () => {
    setShowBookingForm(true); // Open the booking form modal
  };

  const handleCloseBookingForm = () => {
    setShowBookingForm(false); // Close the booking form modal
  };

  const priceTiers = getPriceTiersForTour(tour);

  if (loading) {
    return (
      <PageContainer>
        <LoadingContainer>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          >
            <FiClock size={40} color="#FF7D33" />
          </motion.div>
        </LoadingContainer>
      </PageContainer>
    );
  }

  if (!tour) {
    return (
      <PageContainer>
        <ErrorWrap>
          <BackButton to="/">
            <FiArrowLeft /> Back to Home
          </BackButton>
          <ErrorContainer>
            <h2>Tour Not Found</h2>
            <p>Sorry, we couldn't find the tour you're looking for.</p>
            <BookButton onClick={() => navigate('/')} style={{ display: 'inline-block', padding: '12px 30px' }}>
              Return to Homepage
            </BookButton>
          </ErrorContainer>
        </ErrorWrap>
        <Footer />
      </PageContainer>
    );
  }

  const isDayTrip = tour.category === 'daytrip' || tour.isDayTrip === true;
  const badgeGradient = isDayTrip
    ? 'linear-gradient(135deg, #4CAF50, #2E7D32)'
    : 'linear-gradient(135deg, #FF7D33, #E56C2B)';

  return (
    <PageContainer>
      {/* Booking Form Modal */}
      <BookingFormModal open={showBookingForm} onClose={handleCloseBookingForm} />

      <HeroSection>
        <HeroImage src={tour.image} alt={tour.name} $filter={tour.heroFilter} />
        <HeroOverlay />
        <HeroContent>
          <HeroNav>
            <BackButton to={isDayTrip ? "/dayTrips" : "/"}>
              <FiArrowLeft /> Back to {isDayTrip ? 'Day Trips' : 'Home'}
            </BackButton>
            <HomeButton to="/">
              <FiHome /> Back to Home
            </HomeButton>
          </HeroNav>

          <HeroTitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {tour.name}
          </HeroTitle>
          <HeroBadges>
            {tour.status && (
              <HeroBadge $bg={badgeGradient}>
                ⭐ {tour.status}
              </HeroBadge>
            )}
            {isDayTrip ? (
              <HeroBadge $soft $bg={badgeGradient}>
                ☀️ Day Trip
              </HeroBadge>
            ) : (
              <HeroBadge $soft $bg={badgeGradient}>
                🏝️ Multi-Day Tour
              </HeroBadge>
            )}
          </HeroBadges>
        </HeroContent>
      </HeroSection>

      <ContentContainer>
        <MainContent>
          <Section>
            <SectionTitle>Overview</SectionTitle>
            <Description>
              <p>{tour.description}</p>
              {tour.fullDescription && (
                <p style={{ whiteSpace: 'pre-line' }}>{tour.fullDescription}</p>
              )}
            </Description>
          </Section>

          <Section>
            <SectionTitle>Highlights</SectionTitle>
            <HighlightsGrid>
              {tour.highlights?.map((highlight, index) => (
                <HighlightItem key={index}>
                  <FiStar />
                  <span>{highlight}</span>
                </HighlightItem>
              ))}
            </HighlightsGrid>
          </Section>

          {tour.tips && tour.tips.length > 0 && (
            <Section>
              <SectionTitle>Travel Tips</SectionTitle>
              <TipsGrid>
                {tour.tips.map((tip, index) => (
                  <TipCard key={`tip-${index}`}>
                    {tip.image && <TipImage src={tip.image} alt={`Tip ${index + 1}`} />}
                    <TipText>{tip.text}</TipText>
                  </TipCard>
                ))}
              </TipsGrid>
            </Section>
          )}

          {(tour.includes || tour.excludes) && (
            <Section>
              <SectionTitle>Inclusions & Exclusions</SectionTitle>
              <InclusionsExclusions>
                {tour.includes && (
                  <ListCard $type="included">
                    <ListTitle $type="included">
                      <FiCheck /> Included
                    </ListTitle>
                    <List>
                      {tour.includes.map((item, index) => (
                        <ListItem key={index} $type="included">
                          <FiCheck size={16} />
                          {item}
                        </ListItem>
                      ))}
                    </List>
                  </ListCard>
                )}
                
                {tour.excludes && (
                  <ListCard $type="excluded">
                    <ListTitle $type="excluded">
                      <FiX /> Not Included
                    </ListTitle>
                    <List>
                      {tour.excludes.map((item, index) => (
                        <ListItem key={index} $type="excluded">
                          <FiX size={16} />
                          {item}
                        </ListItem>
                      ))}
                    </List>
                  </ListCard>
                )}
              </InclusionsExclusions>
            </Section>
          )}

          {tour.photos && tour.photos.length > 0 && (
            <PhotoGallery>
              <GalleryTitle>Photo Gallery</GalleryTitle>
              <GalleryGrid>
                {tour.photos.map((photo, index) => (
                  <GalleryItem
                    key={photo.id || index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <GalleryImage
                      src={photo.url}
                      alt={photo.alt}
                      onClick={() => setSelectedImage(photo)}
                    />
                  </GalleryItem>
                ))}
              </GalleryGrid>
            </PhotoGallery>
          )}
        </MainContent>

        <Sidebar>
          <InfoCard>
            <PriceBox>
              <PriceTableTitle>Price per person</PriceTableTitle>
              <PriceTablePackage>{tour.name}</PriceTablePackage>
              <PriceTable>
                <thead>
                  <tr>
                    {priceTiers.map((tier, index) => (
                      <PriceTierHead key={index} scope="col">{tier.label}</PriceTierHead>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    {priceTiers.map((tier, index) => (
                      <PriceTierCell key={index}>
                        <span className="from">Price From</span>
                        <span className="amount">{tier.price}</span>
                        <span className="unit">{tier.unit}</span>
                      </PriceTierCell>
                    ))}
                  </tr>
                </tbody>
              </PriceTable>
            </PriceBox>

            <QuickInfo>
              <InfoItem>
                <FiClock />
                <div>
                  <div className="label">Duration</div>
                  <div className="value">{tour.duration}</div>
                </div>
              </InfoItem>
              <InfoItem>
                <FiUsers />
                <div>
                  <div className="label">Group Size</div>
                  <div className="value">{tour.groupSize}</div>
                </div>
              </InfoItem>
              <InfoItem>
                <FiMapPin />
                <div>
                  <div className="label">Location</div>
                  <div className="value">{tour.location}</div>
                </div>
              </InfoItem>
              <InfoItem>
                <FiCalendar />
                <div>
                  <div className="label">Availability</div>
                  <div className="value">Daily, Year-round</div>
                </div>
              </InfoItem>
            </QuickInfo>

            <RatingBox>
              <RatingScore>
                <div className="number">{tour.rating || 5.0}</div>
                <div className="stars">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} color={i < Math.floor(tour.rating || 5) ? '#FFD700' : '#EFE3D6'} size={16} />
                  ))}
                </div>
                <div className="reviews">{tour.reviewCount || 0} reviews</div>
              </RatingScore>
            </RatingBox>

            <ActionButtons>
              <BookButton onClick={handleBookNow}>
                Book This Tour
              </BookButton>
              <WhatsAppButton onClick={handleWhatsAppClick}>
                <FaWhatsapp size={20} />
                Inquire on WhatsApp
              </WhatsAppButton>
            </ActionButtons>
          </InfoCard>
        </Sidebar>
      </ContentContainer>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <ImageModal
            onClick={() => setSelectedImage(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ModalImage src={selectedImage.url} alt={selectedImage.alt} />
          </ImageModal>
        )}
      </AnimatePresence>

      <Footer />
    </PageContainer>
  );
};

export default DayTripsDetails;