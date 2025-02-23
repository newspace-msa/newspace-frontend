import { useParams, Link} from "react-router-dom";
import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

import { fetchNewsByCategory } from "../../api/newsApi";

import Sidebar from "./sidebar";

// 로딩 스피너 애니메이션
const spin = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
`;

const LoadingSpinner = styled.div`
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-left-color: #13767b; 
    width: 40px;
    height: 40px;
    border-radius: 50%;
    animation: ${spin} 1s linear infinite;
    margin: 20px auto;
`;


const Container = styled.div`
    position: absolute;
    top: 90px; /* Navbar 높이 제외 */
    left: 200px; /* Sidebar 너비 제외 */
    width: calc(95vw - 200px); /* 전체 너비에서 Sidebar(200px) 제외 */
    height: 800px; 
    display: flex;
    flex-direction: column;
    justify-content: flex-start; 
    align-items: center; /* 세로 중앙 정렬 */
`;

const Title = styled.h1`
    font-size: 28px;
    font-weight: bold;
    margin: 0px;
    color: #808080;
`;

const Title2 = styled.h1`
    font-size: 30px;
    font-weight: bold;
    margin-bottom: 70px;
`;

const HighlightedText = styled.span`
    color: #4880ee; /* 원하는 색상 코드 */
    font-weight: bold;
`;


const NewsTable = styled.table`
    width: 100%;
    border-collapse: collapse;
`;

const TableHeader = styled.th`
    text-align: left;
    padding: 10px;
    border-bottom: 2px solid #13767b;
    font-weight: bold;
`;

const TableRow = styled.tr`
    border-bottom: 1px solid #ccc;
`;

const TableData = styled.td`
    padding: 15px;
    text-align: left;
    vertical-align: middle;
`;

const TitleLink = styled(Link)`
    text-decoration: none;
    color: #13767b;
    font-weight: bold;
    
    &:hover {
        text-decoration: underline;
    }
`;

const NewsCategoryPage = () => {
    const { category } = useParams(); 
    const [newsList, setNewsList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNews = async () => {
            setLoading(true);
            setError(null);
            try {
                console.log(`API 요청 시작 (category: ${category})`);
                const data = await fetchNewsByCategory(category); // API 호출
                setNewsList(data); // 뉴스 리스트 상태 업데이트

                // localStorage에 저장
                localStorage.setItem(`news_${category}`, JSON.stringify(data));
                console.log(`localStorage에 저장된 데이터 (category: ${category}):`, data);
            } catch (error) {
                setError("뉴스 데이터를 불러오는 중 오류가 발생했습니다.");
            } finally {
                setLoading(false);
            }
        };

        // localStorage에서 기존 데이터 확인
        const savedData = localStorage.getItem(`news_${category}`);
        
        if (savedData) {
            const parsedData = JSON.parse(savedData);
            console.log(`localStorage에서 불러온 데이터 (category: ${category}):`, parsedData);
            setNewsList(parsedData);
            setLoading(false);
        }
    
        // ✅ localStorage에 데이터가 없을 때만 API 호출하도록 변경
        if (!savedData) {
            console.log(`API 호출 필요, localStorage 데이터 없음 (category: ${category})`);
            fetchNews();
        }



        return () => {
            // 상세 페이지가 아닐 때 localStorage 삭제
            const currentPath = decodeURIComponent(window.location.pathname);  
            console.log("현재 페이지 디코딩된 경로:", currentPath);

            if (!currentPath.startsWith(`/news/${category}/`) && currentPath !== `/news/${category}`) {
                console.log("LocalStorage 데이터 삭제:", `news_${category}`);
                localStorage.removeItem(`news_${category}`);
            }
        };
    }, [category]);

    

    return (
        <>
        <Sidebar />
        <Container>
                <Title>과거의 오늘 </Title>
                <Title2>가장 많이 주목받은 <HighlightedText>{category}</HighlightedText> 뉴스</Title2>

                {/* 로딩 스피너 표시 */}
                {loading && <LoadingSpinner />}

                {/* 에러 메시지 표시 */}
                {error && <p style={{ color: "red" }}>{error}</p>}

                {/* 뉴스 목록 출력 */}
                {!loading && !error && newsList.length > 0 ? (
                <NewsTable>
                    <thead>
                        <tr>
                            <TableHeader>제목</TableHeader>
                            <TableHeader>날짜</TableHeader>
                            <TableHeader>출처</TableHeader>
                        </tr>
                    </thead>
                    <tbody>
                        {newsList.map((news) => (
                            <TableRow key={news.id}>
                                <TableData>
                                    <TitleLink to={`/news/${encodeURIComponent(category)}/${news.id}`}>
                                        {news.title}
                                    </TitleLink>
                                </TableData>
                                <TableData>{news.date}</TableData>
                                <TableData>{news.source}</TableData>
                            </TableRow>
                        ))}
                    </tbody>
                </NewsTable>
                ) : (
                    !loading && !error && <p>해당 카테고리의 뉴스가 없습니다.</p>
                )}
            </Container>
        </>
    );
};

export default NewsCategoryPage;