import {pool} from '../db';
import {IArtist} from '../models/artist';

export function getAllArtists(req: any, res: any) {
  pool.query('SELECT * FROM `artist`', function (err: Error, rows: any, fields: any) {
    // Connection is automatically released when query resolves
    if (err) {
      console.error('query error:' + err);
      res.sendStatus(404);
    } else {
      res.status(200).json(rows);
    }
  });
}

export function getArtist(req: any, res: any) {
  // const employee = req.body;
  const artistId = req.params?.id;

  if (artistId) {
    // For pool initialization, see above
    pool.query('SELECT * FROM `artist` WHERE id=' + artistId, function (err: Error, rows: any, fields: any) {
      // Connection is automatically released when query resolves
      if (err) {
        console.error('query error:' + err);
        res.sendStatus(404);
      } else {
        res.status(200).json(rows);
      }
    });
  }
}

export function addArtist(req: any, res: any) {
  if (!req.body) {
    res.json(null);
  }

  let sqlQuery = null;

  // multiple inserts
  if (Array.isArray(req.body)) {
    let artists = req.body as IArtist[];

    sqlQuery =
      'INSERT INTO `artist` (' +
      Object.keys(artists[0]).join(',') +
      ') VALUES ' +
      artists
        .map(
          (artist) =>
            '(' +
            Object.values(artist)
              .map((value) => `"${value}"`)
              .join(',') +
            ')'
        )
        .join(',');
  } else {
    //   one insert
    let artist = req.body as IArtist;
    sqlQuery =
      'INSERT INTO `artist` (' +
      Object.keys(artist).join(',') +
      ') VALUES (' +
      Object.values(artist)
        .map((value) => `"${value}"`)
        .join(',') +
      ')';
  }

  pool.query(sqlQuery, (err: Error, rows: any, fields: any) => {
    if (err) {
      console.error('query error: ' + err);
    } else {
      res.json(rows);
    }
  });
}
