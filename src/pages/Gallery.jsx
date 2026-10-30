// src/pages/Gallery.js
import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { FiImage, FiVideo, FiHeart, FiPlus, FiSearch, FiMenu, FiFilter, FiX } from 'react-icons/fi';
import { FaPinterest } from 'react-icons/fa';
import { motion } from 'framer-motion';
import ImageGallery from '../components/ImageGallery';
import VideoGallery from '../components/VideoGallery';
import SectionTitle from '../components/SectionTitle';
import Footer from '../components/Footer';
import { color } from '../styles/color';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

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

const GalleryBand = styled.section`
  background: ${color.white};
  padding: 55px 0 65px;

  @media (max-width: 768px) {
    padding: 40px 0 55px;
  }
`;

const GalleryContainer = styled.div`
  padding: 0 12px;
  max-width: 1400px;
  margin: 0 auto;
  animation: ${fadeIn} 0.6s ease-out;

  @media (min-width: 768px) {
    padding: 0 20px;
  }
`;

const HeaderSection = styled.div`
  text-align: center;
  margin-bottom: 30px;
  position: relative;

  @media (min-width: 768px) {
    margin-bottom: 40px;
  }
`;

const MobileHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  background: white;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  box-shadow: 0 2px 10px rgba(0,0,0,0.08);
  
  @media (min-width: 768px) {
    display: none;
  }
`;

const MobileLogo = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
  color: ${color.primary};
  font-size: 1.2rem;
`;

const MobileMenuButton = styled.button`
  background: none;
  border: none;
  font-size: 1.2rem;
  color: #333;
  cursor: pointer;
  padding: 5px;
`;

const DesktopHeader = styled.div`
  display: block;

  @media (min-width: 768px) {
    display: block;
  }
`;

const SearchContainer = styled.div`
  max-width: 100%;
  margin: 20px auto;
  position: relative;

  @media (min-width: 768px) {
    max-width: 500px;
    margin: 25px auto;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 12px 40px 12px 16px;
  border: none;
  border-radius: 20px;
  background: #f0f0f0;
  font-size: 0.85rem;
  transition: all 0.3s ease;
  box-shadow: 0 2px 6px rgba(0,0,0,0.08);

  &:focus {
    outline: none;
    background: white;
    box-shadow: 0 4px 12px rgba(0,0,0,0.12);
  }

  @media (min-width: 768px) {
    padding: 14px 45px 14px 20px;
    border-radius: 25px;
    font-size: 0.9rem;
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
  font-size: 0.85rem;

  @media (min-width: 768px) {
    right: 18px;
    font-size: 0.9rem;
  }
`;

const ClearSearchButton = styled.button`
  position: absolute;
  right: 40px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #999;
  cursor: pointer;
  padding: 4px;
  border-radius: 50%;
  transition: all 0.2s ease;

  &:hover {
    background: #e0e0e0;
    color: #666;
  }
`;

const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 25px;
  background: white;
  border: 1px solid ${color.border};
  padding: 5px;
  border-radius: 999px;
  box-shadow: 0 6px 18px rgba(42, 38, 34, 0.06);
  max-width: 100%;
  width: fit-content;
  margin-left: auto;
  margin-right: auto;

  @media (min-width: 768px) {
    padding: 6px;
    border-radius: 999px;
    max-width: 400px;
    margin-bottom: 35px;
  }
