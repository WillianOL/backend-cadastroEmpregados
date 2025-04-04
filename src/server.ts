import express from 'express';
import cors from 'cors';
import { allRoutes } from './routes';

const port = process.env.PORT || 3001;

const app = express();

app.use(cors({
  origin: "https://cadastro-empregados.vercel.app",
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type, Authorization",
}));
app.use(express.json());
app.use(allRoutes);

app.listen(3333, () => {
  console.log('Server logado em 3333');
});
