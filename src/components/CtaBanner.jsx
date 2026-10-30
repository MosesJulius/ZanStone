// src/components/CtaBanner.jsx - closing call-to-action banner
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { color } from '../styles/color';
import bg from '../assets/image/zanzBG.jpg';

const Banner = styled.section`
  position: relative;
  min-height: 340px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 70px 20px;
  background: linear-gradient(rgba(42, 38, 34, 0.68), rgba(42, 38, 34, 0.55)),
    url(${bg}) center/cover no-repeat;
  color: #ffffff;

  @media (max-width: 768px) {
    min-height: 300px;
  }
`;

const Content = styled.div`
  max-width: 760px;
  position: relative;
  z-index: 2;

  h2 {
    font-size: clamp(1.9rem, 4vw, 2.8rem);
    font-weight: 700;
    line-height: 1.2;
    margin-bottom: 16px;
  }

  p {
    font-size: 1.08rem;
    color: rgba(255, 255, 255, 0.88);
    margin-bottom: 30px;
  }
`;

const CtaButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 16px 38px;
  background: ${color.primary};
  color: #ffffff;
  border-radius: 6px;
  font-size: 0.88rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    background: ${color.primaryDark};
    transform: translateY(-3px);
    box-shadow: 0 14px 30px rgba(255, 125, 51, 0.45);
  }
`;

const CtaBanner = () => (
  <Banner>
    <Content>
      <h2>Let Us Create Your Tailor-Made Trip</h2>
      <p>Receive a free, no-obligation quote — we design your journey, you enjoy it.</p>
      <CtaButton to="/contact">Start Planning Your Dream Trip</CtaButton>
    </Content>
  </Banner>
);

export default CtaBanner;
