import { createContext, useContext, useEffect, useState } from "react";
import { getUserInfo } from "../api/userinfoApi";

// AuthContext 생성
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedAuth = localStorage.getItem("isAuthorized") === "true";

        if (storedAuth) {
            setIsAuthorized(true);
            fetchUserInfo(); 
        }
    }, []);

    const fetchUserInfo = async () => {
        const userInfo = await getUserInfo();
        if (userInfo) {
            setUser(userInfo);
            localStorage.setItem("user", JSON.stringify(userInfo)); // 사용자 정보 저장
        }
    };

    const login = () => {
        setIsAuthorized(true);
        localStorage.setItem("isAuthorized", "true");
        fetchUserInfo();
    };

    const logout = () => {
        setIsAuthorized(false);
        setUser(null); // 로그아웃 시 사용자 정보 삭제
        localStorage.removeItem("isAuthorized");
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider value={{ isAuthorized, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
