import { useState } from "react";
   function Price() {
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]); // State for selected price ranges

  const handlePriceFilterChange = (value) => {
    setSelectedPriceRanges((prev) => {
      if (prev.includes(value)) {
        return prev.filter((item) => item !== value); // Remove the price range if already selected
      }
      return [...prev, value]; // Add the price range if not selected
    });
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
                    onChange={() => handlePriceFilterChange("(<100000)")}
                  />
                  Dưới 100.000đ
                </label>
              </li>
              <li className="filter-item filter-item--check-box filter-item--green">
                <label>
                  <input
                    type="checkbox"
                    onChange={() =>
                      handlePriceFilterChange("(>=100000 AND <=200000)")
                    }
                  />
                  Từ 100.000đ đến 200.000đ
                </label>
              </li>
              <li className="filter-item filter-item--check-box filter-item--green">
                <label>
                  <input
                    type="checkbox"
                    onChange={() =>
                      handlePriceFilterChange("(>=200000 AND <=300000)")
                    }
                  />
                  Từ 200.000đ đến 300.000đ
                </label>
              </li>
              <li className="filter-item filter-item--check-box filter-item--green">
                <label>
                  <input
                    type="checkbox"
                    onChange={() =>
                      handlePriceFilterChange("(>=300000 AND <=500000)")
                    }
                  />
                  Từ 300.000đ đến 500.000đ
                </label>
              </li>
              <li className="filter-item filter-item--check-box filter-item--green">
                <label>
                  <input
                    type="checkbox"
                    onChange={() =>
                      handlePriceFilterChange("(>=500000 AND <=1000000)")
                    }
                  />
                  Từ 500.000đ đến 1 triệu
                </label>
              </li>
              <li className="filter-item filter-item--check-box filter-item--green">
                <label>
                  <input
                    type="checkbox"
                    onChange={() => handlePriceFilterChange("(>1000000)")}
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
}
export default Price;