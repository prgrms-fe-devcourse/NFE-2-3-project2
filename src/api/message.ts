import { axiosInstance } from "./axios";

export const postMessage = async (message: string, receiver: string) => {
  try {
    const { data } = await axiosInstance.post<Message>("/messages/create", {
      message,
      receiver,
    });
    return data;
  } catch (err) {
    console.error(err);
    return false;
  }
};

export const checkMessageSeen = async (sender: string) => {
  try {
    await axiosInstance.put("/messages/update-seen", {
      sender,
    });
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};
