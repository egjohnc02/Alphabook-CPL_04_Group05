import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db, auth } from "../../../../firebase/firebase";

interface Order {
    userId: string;
    orderId: string;
    userName: string;
    phoneNumber: string;
    address: string;
    items: { bookTitle: string; quantity: string; bookPrice: string }[];
    totalPrice: number;
    orderDate: string;
    status: string;
}

const DonHang: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        const fetchOrders = async () => {
            const user = auth.currentUser;

            if (user) {
                const ordersRef = collection(db, "DonHang");
                const snapshot = await getDocs(ordersRef);

                const userOrders = snapshot.docs
                    .map((doc) => ({ orderId: doc.id, ...doc.data() } as Order))
                    .filter((order) => order.userId === user.uid);
                setOrders(userOrders);
            }
        };

        fetchOrders();
    }, []);

    return (
      <div className="container mt-4">
      <h2>Danh sách đơn hàng</h2>
      {orders.length > 0 ? (
          <table className="table table-striped">
              <thead className="thead-dark">
                  <tr>
                      <th scope="col">Sản phẩm</th>
                      <th scope="col">Ngày</th>
                      <th scope="col">Địa chỉ</th>
                      <th scope="col">Mã đơn hàng</th>
                      <th scope="col">Giá trị đơn hàng</th>
                      <th scope="col">TT thanh toán</th>
                  </tr>
              </thead>
              <tbody>
                  {orders.map((order) => (
                      <tr key={order.orderId}>
                        <td>
                              <ul>
                                  {order.items.map((item, index) => (
                                      <li key={index}>
                                         {item.quantity} x {item.bookTitle}
                                      </li>
                                  ))}
                              </ul>
                          </td>
                          <td>{new Date(order.orderDate).toLocaleString()}</td>
                          <td>{order.address}</td>
                          <td>{order.orderId}</td>
                          <td>{order.totalPrice} VNĐ</td>
                          <td>{order.status}</td>
                      </tr>
                  ))}
              </tbody>
          </table>
      ) : (
          <p>Không có đơn hàng nào.</p>
      )}
  </div>
    );
};

export default DonHang;
