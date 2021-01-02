import React from 'react';
import useCookie from 'react-use-cookie';
import { useRouter } from 'next/router';
import styled from 'styled-components';

const StyledLogoutButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 0.25rem 0.35rem;

  border: 1px solid transparent;
  border-radius: 4px;
  background: transparent;
  font-size: inherit;
  color: white;
  outline: none;
  transition: 0.2s border-color ease-in, 0.2s color ease-in;

  &:hover,
  &:focus,
  &:active {
    border-color: #1db954;
    color: #1db954;
  }
`;

export default function LogoutButton({ children }) {
  const router = useRouter();
  const [, setUserToken] = useCookie('token');

  const handleLogout = () => {
    // Remove a cookie by setting the expiration date in the past
    setUserToken(null, { days: -1 });
    router.push('/');
  };

  return (
    <StyledLogoutButton onClick={handleLogout}>
      {children || 'Logout'}
    </StyledLogoutButton>
  );
}
