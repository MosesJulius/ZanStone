// src/data/DayTripsData.js

// Placeholder imports for tour images
// You'll need to add actual images to your assets folder

import beach1 from "../src/assets/image/Folder1/beac.jpg";
import beach2 from "../src/assets/image/Folder1/beach.jpg";
import beach3 from "../src/assets/image/Folder1/beach2.jpg";
import beach4 from "../src/assets/image/Folder1/beach3.jpg";
import beach5 from "../src/assets/image/Folder1/beach4.jpg";
import blue1 from "../src/assets/image/Folder1/blue1.jpg";
import blue2 from "../src/assets/image/Folder1/blue2.jpg";
import blue3 from "../src/assets/image/Folder1/blue3.jpg";
import blue4 from "../src/assets/image/Folder1/blue4.jpg";
import safariBg from "../src/assets/image/Folder1/desti.jpg";
import safari1 from "../src/assets/image/safari1.jpg";
import safari2 from "../src/assets/image/safari2.jpg";
import safari3 from "../src/assets/image/safari3.jpg";
import safari5 from "../src/assets/image/safari5.jpg";
import safari4 from "../src/assets/image/safari4.jpg";
import mikumi1 from "../src/assets/image/Folder1/mikumi1.jpg";
import mikumi from "../src/assets/image/Folder1/mikumi.jpg";
import mikumi2 from "../src/assets/image/Folder1/mikumi2.jpg";
import mikumi3 from "../src/assets/image/Folder1/mikumi3.jpg";
import kayaking from "../src/assets/image/Folder1/kayaking.jpg";
import maa1 from "../src/assets/image/Folder1/maa1.jpeg";
import maa2 from "../src/assets/image/Folder1/maa2.jpeg";
import pung1 from "../src/assets/image/Folder1/pung1.jpeg";
import sal1 from "../src/assets/image/Folder1/sal1.jpg";
import sal2 from "../src/assets/image/Folder1/sal2.jpg";
import jozani from "../src/assets/image/jozani/jozani.jpg";
import mnemba from "../src/assets/image/mnemba/mnemba.jpg";
import mnemba1 from "../src/assets/image/mnemba/mnemba1.jpg";
import mnemba5 from "../src/assets/image/mnemba/mnemba5.jpg";
import mnemba6 from "../src/assets/image/mnemba/mnemba6.jpg";
import nakupenda3 from "../src/assets/image/nakupenda/nakupenda5.jpg";
import nakupenda2 from "../src/assets/image/nakupenda/nakupenda6.jpg";
import nakupenda from "../src/assets/image/nakupenda/nakupendasandbank.jpg";
import nakupenda1 from "../src/assets/image/nakupenda/nalupenda1.jpg";
import prison from "../src/assets/image/prison/prisonisland.jpg";
import prison2 from "../src/assets/image/prison/prisonisland2.avif";
import rock from "../src/assets/image/rock/rock.jpg";
import spice from "../src/assets/image/spice/spice.jpg";
import stone from "../src/assets/image/stonetown/stonetown.jpg";
import sunset from "../src/assets/image/sunset/sunset.jpg";
import sunset1 from "../src/assets/image/sunset/sunset1.jpg";



// Use placeholder images instead of actual imports to avoid dependency issues
const placeholderImages = {
  mnemba,
  stoneTown: stone,
  spice,
  prison,
  jozani,
  nakupenda,
  sunset,
  safari: safariBg,
  cave: sal1,
  default: stone
};

const tourPhotosByName = {
  'clear-kayak-drone': [kayaking, pung1, blue1, blue2, beach4, mnemba],
  'mnemba-snorkeling': [mnemba, mnemba1, mnemba5, mnemba6, blue1, beach1],
  'nakupenda-prison-private': [nakupenda, prison, nakupenda2, prison2, beach3, sunset],
  'nakupenda-sandbank': [nakupenda1, nakupenda, nakupenda2, nakupenda3, beach4, sunset1],
  'nyange-sandbank': [nakupenda3, beach3, blue2, mnemba5, beach1, sunset],
  'pungume-sandbank': [pung1, blue1, blue2, mnemba5, mnemba6, beach1],
  'safari-blue': [blue1, blue2, blue3, blue4, beach4, mnemba],
  'salaam-cave': [sal2, sal1, mnemba5, blue1, beach3, mnemba1],
  'jozani-salaam': [jozani, sal1, mnemba5, beach1, blue1, mnemba],
  'salaam-maalum': [sal1, maa1, maa2, beach1, mnemba5, blue1],
  'stone-prison': [stone, prison, prison2, beach1, mnemba, blue1],
  'stone-spice': [stone, spice, mnemba, beach1, blue1, mnemba5],
  'kendwa-sunset': [sunset, sunset1, beach4, mnemba, blue1, blue2],
  'zanzibar-mikumi': [safariBg, safari1, mnemba, nakupenda, prison, sunset],
  'tarangire-ngorongoro': [safari3, safari2, safari1, safariBg, sunset, mnemba],
  'serengeti-safari': [safari2, safari3, safari1, safariBg, sunset, mnemba],
  'nyerere-safari': [safari1, safari3, safari2, safariBg, sunset, mnemba],
  'mikumi-safari': [safari5, safari1, safari3, safari2, safariBg, sunset],
  'serengeti-3day': [safari4, safari2, safari3, safari1, safariBg, sunset],
  'ngorongoro-2day': [mikumi1, safari1, safari3, safari2, safariBg, sunset],
  'mikumi-3day': [mikumi, safari1, safari3, safari2, safariBg, sunset],
  'serengeti-balloon': [mikumi3, mikumi2, safari2, safari3, safari1, safariBg],
  'nyerere-2day': [mikumi2, safari1, safari3, safari2, safariBg, sunset]
};

