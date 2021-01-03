import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import useSWR, { mutate } from 'swr';
import DashboardContent from '../components/DashboardContent';
import Spinner from '../components/UI/Spinner';
import { getCookie, setCookie } from '../utils/cookies';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';

const StyledDashboard = styled.main`
  margin-top: 3rem; /* header height */
  padding: 1.5rem 0 3rem;
`;

export default function Dashboard() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { code } = router.query;
  const isSessionActive = useSelector((state) => state.isSessionActive);

  const { data, isValidating } = useSWR(
    code && !isSessionActive ? `api/login-spotify?code=${code}` : null
  );

  useEffect(() => {
    let token = null;

    if (data && data.token) {
      token = data.token;
      mutate('/api/current-spotify-user');
      setCookie('token', token, { maxAge: 3600 }); // expires in 1h
      router.replace({ query: {} }); // Clean code query param
    }

    if (!token) {
      token = getCookie('token');
    }

    if (token) {
      dispatch({ type: 'LOGIN', payload: { token: token } });
    }
  });

  const Loading = isValidating && <Spinner />;
  const Content = isSessionActive && <DashboardContent />;

  return (
    <StyledDashboard>
      {Loading}
      {Content}
    </StyledDashboard>
  );
}

export async function getServerSideProps({ req, query }) {
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

  return {
    props: {}, // will be passed to the page component as props
  };
}
