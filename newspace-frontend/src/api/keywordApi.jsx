import axios from "axios";

// 키워드 목록 조회
export const fetchKeywords = async () => {
  console.log("키워드 조회 GET 요청:", `/api/news/keyword`);
  try {
    const response = await axios.get(`/api/news/keyword`);
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

  try {
    const response = await axios.put(`/api/news/keyword/${id}`, {
      name,
    });

    console.log("키워드 수정 성공:", response.data);
    return response.data;
  } catch (error) {
    console.error("키워드 수정 실패:", error);
    throw error;
  }
};

// 키워드 삭제
export const deleteKeyword = async (keywordId) => {
  console.log("키워드 삭제 DELETE 요청:", `/api/news/keyword/${keywordId}`);
  try {
    await axios.delete(`/api/news/keyword/${keywordId}`);
    console.log("키워드 삭제 성공: ID", keywordId);
    return true;
  } catch (error) {
    console.log("키워드 삭제 실패:", error);
    throw error;
  }
};
