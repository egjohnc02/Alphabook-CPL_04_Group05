import BookStore from "../../assets/home/bookstore_image.webp";
// import '@fortawesome/fontawesome-free/css/all.min.css';

import "./style.css";
function Book() {
  return (
    <div>
      <div className="book">
        <img
          src={BookStore}
          alt="BookStore"
          className="img-fluid"
          style={{ maxwidth: "60%" }}
        />
      </div>

      <div className="section warp_background">
        <div className="container">
          <div className="bg_collection section">
            <div className="row">
              <aside class="dqdt-sidebar sidebar left-content col-lg-3 col-md-4 col-sm-4">
                <aside className="aside-item sidebar-category collection-category clear-fix">
                  <h2 className="title-module">DANH MỤC SÁCH</h2>
                  <div className="aside-content">
                    <nav className="nav-category navbar-toggleable-md">
                      <ul className="nav navbar-pills">
                        <li className="nav-item">
                          <a
                            className="nav-link"
                            href="/harvard-business-review"
                            style={{ padding: "10px 15px 10px 0px" }}
                          >
                            Harvard Business Review
                          </a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </aside>
                <div className="filter-content aside-filter">
                  <div className="filter-container">
                    {/* Lọc theo giá */}
                    <aside className="aside-item filter-price">
                      <div className="aside-title">
                        <h2 className="title-filter title-head margin-top-0">
                          <span className="leaf">Theo mức giá</span>
                        </h2>
                      </div>
                      <div className="aside-content margin-top-0 filter-group content_price">
                        <ul>
                          <li className="filter-item filter-item--check-box filter-item--green">
                            <span>
                              <label
                                data-filter="100-000d"
                                htmlFor="filter-duoi-100-000d"
                              >
                                <input
                                  type="checkbox"
                                  id="filter-duoi-100-000d"
                                  data-group="Khoảng giá"
                                  data-field="price_min"
                                  data-text="Dưới 100.000đ"
                                  value="(<100000)"
                                  data-operator="OR"
                                />
                                Dưới 100.000đ
                              </label>
                            </span>
                          </li>
                          <li className="filter-item filter-item--check-box filter-item--green">
                            <span>
                              <label
                                data-filter="200-000d"
                                htmlFor="filter-100-000d-200-000d"
                              >
                                <input
                                  type="checkbox"
                                  id="filter-100-000d-200-000d"
                                  data-group="Khoảng giá"
                                  data-field="price_min"
                                  data-text="100.000đ - 200.000đ"
                                  value="(>=100000 AND <=200000)"
                                  data-operator="OR"
                                />
                                Từ 100.000đ đến 200.000đ
                              </label>
                            </span>
                          </li>
                          <li className="filter-item filter-item--check-box filter-item--green">
                            <span>
                              <label
                                data-filter="300-000d"
                                htmlFor="filter-200-000d-300-000d"
                              >
                                <input
                                  type="checkbox"
                                  id="filter-200-000d-300-000d"
                                  data-group="Khoảng giá"
                                  data-field="price_min"
                                  data-text="200.000đ - 300.000đ"
                                  value="(>=200000 AND <=300000)"
                                  data-operator="OR"
                                />
                                Từ 200.000đ đến 300.000đ
                              </label>
                            </span>
                          </li>
                          <li className="filter-item filter-item--check-box filter-item--green">
                            <span>
                              <label
                                data-filter="500-000d"
                                htmlFor="filter-300-000d-500-000d"
                              >
                                <input
                                  type="checkbox"
                                  id="filter-300-000d-500-000d"
                                  data-group="Khoảng giá"
                                  data-field="price_min"
                                  data-text="300.000đ - 500.000đ"
                                  value="(>=300000 AND <=500000)"
                                  data-operator="OR"
                                />
                                Từ 300.000đ đến 500.000đ
                              </label>
                            </span>
                          </li>
                          <li className="filter-item filter-item--check-box filter-item--green">
                            <span>
                              <label
                                data-filter="1-000-000d"
                                htmlFor="filter-500-000d-1-000-000d"
                              >
                                <input
                                  type="checkbox"
                                  id="filter-500-000d-1-000-000d"
                                  data-group="Khoảng giá"
                                  data-field="price_min"
                                  data-text="500.000đ - 1.000.000đ"
                                  value="(>=500000 AND <=1000000)"
                                  data-operator="OR"
                                />
                                Từ 500.000đ đến 1 triệu
                              </label>
                            </span>
                          </li>
                          <li className="filter-item filter-item--check-box filter-item--green">
                            <span>
                              <label
                                data-filter="1-000-000d"
                                htmlFor="filter-tren1-000-000d"
                              >
                                <input
                                  type="checkbox"
                                  id="filter-tren1-000-000d"
                                  data-group="Khoảng giá"
                                  data-field="price_min"
                                  data-text="Trên 1.000.000đ"
                                  value="(>1000000)"
                                  data-operator="OR"
                                />
                                Trên 1 triệu
                              </label>
                            </span>
                          </li>
                        </ul>
                      </div>
                    </aside>
                    {/* End lọc theo giá */}
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Book;
