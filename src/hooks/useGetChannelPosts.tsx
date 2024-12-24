import { useEffect, useState } from "react";
import { axiosInstance } from "../api/axios";

const useGetChannelPosts = (channelId: string | undefined) => {
  const [data, setData] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const getChannelPosts = async () => {
    if (!channelId) return;

    try {
      setLoading(true);
      const { data } = await axiosInstance.get<Post[]>(
        `/posts/channel/${channelId}`
      );
      setData(data);
    } catch (err) {
      if (err instanceof Error) setError(true);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getChannelPosts();
  }, [channelId]);

  return { data, error, loading };
};

export default useGetChannelPosts;
