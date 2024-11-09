import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AutoScrollToTop from '../../../utils/AutoScrollToTop';
import { auth, db } from '../../../firebase/firebase.js';
import { signInWithEmailAndPassword } from 'firebase/auth';
import LoginWith from '../../../components/Login/LoginWith';
import { doc, getDoc } from 'firebase/firestore';

const Login: React.FC = () => {
  AutoScrollToTop();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const navigate = useNavigate();

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userDoc = await getDoc(doc(db, "Users", user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        localStorage.setItem("userName", `${userData.FirstName} ${userData.LastName}`);
        localStorage.setItem("phoneNumber", userData.PhoneNumber);
      }

      setMessage("Đăng nhập thành công!");
      setLoading(false);
      localStorage.setItem("isLoggedIn", "true");
      setTimeout(() => {
        navigate('/home');
      }, 1000);

    } catch (error: any) {
      setLoading(false);
      if (error.code === 'auth/invalid-credential') {
        setMessage("Sai email hoặc mật khẩu, vui lòng nhập lại!");
      } else {
        setMessage("Đăng nhập thất bại, vui lòng thử lại sau.");
      }
    }
  };

  const handleForgotPassword = () => {
    setIsForgotPassword(true);
    setMessage("");
  };

  const handleBackToLogin = () => {
    setIsForgotPassword(false);
  };

  return (
    <div className="">
      <div className="container mt-5 d-flex justify-content-center w-50">
        <div className="container py-3 border-orange">
          {!isForgotPassword ? (
            <form onSubmit={login}>
              <h4>Đăng nhập tài khoản</h4>
              <p className="text-danger">{message}</p>
              {loading ? <p>Đang xử lý...</p> : null}
              <label className="text-body-secondary" htmlFor="email">
                Email<i style={{ color: "red" }}>*</i>
              </label>
              <input
                type="email"
                value={email}
                id="email"
                placeholder="Email"
                className="w-100 border-opacity-10 border p-2 rounded"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label className="pt-3 text-body-secondary" htmlFor="password">
                Mật khẩu<i style={{ color: "red" }}>*</i>
              </label>
              <input
                type="password"
                value={password}
                id="password"
                placeholder="Mật khẩu"
                className="w-100 border border-opacity-10 p-2 rounded"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button className="my-3 text-center w-100 p-2 bg-orange border-0 text-light rounded" type="submit">
                ĐĂNG NHẬP
              </button>
            </form>
          ) : (
            <form>
              <h4>Quên mật khẩu</h4>
              <p>Chúng tôi sẽ gửi cho bạn một email để kích hoạt việc đặt lại mật khẩu.</p>
              <input type="text" placeholder="Email" className="w-100 p-2 mb-2" />
              <input className="my-2 text-center w-100 p-2 bg-orange border-0 text-light rounded" type="submit" value="Gửi yêu cầu" />
              <button onClick={handleBackToLogin} className="my-2 text-center w-100 p-2 border-orange bg-light text-orange rounded fw-medium">
                Hủy
              </button>
            </form>
          )}

          {!isForgotPassword && (
            <>
              <LoginWith />
              <p className="text-center p-3">
                Bạn quên mật khẩu bấm <a href="#" onClick={handleForgotPassword}>vào đây</a>
              </p>
            </>
          )}
        </div>

        <div className="bg-orange text-light w-75">
          <div className="p-3">
            <h4>Quyền lợi với thành viên</h4>
            <p className="pt-4">Vận chuyển siêu tốc</p>
            {/* ... (rest of the benefits) ... */}
            <Link to="/register">
              <button className="bg-orange border border-light text-light fw-bold py-2 px-5 btn">
                Đăng ký
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;