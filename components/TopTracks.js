import React, { useState } from 'react';
import useSWR from 'swr';
import RankingList from './UI/RankingList';
import InfoCard from './UI/InfoCard';
import querystring from 'querystring';
import Title from './UI/Title.styled';
import TopRankingButtons from './TopRankingButtons';
import CreatePlaylist from './CreatePlaylist';
import PlayTrack from './PlayTrack';
import styled from 'styled-components';
import { PERIODS, PERIOD_MESSAGES } from '../constants/spotify';

const StyledColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledHeader = styled.div`
  margin: 1.5rem 0 1rem;
  min-width: 21rem;

  ${Title} {
    margin: 0;
  }
`;

const FlexWrapper = styled.div`
  display: flex;
  justify-content: center;

  @media (min-width: 768px) {
    padding-left: 0.25rem;
  }
`;

const RelativeWrapper = styled.div`
  position: relative;
`;

export default function TopTracks() {
  const [options, setOptions] = useState({
    limit: 5,
    period: PERIODS.SHORT,
  });
  const queryParams = querystring.stringify(options);
  const { data, isValidating } = useSWR(`/api/top-tracks?${queryParams}`);
  const trackIds = data && data.tracks.map((track) => track.uri);
  const playlistName = `Top ${options.limit} songs for ${
    PERIOD_MESSAGES[options.period]
  }`;

  const header = (
    <StyledHeader>
      <Title>
        Your top <strong>songs</strong>
      </Title>
      <FlexWrapper>
        <TopRankingButtons
          defaultLimit={options.limit}
          defaultPeriod={options.period}
          onChange={setOptions}
        />
        <CreatePlaylist trackIds={trackIds} name={playlistName} />
      </FlexWrapper>
    </StyledHeader>
  );
  const trackList = data?.tracks?.map((track, index) => (
    <RelativeWrapper key={index}>
      <InfoCard
        imageUrl={track.albumImageUrl}
        title={track.title}
        subtitle={track.artist}
        url={track.songUrl}
      />
      <PlayTrack trackId={track.uri} />
    </RelativeWrapper>
  ));

  const placeholderList = [1, 2, 3, 4, 5].map((i) => (
    <InfoCard isPlaceholder={true} key={i} />
  ));

  return (
    <div>
      <StyledColumn>
        {header}
        <RankingList>{isValidating ? placeholderList : trackList}</RankingList>
      </StyledColumn>
    </div>
  );
}
