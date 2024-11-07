import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { auth, db } from '../../../firebase/firebase';
import AutoScrollToTop from '../../../utils/AutoScrollToTop'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import LoginWith from '../../../components/Login/LoginWith';

export default function Register(){
    AutoScrollToTop()

    const [fname, setfname] = useState("")
    const [lname, setlname] = useState("")
    const [phone, setphone] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const register= async (e)=>{
        e.preventDefault();
        setLoading(true);
        setMessage(""); 

        try {
           const checkUser = await createUserWithEmailAndPassword(auth, email, password)
           const user = checkUser.user
           console.log(user)
           console.log("Done")
           if (user) {
            setDoc(doc(db, "Users", user.uid),{
                FirstName: fname,
                LastName: lname,
                PhoneNumber: phone,
                email: user.email,
            })
            setLoading(false)
            localStorage.setItem("isLoggedIn", true)
            setMessage("Đăng ký thành công!");
            setTimeout(() => {
                navigate('/home');
            }, 1000);
           }
        } catch (error) {
            setLoading(false);
            if (error.code === 'auth/email-already-in-use') {
                setMessage("Email đã tồn tại. Vui lòng thử email khác.");
            } else if(error.code === 'auth/invalid-email'){
                setMessage("Email không hợp lệ. Vui lòng thử email khác.")
            } else if(error.code === 'auth/weak-password'){
                setMessage("Mật khẩu phải có ít nhất 6 ký tự. Vui lòng nhập lại.")
            }
            else {
                setMessage(error.message);
            }
        }
    }

    return (
        <div>
            <div className='container mt-5 d-flex justify-content-center w-50'>
                <div className='container py-3 border-orange pe-4'>
                    <form onSubmit={register}>
                        <h4>Đăng ký tài khoản</h4>
                        <p className="text-danger">{message}</p>
                        {loading ? <p>Đang xử lý...</p> : null}
                        <label className="text-body-secondary" htmlFor="fname">Họ<i style={{color:'red'}}>*</i></label>
                        <input 
                            type="text"
                            value={fname}
                            id="fname"
                            placeholder='Họ'
                            className='w-100 border-opacity-10 border p-2 rounded'
                            onChange={(e)=>setfname(e.target.value)}
                            required
                        />

                        <label className='pt-3 text-body-secondary' htmlFor="lname">Tên<i style={{color:'red'}}>*</i></label>
                        <input 
                            type="text"
                            value={lname}
                            id="lname"
                            placeholder='Tên'
                            className='w-100 border border-opacity-10 p-2 rounded'
                            onChange={(e)=>setlname(e.target.value)}
                            required
                        />

                        <label className='pt-3 text-body-secondary' htmlFor='phone'>Số điện thoại<i style={{color:'red'}}>*</i></label>
                        <input 
                            type="number"
                            value={phone}
                            id="phone"
                            placeholder='Số điện thoại'
                            className='w-100 border border-opacity-10 p-2 rounded'
                            onChange={(e)=>setphone(e.target.value)}
                            required
                        />

                        <label className='pt-3 text-body-secondary' htmlFor='email'>Email<i style={{color:'red'}}>*</i></label>
                        <input 
                            type="email"
                            value={email}
                            id="email"
                            placeholder='Email'
                            className='w-100 border border-opacity-10 p-2 rounded'
                            onChange={(e)=>setemail(e.target.value)}
                            required
                        />

                        <label className='pt-3 text-body-secondary' htmlFor='password'>Mật khẩu<i style={{color:'red'}}>*</i></label>
                        <input 
                            type="password"
                            value={password}
                            id="password"
                            placeholder='Mật khẩu'
                            className='w-100 border border-opacity-10 p-2 rounded'
                            onChange={(e)=>setpassword(e.target.value)}
                            required
                        />
                        <button className='my-3 text-center w-100 p-2 bg-orange border-0 text-light rounded' type='submit'>Đăng ký</button>
                    </form>

                    <LoginWith />
                </div>
                
                <div className="bg-orange text-light w-75">
                    <div className="p-3">
                        <h4 className=''>Quyền lợi với thành viên</h4>
                        <p className="pt-4">Vận chuyển siêu tốc</p>
                        <p>Sản phẩm đa dạng</p>
                        <p>Đổi trả dễ dàng</p>
                        <p>Tích điểm đổi quà</p>
                        <p>Được giảm giá cho lần mua tiếp theo lên đến 10%</p>
                        <Link to="/login">
                            <button className="bg-orange border border-light text-light fw-bold py-2 px-5 btn">Đăng nhập</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}