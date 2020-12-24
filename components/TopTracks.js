import useSWR from 'swr';
import fetcher from '../lib/fetcher';
import RankingList from './UI/RankingList';
import InfoCard from './UI/InfoCard';

export default function TopTracks() {
  const { data } = useSWR('/api/top-tracks', fetcher);
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
      <RankingList title={title}>{trackList}</RankingList>
    </>
  );
}
