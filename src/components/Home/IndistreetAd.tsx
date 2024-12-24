import Logo from "../../assets/indistreet-logo.svg";

export default function IndistreetAd() {
  return (
    <article className="w-full bg-[#1A202C] text-white flex flex-col items-center p-14 gap-5">
      <img src={Logo} alt="인디스트릿 로고" />
      <div className="text-center">
        <p className="text-2xl font-semibold mb-1">
          인디뮤지션과 인디공연의 모든 것
        </p>
        <p className="text-base">
          인디스트릿을 통해 국내 인디뮤지션들의 공연 정보를 확인해보세요!
        </p>
      </div>
      <a
        href="https://indistreet.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-[#E46A55] rounded px-5 py-2"
      >
        인디스트릿 바로가기
      </a>
    </article>
  );
}
