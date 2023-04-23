import express from 'express';
import "dotenv/config.js";
import { lastFM } from './lastfm.ts';
import cors from 'cors';


const API_KEY: string = process.env.API_KEY!;
const LASTFM_URL: string = "https://ws.audioscrobbler.com/2.0/";
const USER_AGENT: string = 'merlin';

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
});

app.get('/info', (req, res, next) => {
  return res.send("this is info")
});

// gets a users top 20 albums from the past 7 days
app.get('/top-albums/:user', async (req, res, next) => {
  const albums = await lfm.getTopAlbums(req.params.user);
  if (albums.length > 0) {
    res.json(albums)
  } else {
    next('Failed to retrieve top albums')
  }
});

// app.post('/album-info', async (req, res, next) => {
//   console.log(req.body)
//   const album = await lfm.getAlbumInfo(req.body.artist, req.body.album, req.body.mbid);
//   if (album) {
//     res.json(album)
//   } else {
//     next('Failed to retrieve album info')
//   }
// });

app.listen(3000);
