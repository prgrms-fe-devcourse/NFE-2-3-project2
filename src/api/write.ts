import { axiosInstance } from "./axios";

export const getAllChannels = async () => {
  try {
    const { data } = await axiosInstance.get<Channel[]>("/channels");
    return data;
  } catch (error) {
    console.error(error);
  }
};
