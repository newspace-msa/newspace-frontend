import Sidebar from "./sidebar";


import styled from "styled-components";

const Container = styled.div`
    display: flex;
`;

const Content = styled.div`
    margin-left: 120px; /* 사이드바 크기만큼 여백 */
    padding: 20px;
`;

const NewsMain = () => {

    return (
        <Container>
            <Sidebar />
            <Content>
                <h1>뉴스 메인 페이지</h1>
            </Content>
        </Container>
    );

}

export default NewsMain;
