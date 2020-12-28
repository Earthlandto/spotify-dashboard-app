import { playTrackList } from '../../lib/spotify';
import { createError } from '../../utils/api-errors';

export default async (req, res) => {
  const { trackIds } = req.body;

  // Initial validation
  if (!trackIds || trackIds.length <= 0) {
    return createError(res, 400, {
      status: 400,
      message: 'No valid tracks list',
    });
  }

  const response = await playTrackList(trackIds);

  if (!response.ok) {
    return createError(res, response.status, response);
  }

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=60, stale-while-revalidate=30'
  );

  return res.status(200).json({ success: true });
};
