import express, { Application } from 'express';
import 'express-async-errors';
import pesquisaRoutes from './routes/pesquisaRoutes';

const app: Application = express();
app.use(express.json());
app.use('/pesquisas', pesquisaRoutes);

export default app;
