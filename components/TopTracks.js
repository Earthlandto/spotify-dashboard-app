import useSWR from 'swr';
import fetcher from '../lib/fetcher';
import SongTrack from '../components/SongTrack';
import styled from 'styled-components';
import { rgba } from 'polished';

const Title = styled.h3`
  text-align: center;
  font-size: 1.75rem;
  font-weight: 500;
`;

const TopTracksWrapper = styled.div`
  max-width: 60vw;

  display: flex;
  flex-wrap: wrap;

  margin: 0 auto;
`;

const StyledSongTrack = styled.div`
  flex-basis: 47%;
  position: relative;

  margin: 0 0 1.5% 1.5%;
`;

const StyledRanking = styled.span`
  margin: 0.5rem;
  width: 4rem;
  height: 4rem;

  font-weight: bold;
  font-style: italic;
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: text;
  color: ${rgba('#333', 0.5)};
  z-index: 1;
  font-size: 0.75rem;
  transition: 0.1 color ease-in-out;

  &:hover {
    color: ${rgba('#333', 0.8)};

    span {
      background-color: ${rgba('#ccc', 0.5)};
    }
  }

  span {
    border-radius: 50%;
    background-color: ${rgba('#ccc', 0.25)};
    padding: 0.25rem;
    transition: 0.1 background-color ease-in-out;
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
            <StyledRanking>
              <span>#{index + 1}</span>
            </StyledRanking>
            <SongTrack track={track} />
          </StyledSongTrack>
        ))}
      </TopTracksWrapper>
    </>
  );
}
