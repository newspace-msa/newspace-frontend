import { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { fetchCategories, addCategory, updateCategory, deleteCategory } from "../../api/categoryApi";
import { useAuth } from "../../context/AuthContext"; 

import logo1 from "../../assets/newspace_logo1.png"; 
import { Banknote, Building, Users, Landmark, Plus, Book, Newspaper, Globe, Briefcase, 
        Home, Settings, Calendar, Star, Bell, BarChart, Shield, Heart, X 
} from "lucide-react";

import { getUserInfo } from "../../api/userinfoApi";

const SidebarContainer = styled.div`
    position: fixed;
    left: 0;
    top: 0;
    width: 130px;
    height: 100vh;
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 20px;
    box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
    z-index: 900; 
`;

const SidebarLogo = styled.img`
    width: 100px; 
    height: auto;
    margin-bottom: 10px; 
`;

const SidebarItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;
    padding: 15px 0;
    color: #333;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
        color: #1D7F81;
        transform: scale(1.1);
    }
`;

const SidebarText = styled.span`
    font-size: 17px;
    font-weight: bold;
`;

// 추가 버튼 스타일
const AddCategoryButton = styled.div`
    margin-top: auto;
    margin-bottom: 40px;
    padding: 15px;
    width: 15px; 
    height: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    background-color: #1D7F81;
    border-radius: 50px; 
    color: white;
    transition: 0.3s ease;

    &:hover {
        background-color: #145A5E;
        transform: scale(1.1);
    }
`;

// 모달 스타일
const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1100;
`;

const ModalContainer = styled.div`
    position: relative; 
    background: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
`;

const CloseButton = styled.div`
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
    color: #333;
    
    &:hover {
        color: #1D7F81;
    }
`;

const IconGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(8, 1fr); // 1줄에 8개
    gap: 10px;
    justify-items: center;
    padding: 10px;
`;

const IconOption = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    padding: 10px;
    border-radius: 8px;
    transition: 0.3s ease;
    background-color: ${({ selected }) => (selected ? "#1D7F81" : "transparent")};
    color: ${({ selected }) => (selected ? "white" : "black")};

    &:hover {
        transform: scale(1.1);
    }
`;

const Input = styled.input`
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 80%;
`;

const AddButton = styled.button`
    padding: 10px 15px;
    background-color: #1D7F81;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;

    &:hover {
        background-color: #145A5E;
    }
`;

const ContextPopup = styled.div`
    width: 80px;
    position: fixed;
    background: white;
    border: 1px solid #ccc;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    padding: 10px 0;
    border-radius: 5px;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const ContextPopupItem = styled.div`
    padding: 8px 12px;
    cursor: pointer;
    transition: background 0.2s;
    
    &:hover {
        background: #f0f0f0;
    }
