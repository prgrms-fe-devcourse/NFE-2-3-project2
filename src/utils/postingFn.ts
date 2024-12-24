import { api } from "../api/axios";

export const postingFn = async (formData: FormData) => {
  try {
    const response = await api.post("/posts/create", formData);

    return response;
  } catch (error) {
    console.log(error);
  }
};
