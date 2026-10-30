// src/data/safarisData.js

import safari1 from "../src/assets/image/safari1.jpg";
import safari2 from "../src/assets/image/safari2.jpg";

export const safariCategories = [
  {
    id: 'northern',
    title: 'Northern Circuit',
    description: 'Explore Tanzania\'s famous northern safari destinations',
    image: safari1,
    featured: true
  },
  {
    id: 'southern',
    title: 'Southern Circuit',
    description: 'Less crowded parks with incredible wildlife viewing',
    image: safari2,
    featured: true
  }
];

export const allSafaris = {};

export const getSafariById = (id) => {
  for (const category in allSafaris) {
    const foundSafari = allSafaris[category].find(safari => safari.id === id);
    if (foundSafari) return foundSafari;
  }
  return null;
};