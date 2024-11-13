import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Dropdown, ListGroup, Pagination } from 'react-bootstrap';
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from '../../firebase/firebase';
import AutoScrollToTop from '../../utils/AutoScrollToTop';
import { useNavigate } from 'react-router-dom';

interface EventData {
  id: string;
  img: string;
  title: string;
  content: string;
  Date?: string;
}

function Event() {

  // Định nghĩa kiểu dữ liệu cho state
  const itemsPerPage = 9;
  const [events, setEvents] = useState<EventData[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [featuredEvent, setFeaturedEvent] = useState<EventData | null>(null);
  const navigate = useNavigate();

  // Fetch events từ Firestore
  useEffect(() => {
    const fetchEvents = async () => {
      const eventCollection = collection(db, "event");
      const eventSnapshot = await getDocs(eventCollection);
      const eventList = eventSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as EventData[];
      setEvents(eventList);

      // Lấy sự kiện mới nhất cho phần tin nổi bật
      const latestEventQuery = query(eventCollection, orderBy("Date", "desc"), limit(1));
      const latestEventSnapshot = await getDocs(latestEventQuery);
      if (!latestEventSnapshot.empty) {
        const latestEventDoc = latestEventSnapshot.docs[0];
        setFeaturedEvent({ id: latestEventDoc.id, ...latestEventDoc.data() } as EventData);
      }
    };
    fetchEvents();
  }, []);

  // Logic phân trang
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = events.slice(indexOfFirstItem, indexOfLastItem);
  const handlePageChange = (pageNumber: number) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(events.length / itemsPerPage);

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  // Hàm chuyển hướng sang trang chi tiết sự kiện
  const handleTitleClick = (eventId: string) => {
    navigate(`/event/${eventId}`);
  };

  return (
    <Container className="mt-4">
      <AutoScrollToTop />;
      <Row>
        <Col md={3}>
          {/* Danh mục tin */}
          <Card className="mb-4">
            <Card.Header><strong>Danh mục tin</strong></Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Dropdown>
                  <Dropdown.Toggle href="/news" variant="link" id="dropdown-basic" style={{ textDecoration: 'none' }}>
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
          {featuredEvent && (
            <Card>
              <Card.Header><strong>Tin nổi bật</strong></Card.Header>
              <Card.Body>
                <Row>
                  <Col xs={4}>
                    <img src={featuredEvent.img} alt="Tin nổi bật" className="img-fluid" />
                  </Col>
                  <Col xs={8}>
                    <Card.Title 
                      onClick={() => handleTitleClick(featuredEvent.id)} 
                      style={{ cursor: 'pointer', color: 'blue' }}
                    >
                      {truncateText(featuredEvent.title, 50)}
                    </Card.Title>
                    <p>{truncateText(featuredEvent.content, 50)}</p>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          )}
        </Col>

        <Col md={9}>
          <h2>SỰ KIỆN</h2>
          <Row>
            {currentItems.map((event) => (
              <Col md={4} className="mb-4" key={event.id}>
                <Card>
                  <Card.Img variant="top" src={event.img} />
                  <Card.Body>
                    <Card.Title 
                      onClick={() => handleTitleClick(event.id)} 
                      style={{ cursor: 'pointer', color: 'blue' }}
                    >
                      {truncateText(event.title, 50)}
                    </Card.Title>
                    <Card.Text>{truncateText(event.content, 50)}</Card.Text>
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
