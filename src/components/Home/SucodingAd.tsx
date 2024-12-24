import Logo from "../../assets/sucoding.jpg";

export default function SucodingAd() {
  return (
    <article className="w-full p-14 bg-[#1c0c42] text-white flex flex-col items-center gap-5">
      <img className="w-16 h-16" src={Logo} alt="수코딩 로고" />
      <div className="flex flex-col gap-1 text-center">
        <p className="text-2xl font-semibold">
          수코딩과 함께 코딩 천재로 거듭나세요
        </p>
        <p className="text-base font-normal">
          수코딩 | 누구나 쉽게 배우는 온라인 코딩 스쿨
        </p>
      </div>
      <div className="flex gap-7">
        <a
          href="https://www.sucoding.kr/"
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2 bg-[#6530e3] text-base font-medium rounded"
        >
          수코딩 사이트 바로가기
        </a>
        <a
          href="https://www.youtube.com/channel/UCzA62wwyiLnVnqFP4VEUOZg"
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2 bg-[#ff0133] text-base font-medium rounded"
        >
          수코딩 유튜브 바로가기
        </a>
      </div>
    </article>
  );
}
