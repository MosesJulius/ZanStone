// src/components/QuickLinks.jsx - quick navigation strip below the USP bar
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { color } from '../styles/color';

const Strip = styled.section`
  padding: 34px 20px;
  background: #ffffff;
  border-bottom: 1px solid ${color.border};
`;

const Inner = styled.div`
  max-width: 1300px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 14px;
`;

const QuickButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 13px 30px;
  border: 2px solid ${color.border};
  border-radius: 6px;
  background: #ffffff;
  color: ${color.heading};
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    background: ${color.cream};
    border-color: ${color.primary};
    color: ${color.primary};
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(42, 38, 34, 0.08);
  }

  @media (max-width: 640px) {
    flex: 1 1 calc(50% - 14px);
    padding: 12px 14px;
    font-size: 0.72rem;
  }
`;

const LINKS = [
  { label: 'Zanzibar', to: '/dayTrips?filter=zanzibar' },
  { label: 'Tanzania Safaris', to: '/dayTrips?filter=safari' },
  { label: 'Kilimanjaro', to: '/tourSection' },
  { label: 'Day Trip', to: '/dayTrips?filter=daytrip' },
  { label: 'Zanzibar & Safaris', to: '/dayTrips?filter=all' },
];

const QuickLinks = () => (
  <Strip>
    <Inner>
      {LINKS.map(link => (
        <QuickButton key={link.label} to={link.to}>
          {link.label}
        </QuickButton>
      ))}
    </Inner>
  </Strip>
);

export default QuickLinks;
