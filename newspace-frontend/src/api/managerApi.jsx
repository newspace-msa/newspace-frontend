import axios from "axios";

const NOTICE_ID = 1; // 고정된 공지 ID

// 관리자 공지 조회
export const fetchNotice = async () => {
  try {
    const url = `/api/notice`;
    console.log("공지 조회 GET 요청 URL:", url);

    const response = await axios.get(url);
    console.log("공지 응답 데이터:", response.data);

    return response.data; // 관리자 공지 데이터 반환
  } catch (error) {
    console.error("관리자 공지 불러오기 실패:", error);
    throw error;
  }
};

// 관리자 공지 등록 및 수정
export const saveNotice = async (content) => {
  try {
    const url = `/api/notice/${NOTICE_ID}`;
    console.log("공지 등록 및 수정 PUT 요청 URL:", url, "내용:", content);

    const response = await axios.put(
      url,
      { content },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    console.log("공지 저장 응답 데이터:", response.data);
    return response.data;
  } catch (error) {
    console.error("공지 저장 실패:", error);
    throw error;
  }
};
