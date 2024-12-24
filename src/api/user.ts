import { useAuthStore } from "../store/authStore";
import { axiosInstance } from "./axios";

export const getAllUsers = async () => {
  try {
    const { data } = await axiosInstance.get<User[]>("/users/get-users");
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const updateUser = async (
  selectedImage: SelectedImage | null,
  fullName: string | null
) => {
  const updateUserImage = useAuthStore.getState().updateUserImage;
  const updateUserFullName = useAuthStore.getState().updateUserFullName;

  try {
    const token = useAuthStore.getState().accessToken;
    if (!token) {
      console.error("User is not authenticated");
      return;
    }

    // 프로필 이미지 업데이트
    if (selectedImage?.file) {
      const formData = new FormData();
      formData.append("isCover", "false");
      formData.append("image", selectedImage?.file);

      const { data } = await axiosInstance.post(
        "/users/upload-photo",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      updateUserImage(data.image);
    }

    // 이름 업데이트
    if (fullName) {
      const { data } = await axiosInstance.put("/settings/update-user", {
        fullName,
      });
      updateUserFullName(data.fullName);
    }

    return true;
  } catch (error) {
    console.error("Error updating profile:", error);
    return false;
  }
};

export const updatePassword = async (password: string) => {
  try {
    await axiosInstance.put("/settings/update-password", {
      password,
    });
  } catch (error) {
    console.error("Error updating password:", error);
    throw error;
  }
};
