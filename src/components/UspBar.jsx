// src/components/UspBar.jsx - value proposition strip below the hero
import styled from 'styled-components';
import { FiCheck } from 'react-icons/fi';
import { color } from '../styles/color';

const Bar = styled.div`
  background: rgba(42, 38, 34, 0.94);
  color: #f0e9e1;
  padding: 16px 20px;
`;

const Inner = styled.div`
  max-width: 1300px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 14px 42px;
`;

const Item = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 9px;
  font-size: 0.85rem;
  font-weight: 500;
  white-space: nowrap;

  svg {
    color: ${color.primary};
    font-size: 1rem;
    flex-shrink: 0;
  }

  @media (max-width: 640px) {
    font-size: 0.78rem;
    white-space: normal;
  }
`;

const USP_ITEMS = [
  'All trips are 100% tailor-made',
  '4.9★ traveller reviews',
  'Best value & free quotation',
  'Based in Fuoni Uwandani, Zanzibar',
  'We take care of everything',
];

const UspBar = () => (
  <Bar>
    <Inner>
      {USP_ITEMS.map(item => (
        <Item key={item}>
          <FiCheck />
          {item}
        </Item>
      ))}
    </Inner>
  </Bar>
);

export default UspBar;
