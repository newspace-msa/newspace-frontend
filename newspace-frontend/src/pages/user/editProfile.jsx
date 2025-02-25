//editProfile.jsx
import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { FiUpload, FiTrash2, FiDownload, FiX } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext"; 
import defaultProfile from "../../assets/profile.png";
import { updateUserInfo } from "../../api/userinfoApi";
import { createProfileImage, deleteProfileImage, downloadProfileImage } from "../../api/profileApi";

// editProfile.jsx 상단에 BASE_URL 추가
const BASE_URL = `${import.meta.env.VITE_NEWSPACE_TEST_BACKEND_URL}`.replace(/\/$/, '');


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



const EditProfileModal = ({ onClose }) => {
    const { user, setUser } = useAuth();
    const [nickname, setNickname] = useState(user?.nickname || "");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [profileImage, setProfileImage] = useState(user?.profileImage ? `${BASE_URL}/api/user/image${user.profileImage}` : defaultProfile); 
    const [uploadedFile, setUploadedFile] = useState(null);
    const fileInputRef = useRef(null);

    

    // 프로필 이미지 다운로드 핸들러
    const handleProfileDownload = async () => {
        try {
            if (!user?.profileImage) {
                alert("다운로드할 프로필 이미지가 없습니다.");
                return;
            }
    
            // 서버에서 이미지 Blob 데이터 가져오기
            const blobData = await downloadProfileImage();

            // 파일 확장자 유지
            let fileExtension = user.profileImage.split(".").pop();
            fileExtension = fileExtension.length <= 5 ? fileExtension : "png"; // 확장자 없으면 기본값 설정
            const fileName = `profile_image.${fileExtension}`;

            // Blob 데이터를 파일로 변환하여 다운로드
            const blobUrl = URL.createObjectURL(blobData);
            const link = document.createElement("a");
            link.href = blobUrl;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            console.log("✅ 프로필 이미지 다운로드 성공:", fileName);

            // 메모리 누수 방지
            setTimeout(() => URL.revokeObjectURL(blobUrl), 100);
        } catch (error) {
            console.error("❌ 프로필 이미지 다운로드 실패", error);
            alert("프로필 이미지 다운로드에 실패했습니다. 다시 시도해주세요.");
        }
    };
    
    // 프로필 이미지 업로드 핸들러
    const handleProfileUpload = async (event) => {
        const file = event.target.files[0];
        if (file) {
            try {
                console.log("📡 [프로필 이미지 업로드 요청] 파일:", file);

                // 파일 객체를 직접 전달 (API 내부에서 FormData 생성)
                const imageUrl = await createProfileImage(file);
                console.log("✅ [프로필 이미지 업로드 성공] 파일 경로:", imageUrl);

                if (!imageUrl) throw new Error("서버 응답 오류: 이미지 URL이 없습니다.");

                // ✅ 올바른 새 프로필 이미지 URL 생성
                const newProfileImageUrl = `${BASE_URL}/api/user/image${imageUrl}`;
                console.log("🔄 [새 프로필 이미지 URL]:", newProfileImageUrl);

                // ✅ UI에서 즉시 반영
                setProfileImage(newProfileImageUrl);
    
                // 전역 AuthContext의 사용자 정보 업데이트 (setUser 적용)
                setUser((prevUser) => {
                    const updatedUser = { ...prevUser, profileImage: newProfileImageUrl };
                    localStorage.setItem("user", JSON.stringify(updatedUser)); // localStorage 업데이트
                    return updatedUser;
                });
    
                } catch (error) {
                    // console.error("❌ [프로필 이미지 업로드 실패]", error);
                    // setErrorMessage("프로필 이미지 업로드에 실패했습니다.");
                }
        }
    };
    

    // 프로필 이미지 삭제 핸들러
    const handleProfileDelete = async () => {
        try {
            await deleteProfileImage();

            setProfileImage(defaultProfile);

            setUser((prevUser) => {
                const updatedUser = { ...prevUser, profileImage: null };
                localStorage.setItem("user", JSON.stringify(updatedUser)); // localStorage 업데이트
                return updatedUser;
            });

        } catch (error) {
            // console.error(" [프로필 삭제 실패]", error);
            // setErrorMessage("프로필 삭제에 실패했습니다. 다시 시도해주세요.");
        }
    };




    // 개인정보 수정 완료 핸들러
    const handleSave = async () => {
        setErrorMessage("");

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
            if (!updatedUserInfo) throw new Error("서버 응답 오류: 업데이트 정보가 없습니다.");
            
            // AuthContext의 user 업데이트
            setUser((prevUser) => {
                const updatedUser = { ...prevUser, nickname: updatedUserInfo.nickname, profileImage };
                localStorage.setItem("user", JSON.stringify(updatedUser));
                return updatedUser;
            });

            alert("개인정보가 수정되었습니다.");
            window.location.reload(); // 메인 뉴스 화면 반영을 위해 새로고침
        } catch (error) {
            //console.error("❌ [개인정보 수정 실패]", error);
            //setErrorMessage("개인정보 수정에 실패했습니다. 다시 시도해주세요.");
        }
    };

    const handleClose = () => {
        onClose(); // 기존 모달 닫기 기능 수행
        window.location.reload(); // 페이지 새로고침
    };

    return (
        <Overlay onClick={handleClose}>
            <ModalContainer onClick={(e) => e.stopPropagation()}>
                <CloseButton onClick={handleClose}><FiX /></CloseButton>
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
                        <UserInfoText><Label>이름:</Label> {user?.name}</UserInfoText>
                        <UserInfoText><Label>아이디:</Label> {user?.userid}</UserInfoText>
                        <UserInfoText><Label>생년월일:</Label> {user?.birth}</UserInfoText>
                    </UserInfoLeft>
                    <InputContainer>
                        <InputGroup>
                            <Label>닉네임:</Label>
                            <InputField type="text" value={nickname} onChange={e => setNickname(e.target.value)} />
                        </InputGroup>
                        <InputGroup>
                            <Label>새 비밀번호:</Label>
                            <InputField type="password" value={password} onChange={e => setPassword(e.target.value)} />
                        </InputGroup>
                        <InputGroup>
                            <Label>비밀번호 확인:</Label>
                            <InputField type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                        </InputGroup>
                    </InputContainer>
                </UserInfoContainer>

                <SaveButton onClick={handleSave} >수정 완료</SaveButton>
                {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
            </ModalContainer>
        </Overlay>
    );
};

export default EditProfileModal;

