import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Dropdown, ListGroup } from 'react-bootstrap';
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from '../../firebase/firebase';
import { Link, Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import AutoScrollToTop from '../../utils/AutoScrollToTop';

interface EventData {
  id: string;
  img: string;
  title: string;
  content: string;
  Date?: string;
}

function EventLayout() {
  const [featuredEvent, setFeaturedEvent] = useState<EventData | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchFeaturedEvent = async () => {
      const eventCollection = collection(db, "event");
      const latestEventQuery = query(eventCollection, orderBy("Date", "desc"), limit(1));
      const latestEventSnapshot = await getDocs(latestEventQuery);
      if (!latestEventSnapshot.empty) {
        const latestEventDoc = latestEventSnapshot.docs[0];
        setFeaturedEvent({ id: latestEventDoc.id, ...latestEventDoc.data() } as EventData);
      }
    };
    fetchFeaturedEvent();
  }, []);
  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };
  return (
    <Container className="mt-4">
      <AutoScrollToTop  />
      <Row>
        <Col md={3}>
          {/* Danh mục tin */}
          <Card className="mb-4">
            <Card.Header><strong>Danh mục tin</strong></Card.Header>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Dropdown>
                  <Dropdown.Toggle variant="link" id="dropdown-basic" style={{ textDecoration: 'none' }}>
                    <Link to='/news'>
                      Tin tức
                    </Link>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item>Báo chí</Dropdown.Item>
                    <Dropdown.Item>Tin nội bộ</Dropdown.Item>
                    <Dropdown.Item>Tin tuyển dụng</Dropdown.Item>
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
                      onClick={() => navigate(`/event/${featuredEvent.id}`)} 
                      style={{ cursor: 'pointer', color: 'blue' }}
                    >
                      {featuredEvent.title}
                    </Card.Title>
                    <p>{ truncateText (featuredEvent.content,50)}</p>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          )}
        </Col>

        <Col md={9}>
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
}

export default EventLayout;
