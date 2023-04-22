import fetch from 'node-fetch';
import { Album } from './interfaces/album.interface.ts';
export class lastFM {

  API_KEY: string = process.env.API_KEY!
  LASTFM_URL: string = "https://ws.audioscrobbler.com/2.0/"

  async getAlbumChart() {
    let queryURL: string = this.LASTFM_URL + '?method=user.getweeklyalbumchart&user=ndeast&api_key=' + this.API_KEY + '&format=json'
    console.log(queryURL)
    let response = await fetch(queryURL)
    let data = await response.text()
    console.log("done and returning")
    return JSON.parse(data)
  }

}
interface albumChart {
  weeklyalbumchart: {
    album: [
      Album
    ]
  }
}