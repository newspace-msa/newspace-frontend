// src/api/signupApi.jsx
import axios from 'axios';

// 환경 변수에서 백엔드 URL 가져오기
const BASE_URL = `${import.meta.env.VITE_NEWSPACE_TEST_BACKEND_URL}`.replace(/\/$/, '');
const signupUrl = `${BASE_URL}/api/user/signup`;
const checkIdUrl = `${BASE_URL}/api/user/check-id`;
const signoutUrl = `${BASE_URL}/api/user/signout`; 

// 회원가입 API 호출
export const signupApi = async (userData) => {
    try {
        const response = await axios.post(signupUrl, userData, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        });
        
        if (response.status === 200) {
            console.log('✅ [회원가입 성공]', response.data);
            return response.data;
        }
    } catch (error) {
        console.error('❌ [회원가입 실패]', error);
        throw error;
    }
};

// 아이디 중복 확인 API 호출
export const checkIdApi = async (username) => {
    try {
        const response = await axios.get(`${checkIdUrl}?username=${username}`);
        
        console.log('🌐 [아이디 중복 체크 응답 상태 코드]', response.status);
        if (response.status === 200) {
            console.log('✅ [아이디 중복 체크 성공] 사용 가능한 아이디입니다.');
            return true;  // 이미 사용 중인 아이디
        }
    } catch (error) {
        if (error.response) {
            console.log('🌐 [아이디 중복 체크 에러 상태 코드]', error.response.status);

            // 상태 코드에 따른 논리 수정
            if (error.response.status === 400) {
                console.log('❌ [아이디 중복] 이미 사용 중인 아이디입니다.');
                return false;  // 사용 가능한 아이디
            } else {
                console.error('❌ [아이디 중복 체크 실패] 알 수 없는 서버 오류', error.response.status);
                alert('서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
            }
        } else {
            console.error('❌ [아이디 중복 체크 실패] 서버와 연결할 수 없습니다.');
            alert('서버와 연결할 수 없습니다.');
        }
        return false;
    }
};

// 회원 탈퇴
export const signoutApi = async() => {
    console.log("회원 탈퇴 요청 DELETE URL:", signoutUrl);

    try {
        const response = await axios.delete(signoutUrl,  {
            withCredentials: true //쿠키 인증
        });
        return response.data;
    } catch (error) {
        console.error('[회원탈퇴 실패]', error);
        if (error.response) {
            console.error("실패 응답 데이터:", error.response.data);
        }
        throw error;
    }

}
