//profileApi.jsx
// src/api/profileApi.jsx
import axios from 'axios';

const BASE_URL = `${import.meta.env.VITE_NEWSPACE_TEST_BACKEND_URL}`.replace(/\/$/, '');
const profileUrl = `${BASE_URL}/api/user/profile`;

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
        console.log(' [프로필 사진 등록 성공]', response.data);
        return response.data;
    } catch (error) {
        console.error(' [프로필 사진 등록 실패]', error);
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
        console.log(' [프로필 사진 수정 성공]', response.data);
        return response.data;
    } catch (error) {
        console.error(' [프로필 사진 수정 실패]', error);
        throw error;
    }
};

// 📌 프로필 사진 삭제 (DELETE)
export const deleteProfileImage = async () => {
    try {
        const response = await axios.delete(profileUrl, {
            withCredentials: true
        });
        console.log('[프로필 사진 삭제 성공]', response.data);
        return response.data;
    } catch (error) {
        console.error(' [프로필 사진 삭제 실패]', error);
        throw error;
    }
};

// 📌 프로필 사진 다운로드 (GET)
export const downloadProfileImage = async () => {
    try {
        const response = await axios.get(profileUrl, {
            responseType: 'blob',
            withCredentials: true
        });
        console.log('[프로필 사진 다운로드 성공]', response);
        return URL.createObjectURL(response.data);
    } catch (error) {
        console.error(' [프로필 사진 다운로드 실패]', error);
        throw error;
    }
};
