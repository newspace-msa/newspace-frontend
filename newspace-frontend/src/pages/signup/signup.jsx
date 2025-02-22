import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 훅 임포트
import './signup.css'; // CSS 파일 임포트
import logo from '../../assets/newspace_logo1.png'; // 로고 이미지 임포트

function Signup() {
    const [birthYear, setBirthYear] = useState('2000');
    const [birthMonth, setBirthMonth] = useState('01');
    const [birthDay, setBirthDay] = useState('01');
    const [username, setUsername] = useState('');
    const [isActive, setIsActive] = useState(false); // 버튼 상태를 관리하는 state

    const navigate = useNavigate();

    const handleLogoClick = () => {
        navigate('/news/main');
    };

    const checkUsernameAvailability = async () => {
        setIsActive(true);
        console.log('중복 확인:', username);
        // 예시: alert("이 아이디는 사용 가능합니다!");
        setTimeout(() => {
            setIsActive(false);
        }, 2000); // 2초 후에 버튼 상태를 초기화
    };

    const years = Array.from({ length: 126 }, (_, i) => (2025 - i).toString());
    const months = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));
    const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString().padStart(2, '0'));

    return (
        <div className="signup-container signup-abs-position signup-flex-center" style={{ width: '100%', height: '100vh' }}>
            <div className="signup-top-left-logo" onClick={handleLogoClick}>
                <img src={logo} alt="News Space Logo" style={{ width: '150px', cursor: 'pointer' }} />
            </div>
            <div className="signup-form signup-background-white" style={{ borderRadius: '20px', padding: '20px', width: '350px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                <h1 className="signup-text-large">회원가입</h1>
                <div className="signup-divider"></div>
                <form>
                    <label htmlFor="id">ID</label>
                    <div className="signup-input-group flex-row">
                        
                        <input type="text" id="username" name="username" value={username} onChange={e => setUsername(e.target.value)} required className="signup-input-text" />
                        <button type="button" onClick={checkUsernameAvailability} className={`signup-check-button ${isActive ? 'active' : ''}`}>아이디 중복 확인</button>
                    </div>
                    <div className="signup-input-group">
                        <label htmlFor="password">PASSWORD</label>
                        <input type="password" id="password" name="password" required className="signup-input-text" />
                    </div>
                    <div className="signup-input-group">
                        <label htmlFor="check-password">PASSWORD 확인</label>
                        <input type="check-password" id="check-password" name="check-password" required className="signup-input-text" />
                    </div>
                    <div className="signup-input-group">
                        <label htmlFor="name">이름</label>
                        <input type="text" id="name" name="name" required className="signup-input-text" />
                    </div>
                    <div className="signup-input-group">
                        <label htmlFor="nickname">닉네임</label>
                        <input type="text" id="nickname" name="nickname" required className="signup-input-text" />
                    </div>
                    <div className="signup-input-group">
                        <label htmlFor="birthdate">생년월일</label>
                        <div className="signup-date-selectors">
                            <select value={birthYear} onChange={e => setBirthYear(e.target.value)}>
                                {years.map(year => (
                                    <option key={year} value={year}>{year}</option>
                                ))}
                            </select>
                            <select value={birthMonth} onChange={e => setBirthMonth(e.target.value)}>
                                {months.map(month => (
                                    <option key={month} value={month}>{month}</option>
                                ))}
                            </select>
                            <select value={birthDay} onChange={e => setBirthDay(e.target.value)}>
                                {days.map(day => (
                                    <option key={day} value={day}>{day}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <button type="submit" className="signup-button" id="signup-button">가입하기</button>
                </form>
            </div>
        </div>
    );
}

export default Signup;
