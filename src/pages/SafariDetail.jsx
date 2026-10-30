// src/pages/SafariDetail.js
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiCalendar, FiCheck, FiMapPin } from 'react-icons/fi';
import { getSafariById } from '../safariData';
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

const ItineraryDay = styled.div`
  display: inline-block;
  color: ${color.primaryDark};
  padding: 5px 14px;
  border-radius: 20px;
  font-size: 0.82rem;
  font-weight: 700;
  margin-bottom: 12px;
`;

const ItineraryTitle = styled.h3`
  font-size: 1.15rem;
  font-weight: 700;
  color: ${color.heading};
  margin-bottom: 10px;
`;

const ItineraryDescription = styled.p`
  color: ${color.textDark};
  line-height: 1.7;
`;

const WildlifeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 15px;
`;

const WildlifeItem = styled.div`
  background: #FFF8F0;
  border: 1px solid ${color.border};
  border-radius: 12px;
  padding: 18px 15px;
  text-align: center;
  font-weight: 600;
  font-size: 0.95rem;
  color: ${color.textDark};
  transition: all 0.3s ease;

  &:hover {
    border-color: ${color.primary};
    color: ${color.primaryDark};
    transform: translateY(-3px);
    box-shadow: 0 10px 22px rgba(255, 125, 51, 0.14);
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

const SafariDetail = () => {
  const { id } = useParams();
  const safari = getSafariById(id);

  if (!safari) {
    return <NotFound>Safari not found</NotFound>;
  }

   const handleWhatsApp = () => {
    const message = encodeURIComponent(`Hello, I'm interested in the "${safari.name}" tour (ID: ${id}). Please provide more details.`);
    const phone = '+255616543216'; // Replace with your WhatsApp number (with country code, no +)
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  };

  return (
    <>
      <Hero>
        <HeroMedia src={safari.image} alt={safari.name} />
        <HeroOverlay />
        <HeroInner>
          <BackButton to="/safaris">
            <FiArrowLeft /> Back to Safaris
          </BackButton>

          <HeroGrid>
            <div>
              <HeroTitle>{safari.name}</HeroTitle>

              <MetaInfo>
                <MetaItem>
                  <FiCalendar size={16} /> {safari.duration}
                </MetaItem>
                <MetaItem>
                  <FiMapPin size={16} />{' '}
                  {safari.category === 'northern' ? 'Northern Tanzania' : 'Southern Tanzania'}
                </MetaItem>
                <MetaItem>{safari.type}</MetaItem>
              </MetaInfo>
            </div>

            <BookingCard>
              <PriceTag>{safari.price}</PriceTag>
              <BookButton type="button" onClick={handleWhatsApp} style={{ background: '#25D366' }}>
                Book this Tour
              </BookButton>
            </BookingCard>
          </HeroGrid>
        </HeroInner>
      </Hero>

      <Band $tone="white">
        <Container>
          <SectionTitle>Overview</SectionTitle>
          <Description>
            <p>{safari.description}</p>
          </Description>
        </Container>
      </Band>

      <Band $tone="cream">
        <Container>
          <SectionTitle>Itinerary</SectionTitle>
          <ItineraryList>
            {safari.itinerary?.map((item, index) => (
              <ItineraryItem key={index}>
                {item.day && <ItineraryDay>{item.day}</ItineraryDay>}
                <ItineraryTitle>{item.title}</ItineraryTitle>
                <ItineraryDescription>{item.description}</ItineraryDescription>
              </ItineraryItem>
            ))}
          </ItineraryList>
        </Container>
      </Band>

      <Band $tone="white">
        <Container>
          <SectionTitle>Wildlife You May See</SectionTitle>
          <WildlifeGrid>
            {safari.wildlife?.map((animal, index) => (
              <WildlifeItem key={index}>{animal}</WildlifeItem>
            ))}
          </WildlifeGrid>
        </Container>
      </Band>

      <Band $tone="cream">
        <Container>
          <SectionTitle>What's Included</SectionTitle>
          <List>
            {safari.inclusions?.map((item, index) => (
              <ListItem key={index}>
                <FiCheck size={18} />
                {item}
              </ListItem>
            ))}
          </List>
        </Container>
      </Band>

      <Band $tone="white">
        <Container>
          <SectionTitle>What to Bring</SectionTitle>
          <List>
            {safari.whatToBring?.map((item, index) => (
              <ListItem key={index} $muted>
                <FiCheck size={18} />
                {item}
              </ListItem>
            ))}
          </List>
        </Container>
      </Band>

      {safari.bestTimeToVisit && (
        <Band $tone="cream">
          <Container>
            <SectionTitle>Best Time to Visit</SectionTitle>
            <Description>
              <p>{safari.bestTimeToVisit}</p>
            </Description>
          </Container>
        </Band>
      )}

      {safari.images?.length > 0 && (
        <Band $tone="white">
          <Container>
            <SectionTitle>Gallery</SectionTitle>
            <Gallery>
              {safari.images.map((image, index) => (
                <GalleryItem
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <GalleryImage
                    src={image}
                    alt={`${safari.name} - ${index + 1}`}
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

export default SafariDetail;
