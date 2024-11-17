import React, { useState } from 'react';
import './style.css';

interface SortOptionsProps {
  onSortOptionChange: (option: string) => void; // Hàm nhận vào một chuỗi
}

const SortOptions: React.FC<SortOptionsProps> = ({ onSortOptionChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>('Mặc định'); // State lưu lựa chọn hiện tại

  // Hàm toggle dropdown menu
  const toggleDropdown = () => setIsOpen(!isOpen);

  // Hàm xử lý khi người dùng chọn một tùy chọn
  const handleSortSelection = (option: string) => {
    setSelectedOption(option); // Cập nhật lựa chọn
    setIsOpen(false); // Đóng dropdown
    onSortOptionChange(option); // Thông báo cho parent component về lựa chọn mới
  };

  // Các tùy chọn sắp xếp
  const sortOptions = [
    { label: 'Mặc định', value: 'Mặc định' },
    { label: 'Tên A-Z', value: 'Tên A-Z' },
    { label: 'Tên Z-A', value: 'Tên Z-A' },
    { label: 'Giá tăng dần', value: 'Giá tăng dần' },
    { label: 'Giá giảm dần', value: 'Giá giảm dần' }
    // { label: 'Mới nhất', value: 'Mới nhất' },
    // { label: 'Cũ nhất', value: 'Cũ nhất' },
  ];

  return (
    <div className="wrap-srt-title">
      <h1 className="title-module d-none">Tất cả sản phẩm</h1>
      <div className="sortPagiBar">
        <div className="sort-cate clearfix">
          <div className="sort-cate-left">
            <span>
              Sắp xếp: <em onClick={toggleDropdown}>{selectedOption}</em>
            </span>
            <ul className={isOpen ? 'open' : ''}>
              {sortOptions.map((option) => (
                <li key={option.value} className="btn-quick-sort">
                  <button onClick={() => handleSortSelection(option.value)} title={option.label}>
                    {option.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SortOptions;
