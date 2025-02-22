import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css'; // CSS 파일 임포트
import logo from '../../assets/newspace_logo1.png'; // 로고 이미지 임포트

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        console.log('로그인 시도:', username, password);
        // 로그인 성공 시뮬레이션
        navigate('/news/main');
    };

    const handleLogoClick = () => {
        navigate('/news/main');
    };

    return (
        <div className="login-container login-abs-position login-flex-center" style={{ width: '100%', height: '100vh', backgroundColor: '#F5F5FB' }}>
            <div className="login-top-left-logo" onClick={handleLogoClick}>
                <img src={logo} alt="News Space Logo" style={{ width: '150px', cursor: 'pointer' }} />
            </div>
            <div className="login-form login-background-white" style={{ borderRadius: '20px', padding: '20px', width: '350px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                <h1 className="login-text-large">로그인</h1>
                <div className="login-divider"></div>
                <form onSubmit={handleLogin}>
                    <div className="login-input-group">
                        <label htmlFor="username">ID</label>
                        <input type="text" id="username" name="username" required className="login-input-text" onChange={e => setUsername(e.target.value)} />
                    </div>
                    <div className="login-input-group">
                        <label htmlFor="password">PASSWORD</label>
                        <input type="password" id="password" name="password" required className="login-input-text" onChange={e => setPassword(e.target.value)} />
                    </div>
                    <button type="submit" className="login-button" id="login-button">로그인</button>
                    <a href="/signup" className="login-link">회원가입</a>
                </form>
            </div>
        </div>
    );
}

export default Login;
