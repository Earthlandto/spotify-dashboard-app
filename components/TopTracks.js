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
  const { data } = useSWR(`/api/top-tracks?${queryParams}`, fetcher);
  const title = (
    <>
      Your top <strong>songs</strong>
    </>
  );
  const trackList =
    data &&
    data.tracks.map((track, index) => (
      <InfoCard
        key={index}
        imageUrl={track.albumImageUrl}
        title={track.title}
        subtitle={track.artist}
        url={track.songUrl}
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
