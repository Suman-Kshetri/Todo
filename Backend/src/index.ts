import express from 'express'
import dotenv from 'dotenv'

dotenv.config({
    path:'./.env'
});
const app = express();

const signin = [{
  Id: 112,
  username: 'suman',
  password: '123456',
}];
app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.get('/signin', (req, res) => {
  res.send(signin);
});

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`);
});