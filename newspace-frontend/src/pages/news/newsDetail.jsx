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

    useEffect(() => {
        const storedNews = localStorage.getItem(`news_${category}`);
        console.log("LocalStorage 저장된 데이터:", storedNews); 

        if (storedNews) {
            const newsList = JSON.parse(storedNews);
            const selectedNews = newsList.find((news) => String(news.id) === id);

            if (selectedNews) {
                setNewsData(selectedNews);
            } else {
                setNewsData(null);
            }
        }
    }, [category, id]);


    return (
        <>
            <Sidebar />
            <Container>
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