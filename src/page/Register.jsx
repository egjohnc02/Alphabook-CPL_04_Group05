export default function Register(){
    return (
        <div>
            <div className='login-head text-center py-4 bg-cover'>
                <nav>Trang chủ</nav>
                <h2 className=''>Đăng ký tài khoản</h2>
            </div>
            <div className='container mt-5 d-flex justify-content-center w-50'>
                <form className='container py-3 border-orange pe-4'>
                    <h4>Đăng ký tài khoản</h4>
                    <h6 className="text-body-secondary">Họ<i style={{color:'red'}}>*</i></h6>
                    <input type="text" name="" id="" placeholder='Họ'className='w-100 border-opacity-10 border p-2 rounded' required/>
                    <h6 className='pt-3 text-body-secondary'>Tên<i style={{color:'red'}}>*</i></h6>
                    <input type="text" name="" id="" placeholder='Tên' className='w-100 border border-opacity-10 p-2 rounded' required/>
                    <h6 className='pt-3 text-body-secondary'>Số điện thoại<i style={{color:'red'}}>*</i></h6>
                    <input type="number" name="" id="" placeholder='Số điện thoại' className='w-100 border border-opacity-10 p-2 rounded' required/>
                    <h6 className='pt-3 text-body-secondary'>Email<i style={{color:'red'}}>*</i></h6>
                    <input type="email" name="" id="" placeholder='Email' className='w-100 border border-opacity-10 p-2 rounded' required/>
                    <h6 className='pt-3 text-body-secondary'>Mật khẩu<i style={{color:'red'}}>*</i></h6>
                    <input type="password" name="" id="" placeholder='Mật khẩu' className='w-100 border border-opacity-10 p-2 rounded' required/>
                    <button className='my-3 text-center w-100 py-1 bg-orange border-0 text-light rounded'>Đăng ký</button>
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
                </form>
                <div className="bg-orange text-light w-75">
                    <div className="p-3">
                        <h4 className=''>Quyền lợi với thành viên</h4>
                        <p className="pt-4">Vận chuyển siêu tốc</p>
                        <p>Sản phẩm đa dạng</p>
                        <p>Đổi trả dễ dàng</p>
                        <p>Tích điểm đổi quà</p>
                        <p>Được giảm giá cho lần mua tiếp theo lên đến 10%</p>
                        <button className="bg-orange border border-light text-light fw-bold py-2 px-5 btn rounded">Đăng nhập</button>
                    </div>
                </div>
            </div>
        </div>
    )
}