import { getTopArtists } from '../../lib/spotify';

export default async (_, res) => {
  const response = await getTopArtists('short_term', 10);
  const { items } = await response.json();

  const artists = items.map((artist) => ({
    name: artist.name,
    artistUrl: artist.external_urls.spotify,
    imageUrl: artist.images[0].url,
  }));

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=86400, stale-while-revalidate=43200'
  );

  return res.status(200).json({ artists });
};
