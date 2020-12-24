import React from 'react';
import useSWR from 'swr';
import fetcher from '../lib/fetcher';
import RankingList from './UI/RankingList';
import InfoCard from './UI/InfoCard';
import querystring from 'querystring';

export default function TopTracks() {
  const queryParams = querystring.stringify({
    period: 'long_term',
    maxCount: '5',
  });
  const { data } = useSWR(`/api/top-artists?${queryParams}`, fetcher);
  const title = (
    <>
      Your top <strong>artists</strong>
    </>
  );

  const trackList =
    data &&
    data.artists.map((artist, index) => (
      <InfoCard
        key={index}
        imageUrl={artist.imageUrl}
        title={artist.name}
        url={artist.artistUrl}
      />
    ));

  return (
    <>
      <RankingList title={title} isLoading={!data}>
        {trackList}
      </RankingList>
    </>
  );
}