`;

// 선택 가능한 아이콘 목록
const iconOptions = [
    { name: "Landmark", component: <Landmark size={24} /> },
    { name: "Banknote", component: <Banknote size={24} /> },
    { name: "Users", component: <Users size={24} /> },
    { name: "Building", component: <Building size={24} /> },
    { name: "Book", component: <Book size={24} /> },
    { name: "Newspaper", component: <Newspaper size={24} /> },
    { name: "Globe", component: <Globe size={24} /> },
    { name: "Briefcase", component: <Briefcase size={24} /> },
    { name: "Home", component: <Home size={24} /> },
    { name: "BarChart", component: <BarChart size={24} /> },
    { name: "Settings", component: <Settings size={24} /> },
    { name: "Calendar", component: <Calendar size={24} /> },
    { name: "Star", component: <Star size={24} /> },
    { name: "Bell", component: <Bell size={24} /> },
    { name: "Shield", component: <Shield size={24} /> },
    { name: "Heart", component: <Heart size={24} /> }
];

const iconMap = iconOptions.reduce((acc, icon) => {
    acc[icon.name] = icon.component;
    return acc;
}, {});


const Sidebar = () => {
    const { user, isAuthorized } = useAuth(); // 로그인 상태 확인
    const [categories, setCategories] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newCategory, setNewCategory] = useState("");
    const [selectedIcon, setSelectedIcon] = useState(null);
    const [editingCategory, setEditingCategory] = useState(null);
    const [popup, setPopup] = useState(null);
    const categoryRefs = useRef({}); 

    //카테고리 조회
    useEffect(() => {
        const loadCategories = async () => {
            try {
                const data = await fetchCategories();
                setCategories(data);
            } catch (error) {
                console.error("카테고리 불러오기 오류:", error);
            }
        };
        loadCategories();
    }, []);

    // 카테고리 클릭 시 로그인 확인 후 이동
    const handleCategoryClick = (categoryName) => {
        if (!isAuthorized) {
            navigate("/login");
        } else {
            navigate(`/news/${encodeURIComponent(categoryName)}`);
        }
    };

    // 카테고리 추가 & 수정
    const handleSave = async () => {
        if (!newCategory || !selectedIcon) return;
        
        try {
            if (editingCategory) {
                // 수정
                const updatedCategory = await updateCategory(editingCategory.id, newCategory, selectedIcon.name);
                setCategories(categories.map(cat => (cat.id === updatedCategory.id ? updatedCategory : cat)));
            } else {
                // 추가
                if (categories.length >= 8) {
                    alert("최대 8개의 카테고리만 생성 가능합니다.");
                    return;
                }
                const newCat = await addCategory(newCategory, selectedIcon.name);
                setCategories([...categories, newCat]);
            }
        } catch (error) {
            console.error("카테고리 추가/수정 실패:", error);
        } finally {
            setShowModal(false);
            setNewCategory("");
            setSelectedIcon(null);
            setEditingCategory(null);
        }
    };

    const handleDelete = async (categoryId) => {
        try {
            await deleteCategory(categoryId);
            setCategories(categories.filter(category => category.id !== categoryId));
            closePopup();
        } catch (error) {
            console.error("카테고리 삭제 실패", error);
        }
    };

    const popupRef = useRef(null);
    // 카테고리 우클릭시 팝업창 뜨기
    const handleRightClick = (event, category) => {
        event.preventDefault();
        if (user?.role !== "ADMIN") return; // ADMIN이 아니면 무시
        console.log("우클릭 이벤트 감지됨:", category);

        if (categoryRefs.current[category.id]) {
            const rect = categoryRefs.current[category.id].getBoundingClientRect();
            console.log("카테고리 위치:", rect);

            const newPopup = {
                x: rect.left + 40,
                y: rect.top + window.scrollY + 10,
                category,
            };

            popupRef.current = newPopup; // useRef로 상태 유지
            setPopup(newPopup);

            setTimeout(() => {
                console.log("popup 상태 업데이트됨:", popupRef.current);
            }, 100);
        }
    };

    useEffect(() => {
        console.log("popup 상태 변경 감지:", popup);
    }, [popup]);
    

    const closePopup = () => setPopup(null);

    // 팝업 닫기 이벤트 핸들러
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!popupRef.current || event.target.closest(".context-popup")) return;
            console.log("팝업 바깥 클릭 감지됨, 팝업 닫기");
            setPopup(null);
            popupRef.current = null;
        };
    
        if (popup) {
            setTimeout(() => { // 팝업 생성 후 바깥 클릭 감지 약간 늦추기
                document.addEventListener("click", handleClickOutside);
            }, 50);
        }
    
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [popup]);

    // 회원정보 조회 (user role 확인)
    useEffect(() => {
        const fetchUserRole = async () => {
            const userInfo = await getUserInfo();
            if (userInfo) {
                setUserRole(userInfo.role);
            }
        };
        fetchUserRole();
    }, []);
    


    return (
        <SidebarContainer>

            <Link to="/news/main">
                <SidebarLogo src={logo1} alt="Logo" />
            </Link>
            <div style={{ position: "relative" }} onClick={closePopup}>
            {categories.map((category) => (
                <SidebarItem 
                    key={category.id} 
                    onClick={() => handleCategoryClick(category.name)}
                    ref={(el) => (categoryRefs.current[category.id] = el)}
                    onContextMenu={(e) => handleRightClick(e, category)}
                >
                    {iconMap[category.icon] || <Plus size={24} />}
                    <SidebarText>{category.name}</SidebarText>
                </SidebarItem>
            ))}
            {popup && (
            <ContextPopup 
                className="context-popup" 
                style={{ 
                    top: `${Math.max(popup.y, 50)}px`, 
                    left: `${Math.max(popup.x, 10)}px`
                }}
            >
                <ContextPopupItem onClick={() => {
                    setEditingCategory(popup.category);
                    setNewCategory(popup.category.name);
                    setSelectedIcon(iconOptions.find(icon => icon.name === popup.category.icon));
                    setShowModal(true);
                }}>
                    수정
                </ContextPopupItem>
                <ContextPopupItem onClick={() => handleDelete(popup.category.id)}>삭제</ContextPopupItem>
            </ContextPopup>
        )}
                </div>

            {/* 추가 버튼(카테고리 최대 8개 제한) */}
            {user?.role === "ADMIN" && (
                <AddCategoryButton 
                    onClick={() => setShowModal(true)} 
                    disabled={categories.length >= 8}
                >
                    <Plus size={40} />
                </AddCategoryButton>
            )}

            {/* 모달 */}
            {showModal && (
                <ModalOverlay>
                    <ModalContainer>
                        <CloseButton onClick={() => setShowModal(false)}>
                            <X size={24} />
                        </CloseButton>
                        <h3>{editingCategory ? "카테고리 수정" : "카테고리 추가"}</h3>
                        <Input
                            type="text"
                            placeholder="카테고리명 입력"
                            value={newCategory}
                            onChange={(e) => setNewCategory(e.target.value)}
                        />
                        <IconGrid>
                            {iconOptions.map((icon) => (
                                <IconOption key={icon.name} selected={selectedIcon === icon} onClick={() => setSelectedIcon(icon)}>
                                    {icon.component}
                                </IconOption>
                            ))}
                        </IconGrid>
                        <AddButton onClick={handleSave}>{editingCategory ? "수정" : "추가"}</AddButton>
                    </ModalContainer>
                </ModalOverlay>
            )}
        </SidebarContainer>
    );
};

export default Sidebar;
