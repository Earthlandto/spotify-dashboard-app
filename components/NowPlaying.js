import React from 'react';
import useSWR from 'swr';
import fetcher from '../lib/fetcher';
import InfoCard from './UI/InfoCard';
import Title from './UI/Title.styled';
import styled from 'styled-components';

const NowPlayingWrapper = styled.div`
  display: flex;
  justify-content: center;

  padding: 1rem 0;
`;

const StyledTitle = styled(Title)`
  text-align: center;
  margin: 2rem 0 0;
`;

export default function NowPlaying() {
  const { data } = useSWR('/api/now-playing', fetcher, {
    refreshInterval: 30000, // refresh every 30s
  });

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
      <StyledTitle>Now playing</StyledTitle>
      {currentTrack}
    </>
  );
}
