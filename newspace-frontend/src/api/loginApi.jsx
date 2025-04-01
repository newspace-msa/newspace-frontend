import axios from "axios";

export const loginApi = async (username, password) => {
  const requestBody = { username, password }; // 요청 바디를 변수에 저장하여 로그에 사용
  const url = `/api/user/login`;
  console.log("로그인 요청 POST URL:", url); // 요청 URL 로깅
  console.log("로그인 요청 바디:", requestBody); // 요청 바디 로깅

  try {
    const response = await axios.post(
      url,
      requestBody,
      { withCredentials: true } // 쿠키를 통해 JWT를 받기 위해 필요
    );

    console.log("로그인 응답 데이터:", response.data); // 응답 데이터 로깅
    console.log("로그인 성공 응답 헤더:", response.headers); // 응답 헤더 로깅

    return response.data; // 로그인 성공 응답 데이터 반환
  } catch (error) {
    console.error("로그인 API 호출 실패:", error);
    if (error.response) {
      console.error("로그인 실패 응답 데이터:", error.response.data); // 실패 응답 데이터 로깅
      console.error("로그인 실패 응답 헤더:", error.response.headers); // 실패 응답 헤더 로깅
    }
    throw error;
  }
};

export const logoutApi = async () => {
  const url = `/api/user/logout`;
  console.log("로그아웃 요청 POST URL:", url);

  try {
    const response = await axios.post(url, {}, { withCredentials: true });

    console.log("로그아웃 응답 데이터:", response.data);
    return response.data;
  } catch (error) {
    console.error("로그아웃 API 호출 실패:", error);
    if (error.response) {
      console.error("로그아웃 실패 응답 데이터:", error.response.data);
    }
    throw error;
  }
};
