import styled, { css } from 'styled-components';

export const Button = styled.button`
  padding: 0.25rem 0.5rem;

  border-radius: 1rem;
  font-size: inherit;
  outline: none;
  transition: 0.2s border-color ease-in, 0.2s color ease-in,
    0.2s background-color ease-in;

  ${({ color, bgColor, fontSize }) =>
    css({
      color: color || 'white',
      border: `1px solid ${color || 'transparent'}`,
      backgroundColor: bgColor || '#1db954',
      fontSize: fontSize || 'inherit',
    })};

  &:hover {
    color: #1db954;
    border-color: white;
    background-color: white;
  }
`;
