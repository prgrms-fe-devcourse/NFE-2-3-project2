import { useEffect, useState } from "react";
import { axiosInstance } from "../api/axios";

const useGetMessageList = () => {
  const [messageList, setMessageList] = useState<Conversation[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const getMessageList = async () => {
    try {
      if (!messageList) setLoading(true);
      const { data } = await axiosInstance.get<Conversation[]>(
        "/messages/conversations"
      );
      setMessageList(data);
    } catch (err) {
      if (err instanceof Error) setError(true);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMessageList();
  }, []);

  return { messageList, error, loading, refetch: getMessageList };
};

export default useGetMessageList;
