import React, { useState } from "react";
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { auth } from "../../../firebase/firebase";
import { FirebaseError } from "firebase/app";

const DoiMatKhau: React.FC = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePasswordChange = async () => {
    setMessage("");
    if (newPassword !== confirmPassword) {
      setMessage("Mật khẩu xác nhận không khớp!");
      return;
    }
    if (newPassword.length < 6) {
      setMessage("Mật khẩu mới phải có ít nhất 6 ký tự!");
      return;
    }
    setLoading(true);

    try {
      const user = auth.currentUser;
      if (user && user.email) {
        const credential = EmailAuthProvider.credential(user.email, oldPassword);
        await reauthenticateWithCredential(user, credential);
        await updatePassword(user, newPassword);
        setMessage("Đổi mật khẩu thành công!");
        setNewPassword("")
        setOldPassword("")
        setConfirmPassword("")
      } else {
        setMessage("Người dùng không hợp lệ. Vui lòng đăng nhập lại.");
      }
    } catch (error) {
      if (error instanceof FirebaseError) {
        switch(error.code) {
          case 'auth/missing-password':
            setMessage("Vui lòng điền mật khẩu cũ!");
            break;

          case 'auth/invalid-credential':
            setMessage("Mật khẩu cũ không chính xác!");
            break;
          
          default:
            setMessage("Mã lỗi:" + error);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <nav className="fs-4">Đổi mật khẩu</nav>
      <nav>Để đảm bảo tính bảo mật, bạn vui lòng đặt lại mật khẩu với ít nhất 6 kí tự.</nav>
      {message && <p className={`text-${message.includes("thành công") ? "success" : "danger"}`}>{message}</p>}
      <div>
        <label htmlFor="old-password">Mật khẩu cũ *</label>
        <br />
        <input
          type="password"
          id="old-password"
          className="w-75"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
      </div>
      <br />

      <div>
        <label htmlFor="new-password">Mật khẩu mới *</label>
        <br />
        <input
          type="password"
          id="new-password"
          className="w-75"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>
      <br />

      <div>
        <label htmlFor="confirm-password">Xác nhận lại mật khẩu *</label>
        <br />
        <input
          type="password"
          id="confirm-password"
          className="w-75"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <br />

      <button
        className="text-white bg-orange border-0 p-2 rounded"
        onClick={handlePasswordChange}
        disabled={loading}
      >
        {loading ? "Đang xử lý..." : "Đặt lại mật khẩu"}
      </button>
    </div>
  );
};

export default DoiMatKhau;
