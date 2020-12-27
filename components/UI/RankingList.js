import React from 'react';
import styled from 'styled-components';
import Title from './Title.styled';

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

const EmptyContentMessage = styled.p`
  padding: 2rem 1rem;
  margin: 0;
  text-align: center;
`;

export default function RankingList({ title, children }) {
  const header = title && <Title>{title}</Title>;
  const items = children?.map((item, index) => (
    <RankingItem key={index}>{item}</RankingItem>
  ));

  const content = children ? (
    <StyledRankingList>{items}</StyledRankingList>
  ) : (
    <EmptyContentMessage>Empty ranking</EmptyContentMessage>
  );

  return (
    <div>
      {header}
      {content}
    </div>
  );
}
