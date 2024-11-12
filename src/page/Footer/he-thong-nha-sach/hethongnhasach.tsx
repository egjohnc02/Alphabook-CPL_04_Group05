import React from "react";
import AutoScrollToTop from "../../../utils/AutoScrollToTop";

const hethongnhasach: React.FC = () => {
  AutoScrollToTop();
  return (
    <div>
      <div>
        <div className="content-page rte">
          <table
            className="display dataTable no-footer border-1"
            cellPadding="1"
            cellSpacing="1"
          >
            <thead>
              <tr role="row">
                <th>Điểm bán hàng</th>
                <th>
                  <strong>Nhà sách</strong>
                </th>
                <th>
                  <strong>Địa chỉ</strong>
                </th>
                <th>
                  <strong>Thành Phố</strong>
                </th>
                <th>
                  <strong>SĐT</strong>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="even" role="row">
                <td>1</td>
                <td>Gian Hàng Alpha Books HN</td>
                <td>Đường sách 19/12, Trần Hưng Đạo, Hoàn Kiếm</td>
                <td>Hà Nội</td>
                <td>(02) 432668036</td>
              </tr>
              <tr className="even" role="row">
                <td>2</td>
                <td>Nhà sách Vinh</td>
                <td>211 Lê Duẩn, Tp Vinh</td>
                <td>Nghệ An</td>
                <td>(02) 383 555 468</td>
              </tr>
              <tr className="even" role="row">
                <td>3</td>
                <td>Gian Hàng Alpha Books HCM</td>
                <td>Đường sách Nguyễn Văn Bình, Q.1</td>
                <td>HCM</td>
                <td>(08) 38 251 789</td>
              </tr>
              <tr className="even" role="row">
                <td>4</td>
                <td>Alpha Books Online SG</td>
                <td>252/18D Phan Anh, Hiệp Tân, Tân Phú</td>
                <td>HCM</td>
                <td>0886319009</td>
              </tr>
              <tr className="even" role="row">
                <td>5</td>
                <td>Alpha Books Online HN</td>
                <td>44 P. Ba La, Phú Lương, Hà Đông</td>
                <td>Hà Nội</td>
                <td>0932329959</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default hethongnhasach;