'use client';

import { useRef, useEffect } from 'react';
import React from 'react';

const menuCategories = [
  {
    id: 'food',
    title: 'Food',
    image: 'https://images.pexels.com/photos/2092897/pexels-photo-2092897.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Mexican street food with a twist'
  },
  {
    id: 'drinks',
    title: 'Drinks',
    image: 'https://images.pexels.com/photos/452737/pexels-photo-452737.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: 'Craft cocktails & mezcal specialties'
  },
  {   
    id: 'specials',
    title: 'Specials',
    image: 'https://images.pexels.com/photos/3019019/pexels-photo-3019019.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    description: '$5 Sunday margaritas & more'
  }
];

const menuItems = [
  { name: 'Drinks', description: 'Handmade tortillas, fresh fillings, and bold flavors.' },
  { name: 'Food', description: 'Creative, Mexican-inspired drinks and classics.' },
];

const FeaturedMenu = () => {
  return (
    <section id="menu" className="py-20 bg-black text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold mb-10 text-center glitch-text">Our Menu</h2>
        <div className="grid md:grid-cols-4 gap-8">
          {menuItems.map((item) => (
            <div key={item.name} className="bg-twisted-black/80 rounded-lg p-6 shadow-lg hover:shadow-twisted-neon/40 transition-shadow border border-twisted-neon/30">
              <h3 className="text-2xl font-bold mb-2 cyber-text text-twisted-neon">{item.name}</h3>
              <p className="text-base mb-4">{item.description}</p>
              <button className="cyber-button-sm px-4 py-2 font-bold text-sm mt-2">See More</button>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <button className="cyber-button px-8 py-3 font-bold">View Full Menu</button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedMenu;