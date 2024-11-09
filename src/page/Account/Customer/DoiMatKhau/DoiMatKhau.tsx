import React from "react";

const DoiMatKhau: React.FC = () => {
  return (
    <div>
      <p className="fs-4">Đổi mật khẩu</p>
      <br />
      <p>Để đảm bảo tính bảo mật bạn vui lòng đặt lại mật khẩu với ít nhất 6 kí tự</p>
      <div>
        <label htmlFor="old-password">Mật khẩu cũ *</label>
        <br />
        <input type="password" id="old-password" className="w-75" />
      </div>
      <br />

      <div>
        <label htmlFor="new-password">Mật khẩu mới *</label>
        <br />
        <input type="password" id="new-password" className="w-75" />
      </div>
      <br />

      <div>
        <label htmlFor="confirm-password">Xác nhận lại mật khẩu *</label>
        <br />
        <input type="password" id="confirm-password" className="w-75" />
      </div>
      <br />

      <button className="text-white bg-orange border-0 p-2 rounded">
        Đặt lại mật khẩu
      </button>
    </div>
  );
};

export default DoiMatKhau;