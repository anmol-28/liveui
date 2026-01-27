import express from 'express';
import liveStateRoutes from './routes/liveState.routes.js';

const app = express();

app.use(express.json());

app.use('/api', liveStateRoutes);

export default app;
