import { useState, useEffect } from 'react';
import {  Row, Col, Card, Pagination } from 'react-bootstrap';
import { collection, getDocs} from "firebase/firestore";
import { db } from '../../firebase/firebase';
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
    <>
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
    </>
  );
}

export default Event;