`;

const TabButton = styled.button`
  padding: 10px 16px;
  margin: 0 4px;
  background: ${props => props.active ? 'linear-gradient(135deg, #e62300ff, #bd2600ff)' : 'transparent'};
  color: ${props => props.active ? 'white' : color.textDark};
  border: none;
  border-radius: 999px;
  cursor: pointer;
  font-size: 0.8rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  white-space: nowrap;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: ${props => props.active ? '0 4px 12px rgba(255, 125, 51, 0.28)' : 'none'};

  &:hover {
    background: ${props => props.active 
      ? 'linear-gradient(135deg, #e60023, #bd001c)' 
      : 'rgba(0,0,0,0.04)'};
    color: ${props => props.active ? 'white' : color.primary};
    transform: ${props => props.active ? 'none' : 'translateY(-1px)'};
  }

  svg {
    margin-right: 5px;
    font-size: 0.85rem;
  }

  @media (min-width: 768px) {
    padding: 10px 24px;
    margin: 0 4px;
    font-size: 0.85rem;
    border-radius: 999px;
    
    svg {
      font-size: 0.95rem;
      margin-right: 6px;
    }
  }
`;

const FloatingActionButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: linear-gradient(135deg, #e60023, #bd001c);
  border: none;
  color: white;
  font-size: 1.1rem;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(255, 125, 51, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 1000;

  &:hover {
    transform: scale(1.1) rotate(90deg);
    box-shadow: 0 6px 20px rgba(255, 125, 51, 0.5);
  }

  @media (min-width: 768px) {
    width: 50px;
    height: 50px;
    font-size: 1.2rem;
    bottom: 25px;
    right: 25px;
  }
`;

const FilterSection = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-bottom: 20px;
  flex-wrap: wrap;
  padding: 0 5px;

  @media (min-width: 768px) {
    gap: 10px;
    margin-bottom: 30px;
    padding: 0;
  }
`;

const FilterButton = styled.button`
  padding: 7px 14px;
  background: ${props => props.active ? '#e60023' : 'white'};
  color: ${props => props.active ? 'white' : color.textDark};
  border: 1px solid ${props => props.active ? color.primary : color.border};
  border-radius: 999px;
  cursor: pointer;
  font-size: 0.78rem;
  font-weight: 600;
  transition: all 0.3s ease;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 5px;

  &:hover {
    background: ${props => props.active ? '#e60023' : '#f8f8f8'};
    border-color: ${props => props.active ? color.primaryDark : color.primary};
    color: ${props => props.active ? 'white' : color.primary};
    transform: translateY(-1px);
    box-shadow: 0 6px 14px rgba(255, 125, 51, 0.18);
  }

  @media (min-width: 768px) {
    padding: 9px 20px;
    font-size: 0.82rem;
  }
`;

const StatsBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin: 20px 0;
  padding: 12px;
  background: white;
  border: 1px solid ${color.border};
  border-radius: 14px;
  box-shadow: 0 6px 18px rgba(42, 38, 34, 0.05);
  max-width: 100%;
  margin-left: auto;
  margin-right: auto;

  @media (min-width: 768px) {
    gap: 25px;
    padding: 15px;
    border-radius: 14px;
    max-width: 500px;
    margin: 25px auto;
  }
`;

const StatItem = styled.div`
  text-align: center;
  cursor: pointer;
  transition: transform 0.2s ease;
  
  &:hover {
    transform: scale(1.05);
  }
  
  .stat-number {
    font-size: 1rem;
    font-weight: 700;
    color: ${color.primary};
    margin-bottom: 2px;
    
    @media (min-width: 768px) {
      font-size: 1.1rem;
    }
  }
  
  .stat-label {
    font-size: 0.7rem;
    color: ${color.textMuted};
    font-weight: 500;
    
    @media (min-width: 768px) {
      font-size: 0.75rem;
    }
  }
`;

const ModernSectionTitle = styled(SectionTitle)`
  color: ${color.heading};
  background: linear-gradient(135deg, #333, #e64100ff);
  -webkit-background-clip: text;
  font-weight: 700;
  margin-bottom: 10px;
  
  @media (min-width: 768px) {
    font-size: 2.5rem;
  }
`;

