import { api } from "../api/axios";

export const updateUserImg = async (formData: FormData) => {
  try {
    const response = await api.post("/users/upload-photo", formData);

    return response;
  } catch (err) {
    console.log(err);
  }
};
