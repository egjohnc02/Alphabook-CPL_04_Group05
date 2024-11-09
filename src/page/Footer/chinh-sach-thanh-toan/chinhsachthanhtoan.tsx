import React from "react";
import AutoScrollToTop from "../../../utils/AutoScrollToTop";

const ChinhSachThanhToan: React.FC = () => {
  AutoScrollToTop();
  return (
    <div>
      <div className="container">
        <div className="wrap_background_aside padding-top-15 margin-bottom-40">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-12">
              <h1 className="title-block-page">Chính sách thanh toán</h1>
              <div className="content-page rte">
                <p>
                  <strong>
                    Giao hàng và thanh toán bằng tiền mặt khi nhận hàng:
                  </strong>
                </p>
                <p>
                  Sau khi khách hàng đặt hàng thành công trên website sẽ có email
                  của Alpha Books gửi về email quý khách để thông báo lại thông
                  tin đơn hàng quý khách vừa đặt. Ngày hôm nay nhân viên xử lý
                  đơn hàng sẽ gọi điện để xác nhận lại một lần nữa đơn hàng
                  trước khi chuyển sách cho đơn vị vận chuyển.
                </p>
                <p>
                  Các yêu cầu giao hàng cần có thông tin chính xác về người
                  nhận, địa chỉ, số điện thoại. Một số trường hợp nhạy cảm như:
                  giá trị đơn hàng lớn, thời gian giao hàng buổi tối, địa chỉ
                  giao hàng trong ngõ, khu vực xa trung tâm.. Nhân viên xử lý
                  đơn hàng sẽ kiểm tra và trao đổi thêm với khách hàng, thống
                  nhất cách thức giao hàng cụ thể trước khi giao.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChinhSachThanhToan;