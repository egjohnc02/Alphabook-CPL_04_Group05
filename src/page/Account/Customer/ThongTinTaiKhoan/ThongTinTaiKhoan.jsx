import { auth } from "../../../../firebase/firebase"
import { useEffect, useState } from "react";

export default function ThongTinTaiKhoan(){
    const [userName, setUserName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const user = auth.currentUser;
    const email = user.email;

    useEffect(() => {
        const name = localStorage.getItem("userName");
        const phone = localStorage.getItem("phoneNumber")
        if (name) {
            setUserName(name);
        }
        if (phone){
            setPhoneNumber(phone)
        }
    }, []);
    
    return(
        <div>
            <p className="fs-4">Thông tin tài khoản</p>
            <p><span className="fw-bolder">Họ tên: </span>{userName}</p>
            <p><span className="fw-bolder">Email:</span> {email}</p>
            <p><span className="fw-bolder">Điện thoại:</span> {phoneNumber}</p>
        </div>
    )
}