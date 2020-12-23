import useSWR from 'swr';
import fetcher from '../lib/fetcher';
import SongTrack from '../components/SongTrack';
import styled from 'styled-components';

const Title = styled.h3`
  text-align: center;
  font-size: 1.75rem;
  font-weight: 500;
`;

const TopTracksWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;

  margin: 0 auto;

  @media (min-width: 768px) {
    max-width: 60vw;
    flex-wrap: wrap;
    flex-direction: row;
  }
`;

const StyledSongTrack = styled.div`
  display: flex;
  justify-content: center;

  margin-bottom: 0.5rem;

  @media (min-width: 768px) {
    margin: 0 0 1.5% 1.5%;
    display: block;
  }
`;

export default function TopTracks() {
  const { data } = useSWR('/api/top-tracks', fetcher);

  if (!data) {
    return null;
  }

  return (
    <>
      <Title>Your top songs</Title>
      <TopTracksWrapper>
        {data.tracks.map((track, index) => (
          <StyledSongTrack key={track.songUrl}>
            <SongTrack track={track} />
          </StyledSongTrack>
        ))}
      </TopTracksWrapper>
    </>
  );
}
