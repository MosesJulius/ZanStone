// src/pages/Terms.jsx
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiArrowLeft, FiFileText } from 'react-icons/fi';
import Footer from '../components/Footer';
import { color } from '../styles/color';

const PageWrapper = styled.div`
  background: ${color.cream};
  min-height: 100vh;
`;

const HeroSection = styled.section`
  padding: 158px 20px 80px;
  background: linear-gradient(135deg, #FF7D33, #E56C2B);
  color: ${color.white};
  text-align: center;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 118px 15px 56px;
  }
`;

const HeroIcon = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.18);
  border: 1px solid rgba(255, 255, 255, 0.35);
  font-size: 1.7rem;
  margin-bottom: 18px;
`;

const HeroTitle = styled(motion.h1)`
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 16px;
  color: ${color.white};
  text-shadow: 0 2px 12px rgba(0, 0, 0, 0.24);

  @media (max-width: 1024px) {
    font-size: 2.5rem;
  }

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const HeroSubtitle = styled(motion.p)`
  max-width: 720px;
  margin: 0 auto;
  font-size: 1.05rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.95);

  @media (max-width: 768px) {
    font-size: 0.95rem;
  }
`;

const ContentContainer = styled.div`
  max-width: 1180px;
  margin: 0 auto;
  padding: 60px 20px 80px;
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 40px;
  align-items: start;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    padding: 44px 16px 64px;
    gap: 24px;
  }
`;

const TocCard = styled.aside`
  position: sticky;
  top: 110px;
  background: ${color.white};
  border: 1px solid ${color.border};
  border-radius: 16px;
  padding: 22px 20px;
  box-shadow: 0 8px 24px rgba(42, 38, 34, 0.06);

  @media (max-width: 1024px) {
    position: static;
  }
`;

const TocTitle = styled.h2`
  font-size: 0.82rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: ${color.textMuted};
  margin: 0 0 14px;
  display: flex;
  align-items: center;
  gap: 8px;

  svg {
    color: ${color.primary};
  }
`;

const TocList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
  max-height: 60vh;
  overflow-y: auto;

  @media (max-width: 1024px) {
    max-height: none;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 8px;
  }
`;

const TocLink = styled.a`
  display: block;
  padding: 7px 10px;
  border-radius: 8px;
  font-size: 0.85rem;
  font-weight: 500;
  color: ${color.textDark};
  text-decoration: none;
  transition: all 0.18s ease;

  &:hover {
    background: ${color.primarySoft};
    color: ${color.primaryDark};
    padding-left: 14px;
  }

  @media (max-width: 1024px) {
    border: 1px solid ${color.border};
    padding: 6px 12px;
    border-radius: 999px;
  }
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  gap: 22px;
`;

const IntroCard = styled(motion.div)`
  background: ${color.white};
  border: 1px solid ${color.border};
  border-radius: 16px;
  padding: 28px 30px;
  box-shadow: 0 8px 24px rgba(42, 38, 34, 0.05);

  p {
    margin: 0 0 14px;
    color: ${color.textDark};
    line-height: 1.75;
    font-size: 0.97rem;
  }

  p:last-child {
    margin-bottom: 0;
  }

  @media (max-width: 768px) {
    padding: 22px 20px;
  }
`;

const SectionCard = styled(motion.section)`
  scroll-margin-top: 110px;
  background: ${color.white};
  border: 1px solid ${color.border};
  border-radius: 16px;
  padding: 26px 30px;
  box-shadow: 0 8px 24px rgba(42, 38, 34, 0.05);

  @media (max-width: 768px) {
    padding: 20px 18px;
  }
`;

const SectionHead = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 16px;
`;

const SectionNumber = styled.span`
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 38px;
  height: 38px;
  padding: 0 10px;
  border-radius: 10px;
  background: linear-gradient(135deg, #FF7D33, #E56C2B);
  color: ${color.white};
  font-weight: 800;
  font-size: 0.95rem;
  box-shadow: 0 4px 12px rgba(255, 125, 51, 0.3);
`;

const SectionTitle = styled.h3`
  margin: 0;
  font-size: 1.15rem;
  font-weight: 700;
  color: ${color.heading};
  line-height: 1.35;

  @media (max-width: 768px) {
    font-size: 1.02rem;
  }
`;

