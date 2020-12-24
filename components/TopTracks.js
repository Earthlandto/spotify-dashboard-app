import useSWR from 'swr';
import fetcher from '../lib/fetcher';
import InfoCard from '../components/InfoCard';
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

const StyledInfoCard = styled.div`
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

  const trackList =
    data &&
    data.tracks.map((track) => (
      <StyledInfoCard key={track.songUrl}>
        <InfoCard
          imageUrl={track.albumImageUrl}
          title={track.title || 'Playback stopped'}
          subtitle={track.artist}
          url={track.songUrl}
        />
      </StyledInfoCard>
    ));

  return (
    <>
      <Title>Your top songs</Title>
      <TopTracksWrapper>{trackList}</TopTracksWrapper>
    </>
  );
}
