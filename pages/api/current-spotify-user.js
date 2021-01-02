import { getCurrentUser } from '../../lib/spotify';
import { createError } from '../../utils/api-errors';

export default async (req, res) => {
  const { token } = req.cookies;

  if (!token) {
    return createError(res, 401, { error: { message: 'No token provided' } });
  }

  const response = await getCurrentUser({
    token,
  });

  if (response.error) {
    return createError(res, response.error.status, { error: response.error });
  }

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=60, stale-while-revalidate=30'
  );

  const user = {
    id: response.id,
    name: response.display_name,
    imageUrl: response.images[0].url,
    url: response.external_urls.spotify,
    email: response.email,
  };
  return res.status(200).json({ user });
};
