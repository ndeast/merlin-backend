import express from 'express';
import "dotenv/config.js";
import { lastFM } from './lastfm.ts';
import cors from 'cors';


const API_KEY: string = process.env.API_KEY!
const LASTFM_URL: string = "https://ws.audioscrobbler.com/2.0/"
const USER_AGENT: string = 'merlin'

const allowedOrigins = ['http://localhost:4200']
const corsOptions: cors.CorsOptions = {
  origin: allowedOrigins
}

const app = express();

const lfm = new lastFM();

app.use(cors(corsOptions));
// super basic auth requirement. Should be expanded upon.
app.use('', (req, res, next) => {
  if (req.headers.authorization) {
       next();
  } else {
    res.sendStatus(403)
  }
  })

app.get('/info', (req, res, next) => {
  console.log('get');
  return res.send("this is info")
});

app.get('/album-chart', (req, res, next) => {
  const promis1 = Promise.resolve(lfm.getAlbumChart());
  promis1.then((value) => {
    return res.json(value)
  })
  // return res.json(lfm.getAlbumChart())
})
app.listen(3000)
