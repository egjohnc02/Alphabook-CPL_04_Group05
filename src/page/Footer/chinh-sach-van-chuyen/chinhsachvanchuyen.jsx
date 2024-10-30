import bgLogin from "../../../assets/bg_login.webp";
function ChinhSachVanChuyen() {
  return (
    <div>
      <div>
        <div className="position-relative text-center">
          <img
            src={bgLogin}
            alt="Example"
            className="img-fluid"
            style={{ maxWidth: "100%" }}
          />
          <div className="position-absolute top-50 start-50 translate-middle">
            <a href="/home">
              <span>Trang chủ</span>
            </a>
            <h1 style={{ color: "orange" }}>Chính sách vận chuyển</h1>
          </div>
        </div>
        <section className="page">
          <div className="container">
            <div className="wrap_background_aside padding-top-15 margin-bottom-40">
              <div className="row">
                <div className="col-xs-12 col-sm-12 col-md-12">
                  <h1 className="title-block-page">Chính sách vận chuyển</h1>
                  <div className="content-page rte">
                    <p>
                      <span
                        style={{ fontFamily: "Tahoma, Geneva, sans-serif" }}
                      >
                        <span style={{ fontSize: "16px" }}>
                          Phí vận chuyển có thể thay đổi với từng khu vực, nhân
                          viên xử lý đơn hàng sẽ gọi điện trao đổi và thống nhất
                          với khách hàng trước khi giao.
                        </span>
                      </span>
                    </p>
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
export default ChinhSachVanChuyen;
