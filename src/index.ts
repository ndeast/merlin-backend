import express from 'express';
import "dotenv/config.js";
import { lastFM } from './lastfm.ts';


const API_KEY: string = process.env.API_KEY!
const LASTFM_URL: string = "https://ws.audioscrobbler.com/2.0/"
const USER_AGENT: string = 'merlin'


const app = express();

const lfm = new lastFM();
console.log(lfm.getAlbumChart())

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

app.use('/album-chart', (req, res, next) => {
  return res.send("album chart")
})
// app.listen(3000)
