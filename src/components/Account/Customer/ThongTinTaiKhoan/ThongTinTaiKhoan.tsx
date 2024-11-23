import React, { useState, useEffect } from "react";
import { auth, db } from "../../../../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
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

  useEffect(() => {
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

              const fullAddress = [
                defaultAddress.address,
                defaultAddress.ward,
                defaultAddress.district,
                defaultAddress.province,
              ]
                .filter((part) => part)
                .join(", ");
              setAddress(fullAddress || null);
            }
          } else {
            console.warn("Tài liệu người dùng không tồn tại.");
          }
        } catch (error) {
          console.error("Lỗi khi lấy dữ liệu người dùng:", error);
        }
      }
    };

    fetchUserData();
  }, []);

  const resendVerificationEmail = () => {
    const user = auth.currentUser;
    if (user && !user.emailVerified) {
      sendEmailVerification(user)
        .then(() => alert("Đã gửi link xác thực! Vui lòng kiểm tra email của bạn."))
        .catch((error) => console.error("Lỗi gửi email xác thực:", error));
    }
  };

  return (
    <div>
      <p className="fs-4">Thông tin tài khoản</p>

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
    </div>
  );
};

export default ThongTinTaiKhoan;
