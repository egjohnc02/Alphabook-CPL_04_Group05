import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../firebase/firebase";
import { signOut } from "firebase/auth";
import ThongTinTaiKhoan from "./ThongTinTaiKhoan/ThongTinTaiKhoan";
import DonHang from "./DonHang/DonHang";
import DoiMatKhau from "../../../components/Account/DoiMatKhau/DoiMatKhau";
import SoDiaChi from "./SoDiaChi/SoDiaChi";
import AutoScrollToTop from "../../../utils/AutoScrollToTop";

const Customer: React.FC = () => {

  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState< "ThongTinTaiKhoan" | "DonHang" | "DoiMatKhau" | "SoDiaChi">("ThongTinTaiKhoan");
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
      case "ThongTinTaiKhoan":
        return <ThongTinTaiKhoan />;
      case "DonHang":
        return <DonHang />;
      case "DoiMatKhau":
        return <DoiMatKhau />;
      case "SoDiaChi":
        return <SoDiaChi />;
      default:
        return <ThongTinTaiKhoan />;
    }
  };

  return (
    <div className="pb-5 d-flex container gap-5">
      <AutoScrollToTop />
        <div>
          <nav className="fs-4">Trang tài khoản</nav>
          <nav className="fw-bolder">
            Xin chào, <span className="text-orange">{userName}</span>!
          </nav>
          <br />
          <p
            className="text-dark hover-text-orange text-decoration-none"
            onClick={() => setCurrentView("ThongTinTaiKhoan")}
            style={{ cursor: "pointer" }}
          >
            Thông tin tài khoản
          </p>
          <p
            className="text-dark hover-text-orange text-decoration-none"
            onClick={() => setCurrentView("DonHang")}
            style={{ cursor: "pointer" }}
          >
            Đơn hàng của bạn
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
            onClick={() => setCurrentView("SoDiaChi")}
            style={{ cursor: "pointer" }}
          >
            Sổ địa chỉ
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

export default Customer;