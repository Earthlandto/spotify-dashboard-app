import React from 'react';
import UserProfileCard from './UserProfileCard';
import LogoApp from './LogoApp';
import styled from 'styled-components';
import { rgba } from 'polished';

const StyledAppHeader = styled.div`
  min-height: 3rem;
  display: flex;
  justify-content: space-between;

  padding: 0 1.25rem;
  background-color: ${rgba('white', 0.75)};
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.6);
  font-weight: 400;
  font-size: 1rem;
`;

export default function AppHeader() {
  return (
    <StyledAppHeader>
      <LogoApp />
      <UserProfileCard />
    </StyledAppHeader>
  );
}
