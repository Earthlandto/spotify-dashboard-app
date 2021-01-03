import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import useSWR, { mutate } from 'swr';
import DashboardContent from '../components/DashboardContent';
import Spinner from '../components/UI/Spinner';
import { setCookie } from '../utils/cookies';
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
    if (data && data.token) {
      setCookie('token', data.token, { maxAge: 3600 }); // expires in 1h
      dispatch({ type: 'LOGIN', payload: { token: data.token } });
      mutate('/api/current-spotify-user');
      router.replace({ query: {} }); // Clean code query param
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
