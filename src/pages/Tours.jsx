// src/pages/Tours.js
import styled from 'styled-components';
import { motion } from 'framer-motion';
import Footer from '../components/Footer';
import SectionTitle from '../components/SectionTitle';
import TourCard from '../components/TourCard';
import { color } from '../styles/color';
import { dayTripsData, isZanzibarPackage } from '../DataTripsData';

// Zanzibar packages only (combined Zanzibar & safari packages also appear here)
const tours = dayTripsData.filter(isZanzibarPackage).map(tour => ({
  id: tour.id,
  title: tour.name,
  description: tour.shortDescription,
  price: tour.price,
  duration: tour.duration,
  image: tour.image,
  detailPath: `/TripsDetails/${tour.id}`,
  status: tour.status,
  whatsappMessage: `Hi, I want to book the ${tour.name}`
}));

const PageWrapper = styled.div`
  background: ${color.cream};
  min-height: 100vh;
`;

const PageHero = styled.section`
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
  margin-bottom: 16px;
  color: ${color.white};
  position: relative;
  z-index: 2;
  text-shadow: 0 2px 12px rgba(0, 0, 0, 0.28);

  @media (max-width: 768px) {
    font-size: 2.2rem;
  }
`;

const HeroSubtitle = styled(motion.p)`
  font-size: 1.2rem;
  font-style: italic;
  max-width: 720px;
  margin: 0 auto;
  line-height: 1.6;
  color: #FFF8F0;
  opacity: 0.95;
  position: relative;
  z-index: 2;

  @media (max-width: 768px) {
    font-size: 1.02rem;
  }
`;

const ListSection = styled.section`
  background: ${color.white};
  padding: 70px 20px 90px;

  @media (max-width: 768px) {
    padding: 50px 15px 70px;
  }
`;

const ToursContainer = styled.div`
  max-width: 1300px;
  margin: 0 auto;

  h2 {
    color: ${color.heading};
  }

  h2::after {
    width: 46px;
    height: 3px;
    background: ${color.primary};
  }
`;

const ToursGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(330px, 1fr));
  gap: 30px;

  > div {
    background: ${color.white};
    border: 1px solid ${color.border};
    border-radius: 14px;
    box-shadow: 0 6px 18px rgba(42, 38, 34, 0.06);
    min-width: 0;
    transition: transform 0.4s ease, box-shadow 0.4s ease;

    &:hover {
      transform: translateY(-6px) !important;
      box-shadow: 0 18px 36px rgba(255, 125, 51, 0.18);
    }

    > img {
      border-radius: 14px 14px 0 0;
      transition: transform 0.5s ease;
    }

    &:hover > img {
      transform: scale(1.05);
    }

    h3 {
      color: ${color.heading};
      font-weight: 700;
    }

    p {
      color: ${color.textMuted};
    }

    > div span {
      color: ${color.heading};
      padding: 4px 10px;
      border-radius: 999px;
      font-size: 0.78rem;
      font-weight: 600;
      letter-spacing: 0.02em;
    }

    > div > div > div {
      color: ${color.primary};
      font-weight: 700;
    }

    a {
      background: ${color.primary};
      color: ${color.white};
      border-radius: 6px;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      font-size: 0.8rem;
      font-weight: 700;
      transition: background 0.3s ease, box-shadow 0.3s ease;

      &:hover {
        background: ${color.primaryDark};
        box-shadow: 0 8px 18px rgba(255, 125, 51, 0.3);
      }
    }
  }

  @media (max-width: 768px) {
    gap: 18px;
  }
`;

const ToursPage = () => {
  return (
    <>
      <PageWrapper>
        <PageHero>
          <HeroTitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Zanzibar Tours
          </HeroTitle>
          <HeroSubtitle
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            Handpicked ZanStone tours across Zanzibar — ocean adventures led by local experts.
          </HeroSubtitle>
        </PageHero>

        <ListSection>
          <ToursContainer>
            <SectionTitle>Our Tours</SectionTitle>
            <ToursGrid>
              {tours.map((tour, index) => (
                <TourCard 
                  key={tour.id}
                  tour={tour}
                  index={index}
                  detailPath={tour.detailPath}
                />
              ))}
            </ToursGrid>
          </ToursContainer>
        </ListSection>
      </PageWrapper>
      <Footer />
    </>
  );
};

export default ToursPage;
