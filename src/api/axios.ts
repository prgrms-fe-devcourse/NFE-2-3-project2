import axios from "axios";
import { useToken } from "../stores/tokenStore";

export const api = axios.create({
  baseURL: "https://5th.fe.dev-cos.com:5008",
});

api.interceptors.request.use(async (config) => {
  // 토큰 가져오기
  const token = useToken.getState().accessToken;
  // 토큰이 있으면 요청 헤더에 추가
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

// /.env 파일에 아래 코드 삽입
// VITE_API_URL=https://5th.fe.dev-cos.com:5001

//  or

// export const api = axios.create({
//   baseURL: `https://5th.fe.dev-cos.com:5001`,
// });
