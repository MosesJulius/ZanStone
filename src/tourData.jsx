// src/data/toursData.js

import zanz3 from "../src/assets/image/zanz3.jpg";
import spice from "../src/assets/image/spice/spice.jpg";
import stone2 from "../src/assets/image/stonetown/stonetown2.jpg";
import mnemba from "../src/assets/image/mnemba/mnemba.jpg";
import nakupenda from "../src/assets/image/nakupenda/nakupendasandbank.jpg";
import nakupenda2 from "../src/assets/image/nakupenda/nakupenda6.jpg";
import prison from "../src/assets/image/prison/prisonisland.jpg";
import rock from "../src/assets/image/rock/rock.jpg";
import sunset from "../src/assets/image/sunset/sunset.jpg"
import beach2 from "../src/assets/image/Folder1/beach.jpg"
import beach3 from "../src/assets/image/Folder1/beach2.jpg"
import beach4 from "../src/assets/image/Folder1/beach3.jpg"
import beach5 from "../src/assets/image/Folder1/beach4.jpg"
import car1 from "../src/assets/image/Folder1/car.jpg"
import car2 from "../src/assets/image/Folder1/car1.jpg"
import car3 from "../src/assets/image/Folder1/car2.jpg"
import car4 from "../src/assets/image/Folder1/car3.jpg"
import car6 from "../src/assets/image/Folder1/car6.jpg"
import farasi4 from "../src/assets/image/Folder1/farasi5.jpg"
import farasi5 from "../src/assets/image/Folder1/farasi6.jpg"
import farasi6 from "../src/assets/image/Folder1/farasi7.jpg"


export const tourCategories = [
    {
        id: "vip",
        title: "Special Packages Zanzibar",
        description:
            "Exclusive luxury experiences with private guides and premium services",
        image: mnemba,
        featured: true,
    },
    {
        id: "private",
        title: "Private ZanStone Tours",
        description:
            "Personalized tours tailored to your preferences with private transportation",
        image: stone2,
        featured: true,
    },
    {
        id: "sharing",
        title: "Sharing Trips",
        description:
            "Group tours for budget-conscious travelers with shared transportation",
        image: zanz3,
        featured: true,
    },
      {
        id: "optional",
        title: "Optional Activities",
        description:
            "Boost your Zanzibar experience with these popular activities",
        image: farasi4,
        featured: true,
    }, 
    {
        id: "transfer",
        title: "Transfer Price",
        description:
            "Your safety and luggage security are always our top priority",
        image: car6,
        featured: true,
    },
];

export const allTours = {};

export const getTourById = (id) => {
    for (const category in allTours) {
        const foundTour = allTours[category].find((tour) => tour.id === id);
        if (foundTour) return foundTour;
    }
    return null;
};
