import React from 'react';
import useSWR from 'swr';
import fetcher from '../lib/fetcher';
import styled from 'styled-components';
import Image from 'next/image';

const StyledUserProfileCard = styled.a`
  display: flex;
  align-items: center;

  &:hover {
    color: #1db954;
  }
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
  const { data } = useSWR('/api/current-spotify-user', fetcher);
  if (!data) {
    return null;
  }

  return (
    <StyledUserProfileCard
      href={data.user.url}
      alt="See user profile in Spotify"
      target="_blank"
      rel="noopener"
    >
      <span>{data.user.name}</span>
      <ImageWrapper>
        <Image
          alt="Spotify Dashboard app"
          height={20}
          width={20}
          src={data.user.imageUrl}
        />
      </ImageWrapper>
    </StyledUserProfileCard>
  );
}
