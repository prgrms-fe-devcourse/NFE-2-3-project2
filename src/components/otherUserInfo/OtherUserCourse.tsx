// OtherUserCourse.tsx
import MypageCards from "../My/MypageCards/MypageCards";

export default function OtherUserCourse({
  targetUserData,
}: {
  targetUserData: CardData[];
}) {
  return (
    <div className="mt-[35px] -z-0">
      <div className={`flex flex-col items-center`}>
        <div className="flex flex-col">
          {targetUserData.length > 0 ? (
            <MypageCards data={targetUserData} />
          ) : (
            <div className="col-span-3 mt-10 font-semiBold text-center text-primary-700 font-pretendard text-sm">
              검색 결과를 찾지 못했어요 ψ(｀∇´)ψ
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
