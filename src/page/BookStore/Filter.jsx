function Filter() {
  return (
    <div className="sortPagiBar">
      <div className="sort-cate clearfix">
        <div className="sort-cate-left">
          <span>
            Sắp xếp: <em>Mặc định</em>
          </span>
          <ul>
            <li
              className="btn-quick-sort alpha-asc"
              onClick={() => sortby("alpha-asc")}
              title="Tên A-Z"
            >
              <i></i>Tên A-Z
            </li>
            <li
              className="btn-quick-sort alpha-desc"
              onClick={() => sortby("alpha-desc")}
              title="Tên Z-A"
            >
              <i></i>Tên Z-A
            </li>
            <li
              className="btn-quick-sort price-asc"
              onClick={() => sortby("price-asc")}
              title="Giá thấp đến cao"
            >
              <i></i>Giá tăng dần
            </li>
            <li
              className="btn-quick-sort price-desc"
              onClick={() => sortby("price-desc")}
              title="Giá cao xuống thấp"
            >
              <i></i>Giá giảm dần
            </li>
            <li
              className="btn-quick-sort created-desc"
              onClick={() => sortby("created-desc")}
              title="Mới nhất"
            >
              <i></i>Mới nhất
            </li>
            <li
              className="btn-quick-sort created-asc"
              onClick={() => sortby("created-asc")}
              title="Cũ nhất"
            >
              <i></i>Cũ nhất
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
export default Filter;