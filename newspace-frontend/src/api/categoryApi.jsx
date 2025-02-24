import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_NEWSPACE_TEST_BACKEND_URL}`.replace(/\/$/, '');

// 카테고리 목록 조회 
export const fetchCategories = async () => {
    console.log("카테고리 조회 GET 요청:", `${BASE_URL}/api/news/category`);
    try {
        const response = await axios.get(`${BASE_URL}/api/news/category`);
        console.log("카테고리 조회 성공:", response.data);
        return response.data; 
    } catch (error) {
        console.log("카테고리 조회 실패:", error);
        throw error;
    }
};


// 카테고리 추가 
export const addCategory = async (name, icon) => {
    console.log("카테고리 추가 POST 요청:", { name, icon });
    try {
        const response = await axios.post(`${BASE_URL}/api/news/category`, { name, icon });
        console.log("카테고리 추가 성공:", response.data);
        return response.data;
    } catch (error) {
        console.log("카테고리 추가 실패:", error);
        throw error;
    }
};

// 카테고리 수정 
export const updateCategory = async (categoryId, name, icon) => {
    console.log("카테고리 수정 PUT 요청:", { categoryId, name, icon });
    try {
        const response = await axios.put(`${BASE_URL}/api/news/category/${categoryId}`, { name, icon });
        console.log("카테고리 수정 성공:", response.data);
        return response.data;
    } catch (error) {
        console.log("카테고리 수정 실패:", error);
        throw error;
    }
};


// 카테고리 삭제 
export const deleteCategory = async (categoryId) => {
    console.log("카테고리 삭제 DELETE 요청:", `${BASE_URL}/api/news/category/${categoryId}`);
    try {
        await axios.delete(`${BASE_URL}/api/news/category/${categoryId}`);
        console.log("카테고리 삭제 성공: ID", categoryId);
        return true;
    } catch (error) {
        console.log("카테고리 삭제 실패:", error);
        throw error;
    }
};