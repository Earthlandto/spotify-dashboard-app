import { playTrackList } from '../../lib/spotify';
import { createError, createUnauthorizedError } from '../../utils/api-errors';

export default async (req, res) => {
  const { trackIds, contextId } = req.body;
  const { token } = req.cookies;

  if (!token) {
    return createUnauthorizedError(res);
  }

  // Initial validation
  if (contextId && 'string' !== typeof contextId) {
    return createError(res, 400, {
      status: 400,
      message: 'No valid context type',
    });
  }

  if (trackIds && !Array.isArray(trackIds)) {
    return createError(res, 400, {
      status: 400,
      message: 'Track list must be an array',
    });
  }

  const response = await playTrackList({ token, trackIds, contextId });

  if (!response.ok) {
    return createError(res, response.status, response.error);
  }

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=60, stale-while-revalidate=30'
  );

  return res.status(200).json({ success: true });
};
