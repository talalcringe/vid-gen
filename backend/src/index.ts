import express, { Request, Response, NextFunction, Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import marketingRoutes from "./routes/marketing.routes.js";
import realEstateRoutes from "./routes/real-estate.routes.js";

// Load environment variables from .env file if present
dotenv.config();

const PORT = process.env.PORT || 4000;

// Initialize Express app
const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/marketing", marketingRoutes);
app.use("/api/real-estate", realEstateRoutes);

// Health check endpoint
app.get("/ping", (_req: Request, res: Response) => {
  res.send("pong");
});

// // 404 handler
// app.use((_req: Request, res: Response) => {
//   res.status(404).json({
//     error: 'Not Found',
//     message: 'The requested resource was not found',
//   });
// });

// // Error handling middleware
// app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
//   console.error('Error:', err);
//   res.status(500).json({
//     error: 'Internal Server Error',
//     message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong',
//   });
// });

// Start server
// const server =
app.listen(PORT, () => {
  console.log(`🚀 Backend listening on http://localhost:${PORT}`);
});
//
// // Handle unhandled promise rejections
// process.on('unhandledRejection', (err: Error) => {
// console.error('Unhandled Rejection:', err);
// server.close(() => process.exit(1));
// });
//
// // Handle uncaught exceptions
// process.on('uncaughtException', (err: Error) => {
// console.error('Uncaught Exception:', err);
// server.close(() => process.exit(1));
// });
//
// // Handle graceful shutdown
// process.on('SIGTERM', () => {
// console.log('SIGTERM received. Shutting down gracefully');
// server.close(() => {
// console.log('Process terminated');
// });
// });
//
// export default app;
//
