import { useEffect, useState } from "react";

import MypageCards from "./MypageCards/MypageCards";

import SearchBar from "../utills/SearchBar";
import { useUserStore } from "../../stores/useInfoStore";
import { useMyCourseStore } from "../../stores/useMyCourseStore";

export default function MypageMyCourse() {
  const { myCourseList, fetchMyCourses } = useMyCourseStore();
  const [filteredList, setFilteredList] = useState<CardData[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const { userId, setUserId } = useUserStore();

  useEffect(() => {
    const initializeUser = async () => {
      await setUserId();
      const currentUserId = useUserStore.getState().userId;
      if (currentUserId) {
        fetchMyCourses(currentUserId);
      }
    };

    if (!userId) {
      initializeUser();
    } else {
      fetchMyCourses(userId);
    }
  }, [userId, setUserId, fetchMyCourses]);

  const handleSearch = (result: CardData[]) => {
    setIsSearching(result.length > 0 || result.length === 0);
    setFilteredList(result);
  };

  return (
    <div className={`flex flex-col items-center`}>
      {/* 검색바 */}
      <SearchBar
        data={myCourseList}
        searchKey={["courseTitle", "courseDescription", "locationAddress"]}
        onSearch={handleSearch}
        placeholder="무엇이든 검색해보세요 (oﾟvﾟ)ノ"
      />

      {/* 데이터 렌더링 */}
      <div className="flex flex-col mt-8">
        {isSearching ? (
          filteredList.length > 0 ? (
            <MypageCards data={filteredList} />
          ) : (
            <div className="col-span-3 mt-10 text-sm text-center font-semiBold text-primary-700 font-pretendard">
              검색 결과를 찾지 못했어요 ψ(´´∀´´)ψ
            </div>
          )
        ) : myCourseList.length > 0 ? (
          <MypageCards data={myCourseList} />
        ) : (
          <div className="col-span-3 mt-10 text-sm font-medium text-center text-primary-700 font-pretendard">
            아직 등록된 코스가 없어요 இ௰இ
          </div>
        )}
      </div>
    </div>
  );
}
