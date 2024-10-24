import { Link } from "react-router-dom";
import bgLogin from "../gioi-thieu/img/bg_login.webp";
import book1 from "../gioi-thieu/img/book1.webp";
import book2 from "../gioi-thieu/img/book2.webp";
import book3 from "../gioi-thieu/img/book3.webp";
import "./gioithieu.css";
function Introduce() {
  return (
    <div>
      <div className="position-relative text-center">
        <img src={bgLogin} alt="Example" className="img-fluid" />
        <div className="position-absolute top-50 start-50 translate-middle">
          <a href="/home">
            <span>Trang chủ</span>
          </a>
          <h1>Giới thiệu</h1>
        </div>
      </div>

      <div className="container">
        <h1>Giới thiệu</h1>
        <div>
          <h4>ALPHA BOOKS - HÀNH TRÌNH VƯƠN TẦM TRI THỨC</h4>
          <p>
            <em>Better Knowledge, Better Success</em>
          </p>
        </div>

        <p>
          Alpha Books được biết đến là một trong những thương hiệu hàng đầu về
          dòng sách quản trị kinh doanh, phát triển kỹ năng, tài chính, đầu tư…
          với các cuốn sách hướng dẫn khởi nghiệp, các bài học, phương pháp và
          kinh nghiệm quản trị của các chuyên gia, và các tập đoàn nổi tiếng
          trên thế giới. Sau 18 năm hình thành và phát triển, Alpha Books đã
          từng bước khẳng định tên tuổi của mình, đặc biệt đối với các thế hệ
          doanh nhân, nhà quản lý và những người trẻ luôn khát khao xây dựng sự
          nghiệp thành công.
        </p>

        <p>
          18 năm, từ một công ty nhỏ thành lập bởi một nhóm tri thức trẻ Hà Nội,
          Alpha Books hiện đã phát triển mở rộng thương hiệu chính là
          <strong> Alpha Books</strong> - dòng sách quản trị kinh doanh & kỹ
          năng và với 5 thương hiệu con:<strong> Omega Plus</strong> - dòng sách
          tinh hoa về văn hóa, lịch sử; <strong> ETS</strong> - dòng sách về
          khoa học;<strong> Gamma</strong> - dòng sách ngoại ngữ; Sống - dòng
          sách tác giả Việt; Medinsight - dòng sách y học.
        </p>

        <p>
          Bên cạnh việc sở hữu hơn <strong>4.000</strong> đầu sách cùng{" "}
          <strong>15.000.000</strong> bản in, Alpha Books còn thành công tiếp
          cận độc giả với các cuốn sách nổi bật in đậm dấu ấn trong tâm trí
          người đọc, điển hình như: HBR Onpoint, Quốc gia khởi nghiệp, Trí tuệ
          Do Thái, Phi lý trí, Tư duy nhanh và chậm, Tiểu sử Steve Jobs, Thiên
          nga đen, Chiến lược đại dương xanh, Phù thủy sàn chứng khoán,..
        </p>

        <img src={book1} alt="Book 1" className="img-fluid" />

        <p>
          Tiếp nối thành công, với mong muốn xây dựng một thế hệ các nhà lãnh
          đạo và quản lý mới có năng lực lãnh đạo, tầm nhìn chiến lược và khả
          năng giải quyết vấn đề sáng tạo, Alpha Books đã ra mắt dòng sách cao
          cấp <strong>Harvard Business Review</strong> tại Việt Nam với thiết kế
          hiện đại, đa dạng chủ đề, bắt kịp tư duy kinh doanh của thời đại nhằm
          đưa ra những giải pháp triệt để và kiến thức quản trị nâng cao giúp
          nhà lãnh đạo - quản lý đối phó với biến động của nền kinh tế toàn cầu.
        </p>
        <p>
          <strong>Harvard Business Review (HBR)</strong> thuộc top đầu sách Quản
          trị Kinh doanh trên khắp thế giới, đã và đang đồng hành cùng với nhiều
          doanh nghiệp, doanh nhân và người lao động Việt Nam. Kể từ khi xuất
          bản ấn phẩm đầu tiên năm 1922 tại Mỹ, HBR luôn mang tới những kỹ năng
          và kiến thức được đúc kết thực tế từ góc nhìn mới mẻ và đầy sức thuyết
          phục của các chuyên gia uy tín hàng đầu giúp con đường sự nghiệp của
          mỗi cá nhân được thăng hoa hơn, cung cấp nhiều giải pháp hữu ích cho
          mỗi doanh nghiệp.{" "}
        </p>
        <p>
          Alpha Books kỳ vọng những tri thức quản trị tinh tuyển và cập nhật sẽ
          đóng góp vào tư duy quản trị của các doanh nghiệp Việt Nam, khai phóng
          tiềm năng lãnh đạo của mỗi doanh nhân và góp phần vào sự phát triển
          kinh tế chung của quốc gia.
        </p>
        <p>
          Bộ ấn phẩm <strong>Harvard Business Review (HBR) </strong>danh tiếng
          toàn cầu được Alpha Books “bản địa hoá" thành công và ra mắt tại Việt
          Nam với những bộ sách chất lượng hàng đầu, nhận được rất nhiều sự yêu
          thích và đón chờ từ độc giả, đặc biệt bởi Shark Nguyễn Thanh Việt, Bà
          Nguyễn Phương Thảo – Tổng Giám đốc Vietjet Air, Bà Hà Thu Thanh – Chủ
          tịch Deloitte Việt Nam, Ông Hồ Quang Minh – Chủ tịch BNI Việt Nam….
        </p>

        <img src={book2} alt="Book 2" className="img-fluid" />

        <p style={{ marginTop: "50px" }}>
          Alpha Books với sứ mệnh trở thành doanh nghiệp dẫn đầu trong ngành
          sáng tạo và kinh doanh nội dung, tri thức tại Châu Á đã và đang đi đầu
          áp dụng công nghệ cao vào vận hành, kinh doanh và sản xuất trong ngành
          xuất bản dựa trên nền tảng công nghệ. Từ đó, Alpha Books dành hết tâm
          huyết để đưa những trang tri thức cống hiến vào nền văn hóa đọc.{" "}
        </p>

        <img src={book3} alt="Book 3" className="img-fluid" />

        <p style={{ textAlign: "center", marginTop: "50px" }}>
          <em>
            "Alpha Books không bán sách, chúng tôi bán những kinh nghiệm quản
            trị, những tri thức và tư duy kinh doanh mới, hiện đại, giá trị của
            những doanh nhân hàng đầu thế giới và cả Việt Nam."
          </em>
        </p>
      </div>
    </div>
  );
}
export default Introduce;
