//editProfile.jsx
import React, { useState, useRef } from "react";
import styled from "styled-components";
import { FiUpload, FiTrash2, FiDownload, FiX } from "react-icons/fi";
import defaultProfile from "../../assets/profile.png"; // 기본 프로필 이미지(삭제 시)


const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5); 
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 3000;
`;

const ModalContainer = styled.div`
    background: white;
    width: 500px;
    border-radius: 15px;
    padding: 30px;
    border: 2px solid #337477;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    z-index: 3000;
    position: relative;
`;

const CloseButton = styled.button`
    background: none;
    border: none;
    font-size: 18px;
    cursor: pointer;
    position: absolute;
    top: 10px;
    right: 15px;
`;

const ProfileSection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
`;

const ProfileImage = styled.img`
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 50%;
    border: 2px solid #337477;
`;

const ProfileActions = styled.div`
    margin-top: 10px;
    display: flex;
    gap: 10px;
`;

const IconButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    font-size: 18px;
    color: #337477;

    &:hover {
        color: #285e5e;
    }
`;

const UserInfoContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
`;

const UserInfoLeft = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const UserInfoText = styled.div`
    font-size: 14px;
    color: #333;
    display: flex;
    align-items: center;
`;

const Label = styled.label`
    font-weight: bold;
    font-size: 14px;  
    width: 80px;       
    display: inline-block; 
`;

const InputField = styled.input`
    flex: 1;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-left: 5px;
`;

const InputGroup = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
`;

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const ErrorMessage = styled.div`
    color: red;
    font-size: 12px;
    margin-top: 5px;
`;

const SaveButton = styled.button`
    width: 100%;
    padding: 10px;
    background: ${({ disabled }) => (disabled ? "#ccc" : "#337477")};
    color: white;
    border: none;
    border-radius: 10px;
    font-size: 14px;
    cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
    margin-top: 15px;

    &:hover {
        background: ${({ disabled }) => (disabled ? "#ccc" : "#285e5e")};
    }
`;

const EditProfileModal = ({ user, onClose }) => {
    const [nickname, setNickname] = useState(user?.nickname || "");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [profileImage, setProfileImage] = useState(user?.image || defaultProfile);
    const fileInputRef = useRef(null);

    // 프로필 업로드 핸들러
    const handleProfileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // 프로필 삭제 핸들러
    const handleProfileDelete = () => {
        setProfileImage(defaultProfile);
    };

    // 프로필 다운로드 핸들러
    const handleProfileDownload = () => {
        const link = document.createElement("a");
        link.href = profileImage;
        link.download = "profile_image.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // 수정 완료 버튼 활성화 조건
    const isSaveDisabled = !nickname || (!!password && !confirmPassword) 

    // 저장 핸들러
    const handleSave = async () => {
        setErrorMessage("");

        // 비밀번호 변경 시 조건 확인
        if (password && password !== confirmPassword) {
            setErrorMessage("새 비밀번호와 비밀번호 확인이 일치하지 않습니다.");
            return;
        }

        const data = {
            nickname,
            newPassword: password,
            newPasswordConfirm: confirmPassword
        };

        try {
            // 1. 닉네임만 수정
            if (nickname !== user.nickname && !password && profileImage === user.image) {
                await updateUserInfo({ nickname });
            }
            // 2. 비밀번호만 수정
            else if (password && confirmPassword && nickname === user.nickname && profileImage === user.image) {
                await updateUserInfo({ newPassword: password, newPasswordConfirm: confirmPassword });
            }
            // 3. 프로필 사진만 수정
            else if (profileImage !== user.image && nickname === user.nickname && !password) {
                // TODO: 프로필 사진만 수정 API 연동
                console.log("프로필 사진만 수정");
            }
            // 4. 닉네임 & 비밀번호 수정
            else if (nickname !== user.nickname && password && confirmPassword && profileImage === user.image) {
                await updateUserInfo({ nickname, newPassword: password, newPasswordConfirm: confirmPassword });
            }
            // 5. 닉네임 & 프로필 사진 수정
            else if (nickname !== user.nickname && profileImage !== user.image && !password) {
                // TODO: 닉네임 & 프로필 사진 수정 API 연동
                console.log("닉네임 & 프로필 사진 수정");
            }
            // 6. 프로필 사진 & 비밀번호 수정
            else if (profileImage !== user.image && password && confirmPassword && nickname === user.nickname) {
                // TODO: 프로필 사진 & 비밀번호 수정 API 연동
                console.log("프로필 사진 & 비밀번호 수정");
            }
            // 7. 닉네임, 비밀번호, 프로필 사진 모두 수정
            else if (nickname !== user.nickname && profileImage !== user.image && password && confirmPassword) {
                // TODO: 모든 정보 수정 API 연동
                console.log("닉네임, 비밀번호, 프로필 사진 모두 수정");
            }

            // 성공적으로 수정된 경우 모달 닫기
            onClose();
        } catch (error) {
            setErrorMessage("정보 수정에 실패했습니다. 다시 시도해주세요.");
        }
    };

    return (
        <Overlay onClick={onClose}>
            <ModalContainer onClick={(e) => e.stopPropagation()}>
                <CloseButton onClick={onClose}><FiX /></CloseButton>
                <h3>개인정보 수정</h3>
                
                <ProfileSection>
                    <ProfileImage src={profileImage} alt="프로필" />
                    <ProfileActions>
                        <IconButton onClick={() => fileInputRef.current.click()}><FiUpload /></IconButton>
                        <IconButton onClick={handleProfileDownload}><FiDownload /></IconButton>
                        <IconButton onClick={handleProfileDelete}><FiTrash2 /></IconButton>
                    </ProfileActions>
                    <input type="file" ref={fileInputRef} style={{ display: "none" }} onChange={handleProfileUpload} />
                </ProfileSection>

                <UserInfoContainer>
                    <UserInfoLeft>
                        <UserInfoText><Label>이름</Label> {user?.name}</UserInfoText>
                        <UserInfoText><Label>아이디</Label> {user?.userid}</UserInfoText>
                        <UserInfoText><Label>생년월일</Label> {user?.birth}</UserInfoText>
                    </UserInfoLeft>

                    <InputContainer>
                        <InputGroup>
                            <Label>닉네임</Label>
                            <InputField type="text" value={nickname} onChange={(e) => setNickname(e.target.value)} />
                        </InputGroup>

                        <InputGroup>
                            <Label>새 비밀번호</Label>
                            <InputField type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </InputGroup>

                        <InputGroup>
                            <Label>비밀번호 확인</Label>
                            <InputField type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                        </InputGroup>
                    </InputContainer>
                </UserInfoContainer>

                <SaveButton onClick={handleSave} disabled={isSaveDisabled}>수정 완료</SaveButton>
            </ModalContainer>
        </Overlay>
    );
};

export default EditProfileModal;