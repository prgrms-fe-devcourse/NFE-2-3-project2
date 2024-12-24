import { useState } from "react";
import SearchIcon from "../../assets/SearchIcon";
import { useNavigate } from "react-router";

export default function SearchBar() {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);

  const toggledInputFocused = () => setIsInputFocused((prev) => !prev);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (keyword.trim() === "") return;
    navigate(`/search?keyword=${keyword.trim()}`);
  };

  return (
    <form
      className="flex justify-center items-center w-[514px] h-[43px] px-6 rounded-full border border-gray-54 dark:border-gray-c8/50 focus-within:border-primary bg-white dark:bg-white/10"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="이름 또는 키워드로 검색"
        className="w-full h-full pr-3 bg-transparent focus:outline-none dark:text-gray-ee"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onFocus={toggledInputFocused}
        onBlur={toggledInputFocused}
      />
      <button
        type="submit"
        className="flex items-center justify-center w-[36px] h-[36px]"
      >
        <SearchIcon
          className="w-[19px] h-[19px]"
          color={isInputFocused ? "#FCC404" : undefined}
        />
      </button>
    </form>
  );
}
