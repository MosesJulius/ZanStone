// src/components/WhyChoose.jsx - "Why choose us" checklist section
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FiCheck } from 'react-icons/fi';
import { color } from '../styles/color';

const Section = styled.section`
  padding: 80px 20px;
  background: #ffffff;
`;

const Inner = styled.div`
  max-width: 1300px;
  margin: 0 auto;
`;

const Header = styled.div`
  text-align: center;
  max-width: 780px;
  margin: 0 auto 50px;
`;

const Title = styled.h2`
  font-size: clamp(1.9rem, 3.5vw, 2.6rem);
  font-weight: 700;
  color: ${color.heading};
  line-height: 1.2;
  margin-bottom: 14px;
`;

const Sub = styled.p`
  font-size: 1.05rem;
  font-style: italic;
  color: ${color.textMuted};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 26px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const Item = styled(motion.div)`
  background: ${color.cream};
  border: 1px solid ${color.border};
  border-radius: 12px;
  padding: 26px 24px;
  display: flex;
  gap: 16px;
  align-items: flex-start;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 16px 34px rgba(42, 38, 34, 0.1);
    border-color: ${color.primary};
    background: #ffffff;
  }
`;

const Check = styled.span`
  flex-shrink: 0;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  background: ${color.primary};
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.95rem;
`;

const Text = styled.div`
  h4 {
    font-size: 1.02rem;
    font-weight: 600;
    color: ${color.heading};
    margin-bottom: 7px;
    line-height: 1.35;
  }

  p {
    font-size: 0.9rem;
    color: ${color.textDark};
    line-height: 1.65;
  }
`;

const Actions = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 46px;
`;

const FEATURES = [
  {
    title: '100% tailor-made trips',
    text: 'Every itinerary is designed around your pace, interests and budget — no fixed group tours.',
  },
  {
    title: 'Deep local expertise',
    text: 'Based in Fuoni Uwandani, Zanzibar — our licensed guides are storytellers who bring every mile to life.',
  },
  {
    title: 'Private vehicles & guides',
    text: 'Well-maintained 4x4 safari vehicles, safe boats and quality snorkeling gear for every excursion.',
  },
  {
    title: 'Transparent pricing',
    text: 'Clear prices with no hidden fees. What we promise is exactly what we deliver.',
  },
  {
    title: 'Personal service, start to finish',
    text: 'From your first message to your last sunset, one dedicated team looks after every detail.',
  },
  {
    title: 'Quick, friendly communication',
    text: 'Travellers from Europe, America and Asia trust us for fast replies and 24/7 support on the ground.',
  },
];

const WhyChoose = () => (
  <Section>
    <Inner>
      <Header>
        <span className="section-eyebrow">Why ZanStone</span>
        <Title>Why Choose ZanStone Tours & Safaris</Title>
        <Sub>Your trusted local experts in Zanzibar and Tanzania</Sub>
      </Header>

      <Grid>
        {FEATURES.map((feature, index) => (
          <Item
            key={feature.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
          >
            <Check>
              <FiCheck />
            </Check>
            <Text>
              <h4>{feature.title}</h4>
              <p>{feature.text}</p>
            </Text>
          </Item>
        ))}
      </Grid>

      <Actions>
        <Link to="/contact" className="btn btn-primary">
          Request a Travel Proposal
        </Link>
        <Link to="/dayTrips" className="btn btn-outline">
          View All Trips
        </Link>
      </Actions>
    </Inner>
  </Section>
);

export default WhyChoose;
