import dotenv from 'dotenv'
import connectDB from './db';
import {app} from './app'
import { startTodoCronJobs } from './cron/cron';

dotenv.config({
    path:'./.env'
});

const port = process.env.PORT;


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
    console.log(`Backend running on http://localhost:${port}`);
  });
})
.catch((err) => console.log(err));