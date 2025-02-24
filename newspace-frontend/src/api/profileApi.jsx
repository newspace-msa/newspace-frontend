// src/api/profileApi.jsx
import axios from 'axios';

// BASE_URL을 이 파일 내에서만 사용
const BASE_URL = `${import.meta.env.VITE_NEWSPACE_TEST_BACKEND_URL}`.replace(/\/$/, '');
const profileUrl = `${BASE_URL}/api/user/profile`;
const imageUrl = `${BASE_URL}/api/user/image`;
const DEFAULT_PROFILE_IMAGE = `${imageUrl}/default.png`;

// 📌 프로필 이미지 URL 생성
export const getProfileImageUrl = (filePath) => {
    // profileImage가 없거나 공백일 경우 기본 이미지 사용
    if (!filePath || filePath.trim() === "") {
        return DEFAULT_PROFILE_IMAGE;
    }
    // 슬래시 중복 방지
    return `${imageUrl}${filePath}`.replace(/\/+/g, '/');
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
