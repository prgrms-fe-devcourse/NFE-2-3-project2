import { useNavigate } from "react-router";
import defaultProfileImg from "../../../public/logo.png";

interface RecentPostProps {
  post: Post;
  channelName: string;
}

export default function RecentPost({ post, channelName }: RecentPostProps) {
  const navigate = useNavigate();
  const parsedTitle: CustomTitle = JSON.parse(post.title);

  const postClick = () => {
    navigate(`/channels/${channelName}/${post._id}`);
  };

  const avatarClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation();
    navigate(`/user/${post.author._id}`);
  };

  return (
    <article
      onClick={postClick}
      className="group/all w-[208px] flex-col rounded-lg overflow-hidden border border-gray-ee dark:border-gray-ee/20 cursor-pointer"
    >
      <section className="relative h-[178px]">
        <div className="w-full h-full overflow-hidden">
          <img
            className="object-cover w-full h-full transition-transform duration-300 ease-in-out group-hover/all:scale-105"
            src={parsedTitle.image ?? defaultProfileImg}
            alt={post.title}
          />
        </div>
        <div className="absolute inset-0 image-shadow"></div>
        <div
          onClick={avatarClick}
          className="group/author absolute left-2 bottom-2 flex items-center gap-2"
        >
          <img
            className="w-7 h-7 rounded-full profile"
            src={post.author.image ?? defaultProfileImg}
            alt={post.author.fullName}
          />
          <p className="text-gray-c8 text-sm font-medium group-hover/author:text-gray-ee overflow-hidden text-ellipsis whitespace-nowrap">
            {post.author.fullName}
          </p>
        </div>
      </section>
      <section className="p-2 bg-white dark:bg-white/5 flex flex-col gap-2 border-t border-gray-ee dark:border-gray-ee/20">
        <p className="text-base font-semibold dark:text-white line-clamp-1 break-all">
          {parsedTitle.title}
        </p>
        <p className="line-clamp-2 text-gray-54 dark:text-gray-c8 text-sm font-normal h-10 break-all">
          {parsedTitle.contents}
        </p>
      </section>
    </article>
  );
}
