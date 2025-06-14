# Vid-Gen Backend

Express API server powering the AI Video Generator app, built with TypeScript.

## Endpoints

### `POST /api/marketing`
Generate a marketing video for Suplimax energy drink.

Body JSON:
```
{
  "productName": "Suplimax",
  "features": "Boosts energy, ...",
  "tone": "energetic",
  "audience": "young adults",
  "style": "dynamic"
}
```
Returns `{ videoUrl, message }`.

### `POST /api/real-estate`
Generate a real estate virtual tour video.

Body JSON:
```
{
  "address": "12012 Crest Ct, Beverly Hills, CA 90210",
  "price": "$10,183,985",
  "bedrooms": 5,
  "bathrooms": 6.5,
  "squareFootage": 6100,
  "features": "Luxury estate, ...",
  "style": "luxury"
}
```
Returns `{ videoUrl, message }`.

### `GET /ping`
Health check.

## Development

### Prerequisites

- Node.js >= 14.0.0
- npm or yarn

### Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```
4. Add your `GOOGLE_GEMINI_API_KEY` to the `.env` file

### Available Scripts

- `npm run dev` - Start the development server with hot-reload
- `npm run build` - Build the TypeScript project
- `npm start` - Start the production server
- `npm run format` - Format code with Prettier
- `npm run clean` - Remove the dist directory

### Project Structure

```
├── src/
│   ├── index.ts          # Application entry point
│   └── types/            # TypeScript type definitions
├── dist/                 # Compiled JavaScript (generated)
├── .env                  # Environment variables (create from .env.example)
├── .gitignore
├── package.json
├── tsconfig.json         # TypeScript configuration
└── README.md
```
