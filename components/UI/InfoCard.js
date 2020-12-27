import React from 'react';
import styled, { css } from 'styled-components';
import Image from 'next/image';
import { rgba } from 'polished';

const StyledCard = styled.a`
  display: flex;
  align-items: center;
  width: 21rem;

  padding: 0.5rem;
  box-shadow: 0 1px 0 0 ${rgba('#333', 0.12)};
  border: 1px solid ${rgba('#333', 0.12)};
  border-radius: 8px;

  transition: 0.1s border-color ease-in-out;

  &:hover {
    border-color: #1db954;
  }

  @media (min-width: 768px) {
    min-width: 15rem;
    max-width: 21rem;
  }
`;

const ImageWrapper = styled.div`
  width: 5rem;
  height: 5rem;

  flex-shrink: 0;

  box-shadow: 0 0 0 1px ${rgba('#333', 0.05)};
  border-radius: 4px;
  background-color: #ececec;

  img {
    border-radius: 4px;
  }
`;

const Text = styled.span`
  display: block;
  font-size: 1rem;

  ${({ clipText }) =>
    clipText
      ? css({
          maxWidth: '13.5rem',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        })
      : null};

  & + & {
    padding-top: 0.25rem;
    font-style: italic;

    @media (min-width: 768px) {
      font-size: 0.875rem;
    }
  }
`;

const InfoWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;

  padding: 0 0.5rem 0 1rem;

  ${Text} {
    ${({ isPlaceholder }) =>
      isPlaceholder
        ? css({
            width: '9rem',
            height: '0.75rem',
            backgroundColor: '#ececec',
          })
        : null};
  }
`;

export default function InfoCard({
  imageUrl,
  url,
  title,
  subtitle,
  isPlaceholder,
}) {
  const subtitleText = subtitle && <Text clipText>{subtitle}</Text>;
  const image = !isPlaceholder && (
    <Image
      alt="Spotify"
      height={80}
      width={80}
      src={imageUrl || '/static/images/track-placeholder.jpg'}
    />
  );

  return (
    <StyledCard
      href={url || '#'}
      target="_blank"
      rel="noopener noreferrer"
      isPlaceholder={isPlaceholder}
    >
      <ImageWrapper>{image}</ImageWrapper>
      <InfoWrapper isPlaceholder={isPlaceholder}>
        <Text alt={title}>{title}</Text>
        {subtitleText}
      </InfoWrapper>
    </StyledCard>
  );
}
