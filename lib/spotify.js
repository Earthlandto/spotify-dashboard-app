import querystring from 'querystring';

const {
  SPOTIFY_CLIENT_ID: client_id,
  SPOTIFY_CLIENT_SECRET: client_secret,
} = process.env;

const ENDPOINTS = {
  TOKEN: `https://accounts.spotify.com/api/token`,
  NOW_PLAYING: `https://api.spotify.com/v1/me/player/currently-playing`,
  TOP_TRACKS: `https://api.spotify.com/v1/me/top/tracks`,
  TOP_ARTISTS: `https://api.spotify.com/v1/me/top/artists`,
  PLAY_USER_PLAYBACK: `https://api.spotify.com/v1/me/player/play`,
  GET_USER_INFO: `https://api.spotify.com/v1/me`,
  CREATE_PLAYLIST: (userId) =>
    `https://api.spotify.com/v1/users/${userId}/playlists`,
  ADD_TRACKS_TO_PLAYLIST: (playlistId) =>
    `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
};

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');

export const login = async ({ code = '', redirectUri = '' }) => {
  return await fetch(ENDPOINTS.TOKEN, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: querystring.stringify({
      code,
      grant_type: 'authorization_code',
      redirect_uri: redirectUri,
    }),
  });
};

export const getNowPlaying = async ({ token }) => {
  return await fetch(ENDPOINTS.NOW_PLAYING, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getTopTracks = async ({
  token,
  timeRange = 'short_term',
  limit = 50,
}) => {
  const queryParams = querystring.stringify({
    limit,
    time_range: timeRange,
  });

  return await fetch(`${ENDPOINTS.TOP_TRACKS}?${queryParams}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getTopArtists = async ({
  token,
  timeRange = 'short_term',
  limit = 50,
}) => {
  const queryParams = querystring.stringify({
    limit,
    time_range: timeRange,
  });

  return await fetch(`${ENDPOINTS.TOP_ARTISTS}?${queryParams}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getCurrentUser = async ({ token }) => {
  return await fetch(ENDPOINTS.GET_USER_INFO, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createPlaylist = async ({
  token,
  playlistName = 'New Playlist',
  description = '',
}) => {
  const userResponse = await getCurrentUser({ token });
  const user = await userResponse.json();
  const url = ENDPOINTS.CREATE_PLAYLIST(user.id);

  return await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: playlistName,
      description,
    }),
  });
};

export const addTracksToPlaylist = async ({
  token,
  playlistId,
  trackIds = [],
}) => {
  const url = ENDPOINTS.ADD_TRACKS_TO_PLAYLIST(playlistId);

  return await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      uris: trackIds,
    }),
  });
};

export const playTrackList = async ({ token, trackIds = [], contextId }) => {
  return await fetch(ENDPOINTS.PLAY_USER_PLAYBACK, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      uris: trackIds.length ? trackIds : null,
      context_uri: contextId || null,
    }),
  });
};
