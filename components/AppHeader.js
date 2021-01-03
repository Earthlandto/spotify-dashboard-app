import React from 'react';
import UserProfileCard from './UserProfileCard';
import LogoApp from './LogoApp';
import styled from 'styled-components';
import { rgba } from 'polished';

const StyledAppHeader = styled.div`
  height: 3rem;
  display: flex;
  justify-content: space-between;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;

  padding: 0 1.25rem;
  background-color: ${rgba('#333', 0.95)};
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.6);
  font-weight: 400;
  font-size: 1rem;
  z-index: 999;
`;

export default function AppHeader() {
  return (
    <StyledAppHeader>
      <LogoApp />
      <UserProfileCard />
    </StyledAppHeader>
  );
}
