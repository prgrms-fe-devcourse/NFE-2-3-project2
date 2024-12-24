import { useParams } from "react-router";
import PostCard from "../components/common/PostCard";
import { useChannelStore } from "../store/channelStore";
import { useEffect, useState } from "react";
import Loading from "../components/common/Loading";
import SortButton from "../components/Dashboard/SortButton";
import NewPostButton from "../components/Header/NewPostButton";
import { DASHBOARD_TEXT, SORT_OPTIONS } from "../constants/dashboard";
import useGetChannelPosts from "../hooks/useGetChannelPosts";

export default function Dashboard() {
  const { channelName } = useParams();
  const getIdFromName = useChannelStore((state) => state.getIdFromName);

  const [sortedPosts, setSortedPosts] = useState<Post[]>([]);
  const [sortOption, setSortOption] = useState<string>(SORT_OPTIONS[0].id);
  const [channelId, setChannelId] = useState<string>();

  const { data: posts, loading, error } = useGetChannelPosts(channelId);

  // 선택된 채널 찾기 및 해당 채널의 포스트 불러오기
  useEffect(() => {
    const fetchChannelId = async () => {
      if (!channelName) return;

      const id = await getIdFromName(channelName);
      setChannelId(id);
    };

    fetchChannelId();
  }, [channelName]);

  // 포스트 정렬 로직
  useEffect(() => {
    let tempPosts = [...posts];
    switch (sortOption) {
      case "latest":
        tempPosts = posts; // 원래 순서 유지
        break;
      case "popular":
        tempPosts.sort((a, b) => b.likes.length - a.likes.length);
        break;
      case "comments":
        tempPosts.sort((a, b) => b.comments.length - a.comments.length);
        break;
    }
    setSortedPosts(tempPosts);
  }, [posts, sortOption]);

  if (loading || error) {
    return (
      <section className="w-[934px] mx-auto flex items-center justify-center">
        {loading && <Loading />}
        {error && (
          <p className="text-lg font-medium text-gray-54 dark:text-gray-c8">
            {DASHBOARD_TEXT.error}
          </p>
        )}
      </section>
    );
  }

  return (
    <section className="mx-auto w-[934px] my-10">
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-3xl font-bold">{channelName}</h2>
        <SortButton
          currentSort={sortOption}
          onSortChange={(option) => setSortOption(option)}
        />
      </div>
      {posts.length > 0 ? (
        <section className="grid grid-cols-2 gap-10">
          {sortedPosts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </section>
      ) : (
        <section className="flex flex-col items-center justify-center text-center gap-4 h-[50vh] text-lg text-gray-54 dark:text-gray-c8 whitespace-pre-wrap leading-10">
          <p>{DASHBOARD_TEXT.none}</p>
          <NewPostButton />
        </section>
      )}
    </section>
  );
}
