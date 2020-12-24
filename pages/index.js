import NowPlaying from '../components/NowPlaying';
import TopTracks from '../components/TopTracks';
import TopArtists from '../components/TopArtists';
import Title from '../components/UI/Title.styled';
import styled from 'styled-components';

const StyledTitle = styled(Title)`
  font-size: 1.8rem;
  font-weight: bold;
  text-align: center;

  @media (min-width: 768px) {
    font-size: 4rem;
    font-weight: 500;
  }
`;

const StyledRankings = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: center;
    min-width: 20rem;

    & > * + * {
      margin-left: 1.25rem;
    }
  }
`;

export default function Home() {
  return (
    <div>
      <main>
        <StyledTitle as="h1">
          Your <strong>Spotify</strong> Dashboard
        </StyledTitle>

        <NowPlaying />

        <StyledRankings>
          <TopTracks />
          <TopArtists />
        </StyledRankings>
      </main>
    </div>
  );
}
