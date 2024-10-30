import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import bgLogin from "../../../assets/bg_login.webp";
import axios from "axios";
import "./hethongnhasach.css";

function hethongnhasach() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:9999/DiemBanHang")
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
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
            className="display dataTable no-footer"
            border="1"
            cellPadding="1"
            cellSpacing="1"
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

                
                    {data.map((item, index) => (
                        <tr key={index} className="even" role="row">
                            <td className="sorting_1">{item.DiemBanHang}</td>
                            <td className="sorting_1">{item.NhaSach}</td>
                            <td>{item.DiaChi}</td>
                            <td className="sorting_1">{item.ThanhPho}</td>
                            <td>{item.SDT}</td>
                        </tr>
                    ))}
                </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default hethongnhasach;
