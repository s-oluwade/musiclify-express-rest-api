/**
* A rest api for music 
* It implements all endpoints for artists, albums and tracks
* It uses mysql as the database
*/

import { addAlbum, deleteAlbum, editAlbum, getAllAlbums, getAlbum } from './controllers/album';
import { addArtist, deleteArtist, editArtist, getAllArtists, getArtist } from './controllers/artist';
import { addTrack, deleteTrack, editTrack, getAllTracks, getTrack } from './controllers/track';

require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

// parse application/json
app.use(bodyParser.json());

app.get('/', async (req: any, res: any) => {
  // const response = await getTracksForAllAlbums();

  res.json(null);
});

app.post('/', (req: any, res: any) => {
  res.send('post received');
});

// get all
app.get('/artists', getAllArtists);
app.get('/albums', getAllAlbums);
app.get('/tracks', getAllTracks);

// get one
app.get('/artists/:id', getArtist);
app.get('/albums/:id', getAlbum);
app.get('/tracks/:id', getTrack);

// add one or more
app.post('/artists', addArtist);
app.post('/albums', addAlbum);
app.post('/tracks', addTrack);

// edit one
app.put('/artists/:id', editArtist);
app.put('/albums/:id', editAlbum);
app.put('/tracks/:id', editTrack);

// delete one
app.delete('/artists/:id', deleteArtist);
app.delete('/albums/:id', deleteAlbum);
app.delete('/tracks/:id', deleteTrack);

app.listen(port, () => {
  console.log('listening on http://localhost:' + port);
});
