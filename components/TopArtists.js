import React, { useState } from 'react';
import useSWR from 'swr';
import fetcher from '../lib/fetcher';
import RankingList from './UI/RankingList';
import InfoCard from './UI/InfoCard';
import querystring from 'querystring';
import Title from './UI/Title.styled';
import TopRankingButtons from './TopRankingButtons';
import styled from 'styled-components';

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
    period: 'short_term',
  });
  const queryParams = querystring.stringify(options);
  const { data } = useSWR(`/api/top-artists?${queryParams}`, fetcher);

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

  const artistList =
    data &&
    data.artists.map((artist, index) => (
      <InfoCard
        key={index}
        imageUrl={artist.imageUrl}
        title={artist.name}
        url={artist.artistUrl}
      />
    ));

  return (
    <StyledColumn>
      {header}
      <RankingList isLoading={!data}>{artistList}</RankingList>
    </StyledColumn>
  );
}
