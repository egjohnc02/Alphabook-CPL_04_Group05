import React, { useState, useEffect } from "react";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebase";

interface Order {
  id: string;
  userName: string;
  email: string;
  orderDate: string;
  totalPrice: number;
  status: string;
}

const OrderManagement: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const orderCollection = collection(db, "DonHang");
        const orderSnapshot = await getDocs(orderCollection);
        const orderList = orderSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Order[];
        setOrders(orderList);
      } catch (error) {
        console.error("Error fetching orders: ", error);
      }
    };

    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      const orderRef = doc(db, "DonHang", orderId);
      await updateDoc(orderRef, { status: newStatus });
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error("Error updating status: ", error);
    }
  };

  return (
    <div className="container my-4">
      <h2>Quản Lý Đơn Hàng</h2>
      <table className="table table-striped">
        <thead className="thead-dark">
          <tr>
            <th scope="col">#</th>
            <th scope="col">Tên Người Dùng</th>
            <th scope="col">Email</th>
            <th scope="col">Mã đơn hàng</th>
            <th scope="col">Ngày Đặt Hàng</th>
            <th scope="col">Tổng Tiền</th>
            <th scope="col">Trạng Thái</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders.map((order, index) => (
              <tr key={order.id}>
                <th scope="row">{index + 1}</th>
                <td>{order.userName}</td>
                <td>{order.email}</td>
                <td>{order.id}</td>
                <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                <td>{order.totalPrice.toLocaleString("vi-VN")}₫</td>
                <td>
                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(order.id, e.target.value)
                    }
                  >
                    <option value="Đang xử lý">Đang xử lý</option>
                    <option value="Đang giao hàng">Đang giao hàng</option>
                    <option value="Đã thanh toán">Đã thanh toán</option>
                    <option value="Đã huỷ">Đã huỷ</option>
                  </select>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="text-center">
                Không có đơn hàng nào.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default OrderManagement;
