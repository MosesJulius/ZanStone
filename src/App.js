// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Tours from './pages/Tours';
import Safaris from './pages/Safaris';
import SafariDetail from './pages/SafariDetail';
import TourDetail from './pages/TourDetail';
import ToursSection from './components/ToursSection';
import SafariExperience from './components/SafariExperience';
import Gallery from './pages/Gallery';
import Header from './components/Header';
import WhatsAppButton from './components/WhatsAppButton';
import SocialMediaButton from './components/SocialMediaButtonHover'; // Import the component
import { GoogleOAuthProvider } from '@react-oauth/google';
import DayTripsPage from './pages/DayTrips';
import DayTripDetails from './pages/DayTripDetails';
import Terms from './pages/Terms';

const AppContainer = styled.div`
  font-family: 'Poppins', sans-serif;
  color: #333;
  position: relative;
  min-height: 100vh;
`;

const App = () => {
  return (
    <GoogleOAuthProvider clientId="265734336347-r0ah7ipgmb13a4tqnlotjuuj0imr3ape.apps.googleusercontent.com">
      <Router>
        <GlobalStyles />
        <AppContainer>
          <Header />
         {/* Add this line */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/tours" element={<Tours />} />
            <Route path="/tourSection" element={<ToursSection />} />
            <Route path="/safariExperience" element={<SafariExperience />} />
            <Route path="/tours/:id" element={<TourDetail />} />
            <Route path="/safaris" element={<Safaris />} />
            <Route path="/safaris/:id" element={<SafariDetail />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/dayTrips" element={<DayTripsPage />} />
            <Route path="/TripsDetails/:id" element={<DayTripDetails />} />
            <Route path="/terms" element={<Terms />} />
          </Routes>
          <WhatsAppButton />
        </AppContainer>
      </Router>
    </GoogleOAuthProvider>
  );
};

export default App;