import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';

const StyledSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0.75rem;
`;

export default function Spinner({ size }) {
  let width = 30;
  switch (size) {
    case 'medium':
      width = 40;
      break;
    case 'large':
      width = 74;
      break;
    default:
      // small = 30;
      break;
  }
  return (
    <StyledSpinner>
      <Image
        src="/static/icons/kappa-spinner.svg"
        height={width}
        width={width}
        alt="Loading"
      />
    </StyledSpinner>
  );
}
