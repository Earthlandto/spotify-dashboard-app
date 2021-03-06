import React from 'react';
import styled, { css, keyframes } from 'styled-components';
import Image from 'next/image';
import { rgba } from 'polished';

const animatedBackground = keyframes`
 from {
    background-position: 0 0;
  }
  to {
    background-position: 800px 0;
  }
`;

const animatedElement = css`
  animation: ${animatedBackground} 10s linear infinite;
  background-repeat: repeat;
  background-position: 0px 0px;
  background-image: linear-gradient(
    90deg,
    #1db954 0%,
    ${rgba('#1db954', 0.9)} 25%,
    ${rgba('#1db954', 0.8)} 50%,
    ${rgba('#1db954', 0.9)} 75%,
    #1db954 100%
  );
`;

const StyledCard = styled.a`
  display: flex;
  align-items: center;
  width: 21rem;

  padding: 0.5rem;
  background-color: #3a3a3a;
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

  ${({ isPlaceholder }) => (isPlaceholder ? animatedElement : null)};

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
        ? css`
            ${animatedElement};
            width: 9rem;
            height: 0.75rem;
          `
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
    <StyledCard href={url || '#'} target="_blank" rel="noopener noreferrer">
      <ImageWrapper isPlaceholder={isPlaceholder}>{image}</ImageWrapper>
      <InfoWrapper isPlaceholder={isPlaceholder}>
        <Text alt={title}>{title}</Text>
        {subtitleText}
      </InfoWrapper>
    </StyledCard>
  );
}
