import React, { useState, useEffect } from "react";
import { auth, db } from "../../../../firebase/firebase";
import { doc, updateDoc, getDoc, arrayRemove } from "firebase/firestore";

const SoDiaChi: React.FC = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [address, setAddress] = useState("");
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");
  const [isDefault, setIsDefault] = useState(false);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);

  type Address = {
    name: string;
    phone: string;
    company: string;
    address: string;
    province: string;
    district: string;
    ward: string;
    isDefault: boolean;
  };
  
  useEffect(() => {
    const fetchAddresses = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const userRef = doc(db, "Users", user.uid);
          const userDoc = await getDoc(userRef);
          if (userDoc.exists()) {
            const data = userDoc.data();
            setAddresses(data.addresses || []);
          }
        } catch (error) {
          console.error("Error fetching addresses:", error);
        }
      }
    };
    fetchAddresses();
  }, []);

  const addOrUpdateAddress = async () => {
    const user = auth.currentUser;
    if (!user) {
      return;
    }

    const userRef = doc(db, "Users", user.uid);
    const newAddress = {
      name,
      phone,
      company,
      address,
      province,
      district,
      ward,
      isDefault,
    };

    try {
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        const data = userDoc.data();
        let updatedAddresses = data.addresses || [];

        if (isDefault) {
          updatedAddresses = updatedAddresses.map((addr: Address) => ({
            ...addr,
            isDefault: false,
          }));
        }

        if (editIndex !== null) {
          updatedAddresses[editIndex] = newAddress;
        } else {
          updatedAddresses.push(newAddress);
        }

        await updateDoc(userRef, {
          addresses: updatedAddresses,
        });

        setAddresses(updatedAddresses);
        resetForm();
      }
    } catch (e) {
      window.alert("Error adding/updating address: " + e);
    }
  };

  const deleteAddress = async (index: number) => {
    const user = auth.currentUser;
    if (!user) {
      console.error("No user is logged in.");
      return;
    }
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa địa chỉ này?");
  
    if (confirmDelete) {
      const userRef = doc(db, "Users", user.uid);
      const addressToDelete = addresses[index];
      try {
        await updateDoc(userRef, {
          addresses: arrayRemove(addressToDelete)
        });
        setAddresses((prev) => prev.filter((_, idx) => idx !== index));
      } catch (error) {
        window.alert("Lỗi khi xóa địa chỉ:"+ error);
      }
    }
  };

  const editAddress = (index: number) => {
    const addressToEdit = addresses[index];
    setName(addressToEdit.name);
    setPhone(addressToEdit.phone);
    setCompany(addressToEdit.company);
    setAddress(addressToEdit.address);
    setProvince(addressToEdit.province);
    setDistrict(addressToEdit.district);
    setWard(addressToEdit.ward);
    setIsDefault(addressToEdit.isDefault);
    setEditIndex(index);
  };

  const resetForm = () => {
    setName("");
    setPhone("");
    setCompany("");
    setAddress("");
    setProvince("");
    setDistrict("");
    setWard("");
    setIsDefault(false);
    setEditIndex(null);
  };

  return (
    <div>
      <p className="fs-4">Địa chỉ của bạn</p>
      <button
        type="button"
        className="btn bg-orange text-white"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        onClick={resetForm}
      >
        Thêm địa chỉ
      </button>

      <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                {editIndex !== null ? "Chỉnh sửa địa chỉ" : "Thêm địa chỉ mới"}
              </h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <input type="text" className="form-control mb-3" id="name" placeholder="Họ tên" value={name} onChange={(e) => setName(e.target.value)} required />
                <input type="number" className="form-control mb-3" id="phone" placeholder="Số điện thoại" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                <input type="text" className="form-control mb-3" id="company" placeholder="Công ty" value={company} onChange={(e) => setCompany(e.target.value)} />
                <input type="text" className="form-control mb-3" id="address" placeholder="Địa chỉ" value={address} onChange={(e) => setAddress(e.target.value)} required />
                <input type="text" className="form-control mb-3" id="province" placeholder="Tỉnh thành" value={province} onChange={(e) => setProvince(e.target.value)} required />
                <input type="text" className="form-control mb-3" id="district" placeholder="Quận huyện" value={district} onChange={(e) => setDistrict(e.target.value)} required />
                <input type="text" className="form-control mb-3" id="ward" placeholder="Phường xã" value={ward} onChange={(e) => setWard(e.target.value)} required />
                <div>
                  <input type="checkbox" className="form-check-label me-2" id="default" checked={isDefault} onChange={(e) => setIsDefault(e.target.checked)} />
                  <label htmlFor="default">Đặt là địa chỉ mặc định?</label>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={resetForm}>Huỷ</button>
              <button type="button" className="btn btn-primary" onClick={addOrUpdateAddress} data-bs-dismiss="modal">
                {editIndex !== null ? "Cập nhật địa chỉ" : "Thêm địa chỉ"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3 d-flex flex-wrap gap-5">
        {addresses.map((addr, index) => (
          <div key={index} className="card mb-2 p-2 border bg-body-secondary position-relative">
            <button className="bg-danger border-0 rounded-bottom-circle text-white position-absolute top-0 end-0" onClick={() => deleteAddress(index)}>X</button>
            <button className="bg-success border-0 rounded-bottom-circle text-white position-absolute top-0" style={{ right: 30 }} onClick={() => editAddress(index)} data-bs-toggle="modal" data-bs-target="#exampleModal">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pen-fill" viewBox="0 0 16 16">
                <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.168.11l-4 1.5a.5.5 0 0 1-.651-.651l1.5-4a.5.5 0 0 1 .11-.168L11.44 1.854a1.5 1.5 0 0 1 2.059-.059z" />
              </svg>
            </button>
            <div className="container pt-3">
              <p><strong>Họ tên:</strong> {addr.name}</p>
              <p><strong>Số điện thoại:</strong> {addr.phone}</p>
              <p><strong>Công ty:</strong> {addr.company}</p>
              <p><strong>Địa chỉ:</strong> {addr.address}</p>
              <p><strong>Tỉnh thành:</strong> {addr.province}</p>
              <p><strong>Quận huyện:</strong> {addr.district}</p>
              <p><strong>Phường xã:</strong> {addr.ward}</p>
              {addr.isDefault && <p className=" text-primary">Địa chỉ mặc định</p>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SoDiaChi;