const generateTourPhotos = (baseName, count = 6) => {
  let chosenPhotos = tourPhotosByName[baseName] || Object.values(placeholderImages);
  if (!chosenPhotos || chosenPhotos.length === 0) {
    chosenPhotos = [stone, mnemba, spice, prison, sunset, safariBg];
  }

  const photos = [];
  for (let i = 0; i < count; i++) {
    const image = chosenPhotos[i % chosenPhotos.length];
    photos.push({
      id: `${baseName}-photo-${i + 1}`,
      url: image,
      alt: `${baseName.replace(/-/g, ' ')} - Photo ${i + 1}`,
      caption: `${baseName.replace(/-/g, ' ')} - View ${i + 1}`
    });
  }

  return photos;
};
export const dayTripsData = [
  // 2-Day Nyerere (Selous) Safari with Boat Safari — newest package
  {
    id: 'nyerere-2day-boat-safari',
    name: '2-Day Nyerere National Park (Selous) Safari from Zanzibar',
    shortDescription: 'Game drive plus Rufiji River boat safari with a full-board overnight stay — 2 shared-safari days with flights',
    description: 'Fly to Nyerere National Park for a full-day game drive and overnight stay, then explore the Rufiji River by boat before flying back to Zanzibar — shared safari on a full-board basis with return flights included.',
    fullDescription: `Experience Tanzania’s wilderness by land and water on an unforgettable two-day safari from Zanzibar.

Fly directly to Nyerere National Park, enjoy a full-day wildlife game drive and spend one night near the park. The following morning, explore the Rufiji River by boat before flying back to Zanzibar. 2 Days | 1 Night | Shared Safari | Full Board | Return Flights Included.

YOUR ITINERARY
Day 1 – Zanzibar to Nyerere + Full-Day Game Drive: early pickup, domestic flight, meet your driver-guide, game drive through savannahs, woodlands and the Rufiji River area (elephants, lions, giraffes, buffaloes, zebras, hippos, crocodiles and more), lunch on safari, dinner and overnight near the park. Full Board.

Day 2 – Boat Safari + Return to Zanzibar: approx. two-hour Rufiji River boat safari (hippos, crocodiles, birds, animals at the riverbanks), lunch, transfer to the airstrip, return flight, hotel transfer.

PACKAGE INCLUDES: return domestic flights, hotel pickup & drop-off, airport/airstrip transfers, 1 night accommodation, full-board meals, full-day game drive in a shared jeep, English-speaking driver-guide, 2-hour boat safari, park entrance fees, drinking water, taxes and fees, team assistance throughout.

EXCLUDES: international flights, Tanzania visa, travel/medical insurance, tips, alcohol, personal drinks, personal expenses, private vehicle.

PRICE PER PERSON
2 Travellers: $750 per person
3 Travellers: $720 per person
4+ Travellers: $700 per person
From $700 per person. Shared safari — private vehicle on request at extra cost. Passport details required in advance. Wildlife sightings cannot be guaranteed.`,
    price: 'From $700',
    priceNote: 'Per person',
    image: mikumi2,
    duration: '2 Days / 1 Night',
    groupSize: 'Shared Safari',
    category: 'safari',
    isDayTrip: false,
    location: 'Nyerere (Selous)',
    tips: [
      {
        text: 'Have clear passport details ready in advance to reserve the domestic flights.',
        image: mikumi2
      },
      {
        text: 'Domestic flights have strict luggage limits — the allowance is confirmed before departure.',
        image: safari1
      },
      {
        text: 'The boat safari is a highlight — keep the camera ready for hippos and river birds.',
        image: safari3
      }
    ],
    highlights: [
      'Full-day Nyerere game drive',
      'Rufiji River boat safari',
      'Return domestic flights',
      'Full-board overnight stay',
      'Shared jeep, guide & park fees'
    ],
    includes: [
      'Return domestic flights Zanzibar–Nyerere',
      'Zanzibar hotel pickup and drop-off',
      'Airport and airstrip transfers',
      'One night’s accommodation, full board',
      'Full-day wildlife game drive',
      'Shared safari jeep + driver-guide',
      'Two-hour boat safari',
      'Park entrance fees + drinking water',
      'Government taxes and applicable fees'
    ],
    excludes: [
      'International flights',
      'Tanzania visa',
      'Travel and medical insurance',
      'Tips for guide, crew and staff',
      'Alcoholic beverages & personal expenses',
      'Private safari vehicle'
    ],
    status: '2026 New Experience',
    rating: 5.0,
    reviewCount: 0,
    bookingLink: '/book/nyerere-2day-boat-safari',
    featured: true,
    photos: generateTourPhotos('nyerere-2day')
  },

  // 4-Day Serengeti Fly-in Safari with Hot-Air Balloon — newest package
  {
    id: 'serengeti-balloon-4days',
    name: '4-Day Serengeti Fly-in Safari with Hot-Air Balloon',
    shortDescription: 'Fly into the Serengeti, sunrise balloon flight with bush breakfast, and 3 days of private game drives',
    description: 'Four-day private Serengeti fly-in safari: direct flights from Zanzibar, hot-air balloon flight with bush breakfast, three days of wildlife viewing with a professional guide, and three nights at a safari lodge or camp.',
    fullDescription: `Experience the magic of Serengeti National Park on an unforgettable four-day private safari from Zanzibar.

Fly directly into the heart of the Serengeti, enjoy exceptional wildlife encounters and admire the endless plains from a hot-air balloon — no long road transfers. Ideal for couples, families and small groups.

YOUR ITINERARY
Day 1 – Flight Zanzibar to Serengeti: early pickup, direct morning flight, first game drive en route (lions, elephants, giraffes, zebras, wildebeest, cheetahs), picnic lunch in the park, dinner and overnight in Serengeti.

Day 2 – Hot-Air Balloon + Full-Day Game Drive: sunrise balloon flight over the plains, bush breakfast in the wilderness, then full-day game drive. All meals, overnight Serengeti.

Day 3 – Full-Day Serengeti Game Drive: Big Five, predators, herds and birdlife with picnic lunch; dinner and overnight.

Day 4 – Morning Game Drive + Return Flight: final drive toward the airstrip, scheduled flight to Zanzibar, hotel transfer. Breakfast and lunch per flight schedule.

PACKAGE INCLUDES: return Zanzibar–Serengeti flights, 3 nights safari accommodation, balloon safari + bush breakfast, private 4x4 with pop-up roof, English-speaking guide, park entrance and conservation fees, indicated meals, drinking water, Zanzibar and airstrip transfers.

EXCLUDES: international flights, Tanzania visa, travel/medical insurance, tips, alcohol, personal expenses, optional activities.

PRICE PER PERSON
2 Guests: $5,194 per person
3 Guests: $4,705 per person
4+ Guests: $4,694 per person
From $4,694 per person. Flights and lodges have limited availability in high season — send your dates for a personalised quotation.`,
    price: 'From $4,694',
    priceNote: 'Per person',
    image: mikumi3,
    duration: '4 Days / 3 Nights',
    groupSize: 'Private Safari',
    category: 'safari',
    isDayTrip: false,
    location: 'Serengeti',
    tips: [
      {
        text: 'Balloon mornings start before sunrise — dress warmly; it heats up fast after landing.',
        image: mikumi3
      },
      {
        text: 'A camera with zoom is essential — predators, herds and the balloon landscapes.',
        image: mikumi2
      },
      {
        text: 'High-season flights and lodges fill fast — book early with your travel dates.',
        image: safari2
      }
    ],
    highlights: [
      'Sunrise hot-air balloon + bush breakfast',
      'Direct return flights from Zanzibar',
      '3 days of Serengeti game drives',
      'Private 4x4, guide & 3 nights stay',
      'Big Five, predators & herds'
    ],
    includes: [
      'Return domestic flights Zanzibar–Serengeti',
      'Three nights’ safari accommodation',
      'Hot-air balloon safari + bush breakfast',
      'Private 4x4 with pop-up roof',
      'Professional English-speaking guide',
      'Park entrance, taxes & conservation fees',
      'Indicated meals + drinking water',
      'Hotel, airport & airstrip transfers'
    ],
    excludes: [
      'International flights',
      'Tanzania visa',
      'Travel and medical insurance',
      'Tips for guide and lodge staff',
      'Alcoholic beverages & personal expenses'
    ],
    status: '2026 New Experience',
    rating: 5.0,
    reviewCount: 0,
    bookingLink: '/book/serengeti-balloon-4days',
    featured: true,
    photos: generateTourPhotos('serengeti-balloon')
  },

  // 3-Day Mikumi National Park Safari from Zanzibar — newest package
  {
    id: 'mikumi-safari-3days',
    name: '3-Day Mikumi National Park Safari from Zanzibar',
    shortDescription: 'Ferry + SGR train + full-day Mikumi game drive + Maasai village + 2 nights — complete mainland safari',
    description: 'Travel from Zanzibar by ferry and modern SGR train to Mikumi National Park for a full-day wildlife safari, authentic Maasai culture and two relaxing nights close to the park.',
    fullDescription: `Experience Tanzania beyond the beach with an unforgettable 3-day safari combining wildlife, culture and adventure.

Travel from Zanzibar by ferry and modern SGR train to Mikumi National Park — full-day game drive, Maasai village experience and two nights near the park, with all transport, accommodation and logistics arranged.

YOUR ITINERARY
Day 1 – Zanzibar to Dar es Salaam to Morogoro to Mikumi: morning ferry, SGR electric train, road transfer, check-in and lunch. At approx. 5:00 PM, Maasai village visit — traditions, songs and dances. Dinner and overnight in Mikumi.

Day 2 – Full-Day Mikumi Safari: from approx. 6:15 AM, game drive through open savannahs (lions, elephants, giraffes, zebras, buffaloes, wildebeest, hippos and more), lunch in the park, afternoon drive, dinner and overnight.

Day 3 – Mikumi to Morogoro to Dar es Salaam to Zanzibar: SGR train, return ferry, hotel transfer. End of safari.

WHAT'S INCLUDED: hotel pickup & drop-off, return ferry tickets, return SGR tickets, all mainland transfers, 2 nights in Mikumi, full-day game drive, vehicle & guide, park fees, Maasai village experience, meals as indicated, drinking water, taxes and fees.

NOT INCLUDED: travel insurance, tips & personal expenses, alcohol.

PRICE: $650 PER PERSON. Send your travel date, number of guests and Zanzibar hotel to check availability.`,
    price: '$650',
    priceNote: 'Per person',
    image: mikumi,
    duration: '3 Days / 2 Nights',
    groupSize: 'Private Tour',
    category: 'safari',
    isDayTrip: false,
    location: 'Mikumi',
    tips: [
      {
        text: 'The SGR train and ferry run on fixed schedules — pickup time is confirmed with your booking.',
        image: mikumi
      },
      {
        text: 'Evening Maasai village visit on Day 1 — bring a camera and respectful curiosity.',
        image: safari1
      },
      {
        text: 'Full-day game drive starts 6:15 AM — pack sunscreen, hat and binoculars.',
        image: safari3
      }
    ],
    highlights: [
      'Ferry + SGR train adventure',
      'Full-day Mikumi game drive',
      'Authentic Maasai village visit',
      '2 nights + meals arranged',
      'All transport, fees & guide'
    ],
    includes: [
      'Zanzibar hotel pickup & drop-off',
      'Return Zanzibar–Dar es Salaam ferry tickets',
      'Return SGR train tickets',
      'All mainland transfers',
      '2 nights’ accommodation in Mikumi',
      'Full-day Mikumi game drive',
      'Safari vehicle & professional guide',
      'Mikumi National Park fees',
      'Maasai village experience',
      'Meals as indicated + drinking water',
      'Government taxes & fees'
    ],
    excludes: [
      'Travel insurance',
      'Tips & personal expenses',
      'Alcoholic beverages'
    ],
    status: '2026 New Experience',
    rating: 5.0,
    reviewCount: 0,
    bookingLink: '/book/mikumi-safari-3days',
    featured: true,
    photos: generateTourPhotos('mikumi-3day')
  },

  // 2-Day Ngorongoro Safari from Zanzibar — newest package
  {
    id: 'ngorongoro-safari-2days',
    name: '2-Day Ngorongoro Safari from Zanzibar',
    shortDescription: 'Ngorongoro area plus a full crater game drive — return flights, lodge night, meals and transfers in 2 days',
    description: 'Fly from Zanzibar to Arusha for two exciting safari days: Ngorongoro Conservation Area exploration plus a full game drive inside the world-famous Ngorongoro Crater — flights, 4x4 vehicle, accommodation, meals and transfers included.',
    fullDescription: `Experience the breathtaking beauty and wildlife of Ngorongoro on an unforgettable 2-day safari from Zanzibar.

Fly to Arusha, begin your safari immediately, explore the Ngorongoro area on Day 1 and descend into the world-famous Ngorongoro Crater on Day 2 before flying back to Zanzibar.

YOUR ITINERARY
Day 1 – Zanzibar to Arusha to Ngorongoro: early flight (approx. 08:00 arrival), meet your driver-guide, safari in the Ngorongoro area (elephants, giraffes, zebras, buffaloes, wildebeest and more), lunch on safari, dinner and overnight in the Ngorongoro/Karatu area.

Day 2 – Ngorongoro Crater to Arusha to Zanzibar: descend into the crater for lions, elephants, buffaloes, rhinos, hippos, hyenas and birdlife; lunch on safari; return flight to Zanzibar and hotel transfer. End of safari.

WHAT'S INCLUDED: return flights, hotel pickup & drop-off, all mainland transfers, 4x4 with pop-up roof, professional driver-guide, conservation area and crater fees, 1 night accommodation, meals as indicated, drinking water, taxes and fees.

NOT INCLUDED: travel insurance, tips & personal expenses, alcohol.

PRICE PER PERSON
2 Travellers: $1,648 per person
3 Travellers: $1,600 per person
4+ Travellers: $1,513 per person
From $1,513 per person. Send your travel date, number of travelers and Zanzibar hotel to check availability — our team confirms your final price before booking. Includes flights, safari, crater, accommodation, meals and transfers.`,
    price: 'From $1,513',
    priceNote: 'Per person',
    image: mikumi1,
    duration: '2 Days / 1 Night',
    groupSize: 'Private Tour',
    category: 'safari',
    isDayTrip: false,
    location: 'Ngorongoro',
    tips: [
      {
        text: 'Pack layers and a camera with zoom — crater mornings start cool and brighten fast.',
        image: mikumi1
      },
      {
        text: 'The crater day is the highlight — keep batteries charged for a full day of sightings.',
        image: safari1
      },
      {
        text: 'Send your travel date, group size and hotel for an exact personalised quotation.',
        image: safari3
      }
    ],
    highlights: [
      'Ngorongoro Crater Big Five drive',
      'Two days of safari experience',
      'Return flights from Zanzibar',
      '1 night accommodation + meals',
      '4x4 vehicle, fees & pro guide'
    ],
    includes: [
      'Return flights Zanzibar–Arusha–Zanzibar',
      'Zanzibar hotel pickup & drop-off',
      'All mainland transfers',
      '4x4 safari vehicle with pop-up roof',
      'Professional safari driver-guide',
      'Conservation area & crater fees',
      '1 night accommodation',
      'Meals as indicated + drinking water',
      'Government taxes & applicable fees'
    ],
    excludes: [
      'Travel insurance',
      'Tips & personal expenses',
      'Alcoholic beverages'
    ],
    status: '2026 New Experience',
    rating: 5.0,
    reviewCount: 0,
    bookingLink: '/book/ngorongoro-safari-2days',
    featured: true,
    photos: generateTourPhotos('ngorongoro-2day')
  },

  // 3-Day Serengeti Safari from Zanzibar — newest package
  {
    id: 'serengeti-safari-3days',
    name: '3-Day Serengeti Safari from Zanzibar',
    shortDescription: 'Fly into the legendary Serengeti — 2 days of game drives, predators, herds and 2 wilderness nights',
    description: 'Fly directly from Zanzibar into the heart of Tanzania’s most famous national park: exciting Serengeti game drives, incredible wildlife encounters and two nights surrounded by the African wilderness.',
    fullDescription: `Fly directly from Zanzibar and experience the legendary Serengeti on an unforgettable 3-day wildlife safari.

Leave the beaches behind and fly into the heart of Tanzania’s most famous national park — game drives across endless plains, incredible wildlife encounters and two nights surrounded by the African wilderness.

YOUR ITINERARY
Day 1 – Zanzibar to Serengeti: early pickup, flight to the Serengeti airstrip, immediate game drive (lions, leopards, cheetahs, elephants and more), lunch on safari, dinner and overnight in Serengeti.

Day 2 – Full-Day Serengeti Game Drive: predators, herds and possibly Great Migration movements; all meals, overnight Serengeti.

Day 3 – Serengeti to Zanzibar: final morning in the wilderness, return flight, hotel transfer. End of safari.

WHAT'S INCLUDED: return flights, hotel pickup & drop-off, all Serengeti transfers, 4x4 with pop-up roof, professional driver-guide, park fees, listed game drives, 2 nights accommodation, meals as indicated, drinking water, taxes and fees.

NOT INCLUDED: travel insurance, tips & personal expenses, alcohol, optional activities.

PRICE PER PERSON
2 Travellers: $3,352 per person
3 Travellers: $3,000 per person
4+ Travellers: $2,996 per person
From $2,996 per person. Send your travel date, number of travelers and Zanzibar hotel to check availability — our team confirms your final price before booking. Includes flights, Serengeti safari, accommodation, meals and transfers.`,
    price: 'From $2,996',
    priceNote: 'Per person',
    image: safari4,
    duration: '3 Days / 2 Nights',
    groupSize: 'Private Tour',
    category: 'safari',
    isDayTrip: false,
    location: 'Serengeti',
    tips: [
      {
        text: 'Pack layers and a camera with zoom — mornings are cool and sightings can be distant.',
        image: safari4
      },
      {
        text: 'Full-day game drives run on wildlife movement — trust your guide’s route each day.',
        image: safari2
      },
      {
        text: 'Send your travel date, group size and hotel for an exact personalised quotation.',
        image: safari3
      }
    ],
    highlights: [
      'Legendary Serengeti game drives',
      'Lions, leopards, cheetahs & herds',
      'Return flights from Zanzibar',
      '2 nights in Serengeti + all meals',
      '4x4 vehicle, fees & pro guide'
    ],
    includes: [
      'Return flights Zanzibar–Serengeti–Zanzibar',
      'Zanzibar hotel pickup & drop-off',
      'All Serengeti transfers',
      '4x4 safari vehicle with pop-up roof',
      'Professional safari driver-guide',
      'Serengeti National Park fees',
      'Listed game drives + 2 nights accommodation',
      'Meals as indicated + drinking water',
      'Government taxes & applicable fees'
    ],
    excludes: [
      'Travel insurance',
      'Tips & personal expenses',
      'Alcoholic beverages',
      'Optional activities'
    ],
    status: '2026 New Experience',
    rating: 5.0,
    reviewCount: 0,
    bookingLink: '/book/serengeti-safari-3days',
    featured: true,
    photos: generateTourPhotos('serengeti-3day')
  },

  // Mikumi National Park Day Safari from Zanzibar — newest package
  {
    id: 'mikumi-day-safari',
    name: 'Mikumi National Park Day Safari from Zanzibar',
    shortDescription: 'Real safari in one day — return flights, game drive, lunch and transfers, back at your hotel by evening',
    description: 'Fly from Zanzibar to Mikumi National Park for a full-day fly-in safari with a professional guide — lions, elephants, giraffes and more — and return to your hotel the same day.',
    fullDescription: `Experience a real African safari in just one day.

Fly from Zanzibar to Mikumi National Park, explore its spectacular wildlife with a professional safari guide, and return to your Zanzibar hotel the same day. Approx. 04:00 AM – 04:00 PM. Shared safari; return flights included.

YOUR SAFARI DAY
04:00 AM – Hotel Pickup and transfer to Zanzibar International Airport (time varies by hotel and flight schedule).

Flight Zanzibar to Mikumi — scenic flight; driver-guide waiting on arrival.

Mikumi Game Drive — pop-up-roof vehicle through open savannah: lions, elephants, giraffes, zebras, buffaloes, hippos, crocodiles, antelopes, monkeys, birds. Sightings vary; animals roam freely.

Lunch in Mikumi, Afternoon Game Drive, Return Flight to Zanzibar, hotel drop-off approx. 04:00 PM.

WHAT'S INCLUDED: round-trip flights, hotel transfers, park entrance fees, guided game drive, shared pop-up-roof vehicle, driver-guide, lunch, drinking water, taxes and fees, team assistance throughout.

NOT INCLUDED: personal expenses, tips, travel insurance.

PRICE PER PERSON
1–2 People: $450 per person
3 People: $430 per person
4+ People: $420 per person
From $450 per person. Shared safari — private option on request. Passport details required in advance for flights. Wildlife sightings cannot be guaranteed.`,
    price: 'From $450',
    priceNote: 'Per person',
    image: safari5,
    duration: 'Full Day (04:00–16:00)',
    groupSize: 'Shared Safari',
    category: 'safari',
    isDayTrip: true,
    location: 'Mikumi',
    tips: [
      {
        text: 'Have passport details ready in advance — required for the domestic flight booking.',
        image: safari5
      },
      {
        text: 'Expect a 04:00 AM pickup and 04:00 PM return; times follow the flight schedule.',
        image: safari1
      },
      {
        text: 'Animals roam freely — every game drive is different; trust your guide’s route.',
        image: safari3
      }
    ],
    highlights: [
      'Same-day fly-in safari from Zanzibar',
      'Return flights + hotel transfers',
      'Lions, elephants, giraffes & more',
      'Pop-up-roof vehicle + pro guide',
      'Lunch, water, park fees included'
    ],
    includes: [
      'Round-trip flights Zanzibar–Mikumi–Zanzibar',
      'Round-trip hotel transfers in Zanzibar',
      'Mikumi National Park entrance fees',
      'Guided safari game drive',
      'Shared pop-up-roof vehicle',
      'Professional safari driver-guide',
      'Lunch and drinking water',
      'Government taxes and applicable fees'
    ],
    excludes: [
      'Personal expenses',
      'Tips and gratuities',
      'Travel insurance'
    ],
    status: '2026 New Experience',
    rating: 5.0,
    reviewCount: 0,
    bookingLink: '/book/mikumi-day-safari',
    featured: true,
    photos: generateTourPhotos('mikumi-safari')
  },

  // Nyerere National Park (Selous) Day Safari from Zanzibar — newest package
  {
    id: 'nyerere-selous-day-safari',
    name: 'Nyerere National Park (Selous) Day Safari from Zanzibar',
    shortDescription: 'Real African safari in one day — return flights, game drive, lunch and transfers, back at your hotel by evening',
    description: 'Fly from Zanzibar to Nyerere National Park for a full-day fly-in safari with a professional guide — elephants, lions, giraffes, hippos and more — and return to your hotel the same day.',
    fullDescription: `Experience a real African safari in just one day.

Fly from Zanzibar to Nyerere National Park, explore one of Tanzania’s remarkable wildlife destinations with a professional safari guide, and return to your Zanzibar hotel the same day. Approx. 04:00 AM – 04:00 PM. Shared safari; return flights included.

YOUR SAFARI DAY
04:00 AM – Hotel Pickup & Airport Transfer (time varies by hotel and flight schedule).

Flight Zanzibar to Nyerere — scenic flight; driver-guide waiting on arrival.

Nyerere Game Drive — pop-up-roof vehicle through vast wilderness: elephants, lions, giraffes, buffaloes, hippos, crocodiles, zebras, antelopes, monkeys, birds. Sightings vary; animals roam freely.

Lunch in Nyerere, Afternoon Game Drive, Return Flight to Zanzibar, hotel drop-off approx. 04:00 PM.

WHAT'S INCLUDED: round-trip flights, hotel transfers, park entrance fees, guided game drive, shared pop-up-roof vehicle, driver-guide, lunch, drinking water, taxes and fees, team assistance throughout.

NOT INCLUDED: personal expenses, tips, travel insurance.

PRICE PER PERSON
1–2 People: $470 per person
3 People: $440 per person
4+ People: $430 per person
From $470 per person. Shared safari — private option on request. Passport details required in advance for flights. Wildlife sightings cannot be guaranteed.`,
    price: 'From $470',
    priceNote: 'Per person',
    image: safari1,
    duration: 'Full Day (04:00–16:00)',
    groupSize: 'Shared Safari',
    category: 'safari',
    isDayTrip: true,
    location: 'Nyerere (Selous)',
    tips: [
      {
        text: 'Have passport details ready in advance — required for the domestic flight booking.',
        image: safari1
      },
      {
        text: 'Expect a 04:00 AM pickup and 04:00 PM return; times follow the flight schedule.',
        image: safari3
      },
      {
        text: 'Animals roam freely — every game drive is different; trust your guide’s route.',
        image: safari2
      }
    ],
    highlights: [
      'Same-day fly-in safari from Zanzibar',
      'Return flights + hotel transfers',
      'Big game: elephants, lions, hippos',
      'Pop-up-roof vehicle + pro guide',
      'Lunch, water, park fees included'
    ],
    includes: [
      'Round-trip flights Zanzibar–Nyerere–Zanzibar',
      'Round-trip hotel transfers in Zanzibar',
      'Nyerere National Park entrance fees',
      'Guided safari game drive',
      'Shared pop-up-roof vehicle',
      'Professional safari driver-guide',
      'Lunch and drinking water',
      'Government taxes and applicable fees'
    ],
    excludes: [
      'Personal expenses',
      'Tips and gratuities',
      'Travel insurance'
    ],
    status: '2026 New Experience',
    rating: 5.0,
    reviewCount: 0,
    bookingLink: '/book/nyerere-selous-day-safari',
    featured: true,
    photos: generateTourPhotos('nyerere-safari')
  },

  // 5-Day Serengeti, Ngorongoro & Tarangire Safari from Zanzibar — newest package
  {
    id: 'serengeti-ngorongoro-tarangire-5days',
    name: '5-Day Serengeti, Ngorongoro & Tarangire Safari from Zanzibar',
    shortDescription: 'Serengeti plains, Ngorongoro Crater and Tarangire elephants — 5 days with flights, lodge stays and all meals',
    description: 'Tanzania’s three iconic safari destinations in one 5-day adventure from Zanzibar: Serengeti game drives, Ngorongoro Crater Big Five, Tarangire baobabs and elephants — with flights, 4x4 vehicle, accommodation, meals and all fees included.',
    fullDescription: `Experience Tanzania’s three iconic safari destinations on an unforgettable 5-day adventure from Zanzibar.

Fly to Arusha and journey through legendary Serengeti National Park, Ngorongoro Crater and Tarangire National Park — incredible wildlife, spectacular landscapes and private game drives.

YOUR ITINERARY
Day 1 – Zanzibar to Arusha to Serengeti: early flight, first game drive en route (lions, leopards, cheetahs, elephants and more), dinner and overnight in Serengeti.

Day 2 – Full-Day Serengeti Game Drive: predators, herds and possibly Great Migration movements; all meals, overnight Serengeti.

Day 3 – Serengeti to Karatu via Ngorongoro Conservation Area: scenery and sightings en route; dinner and overnight Karatu.

Day 4 – Ngorongoro Crater Safari: descend into the crater for lions, elephants, rhinos, hippos and birdlife; lunch on safari; return to Karatu.

Day 5 – Tarangire to Arusha to Zanzibar: baobabs and elephant herds, lunch, evening flight to Zanzibar and hotel transfer. End of safari.

WHAT'S INCLUDED: return flights, hotel pickup & drop-off, all mainland transfers, 4x4 with pop-up roof, professional driver-guide, all park/conservation/crater fees, 4 nights accommodation, meals as indicated, drinking water, all listed game drives, taxes and fees.

NOT INCLUDED: travel insurance, tips & personal expenses, alcohol, optional activities.

PRICE PER PERSON
2 Guests: $5,659 per person
4+ Guests: $5,407 per person
4+ Guests: $5,044 per person
From $5,044 per person. Final price depends on group size, season and availability — send your travel date, group size and hotel for a personalised quotation.`,
    price: 'From $5,044',
    priceNote: 'Per person',
    image: safari2,
    duration: '5 Days / 4 Nights',
    groupSize: 'Private Tour',
    category: 'safari',
    isDayTrip: false,
    location: 'Serengeti & Ngorongoro',
    tips: [
      {
        text: 'Pack layers — crater mornings are cool, midday game drives are hot and dusty.',
        image: safari2
      },
      {
        text: 'A camera with zoom makes the crater and Serengeti sightings unforgettable.',
        image: safari3
      },
      {
        text: 'Send your travel date, group size and hotel for an exact personalised quotation.',
        image: safari1
      }
    ],
    highlights: [
      'Full-day Serengeti game drives',
      'Ngorongoro Crater Big Five',
      'Tarangire elephants & baobabs',
      'Return flights from Zanzibar',
      '4 nights, all meals & park fees'
    ],
    includes: [
      'Flights Zanzibar–Arusha–Zanzibar',
      'Zanzibar hotel pickup & drop-off',
      'All mainland transfers',
      '4x4 safari vehicle with pop-up roof',
      'Professional safari driver-guide',
      'All park, conservation & crater fees',
      '4 nights accommodation',
      'Meals as indicated + drinking water',
      'All listed game drives, taxes & fees'
    ],
    excludes: [
      'Travel insurance',
      'Tips & personal expenses',
      'Alcoholic beverages',
      'Optional activities'
    ],
    status: '2026 New Experience',
    rating: 5.0,
    reviewCount: 0,
    bookingLink: '/book/serengeti-ngorongoro-tarangire-5days',
    featured: true,
    photos: generateTourPhotos('serengeti-safari')
  },

  // 3-Day Tarangire & Ngorongoro Safari from Zanzibar — newest package
  {
    id: 'tarangire-ngorongoro-safari-3days',
    name: '3-Day Tarangire & Ngorongoro Safari from Zanzibar',
    shortDescription: 'Tarangire elephants, Ngorongoro Crater Big Five, return flights, lodge stays and all meals — 3 days',
    description: 'Experience Tarangire National Park and the Ngorongoro Conservation Area with a crater game drive finale — return flights from Zanzibar, 4x4 safari vehicle, 2 nights at Chui Hidden Lodge and all meals included.',
    fullDescription: `Experience two of Tanzania’s most iconic wildlife destinations on an unforgettable 3-day safari from Zanzibar.

Fly from Zanzibar to Arusha and explore Tarangire National Park and the Ngorongoro Conservation Area, finishing with a spectacular game drive inside the world-famous Ngorongoro Crater.

YOUR ITINERARY
Day 1 – Zanzibar to Arusha to Tarangire: early flight, meet your driver-guide, game drive among baobabs and elephants (lions, giraffes, zebras, wildebeest, buffaloes and more), lunch on safari, dinner and overnight at Chui Hidden Lodge.

Day 2 – Ngorongoro Conservation Area: full-day exploration at a comfortable pace with breakfast, lunch and dinner back at the lodge.

Day 3 – Ngorongoro Crater to Arusha to Zanzibar: descend into the crater for lions, elephants, buffaloes, rhinos, hippos and birdlife; lunch on safari; evening flight to Zanzibar and hotel transfer. End of safari.

WHAT'S INCLUDED: return Zanzibar–Arusha flights, hotel pickup & drop-off, all mainland transfers, 4x4 with pop-up roof, professional driver-guide, all park/conservation/crater fees, 2 nights at Chui Hidden Lodge, meals as indicated, drinking water, taxes and fees.

NOT INCLUDED: travel insurance, tips & personal expenses, alcohol.

PRICE PER PERSON
2 Guests: $2,468 per person
3 Guests: $2,312 per person
4+ Guests: $2,220 per person
From $2,220 per person. Send your travel date, number of travelers and Zanzibar hotel to check availability — our team confirms your final price before booking. Includes flights, Tarangire, Ngorongoro, crater safari, lodge, meals and transfers.`,
    price: 'From $2,220',
    priceNote: 'Per person',
    image: safari3,
    duration: '3 Days / 2 Nights',
    groupSize: 'Private Tour',
    category: 'safari',
    isDayTrip: false,
    location: 'Tarangire & Ngorongoro',
    tips: [
      {
        text: 'Pack neutral-coloured clothing, binoculars and a camera with zoom for the crater day.',
        image: safari3
      },
      {
        text: 'Early starts maximise wildlife sightings — breakfasts are timed around game drives.',
        image: safari2
      },
      {
        text: 'Send your travel date, group size and hotel for an exact personalised quotation.',
        image: safari1
      }
    ],
    highlights: [
      'Tarangire elephants & baobabs',
      'Ngorongoro Crater Big Five drive',
      'Return flights from Zanzibar',
      '2 nights at Chui Hidden Lodge',
      '4x4 safari vehicle + all meals'
    ],
    includes: [
      'Return flights Zanzibar–Arusha–Zanzibar',
      'Zanzibar hotel pickup & drop-off',
      'All mainland transfers',
      '4x4 safari vehicle with pop-up roof',
      'Professional safari driver-guide',
      'All park, conservation & crater fees',
      '2 nights at Chui Hidden Lodge',
      'Meals as indicated + drinking water',
      'Government taxes & applicable fees'
    ],
    excludes: [
      'Travel insurance',
      'Tips & personal expenses',
      'Alcoholic beverages'
    ],
    status: '2026 New Experience',
    rating: 5.0,
    reviewCount: 0,
    bookingLink: '/book/tarangire-ngorongoro-safari-3days',
    featured: true,
    photos: generateTourPhotos('tarangire-ngorongoro')
  },

  // 8-Day Zanzibar & Mikumi Safari Experience — newest package
  {
    id: 'zanzibar-mikumi-safari-8days',
    name: '8-Day Zanzibar & Mikumi Safari Experience',
    shortDescription: 'Zanzibar beaches + ocean adventures + Mikumi safari with return flights — one private 8-day journey',
    description: 'Discover the best of Zanzibar and Tanzania in one private journey: turquoise waters, sandbanks and famous attractions, then fly to Mikumi National Park for a full-day wildlife safari. Everything arranged.',
    fullDescription: `Zanzibar Beaches + Ocean Adventures + African Safari.

Discover the best of Zanzibar and Tanzania in one unforgettable private journey. Spend your days exploring turquoise waters, tropical sandbanks and famous attractions — then fly directly to Mikumi National Park for an exciting African wildlife safari. One trip. Two incredible sides of Tanzania.

YOUR 8-DAY ITINERARY
Day 1 – Arrival in Zanzibar: airport pickup, hotel transfer, day at leisure.

Day 2 – Safari Blue & Kwale Island: dhow sailing in Menai Bay, snorkeling, lagoons, Kwale Island, seafood lunch.

Day 3 – Nakupenda Sandbank & Prison Island: white sand, swimming, snorkeling, seafood lunch, then giant Aldabra tortoises and island history.

Day 4 – Free Day & Kendwa Sunset Cruise: relax at your pace, then evening dhow sunset sail.

Day 5 – Fly to Mikumi National Park: early transfer, return flights, full-day 4x4 game drive (elephants, lions, giraffes, zebras, buffaloes, hippos, antelopes), lunch, fly back to Zanzibar. Flights, 4x4 vehicle, guide, park fees, lunch, water and transfers included.

Day 6 – Mnemba Snorkeling & Dolphin Spotting: early Matemwe departure, snorkeling, possible dolphin encounters, fruits and drinks.

Day 7 – Salaam Cave & Turtle Experience: swim with turtles in the Kizimkazi lagoon, photos and relaxation.

Day 8 – Departure: transfer to Zanzibar International Airport. Asante sana & karibu tena!

WHAT'S INCLUDED: airport transfers, private Zanzibar transport, English-speaking guides, private boats on selected tours, all excursions above, snorkeling equipment, entrance and government fees, meals and refreshments as specified, Mikumi return flights, park fees, game drive and safari guide. No hidden fees.

NOT INCLUDED: Zanzibar accommodation, international flights, travel insurance, visa fees, personal expenses, tips, alcohol.

PRICE: FROM $1,227 PER PERSON. Varies by group size, travel dates and availability. Accommodation not included — ask us for a complete package with your preferred Zanzibar hotel. Daily departures, year-round.`,
    price: 'From $1,227',
    priceNote: 'Per person',
    image: safariBg,
    duration: '8 Days / 7 Nights',
    groupSize: 'Private Tour',
    category: 'safari',
    isDayTrip: false,
    location: 'Zanzibar & Mikumi',
    tips: [
      {
        text: 'Pack light beachwear plus a warm layer for early safari mornings and ocean evenings.',
        image: safariBg
      },
      {
        text: 'Bring sunscreen, hat, sunglasses and a waterproof phone case for the ocean days.',
        image: mnemba
      },
      {
        text: 'Ask us to include your preferred Zanzibar hotel for one complete package price.',
        image: safari1
      }
    ],
    highlights: [
      'Safari Blue & Kwale Island sailing',
      'Nakupenda Sandbank & Prison Island',
      'Kendwa sunset dhow cruise',
      'Full-day Mikumi safari + return flights',
      'Mnemba snorkeling & Salaam Cave turtles'
    ],
    includes: [
      'Arrival & departure airport transfers',
      'Private air-conditioned Zanzibar transportation',
      'Professional English-speaking guides',
      'Private boats on selected excursions',
      'All excursions in the itinerary',
      'Snorkeling equipment, entrance & government fees',
      'Meals & refreshments as specified',
      'Mikumi return flights, park fees & game drive',
      'Professional safari guide — no hidden fees'
    ],
    excludes: [
      'Zanzibar accommodation (available on request)',
      'International flights',
      'Travel insurance & visa fees',
      'Personal expenses, tips & alcohol'
    ],
    status: '2026 New Experience',
    rating: 5.0,
    reviewCount: 0,
    bookingLink: '/book/zanzibar-mikumi-safari-8days',
    featured: true,
    photos: generateTourPhotos('zanzibar-mikumi')
  },

  // Kendwa Sunset Dhow Cruise (sharing) — newest package
  {
    id: 'kendwa-sunset-dhow-cruise',
    name: 'Kendwa Sunset Dhow Cruise',
    shortDescription: 'Sharing sunset sail aboard a traditional dhow — fruits, snacks, Swahili music and golden skies off Kendwa',
    description: 'End your day sailing across the Indian Ocean aboard a traditional wooden dhow — join other travelers for tropical fruits, refreshments, live Swahili music and spectacular sunset views off Kendwa and Nungwi.',
    fullDescription: `Experience a Beautiful Zanzibar Sunset.

Experience the beauty of a Zanzibar sunset while sailing across the Indian Ocean aboard a traditional wooden dhow. Join other travelers for a relaxing evening of dhow sailing, tropical fruits, refreshments, music and spectacular sunset views along the Kendwa and Nungwi coastline.

TOUR ITINERARY
03:30–04:30 PM – Hotel Pickup & Transfer to Kendwa Beach (time depends on hotel location and sunset time).

Traditional Dhow Boarding & Departure — meet the crew and set sail along the northern coastline.

Coastal Sailing, Tropical Fruits, Snacks & Refreshments, Live Swahili Music.

Sunset Experience — gold, orange, pink and purple skies over the Indian Ocean; crew assists with photos.

Return to Kendwa Beach and hotel drop-off.

PRICE (SHARING CRUISE — you join other travelers)
2 People: $130 total
3–4 People: $180 total
5–6 People: $220 total
7–12 People: $40 per person
13+ People: $35 per person
From $35 per person. Approx. 3–4 hours. Daily departures subject to weather and sea conditions. Advance booking recommended.`,
    price: 'From $35',
    priceNote: 'Per person',
    image: sunset1,
    duration: 'Approx. 3–4 Hours',
    groupSize: 'Sharing Cruise',
    category: 'daytrip',
    isDayTrip: true,
    location: 'Kendwa, Zanzibar',
    tips: [
      {
        text: 'Bring a light layer — the ocean breeze after sunset can feel cool on the dhow.',
        image: sunset1
      },
      {
        text: 'Keep your camera ready — the sky changes colour fast in the last 20 minutes.',
        image: sunset1
      },
      {
        text: 'Pickup time follows the sunset time and varies by season and hotel location.',
        image: beach4
      }
    ],
    highlights: [
      'Traditional dhow sailing at sunset',
      'Kendwa & Nungwi coastline views',
      'Live Swahili music onboard',
      'Fruits, snacks & soft drinks',
      'Sunset photography with crew help'
    ],
    includes: [
      'Hotel pickup and drop-off',
      'Sharing traditional dhow cruise',
      'Professional boat crew & licensed guide',
      'Fresh tropical fruits & local snacks',
      'Bottled water & soft drinks',
      'Live Swahili entertainment',
      'All applicable government fees and taxes'
    ],
    excludes: [
      'Personal expenses',
      'Alcoholic beverages (arranged on request, extra)',
      'Tips and gratuities',
      'Professional photography or drone services'
    ],
    status: '2026 New Experience',
    rating: 5.0,
    reviewCount: 0,
    bookingLink: '/book/kendwa-sunset-dhow-cruise',
    featured: true,
    photos: generateTourPhotos('kendwa-sunset')
  },

  // Stone Town & Spice Farm Private Tour — newest package
  {
    id: 'stone-town-spice-farm-tour',
    name: 'Stone Town & Spice Farm Private Tour',
    shortDescription: 'UNESCO Stone Town walking tour plus Spice Farm tasting — carved doors, history, spices and Swahili lunch',
    description: 'Step into the heart and soul of Zanzibar: historic Stone Town streets and carved doors, then a working Spice Farm to see, smell and taste the spices of the Spice Island, with traditional Swahili lunch.',
    fullDescription: `Discover the History, Culture & Flavours of Zanzibar in One Day.

Step into the heart and soul of Zanzibar on a private cultural journey combining the historic streets of Stone Town with the tropical aromas and flavours of a traditional Zanzibar Spice Farm.

YOUR EXPERIENCE
Stone Town UNESCO Walking Tour — narrow limestone streets, African/Arab/Indian/European heritage, Old Slave Market & Anglican Cathedral, Sultan’s Palace area, House of Wonders exterior, Forodhani Gardens, Old Fort, carved doors, traditional markets and alleys (route depends on access).

Zanzibar Spice Farm Experience — working plantation in the countryside: see, smell and taste cloves, cinnamon, nutmeg, vanilla, cardamom, pepper, lemongrass and coconut, with uses explained.

Fresh Coconut & Tropical Tasting, Traditional Swahili Lunch (spiced pilau rice, local dishes, vegetables, fruits, water), then return transfer to your hotel.

PRICE (PRIVATE TOUR)
2 People: $175 total
3–4 People: $220 total
5–6 People: $50 per person
7–12 People: $45 per person
13+ People: $40 per person
From $40 per person. Full day approx. 9:00 AM–4:30 PM. Daily, year-round. No hidden tour fees.`,
    price: 'From $40',
    priceNote: 'Per person',
    image: stone,
    duration: 'Full Day',
    groupSize: 'Private Tour',
    category: 'daytrip',
    isDayTrip: true,
    location: 'Stone Town, Zanzibar',
    tips: [
      {
        text: 'Wear comfortable shoes — a full day of walking Stone Town alleys and the spice plantation.',
        image: stone
      },
      {
        text: 'Come hungry — Swahili lunch, coconut and fruit tasting are all included.',
        image: spice
      },
      {
        text: 'Bring a camera for the carved doors, markets and colourful spice displays.',
        image: mnemba
      }
    ],
    highlights: [
      'UNESCO-listed Stone Town walking tour',
      'Authentic Zanzibar Spice Farm visit',
      'See, smell & taste fresh spices',
      'Traditional Swahili lunch included',
      'Carved doors, history & private transfers'
    ],
    includes: [
      'Private hotel pickup & drop-off',
      'Private air-conditioned transportation',
      'Professional licensed guide',
      'Stone Town guided walking tour & entrance fees',
      'Spice Farm entrance & guided experience',
      'Traditional Swahili lunch, fruit & spice tasting',
      'Fresh coconut & bottled water',
      'All applicable government fees — no hidden fees'
    ],
    excludes: [
      'Personal expenses',
      'Alcoholic beverages',
      'Tips & gratuities'
    ],
    status: '2026 New Experience',
    rating: 5.0,
    reviewCount: 0,
    bookingLink: '/book/stone-town-spice-farm-tour',
    featured: true,
    photos: generateTourPhotos('stone-spice')
  },

  // Stone Town & Prison Island Private Tour — newest package
  {
    id: 'stone-town-prison-island-tour',
    name: 'Stone Town & Prison Island Private Tour',
    shortDescription: 'UNESCO Stone Town walking tour plus Prison Island — giant tortoises, history, markets and ocean boat trip',
    description: 'Discover Zanzibar’s history, culture and island heritage: guided Stone Town exploration plus a boat journey to Prison Island to meet the giant Aldabra tortoises.',
    fullDescription: `Discover Zanzibar’s fascinating history, culture and island heritage in one memorable private experience.

This tour combines guided exploration of Stone Town, Zanzibar’s UNESCO World Heritage Site, with a boat journey to Prison Island (Changuu Island) — narrow historic streets, carved doors, markets and landmarks, then giant Aldabra tortoises across turquoise water.

TOUR ITINERARY
08:00 AM – Private Hotel Pickup and transfer to Stone Town.

Boat Trip to Prison Island — motorized boat from the waterfront (approx. 20–30 minutes) with coastal views.

Prison Island & Giant Tortoises — tortoise sanctuary with tortoises of all ages, plus historic buildings, quarantine-station history and Zanzibar heritage. Return boat to Stone Town.

Stone Town Walking Tour — narrow streets, old buildings, shops, homes and famous carved wooden doors with cultural storytelling.

Old Slave Market & Anglican Cathedral Area, Historical Landmarks (House of Wonders, Old Fort, Sultan’s Palace, Forodhani Gardens, Freddie Mercury House exterior, carved doors, waterfront — route depends on access), Darajani Market, Optional Swahili Lunch (extra unless arranged), then return transfer to your hotel.

PRICE (PRIVATE TOUR)
2 People: $251 total
3–4 People: $100 per person
5–6 People: $82 per person
7–12 People: $75 per person
13+ People: $70 per person
From $70 per person. Approx. 6–8 hours. Daily departures subject to weather, sea conditions and attraction opening hours. Lunch arranged on request at extra cost.`,
    price: 'From $70',
    priceNote: 'Per person',
    image: prison,
    duration: 'Approx. 6–8 Hours',
    groupSize: 'Private Tour',
    category: 'daytrip',
    isDayTrip: true,
    location: 'Stone Town, Zanzibar',
    tips: [
      {
        text: 'Wear comfortable walking shoes, hat and sunscreen — walking tour plus boat journey.',
        image: prison
      },
      {
        text: 'Dress respectfully for cultural and religious sites; carry a little cash for market purchases.',
        image: prison
      },
      {
        text: 'Museum access varies by day — your guide adjusts the route to opening conditions.',
        image: prison2
      }
    ],
    highlights: [
      'Stone Town UNESCO World Heritage Site',
      'Prison Island & giant Aldabra tortoises',
      'Scenic Indian Ocean boat trip',
      'Carved doors, markets & landmarks',
      'Slave Market history & Darajani Market'
    ],
    includes: [
      'Private hotel pickup and drop-off',
      'Private transportation',
      'Boat transfers to and from Prison Island',
      'Professional licensed guide',
      'Prison Island entrance fee & tortoise sanctuary',
      'Itinerary entrance fees, water & tropical fruits',
      'All applicable government fees'
    ],
    excludes: [
      'Lunch (arranged on request, extra cost)',
      'Personal expenses',
      'Tips and gratuities',
      'Alcoholic beverages',
      'Extra museum fees & drone services'
    ],
    status: '2026 New Experience',
    rating: 5.0,
    reviewCount: 0,
    bookingLink: '/book/stone-town-prison-island-tour',
    featured: true,
    photos: generateTourPhotos('stone-prison')
  },

  // Salaam Cave & Maalum Cave Private Tour (Kizimkazi & Paje) — newest package
  {
    id: 'salaam-cave-maalum-cave-tour',
    name: 'Salaam Cave & Maalum Cave Private Tour',
    shortDescription: 'Two caves in one day — turtle lagoon at Salaam Cave plus the limestone waters of Maalum Cave near Paje',
    description: 'Discover two unique Zanzibar cave experiences in one private day: Salaam Cave in Kizimkazi with its turtle lagoon, and Maalum Cave near Paje with clear natural waters, limestone formations and tropical vegetation.',
    fullDescription: `Discover two unique Zanzibar cave experiences in one unforgettable day.

This private tour combines Salaam Cave in Kizimkazi, known for its turtle swimming experience, with beautiful Maalum Cave near Paje, where you can swim and relax in clear natural waters surrounded by tropical vegetation and limestone formations.

TOUR ITINERARY
09:00 AM – Private Hotel Pickup in a clean, air-conditioned vehicle with your professional guide.

Salaam Cave – Turtle Experience — natural lagoon with sea turtles; observe and, where permitted, swim. Guide assists and helps capture photos. Follow staff instructions for safe, respectful turtle interaction.

Scenic Transfer to Paje — across to the East Coast through villages and tropical vegetation (possible fresh coconut stop).

Maalum Cave Experience — peaceful natural swimming area among limestone formations and lush vegetation; swim, relax and photograph.

Swimming & Relaxation, Fresh Tropical Fruits & Refreshments, then return to your hotel with your guide.

PRICE (PRIVATE TOUR)
2 People: $215 total
3–4 People: $284 total
5–6 People: $70 per person
7–12 People: $65 per person
13+ People: $60 per person
From $60 per person. Includes both entrance fees, private transportation, guide, fruits, water and fees. Lunch can be arranged on request at extra cost. For larger groups, contact us for a personalised quotation.`,
    price: 'From $60',
    priceNote: 'Per person',
    image: maa1,
    heroFilter: 'brightness(1.6) saturate(1.08)',
    duration: 'Approx. 6–7 Hours',
    groupSize: 'Private Tour',
    category: 'daytrip',
    isDayTrip: true,
    location: 'Kizimkazi, Zanzibar',
    tips: [
      {
        text: 'Bring swimwear, towel, sunscreen and a waterproof phone case — two swims in one day.',
        image: maa1
      },
      {
        text: 'Follow guide and staff instructions closely, especially around the turtles.',
        image: maa1
      },
      {
        text: 'Wear water-friendly footwear for the cave paths and limestone areas.',
        image: maa2
      }
    ],
    highlights: [
      'Salaam Cave turtle lagoon',
      'Maalum Cave limestone swim',
      'Two attractions in one day',
      'Scenic south-to-east island drive',
      'Fruits, coconut & photo opportunities'
    ],
    includes: [
      'Private hotel pickup and drop-off',
      'Private transportation',
      'Professional licensed guide',
      'Salaam Cave + Maalum Cave entrances',
      'Turtle experience at Salaam Cave',
      'Fresh tropical fruits, water & coconut where available',
      'All applicable government fees'
    ],
    excludes: [
      'Lunch (arranged on request, extra cost)',
      'Personal expenses',
      'Tips and gratuities',
      'Professional photography or drone services',
      'Alcoholic beverages'
    ],
    status: '2026 New Experience',
    rating: 5.0,
    reviewCount: 0,
    bookingLink: '/book/salaam-cave-maalum-cave-tour',
    featured: true,
    photos: generateTourPhotos('salaam-maalum')
  },

  // Jozani Forest & Salaam Cave Turtle Experience — newest package
  {
    id: 'jozani-forest-salaam-cave-turtles',
    name: 'Jozani Forest & Salaam Cave Turtle Experience',
    shortDescription: 'Red Colobus Monkeys in Jozani Forest, mangrove boardwalk, then swimming with sea turtles at Salaam Cave',
    description: 'Two of Zanzibar’s unique nature attractions in one private tour — walk Jozani Forest with a local guide in search of Red Colobus Monkeys and mangroves, then swim with sea turtles at Salaam Cave in Kizimkazi.',
    fullDescription: `Discover Zanzibar’s Wildlife, Forest & Natural Lagoon.

Experience two of Zanzibar’s unique nature attractions in one private tour combining the tropical beauty of Jozani Forest with the turquoise waters and sea turtles of Salaam Cave.

YOUR EXPERIENCE
Private Hotel Pickup — pickup from your hotel in a clean, comfortable air-conditioned vehicle toward Jozani Forest.

Jozani Forest Experience — guided walk through Jozani Chwaka Bay National Park to see the famous Zanzibar Red Colobus Monkeys and learn about the forest, wildlife and vegetation.

Mangrove Boardwalk — walk the wooden boardwalk through the mangrove ecosystem and learn how mangroves support Zanzibar’s environment and marine life.

Scenic Transfer to Kizimkazi — drive through villages and tropical countryside to Salaam Cave.

Salaam Cave Turtle Experience — enter the turquoise lagoon and swim alongside sea turtles, with time for photos and videos.

Tropical Fruits & Refreshments, then a comfortable private return transfer to your hotel.

PRICE (PRIVATE TOUR)
2 People: $191 total for both guests
3–4 People: $85 per person
5–6 People: $70 per person
7–12 People: $60 per person
Starting from $60 per person. Includes private transportation, both entrance fees, professional guide, tropical fruits and bottled water. For 12+ guests, contact us for a customised quotation. Wildlife sightings cannot be guaranteed.`,
    price: 'From $60',
    priceNote: 'Per person',
    image: jozani,
    duration: 'Approx. 6–7 Hours',
    groupSize: 'Private Tour',
    category: 'daytrip',
    isDayTrip: true,
    location: 'Jozani, Zanzibar',
    tips: [
      {
        text: 'Wear comfortable walking shoes for the forest and boardwalk, plus swimwear for the cave.',
        image: jozani
      },
      {
        text: 'Bring a waterproof phone case and camera — monkeys, mangroves and turtles in one day.',
        image: sal1
      },
      {
        text: 'Respect the animals and their environment; sightings follow conservation guidelines.',
        image: mnemba5
      }
    ],
    highlights: [
      'Red Colobus Monkeys in Jozani Forest',
      'Guided tropical forest walk',
      'Mangrove boardwalk ecosystem',
      'Swimming with sea turtles at Salaam Cave',
      'Natural lagoon + wildlife photography'
    ],
    includes: [
      'Private hotel pickup & drop-off',
      'Private air-conditioned transportation',
      'Professional local guide',
      'Jozani Forest entrance fee & guided walk',
      'Mangrove boardwalk visit',
      'Salaam Cave entrance fee & turtle swim',
      'Fresh tropical fruits & bottled water',
      'Applicable government fees'
    ],
    excludes: [
      'Lunch',
      'Personal expenses',
      'Tips and gratuities',
      'Personal travel insurance'
    ],
    status: '2026 New Experience',
    rating: 5.0,
    reviewCount: 0,
    bookingLink: '/book/jozani-forest-salaam-cave-turtles',
    featured: true,
    photos: generateTourPhotos('jozani-salaam')
  },

  // Swim with Sea Turtles at Salaam Cave (Kizimkazi) — newest package
  {
    id: 'swim-sea-turtles-salaam-cave',
    name: 'Swim with Sea Turtles at Salaam Cave',
    shortDescription: 'Swim alongside sea turtles in the turquoise lagoon of Salaam Cave, Kizimkazi — private trip with transfers',
    description: 'Discover Salaam Cave, a beautiful natural lagoon in Kizimkazi where you can swim alongside sea turtles in clear turquoise water, with private hotel transfers, entrance fees and a professional guide included.',
    fullDescription: `A Unique Turtle Swimming Experience in Kizimkazi, Zanzibar.

Discover Salaam Cave, a beautiful natural lagoon in Kizimkazi where you can swim alongside sea turtles in clear turquoise water. Enjoy an unforgettable experience surrounded by natural rock formations and tropical scenery, with plenty of time to swim, observe the turtles and capture beautiful photos and videos.

YOUR EXPERIENCE
Private Hotel Pickup — pickup directly from your hotel in a clean, comfortable air-conditioned vehicle with a scenic drive through villages and countryside toward southern Zanzibar.

Arrival at Salaam Cave — your guide assists with entrance arrangements and gives a short introduction before you enter the lagoon.

Swim with the Sea Turtles — enter the clear turquoise water and swim alongside the turtles, observing them at close range with plenty of time to relax and capture photos and videos.

Time for Photos & Relaxation — no rushing; enjoy the lagoon surroundings at a comfortable private pace.

Private Return Transfer — comfortable journey back to your hotel.

PRICE (PRIVATE TOUR)
1 Person: $175 total
2 People: $95 per person
3–4 People: $75 per person
5–6 People: $60 per person
7–12 People: $50 per person
13+ People: $45 per person
Starting from only $45 per person. Includes private transportation, entrance fees, guide and hotel pickup & drop-off. Prices may vary by hotel location — exact total always confirmed before booking.

GOOD TO KNOW: approx. 3–4 hours including transfers depending on hotel location. Guests should be comfortable entering the water; children under adult supervision. Pickup across Zanzibar; combinable with Jozani Forest, Maalum Cave, Mtende Beach or The Rock Restaurant on request.`,
    price: 'From $45',
    priceNote: 'Per person',
    image: sal2,
    duration: 'Approx. 5–7 Hours',
    groupSize: 'Private Tour',
    category: 'daytrip',
    isDayTrip: true,
    location: 'Kizimkazi, Zanzibar',
    tips: [
      {
        text: 'Bring swimwear, sunscreen and a waterproof phone case or camera for turtle photos.',
        image: sal2
      },
      {
        text: 'Children are welcome but must stay under adult supervision in the water.',
        image: beach1
      },
      {
        text: 'Ask us about combining Salaam Cave with Jozani Forest, Maalum Cave or Mtende Beach.',
        image: mnemba5
      }
    ],
    highlights: [
      'Swim with sea turtles',
      'Natural turquoise lagoon & rock formations',
      'Amazing above & below water photos',
      'Scenic southern Zanzibar drive',
      'Private hotel transfers + guide'
    ],
    includes: [
      'Private hotel pickup & drop-off',
      'Private air-conditioned transportation',
      'Salaam Cave entrance fees',
      'Professional guide',
      'Turtle swimming experience',
      'Bottled mineral water',
      'All applicable government fees'
    ],
    excludes: [
      'Lunch and additional food',
      'Personal expenses',
      'Tips and gratuities',
      'Personal travel insurance'
    ],
    status: '2026 New Experience',
    rating: 5.0,
    reviewCount: 0,
    bookingLink: '/book/swim-sea-turtles-salaam-cave',
    featured: true,
    photos: generateTourPhotos('salaam-cave')
  },

  // Private Safari Blue Experience (Menai Bay) — newest package
  {
    id: 'private-safari-blue-experience',
    name: 'Private Safari Blue Experience',
    shortDescription: 'Iconic full-day ocean adventure — dhow sailing, sandbank, snorkeling, Kwale Island and seafood BBQ in Menai Bay',
    description: 'Discover one of Zanzibar’s most iconic sea adventures: a full-day private trip through Menai Bay Conservation Area with traditional dhow sailing, snorkeling, sandbank, Kwale Island, mangrove lagoon and famous seafood barbecue.',
    fullDescription: `Discover one of Zanzibar’s most iconic sea adventures with ZanStone Tours & Safaris.

Safari Blue is a full-day ocean experience through the beautiful Menai Bay Conservation Area, combining traditional dhow sailing, snorkeling, swimming, sandbanks, tropical islands and Zanzibar’s famous seafood barbecue.

TOUR ITINERARY
07:30–08:30 AM – Hotel Pickup & Transfer to Fumba Village, the main departure point (exact time depends on hotel location).

Traditional Dhow Sailing — meet your guide and crew, board a traditional wooden dhow and sail across Menai Bay.

Sandbank Swimming & Relaxation — first stop at a natural sandbank: swimming, sunbathing, photos, fruits and refreshments.

Snorkeling in Menai Bay — explore tropical marine life with provided equipment and guide assistance.

Kwale Island & Seafood BBQ — relax in natural shade and enjoy lobster, prawns, calamari, octopus, fresh fish, rice, local dishes, tropical fruits, water and soft drinks (selection varies seasonally).

Ancient Baobab Tree — visit Kwale’s famous landmark with free time to explore and photograph.

Natural Lagoon & Mangrove Experience — swim in the lagoon surrounded by mangroves (tide dependent).

Return Sailing to Fumba and hotel drop-off.

PRICE (PRIVATE TOUR)
2 People: $250 total
3–4 People: $90 per person
5–6 People: $75 per person
7–12 People: $65 per person
13+ People: $60 per person
From $60 per person. Full day approx. 7:30 AM–5:00 PM. Daily departures subject to weather and sea conditions — itinerary may vary with tides. Advance booking recommended.`,
    price: 'From $60',
    priceNote: 'Per person',
    image: blue1,
    duration: 'Full Day',
    groupSize: 'Private Tour',
    category: 'daytrip',
    isDayTrip: true,
    location: 'Menai Bay, Zanzibar',
    tips: [
      {
        text: 'Bring swimwear, sunscreen, sunglasses and a waterproof camera — it is a full ocean day.',
        image: blue1
      },
      {
        text: 'Eat a light breakfast — a big seafood BBQ lunch awaits on Kwale Island.',
        image: blue2
      },
      {
        text: 'Sandbank and lagoon visits depend on tides — trust the crew’s order of activities.',
        image: blue3
      }
    ],
    highlights: [
      'Traditional dhow sailing in Menai Bay',
      'Sandbank swimming & relaxation',
      'Snorkeling among fish & coral',
      'Kwale Island + seafood BBQ with lobster',
      'Mangrove lagoon & ancient baobab tree'
    ],
    includes: [
      'Hotel pickup and drop-off',
      'Traditional dhow boat trip',
      'Professional licensed guide',
      'Seafood BBQ lunch (lobster subject to availability)',
      'Fresh tropical fruits, bottled water & soft drinks',
      'Snorkeling equipment',
      'Marine conservation & government fees'
    ],
    excludes: [
      'Personal expenses',
      'Alcoholic beverages',
      'Tips and gratuities',
      'Professional photography or drone services'
    ],
    status: '2026 New Experience',
    rating: 5.0,
    reviewCount: 0,
    bookingLink: '/book/private-safari-blue-experience',
    featured: true,
    photos: generateTourPhotos('safari-blue')
  },

  // Private Pungume Sandbank & Snorkeling Experience (Kizimkazi) — newest package
  {
    id: 'private-pungume-sandbank-snorkeling',
    name: 'Private Pungume Sandbank & Snorkeling Experience',
    shortDescription: 'Southern Zanzibar escape — private boat, snorkeling, Pungume Sandbank and seafood BBQ from Kizimkazi',
    description: 'Escape to the beautiful waters of southern Zanzibar for a private day at Pungume Sandbank — scenic boat journey, snorkeling, swimming, white-sand relaxation and a freshly prepared seafood BBQ.',
    fullDescription: `Discover Southern Zanzibar Away from the Crowds.

Escape to the beautiful waters of southern Zanzibar for a private day at Pungume Sandbank, combining a scenic boat journey, snorkeling, swimming, white-sand relaxation and a freshly prepared seafood BBQ. Departing from the Kizimkazi area, your private boat takes you across turquoise waters toward Pungume, a peaceful sandbank surrounded by beautiful tropical scenery.

YOUR EXPERIENCE
Private Hotel Pickup — pickup directly from your hotel in a clean, comfortable air-conditioned vehicle; travel through villages and countryside toward Kizimkazi. Exact pickup time confirmed by hotel location and sea conditions.

Private Boat Journey to Pungume — meet your guide and experienced captain in Kizimkazi and cruise across southern waters.

Snorkeling Experience — stop at a suitable spot and enter clear water with provided equipment and guide assistance (location varies with visibility, tides, currents and sea conditions).

Pungume Sandbank — white sand surrounded by turquoise water: swimming, relaxing, snorkeling, photos, walking the sandbank, at your own comfortable pace.

SEAFOOD BBQ LUNCH — fresh Zanzibar-style seafood BBQ: lobster, prawns, calamari, fresh fish, local accompaniments, tropical fruits, water and soft drinks (depending on seasonal availability). Tell us beforehand about any food allergies.

More Time to Swim & Relax, then return by boat to Kizimkazi and a comfortable private transfer to your hotel.

PRICE (PRIVATE TOUR)
2 People: $250 total ($125 per person)
3–4 People: $100 per person
5–6 People: $85 per person
7–12 People: $70 per person
13+ People: $60 per person
Starting from $60 per person. Includes transfers, private boat, snorkeling equipment, guide, seafood BBQ, fruits, drinks and applicable fees. A supplement may apply for distant hotels — confirmed before booking.`,
    price: 'From $60',
    priceNote: 'Per person',
    image: pung1,
    duration: 'Approx. 7–8 Hours',
    groupSize: 'Private Tour',
    category: 'daytrip',
    isDayTrip: true,
    location: 'Kizimkazi, Zanzibar',
    tips: [
      {
        text: 'Bring swimwear, sunscreen, hat, sunglasses and a waterproof phone case for the full ocean day.',
        image: pung1
      },
      {
        text: 'Tell us beforehand about any food allergies — lunch is a freshly prepared seafood BBQ.',
        image: blue1
      },
      {
        text: 'Pickup time is confirmed by your hotel location and the day’s sea conditions.',
        image: blue2
      }
    ],
    highlights: [
      'Private Pungume Sandbank escape',
      'Snorkeling in clear tropical waters',
      'Fresh seafood BBQ lunch',
      'Private boat with captain & guide',
      'Swimming, relaxation & photo stops'
    ],
    includes: [
      'Private hotel pickup & drop-off',
      'Private air-conditioned transportation',
      'Private boat with experienced captain',
      'Professional local guide',
      'Snorkeling equipment',
      'Seafood BBQ lunch, tropical fruits, water & soft drinks',
      'Applicable government and marine fees'
    ],
    excludes: [
      'Alcoholic beverages',
      'Personal expenses',
      'Tips and gratuities',
      'Personal travel insurance'
    ],
    status: '2026 New Experience',
    rating: 5.0,
    reviewCount: 0,
    bookingLink: '/book/private-pungume-sandbank-snorkeling',
    featured: true,
    photos: generateTourPhotos('pungume-sandbank')
  },

  // Private Nyange Sandbank Experience (Stone Town) — newest package
  {
    id: 'private-nyange-sandbank-experience',
    name: 'Private Nyange Sandbank Experience',
    shortDescription: 'Hidden sandbank escape — white sand, turquoise water, private boat, snorkeling and seafood BBQ with lobster',
    description: 'Escape to Nyange Sandbank, also known as Small Nakupenda — a peaceful private day of swimming, snorkeling, relaxing beneath your sunshade and a freshly prepared Zanzibar seafood BBQ with lobster, prawns, calamari and fresh fish.',
    fullDescription: `Escape to one of Zanzibar’s beautiful hidden sandbanks with ZanStone Tours & Safaris.

Nyange Sandbank, also known as Small Nakupenda or Nakupenda Bis, is a stunning white-sand escape surrounded by the turquoise waters of the Indian Ocean. Perfect for couples, families, friends and private groups looking for a peaceful day on the ocean.

TOUR ITINERARY
07:30–08:30 AM – Private Hotel Pickup in a clean, air-conditioned vehicle (exact time depends on your hotel location and ocean tides).

Private Boat Trip to Nyange Sandbank — meet your guide in Stone Town and cruise across turquoise waters as the white sandbank appears on the horizon.

Sandbank Relaxation & Swimming — swim, walk the white sand or relax; our team prepares a private shaded relaxation area with refreshments.

Zanzibar Seafood BBQ Lunch served on the sandbank: lobster, prawns, calamari, fresh fish, local accompaniments, seasonal tropical fruits, bottled water and soft drinks (seafood selection may vary with seasonal availability).

Photography & Free Time — more swimming, relaxing and photos; your guide can assist with pictures on your phone or camera.

Return to Your Hotel — private boat back to Stone Town and comfortable transfer.

PRICE (PRIVATE TOUR)
2 People: $230 total for both guests
3–4 People: $280 total group price
5–6 People: $65 per person
7–12 People: $60 per person
13+ People: $55 per person
From $55 per person. Daily departures subject to weather, tides and sea conditions — departure times may be adjusted for the best experience. Advance booking recommended.`,
    price: 'From $55',
    priceNote: 'Per person',
    image: nakupenda3,
    duration: 'Approx. 6–7 Hours',
    groupSize: 'Private Tour',
    category: 'daytrip',
    isDayTrip: true,
    location: 'Stone Town, Zanzibar',
    tips: [
      {
        text: 'Pickup time depends on the ocean tides — we confirm the best departure time for your date.',
        image: nakupenda3
      },
      {
        text: 'Bring swimwear, sunscreen, snorkel gear if you like, and a waterproof phone case.',
        image: beach3
      },
      {
        text: 'Tell us beforehand about dietary requirements — lunch is a freshly prepared seafood BBQ.',
        image: blue2
      }
    ],
    highlights: [
      'Private Nyange hidden sandbank',
      'Private boat charter from Stone Town',
      'Seafood BBQ — lobster, prawns, calamari',
      'Swimming & snorkeling in clear water',
      'Private shaded area + photo assistance'
    ],
    includes: [
      'Private hotel pickup and drop-off',
      'Private boat',
      'Professional licensed guide',
      'Seafood BBQ lunch (lobster subject to availability)',
      'Fresh tropical fruits, bottled water & soft drinks',
      'Private sunshade on the sandbank',
      'All applicable government fees'
    ],
    excludes: [
      'Personal expenses',
      'Tips and gratuities',
      'Professional camera or drone photography',
      'Alcoholic beverages'
    ],
    status: '2026 New Experience',
    rating: 5.0,
    reviewCount: 0,
    bookingLink: '/book/private-nyange-sandbank-experience',
    featured: true,
    photos: generateTourPhotos('nyange-sandbank')
  },

  // Nakupenda Sandbank Experience (Stone Town) — newest package
  {
    id: 'nakupenda-sandbank-experience',
    name: 'Nakupenda Sandbank Experience',
    shortDescription: 'Private sandbank escape — white sand, turquoise water, private boat, shaded relaxation area and seafood BBQ with lobster',
    description: 'Escape to one of Zanzibar’s most famous tropical sandbanks. Swim in warm crystal-clear waters, relax beneath your private sunshade and enjoy a freshly prepared Zanzibar seafood BBQ with lobster, prawns, calamari and fresh fish.',
    fullDescription: `Escape to one of Zanzibar’s most famous tropical sandbanks with ZanStone Tours & Safaris.

Nakupenda Sandbank is a beautiful white-sand paradise surrounded by the turquoise waters of the Indian Ocean, just off the coast of Stone Town. Perfect for couples, families, friends and private groups looking for a relaxing day surrounded by clear water, white sand and beautiful ocean scenery.

TOUR ITINERARY
07:30–08:30 AM – Private Hotel Pickup in a clean, air-conditioned vehicle (exact time depends on your hotel location and ocean tides).

Private Boat Trip to Nakupenda Sandbank — meet your guide in Stone Town and cruise across turquoise waters toward the white sand surrounded completely by blue ocean.

Sandbank Relaxation & Swimming — swim, walk the white sand or relax; our team prepares a private shaded relaxation area with refreshments.

ZANZIBAR SEAFOOD BBQ LUNCH served on the sandbank: lobster, prawns, calamari, fresh fish, local accompaniments, seasonal tropical fruits, bottled water and soft drinks (seafood selection may vary with seasonal availability).

Photography & Free Time — more swimming, relaxing and photos; your guide can assist with pictures on your phone or camera.

Return to Your Hotel — private boat back to Stone Town and comfortable transfer. Approximate finish 2:00–3:00 PM (varies with tides, sea conditions and hotel location).

PRICE (PRIVATE TOUR)
2 People: $230 total for both guests
3–4 People: $280 total group price
5–6 People: $65 per person
7–12 People: $60 per person
13+ People: $55 per person
From $55 per person. Daily departures subject to weather, tides and sea conditions — departure times may be adjusted for the best experience. Advance booking recommended.`,
    price: 'From $55',
    priceNote: 'Per person',
    image: nakupenda1,
    duration: 'Approx. 6–7 Hours',
    groupSize: 'Private Tour',
    category: 'daytrip',
    isDayTrip: true,
    location: 'Stone Town, Zanzibar',
    tips: [
      {
        text: 'Pickup time depends on the ocean tides — we confirm the best departure time for your date.',
        image: nakupenda1
      },
      {
        text: 'Bring swimwear, sunscreen, sunglasses and a waterproof phone case for the sandbank.',
        image: beach4
      },
      {
        text: 'Tell us beforehand about dietary requirements — lunch is a freshly prepared seafood BBQ.',
        image: nakupenda2
      }
    ],
    highlights: [
      'Nakupenda Sandbank white-sand escape',
      'Private boat charter from Stone Town',
      'Swimming in crystal-clear water',
      'Seafood BBQ — lobster, prawns, calamari',
      'Private shaded relaxation area + photo assistance'
    ],
    includes: [
      'Private hotel pickup and drop-off',
      'Private air-conditioned transportation',
      'Private boat charter',
      'Professional local guide',
      'Seafood BBQ lunch (lobster subject to availability)',
      'Prawns, calamari and fresh fish',
      'Fresh tropical fruits, bottled water & soft drinks',
      'Private sunshade on the sandbank',
      'Applicable government and local fees'
    ],
    excludes: [
      'Personal expenses',
      'Tips and gratuities',
      'Professional camera or drone photography',
      'Alcoholic beverages',
      'Personal travel insurance'
    ],
    status: '2026 New Experience',
    rating: 5.0,
    reviewCount: 0,
    bookingLink: '/book/nakupenda-sandbank-experience',
    featured: true,
    photos: generateTourPhotos('nakupenda-sandbank')
  },

  // Nakupenda Sandbank & Prison Island Private Tour (Stone Town) — newest package
  {
    id: 'nakupenda-prison-island-private-tour',
    name: 'Nakupenda Sandbank & Prison Island Private Tour',
    shortDescription: 'Giant tortoises, Prison Island history, Nakupenda Sandbank swimming and fresh seafood BBQ — private full-day trip',
    description: 'Discover the beauty, history and turquoise waters of Zanzibar on a private full-day adventure combining Nakupenda Sandbank and Prison Island — tortoises, snorkeling, white sand and a freshly prepared seafood lunch.',
    fullDescription: `Two of Zanzibar's Most Iconic Experiences in One Day.

Discover the beauty, history and turquoise waters of Zanzibar on a private full-day adventure combining Nakupenda Sandbank and Prison Island. Meet the famous giant Aldabra tortoises, discover the history of Prison Island, swim and snorkel in crystal-clear waters, then relax on a beautiful white-sand bank while enjoying a freshly prepared Zanzibar seafood lunch.

YOUR EXPERIENCE
Prison Island & Giant Tortoises — scenic boat ride from Stone Town to historic Prison Island (Changuu Island). Meet the giant Aldabra tortoises, some over a century old — see them up close, take photos and learn the island's fascinating history from your guide.

Nakupenda Sandbank — continue by boat to the spectacular white-sand bank surrounded by turquoise water. Swimming, snorkeling, sunbathing, photography and relaxing on the sand.

Fresh Seafood Lunch on the Sandbank — Zanzibar-style seafood freshly prepared while you relax: lobster, prawns, fresh fish, calamari, local accompaniments, tropical fruits, soft drinks and water (depending on availability).

Return to Stone Town — boat back and a comfortable private transfer to your hotel. Everything arranged: transportation, boat, guide, entrance fees and lunch.

PRICE (PRIVATE TOUR)
2 People: $270 total for two
3–4 People: $116 per person
5–6 People: $88 per person
7–12 People: $80 per person
13+ People: $75 per person
Price per person depends on group size. Daily departures, year-round. Suitable for couples, families, friends and groups.`,
    price: 'From $75',
    priceNote: 'Per person',
    image: nakupenda,
    duration: 'Full Day',
    groupSize: 'Private Tour',
    category: 'daytrip',
    isDayTrip: true,
    location: 'Stone Town, Zanzibar',
    tips: [
      {
        text: 'Bring swimwear, sunscreen and a camera — you will swim, snorkel and meet the giant tortoises.',
        image: nakupenda
      },
      {
        text: 'Go early in the day for the calmest water and the most beautiful sandbank photos.',
        image: nakupenda2
      },
      {
        text: 'Wear comfortable sandals — you will step from boat to sand and walk the historic island.',
        image: prison
      }
    ],
    highlights: [
      'Meet the giant Aldabra tortoises',
      'Relax on Nakupenda Sandbank',
      'Swim & snorkel in clear waters',
      'Fresh seafood BBQ on the sand',
      'Prison Island history + private boat trip'
    ],
    includes: [
      'Private hotel pickup & drop-off',
      'Private air-conditioned vehicle',
      'Boat transfers',
      'Professional local guide',
      'Prison Island entrance fees',
      'Nakupenda Sandbank experience',
      'Seafood lunch, tropical fruits, water & soft drinks',
      'Snorkeling equipment',
      'All applicable government fees — no hidden fees'
    ],
    excludes: [
      'Personal expenses',
      'Alcoholic beverages',
      'Tips & gratuities'
    ],
    status: '2026 New Experience',
    rating: 5.0,
    reviewCount: 0,
    bookingLink: '/book/nakupenda-prison-island-private-tour',
    featured: true,
    photos: generateTourPhotos('nakupenda-prison-private')
  },

  // Mnemba Island Snorkeling Experience (Matemwe/Muyuni) — newest package
  {
    id: 'mnemba-island-snorkeling-experience',
    name: 'Mnemba Island Snorkeling Experience',
    shortDescription: 'Dolphin spotting, snorkeling around Mnemba Atoll, swimming and a fresh seafood lunch — private trip from Matemwe',
    description: 'Experience one of Zanzibar’s most popular ocean adventures with a private trip to the beautiful waters surrounding Mnemba Atoll — dolphin spotting, snorkeling, swimming, tropical fruits and a fresh seafood lunch, with private hotel transfers included.',
    fullDescription: `Discover Zanzibar’s Turquoise Waters & Marine Life.

Experience one of Zanzibar’s most popular ocean adventures with a private trip to the beautiful waters surrounding Mnemba Atoll. Your experience combines dolphin spotting, snorkeling, swimming, tropical fruits and a fresh seafood lunch, with private transportation from your hotel and an experienced local team taking care of the arrangements.

Depart early from the Matemwe/Muyuni area and explore the clear waters surrounding Mnemba, where you can snorkel among colorful tropical fish and coral before relaxing and enjoying your Zanzibar-style seafood lunch.

YOUR EXPERIENCE
Private Hotel Pickup — pickup directly from your hotel in a clean, comfortable air-conditioned vehicle; early morning departure recommended. Your exact pickup time is confirmed according to your hotel location.

Boat Journey Toward Mnemba — meet your professional local guide and experienced boat captain at the beach, then cruise across turquoise waters toward Mnemba Atoll.

Dolphin Spotting — your captain will look for wild dolphins while respecting their movement and natural behavior. Please note: dolphins are wild animals, so sightings cannot be guaranteed.

Snorkeling Around Mnemba Atoll — snorkel in clear water among colorful tropical fish and coral formations with guide assistance; life jackets available. The exact spot may vary with visibility, currents, tides and sea conditions.

Swimming & Relaxation — extra time to swim, relax on the boat and take photos.

SEAFOOD LUNCH — freshly prepared Zanzibar-style seafood meal (prawns, calamari, fresh fish, local accompaniments, tropical fruits, water and soft drinks depending on seasonal availability). Tell us beforehand about any food allergies or dietary requirements.

Private Return Transfer — boat back to the departure beach and a comfortable private drive to your hotel.

PRICING
2 People: $225 Total (for both guests)
3–4 People: $280 Total (group price)
5–6 People: $70 Per Person
7–12 People: $65 Per Person
Starting from $65 per person. Price includes transportation, boat excursion, snorkeling equipment, guide, seafood lunch, tropical fruits, refreshments and applicable fees. For 12+ guests, contact us for a customised quotation.

WHAT TO BRING: swimwear, towel, sunscreen, sunglasses, hat, comfortable beachwear, waterproof phone case and a change of clothes.

Marine activities are subject to weather, tides and sea conditions and may be adjusted or rescheduled for safety. Dolphins and other marine animals are wild, therefore sightings cannot be guaranteed.`,
    price: 'From $65',
    priceNote: 'Per person',
    image: mnemba,
    duration: 'Approx. 6–7 Hours',
    groupSize: 'Private Tour',
    category: 'daytrip',
    isDayTrip: true,
    location: 'Matemwe, Zanzibar',
    tips: [
      {
        text: 'Depart early in the morning for calmer seas, better visibility and more time on the ocean.',
        image: mnemba
      },
      {
        text: 'Tell us before the tour about any food allergies — lunch is freshly prepared seafood.',
        image: beach1
      },
      {
        text: 'Bring a waterproof phone case and sunscreen — you will spend most of the day on the water.',
        image: mnemba1
      }
    ],
    highlights: [
      'Dolphin spotting in the wild',
      'Snorkeling around Mnemba Atoll',
      'Tropical marine life & coral',
      'Swimming in turquoise waters',
      'Fresh seafood lunch + tropical fruits'
    ],
    includes: [
      'Private hotel pickup & drop-off',
      'Private air-conditioned transportation',
      'Boat excursion with experienced captain',
      'Professional local guide',
      'Snorkeling equipment & life jackets',
      'Dolphin spotting opportunity',
      'Mnemba snorkeling experience',
      'Seafood lunch, fresh tropical fruits, water & soft drinks',
      'Applicable marine and government fees'
    ],
    excludes: [
      'Personal expenses',
      'Alcoholic beverages',
      'Tips and gratuities',
      'Personal travel insurance',
      'Services not specifically mentioned as included'
    ],
    status: '2026 New Experience',
    rating: 5.0,
    reviewCount: 0,
    bookingLink: '/book/mnemba-island-snorkeling-experience',
    featured: true,
    photos: generateTourPhotos('mnemba-snorkeling')
  },

  // Clear Kayak, Drone, Jet Ski & Jet Car Experience (Kendwa) — newest package
  {
    id: 'clear-kayak-drone-jetski-jetcar',
    name: 'Clear Kayak, Drone, Jet Ski & Jet Car Experience',
    shortDescription: 'Build your ultimate Zanzibar beach day — transparent kayak, Jet Ski, Jet Car and a professional drone shoot in Kendwa',
    description: 'Combine beautiful Zanzibar scenery, exciting watersports and professional aerial content in one unforgettable experience in Kendwa. Choose a single activity or combine your favourites into one complete package.',
    fullDescription: `Create Your Ultimate Zanzibar Beach Experience in Kendwa.

Combine beautiful Zanzibar scenery, exciting watersports and professional aerial content in one unforgettable experience. Enjoy a transparent Clear Kayak session, capture beautiful aerial photos and videos with a professional drone, ride across the ocean on a Jet Ski, or experience the unique Jet Car.

Choose a single experience or combine your favourite activities into one complete package. Whether you are travelling solo or as a couple, this experience gives you exciting moments on the water and memorable Zanzibar content to take home.

CHOOSE YOUR EXPERIENCE (total package price — same for 1 or 2 guests):

🌊 JET SKI — $65 TOTAL
An exciting Jet Ski ride across the waters of Kendwa/Nungwi with safety briefing, safety equipment and activity assistance.

🛶 CLEAR KAYAK + DRONE — $120 TOTAL
Transparent Clear Kayak session combined with a professional drone operator, aerial photography, drone video clips and digital media.

🌊🚁 JET SKI + DRONE — $150 TOTAL
Jet Ski experience plus professional aerial action photos, drone video clips and digital media.

🛶🚁🌊 CLEAR KAYAK + DRONE + JET SKI — $250 TOTAL
Clear Kayak content with professional drone photography and video, plus a Jet Ski ride.

🛶🚁🚤 CLEAR KAYAK + DRONE + JET CAR — $280 TOTAL
Clear Kayak drone session combined with a unique Jet Car experience.

⭐ COMPLETE EXPERIENCE — $350 TOTAL
Clear Kayak + Jet Ski + Jet Car + 30-minute professional drone photoshoot with aerial photographs, aerial video clips and digital media. Extra drone time available on request at an additional charge.

IMPORTANT PRICING INFORMATION
All prices are package prices, not per-person prices — the same whether you book for 1 guest or 2 guests. For groups of 3 or more guests, contact us for a customised group quotation.

Private hotel pickup and drop-off can be arranged from anywhere in Zanzibar — send us your hotel name and we will confirm the transfer price before booking.

WHAT TO BRING: swimwear, towel, sunscreen, sunglasses, comfortable beachwear, a change of clothes and a waterproof phone case. For the drone session, wear clothing that stands out clearly against the turquoise water.

Activities are subject to availability, weather and sea conditions and may be adjusted or rescheduled for safety. Drone photography is subject to suitable weather, wind and safe operating conditions.`,
    price: 'From $65',
    priceNote: 'Same price for 1 or 2 guests',
    image: kayaking,
    duration: 'Varies by Package',
    groupSize: '1-2 Guests',
    category: 'daytrip',
    isDayTrip: true,
    location: 'Kendwa, Zanzibar',
    tips: [
      {
        text: 'Wear bright clothing that stands out against the turquoise water for the best drone photos and videos.',
        image: kayaking
      },
      {
        text: 'Bring a waterproof phone case, sunscreen and a change of clothes — you will get in the water.',
        image: beach4
      },
      {
        text: 'Send us your hotel name when inquiring so we can confirm the private transfer price before booking.',
        image: pung1
      }
    ],
    highlights: [
      'Transparent Clear Kayak session on turquoise water',
      'Professional drone operator — aerial photos & video',
      'Jet Ski ride across the waters of Kendwa/Nungwi',
      'Unique Jet Car experience on the ocean',
      'Packages from $65 — same price for 1 or 2 guests'
    ],
    includes: [
      'Selected watersports activities per your package',
      'Clear Kayak equipment where applicable',
      'Jet Ski where applicable',
      'Jet Car where applicable',
      'Professional drone operator where applicable',
      'Digital photos and videos according to the selected package',
      'Safety equipment and professional activity briefing',
      'Local activity assistance',
      'Bottled mineral water'
    ],
    excludes: [
      'Hotel transportation unless specifically added',
      'Lunch',
      'Additional activity or drone shooting time',
      'Special media editing unless confirmed',
      'Personal expenses, tips and travel insurance'
    ],
    status: '2026 New Experience',
    rating: 5.0,
    reviewCount: 0,
    bookingLink: '/book/clear-kayak-drone-jetski-jetcar',
    featured: true,
    photos: generateTourPhotos('clear-kayak-drone')
  },

];

