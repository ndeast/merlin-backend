import express from 'express';
import "dotenv/config.js";
import cors from 'cors';
import { lastFM } from './lastfm.js';
import morgan from 'morgan';


const API_KEY: string = process.env.API_KEY!;
const LASTFM_URL: string = "https://ws.audioscrobbler.com/2.0/";
const USER_AGENT: string = 'merlin';

const allowedOrigins = ['http://localhost:8080', 'http://localhost:80', 'http://localhost:4200']
const corsOptions: cors.CorsOptions = {
  origin: allowedOrigins
}

const app = express();
const lfm = new lastFM();

app.use(cors(corsOptions));
app.use(morgan('combined'))

// super basic auth requirement. Should be expanded upon.
app.use('', (req, res, next) => {
  if (req.headers.authorization) {
       next();
  } else {
    res.sendStatus(403)
  }
});

app.get('/info', (req, res, next) => {
  return res.status(200).send("this api returns last.fm album data")
});

// gets a users top 20 albums from the past 7 days
app.get('/top-albums/:user', async (req, res, next) => {
  const albums = await lfm.getTopAlbums(req.params.user);
  if (albums.length > 0) {
    res.status(200).json(albums)
  } else {
    next('Failed to retrieve top albums')
  }
});

export default app;
