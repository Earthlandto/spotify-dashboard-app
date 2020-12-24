import styled from 'styled-components';

const Title = styled.h3`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 1rem 0;

  @media (min-width: 768px) {
    text-align: initial;
  }

  strong {
    color: #1db954;
    font-weight: inherit;
    margin: 1.5rem 0;
  }
`;

export default Title;
