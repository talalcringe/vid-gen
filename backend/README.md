# Vid-Gen Backend

Express API server powering the AI Video Generator app.

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

## Local Development

```bash
cd backend
cp .env.example .env # add your GOOGLE_GEMINI_API_KEY
pnpm i # or npm install
pnpm dev # nodemon
```
