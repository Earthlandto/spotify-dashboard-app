import React, { useState } from 'react';
import useSWR from 'swr';
import fetcher from '../lib/fetcher';
import RankingList from './UI/RankingList';
import InfoCard from './UI/InfoCard';
import querystring from 'querystring';
import Title from './UI/Title.styled';
import TopRankingButtons from './TopRankingButtons';
import styled from 'styled-components';
import { PERIODS } from '../constants/spotify';

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

export default function TopTracks() {
  const [options, setOptions] = useState({
    limit: 5,
    period: PERIODS.SHORT,
  });
  const queryParams = querystring.stringify(options);
  const { data, isValidating } = useSWR(
    `/api/top-artists?${queryParams}`,
    fetcher
  );

  const header = (
    <StyledHeader>
      <Title>
        Your top <strong>artists</strong>
      </Title>
      <TopRankingButtons
        defaultLimit={options.limit}
        defaultPeriod={options.period}
        onChange={setOptions}
      />
    </StyledHeader>
  );

  const artistList = data?.artists?.map((artist, index) => (
    <InfoCard
      key={index}
      imageUrl={artist.imageUrl}
      title={artist.name}
      url={artist.artistUrl}
    />
  ));

  const placeholderList = [1, 2, 3, 4, 5].map((i) => (
    <InfoCard isPlaceholder={true} key={i} />
  ));

  return (
    <StyledColumn>
      {header}
      <RankingList>{isValidating ? placeholderList : artistList}</RankingList>
    </StyledColumn>
  );
}
