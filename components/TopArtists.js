import useSWR from 'swr';
import fetcher from '../lib/fetcher';
import RankingList from './UI/RankingList';
import InfoCard from './UI/InfoCard';

export default function TopTracks() {
  const { data } = useSWR('/api/top-artists', fetcher);
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
      <RankingList title={title}>{trackList}</RankingList>
    </>
  );
}
