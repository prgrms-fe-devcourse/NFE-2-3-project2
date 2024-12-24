import { useNavigate } from "react-router";
import { postLogOut } from "../api/auth";
import images from "../assets";
import Button from "../components/common/Button";
import { useAuthStore } from "../stores/authStore";
import { useModal } from "../stores/modalStore";
import { useEffect, useRef, useState } from "react";
import { postUploadPhoto, putUpdatePw } from "../api/users";
import Avata from "../components/common/Avata";
import { useTriggerStore } from "../stores/triggerStore";
import Input from "../components/common/Input";
import { useCookies } from "react-cookie";
import { validifyPw } from "../utils/validify";
import Loading from "../components/common/Loading";

export default function UserEdit() {
  const setTrigger = useTriggerStore((state) => state.setTrigger);
  const isSocial = useAuthStore((state) => state.isSocial);

  // 이미지 업로드 관련
  const [photoUrl, setPhotoUrl] = useState("");
  const [photoId, setPhotoId] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  //변경 못하는 정보 반영하기(내 이메일, 이름)
  const email = useAuthStore((state) => state.user?.email);
  const fullName = useAuthStore((state) => state.user?.fullName);

  //zustand에서 프로필 이미지 가져오기
  const profileImg = useAuthStore((state) => state.user?.image);

  //비밀번호 수정 관련
  const firstTry = useRef(true);
  const [updatePassword, setUpdatePassword] = useState("");
  const [confirmUpdatePassword, setConfirmUpdatePassword] = useState("");
  const [updatePasswordError, setUpdatePasswordError] = useState("");
  const [confirmUpdatePasswordError, setConfirmUpdatePasswordError] =
    useState("");

  //로그아웃 관련
  const [_, _set, removeCookie] = useCookies(["token"]);
  const setOpen = useModal((state) => state.setModalOpen);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  // 사진 선택 함수
  const handleSelectPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const fileUrl = URL.createObjectURL(file);
      setPhotoUrl(fileUrl); // 선택된 사진 파일의 url
      setSelectedFile(file); // 선택된 사진 파일
    } else {
      console.error("파일이 선택되지 않았습니다");
    }
  };

  const handleUploadPhoto = async () => {
    if (!selectedFile) return false;
    if (!isValidUpdatePassword() || !isConfirmUpdatePassword()) return false;
    try {
      const data = await postUploadPhoto({
        isCover: false,
        image: selectedFile,
      });
      if (data) {
        setPhotoUrl(data.image);
        setPhotoId(data._id);
        useAuthStore.setState((state) => ({
          ...state,
          user: state.user ? { ...state.user, image: data.image } : null,
        }));
        setSelectedFile(null);
        return true;
      } else return false;
    } catch (error) {
      console.error("이미지 업로드 실패", error);
      return false;
    }
  };

  const isImageChanged = () => {
    if (photoUrl) return true;
    return false;
  };

  // 비밀번호조건(대소문자+숫자 8자리 이상) 만족
  const isValidUpdatePassword = () => {
    const imageChanged = isImageChanged();
    if (imageChanged && !updatePassword) return true;

    const isValidPw = validifyPw(updatePassword);
    setUpdatePasswordError(isValidPw ? "" : "올바른 비밀번호가 아닙니다");
    return isValidPw;
  };
  useEffect(() => {
    if (!firstTry.current) isValidUpdatePassword();
  }, [updatePassword]);

  const isConfirmUpdatePassword = () => {
    const isValid = confirmUpdatePassword === updatePassword;
    setConfirmUpdatePasswordError(
      isValid ? "" : "비밀번호가 일치하지 않습니다"
    );
    return isValid;
  };
  useEffect(() => {
    isConfirmUpdatePassword();
  }, [confirmUpdatePassword]);

  const handleUpdatePassword = async () => {
    if (firstTry.current) firstTry.current = false;
    try {
      if (!updatePassword && !selectedFile) {
        isValidUpdatePassword();
        return false;
      }
      const pwValid = isValidUpdatePassword();
      const pwConfirValud = isConfirmUpdatePassword();
      if (!pwValid || !pwConfirValud) return false;
      if (updatePassword) {
        await putUpdatePw(updatePassword);
        return true;
      }
      return false;
    } catch (error) {
      console.error("error");
      return false;
    }
  };

  //로그아웃 관련
  const handleLogout = async () => {
    await postLogOut();
    setOpen(false);
    logout();
    removeCookie("token");
    navigate("/");
  };
  const handleLogoutOpen = () => {
    setOpen(true, {
      message: "정말로 로그아웃 하시겠습니까?",
      btnText: "로그아웃",
      btnColor: "red",
      onClick: handleLogout,
    });
  };

  //수정 완료 관련
  const [fetching, setFetching] = useState<boolean>(false);
  const id = useAuthStore((state) => state.user?._id);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (fetching) return;
    try {
      setFetching(true);
      const [photoBol, pwBol] = await Promise.all([
        handleUploadPhoto(),
        handleUpdatePassword(),
      ]);

      if (photoBol || pwBol) {
        setOpen(true, {
          message:
            photoBol && pwBol
              ? "수정이 완료되었습니다"
              : photoBol
              ? "프로필 이미지가 수정됐습니다"
              : "비밀번호가 변경됐습니다",
          btnText: "확인",
          btnColor: "main",
          isOneBtn: true,
          onClick: () => {
            navigate(`/user/${id}`);
            setOpen(false);
          },
        });
        setUpdatePassword("");
        setConfirmUpdatePassword("");
      }
    } catch (error) {
      console.error("버튼 클릭 이벤트 실패:", error);
    } finally {
      setFetching(false);
      setTrigger();
    }
  };

  return (
    <>
      {fetching && <Loading />}
      <div className="w-full h-[100px] px-[30px] mb-10 sticky top-0 left-0 flex justify-between items-center bg-white dark:bg-black dark:text-white border-b border-whiteDark dark:border-gray z-[9] md:hidden">
        <button onClick={() => history.back()} className="">
          <img className="dark:invert" src={images.Back} alt="back icon" />
        </button>
      </div>
      <form
        className="w-[calc(100%-40px)] max-w-[777px] mb-[125px] flex flex-col items-center mx-auto gap-[30px]"
        onSubmit={handleSubmit}
      >
        <label className="cursor-pointer relative mb-5 md:mt-[30px] flex flex-col items-center">
          <input
            type="file"
            accept="image/*"
            id={photoId}
            hidden
            onChange={handleSelectPhoto}
          />
          <Avata profile={photoUrl || profileImg} size={"lg"} />
          <span className="absolute -bottom-[10px] -right-[10px] md:w-[26.09px] md:h-[26.09px]">
            <img src={images.Camera} alt="camera icon" />
          </span>
        </label>

        <div className="w-full flex items-center justify-between gap-5 md:flex-row md:items-center">
          <label
            htmlFor=""
            className="min-w-[100px] font-bold md:text-[16px] md:min-w-[92px]"
          >
            이메일
          </label>
          <div className="flex-1  max-w-[500px]">
            <Input
              theme="setting"
              type={"text"}
              value={email || ""}
              disabled
              className="w-full md:text-xs"
            />
          </div>
        </div>

        <div className="w-full flex items-center justify-between gap-5 md:flex-row md:items-center">
          <label
            htmlFor=""
            className="min-w-[100px] font-bold md:text-[16px] md:min-w-[92px]"
          >
            이름
          </label>
          <div className="flex-1  max-w-[500px]">
            <Input
              theme="setting"
              type={"text"}
              value={fullName || ""}
              disabled
              className="w-full md:text-xs"
            />
          </div>
        </div>

        {!isSocial && (
          <>
            <div className="w-full flex items-center justify-between gap-5 md:flex-row md:items-center">
              <label
                htmlFor=""
                className="min-w-[100px] font-bold md:text-[16px] md:min-w-[92px]"
              >
                비밀번호
              </label>
              <div className="flex flex-col flex-1 max-w-[500px]">
                <Input
                  theme="setting"
                  type={"password"}
                  value={updatePassword}
                  onChange={(e) => setUpdatePassword(e.target.value)}
                  placeholder="변경할 비밀번호를 입력해주세요"
                  className="w-full md:text-xs"
                />
                {updatePasswordError && (
                  <p className="text-red text-xs mt-[10px]">
                    {updatePasswordError}
                  </p>
                )}
              </div>
            </div>

            <div className="w-full flex items-center justify-between gap-5 md:flex-row md:items-center">
              <label
                htmlFor=""
                className="min-w-[100px] font-bold md:text-[16px] md:min-w-[92px]"
              >
                비밀번호 확인
              </label>
              <div className="flex flex-col flex-1 max-w-[500px]">
                <Input
                  theme="setting"
                  type={"password"}
                  value={confirmUpdatePassword}
                  onChange={(e) => setConfirmUpdatePassword(e.target.value)}
                  placeholder="비밀번호를 확인해주세요"
                  className="w-full md:text-xs"
                />
                {confirmUpdatePasswordError && (
                  <p className="text-red text-xs mt-[10px]">
                    {confirmUpdatePasswordError}
                  </p>
                )}
              </div>
            </div>
          </>
        )}

        <div className="w-full flex justify-end items-center gap-5 ">
          <Button
            onClick={() => history.back()}
            text={"취소"}
            size={"sm"}
            theme="sub"
          />
          <Button type="submit" text={"완료"} size={"sm"} disabled={fetching} />
        </div>
      </form>
      <div className="w-[calc(100%-40px)] max-w-[777px] mx-auto flex items-end mb-[30px] md:items-start justify-between gap-5 md:flex-col  md:gap-[20px]">
        <div className="flex flex-col md:items-start gap-[5px] text-gray dark:text-whiteDark ">
          <div className="font-bold">로그아웃</div>
          <div className="text-xs break-keep">
            SPROUT 사이트에서 로그아웃을 원하신다면 로그아웃 버튼을 클릭하세요
          </div>
        </div>
        <button
          aria-label="logout button"
          onClick={handleLogoutOpen}
          className="text-red text-xs font-medium underline flex items-center gap-[10px]"
        >
          로그아웃
          <img src={images.Logout} alt="logout icon" />
        </button>
      </div>
    </>
  );
}
