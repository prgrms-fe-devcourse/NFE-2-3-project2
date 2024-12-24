import { useNavigate } from "react-router";
import { useState, useRef, useEffect } from "react";
import { updateUser } from "../api/user";
import { useAuthStore } from "../store/authStore";
import { useToastStore } from "../store/toastStore";
import defaultProfileImg from "../../public/logo.png";
import InputLabel from "../components/common/InputLabel";
import { MAX_NAME_LENGTH } from "../constants/auth";
import {
  PROFILE_ERROR_MESSAGE,
  PROFILE_TOAST_MESSAGE,
} from "../constants/profile";

export default function ModifyProfile() {
  const [selectedImage, setSelectedImage] = useState<SelectedImage>();
  const [fullName, setFullName] = useState("");
  const [warning, setWarning] = useState({
    isWarning: false,
    errorMessage: "",
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const defaultImgRef = useRef<HTMLInputElement>(null);

  const user = useAuthStore((state) => state.user);
  const showToast = useToastStore((state) => state.showToast);
  const navigate = useNavigate();

  // 이름 변경 핸들러
  const handleFullNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFullName(e.target.value);
    setWarning((prev) => ({ ...prev, isWarning: false }));
  };

  // 이미지 업로드 핸들러 (미리 상태만 변경)
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileURL = URL.createObjectURL(file);
    setSelectedImage({ src: fileURL, file }); // 로컬 이미지 미리 보기
  };

  const selectDefaultImage = async () => {
    const response = await fetch("/vive/logo.png");
    const blob = await response.blob();
    const file = new File([blob], "default-profile.png", { type: blob.type });
    setSelectedImage({ src: defaultProfileImg, file });
  };

  // 프로필 수정 요청 함수 (수정 버튼 클릭 시만 서버에 반영)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setWarning({
        isWarning: true,
        errorMessage: PROFILE_ERROR_MESSAGE.blank,
      });
      return;
    }
    if (fullName.length > MAX_NAME_LENGTH) {
      setWarning({
        isWarning: true,
        errorMessage: PROFILE_ERROR_MESSAGE.exceed,
      });
      return;
    }
    if (!selectedImage) return;

    const result = await updateUser(
      selectedImage.src !== user?.image ? selectedImage : null,
      fullName !== user?.fullName ? fullName.trim() : null
    );
    if (result) {
      showToast(PROFILE_TOAST_MESSAGE.profile);
      navigate("/mypage");
    } else {
      showToast(PROFILE_TOAST_MESSAGE.profileErr);
    }
  };

  // 컴포넌트 마운트 시 사용자 정보 불러오기
  useEffect(() => {
    if (user) {
      setFullName(user.fullName);
      if (user.image) setSelectedImage({ src: user.image, file: null });
      else selectDefaultImage();
    }
  }, []);

  return (
    <section className="mx-auto flex flex-col items-center justify-center">
      {/* 프로필 이미지 수정 */}
      <div className="flex flex-col items-center">
        <div>
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
          <input
            ref={defaultImgRef}
            type="file"
            src={defaultProfileImg}
            hidden
          />
          <div className="flex items-center justify-center overflow-hidden w-[298px] h-[298px] mb-5 rounded-full profile">
            <img
              src={selectedImage?.src ?? defaultProfileImg}
              alt="프로필 이미지"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <div>
          <button
            type="button"
            className="px-5 py-2 mr-5 rounded-lg primary-btn font-medium"
            onClick={() => {
              fileInputRef.current?.click();
            }}
          >
            이미지 선택
          </button>
          <button
            type="button"
            className="px-5 py-2 rounded-lg font-medium cancel-btn"
            onClick={() => {
              selectDefaultImage();
            }}
          >
            이미지 삭제
          </button>
        </div>
      </div>

      {/* 프로필 정보 수정 */}
      <form className="mt-8" onSubmit={handleSubmit}>
        <InputLabel
          label="이름"
          id="username"
          type="text"
          value={fullName}
          placeholder="이름을 입력해주세요 (7자 이내)"
          isWarning={warning.isWarning}
          errorMessage={warning.errorMessage}
          onChange={handleFullNameChange}
        />
        <div className="flex flex-col gap-5 mt-24">
          <button
            type="submit"
            className="w-[400px] py-2 rounded-[50px] primary-btn"
            disabled={!fullName}
          >
            수정
          </button>
          <button
            type="button"
            className="w-[400px] py-2 rounded-[50px] secondary-btn"
            onClick={() => navigate("/mypage")}
          >
            취소
          </button>
        </div>
      </form>
    </section>
  );
}
