import { useState, useEffect } from "react";
import styled from "styled-components";
import { Megaphone, Pencil, Check, Plus } from "lucide-react";

import { fetchNotice, saveNotice } from "../../api/managerApi"; 

import { getUserInfo } from "../../api/userinfoApi";

const NoticeWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 10px; 
    margin-bottom: 20px;
`;

const NoticeContainer = styled.div`
    width: 490px;
    height: 30px;
    padding: 10px 10px;
    border: 2px solid #1D7F81;
    border-radius: 8px;
    background-color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const NoticeContent = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`;

const NoticeTitle = styled.span`
    font-weight: bold;
    color: #1D7F81;
    display: flex;
    align-items: center;
    gap: 8px;

    svg {
        vertical-align: middle; 
        margin-top: 2px; 
    }
`;

const NoticeText = styled.span`
    color: #333;
`;

const NoticeInput = styled.input`
    border: none;
    outline: none; 
    padding: 5px;
    font-size: 14px;
    width: 300px;
    background-color: transparent;
`;

const EditButton = styled.button`
    display: flex;
    align-items: center;
    gap: 5px;
    background-color: #1D7F81;
    color: white;
    border: none;
    border-radius: 6px;
    padding: 10px 10px;
    cursor: pointer;
    font-size: 14px;
    font-weight: bold;
    
    &:hover {
        background-color: #155A5D;
    }
`;

const Notice = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [noticeText, setNoticeText] = useState(""); // 관리자 공지
    const [isLoading, setIsLoading] = useState(false);  
    const [error, setError] = useState(null); 
    const [hasNotice, setHasNotice] = useState(() => {
        return localStorage.getItem("hasNotice") === "true"; //  로컬 스토리지에서 공지 존재 여부 가져오기
    });
    const [userRole, setUserRole] = useState(null);

    const MAX_NOTICE_LENGTH = 22; // 최대 글자 수 설정

    const handleNoticeChange = (e) => {
        const inputText = e.target.value;
    
        // 입력된 텍스트가 최대 글자 수를 초과할 경우 자동으로 잘라서 설정
        if (inputText.length > MAX_NOTICE_LENGTH) {
            setNoticeText(inputText.slice(0, MAX_NOTICE_LENGTH));
            return;
        }
    
        setNoticeText(inputText);
    };
    

    // 공지 조회 (최초 로딩 시 실행)
    useEffect(() => {
        const loadNotice = async () => {
            setIsLoading(true);
            try {
                const data = await fetchNotice();
                if (data && data.content) {
                    setNoticeText(data.content);
                    setHasNotice(true);
                    localStorage.setItem("hasNotice", "true"); // 상태 변경 시 로컬스토리지에도 반영
                } else {
                    setHasNotice(false);
                    localStorage.setItem("hasNotice", "false"); 
                }
            } catch (err) {
                console.error("공지 불러오기 오류:", err);
                setError("공지 불러오기에 실패했습니다.");
            } finally {
                setIsLoading(false);
            }
        };

        loadNotice();
    }, []);

    // 공지 등록 및 수정
    const handleSave = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await saveNotice(noticeText); 
            setIsEditing(false);
            
            // 서버에서 받은 응답을 기반으로 업데이트
            if (response && response.content) {
                setNoticeText(response.content);
                setHasNotice(true);
                localStorage.setItem("hasNotice", "true"); 
            }
        } catch (err) {
            console.error("공지 저장 오류:", err);
            setError("공지 저장 중 오류가 발생했습니다.");
        } finally {
            setIsLoading(false);
        }
    };

    const getButtonLabel = () => {
        if (isEditing) return "저장"; 
        return noticeText.trim() ? "수정" : "등록"; 
    };
    const getButtonIcon = () => (isEditing ? <Check size={16} /> : hasNotice ? <Pencil size={16} /> : <Plus size={16} />);

    // 회원정보 조회 (user role 확인)
    useEffect(() => {
        const fetchUserRole = async () => {
            const userInfo = await getUserInfo();
            if (userInfo) {
                setUserRole(userInfo.role);
            }
        };
        fetchUserRole();
    }, []);

    return (
        <NoticeWrapper>
            <NoticeContainer>
                <NoticeContent>
                    <NoticeTitle>
                        <Megaphone size={18} /> 관리자 공지
                    </NoticeTitle>
                    {isLoading ? (
                        <NoticeText>로딩 중...</NoticeText> 
                    ) : error ? (
                        <NoticeText style={{ color: "red" }}>{error}</NoticeText>
                    ) : isEditing ? (
                        <NoticeInput 
                            type="text" 
                            value={noticeText} 
                            onChange={handleNoticeChange}
                            placeholder="공지 내용을 입력하세요" 
                        />
                    ) : (
                        <NoticeText>{noticeText || "등록된 공지가 없습니다."}</NoticeText>
                    )}
                </NoticeContent>
            </NoticeContainer>
            {userRole === "ADMIN" && (
            <EditButton onClick={isEditing ? handleSave : () => setIsEditing(true)} disabled={isLoading}>
                {getButtonIcon()} {getButtonLabel()}
            </EditButton>
            )}
        </NoticeWrapper>
    );
};

export default Notice;