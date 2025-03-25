// // route.ts
// import OpenAI from 'openai';
// import { NextResponse } from 'next/server';

// const client = new OpenAI({
//   baseURL: 'https://api.studio.nebius.com/v1/',
//   apiKey: process.env.NEXT_PUBLIC_NEBIUS_API_KEY!,
// });

// export async function GET() {
//   try {
//  const  response = await client.chat.completions.create({
//     "model": "deepseek-ai/DeepSeek-R1",
//     "max_tokens": 8192,
//     "temperature": 0.6,
//     "top_p": 0.95,
//     "messages": [
//         {
//             "role": "system",
//             "content": "You are a fitness-focused AI nutrition assistant for a web app called \"Protein Sucker.\" Your task is to help users discover high-protein meals from nearby restaurants based on four main filters: \n\n1. User location (coordinates or address)\n2. Dietary preference (Vegan, Vegetarian, Non-Vegetarian)\n3. Meal type (High Protein, Low Carb, Post-Workout, Breakfast, etc.)\n4. Budget (in user's local currency)\n\nYour output must be a list of nearby restaurants (within 15km radius) with real menu items that match the criteria. Return atleast 15 options. For each item, return a detailed card including:\n\n- A unique \\`id\\`\n- High-quality \\`food-item\\` image URL\n- \\`restaurant-logo\\` image URL\n- Restaurant name\n- Meal/item name\n- Nutritional breakdown (\\`protein\\`, \\`carbs\\`, \\`fat\\`, \\`calories\\`)\n- Longitude and Latitude of the restaurant\n- Price (must be under the user’s budget)\n- Google Maps link to the restaurant\n- Approximate distance from user\n- Direct link to the same item on Uber Eats if available\n\nOnly return real data. Do not fabricate menu items or nutrition facts. If Uber Eats API integration is enabled, include a field \\`ubereats-order-link\\`. Your response should be in clean JSON format.\n\nYour tone is concise, energetic, and fitness-minded. Never return introductory or explanatory text, only the JSON result.\n\nOnce the user selects a meal by swiping or tapping, return Uber Eats order flow for that item. Don't return <think> tags, only the JSON.`\n      "
//         },
//         {
//             "role": "user",
//             "content": [
//                 {
//                     "type": "text",
//                     "text": "{\n  \"location\": \"4055 Forest Run Avenue, Burlington, Canada\",\n  \"diet\": \"Vegan\",\n  \"meal_type\": \"High Protein\",\n  \"budget\": 20\n}\n"
//                 }
//             ]
//         },
//         {
//             "role": "assistant",
//             "content": [
//                 {
//                     "type": "text",
//                     "text": "[\n  {\n    \"id\": 101,\n    \"food-item\": \"https://images.freshii.com/menu/tofu-bowl.jpg\",\n    \"restaurant-logo\": \"https://images.freshii.com/logo.png\",\n    \"restaurant\": \"Freshii\",\n    \"item\": \"Tofu Buddha Bowl\",\n    \"summary\": {\n      \"protein\": \"22g\",\n      \"carbs\": \"45g\",\n      \"fat\": \"12g\",\n      \"calories\": \"380cal\"\n    },\n    \"cost\": \"$15.50\",\n    \"maps\": \"https://maps.app.goo.gl/freshii-burlington\",\n    \"approx-distance\": \"1.2km\",\n    \"ubereats-order-link\": \"https://www.ubereats.com/store/freshii-tofu-buddha\"\n  },\n  {\n    \"id\": 102,\n    \"food-item\": \"https://images.pitapit.ca/menu/falafel.jpg\",\n    \"restaurant-logo\": \"https://images.pitapit.ca/logo.png\",\n    \"restaurant\": \"Pita Pit\",\n    \"item\": \"Falafel Pita with Hummus (No Dairy)\",\n    \"summary\": {\n      \"protein\": \"18g\",\n      \"carbs\": \"55g\",\n      \"fat\": \"10g\",\n      \"calories\": \"420cal\"\n    },\n    \"cost\": \"$12.99\",\n    \"maps\": \"https://maps.app.goo.gl/pitapit-burlington\",\n    \"approx-distance\": \"2.5km\",\n    \"ubereats-order-link\": \"https://www.ubereats.com/store/pita-pit-vegan-falafel\"\n  }\n]\n"
//                 }
//             ]
//         },
//         {
//             "role": "user",
//             "content": [
//                 {
//                     "type": "text",
//                     "text": "{\n  \"location\": \"4055 Forest Run Avenue, Burlington, Canada\",\n  \"diet\": \"Vegan\",\n  \"meal_type\": \"High Protein\",\n  \"budget\": 20\n}"
//                 }
//             ]
//         }
//     ]
// })

//     const content = response.choices[0].message.content;

// // Sanitize and remove <think> ... </think> blocks
// const sanitized = (content as string).replace(/<think>[\s\S]*?<\/think>/g, '').trim();

// let parsedJSON = null;
// try {
//   parsedJSON = JSON.parse(sanitized);
// } catch (e) {
//   console.warn("Failed to parse sanitized response as JSON.");
// }



//     return NextResponse.json(extractJsonFromMarkdown(sanitized));
//   } catch (error) {
//     console.error("Error calling Nebius API:", error);
//     return NextResponse.json({ error: "Failed to fetch from Nebius" }, { status: 500 });
//   }
// }

// function extractJsonFromMarkdown(raw: string): any {
//     const stripped = raw
//       .replace(/```json\s*/i, '')
//       .replace(/```$/, '')
//       .trim();
  
//     try {
//       return JSON.parse(stripped);
//     } catch (err) {
//       console.error("Failed to parse JSON:", err);
//       return null;
//     }
//   }
  
// route.ts
import OpenAI from 'openai';
import { NextResponse } from 'next/server';

const client = new OpenAI({
  baseURL: 'https://api.studio.nebius.com/v1/',
  apiKey: process.env.NEXT_PUBLIC_NEBIUS_API_KEY!,
});

export async function POST(request: Request) {
  try {
    // ✅ Parse JSON body from the request
    const body = await request.json();
    const { location, lat, long, diet, meal_type, budget } = body;

    // ✅ Validate parameters
    if (!lat || !long || !location) {
      return NextResponse.json(
        { error: "Invalid or missing location, lat, or long parameters." },
        { status: 400 }
      );
    }

    const budgetValue = parseFloat(budget);
    if (isNaN(budgetValue) || budgetValue <= 0) {
      return NextResponse.json(
        { error: "Budget must be a positive number." },
        { status: 400 }
      );
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

          Your output must be a list of nearby restaurants (within 5km radius) with real menu items that match the criteria. Return at least 5 options. For each item, return a detailed card including:
          - A unique \`id\`
          - High-quality \`food-item\` image URL
          - \`restaurant-logo\` image URL
          - Restaurant name
          - Meal/item name
          - Nutritional breakdown (\`protein\`, \`carbs\`, \`fat\`, \`calories\`)
          - Longitude and Latitude of the restaurant
          - Price (must be under the user’s budget)
          - Google Maps link to the restaurant
          - Approximate distance from user
          - Direct link to the same item on Uber Eats if available
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
      console.warn('Failed to parse sanitized response as JSON.');
    }

    if (!parsedJSON || !Array.isArray(parsedJSON)) {
      return NextResponse.json({ error: 'Invalid response from Nebius API.' }, { status: 500 });
    }

    return NextResponse.json(parsedJSON);
  } catch (error) {
    console.error('Error calling Nebius API:', error);
    return NextResponse.json({ error: 'Failed to fetch from Nebius' }, { status: 500 });
  }
}
