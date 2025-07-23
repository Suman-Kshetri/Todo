import dotenv from 'dotenv'
import connectDB from './db';
import {app} from './app'
import { startTodoCronJobs } from './cron/cron';

dotenv.config({
    path:'./.env'
});

const port = process.env.PORT;
const allowedOrigins = [
  "https://your-frontend-domain.onrender.com", // your deployed frontend URL
  "http://localhost:5173" // your local frontend dev URL
];

connectDB()
.then(() => {
  app.on('error', (err) => {
    console.error('Server error:', err);
  })
  try {
      startTodoCronJobs();
    } catch (err) {
      console.error('Failed to start cron jobs:', err);
    }
  app.listen(port, () => {
  });
})
.catch((err) => console.log(err));