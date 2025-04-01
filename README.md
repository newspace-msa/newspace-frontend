# 🎯 NewSpace Frontend 클라우드 배포 프로젝트

<br/>

## 🚀 배포 주소

👉 [NewSpace 프론트엔드 배포 링크](http://d1wvssrshiud2m.cloudfront.net)

> 위 링크를 통해 실제 서비스된 프론트엔드 앱을 확인할 수 있습니다.

<br/>

## 📌 프로젝트 개요

newspace-msa 프로젝트의 프론트엔드 애플리케이션은 React + Vite 기반으로 개발되었으며,  
AWS 인프라를 활용하여 **자동화된 CI/CD 배포 파이프라인**을 구성하였습니다.

Jenkins, GitHub Webhook, AWS S3, AWS CloudFront를 사용하여 **코드 변경 → 자동 배포**가 가능한 클라우드 환경을 구축했습니다.

<br/>

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

## 📂 기존 Newspace Frontend 아키텍처

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

## 🧩 CI/CD 자동화 프로세스

```
       GitHub (main 브랜치 push)
                  │
                  ▼
          [ GitHub Webhook ]
                  │
                  ▼
             [ Jenkins ]
           (1) Vite 빌드 수행
        (2) S3에 정적 파일 업로드
( ./index.html에 대해 CloudFront 캐시 무효화 )
                  │
                  ▼
        [ AWS S3 + CloudFront ]
```

<br/>

## 🔁 백엔드 연동 구조 및 MSA 전환 개요

### 📡 프론트엔드 ↔ 백엔드 연동 구조

- 프론트에서는 환경 변수(VITE_NEWSPACE_TEST_BACKEND_URL)를 통해 API Gateway 주소를 주입받습니다.

- API 요청은 API Gateway를 거쳐 각 도메인별 마이크로서비스로 라우팅됩니다.

- 프론트엔드는 백엔드와 REST API로 통신하며, 아래와 같은 방식으로 요청을 주고받습니다.

```
            [ 사용자 브라우저 ]
                    │
                    ▼
     [ React 앱에서 axios로 HTTP 요청 ]
                    │
                    ▼
       [ API Gateway (Spring Boot) ]
                    │
                    ▼
           [ 각 마이크로서비스 ]
                    │
                    ▼
             [ 공용 AWS RDS ]
```

<br/>