// Export helper functions
export const getDayTripById = (id) => {
  return dayTripsData.find(trip => trip.id === id);
};

export const getFeaturedDayTrips = (limit = 6) => {
  return dayTripsData.filter(trip => trip.featured).slice(0, limit);
};

// Interleave safari and Zanzibar packages so featured sections stay balanced
export const getMixedFeaturedDayTrips = (limit = 8) => {
  const featured = dayTripsData.filter(trip => trip.featured);
  const safaris = featured.filter(trip => trip.category === 'safari');
  const zanzibar = featured.filter(trip => trip.category !== 'safari');
  const mixed = [];
  let safariIndex = 0;
  let zanzibarIndex = 0;
  while (mixed.length < limit && (safariIndex < safaris.length || zanzibarIndex < zanzibar.length)) {
    if (zanzibarIndex < zanzibar.length) mixed.push(zanzibar[zanzibarIndex++]);
    if (mixed.length < limit && safariIndex < safaris.length) mixed.push(safaris[safariIndex++]);
  }
  return mixed;
};

// Hand-picked, most eye-catching packages for the home page showcase
// (alternating Zanzibar and safari so the grid looks vibrant)
const homeShowcaseIds = [
  'nakupenda-sandbank-experience',
  'serengeti-balloon-4days',
  'mnemba-island-snorkeling-experience',
  'nyerere-2day-boat-safari',
  'nakupenda-prison-island-private-tour',
  'serengeti-safari-3days',
  'kendwa-sunset-dhow-cruise',
  'mikumi-day-safari'
];

