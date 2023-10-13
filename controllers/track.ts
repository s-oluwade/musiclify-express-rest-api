import {pool} from '../db';
import {deleteRow, updateRow} from '../helpers/database_functions';
import {ITrack} from '../models/track';

export function getAllTracks(req: any, res: any) {
  pool.query('SELECT * FROM `track`', function (err: Error, rows: any, fields: any) {
    // Connection is automatically released when query resolves
    if (err) {
      console.error('query error:' + err);
      res.sendStatus(404);
    } else {
      res.status(200).json(rows);
    }
  });
}

export function getTrack(req: any, res: any) {
  // const employee = req.body;
  const albumId = req.params?.id;

  if (albumId) {
    // For pool initialization, see above
    pool.query('SELECT * FROM `track` WHERE id=' + albumId, function (err: Error, rows: any, fields: any) {
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

export function addTrack(req: any, res: any) {
  if (!req.body) {
    res.json(null);
  }

  let sqlQuery = null;

  // multiple inserts
  if (Array.isArray(req.body)) {
    let albums = req.body as ITrack[];

    sqlQuery =
      'INSERT INTO `track` (' +
      Object.keys(albums[0]).join(',') +
      ') VALUES ' +
      albums
        .map(
          (album) =>
            '(' +
            Object.values(album)
              .map((value) => `"${value}"`)
              .join(',') +
            ')'
        )
        .join(',');
  } else {
    //   one insert
    let album = req.body as ITrack;
    sqlQuery =
      'INSERT INTO `track` (' +
      Object.keys(album).join(',') +
      ') VALUES (' +
      Object.values(album)
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

export function editTrack(req: any, res: any) {
  if (!req.body) {
    res.json(null);
  }
  const id = req.params.id;
  const trackUpdate = req.body as {[key: string]: any};

  res.json(updateRow(id, trackUpdate, 'track'));
}

export function deleteTrack(req: any, res: any) {
  const id = req.params.id;

  res.json(deleteRow(id, 'track'));
}
