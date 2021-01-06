import { getCurrentUser } from '../../lib/spotify';
import { createError, createUnauthorizedError } from '../../utils/api-errors';

export default async (req, res) => {
  const { token } = req.cookies;

  if (!token) {
    return createUnauthorizedError(res);
  }

  const response = await getCurrentUser({
    token,
  });

  if (!response.ok) {
    const { error } = await response.json();
    return createError(res, response.status, error);
  }

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=60, stale-while-revalidate=30'
  );

  const {
    id,
    display_name,
    images,
    external_urls,
    email,
  } = await response.json();

  return res.status(200).json({
    user: {
      id,
      email,
      name: display_name,
      imageUrl: images[0].url,
      url: external_urls.spotify,
    },
  });
};
