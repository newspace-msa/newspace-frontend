// src/pages/user/editProfile.jsx
import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { FiUpload, FiTrash2, FiX } from "react-icons/fi";
import defaultProfile from "../../assets/profile.png";
import { updateUserInfo } from "../../api/userinfoApi";
import { createProfileImage, updateProfileImage, deleteProfileImage, getProfileImageUrl } from "../../api/profileApi";

const EditProfileModal = ({ user, onClose }) => {
    const [nickname, setNickname] = useState(user?.nickname || "");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [profileImage, setProfileImage] = useState(defaultProfile);
    const [errorMessage, setErrorMessage] = useState("");
    const fileInputRef = useRef(null);

    useEffect(() => {
        // 프로필 이미지 URL 설정
        setProfileImage(getProfileImageUrl(user?.profileImage));
    }, [user]);

    // 📌 프로필 업로드 핸들러
    const handleProfileUpload = async (event) => {
        const file = event.target.files[0];
        if (file) {
            try {
                const response = await createProfileImage(file);
                setProfileImage(getProfileImageUrl(response.file)); 
                alert("프로필 사진이 등록되었습니다.");
            } catch (error) {
                console.error("❌ [프로필 사진 등록 실패]", error);
                setErrorMessage("프로필 사진 등록에 실패했습니다.");
            }
        }
    };

    // 📌 프로필 수정 핸들러
    const handleProfileUpdate = async (event) => {
        const file = event.target.files[0];
        if (file) {
            try {
                const response = await updateProfileImage(file);
                setProfileImage(getProfileImageUrl(response.file));
                alert("프로필 사진이 수정되었습니다.");
            } catch (error) {
                console.error("❌ [프로필 사진 수정 실패]", error);
                setErrorMessage("프로필 사진 수정에 실패했습니다.");
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
            setProfileImage(getProfileImageUrl(updatedUserInfo.profileImage));
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
                    <input type="file" ref={fileInputRef} style={{ display: "none" }} onChange={handleProfileUpdate} />
                </ProfileSection>

                <UserInfoContainer>
                    <UserInfoText><Label>닉네임</Label></UserInfoText>
                    <InputField type="text" value={nickname} onChange={(e) => setNickname(e.target.value)} />
                </UserInfoContainer>
                <UserInfoContainer>
                    <UserInfoText><Label>비밀번호</Label></UserInfoText>
                    <InputField type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </UserInfoContainer>
                <UserInfoContainer>
                    <UserInfoText><Label>비밀번호 확인</Label></UserInfoText>
                    <InputField type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </UserInfoContainer>

                {errorMessage && <div style={{ color: 'red' }}>{errorMessage}</div>}
                <SaveButton onClick={handleSave}>수정 완료</SaveButton>
            </ModalContainer>
        </Overlay>
    );
};

export default EditProfileModal;
