import { useEffect, useState } from "react";
import { axiosInstance } from "../api/axios";
import { useAuthStore } from "../store/authStore";

const useGetProfile = (userId: string | undefined, isMine: boolean) => {
  const [data, setData] = useState<User>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const updateUser = useAuthStore((state) => state.updateUser);

  const getProfile = async () => {
    if (!userId) return;

    try {
      setLoading(true);
      const { data } = await axiosInstance.get<User>(`/users/${userId}`);
      setData(data);
      if (isMine) updateUser(data);
    } catch (err) {
      if (err instanceof Error) setError(true);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProfile();
  }, [userId]);

  return { data, error, loading };
};

export default useGetProfile;
