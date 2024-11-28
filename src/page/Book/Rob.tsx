import React from 'react';
import { db } from '../../firebase/firebase';
import "@react-pdf-viewer/core/lib/styles/index.css";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { doc, getDoc } from "firebase/firestore";
// Định nghĩa kiểu dữ liệu cho Props (nếu cần)
interface RobProps {
  // Bạn có thể thêm các prop ở đây nếu cần
  id: string;
  coverType: string;
  dimensions: string;
  pageCount: string;
  publishDate: string;
  publisher: string;
  url: string;
}

const Rob: React.FC<RobProps> = () => {

  // Định nghĩa URL của file PDF
  
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<RobProps | null>(null);
  useEffect(() => {
    const fetchEvent = async () => {
      if (!id) return;

      const eventRef = doc(db, "DetailBook", id);
      const eventSnap = await getDoc(eventRef);

      if (eventSnap.exists()) {
        setEvent(eventSnap.data() as RobProps);
      } else {
        console.log("No such document!");
      }
    };

    fetchEvent();
  }, [id]);
  if (!event || !event.url) return <p>Đang tải dữ liệu...</p>;
  
  const pdfUrl: string = event.url;
  
  return (
    
      <div style={{ height: "100vh", width: "100%" }}>
        {/* Sử dụng iframe để nhúng file PDF */}
        <iframe
          src={pdfUrl}
          title="PDF Viewer"
          style={{ width: "100%", height: "100%", border: "none" }}
        />
      </div>

  );
}

export default Rob;
