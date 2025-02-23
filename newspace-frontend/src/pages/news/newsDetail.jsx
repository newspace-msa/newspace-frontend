import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import styled from "styled-components";

import { fetchNewsByCategory } from "../../api/newsApi";

import Sidebar from "./sidebar";

const Container = styled.div`
    position: absolute;
    top: 100px;
    left: 200px;
    width: calc(95vw - 200px);
    height: 500px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 20px;
`;

const Title = styled.h1`
    font-size: 30px;
    font-weight: bold;
    margin-left: 20px;
    margin-bottom: 30px;
`;

const DetailBox = styled.div`
    width: 90%;
    border: 2px solid #13767b;

    padding: 0;
    background-color: white;
    display: table;
    margin-left: 20px;
    border-collapse: collapse; 
`;

const DetailRow = styled.div`
    display: table-row;
`;

const DetailLabel = styled.div`
    display: table-cell;
    width: 150px;
    padding: 12px;
    font-weight: bold;
    background-color: #f1f8f9;
    color: #13767b;
    border-right: 2px solid #13767b;
    text-align: left;

`;

const DetailValue = styled.div`
    display: table-cell;
    padding: 12px;
    text-align: left;
    color: #333;
`;

const NewsLink = styled.a`
    color: #13767b;
    text-decoration: none;
    font-weight: bold;

    &:hover {
        text-decoration: underline;
    }
`;

const NewsDetailPage = () => {
    const { category, id } = useParams(); // URL에서 category, id 값 가져오기
    const [newsData, setNewsData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNewsDetail = async () => {
            setLoading(true);
            setError(null);
            try {
                console.log("현재 카테고리:", category, "요청한 뉴스 ID:", id);
                const data = await fetchNewsByCategory(category); // 전체 카테고리 뉴스 목록 가져오기
                const selectedNews = data.find(news => String(news.id) === id); // 클릭한 뉴스 ID에 해당하는 데이터 찾기
                
                if (!selectedNews) {
                    setError("해당 뉴스를 찾을 수 없습니다.");
                } else {
                    setNewsData(selectedNews);
                }
            } catch (error) {
                setError("뉴스 데이터를 불러오는 중 오류가 발생했습니다.");
            } finally {
                setLoading(false);
            }
        };

        fetchNewsDetail();
    }, [category, id]);

    return (
        <>
            <Sidebar />
            <Container>
                {loading && <p>로딩 중...</p>}
                {error && <p style={{ color: "red" }}>{error}</p>}

                {newsData && (
                    <>
                        <Title>{newsData.title}</Title>
                        <DetailBox>
                            <DetailRow>
                                <DetailLabel>날짜</DetailLabel>
                                <DetailValue>{newsData.date}</DetailValue>
                            </DetailRow>
                            <DetailRow>
                                <DetailLabel>출처</DetailLabel>
                                <DetailValue>{newsData.source}</DetailValue>
                            </DetailRow>
                            <DetailRow>
                                <DetailLabel>내용</DetailLabel>
                                <DetailValue>{newsData.content}</DetailValue>
                            </DetailRow>
                            <DetailRow>
                                <DetailLabel>뉴스 링크</DetailLabel>
                                <DetailValue>
                                    <NewsLink href={newsData.link} target="_blank" rel="noopener noreferrer">
                                        {newsData.link}
                                    </NewsLink>
                                </DetailValue>
                            </DetailRow>
                        </DetailBox>
                    </>
                )}
            </Container>
        </>
    );
};

export default NewsDetailPage;