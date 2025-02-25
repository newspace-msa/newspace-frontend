# newspace-frontend


<br>

## 📍 프로젝트명: Newspace

<br>


## 👩‍💻 팀원
<table>
    <tr>
        <!-- 첫 번째 팀원 -->
        <td align="center" width="50%">
            <img src="https://avatars.githubusercontent.com/judymoody59" alt="Avatar" width="100px"/><br/>
            <a href="https://github.com/judymoody59">채민주</a>
            <br/>
            <img src="https://github-readme-stats.vercel.app/api?username=judymoody59&show_icons=true&theme=transparent" alt="Minju's GitHub stats" width="350px"/>
        </td>
        <!-- 두 번째 팀원 -->
        <td align="center" width="50%">
            <img src="https://avatars.githubusercontent.com/Y0ungse" alt="Avatar" width="100px"/><br/>
            <a href="https://github.com/hayong39">유영서</a>
            <br/>
            <img src="https://github-readme-stats.vercel.app/api?username=Y0ungse&show_icons=true&theme=transparent" alt="Yeongseo's GitHub stats" width="350px"/>
        </td>
    </tr>
</table>
<br/>

## 🛠️ 기술 스택

<img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=HTML5&logoColor=white"> <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=CSS3&logoColor=white"> <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=black"> <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black"> <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=Vite&logoColor=white"> <img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=Figma&logoColor=white"> 

<br/>

## 📂 프로젝트 아키텍처

```
src/
│── api/
│   │── categoryApi.jsx               // 카테고리 API
│   │── keywordApi.jsx                // 키워드 API
│   │── loginApi.jsx                  // 로그인 API
│   │── managerApi.jsx                // 관리자 공지 API
│   │── newsApi.jsx                   // AI 뉴스 API
│   │── profileApi.jsx                // 프로필 사진 API
│   │── signupApi.jsx                 // 회원가입 API
│   │── userinfoApi.jsx               // 회원정보 API
│
│── assets/
│   │── newspace_logo1.png            // newspace 로고1
│   │── newspace_logo2.png            // newspace 로고2
│   │── profile.png                   // 프로필 디폴트 이미지
│   │── react.svg                     // react logo
│
│── context/
│   │── AuthContext.jsx               // 로그인 상태 확인 및 사용자 정보 관리
│
│── pages/
│   │── login/
│   │   │── login.css                 // 로그인 페이지 css
│   │   │── login.jsx                 // 로그인 페이지
│   │
│   │── news/
│   │   │── article.jsx               // 뉴스 기사 컴포넌트
│   │   │── keywords.jsx              // 키워드 컴포넌트
│   │   │── news_s.jsx                // 뉴스 메인 스타일
│   │   │── newsCategory.jsx          // 뉴스 카테고리 목록 페이지
│   │   │── newsDetail.jsx            // 뉴스 상세 페이지 
│   │   │── newsMain.jsx              // 뉴스 메인 페이지
│   │   │── notice.jsx                // 관리자 공지 컴포넌트
│   │   │── sidebar.jsx               // 사이드바 컴포넌트
│   │
│   │── signup/
│   │   │── signup.css                 // 회원가입 페이지 css
│   │   │── signup.jsx                 // 회원가입 페이지
│   │
│   │── user/
│   │   │── editProfile.jsx            // 개인정보수정 modal 컴포넌트
│   │   │── userToggle.jsx             // 회원 toggle 컴포넌트
│
│── App.css
│── App.jsx                            // 전역 인증 컨텍스트(AuthProvider) 및 라우팅 설정
│── index.css
│── main.jsx
│── .env                               // 환경 변수 설정
│── .gitignore
│── eslint.config.js
│── index.html
│── package-lock.json
│── package.json
│── README.md
│── vite.config.js
```
<br/>

