// 'use client';

// import React, { useState, useEffect } from "react";

// type Restaurant = {
//   id: number;
//   restaurant: string;
//   'approx-distance': string;
//   lat?: number;
//   long?: number;
// };

// type Props = {
//   restaurants: Restaurant[];
//   currentIndex: number;
//   userLocation: {
//     lat: string;
//     long: string;
//   };
// };

// const MapView: React.FC<Props> = ({ restaurants, currentIndex, userLocation }) => {
//   const [error, setError] = useState<string | null>(null);

//   const getGoogleMapSrc = () => {
//     if (!userLocation.lat || !userLocation.long) {
//       return `https://www.google.com/maps/embed/v1/view?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}&center=43.3675,-79.7990&zoom=13`;
//     }

//     const currentRestaurant = restaurants[currentIndex];
//     const center = currentRestaurant?.lat && currentRestaurant?.long
//       ? `${currentRestaurant.lat},${currentRestaurant.long}`
//       : `${userLocation.lat},${userLocation.long}`;

//     let mapUrl = `https://www.google.com/maps/embed/v1/view?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}`;
//     mapUrl += `&center=${center}`;
//     mapUrl += `&zoom=13`;
//     mapUrl += `&markers=color:red|${center}`; // Add marker for current restaurant

//     // Add markers for other restaurants
//     restaurants.forEach((restaurant, index) => {
//       if (index !== currentIndex && restaurant.lat && restaurant.long) {
//         mapUrl += `&markers=color:blue|${restaurant.lat},${restaurant.long}`;
//       }
//     });

//     return mapUrl;
//   };

//   if (error) {
//     return (
//       <div className="h-full flex items-center justify-center bg-zinc-800 rounded-3xl p-6">
//         <div className="text-center">
//           <p className="text-xl text-red-400 mb-2">MAP ERROR BRO! 😤</p>
//           <p className="text-zinc-400 text-sm">{error}</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="h-full bg-zinc-800 rounded-3xl overflow-hidden">
//       <div className="p-4 bg-zinc-900/50">
//         <h2 className="text-lg font-bold text-white">
//           PROTEIN SPOTS NEAR YOU 🗺️
//         </h2>
//         {restaurants[currentIndex] && (
//           <div className="text-xs text-zinc-400 mt-1">
//             <span className="inline-block">
//               📍 {restaurants[currentIndex].restaurant} - {restaurants[currentIndex]['approx-distance']}
//             </span>
//           </div>
//         )}
//       </div>
//       <div className="relative h-[calc(100%-4rem)]">
//         <iframe
//           title="Restaurant Map"
//           width="100%"
//           height="100%"
//           style={{ border: 0 }}
//           src={getGoogleMapSrc()}
//           allowFullScreen
//           className="rounded-b-2xl"
//         ></iframe>
//       </div>
//     </div>
//   );
// };

// export default MapView;
// src/components/MapView.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';

type Restaurant = {
  id: number;
  restaurant: string;
  'approx-distance': string;
  lat?: number;
  long?: number;
};

type Props = {
  restaurants: Restaurant[];
  currentIndex: number;
  userLocation: {
    lat: string;
    long: string;
  };
};

const MapView: React.FC<Props> = ({ restaurants, currentIndex, userLocation }) => {
  const [error, setError] = useState<string | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mapRef.current) {
      const map = new google.maps.Map(mapRef.current, {
        zoom: 13,
        center: {
          lat: parseFloat(userLocation.lat),
          lng: parseFloat(userLocation.long),
        },
      });

      // Add marker for the current restaurant
      const currentRestaurant = restaurants[currentIndex];
      if (currentRestaurant.lat && currentRestaurant.long) {
        new google.maps.Marker({
          position: { lat: currentRestaurant.lat, lng: currentRestaurant.long },
          map,
          title: currentRestaurant.restaurant,
        });
      }

      // Add markers for other restaurants
      restaurants.forEach((restaurant, index) => {
        if (index !== currentIndex && restaurant.lat && restaurant.long) {
          new google.maps.Marker({
            position: { lat: restaurant.lat, lng: restaurant.long },
            map,
            title: restaurant.restaurant,
          });
        }
      });
    }
  }, [currentIndex, restaurants, userLocation]);

  const getGoogleMapSrc = () => {
    if (!userLocation.lat || !userLocation.long) {
      return `https://www.google.com/maps/embed/v1/view?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}&center=43.3675,-79.7990&zoom=13`;
    }

    const currentRestaurant = restaurants[currentIndex];
    const center = currentRestaurant?.lat && currentRestaurant?.long
      ? `${currentRestaurant.lat},${currentRestaurant.long}`
      : `${userLocation.lat},${userLocation.long}`;

    return `https://www.google.com/maps/embed/v1/view?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}&center=${center}&zoom=13`;
  };

  if (error) {
    return (
      <div className="h-full flex items-center justify-center bg-zinc-800 rounded-3xl p-6">
        <div className="text-center">
          <p className="text-xl text-red-400 mb-2">MAP ERROR BRO! 😤</p>
          <p className="text-zinc-400 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-zinc-800 rounded-3xl overflow-hidden">
      <div className="p-4 bg-zinc-900/50">
        <h2 className="text-lg font-bold text-white">
          PROTEIN SPOTS NEAR YOU 🗺️
        </h2>
        {restaurants[currentIndex] && (
          <div className="text-xs text-zinc-400 mt-1">
            <span className="inline-block">
              📍 {restaurants[currentIndex].restaurant} - {restaurants[currentIndex]['approx-distance']}
            </span>
          </div>
        )}
      </div>
      <div className="relative h-[calc(100%-4rem)]" ref={mapRef}></div>
    </div>
  );
};

export default MapView;
