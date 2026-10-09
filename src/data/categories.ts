import { CategoryId } from '../types/bakery';

export interface CategoryInfo {
  id: CategoryId;
  name: string;
  tagline: string;
  description: string; // Polished, corrected marketing copy
  originalBrokenCopy?: string; // For QA comparison if user wants to audit
  startingPrice: number;
  highlight: string;
}

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'cakes',
    name: 'Celebration Cakes',
    tagline: 'Artisanal Handcrafted Cakes',
    description: 'Signature handcrafted celebration cakes, rich Belgian chocolate truffle layers, fresh fruit gateaux, and molten lava centerpieces made for your milestone moments.',
    startingPrice: 450,
    highlight: 'Pure Butter & Belgian Cocoa',
  },
  {
    id: 'cookies',
    name: 'Cookies',
    tagline: 'Freshly Baked Delights',
    description: 'Freshly baked cookies with delightful textures and flavours. Find your favourite treat for every craving.',
    originalBrokenCopy: 'These Cookies another fat, like vegetable',
    startingPrice: 160,
    highlight: 'Twice-Baked & Gourmet Butter',
  },
  {
    id: 'bread',
    name: 'Bread & Bakery',
    tagline: 'Artisanal Breads & Buns',
    description: 'Discover our range of bakery favourites, freshly prepared for your everyday cravings. Explore available varieties at your nearest branch.',
    originalBrokenCopy: 'These Bread add eggs, and then add flour',
    startingPrice: 85,
    highlight: 'Slow-Fermented & Daily Fresh',
  },
  {
    id: 'desserts',
    name: 'Desserts',
    tagline: 'Indulgent Pastries & Pots',
    description: 'Treat yourself to irresistible desserts, rich chocolate delights and sweet favourites made for every occasion.',
    originalBrokenCopy: 'These Desserts filled with Chocolate',
    startingPrice: 140,
    highlight: 'Warm Molten Lava & Fudgy Brownies',
  },
  {
    id: 'custom',
    name: 'Custom Theme Cakes',
    tagline: 'Bespoke Event Showstoppers',
    description: 'Custom celebration cakes crafted to your exact design, flavour, and theme with live pricing and local branch coordination.',
    startingPrice: 850,
    highlight: 'Photo Upload & 3D Sculpted Tiers',
  },
];
