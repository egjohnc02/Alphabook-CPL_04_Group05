import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../firebase/firebase";
import { signOut } from "firebase/auth";
import UserManagement from "../../../components/Account/Admin/UserManagement";
import OrderManagement from "../../../components/Account/Admin/OrderManagement.tsx";
import DoiMatKhau from "../../../components/Account/DoiMatKhau/DoiMatKhau";
import AutoScrollToTop from "../../../utils/AutoScrollToTop";
import HTXBManagement from "../../../components/Account/Admin/HTXBManagement.tsx";
import SubManagement from "../../../components/Account/Admin/SubManagement.tsx";

import BookManagement from "../../../components/Account/Admin/BookManagement/BookManagement.tsx";
import EventManagement from "../../../components/Account/Admin/EventManagement";
import NewsManagement from "../../../components/Account/Admin/NewsManagement.tsx";

const Admin: React.FC = () => {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState<"UserManagement" | "OrderManagement" | "HTXBManagement" | "SubManagement" | "BookManagement" | "EventManagement" | "NewsManagement" | "DoiMatKhau">("UserManagement");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const name = localStorage.getItem("userName");
    if (name) {
      setUserName(name);
    }
  }, []);

  const logout = () => {
    signOut(auth)
      .then(() => {
        localStorage.clear();
        navigate("/login");
      })
      .catch((error) => {
        window.alert("Something went wrong: " + error);
      });
  };

  const renderView = () => {
    switch (currentView) {
      case "UserManagement":
        return <UserManagement />;
      case "OrderManagement":
        return <OrderManagement />;
      case "HTXBManagement":
        return <HTXBManagement />;
      case "DoiMatKhau":
        return <DoiMatKhau />;

      case "SubManagement":
        return <SubManagement />
      case "BookManagement":
        return <BookManagement />
      case "EventManagement":
        return <EventManagement />;
      case "NewsManagement":
        return <NewsManagement />
      default:
        return <UserManagement />;
    }
  };

  return (
    <div className="pb-5 d-flex container gap-3">
      <AutoScrollToTop />
      <div>
        <nav className="fs-4">Trang quản trị</nav>
        <nav className="fw-bolder">
          Xin chào, <span className="text-orange">{userName}</span>!
        </nav>
        <br />
        <p
          className="text-dark hover-text-orange text-decoration-none"
          onClick={() => setCurrentView("UserManagement")}
          style={{ cursor: "pointer" }}
        >
          Quản lý người dùng
        </p>
        <p
          className="text-dark hover-text-orange text-decoration-none"
          onClick={() => setCurrentView("OrderManagement")}
          style={{ cursor: "pointer" }}
        >
          Quản lý đơn hàng
        </p>
        <p
          className="text-dark hover-text-orange text-decoration-none"
          onClick={() => setCurrentView("HTXBManagement")}
          style={{ cursor: "pointer" }}
        >
          Quản lý HTXB
        </p>
        <p
          className="text-dark hover-text-orange text-decoration-none"
          onClick={() => setCurrentView("SubManagement")}
          style={{ cursor: "pointer" }}
        >
          Quản lý gói cao cấp
        </p>
        <p
          className="text-dark hover-text-orange text-decoration-none"
          onClick={() => setCurrentView("BookManagement")}
          style={{ cursor: "pointer" }}
        >
          Quản lý Sách
        </p>
        
        <p
          className="text-dark hover-text-orange text-decoration-none"
          onClick={() => setCurrentView("NewsManagement")}
          style={{ cursor: "pointer" }}
        >
          Quản lý tin tức
        </p>
        <p
          className="text-dark hover-text-orange text-decoration-none"
          onClick={() => setCurrentView("EventManagement")}
          style={{ cursor: "pointer" }}
        >
          Quản lý sự kiện
        </p>

        <p
          className="text-dark hover-text-orange text-decoration-none"
          onClick={() => setCurrentView("DoiMatKhau")}
          style={{ cursor: "pointer" }}
        >
          Đổi mật khẩu
        </p>

        <p
          className="text-dark hover-text-orange text-decoration-none"
          onClick={logout}
          style={{ cursor: "pointer" }}
        >
          Đăng xuất
        </p>
      </div>
      <div className="w-75">{renderView()}</div>
    </div>
  );
};

export default Admin;