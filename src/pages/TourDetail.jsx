// src/pages/TourDetail.js
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiCheck, FiClock, FiMapPin, FiPlus } from 'react-icons/fi';
import { getTourById } from '../tourData';
import Footer from '../components/Footer';
import { color } from '../styles/color';

const breakpoints = {
  mobile: '768px',
  tablet: '1024px',
  desktop: '1200px'
};

const Hero = styled.section`
  background: linear-gradient(135deg, #4CAF50, #2E7D32);
  position: relative;
  display: flex;
  align-items: flex-end;
  min-height: 540px;
  overflow: hidden;
  padding: 165px 20px 70px;

  @media (max-width: ${breakpoints.mobile}) {
    min-height: 420px;
    padding: 120px 20px 45px;
  }
`;

const HeroMedia = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const HeroOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(rgba(42, 38, 34, 0.72), rgba(42, 38, 34, 0.45));
`;

const HeroInner = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 1240px;
  margin: 0 auto;
`;

const HeroGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) 360px;
  gap: 48px;
  align-items: end;

  @media (max-width: ${breakpoints.tablet}) {
    grid-template-columns: 1fr;
    gap: 30px;
  }
`;

const BackButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 28px;
  padding: 9px 20px;
  border: 1px solid rgba(255, 255, 255, 0.35);
  border-radius: 30px;
  color: #ffffff;
  font-size: 0.82rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    border-color: ${color.primary};
    color: #ffffff;
  }
`;

const HeroTitle = styled.h1`
  font-size: clamp(2.1rem, 4vw, 3.2rem);
  font-weight: 800;
  line-height: 1.15;
  color: #ffffff;
  margin-bottom: 22px;
  text-shadow: 0 2px 14px rgba(0, 0, 0, 0.25);
`;

const MetaInfo = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const MetaItem = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: #FFF8F0;
  color: ${color.primaryDark};
  padding: 8px 16px;
  border-radius: 30px;
  font-size: 0.85rem;
  font-weight: 600;
  line-height: 1.4;

  svg {
    color: ${color.primary};
    flex-shrink: 0;
  }
`;

const BookingCard = styled.div`
  background: ${color.white};
  border: 1px solid ${color.border};
  border-radius: 14px;
  padding: 28px;
  box-shadow: 0 18px 45px rgba(42, 38, 34, 0.18);
`;

const PriceTag = styled.div`
  font-size: clamp(1.35rem, 2vw, 1.7rem);
  font-weight: 800;
  color: ${color.primary};
  line-height: 1.4;
  margin-bottom: 22px;
`;

const BookButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 15px 30px;
  background: ${color.primary};
  color: #ffffff;
  border: none;
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: ${color.primaryDark};
    transform: translateY(-2px);
    box-shadow: 0 10px 22px rgba(255, 125, 51, 0.32);
  }
`;

const NotFound = styled.div`
  padding: 170px 20px 80px;
  min-height: 60vh;
  color: ${color.textDark};
  font-size: 1.1rem;
`;

const Band = styled.section`
  padding: 70px 20px;

  @media (max-width: ${breakpoints.mobile}) {
    padding: 60px 18px;
  }
`;

const Container = styled.div`
  max-width: 1240px;
  margin: 0 auto;
`;

const SectionTitle = styled.h2`
  font-size: clamp(1.5rem, 2.6vw, 2rem);
  font-weight: 700;
  color: ${color.heading};
  margin-bottom: 34px;

  &::after {
    content: '';
    display: block;
    width: 40px;
    height: 3px;
    background: ${color.primary};
    margin-top: 14px;
  }
`;

const Description = styled.div`
  max-width: 900px;
  color: ${color.textDark};
  font-size: 1.05rem;
  line-height: 1.85;

  p {
    margin-bottom: 18px;
  }

  p:last-child {
    margin-bottom: 0;
  }
`;

const ItineraryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const ItineraryItem = styled.div`
  border: 1px solid ${color.border};
  border-left: 4px solid ${color.primary};
  border-radius: 12px;
  padding: 22px 26px;
  box-shadow: 0 6px 18px rgba(42, 38, 34, 0.05);

  @media (max-width: ${breakpoints.mobile}) {
    padding: 18px 20px;
  }
`;

