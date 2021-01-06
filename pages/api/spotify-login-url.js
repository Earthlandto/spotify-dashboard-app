import querystring from 'querystring';
import { REDIRECT_URI } from '../../constants/spotify';

// TODO: This might be stored in a config or constant file
const scopes = [
  'user-read-private',
  'user-read-email',
  'user-top-read',
  'user-read-currently-playing',
  'user-read-playback-state',
  'user-modify-playback-state',
  'playlist-modify-public',
];
const { SPOTIFY_CLIENT_ID: client_id } = process.env;

export default async (req, res) => {
  const hostName = req.headers.host;
  const redirectURL = 'https://accounts.spotify.com/authorize';
  const options = querystring.stringify({
    client_id,
    scope: scopes.join(' '),
    response_type: 'code',
    redirect_uri: `http://${hostName}${REDIRECT_URI}`,
    show_dialog: true,
  });
  const location = `${redirectURL}?${options}`;

  return res.status(200).json({ url: location });
};
