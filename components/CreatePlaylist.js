import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import useSWR from 'swr';
import fetcher from '../lib/fetcher';

const StyledCreatePlaylistButton = styled.div`
  height: 2rem;
  min-width: 5.6rem;

  padding: 0.25rem 0.25rem;
  margin: 0.5rem 0 0;

  font-size: 0.875rem;
  background-color: #1db954;
  color: white;
  border: 1px solid #1db954;
  border-radius: 1rem;
  transition: 0.2s border-color ease-in, 0.2s color ease-in,
    0.2s background-color ease-in;

  ${({ inverseColors }) =>
    css({
      color: inverseColors ? '#1db954' : 'white',
      borderColor: inverseColors ? '#1db954' : 'white',
      backgroundColor: inverseColors ? 'white' : '#1db954',
    })};
`;

const FilledElem = styled.span`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: transparent;
  border: 0;
  cursor: pointer;
  color: inherit;
  outline: none;
  text-align: center;
  font-size: inherit;
`;

export default function CreatePlaylist({
  name = 'New Playlist',
  trackIds = [],
}) {
  const [shouldFetch, setShouldFetch] = useState(false);
  const handleSubmit = () => {
    if (!isValidating) {
      setShouldFetch(true);
    }
  };

  useEffect(() => {
    setShouldFetch(false);
  }, [name, trackIds.length]);

  const { data, isValidating } = useSWR(
    shouldFetch ? `/api/create-playlist` : null,
    (url) =>
      fetcher(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          trackIds,
        }),
      })
  );

  const form = !data && (
    <FilledElem as="button" onClick={handleSubmit}>
      + Playlist
    </FilledElem>
  );

  const successMessage = data && (
    <>
      <FilledElem
        as="a"
        href={data.playlist.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        See it 🎉
      </FilledElem>
    </>
  );

  return (
    <StyledCreatePlaylistButton inverseColors={Boolean(data)}>
      {form}
      {successMessage}
    </StyledCreatePlaylistButton>
  );
}