const BodyText = styled.p`
  margin: 0 0 12px;
  color: ${color.textDark};
  line-height: 1.75;
  font-size: 0.95rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const BulletList = styled.ul`
  margin: 0 0 12px;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 7px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const BulletItem = styled.li`
  position: relative;
  padding-left: 26px;
  color: ${color.textDark};
  line-height: 1.65;
  font-size: 0.95rem;

  &::before {
    content: '';
    position: absolute;
    left: 6px;
    top: 9px;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${color.primary};
  }
`;

const OrderedList = styled.ol`
  margin: 0 0 12px;
  padding-left: 22px;
  display: flex;
  flex-direction: column;
  gap: 7px;

  &:last-child {
    margin-bottom: 0;
  }

  li {
    color: ${color.textDark};
    line-height: 1.65;
    font-size: 0.95rem;
  }
`;

const AcceptanceCard = styled(motion.section)`
  scroll-margin-top: 110px;
  background: linear-gradient(135deg, #2A2622, #3d352f);
  border-radius: 16px;
  padding: 30px;
  color: ${color.textLight};
  box-shadow: 0 12px 30px rgba(42, 38, 34, 0.2);

  h3 {
    margin: 0 0 14px;
    font-size: 1.2rem;
    color: ${color.white};
    display: flex;
    align-items: center;
    gap: 10px;
  }

  p {
    margin: 0 0 12px;
    line-height: 1.75;
    font-size: 0.95rem;
    color: rgba(255, 248, 240, 0.9);
  }

  p:last-child {
    margin-bottom: 0;
  }

  @media (max-width: 768px) {
    padding: 22px 20px;
  }
`;

const Signature = styled.div`
  margin-top: 18px;
  padding-top: 18px;
  border-top: 1px solid rgba(255, 255, 255, 0.16);
  font-weight: 700;
  color: ${color.white};
  display: flex;
  flex-direction: column;
  gap: 4px;

  span {
    font-weight: 400;
    font-size: 0.88rem;
    color: rgba(255, 248, 240, 0.75);
  }
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
  align-self: flex-start;
  padding: 11px 20px;
  border-radius: 999px;
  background: ${color.primary};
  color: ${color.white};
  font-weight: 700;
  font-size: 0.9rem;
  text-decoration: none;
  box-shadow: 0 6px 16px rgba(255, 125, 51, 0.3);
  transition: all 0.2s ease;

  &:hover {
    background: ${color.primaryDark};
    transform: translateY(-2px);
  }
`;

const HERO_SUBTITLE =
  'These Terms and Conditions apply to all tours, safaris, excursions, transfers, accommodation arrangements, flights, activities, and other travel services booked through ZanStone Tours & Safaris.';

