import { api } from "../api/axios";

export const updatePost = async (formData: FormData) => {
  try {
    const response = await api.put("/posts/update", formData);

    return response;
  } catch (error) {
    console.log(error);
  }
};
