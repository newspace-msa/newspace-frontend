// src/pages/news/newsMain.jsx

import { useEffect, useState } from "react";
import styled from "styled-components";
import { useAuth } from "../../context/AuthContext";
import defaultProfile from "../../assets/profile.png";
import Sidebar from "./sidebar";
import Notice from "./notice";
import NewsKeyword from "./keywords";
import NewsArticle from "./article";
import UserToggle from "../user/userToggle";
import { useNavigate } from "react-router-dom";

import {
    NewsTrack,
    NewsGridContainer,
    NewsCard,
    NewsTitle,
    NewsImage,
    NewsContent
} from "./news_s";

const SidebarWidth = "130px";

const PageContainer = styled.div`
    display: flex;
    width: 100vw;
    min-width: 100%;
    overflow-x: hidden;
`;

const NoticeContainer = styled.div`
    position: fixed;
    top: 20px;
    left: calc(${SidebarWidth} + 10px);
    background-color: #ffffff;
    z-index: 800;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 25px;
`;

const UserInfoContainer = styled.div`
    position: fixed;
    top: 33px;
    right: 80px;
    display: flex;
    align-items: center;
    gap: 10px;
    z-index: 800;
`;

const UserGreeting = styled.span`
    font-size: 16px;
    color: #333;
    margin-top: 5px;
`;

const UserIconContainer = styled.img`
    position: fixed;
    top: 30px;
    right: 20px;
    width: 40px;
    height: 40px;
    object-fit: cover;
    border-radius: 50%;
    cursor: pointer;
`;

const LoginText = styled.span`
    position: fixed;
    top: 40px;
    right: 20px;
    font-size: 16px;
    font-weight: bold;
    color: #007bff;
    cursor: pointer;
    display: flex;
    align-items: center;
    
    &:hover {
        text-decoration: underline;
    }
`;

const ToggleContainer = styled.div`
    position: relative;
    z-index: 1100;
`;

const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: calc(100% - ${SidebarWidth});
    margin-left: ${SidebarWidth};
    padding-top: 60px;
`;

const NewsContainer = styled.div`
    position: fixed;
    top: 120px;
    left: calc(${SidebarWidth} + 40px);
    width: calc(100vw - ${SidebarWidth} - 50px);
    max-width: 1100px;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 30px;
    z-index: 800;
`;

const Divider = styled.div`
    position: fixed;
    top: 400px;
    left: 170px;
    width: 85%;
    height: 2px;
    background-color: #ddd;
    z-index: 100;
`;

const NewsMain = () => {
    const { isAuthorized, user, logout } = useAuth();
    const navigate = useNavigate();

    const BASE_URL = `${import.meta.env.VITE_NEWSPACE_TEST_BACKEND_URL}`.replace(/\/$/, '');
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest(".user-dropdown") && !event.target.closest(".user-icon")) {
                setDropdownOpen(false);
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    const handleLogin = () => {
        navigate('/login');
    };

    const dummyNews = [
        {
            title: "주식 팔아치운 개미들…증권사 '발칵'",
            image: "https://img.hankyung.com/photo/202502/01.39584674.1.jpg",
            content: "메리츠증권에서 합병을 거친 나스닥 상장사의 주식이 일부 투자자 계좌에 잘못 표기...",
            link: "https://www.hankyung.com/article/202502211222i"
        },
        {
            title: "최악의 구직난… 사람인 취준생 55% \"합격만 하면 어디든 간다\"",
            image: "https://www.job-post.co.kr/news/photo/202502/127064_134591_4253.jpg",
            content: "구직난이 심화하면서 취업준비생들이 기업 형태를 가리지 않고...",
            link: "https://www.job-post.co.kr/news/articleView.html?idxno=127064#rs"
        }
    ];

    const newsList = [...dummyNews, ...dummyNews];

    return (
        <PageContainer>
            <Sidebar />
            <ContentContainer>
                <NoticeContainer>
                    <Notice />
                    {isAuthorized && user ? (
                        <UserInfoContainer>
                            <UserGreeting>
                                안녕하세요, <strong>{user.nickname}</strong>님!
                            </UserGreeting>
                            <UserIconContainer
                                className="user-icon"
                                src={user.profileImage ? `${BASE_URL}${user.profileImage}` : defaultProfile}
                                alt="user"
                                onClick={toggleDropdown}
                            />
                            <ToggleContainer>
                                <UserToggle
                                    isDropdownOpen={isDropdownOpen}
                                    user={user}
                                    profile={defaultProfile}
                                    logout={logout}
                                />
                            </ToggleContainer>
                        </UserInfoContainer>
                    ) : (
                        <LoginText onClick={handleLogin}>로그인</LoginText>
                    )}
                </NoticeContainer>
                <NewsContainer>
                    <NewsKeyword />
                    <a href="https://www.yna.co.kr/view/AKR20250217150300001" target="_blank" rel="noopener noreferrer">
                        <NewsArticle style={{ cursor: "pointer" }} />
                    </a>
                </NewsContainer>
                <Divider />
                <NewsGridContainer>
                    <NewsTrack>
                        {newsList.map((news, index) => (
                            <a
                                key={index}
                                href={news.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ textDecoration: "none", color: "inherit" }}
                            >
                                <NewsCard key={index}>
                                    <NewsTitle>{news.title}</NewsTitle>
                                    <NewsImage src={news.image} alt="뉴스 이미지" />
                                    <NewsContent>{news.content}</NewsContent>
                                </NewsCard>
                            </a>
                        ))}
                    </NewsTrack>
                </NewsGridContainer>
            </ContentContainer>
        </PageContainer>
    );
};

export default NewsMain;
