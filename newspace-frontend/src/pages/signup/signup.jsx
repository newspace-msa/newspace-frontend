// src/components/Signup.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './signup.css';
import logo from '../../assets/newspace_logo1.png';
import { signupApi, checkIdApi } from '../../api/signupApi'; // signupApi와 checkIdApi 임포트
import axios from 'axios'; // axios 임포트 추가

function Signup() {
    const [birthYear, setBirthYear] = useState('2000');
    const [birthMonth, setBirthMonth] = useState('01');
    const [birthDay, setBirthDay] = useState('01');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [checkPassword, setCheckPassword] = useState('');
    const [name, setName] = useState('');
    const [nickname, setNickname] = useState('');
    const [isActive, setIsActive] = useState(false);
    const [isUsernameAvailable, setIsUsernameAvailable] = useState(false);

    const navigate = useNavigate();

    // 로고 클릭 시 메인 페이지로 이동
    const handleLogoClick = () => {
        navigate('/news/main');
    };

    // 아이디 중복 확인
    const checkUsernameAvailability = async () => {
        if (!username) {
            alert('아이디를 입력하세요.');
            return;
        }

        setIsActive(true);

        try {
            const isAvailable = await checkIdApi(username);
            setIsUsernameAvailable(isAvailable);

            if (isAvailable) {
                alert('✅ 사용 가능한 아이디입니다.');
            } else {
                alert('❌ 이미 사용 중인 아이디입니다.');
            }
        } catch (error) {
            console.error('❌ [아이디 중복 확인 실패]', error);
            alert('아이디 중복 확인 중 오류가 발생했습니다.');
        } finally {
            setIsActive(false);
        }
    };

    // 회원가입 폼 제출
    const handleSignup = async (e) => {
        e.preventDefault();
        if (!isUsernameAvailable) {
            alert('아이디 중복 확인을 해주세요.');
            return;
        }
        if (password !== checkPassword) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }

        const userInfo = {
            username,
            password,
            passwordConfirm: checkPassword,
            name,
            nickname,
            birth: `${birthYear}-${birthMonth}-${birthDay}`
        };

        try {
            await signupApi(userInfo);
            alert('🎉 회원가입 완료!');
            resetForm();
            navigate('/news/main');
        } catch (error) {
            console.error('❌ [회원가입 실패]', error);
            alert('회원가입에 실패했습니다. 다시 시도해주세요.');
        }
    };

    // 상태 초기화
    const resetForm = () => {
        setUsername('');
        setPassword('');
        setCheckPassword('');
        setName('');
        setNickname('');
        setBirthYear('2000');
        setBirthMonth('01');
        setBirthDay('01');
        setIsUsernameAvailable(false);
        setIsActive(false);
    };

    // 년, 월, 일 옵션 생성
    const years = Array.from({ length: 126 }, (_, i) => (2025 - i).toString());
    const months = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));
    const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString().padStart(2, '0'));

    return (
        <div className="signup-page">
            <div className="top-left-logo" onClick={handleLogoClick}>
                <img src={logo} alt="News Space Logo" className="logo-image" />
            </div>
            <div className="signup-container">
                <div className="signup-form">
                    <h1 className="signup-title">회원가입</h1>
                    <form onSubmit={handleSignup}>
                        <label htmlFor="username">ID</label>
                        <div className="signup-input-group flex-row">
                            <input type="text" id="username" value={username} onChange={e => setUsername(e.target.value)} required className="signup-input-text" />
                            <button type="button" onClick={checkUsernameAvailability} className={`signup-check-button ${isActive ? 'active' : ''}`} disabled={isActive}>
                                {isActive ? '확인 중...' : '아이디 중복 확인'}
                            </button>
                        </div>
                        <div className="signup-input-group">
                            <label htmlFor="password">PASSWORD</label>
                            <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} required className="signup-input-text" />
                        </div>
                        <div className="signup-input-group">
                            <label htmlFor="check-password">PASSWORD 확인</label>
                            <input type="password" id="check-password" value={checkPassword} onChange={e => setCheckPassword(e.target.value)} required className="signup-input-text" />
                        </div>
                        <div className="signup-input-group">
                            <label htmlFor="name">이름</label>
                            <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} required className="signup-input-text" />
                        </div>
                        <div className="signup-input-group">
                            <label htmlFor="nickname">닉네임</label>
                            <input type="text" id="nickname" value={nickname} onChange={e => setNickname(e.target.value)} required className="signup-input-text" />
                        </div>
                        <button type="submit" className="signup-button">가입하기</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Signup;
