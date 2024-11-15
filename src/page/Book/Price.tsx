import React from "react";

type PriceFilterProps = {
  selectedPriceRange: string;
  handlePriceFilterChange: (range: string) => void;
};

const PriceFilter: React.FC<PriceFilterProps> = ({ selectedPriceRange, handlePriceFilterChange }) => {
  const handleRadioChange = (range: string) => {
    // Nếu đang chọn cùng một khoảng giá thì bỏ chọn
    if (selectedPriceRange === range) {
      handlePriceFilterChange("");  // Bỏ chọn
    } else {
      handlePriceFilterChange(range);  // Chọn khoảng giá mới
    }
  };

  return (
    <div className="filter-content aside-filter">
      <div className="filter-container">
        <aside className="aside-item filter-price">
          <div className="aside-title">
            <h2 className="title-filter title-head margin-top-0">
              <span className="leaf">Theo mức giá</span>
            </h2>
          </div>
          <div className="aside-content margin-top-0 filter-group content_price">
            <ul>
              <li className="filter-item filter-item--check-box filter-item--green">
                <label>
                  <input
                    type="checkbox"
                    onChange={() => handleRadioChange("(<100000)")}
                    checked={selectedPriceRange === "(<100000)"}
                  />
                  Dưới 100.000đ
                </label>
              </li>
              <li className="filter-item filter-item--check-box filter-item--green">
                <label>
                  <input
                    type="checkbox"
                    onChange={() => handleRadioChange("(>=100000 AND <=200000)")}
                    checked={selectedPriceRange === "(>=100000 AND <=200000)"}
                  />
                  Từ 100.000đ đến 200.000đ
                </label>
              </li>
              <li className="filter-item filter-item--check-box filter-item--green">
                <label>
                  <input
                    type="checkbox"
                    onChange={() => handleRadioChange("(>=200000 AND <=300000)")}
                    checked={selectedPriceRange === "(>=200000 AND <=300000)"}
                  />
                  Từ 200.000đ đến 300.000đ
                </label>
              </li>
              <li className="filter-item filter-item--check-box filter-item--green">
                <label>
                  <input
                    type="checkbox"
                    onChange={() => handleRadioChange("(>=300000 AND <=500000)")}
                    checked={selectedPriceRange === "(>=300000 AND <=500000)"}
                  />
                  Từ 300.000đ đến 500.000đ
                </label>
              </li>
              <li className="filter-item filter-item--check-box filter-item--green">
                <label>
                  <input
                    type="checkbox"
                    onChange={() => handleRadioChange("(>=500000 AND <=1000000)")}
                    checked={selectedPriceRange === "(>=500000 AND <=1000000)"}
                  />
                  Từ 500.000đ đến 1 triệu
                </label>
              </li>
              <li className="filter-item filter-item--check-box filter-item--green">
                <label>
                  <input
                    type="checkbox"
                    onChange={() => handleRadioChange("(>1000000)")}
                    checked={selectedPriceRange === "(>1000000)"}
                  />
                  Trên 1 triệu
                </label>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default PriceFilter;
