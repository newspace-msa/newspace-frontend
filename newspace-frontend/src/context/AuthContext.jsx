//AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { getUserInfo } from "../api/userinfoApi";
import { logoutApi } from "../api/loginApi";

// AuthContext 생성
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [user, setUser] = useState(null);

    // 사용자 정보 불러오기 함수
    const fetchUserInfo = async () => {
        try {
            const userInfo = await getUserInfo();
            if (userInfo) {
                setUser(userInfo);
                localStorage.setItem("user", JSON.stringify(userInfo)); // 사용자 정보 저장
            }
        } catch (error) {
            console.error("사용자 정보 조회 실패:", error);
        }
    };

    useEffect(() => {
        const storedAuth = localStorage.getItem("isAuthorized") === "true";

        if (storedAuth) {
            setIsAuthorized(true);
            fetchUserInfo(); 
        } else {
            console.log("🛑 로그인되지 않은 상태");
            setUser(null); // 로그아웃 상태일 경우 사용자 정보 초기화
        }
    }, []);


    const login = async() => {
        setIsAuthorized(true);
        localStorage.setItem("isAuthorized", "true");
        await fetchUserInfo(); 
    };

    const logout = async () => {
        try {
            await logoutApi(); // 백엔드 로그아웃 요청

            // 클라이언트 측 상태 초기화
            setIsAuthorized(false);
            setUser(null);
            localStorage.removeItem("isAuthorized");
            localStorage.removeItem("user");
            sessionStorage.clear();

            // // 모든 쿠키 삭제
            // document.cookie.split(";").forEach((cookie) => {
            //     document.cookie = cookie
            //         .replace(/^ +/, "")
            //         .replace(/=.*/, `=;expires=${new Date(0).toUTCString()};path=/`);
            // });

            // 페이지 새로고침 (로그인 상태 반영)
            window.location.reload();
        } catch (error) {
            console.error("로그아웃 실패:", error);
        }
    };

    return (
        <AuthContext.Provider value={{ isAuthorized, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};