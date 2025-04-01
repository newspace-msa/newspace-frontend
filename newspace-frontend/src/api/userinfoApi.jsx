// src/api/userinfoApi.jsx - 사용자 정보 변경 닉네임, 비밀번호
import axios from "axios";

// 회원정보조회
export const getUserInfo = async () => {
  try {
    const response = await axios.get(`/api/user/info`, {
      withCredentials: true,
    });
    console.log("사용자 정보 조회 성공:", response.data);
    return response.data;
  } catch (error) {
    console.error("사용자 정보 조회 실패:", error);
    return null;
  }
};

//회원정보 수정  - 영서
export const updateUserInfo = async (data) => {
  try {
    const response = await axios.patch(`/api/user/info`, data, {
      withCredentials: true,
    });
    console.log("사용자 정보 수정 성공:", response.data);
    return response.data;
  } catch (error) {
    console.error("사용자 정보 수정 실패:", error.response.data);
    throw error;
  }
};
