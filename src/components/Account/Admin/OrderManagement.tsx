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
  items: { bookTitle: string; quantity: string; bookPrice: string }[];
  address: string,
  phoneNumber: string,
  fullName: string
}

const OrderManagement: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const orderCollection = collection(db, "DonHang");
        const orderSnapshot = await getDocs(orderCollection);
        const orderList = orderSnapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data()} as Order))
          .sort(
            (a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()
          ) as Order[];
        setOrders(orderList);
      } catch (error) {
        console.error(error);
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
      console.error(error);
    }
  };

  return (
    <div className="container my-4">
      <h2>Quản Lý Đơn Hàng</h2>
      <div className="overflow-y-scroll" style={{ maxHeight: 500 }}>
        <table className="table table-striped">
          <thead className="thead-dark">
            <tr>
              <th scope="col" className="bg-orange text-white ">#</th>
              <th scope="col" className="bg-orange text-white">Người đặt</th>
              <th scope="col" className="bg-orange text-white">Email</th>
              <th scope="col" className="bg-orange text-white">Mã đơn hàng</th>
              <th scope="col" className="bg-orange text-white">Ngày Đặt Hàng</th>
              <th scope="col" className="bg-orange text-white">Tổng Tiền</th>
              <th scope="col" className="bg-orange text-white">Trạng Thái</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order, index) => (
                <React.Fragment key={order.id}>
                  <tr>
                    <th scope="row">{index + 1}</th>
                    <td>{order.userName}</td>
                    <td>{order.email}</td>
                    <td className="btn-link text-decoration-none" data-bs-toggle="modal" data-bs-target={`#modal-${order.id}`}> {order.id} </td>
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
                  <div className="modal fade" id={`modal-${order.id}`} aria-labelledby={`modal-label-${order.id}`} aria-hidden="true" >
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h1 className="modal-title fs-5" id={`modal-label-${order.id}`}>
                            Chi tiết đơn hàng
                          </h1>
                          <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <p><strong>Họ và tên:</strong> {order.userName}</p>
                            <p><strong>Mã đơn hàng:</strong> {order.id}</p>
                            <p><strong>Số điện thoại:</strong> {order.phoneNumber}</p>
                            <p><strong>Địa chỉ:</strong> {order.address}</p>
                            <div>
                              <p><strong>Sản phẩm:</strong>
                              <ul>
                                {order.items.map((item, index) => (
                                  <li key={index}>
                                    {item.quantity} x {item.bookTitle} ={" "}
                                    {parseFloat(item.bookPrice).toLocaleString("vi-VN")}₫
                                  </li>
                                ))}
                                <p className="text-end"><strong>Tổng tiền: </strong> {order.totalPrice.toLocaleString("vi-VN")}₫</p>
                                </ul>
                                </p>
                            </div>
                        </div>
                        <div className="modal-footer">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                          >
                            Đóng
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center">
                  Không có đơn hàng nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderManagement;
