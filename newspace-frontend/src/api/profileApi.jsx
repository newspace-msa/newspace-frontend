// src/api/profileApi.jsx
import axios from 'axios';

// BASE_URL을 이 파일 내에서만 사용
const BASE_URL = `${import.meta.env.VITE_NEWSPACE_TEST_BACKEND_URL}`.replace(/\/$/, '');
const profileUrl = `${BASE_URL}/api/user/profile`;
const imageUrl = `${BASE_URL}/api/user/image`;



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
        console.log('[프로필 사진 등록 성공]', response.data);

        // response.data가 없는 경우 예외 처리
        if (!response.data || !response.data.profileImage) {
            console.error("❌ [서버 응답 오류] response.data가 없습니다:", response);
            throw new Error("서버 응답에 프로필 이미지 정보가 포함되지 않았습니다.");
        }
        return response.data.profileImage;
    } catch (error) {
        console.error('[프로필 사진 등록 실패]', error);
        throw error;
    }
};

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