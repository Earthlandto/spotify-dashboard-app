import useSWR from 'swr';
import fetcher from '../lib/fetcher';
import InfoCard from '../components/InfoCard';
import styled from 'styled-components';

const NowPlayingWrapper = styled.div`
  display: flex;
  justify-content: center;

  padding: 1rem 0;
`;

const Title = styled.h3`
  text-align: center;
  font-size: 1.75rem;
  margin: 0;
  font-weight: 500;
`;

export default function NowPlaying() {
  const { data } = useSWR('/api/now-playing', fetcher);

  const currentTrack = data && (
    <NowPlayingWrapper>
      <InfoCard
        imageUrl={data.albumImageUrl}
        title={data.title || 'Playback stopped'}
        subtitle={data.artist}
        url={data.songUrl}
      />
    </NowPlayingWrapper>
  );

  return (
    <>
      <Title>Now playing</Title>
      {currentTrack}
    </>
  );
}