const SECTIONS = [
  {
    title: 'Quotations & Prices',
    blocks: [
      { type: 'p', text: 'All quotations are based on the information, travel dates, number of guests, accommodation, activities, transportation, government fees, exchange rates, and supplier rates available at the time the quotation is issued.' },
      { type: 'p', text: 'Unless specifically stated otherwise, a quotation does not guarantee availability or secure a reservation.' },
      { type: 'p', text: 'Prices may change before a booking is confirmed due to changes in:' },
      { type: 'ul', items: ['Accommodation or supplier rates', 'Domestic flight fares', 'Park, conservation, or government fees', 'Taxes and levies', 'Fuel or transportation costs', 'Currency exchange rates', 'Other third-party charges'] },
      { type: 'p', text: 'Once the required deposit has been received and the booking confirmed in writing, ZanStone Tours & Safaris will honor the confirmed price except where a change results from new or increased government taxes, park/conservation fees, statutory charges, or other mandatory charges outside our reasonable control.' },
    ],
  },
  {
    title: 'Deposit & Booking Confirmation',
    blocks: [
      { type: 'p', text: 'A minimum 30% deposit of the total booking value is normally required to secure a reservation.' },
      { type: 'p', text: 'Depending on the services included, ZanStone Tours & Safaris may require a higher deposit, including up to 100% advance payment, particularly where suppliers require immediate or non-refundable payment.' },
      { type: 'p', text: 'This may include:' },
      { type: 'ul', items: ['Domestic flights', 'Selected hotels and lodges', 'Special accommodation', 'Hot-air balloon experiences', 'Park permits and entrance fees', 'Special events or experiences', 'Certain marine activities', 'Other third-party services'] },
      { type: 'p', text: 'A booking is considered confirmed only when:' },
      { type: 'ol', items: ['The required deposit or full payment has been received; and', 'ZanStone Tours & Safaris has issued written confirmation.'] },
      { type: 'p', text: 'Availability communicated before payment is not considered a confirmed reservation.' },
    ],
  },
  {
    title: 'Final Payment',
    blocks: [
      { type: 'p', text: 'Unless otherwise agreed in writing, the outstanding balance must be paid no later than 7 days before the first booked service begins.' },
      { type: 'p', text: 'Bookings made within 7 days of the service date may require full payment at the time of confirmation.' },
      { type: 'p', text: 'If the required payment is not received by the agreed deadline, ZanStone Tours & Safaris reserves the right to suspend or cancel unconfirmed services.' },
      { type: 'p', text: 'Any resulting cancellation charges, supplier penalties, or loss of availability will be the responsibility of the client.' },
    ],
  },
  {
    title: 'Payment Methods, Currency & Transaction Fees',
    blocks: [
      { type: 'p', text: 'Unless otherwise stated, quotations are issued in United States Dollars (USD).' },
      { type: 'p', text: 'Where payment is accepted in another currency, including EUR or TZS, the applicable exchange rate will be the rate agreed or communicated by ZanStone Tours & Safaris at the time payment is made.' },
      { type: 'p', text: 'Bank charges, international transfer charges, card processing fees, payment-gateway fees, currency-conversion costs, and other financial transaction charges are the responsibility of the client unless specifically stated otherwise.' },
      { type: 'p', text: 'ZanStone Tours & Safaris must receive the full amount stated on the invoice or payment request.' },
    ],
  },
  {
    title: 'Cancellation by the Client',
    blocks: [
      { type: 'p', text: 'All cancellation requests must be submitted in writing.' },
      { type: 'p', text: 'Unless different cancellation terms have been communicated for a specific booking, the following general cancellation charges apply:' },
      { type: 'ul', items: ['61 days or more before departure: No general cancellation penalty; however, any non-refundable supplier costs and unrecoverable transaction charges already incurred will be deducted.', '31–60 days before departure: 30% of the total booking value.', '16–30 days before departure: 50% of the total booking value.', '15 days or less before departure: 100% of the total booking value.', 'No Show: 100% of the total booking value.'] },
      { type: 'p', text: 'Where actual non-refundable supplier costs exceed the general cancellation percentage, the amount already committed or paid to those suppliers may also apply.' },
      { type: 'p', text: 'Certain tailor-made tours and special services may have different cancellation conditions. Where applicable, these will be communicated before confirmation.' },
    ],
  },
  {
    title: 'Non-Refundable Services',
    blocks: [
      { type: 'p', text: 'Certain services may become partially or completely non-refundable once booked.' },
      { type: 'p', text: 'These may include:' },
      { type: 'ul', items: ['Domestic or international flights', 'Hotels and safari lodges', 'Park permits and fees', 'Hot-air balloon experiences', 'Special accommodation', 'Private boats', 'Special-event reservations', 'Certain excursions', 'Other third-party services'] },
      { type: 'p', text: "Where a supplier's cancellation policy is stricter than ZanStone Tours & Safaris' general cancellation policy, the supplier's applicable conditions may apply to that component of the booking." },
      { type: 'p', text: 'ZanStone Tours & Safaris will not be required to refund money that has already been legitimately paid to a supplier and cannot reasonably be recovered.' },
    ],
  },
  {
    title: 'Refunds',
    blocks: [
      { type: 'p', text: 'Where a refund is due, the refundable amount will be calculated after deducting, where applicable:' },
      { type: 'ul', items: ['Applicable cancellation charges', 'Non-refundable supplier payments', 'Unrecoverable bank or transaction charges', "Other costs already incurred specifically for the client's booking"] },
      { type: 'p', text: 'Approved refunds will normally be processed within 14–30 business days, depending on supplier refund processing times, banks, airlines, hotels, and payment providers.' },
      { type: 'p', text: 'Where ZanStone Tours & Safaris is waiting for a refund from a third-party supplier, the corresponding client refund may be processed after the applicable funds have been recovered.' },
    ],
  },
  {
    title: 'Booking Changes & Postponement',
    blocks: [
      { type: 'p', text: 'Clients may request changes to their booking, including travel dates, accommodation, activities, or traveler details.' },
      { type: 'p', text: 'ZanStone Tours & Safaris will make reasonable efforts to accommodate such requests, but changes are subject to availability and supplier conditions.' },
      { type: 'p', text: 'Any additional costs resulting from a requested change will be payable by the client.' },
      { type: 'p', text: 'For private tours, postponement to a later date may be possible.' },
      { type: 'p', text: 'However, the client remains responsible for any non-refundable costs and any price differences resulting from:' },
      { type: 'ul', items: ['New travel dates', 'Accommodation rates', 'Flight fares', 'Park fees', 'Government taxes', 'Fuel or transportation costs', 'Supplier charges', 'Currency fluctuations'] },
      { type: 'p', text: 'Any credit granted for a postponed booking will be subject to the conditions communicated in writing at the time of postponement.' },
    ],
  },
  {
    title: 'Client Delays, Missed Services & No-Shows',
    blocks: [
      { type: 'p', text: 'Clients are responsible for being ready at the confirmed pickup or departure time.' },
      { type: 'p', text: 'ZanStone Tours & Safaris will make reasonable efforts to assist a delayed client where operationally possible.' },
      { type: 'p', text: 'However, where a client misses a flight, boat, transfer, safari departure, excursion, activity, or other service because of their own delay, failure to follow communicated instructions, or other circumstances attributable to the client, no refund is guaranteed.' },
      { type: 'p', text: "Any additional transportation, accommodation, flight, ticket, or other costs required to continue the itinerary will normally be the client's responsibility." },
    ],
  },
  {
    title: 'Unused Services',
    blocks: [
      { type: 'p', text: 'No refund will normally be provided for accommodation, meals, transfers, excursions, safari activities, flights, park visits, or other services voluntarily missed or unused by the client after the trip has begun.' },
      { type: 'p', text: 'This applies particularly where the service was available as confirmed but the client chose not to participate.' },
      { type: 'p', text: 'Where a confirmed service cannot be provided due to an issue attributable to ZanStone Tours & Safaris or its suppliers, we will assess the circumstances and make reasonable efforts to provide an alternative, credit, or appropriate refund for the affected service where applicable.' },
    ],
  },
  {
    title: 'Itinerary Changes',
    blocks: [
      { type: 'p', text: 'Travel in Tanzania and Zanzibar requires a reasonable degree of flexibility.' },
      { type: 'p', text: 'Routes, timings, activities, accommodation, flights, boats, transportation, and other itinerary elements may occasionally need to change because of circumstances including:' },
      { type: 'ul', items: ['Weather conditions', 'Ocean tides and sea conditions', 'Road conditions', 'Wildlife movements', 'Flight schedule changes', 'Mechanical problems', 'Park regulations', 'Government decisions', 'Safety considerations', 'Accommodation availability', 'Strikes or civil disruption', 'Other circumstances beyond reasonable control'] },
      { type: 'p', text: 'Where changes are necessary, ZanStone Tours & Safaris will make reasonable efforts to provide a suitable alternative of a similar standard where reasonably available.' },
      { type: 'p', text: 'A reasonable operational change that does not materially reduce the overall value of the booked experience will not automatically entitle the client to a refund.' },
    ],
  },
  {
    title: 'Safari & Wildlife Experiences',
    blocks: [
      { type: 'p', text: 'Wildlife occurs in natural environments and sightings can never be guaranteed.' },
      { type: 'p', text: 'The location, number, and behavior of animals may vary according to season, weather, migration patterns, vegetation, and other natural factors.' },
      { type: 'p', text: 'Failure to see a particular animal, including the Big Five, Great Migration, dolphins, whales, or any other wildlife species, does not constitute failure to provide the booked service where the tour or safari itself was delivered as confirmed.' },
      { type: 'p', text: 'Clients must follow the safety instructions of guides, drivers, rangers, and park authorities.' },
    ],
  },
  {
    title: 'Marine & Ocean Activities',
    blocks: [
      { type: 'p', text: 'Zanzibar marine activities may be affected by:' },
      { type: 'ul', items: ['High and low tides', 'Ocean currents', 'Wind', 'Waves', 'Rain', 'Visibility', 'Weather', 'Other sea conditions'] },
      { type: 'p', text: 'Activities including snorkeling, dolphin tours, sandbank visits, dhow cruises, boat excursions, and other marine experiences may therefore require changes to departure times, routes, locations, or schedules.' },
      { type: 'p', text: 'The captain, guide, or responsible representative may modify, postpone, or stop an activity where conditions present an unreasonable safety risk.' },
      { type: 'p', text: 'Client safety will take priority over the original itinerary.' },
    ],
  },
  {
    title: 'Domestic & International Flights',
    blocks: [
      { type: 'p', text: 'Flights are subject to the terms, conditions, schedules, baggage policies, and operational decisions of the relevant airline.' },
      { type: 'p', text: 'Flight schedules may be changed, delayed, or cancelled without prior notice.' },
      { type: 'p', text: 'ZanStone Tours & Safaris is not responsible for airline delays or cancellations caused by airlines, weather, airport operations, government restrictions, or circumstances outside our reasonable control.' },
      { type: 'p', text: 'Where possible, we will assist clients in arranging suitable alternatives, but additional costs may remain subject to airline policies, travel insurance, and the circumstances causing the disruption.' },
      { type: 'p', text: 'Clients are responsible for complying with applicable baggage restrictions, check-in requirements, and airline instructions.' },
    ],
  },
  {
    title: 'Accommodation',
    blocks: [
      { type: 'p', text: 'Accommodation is subject to availability at the time the booking is confirmed.' },
      { type: 'p', text: 'Where a confirmed accommodation provider becomes unavailable for circumstances beyond our reasonable control, ZanStone Tours & Safaris will make reasonable efforts to provide an alternative of a similar standard where reasonably available.' },
      { type: 'p', text: 'Hotel and lodge check-in/check-out times, meal schedules, facilities, and house rules are determined by the respective accommodation provider.' },
      { type: 'p', text: "Any personal expenses incurred at an accommodation property that are not included in the confirmed package are the client's responsibility." },
    ],
  },
  {
    title: 'Travel Insurance',
    blocks: [
      { type: 'p', text: 'Travel insurance is not included unless specifically stated in the confirmed package.' },
      { type: 'p', text: 'ZanStone Tours & Safaris strongly recommends comprehensive travel insurance covering, where appropriate:' },
      { type: 'ul', items: ['Medical emergencies', 'Medical evacuation and repatriation', 'Trip cancellation', 'Trip interruption', 'Flight delays and cancellations', 'Lost or damaged baggage', 'Personal accidents', 'Safari and adventure activities'] },
      { type: 'p', text: 'Clients are responsible for ensuring their policy provides adequate coverage for the activities included in their trip.' },
    ],
  },
  {
    title: 'Health, Medical Conditions & Fitness',
    blocks: [
      { type: 'p', text: 'Clients are responsible for determining whether they are physically and medically fit to participate in their chosen activities.' },
      { type: 'p', text: 'Relevant medical conditions, disabilities, allergies, dietary requirements, or other conditions that could affect participation should be communicated before travel.' },
      { type: 'p', text: 'Clients should seek appropriate professional medical advice regarding vaccinations, medications, health precautions, and fitness to travel.' },
      { type: 'p', text: 'Some safaris and activities take place in remote areas where medical facilities may be limited.' },
      { type: 'p', text: 'ZanStone Tours & Safaris does not provide medical advice.' },
    ],
  },
  {
    title: 'Passports, Visas & Travel Documents',
    blocks: [
      { type: 'p', text: 'Clients are responsible for ensuring they have valid:' },
      { type: 'ul', items: ['Passports', 'Visas', 'Travel insurance', 'Vaccination documentation where required', 'Entry permits', 'Flight documentation', 'Any other legally required travel documents'] },
      { type: 'p', text: 'Information provided by ZanStone Tours & Safaris regarding visas, entry requirements, or health documentation is intended as general assistance.' },
      { type: 'p', text: 'The traveler remains responsible for verifying current requirements with the appropriate authorities before travel.' },
    ],
  },
  {
    title: 'Special Requests',
    blocks: [
      { type: 'p', text: 'ZanStone Tours & Safaris will make reasonable efforts to accommodate special requests such as:' },
      { type: 'ul', items: ['Dietary requirements', 'Language preferences', 'Accessibility requirements', 'Room preferences', 'Celebration arrangements', 'Child-related requirements', 'Other personal requests'] },
      { type: 'p', text: 'Special requests depend on availability and the ability of the relevant supplier to provide them and therefore cannot always be guaranteed unless specifically confirmed in writing.' },
    ],
  },
  {
    title: 'Client Conduct & Safety',
    blocks: [
      { type: 'p', text: 'Clients must follow reasonable safety instructions provided by guides, drivers, captains, rangers, hotel staff, park authorities, and ZanStone Tours & Safaris representatives.' },
      { type: 'p', text: "ZanStone Tours & Safaris reserves the right to stop or restrict a client's participation where their conduct creates a serious risk to:" },
      { type: 'ul', items: ['Their own safety', 'Other travelers', 'Staff', 'Wildlife', 'Property', 'The safe operation of the tour'] },
      { type: 'p', text: 'Serious misconduct, deliberate disregard of safety instructions, illegal activity, abusive behavior, or behavior that significantly disrupts the tour may result in termination of the client\'s participation.' },
      { type: 'p', text: 'Where participation is terminated due to the client\'s serious misconduct or deliberate safety violation, unused services may not be refundable.' },
    ],
  },
  {
    title: 'Damage to Property',
    blocks: [
      { type: 'p', text: 'Clients may be held responsible for loss or damage caused intentionally or through negligence to vehicles, boats, accommodation, equipment, or other property used during the trip.' },
      { type: 'p', text: 'Where appropriate, the client may be required to pay reasonable repair or replacement costs supported by the circumstances of the damage.' },
      { type: 'p', text: 'Normal wear and tear is excluded.' },
    ],
  },
  {
    title: 'Cancellation by ZanStone Tours & Safaris',
    blocks: [
      { type: 'p', text: 'If ZanStone Tours & Safaris cancels a confirmed service for reasons within our reasonable control, we will offer, where appropriate:' },
      { type: 'ol', items: ['A suitable alternative of comparable value; or', 'An alternative of lower value together with an appropriate price adjustment; or', 'A refund for the affected service.'] },
      { type: 'p', text: 'Where cancellation results from circumstances outside our reasonable control, any refund will depend on amounts reasonably recoverable from the relevant suppliers.' },
      { type: 'p', text: 'ZanStone Tours & Safaris is not responsible for consequential costs independently incurred by the client, such as international flights, visas, vaccinations, insurance, or other independently booked travel arrangements, except where liability cannot legally be excluded.' },
    ],
  },
  {
    title: 'Force Majeure',
    blocks: [
      { type: 'p', text: 'ZanStone Tours & Safaris shall not be responsible for failure, interruption, or delay in providing services caused by extraordinary circumstances outside our reasonable control.' },
      { type: 'p', text: 'These may include:' },
      { type: 'ul', items: ['Natural disasters', 'Extreme weather', 'Flooding', 'Epidemics or pandemics', 'War or serious civil unrest', 'Government actions or restrictions', 'Border closures', 'Strikes', 'Major transportation disruption', 'Other comparable events beyond reasonable control'] },
      { type: 'p', text: 'Where possible, ZanStone Tours & Safaris will work with clients and suppliers to find reasonable alternative arrangements.' },
      { type: 'p', text: 'Any refund will depend on the circumstances and amounts recoverable from the suppliers involved.' },
    ],
  },
  {
    title: 'Third-Party Suppliers',
    blocks: [
      { type: 'p', text: 'ZanStone Tours & Safaris works with hotels, lodges, airlines, boat operators, activity providers, guides, transport companies, and other independent suppliers.' },
      { type: 'p', text: 'Certain services are therefore subject to the terms and operating conditions of those suppliers.' },
      { type: 'p', text: 'ZanStone Tours & Safaris will exercise reasonable care in selecting and coordinating suppliers but cannot control every operational decision made independently by a third-party provider.' },
      { type: 'p', text: 'Where a supplier changes or cancels a service, we will make reasonable efforts to assist the client and arrange an appropriate alternative where possible.' },
    ],
  },
  {
    title: 'Complaints',
    blocks: [
      { type: 'p', text: 'Any problem experienced during a tour should be reported as soon as reasonably possible to the guide, driver, representative, or ZanStone Tours & Safaris.' },
      { type: 'p', text: 'This allows us an opportunity to investigate and attempt to resolve the issue while the client is still traveling.' },
      { type: 'p', text: 'Complaints made after completion of the trip should be submitted in writing within 30 days of the final booked service.' },
      { type: 'p', text: 'Complaints will be reviewed fairly based on the confirmed booking, circumstances, supplier information, and available evidence.' },
    ],
  },
  {
    title: 'Amendments to These Terms',
    blocks: [
      { type: 'p', text: 'ZanStone Tours & Safaris reserves the right to update these Terms and Conditions when reasonably necessary.' },
      { type: 'p', text: "The applicable Terms and Conditions will generally be those communicated or made available in connection with the client's confirmed booking, together with any specific written conditions stated in the quotation, invoice, or booking confirmation." },
    ],
  },
];

