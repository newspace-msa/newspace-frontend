# newspace-frontend MSA

<br>

## 📍 프로젝트명: Newspace to MSA

<img src="https://github.com/user-attachments/assets/04d415b7-b379-4a0b-9aba-ff1d3609db85" width="300" />
<br>

## 👩‍💻 팀원

<table>
    <tr>
        <!-- 첫 번째 팀원 -->
        <td align="center" width="50%">
            <img src="https://avatars.githubusercontent.com/js4939" alt="Avatar" width="100px"/><br/>
            <a href="https://github.com/js4939">김지수</a>
            <br/>
            <img src="https://github-readme-stats.vercel.app/api?username=js4939&show_icons=true&theme=transparent" alt="Jisu's GitHub stats" width="350px"/>
        </td>
        <!-- 두 번째 팀원 -->
        <td align="center" width="50%">
            <img src="https://avatars.githubusercontent.com/Y0ungse" alt="Avatar" width="100px"/><br/>
            <a href="https://github.com/Y0ungse">유영서</a>
            <br/>
            <img src="https://github-readme-stats.vercel.app/api?username=Y0ungse&show_icons=true&theme=transparent" alt="Yeongseo's GitHub stats" width="350px"/>
        </td>
    </tr>
</table>
<br/>

## 🛠️ 기술 스택

<img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=HTML5&logoColor=white"> <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=CSS3&logoColor=white"> <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=black"> <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black"> <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=Vite&logoColor=white"> <img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=Figma&logoColor=white">
<img src="https://img.shields.io/badge/Jenkins-D24939?style=for-the-badge&logo=Jenkins&logoColor=white"> <img src="https://img.shields.io/badge/GitHub_Webhook-181717?style=for-the-badge&logo=github&logoColor=white"> <img src="https://img.shields.io/badge/AWS_S3-569A31?style=for-the-badge&logo=amazonaws&logoColor=white"> <img src="https://img.shields.io/badge/AWS_CloudFront-232F3E?style=for-the-badge&logo=amazonaws&logoColor=white">

<br/>

## 📂 프로젝트 아키텍처

```
├── newspace-frontend
│   ├── .metadata
│   ├── .vite
│   ├── node_modules
│   ├── public
│   │
│   ├── src
│   │   ├── api
│   │   │   ├── categoryApi.jsx               // 카테고리 API
│   │   │   ├── keywordApi.jsx                // 키워드 API
│   │   │   ├── loginApi.jsx                  // 로그인 API
│   │   │   ├── managerApi.jsx                // 관리자 공지 API
│   │   │   ├── newsApi.jsx                   // AI 뉴스 API
│   │   │   ├── profileApi.jsx                // 프로필 사진 API
│   │   │   ├── signupApi.jsx                 // 회원가입 API
│   │   │   └── userinfoApi.jsx               // 회원정보 API
│   │   │
│   │   ├── assets
│   │   │   ├── newspace_logo1.png            // newspace 로고1
│   │   │   ├── newspace_logo2.png            // newspace 로고2
│   │   │   ├── profile.png                   // 프로필 디폴트 이미지
│   │   │   └── react.svg                     // react logo
│   │   │
│   │   ├── context
│   │   │   └── AuthContext.jsx               // 로그인 상태 확인 및 사용자 정보 관리
│   │   │
│   │   └── pages
│   │       ├── login
│   │       │   ├── login.css                 // 로그인 페이지 css
│   │       │   └── login.jsx                 // 로그인 페이지
│   │       ├── news
│   │       │   ├── article.jsx               // 뉴스 기사 컴포넌트
│   │       │   ├── keywords.jsx              // 키워드 컴포넌트
│   │       │   ├── newsCategory.jsx          // 뉴스 카테고리 목록 페이지
│   │       │   ├── newsDetail.jsx            // 뉴스 상세 페이지
│   │       │   ├── newsMain.jsx              // 뉴스 메인 페이지
│   │       │   ├── news_s.jsx                // 뉴스 메인 스타일
│   │       │   ├── notice.jsx                // 관리자 공지 컴포넌트
│   │       │   └── sidebar.jsx               // 사이드바 컴포넌트
│   │       │
│   │       │
│   │       ├── signup
│   │       │   ├── signup.css                 // 회원가입 페이지 css
│   │       │   └── signup.jsx                 // 회원가입 페이지
│   │       └── user
│   │           ├── editProfile.jsx            // 개인정보수정 modal 컴포넌트
│   │           └── userToggle.jsx             // 회원 toggle 컴포넌트
│   │
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   ├── main.jsx
│   ├── .env
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── README.md
│   └── vite.config.js
│
```

<br/>
