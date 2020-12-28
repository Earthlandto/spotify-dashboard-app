import React from 'react';
import styled from 'styled-components';
import fetcher from '../lib/fetcher';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';

const StyledPlayTrack = styled.button`
  position: absolute;

  bottom: 0;
  right: 0;
  padding: 0.5rem;
  border: 0;
  background-color: transparent;
  cursor: pointer;
  outline: none;
`;

export default function CreatePlaylist({ trackIds }) {
  const playTrack = () => {
    fetcher('/api/play-track-list', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        trackIds,
      }),
    });
  };

  return (
    <StyledPlayTrack onClick={playTrack}>
      <FontAwesomeIcon icon={faPlayCircle} color="#1db954" />
    </StyledPlayTrack>
  );
}
