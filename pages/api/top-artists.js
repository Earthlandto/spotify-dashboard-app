import { getTopArtists } from '../../lib/spotify';
import { createError, createUnauthorizedError } from '../../utils/api-errors';

export default async (req, res) => {
  const { period, limit } = req.query;
  const { token } = req.cookies;

  if (!token) {
    return createUnauthorizedError(res);
  }
  const response = await getTopArtists({
    token,
    limit,
    timeRange: period,
  });

  if (!response.ok) {
    return createError(res, response.status, response);
  }

  const { items } = await response.json();

  const artists = items.map((artist) => ({
    name: artist.name,
    artistUrl: artist.external_urls.spotify,
    imageUrl: artist.images[0].url,
    uri: artist.uri,
  }));

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=86400, stale-while-revalidate=43200'
  );

  return res.status(200).json({ artists });
};
