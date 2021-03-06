import { getNowPlaying } from '../../lib/spotify';
import { createUnauthorizedError } from '../../utils/api-errors';

export default async (req, res) => {
  const { token } = req.cookies;

  if (!token) {
    return createUnauthorizedError(res);
  }

  const response = await getNowPlaying({ token });

  if (!response.ok || response.status === 204) {
    // TODO: if the response is not OK, API should return an error and the client
    // should deal with it by displaying "not playing" message
    return res.status(200).json({ isPlaying: false });
  }

  const { item, is_playing: isPlaying } = await response.json();

  if (!item) {
    return res.status(200).json({ isLoading: true });
  }

  const artist = item.artists.map((_artist) => _artist.name).join(', ');
  const album = item.album;
  const albumImageUrl = album.images[0].url;
  const songUrl = item.external_urls.spotify;

  res.setHeader(
    'Cache-Control',
    'public, s-maxage=60, stale-while-revalidate=30'
  );

  return res.status(200).json({
    isPlaying,
    albumImageUrl,
    songUrl,
    artist,
    title: item.name,
    album: album.name,
  });
};
