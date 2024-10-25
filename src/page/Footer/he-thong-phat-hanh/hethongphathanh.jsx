import React, { useEffect, useState } from "react";
import axios from "axios";

import bgLogin from "../gioi-thieu/img/bg_login.webp";
function HeThongPhatHanh() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:9999/regions")
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
        <section className="page">
          <div className="container">
            <div className="wrap_background_aside padding-top-15 margin-bottom-40">
              <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-12">
                  <div className="content-page rte">
                    <table className="display dataTable no-footer">
                      <thead>
                        <tr>
                          <th>STT</th>

                          <th>Tên khách hàng</th>
                          <th>Hệ thống nhà sách</th>
                          <th>Địa chỉ</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.map((region, regionIndex) =>
                          region.customers.map((customer, customerIndex) =>
                            customer.bookstores.map(
                              (bookstore, bookstoreIndex) => (
                                <tr
                                  key={`${regionIndex}-${customerIndex}-${bookstoreIndex}`}
                                  className={
                                    bookstoreIndex % 2 === 0 ? "even" : "odd"
                                  }
                                >
                                  <td>{bookstoreIndex + 1}</td>

                                  {bookstoreIndex === 0 && (
                                    <td rowSpan={customer.bookstores.length}>
                                      <strong>{customer.company}</strong>
                                    </td>
                                  )}
                                  <td>{bookstore.name}</td>
                                  <td>{bookstore.address}</td>
                                </tr>
                              )
                            )
                          )
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default HeThongPhatHanh;
