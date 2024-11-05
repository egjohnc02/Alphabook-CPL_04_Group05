import htxb from "../../assets/introduce/htxb.jpg";
import '../../css/service.css';
import React, { useRef } from 'react';
import htbx2 from '../../assets/introduce/shit1.png';
import htbx3 from '../../assets/introduce/shit2.png';
import htbx4 from '../../assets/introduce/shit3.png';
import htbx5 from '../../assets/introduce/shit4.jpg';
import book1 from '../../assets/introduce/book1.webp';
import book2 from '../../assets/introduce/book2.webp';
import book3 from '../../assets/introduce/book3.webp';
import { Container, Row, Col, Carousel } from "react-bootstrap";
import '@fortawesome/fontawesome-free/css/all.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
function Service() {
    // Tạo ref cho tiêu đề
    const targetRef = useRef(null);
    const targetRef2 = useRef(null);
    const targetRef3 = useRef(null);
    const targetRef4 = useRef(null);
    // Hàm cuộn xuống tiêu đề
    const scrollToSection = () => {
      targetRef.current.scrollIntoView({ behavior: 'smooth' });
    };
    const scrollToSection2 = () => {
      targetRef2.current.scrollIntoView({ behavior: 'smooth' });
    };
    const scrollToSection3 = () => {
      targetRef3.current.scrollIntoView({ behavior: 'smooth' });
    };
    const scrollToSection4 = () => {
      targetRef4.current.scrollIntoView({ behavior: 'smooth' });
    };
    return ( 

    <>
     <div className="container my-4">
      <div className="position-relative">
        <img
          src={htxb} // Thay bằng URL ảnh của bạn
          alt="Example"
          className="img-fluid"
          style={{ width: '100%', height: 'auto' }}
        />

        {/* Các button ở góc trên bên phải */}
        <div
          className="position-absolute top-0 end-0 d-flex gap-2 p-2" // p-2 để thêm khoảng đệm giữa các nút và cạnh của ảnh
          style={{ zIndex: 1 }}
        >
         <button className="btn custom-orange" onClick={scrollToSection2}>Giới thiệu</button>
          <button className="btn custom-orange" onClick={scrollToSection2}>Tư vấn sách</button>
          <button className="btn custom-orange" onClick={scrollToSection3}>Phát triển tủ sách</button>
          <button className="btn custom-orange" onClick={scrollToSection}>cho phép xuất bản</button>
        </div>

        {/* Nút ở góc dưới bên phải */}
        <div
          className="position-absolute bottom-0 end-0 p-5"
          style={{ zIndex: 1 }}
        >
          <button className="btn btn-primary swing-button" onClick={scrollToSection2}>Tìm hiểu thêm</button>
        </div>
      </div>
    </div>
    <div className="container ">
      <h1 style={{ textAlign: 'center', marginTop: '50px'}}>Nếu bạn là</h1>
      <div className="d-flex justify-content-center mt-4">
        <div className="circle-text d-flex flex-column align-items-center text-center mx-3">
          <div className="circle-icon">
            <i className="fas fa-book icon-animation"></i>
          </div>
          <p>Cá nhân, doanh nghiệp tìm kiếm cuốn sách cần thiết cho nhân sự và doanh nghiệp</p>
        </div>
        
        <div className="circle-text d-flex flex-column align-items-center text-center mx-3">
<div className="circle-icon">
            <i className="fas fa-phone icon-animation"></i>
          </div>
          <p>Doanh nghiệp cần tư vấn triển khai thư viện doanh nghiệp, không gian học tập, phát triển tổ chức học tập</p>
        </div>
        
        <div className="circle-text d-flex flex-column align-items-center text-center mx-3">
          <div className="circle-icon">
            <i className="fas fa-chart-bar icon-animation"></i>
          </div>
          <p>Cá nhân, doanh nghiệp muốn hợp tác xuất bản ấn phẩm cho bản thân và doanh nghiệp, sổ tay kinh nghiệm, kiến thức, cẩm nang và các tài liệu đào tạo nội bộ</p>
        </div>
      </div>
      <h1 ref={targetRef} style={{ textAlign: 'center' , marginTop: '50px'}}>... THÌ ĐÂY CHÍNH LÀ</h1>
      <h1 style={{ textAlign: 'center'}}>GIẢI PHÁP <strong style={{ color: 'orange' }}>TƯ VẤN & XUẤT BẢN TOÀN DIỆN </strong></h1>
<h1 style={{ textAlign: 'center'}}>DÀNH CHO MỌI CÁ NHÂN, TỔ CHỨC, DOANH NGHIỆP, HIỆP HỘI</h1>
<h1 style={{ textAlign: 'center',marginTop: '150px'}}>TRIỂN KHAI DỊCH VỤ HỢP TÁC XUẤT BẢN</h1>
    {/* code ở đây*/}
    <div class="container my-4" >
  <div class="row">
    <div class="col-md-6 mb-4">
      <div class="info-card p-4 shadow-sm">
        <h4 class="info-title text-uppercase " style={{ color: 'orange' }}>
          <i class="fas fa-check-circle"></i> Dịch vụ sản xuất đa dạng
        </h4>
        <ul class="info-list mt-3">
          <li>Mua bản quyền (đối với sách nước ngoài)</li>
          <li>Chấp bút (hồi ký, tự truyện, sổ tay doanh nghiệp,...)</li>
          <li>Biên tập, biên dịch bản thảo</li>
          <li>Dàn trang, thiết kế bìa, vẽ minh họa</li>
        </ul>
      </div>
    </div>
    <div class="col-md-6 mb-4">
      <div class="info-card p-4 shadow-sm">
        <h4 class="info-title text-uppercase " style={{ color: 'orange' }}>
          <i class="fas fa-check-circle"></i> Đăng ký giấy phép xuất bản
        </h4>
        <ul class="info-list mt-3">
          <li>Đàm phán bản quyền sách in, quyền sử dụng một số phần trong sách (sách dịch).</li>
          <li>Kí kết hợp đồng bản quyền.</li>
        </ul>
      </div>
    </div>
    <div class="col-md-6 mb-4">
      <div class="info-card p-4 shadow-sm">
        <h4 class="info-title text-uppercase " style={{ color: 'orange' }}>
          <i class="fas fa-check-circle"></i> Marketing, Truyền thông
        </h4>
        <ul class="info-list mt-3">
          <li>Cung cấp các gói quảng cáo, ra mắt sách theo nhu cầu.</li>
          <li>Tổ chức sự kiện ra mắt sách.</li>
          <li>Xây dựng các gói quà tặng kèm.</li>
        </ul>
      </div>
    </div>
    <div class="col-md-6 mb-4">
      <div class="info-card p-4 shadow-sm">
<h4 class="info-title text-uppercase " style={{ color: 'orange' }}>
          <i class="fas fa-check-circle"></i> phân phối, bán hàng
        </h4>
        <ul class="info-list mt-3">
          <li>Tư vấn, xây dựng gói bán hàng phù hợp.</li>
          <li>Đem đến giải pháp phân phối đa dạng trên các kênh online, offline.</li>
          <li>Hỗ trợ lưu kho, giảm thiểu chi phí.</li>
          <li>Dàn trang, thiết kế bìa, vẽ minh họa</li>
        </ul>
      </div>
    </div>
    <div class="col-md-6 mb-4">
      <div class="info-card p-4 shadow-sm">
        <h4 class="info-title text-uppercase" style={{ color: 'orange' }}>
          <i class="fas fa-check-circle"></i> sản xuất các ấn phẩm số
        </h4>
        <ul class="info-list mt-3">
          <li>Ebook: Sản phẩm sách thời đại mới, có thể truy cập và đọc trực tiếp trên các thiết bị thông minh với nhiều định dạng theo nhu cầu</li>
          <li>Audio book: Cuốn sách của bạn được chuyển sang định dạng âm thanh, thông qua giọng người đọc hoặc công nghệ trí tuệ nhân tạo AI, có thể tiếp cận rộng rãi trên đa phương tiện.</li>
          <li>Media service: Sản xuất highlight video, TVC quảng cáo, các khóa học trực tuyến (E-learning).</li>
        </ul>
      </div>
    </div>
  </div>
</div>
</div>
<img
ref={targetRef2}
          src= {htbx2}
          alt="Example"
          className="img-fluid"
          style={{ maxwidth: '100%' }}
        />
 <Container ref={targetRef3} style={{ marginTop: '50px' }}>
      <Row>
        <Col  style={{ marginLeft: '150px' }}><img
          src= {htbx3}
          alt="Example"
          className="img-fluid"
          style={{ maxwidth: '100%' }}
        /></Col>
        <Col>
       <h1 style={{ color: 'orange'}}>TƯ VẤN PHÁT TRIỂN, VẬN HÀNH MÔ HÌNH TỔ CHỨC HỌC TẬP</h1>
       <h5>Kiến tạo không gian văn hóa đọc & xây dựng thói quen đọc sách tại tổ chức góp phần xây dựng văn hóa học tập trong bối cảnh thế giới đa phương tiện.</h5>
       <Row className="text-center mt-4">
            <Col>
              <i className="fas fa-book" style={{ fontSize: '40px', color: 'orange' }}></i>
              <p>Lựa chọn các đầu sách phù hợp với nhu cầu</p>
            </Col>
            <Col>
              <i className="fas fa-user-graduate" style={{ fontSize: '40px', color: 'orange' }}></i>
              <p>Thiết kế không gian đọc sách với tiêu chí Sáng tạo & Thuận tiện</p>
            </Col>
            <Col>
              <i className="fas fa-laptop" style={{ fontSize: '40px', color: 'orange' }}></i>
              <p>Triển khai phương pháp xây dựng văn hoá đọc trong DN</p>
            </Col>
          </Row>
        </Col>
      </Row>
     
    </Container>
    <Container style={{ marginTop: '50px' }}>
      <Row>
        <Col  style={{ marginLeft: '150px' }}>
<h1 style={{ color: 'orange'}}>Dự Án Nổi Bật</h1>
        <h5>Với hàng trăm dự án chuyên nghiệp, đa dạng nội dung cho các cá nhân, tổ chức, doanh nghiệp... Hợp tác xuất bản Alpha Books tự tin mang đến dịch vụ toàn diện nhất cho cuốn sách của bạn!
        </h5>
        </Col>
        <Col>
     
        <Carousel>
            <Carousel.Item>
              <img
           className="d-block w-100 carousel-image"
                src={htbx2}
                alt="First slide"
              />
              <Carousel.Caption>
                <h3>First Slide Label</h3>
                <p>Description for the first slide.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
               className="d-block w-100 carousel-image"
                src={htbx2}
                alt="Second slide"
              />
              <Carousel.Caption>
                <h3>Second Slide Label</h3>
                <p>Description for the second slide.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
             className="d-block w-100 carousel-image"
                src={htxb}
                alt="Third slide"
              />
              <Carousel.Caption>
                <h3>Third Slide Label</h3>
                <p>Description for the third slide.</p>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
      
        </Col>
      </Row>
    </Container>
    <h1 style={{ color: 'orange', textAlign: 'center' , marginTop: '50px'}}>ĐỐI TÁC XUẤT BẢN TIÊU BIỂU</h1>
    <Container style={{ marginTop: '50px' }}>
      <Row>
        <Col>
        <h3 style={{textAlign: 'center'}}>NXB Thế Giới</h3>
        <Carousel>
            <Carousel.Item>
              <img
           className="d-block w-100 carousel-image"
                src={book1}
                alt="First slide"
              />
              <Carousel.Caption>
                <h3>First Slide Label</h3>
                <p>Description for the first slide.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
               className="d-block w-100 carousel-image"
                src={book2}
                alt="Second slide"
              />
              <Carousel.Caption>
                <h3>Second Slide Label</h3>
                <p>Description for the second slide.</p>
              </Carousel.Caption>
            </Carousel.Item>
           
          </Carousel>
        </Col>
        <Col>
        <h3 style={{textAlign: 'center'}}>NXB Công Thương</h3>
        <Carousel>
            <Carousel.Item>
              <img
           className="d-block w-100 carousel-image"
                src={book2}
                alt="First slide"
              />
              <Carousel.Caption>
                <h3>First Slide Label</h3>
                <p>Description for the first slide.</p>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
               className="d-block w-100 height-10 carousel-image"
                src={book3}
                alt="Second slide"
              />
              <Carousel.Caption>
                <h3>Second Slide Label</h3>
                <p>Description for the second slide.</p>
              </Carousel.Caption>
            </Carousel.Item>
            
          </Carousel>
        </Col>
      </Row>
     
    </Container>
    <img
          src={htbx4} // Thay bằng URL ảnh của bạn
          alt="Example"
          className="img-fluid"
          style={{ width: '100%', height: 'auto', marginTop: '50px' }}
        />
            <div className="position-relative" style={{ width: '100vw', height: '100vh', overflow: 'hidden' }} ref={targetRef4}>
      <img src={htbx5} alt="Background" className="w-100 h-100" style={{ objectFit: 'cover' }} />
      
      <div 
        className="position-absolute top-50 start-50 translate-middle-y bg-white p-4 rounded shadow"
        style={{ maxWidth: '500px', width: '90%', left: '60%' }} // Dịch form sang phải bằng cách thay đổi giá trị left
      >
        <h2 className="text-center mb-4">Liên Hệ</h2>
        <h1 style={{ color: 'orange' }}>ĐĂNG KÍ NGAY HÔM NAY
        ĐỂ NHẬN ĐƯỢC GÓI ƯU ĐÃI!</h1>
        <Form>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Họ Và tên</Form.Label>
        <Form.Control type="text" placeholder="Họ Và tên" />
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" placeholder="Email" />
        <Form.Label>Số điện thoại</Form.Label>
        <Form.Control type="number" placeholder="sđt" />
        <Form.Label>Example textarea</Form.Label>
        <Form.Control as="textarea" rows={3} />
        <Button className="mt-3" variant="primary" size="lg">
        Gửi thông tin
      </Button>
      </Form.Group>
    </Form>
      </div>
    </div>
    <button 
        className="btn btn-primary" 
        style={{ position: 'fixed', bottom: '20px', left: '50%', transform: 'translateX(-50%)', zIndex: '1000' }}
        onClick={scrollToSection4}
      >
        Đăng ký ngay
      </button>
    </>
    )
}

export default Service;