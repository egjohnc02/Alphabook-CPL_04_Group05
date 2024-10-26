import bgLogin from "./img/bg_login.webp";
import "./dichvu.css";
import anh1 from './img/1-1484664962.jpg';
import anh2 from './img/8a.jpg';
import anh3 from './img/How-to-Publish-a-Book-scaled.jpg';
function DichVu() {
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
            <h1 style={{ color: "orange" }}>Dịch vụ</h1>
          </div>
        </div>

        <div className="content-page rte">
            <p className="title">
                <strong>TƯ VẤN, CUNG CẤP SÁCH VÀ TÀI LIỆU ĐÀO TẠO</strong>
            </p>
            <p className="text">
                Tư vấn những cuốn sách cần thiết cho các nhân sự, bộ phận, phòng ban & doanh nghiệp với kiến thức chuyên sâu về sách quản trị và các tài liệu đào tạo chuyên ngành.
            </p>
            <p className="text">
                Xây dựng tủ sách với nhiều chủ đề khác nhau đáp đáp ứng nhu cầu đa dạng của quý doanh nghiệp:
            </p>
            <p className="text">✓ Tài liệu nghiên cứu: Lĩnh vực kinh doanh/chuyên môn phòng ban chuyên biệt khuyến nghị nhân viên nên đọc</p>
            <p className="text">✓ Tài liệu phổ thông với kiến thức xã hội - kinh tế</p>
            <p className="text">✓ Tài liệu tham khảo - giải trí: khoa học thường thức, sách thiếu nhi, chăm sóc sức khỏe, tài chính gia đình</p>
            <div className="image">
                <img src={anh1} alt="Thư viện 'cảm hứng từ rừng' ở Đài Loan" />
            </div>
            <p className="title">
                <strong>TƯ VẤN PHÁT TRIỂN THƯ VIỆN DOANH NGHIỆP VÀ KHÔNG GIAN HỌC TẬP</strong>
            </p>
            <p className="text">
                Kiến tạo không gian văn hóa đọc & xây dựng thói quen đọc sách tại tổ chức sẽ góp phần xây dựng văn hóa học tập liên tục của tổ chức. Alpha Books tự tin đồng hành cùng quý Doanh nghiệp trong hành trình kiến tạo văn hóa đọc và phát triển tổ chức học tập.
            </p>
            <p className="text">
                Thiết kế không gian học tập với tiêu chí sáng tạo & thuận tiện:
            </p>
            <p className="text">✓ Tư vấn phát triển không gian đọc: lắp đặt kệ sách, góc sách, decor không gian đọc</p>
            <p className="text">✓ Sắp xếp các đầu sách khoa học định hướng hành vi lựa chọn</p>
            <p className="text">✓ Đào tạo quy trình quản lý thư viện</p>
            <div className="image">
                <img src={anh2} alt="Cổng thông tin thư viện" />
            </div>
            <p className="title">
                <strong>TRIỂN KHAI DỊCH VỤ HỢP TÁC XUẤT BẢN</strong>
            </p>
            <p className="text">
                Hiện thực hóa ấn phẩm của cá nhân và doanh nghiệp như tự truyện, kinh nghiệm thương trường, sổ tay, cẩm nang và tài liệu đào tạo nội bộ với đa dạng dịch vụ từ sản xuất đến truyền thông và phân phối sản phẩm.
            </p>
            <div className="image">
                <img src={anh3} alt="How to Publish a Book" />
            </div>
            <p className="text">
                ✓ 924 ĐỐI TÁC là doanh nghiệp: Vingroup, Cà phê Trung Nguyên, Tập đoàn New Toyo (Singapore)...<br />
                ✓ 300 TỰA SÁCH theo đơn đặt hàng của: Đại sứ quán Anh, VCCA, Viện Nghiên cứu Kinh tế và Chính sách (VEPR)...<br />
                ✓ 311 CÁ NHÂN đã xuất bản và được hỗ trợ xuất bản cuốn sách của riêng mình với chi phí cạnh tranh và chất lượng tối ưu
            </p>
            
        </div>
      </div>
    </div>
  );
}

export default DichVu;
