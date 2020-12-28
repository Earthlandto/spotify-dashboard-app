import querystring from 'querystring';

const {
  SPOTIFY_CLIENT_ID: client_id,
  SPOTIFY_CLIENT_SECRET: client_secret,
  SPOTIFY_REFRESH_TOKEN: refresh_token,
} = process.env;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;
const NOW_PLAYING_ENDPOINT = `https://api.spotify.com/v1/me/player/currently-playing`;
const TOP_TRACKS_ENDPOINT = `https://api.spotify.com/v1/me/top/tracks`;
const TOP_ARTISTS_ENDPOINT = `https://api.spotify.com/v1/me/top/artists`;
const PLAY_USER_PLAYBACK = `https://api.spotify.com/v1/me/player/play`;
const GET_USER_INFO_ENDPOINT = `https://api.spotify.com/v1/me`;
const CREATE_PLAYLIST_ENDPOINT = (userId) =>
  `https://api.spotify.com/v1/users/${userId}/playlists`;
const ADD_TRACKS_TO_PLAYLIST = (playlistId) =>
  `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;

const getAccessToken = async () => {
  const response = await fetch(TOKEN_ENDPOINT, {
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

export const getNowPlaying = async () => {
  const { access_token } = await getAccessToken();

  return fetch(NOW_PLAYING_ENDPOINT, {
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

  return fetch(`${TOP_TRACKS_ENDPOINT}?${queryParams}`, {
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

  return fetch(`${TOP_ARTISTS_ENDPOINT}?${queryParams}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
};

export const getCurrentUser = async () => {
  const { access_token } = await getAccessToken();

  const response = await fetch(GET_USER_INFO_ENDPOINT, {
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
  const url = CREATE_PLAYLIST_ENDPOINT(user.id);

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
  const url = ADD_TRACKS_TO_PLAYLIST(playlistId);

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

export const playTrackList = async (trackIds = []) => {
  const { access_token } = await getAccessToken();

  const response = await fetch(PLAY_USER_PLAYBACK, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${access_token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      uris: trackIds,
    }),
  });

  return {
    ok: response.ok,
    status: response.status,
  };
};
