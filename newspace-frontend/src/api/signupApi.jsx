// signupApi.jsx
import axios from 'axios';

export const signupApi = async (userData) => {
  try {
    const response = await axios.post(
      'http://localhost:8080//api/user/signup', // 실제 백엔드 URL에 맞게 수정
      userData,
      { withCredentials: true }
    );
    return response.data; // 회원가입 성공 시 응답 데이터 반환
  } catch (error) {
    console.error('회원가입 API 호출 실패:', error);
    throw error;
  }
};
