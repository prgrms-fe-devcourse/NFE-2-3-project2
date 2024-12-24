import { api } from "../../api/axios";
import { channelMapping } from "../../constants/channel";

export const getChannelPost = async (
  channelID: string,
  offset: number,
  limit: number
) => {
  try {
    const { data } = await api.get(
      `/posts/channel/${channelMapping[channelID]}?offset=${offset}&limit=${limit}`
    );
    return data;
  } catch (error) {
    console.error("데이터를 불러오는 도중 에러가 발생하였습니다.", error);
  }
};
