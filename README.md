# AI Video Generator

An AI-powered video generation platform that creates marketing and real estate videos using advanced AI models.

## 🚀 Features

- **Marketing Video Generation** - Create engaging marketing videos for products
- **Real Estate Tours** - Generate virtual property tours with property details
- **AI-Powered** - Leverages state-of-the-art AI models for video generation
- **Responsive Design** - Works on desktop and mobile devices

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express, TypeScript
- **AI**: Integration with AI video generation models
- **Deployment**: Vercel (Frontend), Render (Backend)

## 🚀 Quick Start

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/vid-gen.git
   cd vid-gen
   ```

2. **Install dependencies**

   ```bash
   npm install
   cd frontend && npm install
   cd ../backend && npm install
   cd ..
   ```

3. **Set up environment variables**

   - Copy `.env.example` to `.env` in both `frontend` and `backend` directories
   - Update the environment variables with your configuration

4. **Start the development servers**

   ```bash
   # Start both frontend and backend in development mode
   npm run dev
   ```

   The application will be available at `http://localhost:3000`

## 📂 Project Structure

```
vid-gen/
├── frontend/         # Next.js frontend application
├── backend/          # Express API server
├── cron/             # Scheduled tasks
└── README.md         # This file
```

## 🌐 Deployment

### Frontend (Vercel)

1. Push your code to a GitHub repository
2. Import the project on Vercel
3. Set up environment variables in Vercel dashboard
4. Deploy!

### Backend (Render)

1. Push your code to a GitHub repository
2. Create a new Web Service on Render
3. Connect your repository
4. Set up environment variables
5. Deploy!
