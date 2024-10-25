import { Link } from "react-router-dom";
import bgLogin from "../gioi-thieu/img/bg_login.webp";
import "./hethongnhasach.css";

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
            <h1 style={{ color: "orange" }}>Hệ thống nhà sách</h1>
          </div>
        </div>
        <div className="content-page rte">
          <table
            border="1"
            cellPadding="1"
            cellSpacing="1"
            className="display dataTable no-footer"
          >
            <thead>
              <tr role="row">
                <th className="sorting_asc">Điểm bán hàng</th>
                <th className="sorting_asc">
                  <strong>Nhà sách</strong>
                </th>
                <th className="sorting">
                  <strong>Địa chỉ</strong>
                </th>
                <th className="sorting">
                  <strong>Thành Phố</strong>
                </th>
                <th className="sorting">
                  <strong>SĐT</strong>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="even" role="row">
                <td className="sorting_1">1</td>
                <td className="sorting_1">Gian Hàng Alpha Books HN</td>
                <td>Đường sách 19/12, Trần Hưng Đạo, Hoàn Kiếm</td>
                <td className="sorting_1">Hà Nội</td>
                <td>(02) 432668036</td>
              </tr>
              <tr className="even" role="row">
                <td className="sorting_1">2</td>
                <td className="sorting_1">Nhà sách Vinh</td>
                <td>211 Lê Duẩn, Tp Vinh</td>
                <td className="sorting_1">Nghệ An</td>
                <td>(02) 383 555 468</td>
              </tr>
              <tr className="even" role="row">
                <td className="sorting_1">3</td>
                <td className="sorting_1">Gian Hàng Alpha Books HCM</td>
                <td>Đường sách Nguyễn Văn Bình, Q.1</td>
                <td className="sorting_1">HCM</td>
                <td>(08) 38 251 789</td>
              </tr>
              <tr>
                <td className="sorting_1">4</td>
                <td className="sorting_1">Alpha Books Online SG</td>
                <td>252/18D Phan Anh, Hiệp Tân, Tân Phú</td>
                <td className="sorting_1">HCM</td>
                <td>0886319009</td>
              </tr>
              <tr>
                <td className="sorting_1">5</td>
                <td className="sorting_1">Alpha Books Online HN</td>
                <td>
                  <p>44 P. Ba La, Phú Lương, Hà Đông</p>
                </td>
                <td className="sorting_1">Hà Nội</td>
                <td>0932329959</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default hethongnhasach;
