'use client';
import React, { useState, useEffect } from "react";

const LocationFetcher: React.FC = () => {
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      setIsLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCoordinates({ lat: latitude, lng: longitude });
        setError(null);
        setIsLoading(false);
      },
      (err) => {
        setError("Unable to retrieve your location.");
        setIsLoading(false);
        console.error(err);
      }
    );
  }, []);

  const getGoogleMapSrc = (lat: number, lng: number) => {
    return `https://www.google.com/maps/embed/v1/view?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}&center=${lat},${lng}&zoom=15&maptype=roadmap`;
  };

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center bg-zinc-800 rounded-3xl">
        <div className="text-center">
          <div className="animate-pulse text-4xl mb-4">💪</div>
          <p className="text-zinc-400">Finding your gains zone...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full flex items-center justify-center bg-zinc-800 rounded-3xl p-6">
        <div className="text-center">
          <p className="text-xl text-red-400 mb-2">LOCATION ERROR BRO! 😤</p>
          <p className="text-zinc-400 text-sm">{error}</p>
          <p className="text-zinc-500 text-sm mt-4">Enable location to find protein near you!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-zinc-800 rounded-3xl overflow-hidden">
      {coordinates && (
        <>
          <div className="p-4 bg-zinc-900/50">
            <h2 className="text-lg font-bold bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text">
              YOUR GAINS ZONE 🗺️
            </h2>
            <div className="text-xs text-zinc-400 mt-1">
              <span className="inline-block">
                📍 {coordinates.lat.toFixed(5)}, {coordinates.lng.toFixed(5)}
              </span>
            </div>
          </div>
          <div className="relative h-[calc(100%-4rem)]">
            <iframe
              title="Google Map"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              src={getGoogleMapSrc(coordinates.lat, coordinates.lng)}
              allowFullScreen
              className="rounded-b-2xl"
            ></iframe>
          </div>
        </>
      )}
    </div>
  );
};

export default LocationFetcher;
