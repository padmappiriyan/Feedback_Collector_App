import exppress from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import feedbackRoutes from './Routes/feedback_route.js';
import connectDB from './Config/db_config.js';

dotenv.config();

const app = exppress();

connectDB();
const PORT = process.env.PORT || 5000;
app.use(exppress.json());
const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  credentials: false
};

app.use(cors(corsOptions));

app.get('/', (req, res) => {
  res.send('API is running...');
}); 

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use('/api/feedback', feedbackRoutes);


