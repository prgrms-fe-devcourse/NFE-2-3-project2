import { useEffect, useState } from "react";
import { axiosInstance } from "../api/axios";

const useGetSearchKeyword = (keyword: string) => {
  const [data, setData] = useState<(User | SearchPost)[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getSearchKeyword = async () => {
      try {
        setLoading(true);
        const { data } = await axiosInstance.get(`/search/all/${keyword}`);
        setData(data);
      } catch (err) {
        if (err instanceof Error) setError(err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    getSearchKeyword();
  }, [keyword]);

  return { data, error, loading };
};

export default useGetSearchKeyword;
