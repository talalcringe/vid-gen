interface MarketingVideoParams {
  features: string;
  tone?: string;
  audience?: string;
  style?: string;
}

interface RealEstateVideoParams {
  address?: string;
  price?: string;
  bedrooms?: string;
  bathrooms?: string;
  squareFootage?: string;
  features?: string;
  style?: string;
}

// ========================================================================= //
// Marketing Prompts for "Suplimax"
// ========================================================================= //

export const generateMarketingImagePrompt = (): string => {
  return `
    **Act as a professional product photographer for an advertising campaign.**
    **Product:** "Suplimax" Energy Drink.
    **Subject:** A sleek, modern 16oz can of 'Suplimax' energy drink. The can's design should be eye-catching and vibrant.
    **Key Requirement:** The name "Suplimax" must be clearly visible and legible on the can, written in a bold, dynamic font.
    **Composition:** A dramatic, eye-level hero shot of the can.
    **Lighting:** Crisp, clean studio lighting that highlights the can's metallic texture and creates subtle, soft shadows.
    **Background:** A solid, deep charcoal background (#1F1F1F) to make the vibrant can colors pop.
    **Details:** The can should be covered in fine, realistic condensation droplets, making it look ice-cold and refreshing.
    **Style:** Hyper-realistic, 4K, commercial-grade image.
    **Avoid:** Generic designs, blurry text, distracting elements, flat lighting.
  `;
};

export const generateMarketingVideoPrompt = ({
  features,
  tone = 'energetic',
  audience = 'young adults (18-30)',
  style = 'dynamic and fast-paced',
}: MarketingVideoParams): string => {
  return `
    **Persona:** You are a top-tier motion graphics artist and video editor for a major brand campaign.
    **Objective:** Using the provided image of the "Suplimax" can, create a stunning 10-15 second promotional video.
    **Core Task:** Animate the static image. The can should feel alive and full of energy.
    **Target Audience:** ${audience}.
    **Tone & Style:** ${tone}, ${style}.

    **Animation Sequence:**
    - **(0-2s):** The "Suplimax" can flies into the center of the frame from off-screen, spinning rapidly. It stops abruptly with a powerful thud sound effect.
    - **(2-6s):** As the can lands, a vibrant shockwave of energy (matching the can's colors) erupts from its base. Quick, stylized text callouts appear, highlighting key features: ${features}.
    - **(6-10s):** The can begins to pulse with a subtle, glowing light. Electric arcs crackle around it. The camera performs a slow, dramatic zoom-in.
    - **(10-15s):** The video ends with a final, powerful shot of the can. The brand's tagline, "Suplimax: Fuel Your Momentum," fades in with a clean, modern font.

    **Music:** A high-energy, royalty-free electronic or rock track that syncs with the on-screen action.
    **Crucial:** The entire video must be derived from the provided image. Do not change the can's design.
  `;
};

// ========================================================================= //
// Real Estate Prompts
// ========================================================================= //

export const generateRealEstateVideoPrompt = ({
  address = "12012 Crest Ct, Beverly Hills, CA 90210",
  price = "$10,183,985",
  bedrooms = "5",
  bathrooms = "6.5",
  squareFootage = "6,100",
  features = "Luxury estate, three-car garage, landscaped grounds, elegant entrance with grand staircase, modern design, prime Beverly Hills location",
  style = 'cinematic luxury',
}: RealEstateVideoParams): string => {
  return `
    **Persona:** You are an elite real estate videographer tasked with creating a captivating virtual tour for a prime Beverly Hills property.
    **Objective:** Produce a 60-second, ${style} virtual tour for the property at ${address}. The video must feel sophisticated, elegant, and aspirational.
    **Style:** Use smooth, stabilized camera movements like drone sweeps and gimbal glides. Focus on wide-angle shots to create a sense of space and luxury.

    **Property Details to Feature:**
    - **Price:** ${price}
    - **Size:** ${bedrooms} Bedrooms, ${bathrooms} Bathrooms, ${squareFootage} sq ft
    - **Key Features:** ${features}

    **Detailed Shot List & Sequence:**
    - **(0-7s) The Grand Entrance:** Start with a sweeping drone shot that flies towards the front of the estate, showcasing the landscaped grounds and three-car garage. As the camera approaches the entrance, transition to a smooth gimbal shot opening the front doors to reveal the grand staircase. Text Overlay: "${address}".
    - **(8-30s) Modern Interior Elegance:** Glide through the open-plan living spaces. Capture the modern design and flow from the living room to the gourmet kitchen. Use slow panning shots to highlight high-end finishes.
    - **(31-45s) The Master Suite Retreat:** Showcase the master bedroom, focusing on its size and any stunning views. Move into the en-suite bathroom, highlighting luxurious features like a spa tub or rain shower.
    - **(46-55s) Outdoor Oasis:** Transition to the exterior, featuring the backyard, patio, or any other outdoor amenities. Use a combination of ground-level shots and a final, rising drone shot.
    - **(56-60s) The Closing Shot:** A breathtaking twilight or sunset drone shot pulling away from the property, revealing the glittering lights of Beverly Hills in the distance. Text Overlay: "Your Beverly Hills Dream Awaits."

    **Music:** A sophisticated, minimalist, and inspiring instrumental track.
    **Avoid:** Abrupt cuts, shaky footage, distorted perspectives, and generic stock music.
  `;
};
