import request from 'supertest';
import lastFM from '../lastfm.js';
import "dotenv/config.js";
import { Album } from '../interfaces/album.interface.js';
import app from '../index.js';


const API_KEY: string = process.env.API_KEY!;
const LASTFM_URL: string = "https://ws.audioscrobbler.com/2.0/";
  
const base = {
  'Authorization': 'nik'
}


describe("Test server", () => {
  test("info route", async () => {
    const res = await request(app).get('/info').set(base);
    expect(res.status).toEqual(200);
    expect(res.text).toEqual('this api returns last.fm album data');
  });
  test("topAlbums route", async () => {
    const res = await request(app).get('/top-albums/ndeast').set(base);
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining('json'));
    expect(res.body).toContain<Album>
  });
})

describe("lastFM Tests", () => {
  test("topAlbums test", async () => {
    const lfm = new lastFM(API_KEY, LASTFM_URL);
    const res = await lfm.getTopAlbums("ndeast");
    expect(res.length).toBeGreaterThan(0);
    expect(res[0]).toBeInstanceOf<Album>;
  });
});

