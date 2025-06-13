// Marketing prompts
export const generateMarketingImagePrompt = (productName: string, style: string = 'modern'): string => {
  return `High-resolution studio product shot of a sleek energy-drink can. 
    Label reads '${productName}' in bold modern font. 
    Vibrant colors, white background.`;
};

export const generateMarketingVideoPrompt = ({
  productName,
  features,
  tone = 'professional',
  audience = 'general',
  style = 'modern',
}: {
  productName: string;
  features: string;
  tone?: string;
  audience?: string;
  style?: string;
}): string => {
  return `Create a ${tone} marketing video for ${productName} that highlights: ${features}. 
    The video should be in a ${style} style and target ${audience}. 
    Focus on showing the product in use and its benefits.`;
};

// Real Estate prompts
export const generateRealEstateVideoPrompt = ({
  address,
  price,
  bedrooms = '3',
  bathrooms = '2',
  squareFootage = '2000',
  features = 'spacious living area',
  style = 'modern',
}: {
  address: string;
  price: string;
  bedrooms?: string;
  bathrooms?: string;
  squareFootage?: string;
  features?: string;
  style?: string;
}): string => {
  return `Create a ${style} virtual tour video for the property at ${address} 
    priced at ${price}. It has ${bedrooms} bedrooms, ${bathrooms} bathrooms 
    and ${squareFootage} sq ft. Highlight these features: ${features}.`;
};
