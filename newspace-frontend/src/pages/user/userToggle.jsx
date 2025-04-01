//userToggle.jsx
import { useState } from "react";
import styled from "styled-components";
import { FiLogOut, FiUserX } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import { signoutApi } from "../../api/signupApi";
import defaultProfile from "../../assets/profile.png";
import EditProfileModal from "./editProfile";

const DropdownMenu = styled.div`
  position: absolute;
  top: 55px;
  right: -50px;
  background: white;
  border: 2px solid #337477;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 250px;
  display: ${(props) => (props.open ? "block" : "none")};
  padding: 25px;
  text-align: center;
  z-index: 1002;
  pointer-events: auto;
`;

const DropdownItem = styled.div`
  padding: 10px;
  cursor: pointer;
  font-size: 14px;
  color: #333;

  &:hover {
    background: #f5f5f5;
  }
`;

const ProfileImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 50%;
  display: block;
  margin: 0 auto 10px;
`;

const UserName = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: black;
  margin-bottom: 15px;
`;

const EditProfileButton = styled.button`
  width: 100%;
  padding: 10px;
  background: #337477;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  cursor: pointer;
  margin-bottom: 30px;

  &:hover {
    background: #285e5e;
  }
`;

const LogoutButton = styled.button`
  width: 100%;
  padding: 10px;
  background: #3374ff;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 15px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 10px;

  &:hover {
    background: #285bcc;
  }
`;

const LogoutIcon = styled(FiLogOut)`
  font-size: 22px;
`;

const DeleteAccountButton = styled.button`
  width: 100%;
  padding: 10px;
  background: #ff4d4d;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 15px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    background: #cc0000;
  }
`;

const DeleteIcon = styled(FiUserX)`
  font-size: 22px;
`;

const UserToggle = ({ isDropdownOpen, logout }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const { user, setUser } = useAuth();

  const handleLogout = () => {
    logout(); // 로그아웃 함수 실행
    //window.location.reload();  // 새로고침하여 상태 초기화
  };

  const handleSignOut = async () => {
    const confirmDelete = window.confirm(
      "정말로 회원 탈퇴를 진행하시겠습니까?"
    );
    if (!confirmDelete) return;

    try {
      await signoutApi(); // 회원 탈퇴 API 호출
      alert("회원 탈퇴가 완료되었습니다.");

      await logout();
      // localStorage 명시적으로 삭제 (혹시 남아있을 경우)
      localStorage.removeItem("user");
      localStorage.removeItem("isAuthorized");
      sessionStorage.clear();

      // 100ms 지연 후 새로고침 (상태 업데이트 반영 보장)
      setTimeout(() => {
        window.location.reload();
      }, 100);
    } catch (error) {
      alert("회원 탈퇴에 실패했습니다. 다시 시도해주세요.");
      console.error(" 회원 탈퇴 실패", error);
    }
  };

  return (
    <>
      <DropdownMenu open={isDropdownOpen}>
        <ProfileImage
          src={
            user?.profileImage
              ? `/api/user/image${user.profileImage}`
              : defaultProfile
          }
          alt="user"
        />
        <UserName>{user?.name}</UserName>
        <EditProfileButton onClick={() => setModalOpen(true)}>
          개인정보 수정
        </EditProfileButton>

        <LogoutButton onClick={handleLogout}>
          <LogoutIcon />
          로그아웃
        </LogoutButton>

        <DeleteAccountButton onClick={handleSignOut}>
          <DeleteIcon />
          회원 탈퇴
        </DeleteAccountButton>
      </DropdownMenu>

      {isModalOpen && (
        <EditProfileModal
          user={user}
          onUpdateUser={(updatedUserInfo) => setUser(updatedUserInfo)}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  );
};

export default UserToggle;
