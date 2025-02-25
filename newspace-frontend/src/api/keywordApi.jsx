import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_NEWSPACE_TEST_BACKEND_URL}`.replace(/\/$/, '');

// 키워드 목록 조회 
export const fetchKeywords = async () => {
    console.log("키워드 조회 GET 요청:", `${BASE_URL}/api/news/keyword`);
    try {
        const response = await axios.get(`${BASE_URL}/api/news/keyword`);
        console.log("키워드 조회 성공:", response.data);
        return response.data; 
    } catch (error) {
        console.log("키워드 조회 실패:", error);
        throw error;
    }
};


// 키워드 수정 
export const updateKeyword = async (id, name) => {
    console.log("키워드 수정 PUT 요청:", { id, name });

    // name이 없거나 빈 문자열이면 에러 방지
    if (!name.trim()) {
        console.error("오류: 유효하지 않은 name 값입니다.");
        throw new Error("name 값이 비어 있습니다.");
    }

    try {
        const response = await axios.put(`${BASE_URL}/api/news/keyword/${id}`, { name });

        console.log("키워드 수정 성공:", response.data);
        return response.data;
    } catch (error) {
        console.error("키워드 수정 실패:", error);
        throw error;
    }
};


// 키워드 삭제 
export const deleteKeyword = async (keywordId) => {
    console.log("키워드 삭제 DELETE 요청:", `${BASE_URL}/api/news/keyword/${keywordId}`);
    try {
        await axios.delete(`${BASE_URL}/api/news/keyword/${keywordId}`);
        console.log("키워드 삭제 성공: ID", keywordId);
        return true;
    } catch (error) {
        console.log("키워드 삭제 실패:", error);
        throw error;
    }
};