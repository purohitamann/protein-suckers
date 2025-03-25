// 'use client';

// import SwipeCards from "@/components/SwipeCards";
// import React, { useEffect, useState } from "react";
// import GeolocationFetch from "@/components/GeolocationFetch";
// const gymDadJokes = [
//   "Why did the gym close down? It just didn't work out! 💪",
//   "What kind of exercise do lazy people do? Diddly-squats! 🏋️‍♂️",
//   "Why don't eggs exercise? They're afraid of getting scrambled! 🥚",
//   "What did the weight say to the other weight? Let's get ripped! 🏋️",
//   "Why did the cookie go to the gym? Because it wanted to become a wafer! 🍪",
//   "What do you call a bear doing squats? A bear-bell! 🐻",
//   "Why did the gym rat bring a ladder to the gym? For climbing sets! 📈",
//   "What's a bodybuilder's favorite type of fish? Mussel! 🐟",
//   "Why don't biceps tell jokes? They might crack up! 💪",
//   "What do you call a protein shake in prison? A barbell! 🥤"
// ];

// const Page = () => {
//   const [response, setResponse] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   const [currentJoke, setCurrentJoke] = useState(0);

//   useEffect(() => {
//     const fetchData = async () => {
//       const res = await fetch('/api/nebius', {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       const data = await res.json();
//       setResponse(data);
//       setLoading(false);
//     };

//     fetchData();

//     // Rotate through jokes every 3 seconds while loading
//     const jokeInterval = setInterval(() => {
//       setCurrentJoke((prev) => (prev + 1) % gymDadJokes.length);
//     }, 3000);

//     return () => clearInterval(jokeInterval);
//   }, []);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-white dark:bg-zinc-900">
//         <div className="text-center max-w-md">
//           <div className="mb-6">
//             <div className="animate-spin text-4xl mb-4">🏋️‍♂️</div>
//             <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">
//               Loading Your Gains...
//             </h2>
//             <div className="h-20"> {/* Fixed height to prevent layout shift */}
//               <p className="text-zinc-600 dark:text-zinc-400 transition-opacity duration-300">
//                 {gymDadJokes[currentJoke]}
//               </p>
//             </div>
//           </div>
//           <div className="w-full bg-zinc-200 dark:bg-zinc-700 h-2 rounded-full overflow-hidden">
//             <div className="h-full bg-zinc-900 dark:bg-white rounded-full animate-progress"></div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 bg-white dark:bg-zinc-900 min-h-screen">


//         {/* <pre className="text-zinc-900 dark:text-white overflow-auto">
//           {JSON.stringify(response, null, 2)}
//         </pre> */}
        
//         {/* <SwipeCards meals={response} /> */}
//         <div className="flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto">
//         {/* Left Side - SwipeCards */}
//         <div className="w-full lg:w-1/2">
//           <div className="flex justify-center">
//             <div className="w-full max-w-md">
//               <SwipeCards meals={response} />
//             </div>
//           </div>
//         </div>

//         {/* Right Side - Map */}
//         <div className="w-full lg:w-1/2 h-[600px] lg:h-auto">
//           <GeolocationFetch />
//         </div>
//       </div>
  
//     </div>
//   );
// };

// export default Page;
'use client';

import SwipeCards from "@/components/SwipeCards";
import React, { useEffect, useState } from "react";
import GeolocationFetch from "@/components/GeolocationFetch";

const gymDadJokes = [
  "Why did the gym close down? It just didn't work out! 💪",
  "What kind of exercise do lazy people do? Diddly-squats! 🏋️‍♂️",
  "Why don't eggs exercise? They're afraid of getting scrambled! 🥚",
  "What did the weight say to the other weight? Let's get ripped! 🏋️",
  "Why did the cookie go to the gym? Because it wanted to become a wafer! 🍪",
  "What do you call a bear doing squats? A bear-bell! 🐻",
  "Why did the gym rat bring a ladder to the gym? For climbing sets! 📈",
  "What's a bodybuilder's favorite type of fish? Mussel! 🐟",
  "Why don't biceps tell jokes? They might crack up! 💪",
  "What do you call a protein shake in prison? A barbell! 🥤"
];

const Page = () => {
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [currentJoke, setCurrentJoke] = useState(0);

  // ✅ Define search parameters (customize as needed)
  const queryParams = {
    location: encodeURIComponent("4055 Forest Run Avenue, Burlington, Canada"),
    lat: "43.3675",
    long: "-79.7990",
    diet: "Vegan",
    meal_type: "High Protein",
    budget: "20",
  };

  // ✅ Construct the query string dynamically
  const queryString = Object.entries(queryParams)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/nebius/?${queryString}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!res.ok) {
          throw new Error(`API request failed with status ${res.status}`);
        }

        const data = await res.json();
        setResponse(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // ✅ Rotate through jokes every 3 seconds while loading
    const jokeInterval = setInterval(() => {
      setCurrentJoke((prev) => (prev + 1) % gymDadJokes.length);
    }, 3000);

    return () => clearInterval(jokeInterval);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-white dark:bg-zinc-900">
        <div className="text-center max-w-md">
          <div className="mb-6">
            <div className="animate-spin text-4xl mb-4">🏋️‍♂️</div>
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">
              Loading Your Gains...
            </h2>
            <div className="h-20"> {/* Fixed height to prevent layout shift */}
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
    <div className="p-6 bg-white dark:bg-zinc-900 min-h-screen">
      <div className="flex flex-col lg:flex-row gap-6 max-w-7xl mx-auto">
        {/* Left Side - SwipeCards */}
        <div className="w-full lg:w-1/2">
          <div className="flex justify-center">
            <div className="w-full max-w-md">
              <SwipeCards meals={response} />
            </div>
          </div>
        </div>

        {/* Right Side - Map */}
        <div className="w-full lg:w-1/2 h-[600px] lg:h-auto">
          <GeolocationFetch />
        </div>
      </div>
    </div>
  );
};

export default Page;
