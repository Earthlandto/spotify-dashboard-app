import useSWR from 'swr';
import fetcher from '../lib/fetcher';
import SongTrack from '../components/SongTrack';
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

  if (!data) {
    return null;
  }
  return (
    <>
      <Title>Now playing</Title>
      <NowPlayingWrapper>
        <SongTrack track={data || {}} />
      </NowPlayingWrapper>
    </>
  );
}
