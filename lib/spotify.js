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
  const response = await fetch(ENDPOINTS.TOKEN, {
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

  return response;
};

export const getNowPlaying = async ({ token }) => {
  return fetch(ENDPOINTS.NOW_PLAYING, {
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

  return fetch(`${ENDPOINTS.TOP_TRACKS}?${queryParams}`, {
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

  return fetch(`${ENDPOINTS.TOP_ARTISTS}?${queryParams}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getCurrentUser = async ({ token }) => {
  const response = await fetch(ENDPOINTS.GET_USER_INFO, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  // FIXME: return response instead of computed json
  return response.json();
};

export const createPlaylist = async ({
  token,
  playlistName = 'New Playlist',
  description = '',
}) => {
  const user = await getCurrentUser();
  const url = ENDPOINTS.CREATE_PLAYLIST(user.id);

  const response = await fetch(url, {
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

  // FIXME: return response instead of computed json
  return response.json();
};

export const addTracksToPlaylist = async ({
  token,
  playlistId,
  trackIds = [],
}) => {
  const url = ENDPOINTS.ADD_TRACKS_TO_PLAYLIST(playlistId);

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      uris: trackIds,
    }),
  });

  // FIXME: return response instead of computed json
  return response.json();
};

export const playTrackList = async ({ token, trackIds = [], contextId }) => {
  const response = await fetch(ENDPOINTS.PLAY_USER_PLAYBACK, {
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

  // FIXME: return response instead of computed json
  const responseObj = {
    ok: response.ok,
    status: response.status,
  };

  if (!response.ok) {
    responseObj.error = await response.json();
  }

  return responseObj;
};
