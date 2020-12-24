import React, { useState } from 'react';
import useSWR from 'swr';
import fetcher from '../lib/fetcher';
import RankingList from './UI/RankingList';
import InfoCard from './UI/InfoCard';
import querystring from 'querystring';
import Title from './UI/Title.styled';
import { StyledInput, StyledLabel, StyledSelect } from './UI/Input.styled';
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

  ${StyledLabel},
  ${StyledSelect} {
    margin: 0.5rem 0.5rem 0 0;
  }

  & > div {
    display: flex;
  }
`;

export default function TopTracks() {
  const [period, setPeriod] = useState('short_term');
  const [maxCount, setMaxCount] = useState(5);
  const queryParams = querystring.stringify({
    period,
    maxCount,
  });
  const { data } = useSWR(`/api/top-tracks?${queryParams}`, fetcher);
  const [minCountValue, maxCountValue] = [0, 50];

  const handleCountChange = (e) => {
    let value = e.target.value || 0;

    if (value < minCountValue) {
      value = 0;
    }
    if (value > maxCountValue) {
      value = 50;
    }
    setMaxCount(value);
  };

  const header = (
    <StyledHeader>
      <Title>
        Your top <strong>songs</strong>
      </Title>
      <div>
        <StyledLabel>
          Show {''}
          <StyledInput
            min={minCountValue}
            max={maxCountValue}
            type="number"
            value={maxCount}
            onChange={handleCountChange}
          />
        </StyledLabel>
        <StyledSelect
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
        >
          <option value="short_term">Last month</option>
          <option value="medium_term">Last 6 months</option>
          <option value="long_term">Lifetime</option>
        </StyledSelect>
      </div>
    </StyledHeader>
  );
  const trackList =
    data &&
    data.tracks.map((track, index) => (
      <InfoCard
        key={index}
        imageUrl={track.albumImageUrl}
        title={track.title}
        subtitle={track.artist}
        url={track.songUrl}
      />
    ));

  return (
    <StyledColumn>
      {header}
      <RankingList isLoading={!data}>{trackList}</RankingList>
    </StyledColumn>
  );
}
