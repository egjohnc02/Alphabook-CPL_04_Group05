import React, { useState, useEffect } from "react";
import { auth, db } from "../../../../firebase/firebase";
import { doc, updateDoc, getDoc } from "firebase/firestore";

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

  const addOrUpdateAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = auth.currentUser;
    if (!user) {
      console.error("User is not logged in.");
      return;
    }

    const userRef = doc(db, "Users", user.uid);
    const newAddress: Address = {
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
        let updatedAddresses = [...addresses];

        if (isDefault) {
          updatedAddresses = updatedAddresses.map((addr) => ({
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
        const modal = document.querySelector('[data-bs-dismiss="modal"]') as HTMLElement;
        if (modal) modal.click();
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const deleteAddress = async (index: number) => {
    const user = auth.currentUser;
    if (!user) {
      console.error("User is not logged in.");
      return;
    }

    const userRef = doc(db, "Users", user.uid);
    const updatedAddresses = addresses.filter((_, idx) => idx !== index);

    try {
      await updateDoc(userRef, {
        addresses: updatedAddresses,
      });
      setAddresses(updatedAddresses);
    } catch (error) {
      console.error("Error deleting address:", error);
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

  const formatAddress = (addr: Address) => {
    return `${addr.address}, ${addr.ward}, ${addr.district}, ${addr.province}`;
  };

  return (
    <div className="container my-4">
      <h2>Địa chỉ của bạn</h2>
      <p className="text-danger small fst-italic">* Hãy để địa chỉ là mặc định nếu bạn muốn ship đến đó!</p>
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
              <form onSubmit={addOrUpdateAddress}>
                <input type="text" className="form-control mb-3" placeholder="Họ tên" value={name} onChange={(e) => setName(e.target.value)} required/>
                <input type="number" className="form-control mb-3" placeholder="Số điện thoại" value={phone} onChange={(e) => setPhone(e.target.value)} required/>
                <input type="text" className="form-control mb-3" placeholder="Công ty" value={company} onChange={(e) => setCompany(e.target.value)}/>
                <input type="text" className="form-control mb-3" placeholder="Địa chỉ" value={address} onChange={(e) => setAddress(e.target.value)} required/>
                <input type="text" className="form-control mb-3" placeholder="Tỉnh thành" value={province} onChange={(e) => setProvince(e.target.value)} required/>
                <input type="text" className="form-control mb-3" placeholder="Quận huyện" value={district} onChange={(e) => setDistrict(e.target.value)} required/>
                <input type="text" className="form-control mb-3" placeholder="Phường xã" value={ward} onChange={(e) => setWard(e.target.value)} required/>
                <div>
                  <input type="checkbox" className="form-check-input me-2" id="set-addr-default" checked={isDefault} onChange={(e) => setIsDefault(e.target.checked)}/>
                  <label className="form-check-label" htmlFor="set-addr-default">Đặt làm địa chỉ mặc định</label>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                    Hủy
                  </button>
                  <button type="submit" className="btn btn-primary">
                    {editIndex !== null ? "Cập nhật địa chỉ" : "Thêm địa chỉ"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3 d-flex flex-wrap gap-3">
        {addresses.map((addr, index) => (
          <div key={index} className="card p-3 border rounded-3 bg-body-secondary position-relative">
            <p><strong>Họ tên:</strong> {addr.name}</p>
            <p><strong>Số điện thoại:</strong> {addr.phone}</p>
            <p><strong>Địa chỉ:</strong> {formatAddress(addr)}</p>
            <div className="position-absolute top-0 end-0">
              <button className="btn btn-danger mx-2" onClick={() => deleteAddress(index)}>
                X
              </button>
              <button className="btn btn-primary" onClick={() => editAddress(index)} data-bs-toggle="modal" data-bs-target="#exampleModal">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pen-fill" viewBox="0 0 16 16">
                  <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001"/>
                </svg>
              </button>
            </div>
            {addr.isDefault && (
              <p className="text-primary fw-bold">Địa chỉ mặc định</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SoDiaChi;