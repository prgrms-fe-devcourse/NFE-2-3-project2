import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router";
import UserAvatar from "../components/common/UserAvatar";
import { useAllUserStore } from "../store/allUserStore";
import { useChannelStore } from "../store/channelStore";
import SucodingAd from "../components/Home/SucodingAd";
import IndistreetAd from "../components/Home/IndistreetAd";
import { useWeekArtistStore } from "../store/weekArtist";
import RecentPost from "../components/Home/RecentPost";
import { getChannelPosts } from "../api/post";

export default function Home() {
  const weekArtists = useWeekArtistStore((state) => state.weekArtists);
  const pickedDate = useWeekArtistStore((state) => state.pickedDate);
  const getUsers = useAllUserStore((state) => state.getUsers);
  const pickWeekArtists = useWeekArtistStore((state) => state.pickWeekArtists);
  const getChannels = useChannelStore((state) => state.getChannels);
  const [channelPosts, setChannelPosts] = useState<
    Record<string, ChannelPosts>
  >({}); // 채널별 포스트 저장

  useEffect(() => {
    const fetchPostsForChannels = async () => {
      const channels = await getChannels();

      const channelIds = channels.slice(0, 10).map((channel: Channel) => ({
        id: channel._id,
        name: channel.name,
      }));

      const results: Record<string, ChannelPosts> = {};
      await Promise.all(
        channelIds.map(async (channel) => {
          const result = await getChannelPosts(channel.id);
          if (result) {
            const sortedPosts = result
              .sort(
                (a: Post, b: Post) =>
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime()
              )
              .slice(0, 4);
            results[channel.id] = { posts: sortedPosts, name: channel.name };
          } else {
            results[channel.id] = { posts: [], name: channel.name };
          }
        })
      );
      setChannelPosts(results);
    };

    const updateWeekArtists = async () => {
      const users = await getUsers();
      const diffInMs = new Date().getTime() - new Date(pickedDate).getTime();
      const diffInWeek = diffInMs / 1000 / 60 / 60 / 24 / 7; // 일주일
      if (weekArtists.length === 0 || diffInWeek >= 1) {
        pickWeekArtists(users);
      }
    };

    fetchPostsForChannels();
    updateWeekArtists();
  }, []);

  return (
    <section className="mx-auto py-10 flex-col flex w-[952px] gap-24 overflow-y-auto">
      {/* 금주의 아티스트 */}
      <section>
        <div className="mb-3">
          <span className="text-2xl font-semibold">금주의 </span>
          <span className="text-highlight text-2xl font-semibold">
            아티스트
          </span>
        </div>
        <div className="flex flex-wrap justify-between px-2">
          {weekArtists.map((artist) => (
            <Link to={`/user/${artist._id}`} key={artist._id}>
              <UserAvatar name={artist.fullName} image={artist.image} />
            </Link>
          ))}
        </div>
      </section>

      {/* 채널별 섹션 및 광고 */}
      {Object.entries(channelPosts)
        .sort()
        .filter(([, { posts }]) => posts.length > 0)
        .map(([channelId, { posts, name }]: [string, ChannelPosts], index) => (
          <Fragment key={`recent-${channelId}`}>
            {/* 채널 섹션 */}
            <section>
              <div className="mb-3">
                <span className="text-2xl font-semibold">최근 </span>
                <span className="text-primary text-2xl font-semibold">
                  {name}
                </span>
                <span className="text-2xl font-semibold"> 포스트</span>
              </div>
              <section className="flex flex-wrap gap-10">
                {posts
                  .filter((post: Post) => post.title.includes("{")) // 중괄호 포함된 title만 필터링
                  .map((post: Post) => (
                    <RecentPost key={post._id} post={post} channelName={name} />
                  ))}
              </section>
            </section>
            {index === 2 && <SucodingAd />}
          </Fragment>
        ))}
      <IndistreetAd />
    </section>
  );
}
