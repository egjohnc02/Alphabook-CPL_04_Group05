import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from "firebase/firestore";
import { db } from '../../firebase/firebase';
import { Container, Card, Row, Col } from 'react-bootstrap';

function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      const eventRef = doc(db, "event", id);
      const eventSnap = await getDoc(eventRef);
      if (eventSnap.exists()) {
        setEvent(eventSnap.data());
      } else {
        console.log("No such document!");
      }
    };

    fetchEvent();
  }, [id]);

  if (!event) return <p>Đang tải dữ liệu...</p>;

  return (
    <Container className="mt-4">
      <Card>
        <Card.Header><strong>Chi tiết sự kiện</strong></Card.Header>
        <Card.Body>
          <Row>
            <Col xs={4}>
              <img src={event.img} alt={event.title} className="img-fluid" />
            </Col>
            <Col xs={8}>
              <h3>{event.title}</h3>
              <p>{event.content}</p>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default EventDetail;
