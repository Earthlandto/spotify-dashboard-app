import NowPlaying from '../components/NowPlaying';
import TopTracks from '../components/TopTracks';
import TopArtists from '../components/TopArtists';
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

const StyledRankings = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: center;

    & > * + * {
      margin-left: 1.25rem;
    }
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

        <StyledRankings>
          <TopTracks />
          <TopArtists />
        </StyledRankings>
      </main>
    </div>
  );
}
