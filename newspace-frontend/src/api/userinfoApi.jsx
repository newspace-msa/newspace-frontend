// src/api/userInfoApi.jsx
import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_NEWSPACE_TEST_BACKEND_URL}`.replace(/\/$/, '');
const profileUrl = `${BASE_URL}/api/user/profile`;

// 📌 회원정보 조회
export const getUserInfo = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/api/user/info`, {
            withCredentials: true,  
        });
        console.log("✅ [사용자 정보 조회 성공]:", response.data);
        return response.data;
    } catch (error) {
        console.error("❌ [사용자 정보 조회 실패]:", error);
        return null;
    }
};

// 📌 회원정보 수정
export const updateUserInfoApi = async (userInfo) => {
    try {
        const response = await axios.patch(`${BASE_URL}/api/user/info`, userInfo, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        });
        console.log("✅ [회원정보 수정 성공]", response.data);
        return response.data;
    } catch (error) {
        console.error("❌ [회원정보 수정 실패]", error);
        throw error;
    }
};

// 📌 프로필 사진 등록 (POST)
export const createProfileImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
        const response = await axios.post(profileUrl, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            withCredentials: true
        });
        console.log('✅ [프로필 사진 등록 성공]', response.data);
        return response.data;
    } catch (error) {
        console.error('❌ [프로필 사진 등록 실패]', error);
        throw error;
    }
};

// 📌 프로필 사진 수정 (PUT)
export const updateProfileImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
        const response = await axios.put(profileUrl, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            withCredentials: true
        });
        console.log('✅ [프로필 사진 수정 성공]', response.data);
        return response.data;
    } catch (error) {
        console.error('❌ [프로필 사진 수정 실패]', error);
        throw error;
    }
};

// 📌 프로필 사진 삭제 (DELETE)
export const deleteProfileImage = async () => {
    try {
        const response = await axios.delete(profileUrl, {
            withCredentials: true
        });
        console.log('✅ [프로필 사진 삭제 성공]', response.data);
        return response.data;
    } catch (error) {
        console.error('❌ [프로필 사진 삭제 실패]', error);
        throw error;
    }
};
