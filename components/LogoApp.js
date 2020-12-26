import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';

const StyledLogoApp = styled.div`
  display: flex;
  align-items: center;
`;

const StyledTitle = styled.span`
  padding-left: 0.5rem;
  color: #fa99cf;
  font-weight: 200;
`;

export default function LogoApp() {
  return (
    <StyledLogoApp>
      <Image
        alt="Spotify Dashboard app"
        height={18}
        width={18}
        src={'/static/icons/spotify-dashboard-icon.png'}
      />
      <StyledTitle>Dashtify</StyledTitle>
    </StyledLogoApp>
  );
}