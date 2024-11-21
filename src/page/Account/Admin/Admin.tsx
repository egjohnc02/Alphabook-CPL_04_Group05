import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../firebase/firebase";
import { signOut } from "firebase/auth";
import UserManagement from "../../../components/Account/Admin/UserManagement"; // Component quản lý người dùng
import OrderManagement from "../../../components/Account/Admin/OrderManagement.tsx"; // Component quản lý đơn hàng
import DoiMatKhau from "../../../components/Account/DoiMatKhau/DoiMatKhau"; // Component đổi mật khẩu
import AutoScrollToTop from "../../../utils/AutoScrollToTop";

const Admin: React.FC = () => {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState<"UserManagement" | "OrderManagement" | "DoiMatKhau">("UserManagement");
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
      case "DoiMatKhau":
        return <DoiMatKhau />;
      default:
        return <UserManagement />;
    }
  };

  return (
    <div className="pb-5 d-flex container gap-5">
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
      <div>{renderView()}</div>
    </div>
  );
};

export default Admin;