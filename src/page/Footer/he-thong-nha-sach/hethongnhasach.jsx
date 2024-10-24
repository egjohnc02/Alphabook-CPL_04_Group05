
import { Link } from "react-router-dom";
import bgLogin from "../gioi-thieu/img/bg_login.webp";

function hethongnhasach() {
  return (
    <div>
      <div>
        <div className="position-relative text-center">
          <img
            src={bgLogin}
            alt="Example"
            className="img-fluid"
            style={{ maxwidth: "100%" }}
          />
          <div className="position-absolute top-50 start-50 translate-middle">
            <a href="/home">
              <span>Trang chủ</span>
            </a>
            <h1 style={{ color: "orange" }}>He thống nhà sách</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default hethongnhasach;
