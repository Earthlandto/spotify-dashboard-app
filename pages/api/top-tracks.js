import { getTopTracks } from '../../lib/spotify';

export default async (req, res) => {
  const { period, maxCount } = req.query;
  const response = await getTopTracks(period, maxCount);
  const { items } = await response.json();

  const tracks = items.map((track) => ({
    artist: track.artists.map((_artist) => _artist.name).join(', '),
    songUrl: track.external_urls.spotify,
    title: track.name,
    albumImageUrl: track.album.images[0].url,
  }));

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=86400, stale-while-revalidate=43200'
  );

  return res.status(200).json({ tracks });
};
