import { useEffect, useRef } from "react";
import { Link } from "react-router";
import { useChatingModalStore, useprofileModalStore } from "../../store/store";
import { axiosInstance } from "../../api/axios";
import { useLoginStore } from "../../store/API";
import { t } from "i18next";
import default_profile from "../../asset/default_profile.png";
import setting from "../../asset/images/settings.svg";
import signOut from "../../asset/images/signout.svg";
import chat from "../../asset/images/Chat.svg";

export default function Modal({
  y,
  x,
  onlineFullname,
  onlineCoverImg,
  onlineId,
}: {
  x?: number;
  y?: number;
  onlineFullname?: string;
  onlineCoverImg?: string;
  onlineId?: string;
}) {
  const modal = useprofileModalStore((s) => s.modal);
  const type = useprofileModalStore((s) => s.type);
  const close = useprofileModalStore((s) => s.close);
  const contentRef = useRef<HTMLDivElement>(null);

  // 유저토큰값(로그인, 로그아웃 창 트리거 용도도)
  const token = useLoginStore((state) => state.token);
  // 유저정보(데이터바인딩용용)
  const user = useLoginStore((state) => state.user);

  // 로그아웃 + 이전 사용자 정보 + 토큰값 지우기
  const setUser = useLoginStore((state) => state.setUser);
  const setToken = useLoginStore((state) => state.setToken);

  // 채팅창  열기/닫기 로직
  const isChatModalOpen = useChatingModalStore(
    (state) => state.isChatModalOpen
  );
  const setIsChatModalOpenTrue = useChatingModalStore(
    (state) => state.setIsChatModalOpenTrue
  );
  const setIsChatModalOpenFalse = useChatingModalStore(
    (state) => state.setIsChatModalOpenFalse
  );
  const setIsChatingOpenFalse = useChatingModalStore(
    (state) => state.setIsChatingOpenFalse
  );

  // 채팅창 현재 유저 채팅 보여주기 로직
  const setNowChatId = useChatingModalStore((state) => state.setNowChatId);
  const setIsChatingOpenTrue = useChatingModalStore(
    (state) => state.setIsChatingOpenTrue
  );

  const logOut = async () => {
    await axiosInstance
      .post(`/logout`)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
    setUser(null);
    setToken(null);
    localStorage.setItem("LoginUserInfo", JSON.stringify(null));
    localStorage.setItem("LoginUserToken", JSON.stringify(null));
  };

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const element = e.target as HTMLElement;
      if (
        // 모달창 내부 영역이 아니면 모달창 닫게 하기
        modal &&
        contentRef.current &&
        !contentRef.current?.contains(element)
      )
        close();
    };
    // 전체 문서에 클릭 이벤트 추가하기
    document.addEventListener("click", onClick);
    // 언마운트시 클릭이벤트 삭제하기
    return () => {
      document.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <div
      ref={contentRef}
      className={`absolute z-50 ${
        type === "header" ? "animate-scaleInTopRight" : "animate-scaleInTopLeft"
      }`}
      style={{
        top: x ? `${x}px` : "2.5rem",
        right: y ? `${y}px` : "1rem",
      }}
    >
      <div
        className={` inline-flex flex-col items-center justify-center bg-white h-42 drop-shadow-xl rounded-2xl`}
      >
        <div className="w-[240px] px-4 pt-[18px]  rounded-tl-2xl rounded-tr-2xl justify-start items-center gap-[89px] inline-flex">
          <div className="h-[60px] pr-[68px] pb-[18px] justify-start items-center gap-3 flex">
            <div className="w-[42px] h-[42px] relative">
              <div className="w-[42px] h-[42px] left-0 top-0 absolute bg-gradient-to-b from-[#cdddfc] to-[#c9afff] rounded-full" />
              <div className="w-[42px] h-[42px] left-0 top-0 absolute">
                <div className="w-[42px] h-[42px] left-0 top-0 absolute bg-gradient-to-b from-[#fcd7b4] to-[#ffc2af] rounded-full" />
                <img
                  className="w-11 h-11 left-0 top-[-2px] absolute rounded-full object-cover"
                  src={
                    type === "header"
                      ? user?.image
                        ? user.image
                        : default_profile
                      : onlineCoverImg
                  }
                />
              </div>
            </div>
            <div className="flex-col justify-center items-start gap-[3px] inline-flex">
              <span className="text-black font-medium w-[150px] h-[20px] leading-[18px] text-[15px] line-clamp-1 overflow-ellipsis">
                {type === "header"
                  ? user?.fullName
                    ? user.fullName
                    : t("로그인이 필요합니다.")
                  : onlineFullname}
              </span>
            </div>
          </div>
        </div>
        {type === "header" ? (
          token ? (
            <div className="cursor-pointer hover:bg-gray-100">
              <div className="w-[240px] h-[60px] px-2.5 py-1  flex-col justify-start items-start gap-2.5 flex">
                <div className="justify-start items-center gap-3.5 inline-flex">
                  <div className="h-[52px] px-3.5 py-[15px] rounded-[14px] justify-center gap-3 flex">
                    <div className="relative w-5 h-5">
                      <img
                        className="w-5 h-5 left-[2px] top-[2px] absolute"
                        src={setting}
                      />
                    </div>

                    <Link
                      to="/mypage"
                      className="text-black text-lg font-medium leading-[22px]"
                      onClick={close}
                    >
                      {t("내 프로필")}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ) : null
        ) : (
          <>
            {user && token && (
              <div className="cursor-pointer hover:bg-gray-100">
                <div className="w-[240px] h-[60px] px-2.5 py-1  flex-col justify-start items-start gap-2.5 flex">
                  <div className="justify-start items-center gap-3.5 inline-flex">
                    <div className="h-[52px] px-3.5 py-[15px] rounded-[14px] justify-center gap-3 flex">
                      <div className="relative w-5 h-5">
                        <img
                          className="w-5 h-5 left-[2px] top-[2px] absolute"
                          src={chat}
                        />
                      </div>

                      <button
                        className="text-black text-lg font-medium leading-[22px]"
                        onClick={() => {
                          setIsChatModalOpenTrue();
                          setNowChatId(onlineId!);
                          setIsChatingOpenFalse();
                          setTimeout(() => {
                            setIsChatingOpenTrue();
                          }, 0);
                          close();
                        }}
                      >
                        {t("채팅하기")}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div className="cursor-pointer hover:bg-gray-100 rounded-b-2xl">
              <div className="w-[240px] h-[60px] px-2.5 py-1  flex-col justify-start items-start gap-2.5 flex">
                <div className="justify-start items-center gap-3.5 inline-flex">
                  <div className="h-[52px] px-3.5 py-[15px] rounded-[14px] justify-center gap-3 flex">
                    <div className="relative w-5 h-5">
                      <img
                        className="w-5 h-5 left-[2px] top-[2px] absolute"
                        src={setting}
                      />
                    </div>

                    <Link
                      to={`./userpage/${onlineFullname}`}
                      className="text-black text-lg font-medium leading-[22px]"
                      onClick={close}
                    >
                      {t("프로필 보기")}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {type === "header" && (
          <div className="cursor-pointer rounded-b-2xl hover:bg-gray-100">
            <div className="w-[240px] h-[60px] px-2.5 py-1  flex-col justify-start items-start gap-2.5 flex">
              <div className="justify-start items-center gap-3.5 inline-flex">
                <div className="h-[52px] px-3.5 py-[15px] rounded-[14px] justify-center gap-3 flex">
                  <div className="relative w-5 h-5">
                    <img
                      className="w-5 h-5 left-[2px] top-[2px] absolute"
                      src={signOut}
                    />
                  </div>

                  {token === null ? (
                    <Link
                      to="/login"
                      className="text-black text-lg font-medium leading-[22px]"
                      onClick={() => {
                        close();
                      }}
                    >
                      {t("로그인")}
                    </Link>
                  ) : (
                    <Link
                      to="/login"
                      className="text-black text-lg font-medium leading-[22px]"
                      onClick={() => {
                        if (isChatModalOpen) {
                          setIsChatingOpenFalse();
                          setIsChatModalOpenFalse();
                        }
                        close();
                        logOut();
                      }}
                    >
                      {t("로그아웃")}
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
