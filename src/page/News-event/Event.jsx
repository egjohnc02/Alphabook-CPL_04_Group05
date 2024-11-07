import React, { useState } from 'react';
import { Container, Row, Col, Card, Dropdown, ListGroup, Pagination } from 'react-bootstrap';
import AutoScrollToTop from '../../utils/AutoScrollToTop';

function Event() {
  AutoScrollToTop();

  // Pagination setup
  const itemsPerPage = 9;
  const [currentPage, setCurrentPage] = useState(1);

  // Sample data for events; replace with actual data
  const events = Array.from({ length: 12 }, (_, index) => ({
    id: index + 1,
    title: `Tiêu đề sự kiện ${index + 1}`,
    description: `Nội dung mô tả ngắn cho sự kiện ${index + 1}`,
    imgSrc: `path/to/event-image-${index + 1}.jpg`
  }));

  // Determine items to display on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = events.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  // Total number of pages
  const totalPages = Math.ceil(events.length / itemsPerPage);

  return (
    <Container className="mt-4">
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

        <Col md={9}>
          <h2>SỰ KIỆN</h2>
          <Row>
            {currentItems.map((event) => (
              <Col md={4} className="mb-4" key={event.id}>
                <Card>
                  <Card.Img variant="top" src={event.imgSrc} />
                  <Card.Body>
                    <Card.Title>{event.title}</Card.Title>
                    <Card.Text>{event.description}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>

          {/* Pagination Controls */}
          <Pagination className="justify-content-center">
            {Array.from({ length: totalPages }, (_, index) => (
              <Pagination.Item
                key={index + 1}
                active={index + 1 === currentPage}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))}
          </Pagination>
        </Col>
      </Row>
    </Container>
  );
}

export default Event;
