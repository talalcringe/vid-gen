# 🚀 Vid-Gen Backend

Express API server powering the AI Video Generator app, built with TypeScript.

## 📚 Table of Contents

- [Features](#-features)
- [API Documentation](#-api-documentation)
- [Development](#-development)
- [Environment Variables](#-environment-variables)
- [Testing](#-testing)
- [Deployment](#-deployment)

## ✨ Features

- **RESTful API** - Built with Express.js and TypeScript
- **AI Integration** - Seamless integration with AI video generation services
- **Type Safety** - Full TypeScript support for better developer experience
- **Modular Architecture** - Organized codebase with clear separation of concerns

## 📚 API Documentation

### Base URL

```
https://vid-gen-5d21.onrender.com/api
```

### Endpoints

#### `POST /api/marketing`

Generate a marketing video for a product.

**Request Body:**

```json
{
  "productName": "Suplimax",
  "features": "Boosts energy, improves focus, sugar-free",
  "tone": "energetic",
  "audience": "young adults",
  "style": "dynamic"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "videoUrl": "https://example.com/videos/abc123",
    "message": "Video generated successfully"
  }
}
```

#### `POST /api/real-estate`

Generate a real estate virtual tour video.

**Request Body:**

```json
{
  "address": "12012 Crest Ct, Beverly Hills, CA 90210",
  "price": "$10,183,985",
  "bedrooms": 5,
  "bathrooms": 6.5,
  "squareFootage": 6100,
  "features": "Luxury estate, ocean view, smart home",
  "style": "luxury"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "videoUrl": "https://example.com/tours/xyz789",
    "message": "Virtual tour generated successfully"
  }
}
```

#### `GET /ping`

Health check endpoint.

**Response:**

```json
{
  "status": "ok",
  "timestamp": "2025-06-14T12:00:00Z"
}
```

## 🛠️ Development

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0 or yarn >= 1.22.0
- TypeScript >= 5.0.0

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```
3. Copy `.env.example` to `.env` and update the values

### Running Locally

```bash
# Development mode with hot-reload
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🔒 Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
PORT=3001
NODE_ENV=development
API_KEY=your_api_key_here
AI_SERVICE_URL=https://api.ai-service.com/v1
STORAGE_BUCKET=your-bucket-name
```

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

## 🚀 Deployment

### Prerequisites

- Docker (optional)
- Render.com account (or your preferred hosting)

### Using Render (Recommended)

1. Push your code to a GitHub repository
2. Create a new Web Service on Render
3. Connect your repository
4. Set up environment variables in the Render dashboard
5. Deploy!

### Using Docker

```bash
# Build the Docker image
docker build -t vid-gen-backend .

# Run the container
docker run -p 3001:3001 --env-file .env vid-gen-backend
```
