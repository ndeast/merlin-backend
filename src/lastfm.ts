import fetch from 'node-fetch';
import { Album } from './interfaces/album.interface.ts';
import { error } from 'console';
export class lastFM {

  API_KEY: string = process.env.API_KEY!;
  LASTFM_URL: string = "https://ws.audioscrobbler.com/2.0/";
    
  topAlbums: Album[] = [];

  async getTopAlbums(): Promise<Album[]> {
    let topAlbums: Album[] = [];
    let queryURL: string = this.LASTFM_URL + '?method=user.gettopalbums&user=ndeast&period=7day&limit=20&api_key=' + this.API_KEY 
    + '&format=json';
    
    const query: any = (await (await fetch(queryURL)).json());

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
        topAlbums.push(album)
      }
      return topAlbums;
    }
  
  async getAlbumInfo(artist: string, album: string, mbid?: string) {
    let queryURL: string = this.LASTFM_URL + '?method=album.getinfo&api_key=' + this.API_KEY 
      + '&artist=' + artist 
      + '&album=' + album 
      + '&mbid=' + mbid
    console.log(queryURL);
  }

}