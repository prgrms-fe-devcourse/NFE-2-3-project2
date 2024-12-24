import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { postUserPoto } from "../../../api/userApi";
import { useUserStore } from "../../../stores/useInfoStore";
import profileImg_N from "../../../assets/images/profileImg_N_icon.svg";

export default function UserInfoProfile() {
  const { userProfilePic, updateUserPic, userInfo, fetchUserInfo } =
    useUserStore();
  const [profilePic, setProfilePic] = useState(userProfilePic);

  useEffect(() => {
    fetchUserInfo();
  }, []);

  useEffect(() => {
    setProfilePic(userProfilePic);
  }, [userProfilePic]);

  const handlePicUpload = async () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.onchange = async (e: Event) => {
      const target = e.target as HTMLInputElement;
      const file = target.files?.[0];
      if (file) {
        const formData = new FormData();
        formData.append("image", file);
        formData.append("isCover", "false");

        try {
          const uploadedImageUrl = await postUserPoto(formData);
          if (uploadedImageUrl) {
            updateUserPic(uploadedImageUrl);
            toast.success("프로필 사진 저장 완료!");
          }
        } catch (error) {
          console.error("프로필 사진 업로드 실패:", error);
          throw error;
        }
      }
    };
    fileInput.click();
  };

  return (
    <div className="flex flex-col items-center">
      <div
        style={{ backgroundImage: `url(${profilePic})` }}
        className="w-[96px] h-[96px] bg-[#f3d0d9] rounded-full shadow-backblue overflow-hidden bg-cover bg-center "
      />

      <img
        className="absolute top-[254px] left-[340px] cursor-pointer opacity-80 hover:scale-105 hover:opacity-100
            duration-[0.2s] ease-in-out"
        src={profileImg_N}
        alt="프로필 수정 아이콘"
        onClick={handlePicUpload}
      />

      <p className="text-primary-700 text-[24px] font-bold font-pretendard mt-[8px]">
        {userInfo.fullName}
      </p>
    </div>
  );
}