const slugify = (value, index) =>
  `term-${index + 1}-${value
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')}`;

const renderBlock = (block, key) => {
  if (block.type === 'ul') {
    return (
      <BulletList key={key}>
        {block.items.map((item, i) => (
          <BulletItem key={i}>{item}</BulletItem>
        ))}
      </BulletList>
    );
  }

  if (block.type === 'ol') {
    return (
      <OrderedList key={key}>
        {block.items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </OrderedList>
    );
  }

  return <BodyText key={key}>{block.text}</BodyText>;
};

const Terms = () => {
  const [showToc, setShowToc] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
    setShowToc(true);
  }, []);

  return (
    <PageWrapper>
      <HeroSection>
        <HeroIcon>
          <FiFileText />
        </HeroIcon>
        <HeroTitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Terms &amp; Conditions
        </HeroTitle>
        <HeroSubtitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {HERO_SUBTITLE}
        </HeroSubtitle>
      </HeroSection>

      <ContentContainer>
        {showToc && (
          <TocCard>
            <TocTitle>
              <FiFileText /> Contents
            </TocTitle>
            <TocList>
              {SECTIONS.map((section, index) => (
                <li key={index}>
                  <TocLink href={`#${slugify(section.title, index)}`}>
                    {index + 1}. {section.title}
                  </TocLink>
                </li>
              ))}
            </TocList>
          </TocCard>
        )}

        <Main>
          <IntroCard
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <BodyText>
              These Terms and Conditions apply to all tours, safaris, excursions, transfers,
              accommodation arrangements, flights, activities, and other travel services booked
              through ZanStone Tours &amp; Safaris.
            </BodyText>
            <BodyText>
              By confirming a booking and making the required payment, the client acknowledges that
              they have read, understood, and accepted these Terms and Conditions.
            </BodyText>
            <BodyText>
              Where one person books on behalf of other travelers, that person will be considered the
              main contact and confirms that they are authorized to accept these Terms and Conditions
              on behalf of all travelers included in the booking, including minors.
            </BodyText>
          </IntroCard>

          {SECTIONS.map((section, index) => {
            const id = slugify(section.title, index);
            return (
              <SectionCard
                key={id}
                id={id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.4 }}
              >
                <SectionHead>
                  <SectionNumber>{index + 1}</SectionNumber>
                  <SectionTitle>{section.title}</SectionTitle>
                </SectionHead>
                {section.blocks.map((block, i) => renderBlock(block, i))}
              </SectionCard>
            );
          })}

          <AcceptanceCard
            id="acceptance-of-terms"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.4 }}
          >
            <h3>
              <FiFileText /> Acceptance of Terms
            </h3>
            <p>
              By paying the required deposit or full booking amount, the client confirms that they
              have read, understood, and accepted these Terms and Conditions and have authority to
              accept them on behalf of all travelers included in their booking.
            </p>
            <Signature>
              ZanStone Tours &amp; Safaris
              <span>Zanzibar &amp; Tanzania Tours, Safaris &amp; Travel Experiences</span>
            </Signature>
          </AcceptanceCard>

          <BackLink to="/">
            <FiArrowLeft /> Back to Home
          </BackLink>
        </Main>
      </ContentContainer>

      <Footer />
    </PageWrapper>
  );
};

export default Terms;
