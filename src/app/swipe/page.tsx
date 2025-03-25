'use client';

import React, { useEffect, useState } from "react";

const Page = () => {
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/nebius', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();
      setResponse(data);
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Hello Suckers ;-) 💪</h1>
      {loading ? (
        <p>Loading suggestions...</p>
      ) : (
        <div className="bg-gray-100 p-4 rounded-md">
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default Page;
// {
//     "id": "chatcmpl-07bf3dc06d6741798a2678ccfc3dca29",
//     "choices": [
//       {
//         "finish_reason": "stop",
//         "index": 0,
//         "logprobs": null,
//         "message": {
//           "content": "<think>\nOkay, the user is looking for high-protein vegan meals near Burlington, Canada, with a budget of $20. Let me start by understanding the location. Forest Run Avenue in Burlington—I should check which restaurants are around there that offer vegan options. Since the user wants high-protein meals, I need to focus on plant-based proteins like tofu, tempeh, lentils, chickpeas, or seitan.\n\nFirst, I'll think of popular vegan-friendly restaurants in the area. Places like Freshii, Boon Burger, Lettuce Love Cafe, Copper Branch, and The Hearty Hooligan come to mind. These spots usually have protein-packed vegan dishes. Let me verify if they're in Burlington. Freshii is a chain with customizable bowls, so that's a good bet. Boon Burger is a vegan burger joint; their burgers often use beans or lentils. Lettuce Love Cafe is definitely in Burlington and offers items like quinoa bowls. Copper Branch is another vegan chain with bowls and wraps. The Hearty Hooligan is a local vegan spot with hearty options.\n\nNow, considering the budget of $20, I need to ensure each meal suggestion stays under that. Let's break down each restaurant's offerings. For Freshii, a customizable bowl with tofu, quinoa, and veggies would work. Boon Burger's lentil burger with a side salad instead of fries might keep it under $20. Lettuce Love's Buddha Bowl has chickpeas and quinoa. Copper Branch's Zenith Bowl includes tempeh. The Hearty Hooligan's BBQ jackfruit sandwich with a protein-rich side like edamame.\n\nI should check approximate prices. Freshii bowls are usually around $12-$15. Boon Burger's combo might be around $18. Lettuce Love's bowl could be $16. Copper Branch's bowl about $15. The Hearty Hooligan's sandwich and side maybe $17. All within budget. Also, mention protein content if possible, like tofu has 10g per 100g, lentils around 9g per 100g cooked. Highlighting the protein sources helps the user understand why these meals are good choices. Need to ensure all options are vegan, so no dairy or animal products. Double-checking menu items to confirm they're vegan. Also, location accuracy—make sure these restaurants are indeed in Burlington. Maybe include a note to check exact locations via delivery apps. Alright, that should cover the user's needs.\n</think>\n\nHere’s a curated list of **high-protein vegan meals** near **4055 Forest Run Avenue, Burlington, Canada**, tailored to your $20 budget:\n\n---\n\n### 1. **Freshii**  \n   - **Meal**: *Tofu Power Bowl*  \n     - Grilled tofu (20g protein), quinoa, black beans, spinach, avocado, and sesame-ginger dressing.  \n   - **Protein**: ~25g per serving  \n   - **Price**: $14.50  \n   - **Why**: Budget-friendly, fresh, and fully customizable.  \n\n---\n\n### 2. **Boon Burger Cafe** (Vegan Burger Spot)  \n   - **Meal**: *Lentil Walnut Burger*  \n     - Protein-packed lentil patty (18g protein), served with a side salad (skip fries to stay under budget).  \n   - **Protein**: ~22g  \n   - **Price**: $13.50 (burger) + $4 (salad) = **$17.50**  \n\n---\n\n### 3. **Lettuce Love Cafe** (Plant-Based Kitchen)  \n   - **Meal**: *Chickpea & Quinoa Buddha Bowl*  \n     - Chickpeas (15g protein), quinoa, roasted veggies, tahini sauce, and hemp seeds.  \n   - **Protein**: ~20g  \n   - **Price**: $16.00  \n   - **Bonus**: Add tempeh (+$3) for an extra 12g protein.  \n\n---\n\n### 4. **Copper Branch** (Vegan Fast-Casual)  \n   - **Meal**: *Zenith Bowl*  \n     - Marinated tempeh (16g protein), brown rice, kale, avocado, and miso gravy.  \n   - **Protein**: ~18g  \n   - **Price**: $15.75  \n\n---\n\n### 5. **The Hearty Hooligan** (Local Vegan Spot)  \n   - **Meal**: *BBQ Jackfruit Sandwich* with a side of edamame.  \n     - Jackfruit (4g protein) + edamame (9g protein) + whole-grain bun.  \n   - **Protein**: ~13g (ask for extra BBQ sauce with smoked paprika for flavor!).  \n   - **Price**: $12 (sandwich) + $5 (edamame) = **$17**  \n\n---\n\n### 💡 **Pro Tips**:  \n- Use apps like **Uber Eats** or **SkipTheDishes** to filter for vegan options and confirm prices.  \n- Look for keywords: *tofu, tempeh, lentils, chickpeas, seitan, edamame, hemp seeds*.  \n- Ask restaurants to double the protein portion (sometimes free or +$2).  \n\nLet me know if you’d like help refining further! 🌱💪",
//           "refusal": null,
//           "role": "assistant",
//           "audio": null,
//           "function_call": null,
//           "tool_calls": [],
//           "reasoning_content": null
//         },
//         "stop_reason": null
//       }
//     ],
//     "created": 1742705794,
//     "model": "deepseek-ai/DeepSeek-R1",
//     "object": "chat.completion",
//     "service_tier": null,
//     "system_fingerprint": null,
//     "usage": {
//       "completion_tokens": 1105,
//       "prompt_tokens": 87,
//       "total_tokens": 1192,
//       "completion_tokens_details": null,
//       "prompt_tokens_details": null
//     },
//     "prompt_logprobs": null
//   }