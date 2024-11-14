import React, { useState } from 'react';
import './style.css';

interface SortOptionsProps {
  onSortChange: (option: string) => void;
}

const SortOptions: React.FC<SortOptionsProps> = ({ onSortChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>('Mặc định');

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const sortby = (type: string) => {
    setSelectedOption(type);
    setIsOpen(false);
    console.log(`Sắp xếp theo: ${type}`);
    onSortChange(type); 
  };

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
            <li className="btn-quick-sort price-desc">
                <button onClick={() => sortby('Mặc định')} title="Mặc định">
                Mặc định
                </button>
              </li>
              <li className="btn-quick-sort alpha-asc">
                <button onClick={() => sortby('Tên A-Z')} title="Tên A-Z">
                  Tên A-Z
                </button>
              </li>
              <li className="btn-quick-sort alpha-desc">
                <button onClick={() => sortby('Tên Z-A')} title="Tên Z-A">
                  Tên Z-A
                </button>
              </li>
              <li className="btn-quick-sort price-asc">
                <button onClick={() => sortby('Giá tăng dần')} title="Giá tăng dần">
                  Giá tăng dần
                </button>
              </li>
              <li className="btn-quick-sort price-desc">
                <button onClick={() => sortby('Giá giảm dần')} title="Giá giảm dần">
                  Giá giảm dần
                </button>
              </li>
              {/* <li className="btn-quick-sort created-desc">
                <button onClick={() => sortby('Mới nhất')} title="Mới nhất">
                  Mới nhất
                </button>
              </li>
              <li className="btn-quick-sort created-asc">
                <button onClick={() => sortby('Cũ nhất')} title="Cũ nhất">
                  Cũ nhất
                </button>
              </li> */}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SortOptions;
