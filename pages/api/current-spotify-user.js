import { getCurrentUser } from '../../lib/spotify';

export default async (_, res) => {
  const response = await getCurrentUser();

  const user = await response.json();

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=60, stale-while-revalidate=30'
  );

  return res.status(200).json({
    id: user.id,
    name: user.display_name,
    imageUrl: user.images[0].url,
    url: user.external_urls.spotify,
    email: user.email,
  });
};
