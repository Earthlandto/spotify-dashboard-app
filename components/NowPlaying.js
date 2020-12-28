import React from 'react';
import useSWR from 'swr';
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
  const { data } = useSWR('/api/now-playing', {
    refreshInterval: 3000, // refresh every 3s
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
  });
  const shouldShowPlaceholder = !data || data.isLoading;

  const currentTrack = shouldShowPlaceholder ? (
    <InfoCard isPlaceholder={true} />
  ) : (
    <InfoCard
      imageUrl={data.albumImageUrl}
      title={data.title || 'Playback stopped'}
      subtitle={data.artist}
      url={data.songUrl}
    />
  );

  return (
    <>
      <StyledTitle>Now playing</StyledTitle>
      <NowPlayingWrapper>{currentTrack}</NowPlayingWrapper>
    </>
  );
}
