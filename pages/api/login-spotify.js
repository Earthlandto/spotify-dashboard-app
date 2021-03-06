import { login } from '../../lib/spotify';
import { createError } from '../../utils/api-errors';
import { REDIRECT_URI } from '../../constants/spotify';

export default async (req, res) => {
  const code = req.query.code;
  const hostName = req.headers.host;
  const redirectUri = `http://${hostName}${REDIRECT_URI}`;

  // Initial validation
  if (!code) {
    return createError(res, 400, {
      message: 'Spotify provided code is mandatory',
    });
  }

  const response = await login({ code, redirectUri });

  if (!response.ok) {
    const error = await response.json();
    return createError(res, response.status, error);
  }

  const credentials = await response.json();

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=60, stale-while-revalidate=30'
  );
  return res.status(200).json({
    token: credentials.access_token,
    refreshToken: credentials.refresh_token,
  });
};
