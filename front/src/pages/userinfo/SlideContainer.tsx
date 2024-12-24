import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/swiper-bundle.css";
import img_lock_timeCapsule from "../../assets/time-capsule-lock.png";
import { Link } from "react-router";
import { useState } from "react";
import TimeCapsuleModal from "../../components/TimeCapsuleModal";
import img_noti from "../../assets/Notification-white.svg";
import img_fillNoti from "../../assets/Notification-fill.svg";
export interface CapsuleItem {
  id: string;
  title: string;
  content: string;
  image?: string;
  closeAt: Date;
  likes: Like[];
  author: Author;
  channel: Channel;
}

interface SlideContainerProps {
  items: CapsuleItem[];
  uniqueKey: string;
}
function SlideContainer({ items, uniqueKey }: SlideContainerProps) {
  // 모달 상태관리
  const [modalData, setModalData] = useState({ imgSrc: "", neonText: "", whiteText: "" });
  const [showModal, setShowModal] = useState(false);

  const handleClickCapsule = () => {
    setModalData({
      imgSrc: img_lock_timeCapsule,
      neonText: "미개봉 타임 캡슐입니다!",
      whiteText: "예약 시 알림을 받을 수 있어요",
    });
    setShowModal(true);
  };

  // 공개 대기 캡슐 아이템 예시
  const [notiStatus, setNotiStatus] = useState<boolean[]>([]);

  // 알림 버튼 클릭 이벤트 핸들러
  const handleNotiClick = (index: number) => {
    setNotiStatus((prevNotiStatus) => {
      const newNotiStatus = [...prevNotiStatus];
      newNotiStatus[index] = !newNotiStatus[index];
      return newNotiStatus;
    });
  };

  return (
    <>
      {/* 공개 대기 캡슐 클릭시 */}
      {showModal && (
        <TimeCapsuleModal
          imgSrc={modalData.imgSrc}
          neonText={modalData.neonText}
          whiteText={modalData.whiteText}
          onClose={() => setShowModal(false)}
        />
      )}

      <div className="relative w-full overflow-hidden px-[30px]">
        <Swiper
          key={uniqueKey}
          modules={[Navigation]}
          spaceBetween={10}
          slidesPerView={3}
          navigation={{
            prevEl: `.swiper-button-prev-${uniqueKey}`,
            nextEl: `.swiper-button-next-${uniqueKey}`,
          }}
          style={{ width: "100%", height: "auto" }}
        >
          {items.map((item, index) => {
            const isWaiting = item.closeAt && item.closeAt > new Date();
            return (
              <SwiperSlide key={item.id} className="flex items-center justify-center">
                <div className="w-full">
                  {/* 이미지 */}
                  <div className="relative w-full pb-[100%] bg-gray-200 rounded-[10px] overflow-hidden">
                    {isWaiting ? (
                      <div onClick={handleClickCapsule} className="cursor-pointer">
                        <div>
                          <img
                            src={item.image}
                            alt={item.title}
                            className="absolute inset-0 w-full h-full object-cover rounded-[10px] "
                          />

                          <div className="absolute inset-0 flex items-center justify-center backdrop-blur-md bg-black/30 scale-130">
                            <p className="text-sm text-white">{item.closeAt?.toLocaleDateString()} 공개 예정</p>
                          </div>
                        </div>
                        <div className="absolute bottom-0 right-0 px-2.5 py-2 flex flex-col justify-center items-center space-y-1">
                          {item.channel.name === "TIMECAPSULE" && (
                            //  알림 이미지
                            <img
                              src={notiStatus[index] ? img_fillNoti : img_noti}
                              alt="noti"
                              className="object-contain cursor-pointer flex-shrink-0 w-[21px] h-[21px]"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleNotiClick(index);
                              }}
                            />
                          )}
                        </div>
                      </div>
                    ) : (
                      <Link to={`/detail/${item.id}`}>
                        <div>
                          <img
                            src={item.image}
                            alt={item.title}
                            className="absolute inset-0 w-full h-full object-cover rounded-[10px] "
                          />
                        </div>
                      </Link>
                    )}
                  </div>
                  {/* 타이틀 */}
                  <div className="mt-2 text-[14px] font-pretendard text-left truncate text-black dark:text-white">
                    {item.title}
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
        {/* 커스텀 화살표 버튼 */}
        <button
          className={`absolute left-[5px] top-1/2 transform -translate-y-[100%] bg-transparent border-none transition-all duration-300 ease-in-out swiper-button-prev-${uniqueKey}`}
          aria-label="Previous slide"
        >
          <svg width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              className="fill-primary dark:fill-primary-dark"
              d="M15 7.5C15 11.6421 11.6421 15 7.5 15C3.35786 15 0 11.6421 0 7.5C0 3.35786 3.35786 0 7.5 0C11.6421 0 15 3.35786 15 7.5Z"
            />
            <path
              className="fill-white dark:fill-black"
              d="M6.7675 7.5L9.86125 10.5938L8.9775 11.4775L5 7.5L8.9775 3.5225L9.86125 4.40625L6.7675 7.5Z"
            />
          </svg>
        </button>

        <button
          className={`absolute right-[5px] top-1/2 transform -translate-y-[100%] bg-transparent border-none transition-all duration-300 ease-in-out swiper-button-next-${uniqueKey}`}
          aria-label="Next slide"
        >
          <svg width="20" height="20" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              className="fill-primary dark:fill-primary-dark"
              d="M15 7.5C15 11.6421 11.6421 15 7.5 15C3.35786 15 0 11.6421 0 7.5C0 3.35786 3.35786 0 7.5 0C11.6421 0 15 3.35786 15 7.5Z"
            />
            <path
              className="fill-white dark:fill-black"
              d="M9.2325 7.5L6.13875 4.40625L7.0225 3.5225L11 7.5L7.0225 11.4775L6.13875 10.5938L9.2325 7.5Z"
            />
          </svg>
        </button>
      </div>
    </>
  );
}
export default SlideContainer;
