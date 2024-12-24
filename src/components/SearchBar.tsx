import { twMerge } from "tailwind-merge";
import searchIcon from "../assets/searchIcon.svg";
import darkSearchIcon from "../assets/darkicons/darkSearchIcon.svg";
import { useDarkModeStore } from "../stores/darkModeStore";
import { useEffect } from "react";

export default function SearchBar({
  placeholder,
  style,
  keyword,
  onChange,
  posts,
  setStatus,
  setSearchPosts,
}: {
  placeholder: string;
  style?: string;
  keyword: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  posts: PostType[];
  setStatus: React.Dispatch<
    React.SetStateAction<"idle" | "loading" | "searching">
  >;
  setSearchPosts: React.Dispatch<React.SetStateAction<PostType[]>>;
}) {
  const isDark = useDarkModeStore((state) => state.isDark);
  // 검색 디바운스 처리
  useEffect(() => {
    // 검색어가 없으면 초기화
    if (!keyword) {
      setStatus("idle");
      setSearchPosts([]);
      return;
    }
    // 디바운스 적용
    const searchDebounce = setTimeout(() => {
      setStatus("searching");
      setSearchPosts(
        posts.filter((post) =>
          post.title.toLowerCase().includes(keyword.toLowerCase())
        )
      );
    }, 1200);

    return () => {
      clearTimeout(searchDebounce);
    };
  }, [keyword]);
  return (
    <div
      className={twMerge(
        "flex justify-center items-center px-4 py-3 rounded-[25px] border border-gray-300 gap-2 w-[785px]",
        style
      )}
    >
      <input
        className="w-full outline-none dark:bg-lightBlackDark dark:text-[#fff]"
        type="text"
        placeholder={placeholder}
        value={keyword}
        onChange={onChange}
      />
      <img src={!isDark ? searchIcon : darkSearchIcon} alt="검색 아이콘" />
    </div>
  );
}
