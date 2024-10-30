// import bgLogin from "../../../assets/bg_login.webp";
import AutoScrollToTop from "../../../utils/AutoScollToTop";
import "./hoptackinhdoanh.css";
function hoptackinhdoanh() {
  AutoScrollToTop();
  return (
    <div>
      <div>
        {/* <div className="position-relative text-center">
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
            <h1 style={{ color: "orange" }}>
              Hợp tác kinh doanh - Alpha Books
            </h1>
          </div>
        </div> */}
        <section className="page">
          <div className="container">
            <div className="wrap-background-aside padding-top-15 margin-bottom-40">
              <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-12">
                  <h1 className="title-block-page">
                    Hợp tác kinh doanh - Alpha Books
                  </h1>
                  <div className="content-page rte">
                    <p className="intro-text">
                      Thành lập ngày 21/1/2005, đến nay Alpha Books đã trở thành
                      một trong những thương hiệu hàng đầu tại Việt Nam về mảng
                      sách quản trị kinh doanh và giáo dục, tư duy. Đến nay,
                      Alpha Books không ngừng lớn mạnh với nhiều dòng sách mới
                      và trở thành người bạn thân thiết của hàng triệu độc giả
                      Việt Nam.
                    </p>
                    <h3 className="section-title">
                      Thông tin liên hệ cho các hoạt động Kinh doanh của Alpha
                      Books:
                    </h3>
                    <ol className="contact-list">
                      <li className="contact-item">
                        <span>
                          Kênh TMĐT: Chu Đức Tấn - ĐT: 036 841 0213 - Email:
                          tan.chu@alphabooks.vn
                        </span>
                      </li>
                      <li className="contact-item">
                        <span>
                          Kênh GT-MT: Nguyễn Thu Hương - ĐT: 093 859 5866 -
                          Email: huong.nt@alphabooks.vn
                        </span>
                      </li>
                      <li className="contact-item">
                        <span>
                          Kênh Trường học: Trần Thị Hiên - ĐT: 097 252 6572 -
                          Email: hien.tran@alphabooks.vn
                        </span>
                      </li>
                      <li className="contact-item">
                        <span>
                          Hợp tác xuất bản, tư vấn xây dựng tủ sách doanh
                          nghiệp: Hotline: 093 613 6060 - Email:
                          htxb@alphabooks.vn
                        </span>
                      </li>
                      <li className="contact-item">
                        <span>Bản quyền: Email: copyright@alphabooks.vn</span>
                      </li>
                      <li className="contact-item">
                        <span>
                          Truyền thông - Marketing: Email:
                          mkt1.alphabooks@gmail.com
                        </span>
                      </li>
                    </ol>
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

export default hoptackinhdoanh;
