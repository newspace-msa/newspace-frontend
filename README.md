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
 CloudFront에 index.html 캐시 무효화 요청
                  │
                  ▼
       [ AWS S3 + CloudFront ]
```

<br/>

## 📡 프론트엔드 ↔ 백엔드 마이크로서비스 연동 구조

- 프론트엔드는 별도의 환경 변수 없이, **CloudFront 도메인 하나로 모든 API 요청을 처리**합니다.

- React 앱에서 `/api/...` 경로로 요청을 보내면, CloudFront가 해당 요청을 EC2에 위치한 API Gateway로 프록시합니다.

- API Gateway는 요청을 적절한 마이크로서비스로 라우팅하고, 각 서비스는 공용 AWS RDS에 접근하여 데이터를 처리합니다.

- 프론트와 백엔드가 같은 도메인에서 통신하기 때문에, **쿠키 전송, SameSite 정책, CORS 문제가 자연스럽게 해결**됩니다.

- 프론트에서는 axios를 통해 **상대경로**(`/api/xxx`)로만 요청하면 되므로, 환경 변수 없이도 운영이 가능합니다.

- 전체 흐름은 다음과 같습니다:

```
            [ 사용자 브라우저 ]
                    │
                    ▼
   [ React 앱에서 axios로 /api/xxx 요청 ]
                    │
                    ▼
    [ CloudFront (리버스 프록시 역할) ]
                    │
                    ▼
 [ API Gateway (Spring Boot - EC2:8072) ]
                    │
                    ▼
    [ 각 마이크로서비스 (Spring Boot) ]
                    │
                    ▼
             [ 공용 AWS RDS ]
```

<br/>
