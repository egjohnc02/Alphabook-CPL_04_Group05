import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  query,
  limit,
  startAfter,
  doc,
  deleteDoc,
  updateDoc,
 setDoc,
} from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import { Timestamp } from "firebase/firestore";
import { Pagination, Table, Spinner, Modal, Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useNavigate } from 'react-router-dom';
interface Event {
  id: string;
  title: string;
  content: string;
  img: string;
  Date: Timestamp;
}

const EventManagement: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastVisible, setLastVisible] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isCreating, setIsCreating] = useState(false); // Để phân biệt chế độ tạo mới hay cập nhật
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    img: "",
    Date: "",
  });
  const navigate = useNavigate();
  const EVENTS_PER_PAGE = 9;

  const fetchEvents = async (page: number) => {
    setIsLoading(true);
    try {
      const eventRef = collection(db, "event");
      let q;
      if (page === 1 || !lastVisible) {
        q = query(eventRef, limit(EVENTS_PER_PAGE));
      } else {
        q = query(eventRef, startAfter(lastVisible), limit(EVENTS_PER_PAGE));
      }
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        const fetchedEvents = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Event[];
        setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
        setEvents(fetchedEvents);
      } else {
        setEvents([]);
      }
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sự kiện này?")) {
      try {
        await deleteDoc(doc(db, "event", id));
        setEvents(events.filter((event) => event.id !== id)); // Loại bỏ sự kiện khỏi danh sách
        setLastVisible(null); // Đặt lại trạng thái lastVisible
        fetchEvents(1); // Tải lại từ trang đầu
      } catch (error) {
        console.error("Lỗi khi xóa sự kiện: ", error);
      }
    }
  };

  const handleUpdate = (event: Event) => {
    setSelectedEvent(event);
    setFormData({
      title: event.title,
      content: event.content,
      img: event.img,
      Date: new Date(event.Date.seconds * 1000).toISOString().slice(0, 10), // ISO Date
    });
    setIsCreating(false);
    setShowModal(true);
  };

  const handleSave = async () => {
    if (isCreating) {
      // Thêm sự kiện mới
      
      try {
        const eventRef = collection(db, "event");
        const newId = (Math.random() * 1000000).toFixed(0);
        const newEvent = {
          id: newId,
          title: formData.title,
          content: formData.content,
          img: formData.img,
          Date: Timestamp.fromDate(new Date(formData.Date)),
        };

        await setDoc(doc(eventRef, newId), newEvent); // Tạo document với ID cụ thể
      setEvents([{ ...newEvent }, ...events]); // Thêm vào danh sách sự kiện
      setShowModal(false);
      fetchEvents(1);
      } catch (error) {
        console.error("Lỗi khi tạo sự kiện: ", error);
      }
    } else {
      // Cập nhật sự kiện
      if (selectedEvent) {
        try {
          const eventDoc = doc(db, "event", selectedEvent.id);
          await updateDoc(eventDoc, {
            title: formData.title,
            content: formData.content,
            img: formData.img,
            Date: Timestamp.fromDate(new Date(formData.Date)),
          });
          setEvents(
            events.map((event) =>
              event.id === selectedEvent.id
                ? { ...event, ...formData, Date: Timestamp.fromDate(new Date(formData.Date)) }
                : event
            )
          );
          setShowModal(false);
        } catch (error) {
          console.error("Lỗi khi cập nhật sự kiện: ", error);
        }
      }
    }
  };

  const handleCreate = () => {
    setFormData({
      title: "",
      content: "",
      img: "",
      Date: new Date().toISOString().slice(0, 10), // Ngày hiện tại
    });
    setIsCreating(true);
    setShowModal(true);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchEvents(page);
  };

  useEffect(() => {
    fetchEvents(currentPage);
  }, []);
  const handleTitleClick = (eventId: string) => {
    navigate(`/event/${eventId}`);
  };
  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };
  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center">
        <h1 className="mb-4">Danh sách sự kiện</h1>
        <Button variant="success" onClick={handleCreate}>
          Tạo sự kiện
        </Button>
      </div>
      {isLoading ? (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" variant="danger" />
        </div>
      ) : (
        <>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Tiêu đề</th>
                <th>Nội dung</th>
                <th>Ngày</th>
                <th>Hình ảnh</th>
                <th>Chỉnh sửa</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event, index) => (
                <tr key={event.id}>
                  <td>{(currentPage - 1) * EVENTS_PER_PAGE + index + 1}</td>
                  <td onClick={() => handleTitleClick(event.id)} style={{ cursor: "pointer" }}>{event.title}</td>
                  <td>{truncateText(event.content, 50)} </td>
                  <td>
                    {event.Date
                      ? new Date(event.Date.seconds * 1000).toLocaleDateString()
                      : "Không có ngày"}
                  </td>
                  <td>
                    <img
                      src={event.img}
                      alt={event.title}
                      style={{ width: "100px", height: "auto" }}
                    />
                  </td>
                  <td>
                    <Button
                      variant="primary"
                      style={{ width: "100px", marginBottom: "10px" }}
                      onClick={() => handleUpdate(event)}
                    >
                      Update
                    </Button>
                    <Button
                      variant="danger"
                      style={{ width: "100px" }}
                      onClick={() => handleDelete(event.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <div className="d-flex justify-content-center">
            <Pagination>
              <Pagination.Prev
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                Trang trước
              </Pagination.Prev>
              <Pagination.Item active>{currentPage}</Pagination.Item>
              <Pagination.Next
                disabled={events.length < EVENTS_PER_PAGE}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                Trang tiếp
              </Pagination.Next>
            </Pagination>
          </div>
        </>
      )}

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{isCreating ? "Tạo sự kiện" : "Chỉnh sửa sự kiện"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Tiêu đề</Form.Label>
              <Form.Control
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Nội dung</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Hình ảnh</Form.Label>
              <Form.Control
                type="text"
                value={formData.img}
                onChange={(e) => setFormData({ ...formData, img: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Ngày</Form.Label>
              <Form.Control
                type="date"
                value={formData.Date}
                onChange={(e) => setFormData({ ...formData, Date: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Hủy
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Lưu
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EventManagement;
