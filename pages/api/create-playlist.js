import { createPlaylist, addTracksToPlaylist } from '../../lib/spotify';
import { createError } from '../../utils/api-errors';

export default async (req, res) => {
  const { trackIds, name } = req.body;

  // Initial validation
  if (!name) {
    return createError(res, 400, {
      status: 400,
      message: 'Name is mandatory',
    });
  }

  if (!trackIds || trackIds.length <= 0) {
    return createError(res, 400, {
      status: 400,
      message: 'No valid tracks list',
    });
  }

  const playlistResponse = await createPlaylist();

  if (playlistResponse.error) {
    return createError(
      res,
      playlistResponse.error.status,
      playlistResponse.error
    );
  }

  const addedTracksResponse = await addTracksToPlaylist(
    playlistResponse.id,
    trackIds
  );

  if (addedTracksResponse.error) {
    return createError(
      res,
      addedTracksResponse.error.status,
      addedTracksResponse.error
    );
  }

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=60, stale-while-revalidate=30'
  );

  const playlist = {
    id: playlistResponse.id,
    name: playlistResponse.name,
    public: playlistResponse.public,
    collaborative: playlistResponse.collaborative,
    url: playlistResponse.external_urls.spotify,
  };

  return res.status(200).json({ playlist });
};
