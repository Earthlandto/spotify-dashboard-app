import React from 'react';
import UserProfileCard from './UserProfileCard';
import LogoApp from './LogoApp';
import LogoutButton from './LogoutButton';
import styled from 'styled-components';
import { rgba } from 'polished';
import useCookie from 'react-use-cookie';

const StyledAppHeader = styled.div`
  min-height: 3rem;
  display: flex;
  justify-content: space-between;

  padding: 0 1.25rem;
  background-color: ${rgba('#333', 0.15)};
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.6);
  font-weight: 400;
  font-size: 1rem;
`;

export default function AppHeader() {
  const [userToken] = useCookie('token');
  const ProfileSection = userToken && (
    <div>
      <LogoutButton />
      <UserProfileCard />
    </div>
  );
  return (
    <StyledAppHeader>
      <LogoApp />
      {ProfileSection}
    </StyledAppHeader>
  );
}
