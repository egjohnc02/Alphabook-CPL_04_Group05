import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { auth, db } from '../../../firebase/firebase';
import AutoScrollToTop from '../../../utils/AutoScrollToTop'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

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

                    <p className="text-center">Hoặc đăng nhập bằng</p>
                    <div className="d-flex gap-1 justify-content-center">
                        <button className="text-light border-0 bg-primary d-flex gap-2 p-2 align-items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-facebook" viewBox="0 0 16 16">
                                <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951"/>
                            </svg>Facebook
                        </button>

                        <button className="text-light border-0 bg-danger d-flex gap-2 p-2 align-items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-google" viewBox="0 0 16 16">
                                <path d="M15.545 6.558a9.4 9.4 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.7 7.7 0 0 1 5.352 2.082l-2.284 2.284A4.35 4.35 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.8 4.8 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.7 3.7 0 0 0 1.599-2.431H8v-3.08z"/>
                            </svg>Google
                        </button>
                    </div>
                    <p className="text-center p-3">Bạn quên mật khẩu bấm <a href="#">vào đây</a></p>
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