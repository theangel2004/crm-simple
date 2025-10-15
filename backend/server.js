import express from 'express';
import cors from 'cors';
import clientesRoutes from './routes/clientes.js';
import ventasRoutes from './routes/ventas.js'; 

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/clientes', clientesRoutes);
app.use('/api/ventas', ventasRoutes);

app.listen(3000, () => console.log('🚀 Servidor en http://localhost:3000'));
