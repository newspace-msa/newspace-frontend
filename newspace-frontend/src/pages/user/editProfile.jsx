//editProfile.jsx
import React, { useState, useRef } from "react";
import styled from "styled-components";
import { FiUpload, FiTrash2, FiDownload, FiX } from "react-icons/fi";
import defaultProfile from "../../assets/profile.png"; // 기본 프로필 이미지(삭제 시)
import { updateUserInfo } from "../../api/userinfoApi"; // API 호출 함수 임포트 - 영서 개인정보수정 api
//프로필 이미지지 API
import { createProfileImage, updateProfileImage, deleteProfileImage, downloadProfileImage } from "../../api/profileApi";

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
    const [errorMessage, setErrorMessage] = useState(""); // 영서 
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

    // 저장 핸들러 - API 명세에 맞게 수정
    const handleSave = async () => {
        setErrorMessage(""); // 에러 초기화

        // 닉네임 유효성 검사
        if (!nickname.trim()) {
            setErrorMessage("닉네임을 입력해주세요.");
            return;
        }

        // 비밀번호 유효성 검사
        if (password || confirmPassword) {
            if (password !== confirmPassword) {
                setErrorMessage("비밀번호가 일치하지 않습니다.");
                return;
            }
            if (password.length < 4) {
                setErrorMessage("비밀번호는 4자리 이상이어야 합니다.");
                return;
            }
        }

        // 수정할 데이터 구성
        const updateData = {
            nickname: nickname || null,
            newPassword: password || null,
            newPasswordConfirm: confirmPassword || null
        };

        try {
            // API 호출
            const updatedUserInfo = await updateUserInfo(updateData); 

            // 🎯 응답(Response) 형식에 맞게 상태 업데이트
            setNickname(updatedUserInfo.nickname);
            setProfileImage(updatedUserInfo.profileImage?.trim() ? updatedUserInfo.profileImage : defaultProfile);

            alert("개인정보가 수정되었습니다.");

            // 모달 닫기
            onClose();
        } catch (error) {
            console.error("❌ [개인정보 수정 실패]", error);
            setErrorMessage("개인정보 수정에 실패했습니다. 다시 시도해주세요.");
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

