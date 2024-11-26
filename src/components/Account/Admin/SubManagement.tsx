import { useState, useEffect } from "react";
import { db } from "../../../firebase/firebase";
import { collection, getDocs, addDoc, deleteDoc, doc} from "firebase/firestore";

interface PremiumCode {
  id: string;
  code: string;
  usedBy: string | null;
  expiresAt: string;
}

const PremiumSubscriptionManagement = () => {
  const [codes, setCodes] = useState<PremiumCode[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const generateRandomCode = () => {
    return Math.random().toString(36).substr(2, 9).toUpperCase();
  };

  const handleBuyPremium = async () => {
    const newCode = generateRandomCode();
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 30);

    const newCodeData = {
      code: newCode,
      usedBy: null,
      expiresAt: expirationDate.toISOString(),
    };

    try {
      const docRef = await addDoc(collection(db, "PremiumCodes"), newCodeData);
      console.log("Mã mới đã được thêm vào Firestore:", docRef.id);

      setCodes((prevCodes) => [
        ...prevCodes,
        { id: docRef.id, ...newCodeData },
      ]);
    } catch (error) {
      console.error("Lỗi khi tạo mã cao cấp:", error);
    }
  };

  const handleDeleteCode = async (id: string) => {
    try {
      const codeDocRef = doc(db, "PremiumCodes", id);
      await deleteDoc(codeDocRef);

      setCodes(codes.filter(code => code.id !== id));
      console.log("Mã đã được xóa:", id);
    } catch (error) {
      console.error("Lỗi khi xóa mã cao cấp:", error);
    }
  };

  useEffect(() => {
    const fetchCodes = async () => {
      try {
        const codesCollection = collection(db, "PremiumCodes");
        const codesSnapshot = await getDocs(codesCollection);
        const codesList = codesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as PremiumCode[];

        console.log("Dữ liệu mã từ Firestore:", codesList);
        setCodes(codesList);
      } catch (error) {
        console.error("Lỗi khi tải mã từ Firestore:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCodes();
  }, []);

  return (
    <div className="container my-4">
      <h2>Quản Lý Gói Cao Cấp</h2>
      <div className="mb-3">
        <button className="btn btn-primary" onClick={handleBuyPremium}>
          Tạo mã
        </button>
      </div>
      {loading ? (
        <p>Đang tải dữ liệu...</p>
      ) : (
        <div className="overflow-y-scroll" style={{ maxHeight: 500 }}>
          <table className="table table-striped">
            <thead className="thead-dark">
              <tr>
                <th scope="col" className="bg-orange text-white">#</th>
                <th scope="col" className="bg-orange text-white">Mã</th>
                <th scope="col" className="bg-orange text-white">Được dùng bởi</th>
                <th scope="col" className="bg-orange text-white">Thời gian hết hạn</th>
                <th scope="col" className="bg-orange text-white">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {codes.length > 0 ? (
                codes.map((code, index) => (
                  <tr key={code.id}>
                    <td>{index + 1}</td>
                    <td>{code.code}</td>
                    <td>{code.usedBy || "Chưa sử dụng"}</td>
                    <td>{new Date(code.expiresAt).toLocaleDateString()}</td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDeleteCode(code.id)}
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center">
                    Không có mã nào.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PremiumSubscriptionManagement;
