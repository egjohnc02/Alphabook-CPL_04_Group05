import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AutoScrollToTop from '../../../utils/AutoScrollToTop';
import { auth, db } from '../../../firebase/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import LoginWith from '../../../components/Login/LoginWith';
import { doc, getDoc } from 'firebase/firestore';
import { FirebaseError } from 'firebase/app';

const Login: React.FC = () => {
  return (
    <>
      <AutoScrollToTop />
      <div className="container mt-5 d-flex justify-content-center w-50">
        <div className="container py-3 border-orange">
          <LoginForm />
        </div>

        <div className="bg-orange text-light w-75">
          <div className="p-3">
            <h4>Quyền lợi với thành viên</h4>
            <p className="pt-4">Vận chuyển siêu tốc</p>
            <p>Sản phẩm đa dạng</p>
            <p>Đổi trả dễ dàng</p>
            <p>Tích điểm đổi quà</p>
            <p>Được giảm giá cho lần mua tiếp theo lên đến 10%</p>
            <Link to="/register">
              <button className="bg-orange border border-light text-light fw-bold py-2 px-5 btn">
                Đăng ký
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

const LoginForm: React.FC = () => {
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
            const isAdmin = email === "admin@fu.edu.vn";
            localStorage.setItem("userRole", isAdmin ? "admin" : "user");
        }

        setMessage("Đăng nhập thành công!");
        setLoading(false);
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("useId", user.uid);

        setTimeout(() => {
            if (email === "admin@fu.edu.vn") {
                navigate('/admin');
            } else {
                navigate('/customer');
            }
        }, 1000);
    } catch (error) {
        setLoading(false);
        if (error instanceof FirebaseError) {
            switch(error.code) {
                case 'auth/wrong-password':
                  setMessage("Sai email hoặc mật khẩu, vui lòng nhập lại!");
                    break;
                case 'auth/user-not-found':
                    setMessage("Sai email hoặc mật khẩu, vui lòng nhập lại!");
                    break;
                
                default:
                    setMessage("Đăng nhập thất bại, vui lòng thử lại sau.");
            }
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
    <>
      {!isForgotPassword ? (
        <form onSubmit={login}>
          <h4>Đăng nhập tài khoản</h4>
          {message && (
            <p className={`text-${message.includes("thành công") ? "success" : "danger"}`}>
              {message}
            </p>
          )}
          {loading && <p>Đang xử lý...</p>}
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
    </>
  );
};

export default Login;