export const getHomeShowcaseDayTrips = (limit = 8) => {
  const showcase = homeShowcaseIds
    .map(id => dayTripsData.find(trip => trip.id === id))
    .filter(Boolean);
  if (showcase.length >= limit) return showcase.slice(0, limit);
  // Fall back to the balanced mix if fewer curated items are available
  const seen = new Set(showcase.map(trip => trip.id));
  for (const trip of getMixedFeaturedDayTrips(limit)) {
    if (showcase.length >= limit) break;
    if (!seen.has(trip.id)) {
      showcase.push(trip);
      seen.add(trip.id);
    }
  }
  return showcase;
};

export const getAllDayTrips = () => {
  return dayTripsData;
};

export const getDayTripsByLocation = (location) => {
  return dayTripsData.filter(trip => 
    trip.location.toLowerCase().includes(location.toLowerCase())
  );
};

export const getDayTripsByDuration = (isDayTrip) => {
  return dayTripsData.filter(trip => trip.isDayTrip === isDayTrip);
};

// Section helpers: safaris vs Zanzibar.
// A combined package (Zanzibar + mainland safari) belongs to BOTH sections.
export const isSafariPackage = (tour) => tour.category === 'safari';

export const isZanzibarPackage = (tour) =>
  tour.category !== 'safari' || /zanzibar/i.test(tour.location || '');

