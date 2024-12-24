import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Virtual } from "swiper/modules";
import ImageCard from "../ImageCard";
import { useDarkModeStore } from "../../stores/darkModeStore";

export default function SwiperCustom({ posts }: { posts: PostType[] }) {
  const isDark = useDarkModeStore((state) => state.isDark);

  return (
    <div className="mb-[60px]">
      <Swiper
        modules={[Virtual, Navigation, Pagination]}
        navigation={true}
        pagination={{
          el: ".swiper-pagination",
          clickable: true,
          type: "fraction",
        }}
        breakpoints={{
          // 화면 너비에 따라 보여지는 슬라이드 수 조정
          768: { slidesPerView: 1 }, // 모바일
          1024: { slidesPerView: 2 }, // 태블릿
          1280: { slidesPerView: 3 }, // 데스크탑
          1536: { slidesPerView: 4 }, // 큰 화면
        }}
        virtual
        className={!isDark ? "" : "dark"}
      >
        {posts.map((post) => (
          <SwiperSlide key={post._id}>
            <div className="w-[250px] m-auto">
              <ImageCard {...post} />
            </div>
          </SwiperSlide>
        ))}
        <div className="swiper-pagination-box">
          <div className="swiper-pagination dark:bg-[#5e5e5e] dark:text-white"></div>
        </div>
      </Swiper>
    </div>
  );
}
