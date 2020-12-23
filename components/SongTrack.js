import styled from 'styled-components';
import Image from 'next/image';
import { rgba } from 'polished';

const SongTrackWrapper = styled.a`
  display: flex;
  padding: 0.5rem;

  border-radius: 8px;

  min-width: 15rem;
  max-width: 28rem;
  transition: 0.1 background-color ease-in-out;
  box-shadow: 0 1px 0 0 ${rgba('#333', 0.12)};
  border: 1px solid ${rgba('#333', 0.12)};
`;

const ImageWrapper = styled.div`
  box-shadow: 0 0 0 1px ${rgba('#333', 0.05)};
  border-radius: 4px;
  width: 4rem;
  height: 4rem;

  img {
    border-radius: 4px;
  }
`;

const SongInfoWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;

  padding: 0.5rem 1rem;

  span {
    display: block;
  }

  span + span {
    padding-top: 0.25rem;
    font-style: italic;
  }
`;

export default function SongTrack({ track }) {
  const { albumImageUrl, songUrl, title, artist } = track;
  return (
    <SongTrackWrapper
      href={songUrl || '#'}
      target="_blank"
      rel="noopener noreferrer"
    >
      <ImageWrapper>
        <Image
          alt="Spotify"
          height={64}
          width={64}
          src={albumImageUrl || '/static/images/track-placeholder.jpg'}
        />
      </ImageWrapper>
      <SongInfoWrapper>
        <span>{title || 'Loading...'}</span>
        <span>{artist}</span>
      </SongInfoWrapper>
    </SongTrackWrapper>
  );
}
