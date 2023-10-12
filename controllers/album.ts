import {pool} from '../db';
import {IAlbum} from '../models/album';

export function getAllAlbums(req: any, res: any) {
  pool.query('SELECT * FROM `album`', function (err: Error, rows: any, fields: any) {
    // Connection is automatically released when query resolves
    if (err) {
      console.error('query error:' + err);
      res.sendStatus(404);
    } else {
      res.status(200).json(rows);
    }
  });
}

export function getAlbum(req: any, res: any) {
  // const employee = req.body;
  const albumId = req.params?.id;

  if (albumId) {
    // For pool initialization, see above
    pool.query('SELECT * FROM `album` WHERE id=' + albumId, function (err: Error, rows: any, fields: any) {
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

export function addAlbum(req: any, res: any) {
  if (!req.body) {
    res.json(null);
  }

  let sqlQuery = null;

  // multiple inserts
  if (Array.isArray(req.body)) {
    let albums = req.body as IAlbum[];

    sqlQuery =
      'INSERT INTO `album` (' +
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
    let album = req.body as IAlbum;
    sqlQuery =
      'INSERT INTO `album` (' +
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
