import React, { useState, useEffect } from "react";
import { auth, db } from "../../../../firebase/firebase";
import { getAuth, onAuthStateChanged, sendEmailVerification } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const ThongTinTaiKhoan: React.FC = () => {
  const [userName, setUserName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [isPhoneEditing, setIsPhoneEditing] = useState(false);
  const [newPhoneNumber, setNewPhoneNumber] = useState("");

  useEffect(() => {
    const name = localStorage.getItem("userName");
    const phone = localStorage.getItem("phoneNumber");
    if (name) {
      setUserName(name);
    }
    if (phone) {
      setPhoneNumber(phone);
    }
  }, []);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsEmailVerified(user.emailVerified);
        const storedUserName = localStorage.getItem("userName");
        const storedPhoneNumber = localStorage.getItem("phoneNumber");

        if (!storedUserName || !storedPhoneNumber) {
          const userRef = doc(db, "Users", user.uid);
          getDoc(userRef).then((userDoc) => {
            if (userDoc.exists()) {
              const userData = userDoc.data();
              const fullName = `${userData.FirstName} ${userData.LastName}`;
              setUserName(fullName);
              localStorage.setItem("userName", fullName);

              if (userData.PhoneNumber) {
                setPhoneNumber(userData.PhoneNumber);
                localStorage.setItem("phoneNumber", userData.PhoneNumber);
              } else {
                setIsPhoneEditing(true);
              }
            }
          });
        }

        if (!user.emailVerified) {
          sendEmailVerification(user)
            .then(() => console.log("Verification email sent"))
            .catch((error) => console.error("Error sending verification email:", error));
        }
      } else {
        setIsEmailVerified(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const handlePhoneSave = async () => {
    const user = auth.currentUser;
    if (user && newPhoneNumber) {
      const userRef = doc(db, "Users", user.uid);
      try {
        await updateDoc(userRef, {
          PhoneNumber: newPhoneNumber,
        });
        setPhoneNumber(newPhoneNumber);
        localStorage.setItem("phoneNumber", newPhoneNumber);
        setIsPhoneEditing(false);
        setNewPhoneNumber("");
      } catch (error) {
        console.error("Error updating phone number:", error);
      }
    }
  };

  const resendVerificationEmail = () => {
    const user = auth.currentUser;
    if (user && !user.emailVerified) {
      sendEmailVerification(user)
        .then(() => window.alert("Đã gửi link xác ! Vui lòng kiểm tra email của bạn."))
        .catch((error) => console.error("Error:", error));
    }
  };

  return (
    <div>
      <p className="fs-4">Thông tin tài khoản</p>
      <p>
        <span className="fw-bolder">Họ tên: </span>
        {userName}
      </p>
      <p>
        <span className="fw-bolder">Email: </span> {auth.currentUser?.email}
        {isEmailVerified ? (
          <span> &#10003;</span>
        ) : (
          <span style={{ color: "red", marginLeft: "8px" }}>
            <button onClick={resendVerificationEmail}>Gửi email xác thực</button>
            <p>Xác thực email để đặt hàng</p>
          </span>
        )}
      </p>
      <p>
        <span className="fw-bolder">Điện thoại: </span>
        {phoneNumber || (isPhoneEditing && (
          <div>
            <input
              type="text"
              placeholder="Nhập số điện thoại"
              value={newPhoneNumber}
              onChange={(e) => setNewPhoneNumber(e.target.value)}
            />
            <button onClick={handlePhoneSave}>Lưu</button>
          </div>
        ))}
      </p>
    </div>
  );
};

export default ThongTinTaiKhoan;
