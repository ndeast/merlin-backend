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

app.get('/top-albums', async (req, res, next) => {
  const albums = await lfm.getTopAlbums();
  if (albums.length > 0) {
    res.json(albums)
  } else {
    next('Failed to retrieve top albums')
  }
});

app.post('/album-info', (req, res, next) => {
  console.log(req.body)
  const album = Promise.resolve(lfm.getAlbumInfo(req.body.artist, req.body.album, req.body.mbid));
  album.then((value) => {
    return res.json(value)
  })
})
app.listen(3000)
