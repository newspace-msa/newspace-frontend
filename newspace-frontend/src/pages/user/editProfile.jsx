// src/pages/user/editProfile.jsx
import React, { useState, useRef } from "react";
import styled from "styled-components";
import { FiUpload, FiTrash2, FiDownload, FiX } from "react-icons/fi";
import defaultProfile from "../../assets/profile.png"; // 기본 프로필 이미지
import { updateUserInfo } from "../../api/userinfoApi"; // 개인정보 수정 API
import { createProfileImage, updateProfileImage, deleteProfileImage, downloadProfileImage } from "../../api/profileApi"; // 프로필 이미지 API

// 📌 Overlay: 모달 오버레이 스타일
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

// 📌 ModalContainer: 모달 창 스타일
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

// 📌 CloseButton: 닫기 버튼 스타일
const CloseButton = styled.button`
    background: none;
    border: none;
    font-size: 18px;
    cursor: pointer;
    position: absolute;
    top: 10px;
    right: 15px;
`;

// 📌 ProfileSection: 프로필 섹션 스타일
const ProfileSection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
`;

// 📌 ProfileImage: 프로필 이미지 스타일
const ProfileImage = styled.img`
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 50%;
    border: 2px solid #337477;
`;

// 📌 ProfileActions: 프로필 액션 버튼 스타일
const ProfileActions = styled.div`
    margin-top: 10px;
    display: flex;
    gap: 10px;
`;

// 📌 IconButton: 아이콘 버튼 스타일
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

// 📌 UserInfoContainer: 사용자 정보 컨테이너 스타일
const UserInfoContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
`;

// 📌 UserInfoText: 사용자 정보 텍스트 스타일
const UserInfoText = styled.div`
    font-size: 14px;
    color: #333;
    display: flex;
    align-items: center;
`;

// 📌 Label: 라벨 스타일
const Label = styled.label`
    font-weight: bold;
    font-size: 14px;
    width: 80px;
    display: inline-block;
`;

// 📌 InputField: 인풋 필드 스타일
const InputField = styled.input`
    flex: 1;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-left: 5px;
`;

// 📌 SaveButton: 저장 버튼 스타일
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
    const [errorMessage, setErrorMessage] = useState("");
    const fileInputRef = useRef(null);

    // 📌 프로필 업로드 핸들러
    const handleProfileUpload = async (event) => {
        const file = event.target.files[0];
        if (file) {
            try {
                const response = await createProfileImage(file);
                setProfileImage(response.url); 
                alert("프로필 사진이 등록되었습니다.");
            } catch (error) {
                console.error("❌ [프로필 사진 등록 실패]", error);
                setErrorMessage("프로필 사진 등록에 실패했습니다.");
            }
        }
    };

    // 📌 프로필 삭제 핸들러
    const handleProfileDelete = async () => {
        try {
            await deleteProfileImage();
            setProfileImage(defaultProfile);
            alert("프로필 사진이 삭제되었습니다.");
        } catch (error) {
            console.error("❌ [프로필 사진 삭제 실패]", error);
            setErrorMessage("프로필 사진 삭제에 실패했습니다.");
        }
    };

    // 📌 저장 핸들러
    const handleSave = async () => {
        setErrorMessage("");

        if (!nickname.trim()) {
            setErrorMessage("닉네임을 입력해주세요.");
            return;
        }

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

        const updateData = {
            nickname: nickname || null,
            newPassword: password || null,
            newPasswordConfirm: confirmPassword || null
        };

        try {
            const updatedUserInfo = await updateUserInfo(updateData);

            setNickname(updatedUserInfo.nickname);
            setProfileImage(updatedUserInfo.profileImage?.trim() ? updatedUserInfo.profileImage : defaultProfile);

            alert("개인정보가 수정되었습니다.");
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
                        <IconButton onClick={handleProfileDelete}><FiTrash2 /></IconButton>
                    </ProfileActions>
                    <input type="file" ref={fileInputRef} style={{ display: "none" }} onChange={handleProfileUpload} />
                </ProfileSection>

                <UserInfoContainer>
                    <UserInfoText><Label>닉네임</Label></UserInfoText>
                    <InputField type="text" value={nickname} onChange={(e) => setNickname(e.target.value)} />
                </UserInfoContainer>
                {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
                <SaveButton onClick={handleSave}>수정 완료</SaveButton>
            </ModalContainer>
        </Overlay>
    );
};

export default EditProfileModal;
