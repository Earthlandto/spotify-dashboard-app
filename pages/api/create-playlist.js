import { createPlaylist, addTracksToPlaylist } from '../../lib/spotify';
import { createError, createUnauthorizedError } from '../../utils/api-errors';

export default async (req, res) => {
  const { token } = req.cookies;
  const { name, description, trackIds } = req.body;

  if (!token) {
    return createUnauthorizedError(res);
  }

  // Initial validation
  if (!name) {
    return createError(res, 400, {
      message: 'Playlist name is mandatory',
    });
  }

  if (!trackIds || trackIds.length <= 0) {
    return createError(res, 400, {
      message: 'No valid tracks list',
    });
  }

  const playlistResponse = await createPlaylist({
    token,
    playlistName: name,
    description: description || '',
  });

  if (!playlistResponse.ok) {
    const { error } = await playlistResponse.json();
    return createError(res, playlistResponse.status, error);
  }

  const {
    id,
    name: playlistName,
    public: isPublic,
    collaborative,
    external_urls,
  } = await playlistResponse.json();

  const playlist = {
    id,
    collaborative,
    name: playlistName,
    public: isPublic,
    url: external_urls.spotify,
  };

  const addedTracksResponse = await addTracksToPlaylist({
    token,
    trackIds,
    playlistId: playlist.id,
  });

  if (!addedTracksResponse.ok) {
    const { error } = await addedTracksResponse.json();
    return createError(res, addedTracksResponse.status, error);
  }

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=60, stale-while-revalidate=30'
  );

  return res.status(200).json({ playlist });
};