// Price-per-person tier data for the detail page price table.
// Bands are exactly as published for each package; unit is "Per Person" or "Total".
const priceTiersById = {
  'nyerere-2day-boat-safari': [
    { label: '2 Travellers', price: '$750', unit: 'Per Person' },
    { label: '3 Travellers', price: '$720', unit: 'Per Person' },
    { label: '4+ Travellers', price: '$700', unit: 'Per Person' }
  ],
  'serengeti-balloon-4days': [
    { label: '2 Guests', price: '$5,194', unit: 'Per Person' },
    { label: '3 Guests', price: '$4,705', unit: 'Per Person' },
    { label: '4+ Guests', price: '$4,694', unit: 'Per Person' }
  ],
  'ngorongoro-safari-2days': [
    { label: '2 Travellers', price: '$1,648', unit: 'Per Person' },
    { label: '3 Travellers', price: '$1,600', unit: 'Per Person' },
    { label: '4+ Travellers', price: '$1,513', unit: 'Per Person' }
  ],
  'serengeti-safari-3days': [
    { label: '2 Travellers', price: '$3,352', unit: 'Per Person' },
    { label: '3 Travellers', price: '$3,000', unit: 'Per Person' },
    { label: '4+ Travellers', price: '$2,996', unit: 'Per Person' }
  ],
  'mikumi-day-safari': [
    { label: '1–2 People', price: '$450', unit: 'Per Person' },
    { label: '3 People', price: '$430', unit: 'Per Person' },
    { label: '4+ People', price: '$420', unit: 'Per Person' }
  ],
  'nyerere-selous-day-safari': [
    { label: '1–2 People', price: '$470', unit: 'Per Person' },
    { label: '3 People', price: '$440', unit: 'Per Person' },
    { label: '4+ People', price: '$430', unit: 'Per Person' }
  ],
  'serengeti-ngorongoro-tarangire-5days': [
    { label: '2 Guests', price: '$5,659', unit: 'Per Person' },
    { label: '3 Guests', price: '$5,407', unit: 'Per Person' },
    { label: '4+ Guests', price: '$5,044', unit: 'Per Person' }
  ],
  'tarangire-ngorongoro-safari-3days': [
    { label: '2 Guests', price: '$2,468', unit: 'Per Person' },
    { label: '3 Guests', price: '$2,312', unit: 'Per Person' },
    { label: '4+ Guests', price: '$2,220', unit: 'Per Person' }
  ],
  'kendwa-sunset-dhow-cruise': [
    { label: '2 People', price: '$130', unit: 'Total' },
    { label: '3–4 People', price: '$180', unit: 'Total' },
    { label: '5–6 People', price: '$220', unit: 'Total' },
    { label: '7–12 People', price: '$40', unit: 'Per Person' },
    { label: '13+ People', price: '$35', unit: 'Per Person' }
  ],
  'stone-town-spice-farm-tour': [
    { label: '2 People', price: '$175', unit: 'Total' },
    { label: '3–4 People', price: '$220', unit: 'Total' },
    { label: '5–6 People', price: '$50', unit: 'Per Person' },
    { label: '7–12 People', price: '$45', unit: 'Per Person' },
    { label: '13+ People', price: '$40', unit: 'Per Person' }
  ],
  'stone-town-prison-island-tour': [
    { label: '2 People', price: '$251', unit: 'Total' },
    { label: '3–4 People', price: '$100', unit: 'Per Person' },
    { label: '5–6 People', price: '$82', unit: 'Per Person' },
    { label: '7–12 People', price: '$75', unit: 'Per Person' },
    { label: '13+ People', price: '$70', unit: 'Per Person' }
  ],
  'salaam-cave-maalum-cave-tour': [
    { label: '2 People', price: '$215', unit: 'Total' },
    { label: '3–4 People', price: '$284', unit: 'Total' },
    { label: '5–6 People', price: '$70', unit: 'Per Person' },
    { label: '7–12 People', price: '$65', unit: 'Per Person' },
    { label: '13+ People', price: '$60', unit: 'Per Person' }
  ],
  'jozani-forest-salaam-cave-turtles': [
    { label: '2 People', price: '$191', unit: 'Total' },
    { label: '3–4 People', price: '$85', unit: 'Per Person' },
    { label: '5–6 People', price: '$70', unit: 'Per Person' },
    { label: '7–12 People', price: '$60', unit: 'Per Person' }
  ],
  'swim-sea-turtles-salaam-cave': [
    { label: '1 Person', price: '$175', unit: 'Total' },
    { label: '2 People', price: '$95', unit: 'Per Person' },
    { label: '3–4 People', price: '$75', unit: 'Per Person' },
    { label: '5–6 People', price: '$60', unit: 'Per Person' },
    { label: '7–12 People', price: '$50', unit: 'Per Person' },
    { label: '13+ People', price: '$45', unit: 'Per Person' }
  ],
  'private-safari-blue-experience': [
    { label: '2 People', price: '$250', unit: 'Total' },
    { label: '3–4 People', price: '$90', unit: 'Per Person' },
    { label: '5–6 People', price: '$75', unit: 'Per Person' },
    { label: '7–12 People', price: '$65', unit: 'Per Person' },
    { label: '13+ People', price: '$60', unit: 'Per Person' }
  ],
  'private-pungume-sandbank-snorkeling': [
    { label: '2 People', price: '$250', unit: 'Total' },
    { label: '3–4 People', price: '$100', unit: 'Per Person' },
    { label: '5–6 People', price: '$85', unit: 'Per Person' },
    { label: '7–12 People', price: '$70', unit: 'Per Person' },
    { label: '13+ People', price: '$60', unit: 'Per Person' }
  ],
  'private-nyange-sandbank-experience': [
    { label: '2 People', price: '$230', unit: 'Total' },
    { label: '3–4 People', price: '$280', unit: 'Total' },
    { label: '5–6 People', price: '$65', unit: 'Per Person' },
    { label: '7–12 People', price: '$60', unit: 'Per Person' },
    { label: '13+ People', price: '$55', unit: 'Per Person' }
  ],
  'nakupenda-sandbank-experience': [
    { label: '2 People', price: '$230', unit: 'Total' },
    { label: '3–4 People', price: '$280', unit: 'Total' },
    { label: '5–6 People', price: '$65', unit: 'Per Person' },
    { label: '7–12 People', price: '$60', unit: 'Per Person' },
    { label: '13+ People', price: '$55', unit: 'Per Person' }
  ],
  'nakupenda-prison-island-private-tour': [
    { label: '2 People', price: '$270', unit: 'Total' },
    { label: '3–4 People', price: '$116', unit: 'Per Person' },
    { label: '5–6 People', price: '$88', unit: 'Per Person' },
    { label: '7–12 People', price: '$80', unit: 'Per Person' },
    { label: '13+ People', price: '$75', unit: 'Per Person' }
  ],
  'mnemba-island-snorkeling-experience': [
    { label: '2 People', price: '$225', unit: 'Total' },
    { label: '3–4 People', price: '$280', unit: 'Total' },
    { label: '5–6 People', price: '$70', unit: 'Per Person' },
    { label: '7–12 People', price: '$65', unit: 'Per Person' }
  ],
  'clear-kayak-drone-jetski-jetcar': [
    { label: 'Jet Ski', price: '$65', unit: 'Total' },
    { label: 'Clear Kayak + Drone', price: '$120', unit: 'Total' },
    { label: 'Jet Ski + Drone', price: '$150', unit: 'Total' },
    { label: 'Kayak + Drone + Jet Ski', price: '$250', unit: 'Total' },
    { label: 'Kayak + Drone + Jet Car', price: '$280', unit: 'Total' },
    { label: 'Complete Experience', price: '$350', unit: 'Total' }
  ]
};

export const getPriceTiersForTour = (tour) => {
  if (!tour) return [];
  const tiers = priceTiersById[tour.id];
  const list = tiers && tiers.length
    ? tiers
    : [{
        label: tour.groupSize || 'Per Person',
        price: typeof tour.price === 'string' ? tour.price.replace(/^From\s+/i, '') : (tour.price || 'Contact'),
        unit: 'Per Person'
      }];
  const toNumber = (value) => {
    const n = parseFloat(String(value).replace(/[^0-9.]/g, ''));
    return Number.isNaN(n) ? Infinity : n;
  };
  return [...list].sort((a, b) => toNumber(a.price) - toNumber(b.price));
};