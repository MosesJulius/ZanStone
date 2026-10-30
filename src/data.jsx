import zanz1 from '../src/assets/video/zanz1.mp4'; // Make sure this path and file exist
import zanz2 from '../src/assets/image/zanz2.jpg'; // Make sure this path and file exist
import zanz3 from '../src/assets/image/zanz3.jpg'; // Make sure this path
import member1 from '../src/assets/image/member1.png';
import lii from "../src/assets/image/Folder1/lii.jpg"
import member from '../src/assets/image/Folder1/member.jpg'
import member3 from '../src/assets/image/Folder1/member3.jpg'
import members from '../src/assets/image/user.jpg'

// Make sure this path and file exist


export const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Travel Blogger",
    content: "The Zanzibar spice tour was the highlight of our trip! Our guide was incredibly knowledgeable and made the experience unforgettable.",
    rating: 5,
    image: zanz3
  },
  // More testimonials...
];

export const videos = [
  {
    id: 1,
    title: "Zanzibar Beaches",
    thumbnail: zanz2,
    videoUrl: zanz1,
  },
  // More videos...
];

export const tourCategories = [
  {
    title: "Cultural Tours",
    count: 8,
    image: zanz2
  },
  // More categories...
];

export const teamMembers = [
  {
    name: "Ramadhani Rashid",
    role: "Founder & Guide",
    image: member,
    bio: "Born and raised in Stone Town, Ali knows every corner of Zanzibar"
  },
  {
    name: "Ally Said",
    role: "PhotoGrapher & Assistant",
    image: lii,
    bio: "Ensures every detail of your trip is perfectly arranged"
  },
  {
    name: "Pedro Maghali",
    role: "Operation Manager",
    image: member3,
    bio: "15 years of experience leading Tanzania safaris"
  },
  {
    name: "Aisha Kombo",
    role: "Customer Relations",
    image: members,
    bio: "Makes sure all your questions are answered before arrival"
  }
  // More team members...
];
export const missions = [
  {
    title: "Authenticity",
    description: "We showcase the real Zanzibar, not just tourist attractions"
  },
  {
    title: "Sustainability",
    description: "Our tours support local communities and protect the environment"
  },
  {
    title: "Excellence",
    description: "From guides to accommodations, we maintain the highest standards"
  }
];