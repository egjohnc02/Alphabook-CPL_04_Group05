import React, { useState, useEffect } from "react";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebase";

interface HTXB {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  status?: string;
  timestamp: Date;
}

const HTXBManagement: React.FC = () => {
  const [submissions, setSubmissions] = useState<HTXB[]>([]);
  const [updating, setUpdating] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchSubmissions = async () => {
    try {
      const htxbCollection = collection(db, "htxb");
      const htxbSnapshot = await getDocs(htxbCollection);
      const htxbList = htxbSnapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
          timestamp: doc.data().timestamp?.toDate(),
          status: doc.data().status || "Chờ xử lý"
        }))
        .sort((a, b) => b.timestamp - a.timestamp) as HTXB[];
      setSubmissions(htxbList);
      setError(null);
    } catch (error) {
      console.error("Error fetching submissions:", error);
      setError("Không thể tải dữ liệu. Vui lòng thử lại sau.");
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const handleStatusChange = async (submissionId: string, newStatus: string) => {
    try {
      setUpdating(submissionId);
      const htxbRef = doc(db, "htxb", submissionId);
      
      await updateDoc(htxbRef, { 
        status: newStatus,
        lastUpdated: new Date()
      });

      setSubmissions((prevSubmissions) =>
        prevSubmissions.map((submission) =>
          submission.id === submissionId ? { ...submission, status: newStatus } : submission
        )
      );
    } catch (error) {
      console.error(error);
      alert("Không thể cập nhật trạng thái. Vui lòng thử lại!");
    } finally {
      setUpdating(null);
    }
  };

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="container my-4">
      <h2>Quản Lý Hợp Tác Và Xuất Bản</h2>
        {submissions.length > 0 ? (
        <div className="overflow-y-scroll" style={{maxHeight: 500}}>
          <table className="table table-striped">
          <thead className="thead-dark">
              <tr>
                <th scope="col" className="bg-orange text-white">#</th>
                <th scope="col" className="bg-orange text-white">Họ và Tên</th>
                <th scope="col" className="bg-orange text-white">Email</th>
                <th scope="col" className="bg-orange text-white">Số Điện Thoại</th>
                <th scope="col" className="bg-orange text-white">Nội dung</th>
                <th scope="col" className="bg-orange text-white">Thời Gian</th>
                <th scope="col" className="bg-orange text-white">Trạng Thái</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {submissions.map((submission, index) => (
                <tr key={submission.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {submission.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {submission.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {submission.phone}
                  </td>
                  <td className="px-6 py-4">{submission.service}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {submission.timestamp.toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      className="border rounded px-2 py-1"
                      value={submission.status}
                      onChange={(e) =>
                        handleStatusChange(submission.id, e.target.value)
                      }
                      disabled={updating === submission.id}
                    >
                      <option value="Chờ xử lý">Chờ xử lý</option>
                      <option value="Đang tư vấn">Đang tư vấn</option>
                      <option value="Đã tư vấn">Đã tư vấn</option>
                      <option value="Không liên lạc được">
                        Không liên lạc được
                      </option>
                      <option value="Đã huỷ">Đã huỷ</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        ) : (
          <div className="text-center py-4 text-gray-500">
            Không có yêu cầu nào.
          </div>
        )}
      </div>
  );
};

export default HTXBManagement;