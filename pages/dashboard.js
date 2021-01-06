import React, { useState, useEffect } from 'react';
import useSWR, { mutate } from 'swr';
import DashboardContent from '../components/DashboardContent';
import Spinner from '../components/UI/Spinner';
import { setCookie } from '../utils/cookies';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { initializeStore } from '../store';

const StyledDashboard = styled.main`
  margin-top: 3rem; /* header height */
  padding: 1.5rem 0 3rem;
`;

export default function Dashboard({ code }) {
  const dispatch = useDispatch();
  const isSessionActive = useSelector((state) => state.isSessionActive);
  const [isCodeUSed, setIsCodeUsed] = useState(false);

  const { data, isValidating } = useSWR(
    code && !isSessionActive && !isCodeUSed
      ? `api/login-spotify?code=${code}`
      : null
  );

  useEffect(() => {
    if (data && data.token) {
      setIsCodeUsed(true);
      setCookie('token', data.token, { maxAge: 3600 }); // expires in 1h
      dispatch({ type: 'LOGIN', payload: { token: data.token } });
      mutate('/api/current-spotify-user');
    }
  }, [isCodeUSed, data, dispatch]);

  const Loading = isValidating && <Spinner />;
  const Content = isSessionActive && <DashboardContent />;

  return (
    <StyledDashboard>
      {Loading}
      {Content}
    </StyledDashboard>
  );
}

export async function getServerSideProps(context) {
  const reduxStore = initializeStore();
  const { dispatch } = reduxStore;

  const { req, query } = context;
  const { code } = query;
  const { token } = req.cookies;

  if (!code && !token) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  if (token) {
    dispatch({
      type: 'LOGIN',
      payload: { token },
    });
  }

  return {
    props: {
      initialReduxState: reduxStore.getState(),
      code: code || null,
    }, // will be passed to the page component as props
  };
}
