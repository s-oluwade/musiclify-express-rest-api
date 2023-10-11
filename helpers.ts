// artist ids
const artists = {
    clozee: '1496XxkytEk26FUJLfpVZr',
    ennja: '5VfsJtcTOUghb9eRPpif27',
    skeler: '7ks4LdnBvp6HUsmVJiKgsB',
    noahb: '4F4w1Gkfja6wPJzuMKCLmk',
    klimeks: '5JQljNQvDpk1hhKpJHpwNU',
    aekae: '2YXVRXrYHVJrC5P1eTGYSu',
    rautu: '6RAjggwom3h4d1CTM4zojc',
    nastyakazantseva: '3wF9SXMmYh6VkJYd357pjH',
    skyfallbeats: '6ORJGSfnPFkJFFs5wXEClO',
  };

// endpoints
const artistEndpoint = `v1/artists/${artists.skyfallbeats}`;
const artistAlbumsEndpoint = artistEndpoint + '/albums';
const multipleArtistsEndpoint = `v1/artists?ids=${Object.values(artists).join(',')}`;

// spotify fetch request
export async function fetchSpotifyApi(
  endpoint: any = artistEndpoint,
  headers = {
    Authorization: `Bearer ${process.env.SPOTIFY_ACCESS_TOKEN}`,
  },
  method: any = 'GET',
  body: any = undefined
) {
  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers,
    method,
    body: JSON.stringify(body),
  });
  return await res.json();
}

export async function getTracksFromAlbum() {
  if (!process.env.SPOTIFY_CLIENT_ID || !process.env.SPOTIFY_CLIENT_SECRET) {
    return;
  }

  const albums = require('./albums.json');
  const response = [];

  for (const album of albums) {
    const albumTracksEndpoint = `v1/albums/${album.id}/tracks`;
    const track = {} as {[key: string]: any};
    track['album_id'] = album.id;
    const spotifyResponse = await fetchSpotifyApi(albumTracksEndpoint);
    for (const item of spotifyResponse['items']) {
      track['artists'] = item['artists'];
      track['external_urls'] = item['external_urls'];
      track['id'] = item['id'];
      track['name'] = item['name'];
      track['preview_url'] = item['preview_url'];
      response.push(track);
    }
  }
  return response;
}
