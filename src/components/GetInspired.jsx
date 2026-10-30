// src/components/GetInspired.jsx - large image tiles linking to main collections
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FiArrowRight } from 'react-icons/fi';
import { color } from '../styles/color';
import dayTripsImg from '../assets/image/zanz1.jpg';
import safariImg from '../assets/image/safariBG.jpg';
import toursImg from '../assets/image/Folder1/desti.jpg';
import galleryImg from '../assets/image/more/sec25.jpg';

const Section = styled.section`
  padding: 80px 20px;
  background: ${color.creamDark};
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
  grid-template-columns: repeat(2, 1fr);
  gap: 26px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Tile = styled(Link)`
  position: relative;
  height: 300px;
  border-radius: 14px;
  overflow: hidden;
  display: block;
  box-shadow: 0 14px 34px rgba(42, 38, 34, 0.14);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.78) 0%, rgba(0, 0, 0, 0.15) 60%, transparent 100%);
  }

  &:hover img {
    transform: scale(1.07);
  }

  @media (max-width: 640px) {
    height: 240px;
  }
`;

const TileContent = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 28px;
  z-index: 2;
  color: #ffffff;

  h3 {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 6px;
  }

  p {
    font-size: 0.92rem;
    color: rgba(255, 255, 255, 0.85);
    margin-bottom: 12px;
    max-width: 420px;
  }

  span {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 0.82rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: ${color.primary};
    transition: gap 0.25s ease;
  }

  ${Tile}:hover & span {
    gap: 14px;
  }
`;

const TILES = [
  {
    title: 'Day Trips & Tours',
    desc: 'Beach, ocean and culture experiences across Zanzibar',
    to: '/dayTrips',
    img: dayTripsImg,
  },
  {
    title: 'Safari Adventures',
    desc: 'Mikumi, Selous and the great wildlife of mainland Tanzania',
    to: '/safaris',
    img: safariImg,
  },
  {
    title: 'Special Packages',
    desc: 'VIP, private and sharing trips for every budget',
    to: '/tours',
    img: toursImg,
  },
  {
    title: 'Gallery',
    desc: 'Moments from our adventures on land and ocean',
    to: '/gallery',
    img: galleryImg,
  },
];

const GetInspired = () => (
  <Section>
    <Inner>
      <Header>
        <span className="section-eyebrow">Get Inspired</span>
        <Title>Discover Zanzibar & Tanzania With Us</Title>
        <Sub>Explore our most loved experiences</Sub>
      </Header>

      <Grid>
        {TILES.map(tile => (
          <Tile key={tile.title} to={tile.to}>
            <img src={tile.img} alt={tile.title} loading="lazy" />
            <TileContent>
              <h3>{tile.title}</h3>
              <p>{tile.desc}</p>
              <span>
                Explore <FiArrowRight />
              </span>
            </TileContent>
          </Tile>
        ))}
      </Grid>
    </Inner>
  </Section>
);

export default GetInspired;
