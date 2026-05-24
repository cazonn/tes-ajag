import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { createAdapter } from '@socket.io/redis-adapter';
import Redis from 'ioredis';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import productRoutes from './routes/product';
import orderRoutes from './routes/order';
import { setupChatSocket } from './sockets/chat';

dotenv.config();

const app = express();
const httpServer = createServer(app);

// Integrasi Redis untuk skala horizontal Socket.io & Cache
const pubClient = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');
const subClient = pubClient.duplicate();

app.use(cors({ origin: process.env.FRONTEND_URL, credentials: true }));
app.use(express.json());

// Routes API V1
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/orders', orderRoutes);

// Inisialisasi Socket.IO dengan adapter Redis
const io = new Server(httpServer, {
  cors: { origin: process.env.FRONTEND_URL, methods: ['GET', 'POST'] }
});
io.adapter(createAdapter(pubClient, subClient));

// Pasang core handler untuk Realtime Chat dan Notifikasi
setupChatSocket(io);

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
  console.log(`🚀 Premium Marketplace API running on port ${PORT}`);
});