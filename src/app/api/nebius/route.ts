import OpenAI from 'openai';
import { NextResponse } from 'next/server';

const client = new OpenAI({
  baseURL: 'https://api.studio.nebius.com/v1/',
  apiKey: process.env.NEXT_PUBLIC_NEBIUS_API_KEY!,
});

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

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { location, lat, long, diet, meal_type, budget } = body;

    if (!lat || !long || !location) {
      return NextResponse.json(mockMeals);
    }

    const budgetValue = parseFloat(budget);
    if (isNaN(budgetValue) || budgetValue <= 0) {
      return NextResponse.json(mockMeals);
    }

    const userRequest = {
      location,
      lat,
      long,
      diet,
      meal_type,
      budget: budgetValue,
    };

    const response = await client.chat.completions.create({
      model: 'deepseek-ai/DeepSeek-R1',
      max_tokens: 8192,
      temperature: 0.6,
      top_p: 0.95,
      messages: [
        {
          role: 'system',
          content: `
          You are a fitness-focused AI nutrition assistant for a web app called "Protein Sucker."
          Your task is to help users discover high-protein meals from nearby restaurants based on these filters:
          
          1. User location (coordinates or address)
          2. Dietary preference (Vegan, Vegetarian, Non-Vegetarian)
          3. Meal type (High Protein, Low Carb, Post-Workout, Breakfast, etc.)
          4. Budget (in user's local currency)

          Your output must be a list of nearby restaurants (within 5km radius) with real menu items that match the criteria. Return exactly 5 options. For each item, return a detailed card including:
          - A unique \`id\`
          - High-quality \`food-item\` image URL from Unsplash or similar
          - \`restaurant-logo\` image URL
          - Restaurant name
          - Meal/item name
          - Nutritional breakdown (\`protein\`, \`carbs\`, \`fat\`, \`calories\`)
          - Price (must be under the user's budget)
          - Google Maps link to the restaurant
          - Approximate distance from user
          - Direct link to the same item on Uber Eats if available

          Return exactly 5 items, no more, no less. Format as a JSON array.
          `,
        },
        {
          role: 'user',
          content: JSON.stringify(userRequest),
        },
      ],
    });

    const content = response.choices[0].message.content;
    const sanitized = (content as string).replace(/<think>[\s\S]*?<\/think>/g, '').trim();

    let parsedJSON = null;
    try {
      parsedJSON = JSON.parse(sanitized);
    } catch (e) {
      console.warn('Failed to parse API response, using mock data');
      return NextResponse.json(mockMeals);
    }

    if (!parsedJSON || !Array.isArray(parsedJSON) || parsedJSON.length === 0) {
      console.warn('Invalid API response, using mock data');
      return NextResponse.json(mockMeals);
    }

    return NextResponse.json(parsedJSON);
  } catch (error) {
    console.error('Error calling API:', error);
    return NextResponse.json(mockMeals);
  }
}
