import { useParams, Link} from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";

import { fetchNewsByCategory } from "../../api/newsApi";

import Sidebar from "./sidebar";

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
                const data = await fetchNewsByCategory(category); // API 호출
                setNewsList(data); // 뉴스 리스트 상태 업데이트
            } catch (error) {
                setError("뉴스 데이터를 불러오는 중 오류가 발생했습니다.");
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, [category]); 
    

    return (
        <>
        <Sidebar />
        <Container>
                <Title>과거의 오늘 </Title>
                <Title2>가장 많이 주목받은 <HighlightedText>{category}</HighlightedText> 뉴스</Title2>

                {/* 로딩 중 표시 */}
                {loading && <p>로딩 중...</p>}

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
                        {newsList.map((news, index) => (
                            <TableRow key={index}>
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