import img_search from "../../assets/Search.svg";
import img_left from "../../assets/Left.svg";
import img_close from "../../assets/purple-close.svg";
import { useMainSearchStore } from "../../store/mainSearchStore";

type Tab1Props = {
  setIsFocused: (value: boolean) => void;
};

const Tab1 = ({ setIsFocused }: Tab1Props) => {
  return (
    <div className="h-[36px] rounded-[10px] bg-gradient-to-r from-[var(--color-secondary)] to-[var(--color-primary)] p-[1px]">
      <div className="flex items-center w-full h-full bg-white rounded-[10px] px-4 overflow-hidden">
        <img src={img_search} alt="검색" className="pr-2" />
        <input
          type="text"
          placeholder="사용자 또는 게시글을 검색하세요"
          className="w-full h-[14px] my-[4px] outline-none"
          onFocus={() => setIsFocused(true)}
        />
      </div>
    </div>
  );
};

type Tab2Props = {
  setIsFocused: (value: boolean) => void;
  onBackClick: () => void;
};

const Tab2 = ({ setIsFocused, onBackClick }: Tab2Props) => {
  const searchInput = useMainSearchStore((state) => state.searchInput);
  const setSearchInput = useMainSearchStore((state) => state.setSearchInput);

  const handleSearch = () => {
    if (searchInput.trim() === "") {
      return;
    }
    setIsFocused(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (searchInput.trim() === "") {
        return;
      }
      setIsFocused(false);
    }
  };
  // const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
  //   const clickedElement = e.relatedTarget as HTMLElement;

  //   if (e.relatedTarget === null || clickedElement?.tagName === "BODY" || clickedElement?.tagName === "HTML") {
  //     return;
  //   }
  //   if (clickedElement.tagName === "BUTTON") {
  //     return;
  //   }
  //   // setIsFocused(false);
  // };

  const handleClose = () => {
    setSearchInput("");
  };

  return (
    <div className="flex h-[36px] rounded-[10px]">
      <img
        src={img_left}
        alt="뒤로 가기"
        onClick={onBackClick}
        className="cursor-pointer dark:invert max-[550px]:w-[25px]"
      />
      <div className="w-full rounded-[10px] bg-gradient-to-r from-[var(--color-secondary)] to-[var(--color-primary)] p-[1px]">
        <div className="flex items-center w-full h-full bg-white rounded-[10px] px-4 overflow-hidden">
          <input
            type="text"
            id="search-input"
            name="search"
            className="w-full h-[14px] my-[4px] outline-none bg-white text-black max-[550px]:text-[12px]"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            // onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            autoFocus
            maxLength={23}
          />
          <button className="bg-bg-400 w-7 h-6 rounded-[50px] mr-2" onClick={handleClose}>
            <img className="w-full h-full " src={img_close} alt="취소" />
          </button>
          <button className="w-6 h-6" onClick={handleSearch}>
            <img className="w-full h-full" src={img_search} alt="검색" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default function MainSearch({ onBackClick }: { onBackClick: () => void }) {
  const isFocused = useMainSearchStore((state) => state.isFocused);
  const setIsFocused = useMainSearchStore((state) => state.setIsFocused);

  return (
    <div className="px-8 mt-2">
      {isFocused ? (
        <Tab2 setIsFocused={setIsFocused} onBackClick={onBackClick} />
      ) : (
        <Tab1 setIsFocused={setIsFocused} />
      )}
    </div>
  );
}
