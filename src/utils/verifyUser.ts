import { api } from "../api/axios";
import { useAuth } from "../stores/authStore";

const setUser = useAuth.getState().setUser;
const login = useAuth.getState().login;
const logout = useAuth.getState().logout;

export const verifyUser = async () => {
  const { status, data } = await api.get("/auth-user");
  if (!data) {
    logout();
    return;
  }
  if (status === 200) {
    setUser(data);
    login();
  }
};
