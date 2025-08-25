import Fastify from 'fastify';
import cors from '@fastify/cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { attachSockets } from './sockets.js';

const PORT = Number(process.env.PORT || 8080);
const app = Fastify();
app.register(cors, { origin: true });
app.get('/health', async () => ({ ok: true }));

const httpServer = createServer(app.server as any);
const io = new Server(httpServer, { cors: { origin: '*' } });
attachSockets(io);

httpServer.listen(PORT, () => {
  console.log(`server listening on :${PORT}`);
});
