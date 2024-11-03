import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import '@fortawesome/fontawesome-free/css/all.min.css';


const Contact = () => {
  return (
    <>
      <Container fluid className="contact">
        <Row className="banner-contact d-flex text-center align-items-center justify-content-center">
          <div className="text-contact">
            <a href="/home" className="text-decoration-none text-black">
              <span>Trang chủ</span>
            </a>
            <h1 className="text-orange">ConTact</h1>
          </div>
        </Row>
      </Container>

      <Container className="main-contact">
        <Row>
          <p className="h2 mt-3 mb-3">Contact</p>
        </Row>
        <Row className="google-map responsive-order container m-0 p-0">
          <iframe
            className="iframe-google-map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.506341942514!2d105.52271427503096!3d21.012416680632853!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135abc60e7d3f19%3A0x2be9d7d0b5abcbf4!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBGUFQgSMOgIE7hu5lp!5e0!3m2!1svi!2s!4v1730544701504!5m2!1svi!2s"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            style={{width: '100%', border: 'none', padding: '0', margin: '0'}}
          ></iframe>
        </Row>
        <Row className="info-contact gx-3 mt-3">
          <Col md={12} xl={4} lg={4} >
            <div className="item-contacts-content d-flex">
            <div class="rounded-circle bg-orange mt-2 mx-2 bg-icon"
            style={{
                width: '45px',
                height: '45px'
            }}>
            <i class="fas fa-map-marker-alt text-white" ></i>
            </div>
            {/* style={{ maxWidth: 'calc(100% - 65px)' }} */}
				<div class="content-r" style={{ maxWidth: 'calc(100% - 65px)' }}>
				<p className="fw-bold pa-0 m-0">Địa chỉ:</p>
				<p className="text-nowrp">Tầng 3, Dream Home Center, 11a ngõ 282 Nguyễn Huy Tưởng, Thanh Xuân, Hà Nội</p>
				</div>    
            </div> 
          </Col>
          <Col md={12} xl={4} lg={4} ><div className="item-contacts-content">2</div></Col>
          <Col md={12} xl={4} lg={4} ><div className="item-contacts-content">3</div></Col>
        </Row> 
        <Row className="form-contact">3</Row>
      </Container>
    </>
  );
};

export default Contact;
