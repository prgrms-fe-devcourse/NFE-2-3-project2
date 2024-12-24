import UserAvatar from "../components/common/UserAvatar";
import { Link, useSearchParams } from "react-router";
import useGetSearchKeyword from "../hooks/useGetSearchKeyword";
import PostCard from "../components/common/PostCard";
import { isCustomTitle } from "../utils/typeGuards";
import Loading from "../components/common/Loading";
import { DASHBOARD_TEXT } from "../constants/dashboard";

export default function SearchResult() {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") ?? "";
  const { data, error, loading } = useGetSearchKeyword(keyword);

  const { userResult, postResult } = data?.reduce(
    (
      acc: { userResult: User[]; postResult: SearchPost[] },
      item: User | SearchPost
    ) => {
      if ("channel" in item) {
        acc.postResult.push(item);
      } else {
        acc.userResult.push(item);
      }
      return acc;
    },
    { userResult: [], postResult: [] }
  ) || { userResult: [], postResult: [] };

  const filteredPostResult = postResult.filter((post) => {
    try {
      const postTitle = JSON.parse(post.title);
      return (
        isCustomTitle(postTitle) &&
        [postTitle.title, postTitle.contents, postTitle.youtubeUrl].some(
          (field) => field.includes(keyword)
        )
      );
    } catch {
      return false;
    }
  });

  if (loading || error)
    return (
      <section className="w-full flex items-center justify-center">
        {loading && <Loading />}
        {error && (
          <p className="text-center text-lg font-medium text-gray-54 dark:text-gray-c8">
            {DASHBOARD_TEXT.searchErr}
          </p>
        )}
      </section>
    );

  return (
    <>
      <section className="w-full px-[60px] pb-10">
        <article className="mb-28">
          <h2 className="text-2xl font-bold my-10 flex">
            <span className="text-highlight inline-block max-w-[500px] overflow-hidden text-ellipsis whitespace-nowrap">
              {keyword}
            </span>
            의 유저 검색 결과 {userResult.length}개
          </h2>
          {userResult.length > 0 ? (
            <div className="w-full grid grid-cols-6 gap-10 justify-between">
              {userResult.map((user) => (
                <Link to={`/user/${user._id}`}>
                  <UserAvatar
                    key={user._id}
                    name={user.fullName}
                    image={user.image}
                  />
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-center text-lg pt-10 font-medium text-gray-54 dark:text-gray-c8">
              {DASHBOARD_TEXT.noSearchUser}
            </p>
          )}
        </article>
        <article>
          <h2 className="text-2xl font-bold my-10 flex">
            <span className="text-highlight inline-block max-w-[500px] overflow-hidden text-ellipsis whitespace-nowrap">
              {keyword}
            </span>
            의 포스팅 검색 결과 {filteredPostResult.length}개
          </h2>
          {filteredPostResult.length > 0 ? (
            <div className="grid grid-cols-2 gap-10">
              {filteredPostResult.map((post) => (
                <PostCard key={post._id} post={post} isSearch />
              ))}
            </div>
          ) : (
            <p className="text-center text-lg pt-10 font-medium text-gray-54 dark:text-gray-c8">
              {DASHBOARD_TEXT.noSearchPost}
            </p>
          )}
        </article>
      </section>
    </>
  );
}
