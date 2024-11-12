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

  const addAddress = async () => {
    const user = auth.currentUser;
    if (!user) {
      console.error("No user is logged in.");
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
      isDefault
    };
  
    try {
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        const data = userDoc.data();
        const existingAddresses = data.addresses || [];
  
        let updatedAddresses = [...existingAddresses];
        if (isDefault) {
          updatedAddresses = updatedAddresses.map((addr) => {
            if (addr.isDefault) {
              return { ...addr, isDefault: false };
            }
            return addr;
          });
        }
        updatedAddresses.push(newAddress);
        await updateDoc(userRef, {
          addresses: updatedAddresses
        });
        setAddresses(updatedAddresses);
        setName("");
        setPhone("");
        setCompany("");
        setAddress("");
        setProvince("");
        setDistrict("");
        setWard("");
        setIsDefault(false);
      }
    } catch (e) {
      window.alert("Error adding address: " + e);
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
  

  return (
    <div>
      <p className="fs-4">Địa chỉ của bạn</p>
      <button type="button" className="btn bg-orange text-white" data-bs-toggle="modal" data-bs-target="#exampleModal">Thêm địa chỉ</button>

      <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Thêm địa chỉ mới</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <input 
                    type="text" 
                    className="form-control" 
                    id="name" 
                    placeholder="Họ tên" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    required
                  />
                </div>
                <div className="mb-3">
                  <input 
                    type="number" 
                    className="form-control" 
                    id="phone" 
                    placeholder="Số điện thoại" 
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)} 
                    required />
                </div>
                <div className="mb-3">
                  <input 
                    type="text" 
                    className="form-control" 
                    id="company" 
                    placeholder="Công ty" 
                    value={company} 
                    onChange={(e) => setCompany(e.target.value)} 
                    required />
                </div>
                <div className="mb-3">
                  <input 
                    type="text" 
                    className="form-control" 
                    id="address" 
                    placeholder="Địa chỉ" 
                    value={address} 
                    onChange={(e) => setAddress(e.target.value)} 
                    required />
                </div>
                <div className="mb-3">
                  <input 
                    type="text" 
                    className="form-control" 
                    id="province" 
                    placeholder="Tỉnh thành" 
                    value={province} 
                    onChange={(e) => setProvince(e.target.value)} 
                    required 
                    />
                </div>
                <div className="mb-3">
                  <input 
                    type="text" 
                    className="form-control" 
                    id="district" 
                    placeholder="Quận huyện" 
                    value={district} 
                    onChange={(e) => setDistrict(e.target.value)} 
                    required 
                  />
                </div>
                <div className="mb-3">
                  <input 
                    type="text" 
                    className="form-control" 
                    id="ward" 
                    placeholder="Phường xã" 
                    value={ward} 
                    onChange={(e) => setWard(e.target.value)} 
                    required 
                  />
                </div>
                <div>
                  <input type="checkbox" className="form-check-label me-2" id="default" checked={isDefault} 
                    onChange={(e) => setIsDefault(e.target.checked)} 
                    required 
                  />
                  <label htmlFor="default">Đặt là địa chỉ mặc định?</label>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Huỷ</button>
              <button type="button" className="btn btn-primary" onClick={addAddress} data-bs-dismiss="modal">Thêm địa chỉ</button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3">
        {addresses.map((addr, index) => (
          <div key={index} className="card mb-2 p-2 border bg-body-secondary position-relative">
            <button
              className="bg-danger border-0 rounded-bottom-circle text-white position-absolute top-0 end-0"
              onClick={() => deleteAddress(index)}
            >
              X
            </button>
            <p><strong>Họ tên:</strong> {addr.name}</p>
            <p><strong>Số điện thoại:</strong> {addr.phone}</p>
            <p><strong>Địa chỉ:</strong> {addr.address}, {addr.ward}, {addr.district}, {addr.province}</p>
            <p><strong>Công ty:</strong> {addr.company}</p>
            {addr.isDefault && <p><strong className="text-success">Địa chỉ mặc định</strong></p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SoDiaChi;