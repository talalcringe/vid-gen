export interface VideoGenerationResponse {
  videoUrl: string;
  message: string;
  isMock?: boolean;
  mockReason?: string;
}

export interface ImageGenerationResponse {
  imageUrl: string;
  message: string;
}

export interface MarketingRequest {
  productName: string;
  features: string;
  tone?: string;
  audience?: string;
  style?: string;
}

export interface RealEstateRequest {
  address: string;
  price: string;
  bedrooms?: string;
  bathrooms?: string;
  squareFootage?: string;
  features?: string;
  style?: string;
}

export interface ErrorResponse {
  error: string;
  message: string;
  details?: any;
}
