import fetch from 'node-fetch';
export class lastFM {


  API_KEY: string = process.env.API_KEY!
  LASTFM_URL: string = "https://ws.audioscrobbler.com/2.0/"

  getAlbumChart() {
    let queryURL: string = this.LASTFM_URL + '?method=user.getweeklyalbumchart&user=ndeast&api_key=' + this.API_KEY + '&format=json'
    fetch(queryURL).then(res => res.json()).then((json) => { console.log(json) })
  }
  







}