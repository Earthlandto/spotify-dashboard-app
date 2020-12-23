import NowPlaying from '../components/NowPlaying';
import TopTracks from '../components/TopTracks';
import styled from 'styled-components';

const Title = styled.h1`
  font-size: 1.8rem;
  font-weight: bold;
  text-align: center;

  @media (min-width: 768px) {
    font-size: 4rem;
    font-weight: 500;
  }

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