const ItineraryTime = styled.div`
  display: inline-block;
  color: ${color.primaryDark};
  padding: 4px 14px;
  border-radius: 20px;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  margin-bottom: 12px;
`;

const ItineraryTitle = styled.h3`
  font-size: 1.15rem;
  font-weight: 700;
  color: ${color.heading};
  margin-bottom: 10px;
`;

const ItineraryDescription = styled.div`
  color: ${color.textDark};
  line-height: 1.7;

  div {
    margin-bottom: 6px;
  }
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 900px;
`;

const ListItem = styled.li`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  border: 1px solid ${color.border};
  border-radius: 10px;
  padding: 14px 18px;
  color: ${color.textDark};
  font-size: 1rem;
  line-height: 1.55;

  svg {
    flex-shrink: 0;
    margin-top: 3px;
    color: ${(props) => (props.$muted ? color.textMuted : color.primary)};
  }
`;

const Gallery = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 18px;
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
  height: 260px;
  object-fit: cover;
  transition: transform 0.5s ease;

  &:hover {
    transform: scale(1.06);
  }
`;

const VIPHero = styled.section`
  position: relative;
  overflow: hidden;
  padding: 170px 20px 80px;
  text-align: center;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%);

  @media (max-width: ${breakpoints.mobile}) {
    padding: 120px 20px 55px;
  }
