import React from 'react';
import { Container, Row, Col, Card, Dropdown, ListGroup } from 'react-bootstrap';
import AutoScrollToTop from '../../utils/AutoScrollToTop';

function Event() {
  AutoScrollToTop();

  return (
    <Container className="mt-4">
      {/* Danh mục tin và Tin nổi bật bên trái */}
      <Row>
        <Col md={3}>
          {/* Danh mục tin */}
          <Card className="mb-4">
            <Card.Header><strong>Danh mục tin</strong></Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Dropdown>
                <Dropdown.Toggle variant="link" id="dropdown-basic" style={{ textDecoration: 'none' }}>
                    Tin tức
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="#">Báo chí</Dropdown.Item>
                    <Dropdown.Item href="#">Tin nội bộ</Dropdown.Item>
                    <Dropdown.Item href="#">Tin tuyển dụng</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </ListGroup.Item>
              <ListGroup.Item>Sự kiện</ListGroup.Item>
            </ListGroup>
          </Card>

          {/* Tin nổi bật */}
          <Card>
            <Card.Header><strong>Tin nổi bật</strong></Card.Header>
            <Card.Body>
              <Row>
                <Col xs={4}>
                  <img src="path/to/featured-image.jpg" alt="Tin nổi bật" className="img-fluid" />
                </Col>
                <Col xs={8}>
                  <p><strong>Tiêu đề nổi bật</strong></p>
                  <p>Mô tả ngắn cho tin nổi bật.</p>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>

        {/* Danh sách sự kiện bên phải */}
        <Col md={9}>
          <h2 >SỰ KIỆN</h2>
          <Row>
            {[...Array(10)].map((_, index) => (
              <Col md={4} className="mb-4" key={index}>
                <Card>
                  <Card.Img variant="top" src={`path/to/event-image-${index + 1}.jpg`} />
                  <Card.Body>
                    <Card.Title>Tiêu đề sự kiện {index + 1}</Card.Title>
                    <Card.Text>
                      Nội dung mô tả ngắn cho sự kiện {index + 1}.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default Event;
