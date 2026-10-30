// src/components/TourCard.jsx
import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FiClock } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { color } from '../styles/color';
import BookingFormModal from './BookingFormModal';

const Card = styled(motion.div)`
  min-width: 330px;
  background: ${color.white};
  border: 1px solid rgba(42, 38, 34, 0.07);
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(42, 38, 34, 0.06);
  transition: transform 0.35s ease, box-shadow 0.35s ease;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 18px 40px rgba(42, 38, 34, 0.14);
  }
`;

const ImageWrap = styled.div`
  position: relative;
  overflow: hidden;
`;

const CardImage = styled.img`
  width: 100%;
  height: 295px;
  object-fit: cover;
  display: block;
  filter: brightness(1.12) saturate(1.05);
  transition: transform 0.6s ease;

  ${Card}:hover & {
    transform: scale(1.07);
  }
`;

const ImageShade = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(42, 38, 34, 0.22) 0%, rgba(42, 38, 34, 0) 45%);
  pointer-events: none;
`;

const DurationChip = styled.span`
  position: absolute;
  left: 12px;
  bottom: 12px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: rgba(255, 255, 255, 0.92);
  color: #2A2622;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 5px 10px;
  border-radius: 999px;
  backdrop-filter: blur(4px);
`;

const StatusBadge = styled.span`
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: linear-gradient(135deg, #FFD700, #FFA500);
  color: #2A2622;
  border: 1px solid rgba(255, 125, 51, 0.35);
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  white-space: nowrap;
  box-shadow: 0 4px 12px rgba(42, 38, 34, 0.14);

  @media (max-width: 768px) {
    font-size: 0.58rem;
    padding: 4px 9px;
    top: 8px;
    right: 8px;
  }
`;

const CardContent = styled.div`
  padding: 13px 14px 12px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const CardTitle = styled.h3`
  margin: 0 0 6px 0;
  font-size: 1.18rem;
  font-weight: 700;
  color: #2A2622;
  line-height: 1.35;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  min-height: 2.7em;
`;

const CardDescription = styled.p`
  margin: 0 0 8px 0;
  color: #6b7280;
  font-size: 0.9rem;
  line-height: 1.55;
  flex-grow: 1;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const PriceRow = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 10px;
  padding-top: 8px;
  margin-bottom: 8px;
  border-top: 1px solid #f1ece6;
`;

const PriceLabel = styled.span`
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #9ca3af;
`;

const CardPrice = styled.div`
  font-weight: 800;
  font-size: 1.3rem;
  color: ${props => (props.isSafari ? color.primaryDark : color.primary)};
`;

const CardFooter = styled.div`
  display: flex;
  gap: 10px;
  margin-top: auto;
`;

const BookNowButton = styled(motion.button)`
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: ${props => (props.isSafari ? color.primaryDark : color.primary)};
  color: #ffffff;
  border: none;
  padding: 10px 16px;
  border-radius: 10px;
  font-weight: 700;
  font-size: 0.92rem;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(255, 125, 51, 0.28);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 22px rgba(255, 125, 51, 0.4);
  }
`;

const MoreButton = styled(Link)`
  flex: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background: transparent;
  color: ${color.primary};
  border: 2px solid ${color.primary};
  padding: 8px 16px;
  border-radius: 10px;
  font-weight: 700;
  font-size: 0.92rem;
  text-decoration: none;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 125, 51, 0.08);
    transform: translateY(-2px);
  }
`;

const TourCard = ({ tour, index, isSafari = false, detailPath }) => {
  const [showBookingModal, setShowBookingModal] = useState(false);
  const morePath = detailPath || (isSafari ? `/safaris/${tour.id}` : `/tours/${tour.id}`);

  return (
    <>
      <Card
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
      >
        <ImageWrap>
          <CardImage src={tour.image} alt={tour.title || tour.name} />
          <ImageShade />
          {tour.status && <StatusBadge>⭐ {tour.status}</StatusBadge>}
          {tour.duration && (
            <DurationChip>
              <FiClock /> {tour.duration}
            </DurationChip>
          )}
        </ImageWrap>

        <CardContent>
          <CardTitle>{tour.title || tour.name}</CardTitle>
          <CardDescription>{tour.description}</CardDescription>

          <PriceRow>
            <PriceLabel>From / per person</PriceLabel>
            <CardPrice isSafari={isSafari}>{tour.price}</CardPrice>
          </PriceRow>

          <CardFooter>
            <BookNowButton
              type="button"
              isSafari={isSafari}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setShowBookingModal(true)}
            >
              Book Now
            </BookNowButton>

            <MoreButton to={morePath}>
              View Details
            </MoreButton>
          </CardFooter>
        </CardContent>
      </Card>

      <AnimatePresence>
        <BookingFormModal open={showBookingModal} onClose={() => setShowBookingModal(false)} />
      </AnimatePresence>
    </>
  );
};

export default TourCard;
