import styled from 'styled-components';

const Title = styled.h3`
  text-align: center;
  font-size: 1.75rem;
  font-weight: 500;
`;

const StyledRankingList = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  justify-content: center;

  margin: 0 auto;

  @media (min-width: 768px) {
    max-width: 60vw;
    flex-wrap: wrap;
    flex-direction: row;
  }
`;

const RankingItem = styled.div`
  display: flex;
  justify-content: center;

  margin-bottom: 0.5rem;

  @media (min-width: 768px) {
    margin: 0 0 1.5% 1.5%;
    display: block;
  }
`;

export default function RankingList({ title, children }) {
  const items = children?.map((item, index) => (
    <RankingItem key={index}>{item}</RankingItem>
  ));

  return (
    <RankingItem>
      <Title>{title}</Title>
      <StyledRankingList>{items}</StyledRankingList>
    </RankingItem>
  );
}
