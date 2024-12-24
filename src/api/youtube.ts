import axios from "axios";

const axiosYoutubeInstance = axios.create({
  baseURL: `${import.meta.env.VITE_YOUTUBE_API_URL}`,
});

export const getOneYoutubeVideoInfo = async (videoId: string | null) => {
  try {
    if (!videoId) throw new Error("videoId가 null입니다!");

    const { data } = await axiosYoutubeInstance.get<YoutubeVideosType>(
      `/videos?part=snippet&id=${videoId}&key=${
        import.meta.env.VITE_YOUTUBE_API_KEY
      }`
    );

    const video = data.items[0];
    if (!video) {
      throw new Error("해당 아이디를 가진 영상이 존재하지 않습니다!");
    }
    return video;
  } catch (err) {
    console.error(err);
  }
};
