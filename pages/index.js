import NowPlaying from '../components/NowPlaying';
import TopTracks from '../components/TopTracks';
import styled from 'styled-components';

const Title = styled.h1`
  color: black;
  font-size: 4rem;
  text-align: center;

  font-weight: 500;

  strong {
    color: #1db954;
    font-weight: inherit;
  }
`;

export default function Home() {
  return (
    <div>
      <main>
        <Title>
          Your <strong>Spotify</strong> Dashboard
        </Title>

        <NowPlaying />

        <TopTracks />
      </main>
    </div>
  );
}
