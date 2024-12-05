import React, { useState, useEffect } from "react";
import { auth, db } from "../../../../firebase/firebase";
import { collection, doc, getDoc, getDocs, query, updateDoc, where, Timestamp } from "firebase/firestore";
import { sendEmailVerification } from "firebase/auth";

type Address = {
  phone?: string;
  address?: string;
  province?: string;
  district?: string;
  ward?: string;
  isDefault: boolean;
};

const ThongTinTaiKhoan: React.FC = () => {
  const [userName, setUserName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [activationCode, setActivationCode] = useState<string>("");
  const [isPremium, setIsPremium] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [expiryTime, setExpiryTime] = useState<Date | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<string>("");
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const formatAddress = (address?: Address) => {
    if (!address) return null;
    return [
      address.address,
      address.ward,
      address.district,
      address.province,
    ]
      .filter((part) => part)
      .join(", ");
  };

  const fetchUserData = async () => {
    const user = auth.currentUser;

    if (user) {
      setIsEmailVerified(user.emailVerified);

      try {
        const userRef = doc(db, "Users", user.uid);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          const data = userDoc.data();

          setUserName(`${data.FirstName || ""} ${data.LastName || ""}`.trim());
          const defaultAddress = (data.addresses as Address[] || []).find((addr) => addr.isDefault);

          if (defaultAddress) {
            setPhoneNumber(defaultAddress.phone || null);
            setAddress(formatAddress(defaultAddress));
          }

          if (data.isPremium && data.expiryDate) {
            const expiryDate = data.expiryDate.toDate();
            setIsPremium(true);
            setExpiryTime(expiryDate);
          } else {
            setIsPremium(false);
            setExpiryTime(null);
          }
        } else {
          console.warn("Tài liệu người dùng không tồn tại.");
        }
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu người dùng:", error);
      }
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [refreshTrigger]);

  useEffect(() => {
    if (expiryTime) {
      const intervalId = setInterval(() => {
        const now = new Date();
        const timeLeft = expiryTime.getTime() - now.getTime();

        if (timeLeft <= 0) {
          setIsPremium(false);
          setTimeRemaining("Gói cao cấp đã hết hạn");
          clearInterval(intervalId);
        } else {
          const days = Math.floor(timeLeft / (1000 * 3600 * 24));
          setTimeRemaining(`${days} ngày`);
        }
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [expiryTime]);

  const resendVerificationEmail = () => {
    const user = auth.currentUser;
    if (user && !user.emailVerified) {
      sendEmailVerification(user)
        .then(() => alert("Đã gửi link xác thực! Vui lòng kiểm tra email của bạn."))
        .catch((error) => console.error("Lỗi gửi email xác thực:", error));
    }
  };

  const handleActivateCode = async () => {
    if (!activationCode) {
      setErrorMessage("Vui lòng nhập mã kích hoạt.");
      return;
    }

    try {
      const premiumCodesRef = collection(db, "PremiumCodes");
      const q = query(premiumCodesRef, where("code", "==", activationCode));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const codeDoc = querySnapshot.docs[0];
        const codeData = codeDoc.data();

        if (codeData.isUsed) {
          setErrorMessage("Mã này đã được sử dụng.");
          return;
        }

        const user = auth.currentUser;
        if (user) {
          const userRef = doc(db, "Users", user.uid);

          const expiryDate = new Date();
          expiryDate.setDate(expiryDate.getDate() + 30);

          await updateDoc(userRef, {
            isPremium: true,
            expiryDate: Timestamp.fromDate(expiryDate)
          });

          await updateDoc(codeDoc.ref, {
            isUsed: true,
            usedBy: user.email,
            usedAt: Timestamp.now()
          });

          setRefreshTrigger(prev => prev + 1);
          setActivationCode("");
          setErrorMessage("");
          alert("Mã kích hoạt thành công. Bạn đã có gói cao cấp!");
        }
      } else {
        setErrorMessage("Mã không hợp lệ. Vui lòng kiểm tra lại.");
      }
    } catch (error) {
      console.error("Lỗi khi kích hoạt mã:", error);
      setErrorMessage("Có lỗi xảy ra. Vui lòng thử lại.");
    }
  };

  return (
    <div className="container my-4">
      <h2>Thông tin tài khoản</h2>
      <p>
        <span className="fw-bolder">Họ tên:</span> {userName || "Chưa cập nhật"}
      </p>
      <p>
        <span className="fw-bolder">Email:</span> {auth.currentUser?.email || "Chưa cập nhật"}
        {isEmailVerified ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-check-circle mx-2 text-success"
            viewBox="0 0 16 16"
          >
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14z" />
            <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z" />
          </svg>
        ) : (
          <span style={{ color: "red", marginLeft: "8px" }}>
            <button onClick={resendVerificationEmail}>Gửi email xác thực</button>
            <p>Xác thực email để đặt hàng</p>
          </span>
        )}
      </p>

      {phoneNumber && (
        <p>
          <span className="fw-bolder">Số điện thoại:</span> {phoneNumber}
        </p>
      )}

      {address && (
        <p>
          <span className="fw-bolder">Địa chỉ:</span> {address}
        </p>
      )}

      <div className="row mb-3">
        <div className="col-12">
          <p>
            <strong>Thành viên:</strong>
            {isPremium ? (
              <span className="text-success ms-2">
                Thành viên cao cấp
                {expiryTime && (
                  <small className="text-muted ms-2">
                    (Còn {timeRemaining})
                  </small>
                )}
              </span>
            ) : (
              <span className=" text-secondary ms-2">
                Thành viên cơ bản
              </span>
            )}
          </p>
        </div>
      </div>

      {!isPremium && (
        <div className="row">
          <div>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Nhập mã kích hoạt"
                value={activationCode}
                onChange={(e) => setActivationCode(e.target.value)}
              />
              <button
                className="btn btn-primary"
                onClick={handleActivateCode}
              >
                Kích hoạt
              </button>
            </div>
            {errorMessage && (
              <p className="text-danger mt-2">{errorMessage}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ThongTinTaiKhoan;