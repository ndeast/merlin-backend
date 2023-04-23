import fetch from 'node-fetch';
import { Album } from './interfaces/album.interface.ts';
import { resolve } from 'path';
import { error } from 'console';
export class lastFM {

  API_KEY: string = process.env.API_KEY!;
  LASTFM_URL: string = "https://ws.audioscrobbler.com/2.0/";
    
  async getTopAlbums(user: string): Promise<Album[]> {
    let topAlbums: Album[] = [];
    let queryURL: string = this.LASTFM_URL + '?method=user.gettopalbums&period=7day&limit=20&api_key=' + this.API_KEY 
    + '&format=json'
    + '&user=' + user;
    let query: any;
    
    await fetch(queryURL).then(async (resp) => {
      if (resp.ok) {
        query = await resp.json();
      } else {
        console.error(resp.status, resp.statusText);
        throw error("failed to retrieve data from lastfm");
      }
    }).catch((err) => {
      console.error("Error", err);
    });

    if (query) {
      for (let a of query.topalbums.album) {
        let album: Album = {
          name: a.name,
          artist: a.artist.name,
          mbid: a.mbid,
          image: a.image[3]['#text'],
          url: a.url,
          playcount: a.playcount,
          rank: a['@attr'].rank
        }
        topAlbums.push(album);
      }
    }
    return topAlbums;
  }
  
  async getAlbumInfo(artist: string, album: string, mbid?: string): Promise<any> {
    let queryURL: string = this.LASTFM_URL + '?method=album.getinfo&api_key=' + this.API_KEY 
      + '&artist=' + artist 
      + '&album=' + album 
      + '&mbid=' + mbid;
      
    return queryURL;
  }

}