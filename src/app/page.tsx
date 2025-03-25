'use client';

import SwipeCards from "@/components/SwipeCards";
import GeolocationFetch from "@/components/GeolocationFetch";
import React, { useState, useEffect } from "react";

const gymDadJokes = [
  "Why did the gym close down? It just didn't work out! 💪",
  "What kind of exercise do lazy people do? Diddly-squats! 🏋️‍♂️",
  "Why don't eggs exercise? They're afraid of getting scrambled! 🥚",
  "What did the weight say to the other weight? Let's get ripped! 🏋️",
  "Why did the cookie go to the gym? Because it wanted to become a wafer! 🍪",
  "What do you call a bear doing squats? A bear-bell! 🐻",
];

export default function Home() {
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [currentJoke, setCurrentJoke] = useState(0);
  const [formData, setFormData] = useState({
    location: "",
    lat: "",
    long: "",
    diet: "Vegan",
    meal_type: "High Protein",
    budget: "20"
  });

  useEffect(() => {
    // Get user's location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setFormData(prev => ({
          ...prev,
          lat: position.coords.latitude.toFixed(4),
          long: position.coords.longitude.toFixed(4)
        }));
      },
      (error) => console.error("Error getting location:", error)
    );

    if (loading) {
      const jokeInterval = setInterval(() => {
        setCurrentJoke((prev) => (prev + 1) % gymDadJokes.length);
      }, 3000);
      return () => clearInterval(jokeInterval);
    }
  }, [loading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/nebius', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      setResponse(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-white dark:bg-zinc-900">
        <div className="text-center max-w-md">
          <div className="mb-6">
            <div className="animate-spin text-4xl mb-4">🏋️‍♂️</div>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">
              Loading Your Gains...
            </h2>
            <div className="h-20">
              <p className="text-zinc-600 dark:text-zinc-400 transition-opacity duration-300">
                {gymDadJokes[currentJoke]}
              </p>
            </div>
          </div>
          <div className="w-full bg-zinc-200 dark:bg-zinc-700 h-2 rounded-full overflow-hidden">
            <div className="h-full bg-zinc-900 dark:bg-white rounded-full animate-progress"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white dark:bg-zinc-900 p-4 md:p-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-black mb-2 text-zinc-900 dark:text-white">
          PROTEIN SUCKER 💪
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400 text-sm md:text-base font-medium uppercase tracking-wider">
          Find Your Protein Paradise 🔥
        </p>
      </div>

      <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-8 space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Location
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            placeholder="Enter your address"
            className="w-full px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Diet Preference
          </label>
          <select
            name="diet"
            value={formData.diet}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white"
          >
            <option value="Vegan">Vegan</option>
            <option value="Vegetarian">Vegetarian</option>
            <option value="Non-Vegetarian">Non-Vegetarian</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Meal Type
          </label>
          <select
            name="meal_type"
            value={formData.meal_type}
            onChange={handleInputChange}
            className="w-full px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white"
          >
            <option value="High Protein">High Protein</option>
            <option value="Low Carb">Low Carb</option>
            <option value="Post-Workout">Post-Workout</option>
            <option value="Breakfast">Breakfast</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Budget (in $)
          </label>
          <input
            type="number"
            name="budget"
            value={formData.budget}
            onChange={handleInputChange}
            min="1"
            className="w-full px-4 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 py-3 rounded-lg font-bold hover:opacity-90 transition-opacity"
        >
          FIND THOSE GAINS 💪
        </button>
      </form>

      {response && (
        <div className="flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto">
          <div className="w-full lg:w-1/2">
            <div className="flex justify-center">
              <div className="w-full max-w-md">
                <SwipeCards meals={response} />
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2 h-[600px] lg:h-auto">
            <GeolocationFetch />
          </div>
        </div>
      )}
    </main>
  );
}
