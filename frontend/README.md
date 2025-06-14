# 🎬 Vid-Gen Frontend

Next.js frontend for the AI Video Generator application, featuring a modern, responsive UI built with React, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Modern UI/UX** - Clean, responsive design built with Tailwind CSS
- **Type Safety** - Full TypeScript support
- **Performance Optimized** - Built with Next.js 14 App Router
- **Dark Mode** - Built-in dark/light theme support
- **Form Handling** - Robust form validation with React Hook Form
- **State Management** - Efficient state management with React Context

## 📚 Table of Contents

- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Available Scripts](#-available-scripts)
- [Environment Variables](#-environment-variables)
- [Deployment](#-deployment)

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0 or yarn >= 1.22.0

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/vid-gen.git
   cd vid-gen/frontend
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Update the variables in `.env.local` with your configuration.

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Project Structure

```
frontend/
├── app/                    # App Router
│   ├── api/                # API routes
│   ├── (auth)/             # Authentication pages
│   ├── (dashboard)/        # Authenticated routes
│   ├── globals.css         # Global styles
│   └── layout.tsx          # Root layout
├── components/             # Reusable components
│   ├── ui/                 # ShadCN/ui components
│   └── shared/             # Shared components
├── lib/                    # Utility functions
│   ├── api/                # API clients
│   └── utils/              # Helper functions
├── public/                 # Static files
├── styles/                 # Global styles
└── types/                  # TypeScript type definitions
```

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix linting issues
- `npm run type-check` - Check TypeScript types
- `npm run format` - Format code with Prettier

## 🔒 Environment Variables

Create a `.env.local` file with the following variables:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
NEXT_PUBLIC_APP_ENV=development
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

## 🚀 Deployment

### Vercel (Recommended)

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app).

1. Push your code to a GitHub repository
2. Import your project on Vercel
3. Set up environment variables in the Vercel dashboard
4. Deploy!

### Other Platforms

You can also deploy to other platforms like:

- [Netlify](https://www.netlify.com/with/nextjs/)
- [AWS Amplify](https://docs.aws.amazon.com/amplify/latest/userguide/deploy-nextjs-server-options.html)
- [Heroku](https://elements.heroku.com/buildpacks/mars/heroku-nextjs)

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - learn about Tailwind CSS.
- [TypeScript Documentation](https://www.typescriptlang.org/docs/) - learn about TypeScript.