`;

const VIPInner = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

const VIPTitle = styled.h1`
  font-size: clamp(2.1rem, 4vw, 3rem);
  font-weight: 800;
  line-height: 1.2;
  color: #ffffff;
  margin-bottom: 16px;
  background: linear-gradient(135deg, #FF7D33, #FFA366);
  -webkit-background-clip: text;
  background-clip: text;
`;

const VIPSubtitle = styled.p`
  font-size: 1.15rem;
  font-weight: 300;
  letter-spacing: 0.04em;
  color: ${color.accent};
  margin-bottom: 40px;
`;

const VIPBody = styled.section`
  background: ${color.white};
  padding: 60px 20px 80px;

  @media (max-width: ${breakpoints.mobile}) {
    padding: 45px 18px 60px;
  }
`;

const VIPContent = styled.div`
  max-width: 900px;
  margin: 0 auto;
  text-align: center;
`;

const ComprehensiveImage = styled(motion.img)`
  display: block;
  width: 100%;
  max-width: 800px;
  height: auto;
  margin: 0 auto 34px;
  border-radius: 14px;
  border: 2px solid ${color.primary};
  box-shadow: 0 18px 45px rgba(42, 38, 34, 0.16);
`;

const VIPPriceTag = styled.div`
  font-size: clamp(1.6rem, 3vw, 2.2rem);
  font-weight: 800;
  color: ${color.primary};
  margin-bottom: 26px;
`;

const VIPBookButton = styled(BookButton)`
  background: linear-gradient(135deg, #FF7D33, #E56C2B);
  max-width: 380px;
  margin: 0 auto;

  &:hover {
    background: linear-gradient(135deg, #E56C2B, #FF7D33);
  }
`;

const TourDetail = () => {
  const { id } = useParams();
  const tour = getTourById(id);

  if (!tour) {
    return <NotFound>Tour not found</NotFound>;
  }

  const handleWhatsApp = () => {
    const message = encodeURIComponent(`Hello, I'm interested in the "${tour.name}" tour (ID: ${id}). Please provide more details.`);
    const phone = '+255616543216';
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  };

  // Check if it's a VIP tour (has comprehensiveImage AND is in vip category)
  const isVipTour = tour.comprehensiveImage && tour.category === 'vip';

  if (isVipTour) {
    return (
      <>
        <VIPHero>
          <VIPInner>
            <BackButton to="/tours">
              <FiArrowLeft /> Back to Tours
            </BackButton>

            <VIPTitle>{tour.name}</VIPTitle>
            <VIPSubtitle>Exclusive Luxury Experience</VIPSubtitle>
          </VIPInner>
        </VIPHero>

        <VIPBody>
          <VIPContent>
            <ComprehensiveImage
              src={tour.comprehensiveImage}
              alt={tour.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            />

            {tour.price && <VIPPriceTag>{tour.price}</VIPPriceTag>}

            <VIPBookButton type="button" onClick={handleWhatsApp} style={{ background: '#25D366' }}>
              Book This VIP Experience
            </VIPBookButton>
          </VIPContent>
        </VIPBody>
        <Footer />
      </>
    );
  }

  // Regular tour display (for private, sharing, optional, transfer categories)
  return (
    <>
      <Hero>
        <HeroMedia src={tour.image} alt={tour.name} />
        <HeroOverlay />
        <HeroInner>
          <BackButton to="/tours">
            <FiArrowLeft /> Back to Tours
          </BackButton>

          <HeroGrid>
            <div>
              <HeroTitle>{tour.name}</HeroTitle>

              <MetaInfo>
                {tour.startPoint && (
                  <MetaItem>
                    <FiMapPin size={16} /> {tour.startPoint}
                  </MetaItem>
                )}
                {tour.time && (
                  <MetaItem>
                    <FiClock size={16} /> {tour.time}
                  </MetaItem>
                )}
                {tour.type && <MetaItem>{tour.type}</MetaItem>}
              </MetaInfo>
            </div>

            <BookingCard>
              {tour.price && <PriceTag>{tour.price}</PriceTag>}
              <BookButton type="button" onClick={handleWhatsApp} style={{ background: '#25D366' }}>
                Book this Tour
              </BookButton>
            </BookingCard>
          </HeroGrid>
        </HeroInner>
      </Hero>

      {tour.description && (
        <Band $tone="white">
          <Container>
            <SectionTitle>Overview</SectionTitle>
            <Description>
              <p>{tour.description}</p>
            </Description>
          </Container>
        </Band>
      )}

      {tour.itinerary && tour.itinerary.length > 0 && (
        <Band $tone="cream">
          <Container>
            <SectionTitle>Itinerary</SectionTitle>
            <ItineraryList>
              {tour.itinerary.map((item, index) => (
                <ItineraryItem key={index}>
                  {item.time && <ItineraryTime>{item.time}</ItineraryTime>}
                  <ItineraryTitle>{item.title}</ItineraryTitle>
                  <ItineraryDescription>
                    {Array.isArray(item.description)
                      ? item.description.map((desc, i) => (
                          <div key={i}>{desc}</div>
                        ))
                      : item.description}
                  </ItineraryDescription>
                </ItineraryItem>
              ))}
            </ItineraryList>
          </Container>
        </Band>
      )}

      {tour.inclusions && tour.inclusions.length > 0 && (
        <Band $tone="white">
          <Container>
            <SectionTitle>What's Included</SectionTitle>
            <List>
              {tour.inclusions.map((item, index) => (
                <ListItem key={index}>
                  <FiCheck size={18} />
                  {item}
                </ListItem>
              ))}
            </List>
          </Container>
        </Band>
      )}

      {tour.whatToBring && tour.whatToBring.length > 0 && (
        <Band $tone="cream">
          <Container>
            <SectionTitle>What to Bring</SectionTitle>
            <List>
              {tour.whatToBring.map((item, index) => (
                <ListItem key={index} $muted>
                  <FiCheck size={18} />
                  {item}
                </ListItem>
              ))}
            </List>
          </Container>
        </Band>
      )}

      {tour.OptionalAddOns && tour.OptionalAddOns.length > 0 && (
        <Band $tone="white">
          <Container>
            <SectionTitle>Optional Add-Ons</SectionTitle>
            <List>
              {tour.OptionalAddOns.map((item, index) => (
                <ListItem key={index}>
                  <FiPlus size={18} />
                  {item}
                </ListItem>
              ))}
            </List>
          </Container>
        </Band>
      )}

      {tour.images && tour.images.length > 0 && (
        <Band $tone="cream">
          <Container>
            <SectionTitle>Gallery</SectionTitle>
            <Gallery>
              {tour.images.map((image, index) => (
                <GalleryItem
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <GalleryImage
                    src={image}
                    alt={`${tour.name} - ${index + 1}`}
                  />
                </GalleryItem>
              ))}
            </Gallery>
          </Container>
        </Band>
      )}
      <Footer />
    </>
  );
};

export default TourDetail;
