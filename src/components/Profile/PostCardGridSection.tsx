import { PROFILE_TEXT } from "../../constants/profile";
import PostCard from "../common/PostCard";

interface PostCardGridSectionProps {
  fullName: string;
  posts: Post[];
  isMyProfile?: boolean;
}

export default function PostCardGridSection({
  fullName,
  posts,
  isMyProfile = false,
}: PostCardGridSectionProps) {
  return (
    <section className="pb-10 w-[934px] grow">
      <h2 className="text-2xl font-semibold mb-6">
        {isMyProfile ? (
          <>나의 포스트</>
        ) : (
          <>
            <span className="text-highlight">{fullName}</span>님의 포스트
          </>
        )}
      </h2>
      {posts.length === 0 ? (
        <div className="flex items-center justify-center mt-20">
          <p className="text-lg text-center text-gray-54 dark:text-gray-c8">
            {PROFILE_TEXT.noPost}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-10">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} isSearch />
          ))}
        </div>
      )}
    </section>
  );
}
