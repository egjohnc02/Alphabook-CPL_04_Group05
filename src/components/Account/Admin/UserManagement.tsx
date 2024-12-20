import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/firebase";

interface User {
  id: string;
  FirstName: string;
  LastName: string;
  email: string;
  Role: string;
  PhoneNumber?: string;
  isPremium?: boolean;
}

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userCollection = collection(db, "Users");
        const userSnapshot = await getDocs(userCollection);
        const userList = userSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as User[];
        setUsers(userList);
      } catch (error) {
        console.error("Error fetching users: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const getAccountType = (user: User) => {
    return user.isPremium ? "Cao cấp" : "Cơ bản";
  };

  return (
    <div className="container my-4">
      <h2>Quản Lý Người Dùng</h2>
      {loading ? (
        <p>Đang tải dữ liệu...</p>
      ) : (
        <div className="overflow-y-scroll" style={{maxHeight: 500}}>
        <table className="table table-striped">
          <thead className="thead-dark">
            <tr>
              <th scope="col" className="bg-orange text-white">#</th>
              <th scope="col" className="bg-orange text-white">Họ và Tên</th>
              <th scope="col" className="bg-orange text-white">Email</th>
              <th scope="col" className="bg-orange text-white">Loại tài khoản</th>
              <th scope="col" className="bg-orange text-white">Số Điện Thoại</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user, index) => (
                <tr key={user.id}>
                  <td>{index + 1}</td>
                  <td>{`${user.FirstName} ${user.LastName}`}</td>
                  <td>{user.email}</td>
                  <td>
                    <span 
                      className={`badge ${user.isPremium ? 'bg-success' : 'bg-secondary'}`}
                    >
                      {getAccountType(user)}
                    </span>
                  </td>
                  <td>{user.PhoneNumber || "Không có"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center">
                  Không có người dùng nào.
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

export default UserManagement;