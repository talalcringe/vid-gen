"use server";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000/api";

// Helper to get API key from localStorage (runs on client side)
const getApiKey = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("geminiApiKey") || "";
  }
  return "";
};

interface BaseVideoResponse {
  videoUrl: string;
  message: string;
  isMock?: boolean;
  mockReason?: string;
}

interface MarketingVideoParams {
  productName: string;
  features: string;
  tone?: string;
  audience?: string;
  style?: string;
}

interface RealEstateVideoParams {
  address: string;
  price: string;
  bedrooms?: number;
  bathrooms?: number;
  squareFootage?: number;
  features: string;
  style: string;
}

async function fetchWithErrorHandling(url: string, options: RequestInit) {
  try {
    // Get API key from localStorage if available
    const apiKey = getApiKey();

    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(apiKey ? { "X-API-Key": apiKey } : {}),
        ...options.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || "Failed to fetch data");
    }

    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}

export async function generateMarketingVideo(
  params: MarketingVideoParams
): Promise<BaseVideoResponse> {
  const response = await fetchWithErrorHandling(`${API_BASE_URL}/marketing`, {
    method: "POST",
    body: JSON.stringify({
      productName: params.productName,
      features: params.features,
      tone: params.tone,
      audience: params.audience,
      style: params.style,
    }),
  });

  return {
    videoUrl: response.videoUrl,
    message: response.message || "Marketing video generated successfully",
    isMock: response.isMock,
    mockReason: response.mockReason,
  } as BaseVideoResponse;
}

export async function generateRealEstateVideo(
  params: RealEstateVideoParams
): Promise<BaseVideoResponse> {
  const response = await fetchWithErrorHandling(`${API_BASE_URL}/real-estate`, {
    method: "POST",
    body: JSON.stringify({
      address: params.address,
      price: params.price,
      bedrooms: params.bedrooms,
      bathrooms: params.bathrooms,
      squareFootage: params.squareFootage,
      features: params.features,
      style: params.style,
    }),
  });
  return {
    videoUrl: response.videoUrl,
    message: response.message || "Real estate video generated successfully",
    isMock: response.isMock,
    mockReason: response.mockReason,
  } as BaseVideoResponse;
}
