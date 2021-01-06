import React from 'react';
import Link from 'next/link';
import LoginButton from '../components/LoginButton';
import { Button } from '../components/UI/Button.styles';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpotify } from '@fortawesome/free-brands-svg-icons';
import { faHeartbeat } from '@fortawesome/free-solid-svg-icons';
import { initializeStore } from '../store';

const StyledMain = styled.main`
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  background-color: #333333;
  background-image: linear-gradient(180deg, #333333 0%, #1db954 100%);
`;

const StyledInfo = styled.div`
  max-width: 350px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;

  padding: 1rem 0;

  & + & {
    padding-top: 0;
  }

  svg:nth-child(2) {
    margin: 0 0.5rem;
  }
`;

export default function Index() {
  const isSessionActive = useSelector((state) => state.isSessionActive);
  const buttonStylesProps = {
    color: 'white',
    bgColor: 'transparent',
  };

  const Content = isSessionActive ? (
    <Link href="/dashboard">
      <Button {...buttonStylesProps}>Go to your dashboard</Button>
    </Link>
  ) : (
    <LoginButton {...buttonStylesProps} />
  );
  return (
    <StyledMain>
      <StyledInfo>
        <FontAwesomeIcon icon={faSpotify} color="#1db954" size="5x" />
        <FontAwesomeIcon icon={faHeartbeat} color="white" size="2x" />
        <FontAwesomeIcon icon={faSpotify} color="#fa99cf" size="5x" />
      </StyledInfo>
      <StyledInfo as="p">
        Connect your Spotify account to know more info about your activity in
        Spotify
      </StyledInfo>
      {Content}
    </StyledMain>
  );
}

export async function getServerSideProps(context) {
  const reduxStore = initializeStore();
  const { dispatch } = reduxStore;
  const { token } = context.req.cookies;

  if (token) {
    dispatch({
      type: 'LOGIN',
      payload: { token },
    });
  }

  return {
    props: {
      initialReduxState: reduxStore.getState(),
    }, // will be passed to the page component as props
  };
}
