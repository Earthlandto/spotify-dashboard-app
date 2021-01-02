import React from 'react';
import useSWR from 'swr';
import styled from 'styled-components';
import LogoutButton from './LogoutButton';

const StyledUserProfileCard = styled.div`
  display: flex;
  align-items: center;
`;

const ImageWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 0.5rem;

  img {
    border-radius: 2px;
  }
`;

export default function UserProfileCard() {
  const { data } = useSWR('/api/current-spotify-user', {
    revalidateOnReconnect: true,
  });

  if (!data || !data.user) {
    return null;
  }

  return (
    <StyledUserProfileCard>
      <LogoutButton>
        <span>
          Logout <strong>{data.user.name}</strong>
        </span>
        <ImageWrapper>
          <img
            alt="Spotify Dashboard app"
            height={20}
            width={20}
            src={data.user.imageUrl}
          />
        </ImageWrapper>
      </LogoutButton>
    </StyledUserProfileCard>
  );
}
