import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFan } from '@fortawesome/free-solid-svg-icons';

const StyledSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0.75rem;
`;

export default function Spinner(props) {
  return (
    <StyledSpinner>
      <FontAwesomeIcon icon={faFan} color="#1db954" size="2x" spin {...props} />
    </StyledSpinner>
  );
}
