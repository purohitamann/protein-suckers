import SwipeCards from '@/components/SwipeCards';

const mockMeals = [
  {
    id: 1,
    'food-item': 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c',
    'restaurant-logo': 'https://static.vecteezy.com/system/resources/previews/019/879/186/original/freshii-logo-freshii-icon-free-free-vector.jpg',
    restaurant: 'Freshii',
    item: 'Buddha Satay Bowl',
    summary: {
      protein: '24g',
      carbs: '45g',
      fat: '12g',
      calories: '380cal'
    },
    cost: '$15.99',
    maps: 'https://maps.app.goo.gl/freshii-burlington',
    'approx-distance': '0.5km',
    'ubereats-order-link': 'https://www.ubereats.com/store/freshii-burlington'
  },
  {
    id: 2,
    'food-item': 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',
    'restaurant-logo': 'https://copperbranch.ca/wp-content/uploads/2023/03/copper-branch-logo.png',
    restaurant: 'Copper Branch',
    item: 'Power Bowl',
    summary: {
      protein: '28g',
      carbs: '52g',
      fat: '14g',
      calories: '420cal'
    },
    cost: '$16.99',
    maps: 'https://maps.app.goo.gl/copper-branch-burlington',
    'approx-distance': '1.2km',
    'ubereats-order-link': 'https://www.ubereats.com/store/copper-branch-burlington'
  },
  {
    id: 3,
    'food-item': 'https://images.unsplash.com/photo-1540420773420-3366772f4999',
    'restaurant-logo': 'https://lettucelovecafe.com/wp-content/uploads/2022/01/lettuce-love-cafe-logo.png',
    restaurant: 'Lettuce Love Café',
    item: 'Quinoa Protein Bowl',
    summary: {
      protein: '22g',
      carbs: '48g',
      fat: '16g',
      calories: '410cal'
    },
    cost: '$17.99',
    maps: 'https://maps.app.goo.gl/lettucelove-burlington',
    'approx-distance': '0.8km',
    'ubereats-order-link': 'https://www.ubereats.com/store/lettuce-love-cafe'
  }
];

export default function CardPage() {
  return (
    <main className="min-h-screen p-4 bg-zinc-900 text-white">
      <div className='flex justify-center w-1/2 h-1/2 mx-auto oveerflow-hidden'>
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-black mb-2 bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text">
              PROTEIN SUCKER 💪
            </h1>
            <p className="text-zinc-400 text-sm md:text-base font-medium uppercase tracking-wider">
              Swipe Right to Get Huge 🔥
            </p>
          </div>
          <SwipeCards meals={mockMeals} />
        </div>
      </div>
    </main>
  );
}
