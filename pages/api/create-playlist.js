import { createPlaylist, addTracksToPlaylist } from '../../lib/spotify';

export default async (req, res) => {
  const { trackIds, name } = req.body;

  if (!name) {
    return res.status(400).json({
      status: 400,
      message: 'Name is mandatory',
    });
  }

  if (!trackIds || trackIds.length <= 0) {
    return res.status(400).json({
      status: 400,
      message: 'No valid tracks list',
    });
  }

  const playlistResponse = await createPlaylist(name);

  if (!playlistResponse.id || playlistResponse.error) {
    return res.status(playlistResponse.error.status).json(playlistResponse);
  }

  const addedTracksResponse = await addTracksToPlaylist(
    playlistResponse.id,
    trackIds
  );

  if (addedTracksResponse.error) {
    return res
      .status(addedTracksResponse.error.status)
      .json(addedTracksResponse);
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
