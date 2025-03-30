import express  from "express";
import cors from "cors";

const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true,
}));

//data comes on backend form frontend in different form json, body, head so we need to parse it
//josn configure
app.use(express.json({limit: '16kb'}));

//urlencoded config
app.use(express.urlencoded({extended: true, limit: '16kb'}));

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

export {app};