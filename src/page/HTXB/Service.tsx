import { useRef } from 'react';
import { Container, Row, Col, Carousel, Form, Button } from 'react-bootstrap';
import '@fortawesome/fontawesome-free/css/all.min.css';
import htxb from "/src/assets/introduce/htxb.jpg";
import htbx2 from '/src/assets/introduce/shit1.png';
import htbx3 from '/src/assets/introduce/shit2.png';
import htbx4 from '/src/assets/introduce/shit3.png';
import htbx5 from '/src/assets/introduce/shit4.jpg';
import book1 from '/src/assets/introduce/book1.webp';
import book2 from '/src/assets/introduce/book2.webp';
import book3 from '/src/assets/introduce/book3.webp';
import '/src/css/service.css';

const Service: React.FC = () => {
  // Define refs with HTML element types
  const targetRef = useRef<HTMLHeadingElement>(null);
  const targetRef2 = useRef<HTMLImageElement>(null);
  const targetRef3 = useRef<HTMLDivElement>(null);
  const targetRef4 = useRef<HTMLDivElement>(null);

  // Define scroll functions with specific behavior types
  const scrollToSection = () => targetRef.current?.scrollIntoView({ behavior: 'smooth' });
  const scrollToSection2 = () => targetRef2.current?.scrollIntoView({ behavior: 'smooth' });
  const scrollToSection3 = () => targetRef3.current?.scrollIntoView({ behavior: 'smooth' });
  const scrollToSection4 = () => targetRef4.current?.scrollIntoView({ behavior: 'smooth' });

  return (
    <>
      <div className="container my-4">
        <div className="position-relative">
          <img
            src={htxb}
            alt="Example"
            className="img-fluid"
            style={{ width: '100%', height: 'auto' }}
          />
          <div
            className="position-absolute top-0 end-0 d-flex gap-2 p-2"
            style={{ zIndex: 1 }}
          >
            <button className="btn custom-orange" onClick={scrollToSection2}>Giới thiệu</button>
            <button className="btn custom-orange" onClick={scrollToSection2}>Tư vấn sách</button>
            <button className="btn custom-orange" onClick={scrollToSection3}>Phát triển tủ sách</button>
            <button className="btn custom-orange" onClick={scrollToSection}>Cho phép xuất bản</button>
          </div>
          <div
            className="position-absolute bottom-0 end-0 p-5"
            style={{ zIndex: 1 }}
          >
            <button className="btn btn-primary swing-button" onClick={scrollToSection2}>Tìm hiểu thêm</button>
          </div>
        </div>
      </div>

      <div className="container">
        <h1 style={{ textAlign: 'center', marginTop: '50px' }}>Nếu bạn là</h1>
        <div className="d-flex justify-content-center mt-4">
          {/* Each 'circle-text' item */}
          {[
            { icon: 'fa-book', text: 'Cá nhân, doanh nghiệp tìm kiếm cuốn sách cần thiết cho nhân sự và doanh nghiệp' },
            { icon: 'fa-phone', text: 'Doanh nghiệp cần tư vấn triển khai thư viện doanh nghiệp, không gian học tập, phát triển tổ chức học tập' },
            { icon: 'fa-chart-bar', text: 'Cá nhân, doanh nghiệp muốn hợp tác xuất bản ấn phẩm cho bản thân và doanh nghiệp, sổ tay kinh nghiệm, kiến thức, cẩm nang và các tài liệu đào tạo nội bộ' },
          ].map(({ icon, text }, index) => (
            <div key={index} className="circle-text d-flex flex-column align-items-center text-center mx-3">
              <div className="circle-icon">
                <i className={`fas ${icon} icon-animation`}></i>
              </div>
              <p>{text}</p>
            </div>
          ))}
        </div>

        <h1 ref={targetRef} style={{ textAlign: 'center', marginTop: '50px' }}>... THÌ ĐÂY CHÍNH LÀ</h1>
        <h1 style={{ textAlign: 'center' }}>GIẢI PHÁP <strong style={{ color: 'orange' }}>TƯ VẤN & XUẤT BẢN TOÀN DIỆN </strong></h1>
        <h1 style={{ textAlign: 'center' }}>DÀNH CHO MỌI CÁ NHÂN, TỔ CHỨC, DOANH NGHIỆP, HIỆP HỘI</h1>
        
        {/* Content for each service card */}
        <div className="container my-4">
          <Row>
            {[
              { title: 'Dịch vụ sản xuất đa dạng', items: ['Mua bản quyền', 'Chấp bút', 'Biên tập, biên dịch bản thảo', 'Dàn trang, thiết kế bìa, vẽ minh họa'] },
              { title: 'Đăng ký giấy phép xuất bản', items: ['Đàm phán bản quyền', 'Kí kết hợp đồng bản quyền'] },
              { title: 'Marketing, Truyền thông', items: ['Cung cấp các gói quảng cáo', 'Tổ chức sự kiện ra mắt sách', 'Xây dựng các gói quà tặng kèm'] },
              { title: 'Phân phối, bán hàng', items: ['Tư vấn, xây dựng gói bán hàng', 'Phân phối đa dạng', 'Hỗ trợ lưu kho'] },
              { title: 'Sản xuất các ấn phẩm số', items: ['Ebook', 'Audio book', 'Media service'] },
            ].map(({ title, items }, index) => (
              <Col md={6} className="mb-4" key={index}>
                <div className="info-card p-4 shadow-sm">
                  <h4 className="info-title text-uppercase" style={{ color: 'orange' }}>
                    <i className="fas fa-check-circle"></i> {title}
                  </h4>
                  <ul className="info-list mt-3">
                    {items.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </div>

      <img ref={targetRef2} src={htbx2} alt="Example" className="img-fluid" style={{ maxWidth: '100%' }} />

      <Container ref={targetRef3} style={{ marginTop: '50px' }}>
        <Row>
          <Col style={{ marginLeft: '150px' }}>
            <img src={htbx3} alt="Example" className="img-fluid" style={{ maxWidth: '100%' }} />
          </Col>
          <Col>
            <h1 style={{ color: 'orange' }}>TƯ VẤN PHÁT TRIỂN, VẬN HÀNH MÔ HÌNH TỔ CHỨC HỌC TẬP</h1>
            <h5>Kiến tạo không gian văn hóa đọc...</h5>
            <Row className="text-center mt-4">
              <Col><i className="fas fa-book" style={{ fontSize: '40px', color: 'orange' }}></i><p>Lựa chọn sách phù hợp</p></Col>
              <Col><i className="fas fa-user-graduate" style={{ fontSize: '40px', color: 'orange' }}></i><p>Thiết kế không gian đọc</p></Col>
              <Col><i className="fas fa-laptop" style={{ fontSize: '40px', color: 'orange' }}></i><p>Triển khai văn hóa đọc</p></Col>
            </Row>
          </Col>
        </Row>
      </Container>

      <Container style={{ marginTop: '50px' }}>
        <Row>
          <Col style={{ marginLeft: '150px' }}>
            <h1 style={{ color: 'orange' }}>Dự Án Nổi Bật</h1>
            <h5>Với hàng trăm dự án chuyên nghiệp...</h5>
          </Col>
          <Col>
            <Carousel>
              {[htbx2, htxb].map((src, idx) => (
                <Carousel.Item key={idx}>
                  <img className="d-block w-100 carousel-image" src={src} alt={`Slide ${idx + 1}`} />
                  <Carousel.Caption>
                    <h3>Slide Label {idx + 1}</h3>
                    <p>Description for slide {idx + 1}.</p>
                  </Carousel.Caption>
                </Carousel.Item>
              ))}
            </Carousel>
          </Col>
        </Row>
      </Container>

      <h1 style={{ textAlign: 'center', marginTop: '50px', color: 'orange' }}>Thư viện tài liệu & ấn phẩm</h1>
      <Container>
        <Row>
          {[book1, book2, book3].map((src, idx) => (
            <Col key={idx} className="d-flex flex-column align-items-center">
              <img src={src} alt={`Book ${idx + 1}`} className="book-image" />
              <p>Book {idx + 1}</p>
            </Col>
          ))}
        </Row>
      </Container>
      
      <Container className="my-5">
        <Form ref={targetRef4}>
          <Form.Group>
            <Form.Control type="text" placeholder="Họ và tên" />
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Control type="email" placeholder="Email" />
          </Form.Group>
          <Form.Group className="mt-3">
            <Form.Control as="textarea" placeholder="Nội dung cần tư vấn" rows={3} />
          </Form.Group>
          <Button className="mt-3" variant="primary" type="submit">Gửi</Button>
        </Form>
      </Container>
    </>
  );
};

export default Service;
