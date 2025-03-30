import dotenv from 'dotenv'
import connectDB from './db';
import {app} from './app'

dotenv.config({
    path:'./.env'
});

const port = process.env.PORT;


connectDB()
.then(() => {
  app.on('error', (err) => {
    console.error('Server error:', err);
  })
  app.listen(port, () => {
    console.log(`Backend running on http://localhost:${port}`);
  });
})
.catch((err) => console.log(err));