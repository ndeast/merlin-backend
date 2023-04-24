# merlin-backend
simple proxy service for the last-fm api written in typescript, and node.js, using express.

### Prerequisites 
- node.js LTS 18
- [Last.FM API key](https://www.last.fm/api/account/create)

### Build
- clone this repo
- in the project root, create a `.env` file with `API_KEY: <YOUR_LAST_FM_API_KEY>` or add as a system environment variable.
- Run `npm i`
- Run `npm start:dev`

### Run with docker
- clone this repo
- Run `docker build . -t ndeast/merlin-backend`
- Run `docker run -p 3000:3000 --env API_KEY=<YOUR_LAST_FM_API_KEY> -d ndeast/merlin-backend`
