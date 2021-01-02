import { getTopTracks } from '../../lib/spotify';
import { createError, createUnauthorizedError } from '../../utils/api-errors';

export default async (req, res) => {
  const { period, limit } = req.query;

  const { token } = req.cookies;
  if (!token) {
    return createUnauthorizedError(res);
  }

  const response = await getTopTracks({
    token,
    limit,
    timeRange: period,
  });
  const { items } = await response.json();

  if (!response.ok) {
    return createError(res, response.status, response);
  }

  const tracks = items.map((track) => ({
    artist: track.artists.map((_artist) => _artist.name).join(', '),
    songUrl: track.external_urls.spotify,
    title: track.name,
    albumImageUrl: track.album.images[0].url,
    uri: track.uri,
  }));

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=86400, stale-while-revalidate=43200'
  );

  return res.status(200).json({ tracks });
};
