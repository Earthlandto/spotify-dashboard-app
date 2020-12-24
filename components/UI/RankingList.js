import React from 'react';
import styled from 'styled-components';
import Title from './Title.styled';
import Spinner from './Spinner';

const StyledRankingList = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;

  margin: 0 auto;
`;

const RankingItem = styled.div`
  display: flex;
  justify-content: center;

  margin-bottom: 0.5rem;

  @media (min-width: 768px) {
    margin-bottom: 0.75rem;
  }
`;

export default function RankingList({ title, isLoading = false, children }) {
  const items = children?.map((item, index) => (
    <RankingItem key={index}>{item}</RankingItem>
  ));

  const content = isLoading ? (
    <Spinner size="large" />
  ) : (
    <StyledRankingList>{items}</StyledRankingList>
  );

  return (
    <div>
      <Title>{title}</Title>
      {content}
    </div>
  );
}