const ModernGalleryWrapper = styled.div`
  width: 100%;
  
  .image-gallery,
  .video-gallery {
    width: 100%;
    display: block;
  }

  .image-gallery h1 {
    color: ${color.heading} !important;
    -webkit-text-fill-color: ${color.heading} !important;
    position: relative;
    display: inline-block;
    padding-bottom: 14px;
    margin-bottom: 14px !important;

    &::after {
      content: '';
      position: absolute;
      left: 50%;
      bottom: 0;
      transform: translateX(-50%);
      width: 46px;
      height: 3px;
      background: ${color.primary};
      border-radius: 2px;
    }
  }

  .image-gallery p {
    color: ${color.textMuted} !important;
    font-style: italic;
  }

  .image-gallery input[type='text'] {
    border: 1px solid ${color.border};
    box-shadow: none;
    color: ${color.textDark};

    &:focus {
      outline: none;
      border-color: ${color.primary};
      box-shadow: 0 0 0 3px rgba(255, 125, 51, 0.12);
    }

    &::placeholder {
      color: ${color.textMuted};
    }
  }

  .gal-item::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 55%;
    opacity: 0;
    transition: opacity 0.45s ease;
    pointer-events: none;
    z-index: 2;
    border-radius: 0 0 10px 10px;
  }

  .gal-caption {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 10px 10px 12px;
    z-index: 3;
    color: #ffffff;
    font-size: 0.72rem;
    font-weight: 600;
    line-height: 1.35;
    text-align: left;
    opacity: 0;
    transform: translateY(6px);
    transition: opacity 0.45s ease, transform 0.45s ease;
    pointer-events: none;
    text-shadow: 0 1px 4px rgba(0, 0, 0, 0.45);
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .gal-item:hover::after {
    opacity: 1;
  }

  .gal-item:hover .gal-caption {
    opacity: 1;
    transform: translateY(0);
  }

  @media (hover: none) {
    .gal-item::after {
      opacity: 1;
    }

    .gal-caption {
      opacity: 1;
      transform: none;
    }
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: ${color.textMuted};
  
  svg {
    font-size: 3rem;
    margin-bottom: 15px;
    color: ${color.accent};
  }
  
  h3 {
    font-size: 1.2rem;
    margin-bottom: 10px;
    color: ${color.heading};
  }
  
  p {
    font-size: 0.9rem;
    max-width: 400px;
    margin: 0 auto;
    line-height: 1.5;
    color: ${color.textMuted};
  }
`;

const GalleryPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [favoriteImages, setFavoriteImages] = useState([]);
  const [stats, setStats] = useState({
    totalImages: 120,
    totalLikes: 0,
    totalFavorites: 0
  });

  const filters = [
    { key: 'all', label: 'All', icon: null },
    { key: 'popular', label: 'Popular', icon: <FiHeart size={12} /> },
    { key: 'favorites', label: 'Favorites', icon: <FiHeart size={12} fill={color.primary} /> },
    { key: 'recent', label: 'Recent', icon: null },
    { key: 'featured', label: 'Featured', icon: null }
  ];

  // Load favorites from localStorage on component mount
  useEffect(() => {
    const savedImageFavorites = localStorage.getItem('favoriteImages');
    
    if (savedImageFavorites) {
      setFavoriteImages(JSON.parse(savedImageFavorites));
    }
  }, []);

  // Update stats when favorites change
  useEffect(() => {
    const totalFavorites = favoriteImages.length;
    setStats(prev => ({
      ...prev,
      totalFavorites,
      totalLikes: Math.floor(favoriteImages.length * 15)
    }));
  }, [favoriteImages]);

  // Tag gallery thumbnails so this page can render the hover overlay + white title
  useEffect(() => {
    const formatTitle = (alt) =>
      alt
        .split('-')
        .filter(Boolean)
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

    const applyCaptions = () => {
      const root = document.getElementById('gallery-root');
      if (!root) return;

      root.querySelectorAll('img').forEach(img => {
        const wrap = img.parentElement;
        if (!wrap || wrap.tagName !== 'DIV') return;
        if (wrap.style.position !== 'absolute') return;
        if (!img.alt || wrap.dataset.captionReady === '1') return;

        wrap.dataset.captionReady = '1';
        wrap.classList.add('gal-item');

        const caption = document.createElement('span');
        caption.className = 'gal-caption';
        caption.textContent = formatTitle(img.alt);
        wrap.appendChild(caption);
      });
    };

    applyCaptions();

    const root = document.getElementById('gallery-root');
    let observer = null;
    if (root && typeof MutationObserver !== 'undefined') {
      observer = new MutationObserver(applyCaptions);
      observer.observe(root, { childList: true, subtree: true });
    }

    return () => {
      if (observer) observer.disconnect();
    };
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  const handleFilterClick = (filterKey) => {
    if (filterKey === 'favorites') {
      // If clicking favorites when already active, show all
      if (activeFilter === 'favorites') {
        setActiveFilter('all');
      } else {
        setActiveFilter('favorites');
      }
    } else {
      setActiveFilter(filterKey);
    }
  };

  const handleStatClick = (statType) => {
    switch (statType) {
      case 'photos':
        // Already on photos
        break;
      case 'likes':
        setActiveFilter('popular');
        break;
      case 'favorites':
        setActiveFilter('favorites');
        break;
      default:
        break;
    }
  };

  const handleAddContent = () => {
    // This could open a modal or navigate to upload page
    alert('Add new content feature would open here!');
  };

  const getFilteredContent = () => {
    // This function would filter content based on active filter
    // For now, it just returns the appropriate state
    return activeFilter;
  };

  const renderEmptyState = () => {
    if (activeFilter === 'favorites' && favoriteImages.length === 0) {
      return (
        <EmptyState>
          <FiHeart size={48} />
          <h3>No Favorites Yet</h3>
          <p>Start liking photos to see them here. Your favorites will be saved across sessions.</p>
        </EmptyState>
      );
    }
    
    if (searchQuery && favoriteImages.length === 0) {
      return (
        <EmptyState>
          <FiSearch size={48} />
          <h3>No Photos Found</h3>
          <p>Try adjusting your search terms or browse all photos.</p>
        </EmptyState>
      );
    }
    
    return null;
  };

  return (
    <>
      {/* Mobile Header */}
      <MobileHeader>
        <MobileLogo>Gallery</MobileLogo>
        <MobileMenuButton>
          <FiMenu />
        </MobileMenuButton>
      </MobileHeader>

      <PageWrapper>
        <PageHero>
          <DesktopHeader>
            <HeaderSection>
              <HeroTitle
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
              >
                Our Gallery
              </HeroTitle>
              <HeroSubtitle
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15 }}
              >
                Explore beautiful photos and videos from Zanzibar. Come and Touch the Dream, Rafiki Visit Zanzibar
              </HeroSubtitle>
            </HeaderSection>
          </DesktopHeader>
        </PageHero>

        <GalleryBand>
          <GalleryContainer>
            <TabContainer>
              <TabButton 
                active={true}
                disabled
              >
                <FiImage /> Photos
              </TabButton>
            </TabContainer>

            <FilterSection>
              {filters.map(filter => (
                <FilterButton
                  key={filter.key}
                  active={activeFilter === filter.key}
                  onClick={() => handleFilterClick(filter.key)}
                >
                  {filter.icon}
                  {filter.label}
                </FilterButton>
              ))}
            </FilterSection>

            <ModernGalleryWrapper id="gallery-root">
              {renderEmptyState() || (
                <div className="image-gallery">
                  <ImageGallery 
                    searchQuery={searchQuery}
                    activeFilter={activeFilter}
                    favoriteImages={favoriteImages}
                    setFavoriteImages={setFavoriteImages}
                  />
                </div>
              )}
            </ModernGalleryWrapper>
          </GalleryContainer>
        </GalleryBand>
      </PageWrapper>

      

      <Footer />
    </>
  );
};

export default GalleryPage;