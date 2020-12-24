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
`;

const RankingItem = styled.div`
  display: flex;
  justify-content: center;

  margin-bottom: 0.5rem;

  @media (min-width: 768px) {
    margin-bottom: 0.75rem;
  }
`;

export default function RankingList({ title, children }) {
  const items = children?.map((item, index) => (
    <RankingItem key={index}>{item}</RankingItem>
  ));

  return (
    <div>
      <Title>{title}</Title>
      <StyledRankingList>{items}</StyledRankingList>
    </div>
  );
}
