import React, { useEffect, useState } from "react";
import { collection, getDocs, query, limit, startAfter } from "firebase/firestore";
import { db } from "../../../firebase/firebase";
import { Timestamp } from "firebase/firestore";
import { Pagination, Table, Spinner } from "react-bootstrap"; // Thêm từ React Bootstrap
import Button from 'react-bootstrap/Button';

interface Event {
  id: string;
  title: string;
  content: string;
  img: string;
  Date: Timestamp; // Trường Date (viết hoa) của Firestore
}

const EventManagement: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastVisible, setLastVisible] = useState<any>(null); // Lưu trữ con trỏ phân trang
  const [isLoading, setIsLoading] = useState(false);

  const EVENTS_PER_PAGE = 9;

  const fetchEvents = async (page: number) => {
    setIsLoading(true);

    try {
      const eventRef = collection(db, "event");
      let q;

      if (page === 1 || !lastVisible) {
        // Lấy dữ liệu trang đầu tiên
        q = query(eventRef, limit(EVENTS_PER_PAGE));
      } else {
        // Lấy dữ liệu từ con trỏ của trang trước
        q = query(eventRef, startAfter(lastVisible), limit(EVENTS_PER_PAGE));
      }

      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        const fetchedEvents = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Event[];

        setLastVisible(snapshot.docs[snapshot.docs.length - 1]); // Lưu con trỏ phân trang
        setEvents(fetchedEvents);
      } else {
        setEvents([]); // Trường hợp không còn dữ liệu
      }
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchEvents(page);
  };

  useEffect(() => {
    fetchEvents(currentPage);
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Danh sách sự kiện</h1>
      {isLoading ? (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <>
          <Table striped bordered hover responsive>
            <thead >
              <tr >
                <th className="bg-orange text-white">#</th>
                <th className="bg-orange text-white">Tiêu đề</th>
                <th className="bg-orange text-white">Nội dung</th>
                <th className="bg-orange text-white">Ngày</th>
                <th className="bg-orange text-white">Hình ảnh</th>
                <th className="bg-orange text-white">chỉnh sửa</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event, index) => (
                <tr key={event.id}>
                  <td>{(currentPage - 1) * EVENTS_PER_PAGE + index + 1}</td>
                  <td>{event.title}</td>
                  <td>{event.content}</td>
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
                    style={{ width: "100px", marginBottom: "10px" }} // Cùng chiều dài và thêm khoảng cách
                    >
                      Update
                  </Button>
                  <Button variant="danger" style={{ width: "100px" }}>
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
    </div>
  );
};

export default EventManagement;
