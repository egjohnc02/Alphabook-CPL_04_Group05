import React from "react";
import './contact.css';
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import '@fortawesome/fontawesome-free/css/all.min.css';

const Contact: React.FC =() => {
  return (
    <>
      <Container fluid className="contact">
        {/* <Row className="banner-contact d-flex text-center align-items-center justify-content-center">
          <div className="text-contact">
            <a href="/home" className="text-decoration-none text-black">
              <span>Trang chủ</span>
            </a>
            <h1 className="text-orange">ConTact</h1>
          </div>
        </Row> */}
      </Container>

      <Container className="main-contact container-sm container-md container-lg d-flex flex-column">
        <Row className="order-sm-1 order-md-1">
          <p className="h2 mt-3 mb-3">Contact</p>
        </Row>
        <Row className="google-map responsive-order m-0 p-0 order-sm-last order-md-2">
          <iframe
            className="iframe-google-map"
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d14899.670390339543!2d105.80218600000002!3d20.99594!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135adf4c2c2b139%3A0xa86172a8679d0606!2zQ8O0bmcgdHkgY-G7lSBwaOG6p24gc8OhY2ggQWxwaGEgLSBBbHBoYWJvb2tz!5e0!3m2!1svi!2sus!4v1730626383273!5m2!1svi!2sus"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            style={{ width: "100%", border: "none", padding: "0", margin: "0" }}
          ></iframe>
        </Row>
        <Row className="info-contact g-3 mt-1 order-sm-3 order-md-3 mb-3 mb-2">
          <Col md={4} xs={12}>
            <div className="item-contacts-content d-flex">
              <div className="bg-icon rounded-circle bg-orange mt-2 mx-2 d-flex align-items-center justify-content-center">
                <i className="fas fa-map-marker-alt text-white "></i>
              </div>
              <div className="content-r">
                <p className="fw-bold pa-0 m-0">Địa chỉ:</p>
                <p className="">
                  Tầng 3, Dream Home Center, 11a ngõ 282 Nguyễn Huy Tưởng, Thanh
                  Xuân, Hà Nội
                </p>
              </div>
            </div>
          </Col>

          <Col md={4} xs={12}>
            <div className="item-contacts-content d-flex">
              <div className="bg-icon rounded-circle bg-orange mt-2 mx-2 d-flex align-items-center justify-content-center">
                <i className="fas fa-question text-white "></i>
              </div>
              <div className="content-r">
                <p className="fw-bold pa-0 m-0">Gửi thắc mắc:</p>
                <a
                  className="text-decoration-none text-reset"
                  href="mailto:mkt.alphabooks@gmail.com"
                >
                  mkt.alphabooks@gmail.com
                </a>
              </div>
            </div>
          </Col>
          <Col md={4} xs={12}>
            <div className="item-contacts-content d-flex">
              <div className="bg-icon rounded-circle bg-orange mt-2 mx-2 d-flex align-items-center justify-content-center">
                <i className="fas fa-phone-alt text-white "></i>
              </div>
              <div className="content-r">
                <p className="fw-bold pa-0 m-0">Điện thoại:</p>
                <a
                  className="text-decoration-none text-reset"
                  href="tel:0932329959"
                >
                  0932 329 959
                </a>
              </div>
            </div>
          </Col>
        </Row>
        <Row className="form-contact order-sm-4 order-md-4 ">
          <Col ms={12} lg={4} className="pe-1">
            <div className="">
              <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Label className="fw-bold text-muted">
                  Họ và Tên{" "}
                </Form.Label>
                <Form.Control type="text" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGroupPassword">
                <Form.Label className="fw-bold text-muted">Email </Form.Label>
                <Form.Control type="email" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGroupPassword">
                <Form.Label className="fw-bold text-muted">
                  Số điện thoại{" "}
                </Form.Label>
                <Form.Control type="text" />
              </Form.Group>
            </div>
          </Col>
          <Col ms={12} lg={8} className="">
            <div className="">
              <Form.Group controlId="formLargeInput">
                <Form.Label className="fw-bold text-muted">Nhập nội dung</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={6}
                />
              </Form.Group>
              <Button variant="" className="bg-orange mt-3 mb-3 text-light">Gửi liên hệ</Button>
            </div>
          </Col>
        </Row>
      </Container>
      {/* <Form>
            <Col ms={12} lg={4} className="">
              <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Label className="fw-bold text-muted">Họ và Tên </Form.Label>
                <Form.Control type="text"/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGroupPassword">
                <Form.Label className="fw-bold text-muted">Email </Form.Label>
                <Form.Control type="email" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formGroupPassword">
                <Form.Label className="fw-bold text-muted">Số điện thoại </Form.Label>
                <Form.Control type="text" />
              </Form.Group>
            </Col>
            <Col ms={12} lg={8}>
            <Form.Group className="mb-3" controlId="formGroupPassword">
                <Form.Label className="fw-bold text-muted">Số điện thoại </Form.Label>
                <Form.Control type="text" />
              </Form.Group>
            </Col>
          </Form> */}
    </>
  );
};



export default Contact;