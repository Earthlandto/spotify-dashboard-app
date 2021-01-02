import querystring from 'querystring';

const {
  SPOTIFY_CLIENT_ID: client_id,
  SPOTIFY_CLIENT_SECRET: client_secret,
  SPOTIFY_REFRESH_TOKEN: refresh_token,
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

const getAccessToken = async () => {
  const response = await fetch(ENDPOINTS.TOKEN, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${basic}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: querystring.stringify({
      grant_type: 'refresh_token',
      refresh_token,
    }),
  });

  return response.json();
};

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

export const getNowPlaying = async () => {
  const { access_token } = await getAccessToken();

  return fetch(ENDPOINTS.NOW_PLAYING, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

export const getTopTracks = async (time_range = 'short_term', limit = 50) => {
  const { access_token } = await getAccessToken();
  const queryParams = querystring.stringify({
    limit,
    time_range,
  });

  return fetch(`${ENDPOINTS.TOP_TRACKS}?${queryParams}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

export const getTopArtists = async (time_range = 'short_term', limit = 50) => {
  const { access_token } = await getAccessToken();
  const queryParams = querystring.stringify({
    limit,
    time_range,
  });

  return fetch(`${ENDPOINTS.TOP_ARTISTS}?${queryParams}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

export const getCurrentUser = async () => {
  const { access_token } = await getAccessToken();

  const response = await fetch(ENDPOINTS.GET_USER_INFO, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  return response.json();
};

export const createPlaylist = async (
  playlistName = 'New Playlist',
  description = ''
) => {
  const { access_token } = await getAccessToken();
  const user = await getCurrentUser();
  const url = ENDPOINTS.CREATE_PLAYLIST(user.id);

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${access_token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: playlistName,
      description,
    }),
  });

  return response.json();
};

export const addTracksToPlaylist = async (playlistId, trackIds = []) => {
  const { access_token } = await getAccessToken();
  const url = ENDPOINTS.ADD_TRACKS_TO_PLAYLIST(playlistId);

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${access_token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      uris: trackIds,
    }),
  });

  return response.json();
};

export const playTrackList = async (trackIds = [], contextId) => {
  const { access_token } = await getAccessToken();

  const response = await fetch(ENDPOINTS.PLAY_USER_PLAYBACK, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${access_token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      uris: trackIds.length ? trackIds : null,
      context_uri: contextId || null,
    }),
  });

  const responseObj = {
    ok: response.ok,
    status: response.status,
  };

  if (!response.ok) {
    responseObj.error = await response.json();
  }

  return responseObj;
};
