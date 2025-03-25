'use client';

import React, { useState, useRef, useEffect } from 'react';

type MealCard = {
  id: number;
  'food-item': string;
  'restaurant-logo': string;
  restaurant: string;
  item: string;
  summary: {
    protein: string;
    carbs: string;
    fat: string;
    calories: string;
  };
  cost: string;
  maps: string;
  'approx-distance': string;
  'ubereats-order-link': string;
};

type Props = {
  meals: MealCard[];
};

const defaultMeal: MealCard = {
  id: 0,
  'food-item': '',
  'restaurant-logo': '',
  restaurant: 'Restaurant Name',
  item: 'Meal Item',
  summary: {
    protein: '0g',
    carbs: '0g',
    fat: '0g',
    calories: '0cal'
  },
  cost: '$0.00',
  maps: '',
  'approx-distance': 'Unknown',
  'ubereats-order-link': '#'
};

const SwipeCards: React.FC<Props> = ({ meals = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lastDirection, setLastDirection] = useState<'left' | 'right' | null>(null);
  const [cardSize, setCardSize] = useState({ width: 300, height: 500 });
  const cardRef = useRef<HTMLDivElement>(null);
  const startX = useRef(0);
  const currentX = useRef(0);
  const isDragging = useRef(false);
  const [foodImageError, setFoodImageError] = useState(false);
  const [logoError, setLogoError] = useState(false);

  useEffect(() => {
    const updateCardSize = () => {
      const width = Math.min(window.innerWidth - 32, 450);
      const height = Math.min(window.innerHeight * 0.7, 600);
      setCardSize({ width, height });
    };

    updateCardSize();
    window.addEventListener('resize', updateCardSize);
    return () => window.removeEventListener('resize', updateCardSize);
  }, []);

  const handleStart = (clientX: number) => {
    isDragging.current = true;
    startX.current = clientX;
    if (cardRef.current) {
      cardRef.current.style.transition = 'none';
    }
  };

  const handleMove = (clientX: number) => {
    if (!isDragging.current) return;
    
    currentX.current = clientX - startX.current;
    if (cardRef.current) {
      const rotationFactor = 0.1 * (cardSize.width / 300);
      cardRef.current.style.transform = `translateX(${currentX.current}px) rotate(${currentX.current * rotationFactor}deg)`;
      
      const leftThumb = document.querySelector('.left-thumb') as HTMLElement;
      const rightThumb = document.querySelector('.right-thumb') as HTMLElement;
      if (leftThumb && rightThumb) {
        if (currentX.current < 0) {
          leftThumb.style.opacity = '0.8';
          rightThumb.style.opacity = '0.2';
        } else if (currentX.current > 0) {
          leftThumb.style.opacity = '0.2';
          rightThumb.style.opacity = '0.8';
        } else {
          leftThumb.style.opacity = '0.2';
          rightThumb.style.opacity = '0.2';
        }
      }
    }
  };

  const handleEnd = () => {
    isDragging.current = false;
    if (cardRef.current) {
      cardRef.current.style.transition = 'transform 0.3s ease';
      
      const threshold = cardSize.width * 0.4;
      if (Math.abs(currentX.current) > threshold) {
        const direction = currentX.current > 0 ? 'right' : 'left';
        cardRef.current.style.transform = `translateX(${direction === 'right' ? cardSize.width * 2 : -cardSize.width * 2}px)`;
        setLastDirection(direction);
        setTimeout(() => {
          setCurrentIndex(prev => prev + 1);
          if (cardRef.current) {
            cardRef.current.style.transform = 'none';
          }
        }, 300);
      } else {
        cardRef.current.style.transform = 'none';
      }
    }
    
    const leftThumb = document.querySelector('.left-thumb') as HTMLElement;
    const rightThumb = document.querySelector('.right-thumb') as HTMLElement;
    if (leftThumb && rightThumb) {
      leftThumb.style.opacity = '0.2';
      rightThumb.style.opacity = '0.2';
    }
  };

  const handleSwipe = (direction: 'left' | 'right') => {
    if (cardRef.current) {
      cardRef.current.style.transition = 'transform 0.3s ease';
      cardRef.current.style.transform = `translateX(${direction === 'right' ? cardSize.width * 2 : -cardSize.width * 2}px)`;
      setLastDirection(direction);
      setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
        if (cardRef.current) {
          cardRef.current.style.transform = 'none';
        }
      }, 300);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  };

  const generatePlaceholderBg = () => {
    const colors = ['bg-zinc-200', 'bg-zinc-300', 'bg-zinc-400'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  if (!meals || meals.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] md:min-h-[400px] bg-zinc-100 dark:bg-zinc-800 rounded-3xl p-8">
        <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">NO MEALS FOUND BRO! 😤</p>
        <p className="text-zinc-600 dark:text-zinc-400 mt-2">Try adjusting your search! 🔍</p>
      </div>
    );
  }

  if (currentIndex >= meals.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] md:min-h-[400px] bg-zinc-100 dark:bg-zinc-800 rounded-3xl p-8">
        <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">NO MORE MEALS BRO! 😤</p>
        <p className="text-zinc-600 dark:text-zinc-400 mt-2">Time to hit the gym! 🏋️‍♂️</p>
      </div>
    );
  }

  const currentMeal = { ...defaultMeal, ...meals[currentIndex] };

  return (
    <div className="flex flex-col items-center gap-6 mt-4 md:mt-8">
      <div 
        className="relative"
        style={{ width: cardSize.width, height: cardSize.height }}
      >
        <button 
          onClick={() => handleSwipe('left')}
          className="left-thumb absolute left-4 md:left-5 top-1/2 -translate-y-1/2 text-4xl md:text-5xl opacity-20 z-10 transition-opacity duration-200 hover:opacity-80 cursor-pointer"
        >
          👎
        </button>
        <button 
          onClick={() => handleSwipe('right')}
          className="right-thumb absolute right-4 md:right-5 top-1/2 -translate-y-1/2 text-4xl md:text-5xl opacity-20 z-10 transition-opacity duration-200 hover:opacity-80 cursor-pointer"
        >
          💪
        </button>
        
        <div
          ref={cardRef}
          className="absolute w-full h-full cursor-grab active:cursor-grabbing"
          onMouseDown={(e) => handleStart(e.clientX)}
          onMouseMove={(e) => handleMove(e.clientX)}
          onMouseUp={() => handleEnd()}
          onMouseLeave={() => handleEnd()}
          onTouchStart={(e) => handleStart(e.touches[0].clientX)}
          onTouchMove={(e) => handleMove(e.touches[0].clientX)}
          onTouchEnd={() => handleEnd()}
        >
          <div className="bg-white dark:bg-zinc-800 rounded-3xl shadow-xl p-4 h-full flex flex-col justify-between border border-zinc-200 dark:border-zinc-700">
            <div className="relative">
              {!currentMeal['food-item'] || foodImageError ? (
                <div className={`w-full h-32 md:h-40 lg:h-48 rounded-2xl mb-3 flex items-center justify-center ${generatePlaceholderBg()} dark:bg-zinc-700`}>
                  <div className="text-center p-4">
                    <span className="text-4xl mb-2">🍽️</span>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-2">{currentMeal.item}</p>
                  </div>
                </div>
              ) : (
                <img 
                  src={currentMeal['food-item']} 
                  alt={currentMeal.item} 
                  className="w-full h-32 md:h-40 lg:h-48 object-cover rounded-2xl mb-3 shadow-lg" 
                  onError={() => setFoodImageError(true)}
                />
              )}
              <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-semibold text-white">
                {currentMeal.cost}
              </div>
            </div>

            <div className="text-center">
              <h2 className="text-xl md:text-2xl font-bold text-zinc-900 dark:text-white">
                {currentMeal.item}
              </h2>
              <div className="flex items-center justify-center gap-2 mt-2">
                {!currentMeal['restaurant-logo'] || logoError ? (
                  <div className="h-8 w-8 md:h-10 md:w-10 flex items-center justify-center bg-zinc-200 dark:bg-zinc-700 rounded-full">
                    <span className="text-sm font-bold text-zinc-600 dark:text-zinc-300">
                      {getInitials(currentMeal.restaurant)}
                    </span>
                  </div>
                ) : (
                  <img 
                    src={currentMeal['restaurant-logo']} 
                    alt={currentMeal.restaurant}
                    className="h-8 md:h-10 object-contain opacity-70" 
                    onError={() => setLogoError(true)}
                  />
                )}
                <p className="text-zinc-600 dark:text-zinc-400">{currentMeal.restaurant}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 my-3">
              <div className="bg-zinc-100 dark:bg-zinc-900 rounded-xl p-2 text-center">
                <p className="text-xs text-zinc-500">PROTEIN</p>
                <p className="text-lg font-bold text-zinc-900 dark:text-white">{currentMeal.summary.protein}</p>
              </div>
              <div className="bg-zinc-100 dark:bg-zinc-900 rounded-xl p-2 text-center">
                <p className="text-xs text-zinc-500">CALORIES</p>
                <p className="text-lg font-bold text-zinc-900 dark:text-white">{currentMeal.summary.calories}</p>
              </div>
              <div className="bg-zinc-100 dark:bg-zinc-900 rounded-xl p-2 text-center">
                <p className="text-xs text-zinc-500">CARBS</p>
                <p className="text-lg font-bold text-zinc-900 dark:text-white">{currentMeal.summary.carbs}</p>
              </div>
              <div className="bg-zinc-100 dark:bg-zinc-900 rounded-xl p-2 text-center">
                <p className="text-xs text-zinc-500">FAT</p>
                <p className="text-lg font-bold text-zinc-900 dark:text-white">{currentMeal.summary.fat}</p>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-zinc-500 mb-3">
              <p>📍 {currentMeal['approx-distance']}</p>
            </div>

            <a
              href={currentMeal['ubereats-order-link']}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-sm font-bold py-3 px-4 rounded-xl hover:opacity-90 transition-opacity text-center uppercase tracking-wider shadow-lg"
            >
              GET THOSE GAINS 💪
            </a>
          </div>
        </div>
      </div>

      {lastDirection && (
        <div className="text-center mt-4">
          <p className="text-zinc-600 dark:text-zinc-400 font-medium">
            {lastDirection === 'right' ? '💪 HELL YEAH!' : '👎 NOT TODAY BRO'}
          </p>
        </div>
      )}
    </div>
  );
};

export default SwipeCards;
