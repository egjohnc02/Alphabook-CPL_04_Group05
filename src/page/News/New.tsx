import React, { useEffect, useState } from 'react';
import { Row, Col, Card, ListGroup } from "react-bootstrap";
import "./news.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import introduceImg from '../../assets/introduce/sidebar_image_blog.webp';
import AutoScrollToTop from '../../utils/AutoScrollToTop';
import { useParams, useLocation  } from "react-router-dom";
import { Link } from 'react-router-dom';
import { getAllNews, getAllHotNews, NewsItem, HotNewsItem, getAllPressNews, getAllRecruitmentNews, getAllInternalNews, getAllEventNews } from "./NewsData";  // Import các hàm và kiểu dữ liệu
const New: React.FC = () => {
  type FilterType = "News" | "Press" | "Internal" | "Recruitment" | "Event";
  const [filter, setFilter] = useState<FilterType>("News");
  const [listNews, setListNews] = useState<NewsItem[]>([]);
  const [listHotNews, setListHotNews] = useState<HotNewsItem[]>([]);
  const [totalPage, setTotalPage] = useState<number>(0)
  const { page } = useParams<{ page: string }>();
  const [currentPage, setCurrentPage] = useState<number>(page == null ? 1 : parseInt(page, 10));
  // Lấy thông tin URL hiện tại
  const location = useLocation();
  // Tạo đối tượng URLSearchParams từ query string (location.search)
  const queryParams = new URLSearchParams(location.search);
  // Lấy giá trị của tham số 'event'
  const event = queryParams.get('event');  // event sẽ có giá trị 'true' nếu tồn tại

   // Gọi hàm getAllNews khi component render
   useEffect(() => {
    const fetchNews = async () => {
      let news = await getAllNews(); 
      const hotNews = await getAllHotNews()
      if(event){
        news = await getAllEventNews();
      }
      setListNews(news); // Cập nhật listNews với dữ liệu nhận được
      setListHotNews(hotNews)
      const totalPageTest = Math.ceil(news.length / 9); // Sử dụng Math.ceil để làm tròn lên
      setTotalPage(totalPageTest);
    };
    
    fetchNews(); // Gọi hàm fetchNews
  }, []);


  const filterNew = listNews.slice(
    (currentPage - 1) * 9, 
    Math.min(currentPage * 9, listNews.length) // Đảm bảo không vượt quá độ dài mảng
  );
  
  useEffect(() => {
    const fetchNewsFilter = async () => {
      let news: NewsItem[] = []; // Định nghĩa kiểu dữ liệu cho news
      if (filter === "Internal") {
        news = await getAllInternalNews();
      }
      if (filter === "Press") {
        news = await getAllPressNews();
      }
      if (filter === "Recruitment") {
        news = await getAllRecruitmentNews();
      }
      if (filter ==="News"){
        news = await getAllNews()
      }
      if (filter === "Event"){
        news = await getAllEventNews()
      }
      setListNews(news);
      const hotNews = await getAllHotNews();
      setListHotNews(hotNews);

      const totalPageTest = Math.ceil(news.length / 9); // Sử dụng Math.ceil để làm tròn lên
      setTotalPage(totalPageTest);
    };
    fetchNewsFilter(); // Gọi hàm fetchNews

  }, [filter]);
  const handleClick = (e: React.MouseEvent<HTMLLIElement>) => {
    const value = e.currentTarget.getAttribute("data-value") as FilterType;
    if (value) setFilter(value);
  };

  const handleChangePage = (e: React.MouseEvent<HTMLButtonElement>) => {
    const page = parseInt(e.currentTarget.value); // Ép kiểu sang number nếu cần
    setCurrentPage(page)
  };
  AutoScrollToTop();
  return (
    <div className="Container container-sm container-md container-lg">
      <Row className="mt-3">
        <Col sm={12} md={12} lg={3}>
          <Row className="navigate-news me-3">
            <ListGroup>
              <ListGroup.Item className="h6 fw-bold" disabled>
                Danh mục tin
              </ListGroup.Item>
              <ListGroup.Item className="text-muted">
                <div className="dropDown-custom">
                  <div className="text-active-dropDown d-flex justify-content-between">
                    <p className="p-0 m-0"><li className="list-unstyled" data-value="News" onClick={handleClick}>Tin tức</li></p>
                  </div>
                  <div className="dropDown-menu-custom">
                    <ul className="list-unstyled ms-3">
                      <li className="mb-2 mt-1" data-value="Press" onClick={handleClick}>Báo chí</li>
                      <li className="mb-2" data-value="Internal" onClick={handleClick}>Tin nội bộ</li>
                      <li data-value="Recruitment" onClick={handleClick}>Tin tuyển dụng</li>
                    </ul>
                  </div>
                </div>
              </ListGroup.Item>
              <Link to='/event'>
                <ListGroup.Item className="text-muted" data-value="Event" onClick={handleClick}>Sự kiện</ListGroup.Item>
              </Link>
            </ListGroup>
          </Row>
          <Row className="hot-news me-3 mt-3">
            <ListGroup>
              <ListGroup.Item className="h6 fw-bold" disabled>
                Tin nổi bật
              </ListGroup.Item>
              {listHotNews.map((value, key) => (
                <ListGroup.Item key={key} className='m-0 p-0 px-2'>
                  <div className="content-hot-news mb-1">
                    <img src={value.img} alt="img-hot-news" />
                    <p className="title-hot-new fw-bold ps-2 hover-text-orange">
                      {value.title}
                    </p>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Row>
          <Row className="news-poster-sider-bar p-0 mt-3 me-3 mb-3">
            <div className="p-0 d-flex justify-content-center">
              <img src={introduceImg} alt="sidebar" />
            </div>
          </Row>
        </Col>

        {/* Main News Section */}
        <Col sm={12} md={12} lg={9}>
          <Row>
            <div className='d-flex pb-2'>
              {filter === "News" && (
                <>
                  <p className='h5 p-0 m-0 pe-1'>{filter}</p>
                  <p className='p-0 m-0 pt-1'>(Total {filter}: {listNews.length})</p>
                </>
              )}
              {filter !== "News" && (
                <>
                  <p className='h5 p-0 m-0 pe-1'>{filter} News</p>
                  <p className='p-0 m-0 pt-1'>(Total {filter} News: {listNews.length})</p>
                </>
              )}
            </div>
            {filterNew.map((value, key) => (
              <Col key={key} sm={12} md={6} lg={4} xl={4} className="mb-4">
                <Card>
                  <div className="card-img-container" style={{ overflow: "hidden" }}>
                    <Card.Img className="card-img" variant="top" src={value.img} />
                  </div>
                  <Card.Body className="p-0">
                    <Card.Title className="fs-5 pt-1">
                      <a href="#" className="text-decoration-none hover-text-orange">
                        {value.title}
                      </a>
                    </Card.Title>
                    <Card.Text className="text-muted fs-6">
                    {value.content}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>

      <Row className="Pagination-news">
        <div className="pagenav">
          <ul className="pagination-custom list-unstyled">
            <li className="page-item">
              <button className="page-link mx-auto" disabled>
                <i className="fa-solid fa-angle-left"></i>
              </button>
            </li>
            {Array.from({ length: totalPage }, (_, i) => (
              i == 3 ?(
                <li className="page-item">
                <button className="page-link mx-auto" disabled>
                  ...
                </button>
              </li>
              ) : (
              <li key={i}  className={`page-item ${currentPage == (i + 1) ? 'actived' : ''}`} >
              <button className="page-link mx-auto" value={i+1}onClick={(e) => handleChangePage(e)}>{i + 1}</button>
              </li>
            )))}
            <li className="page-item">
              <button className="page-link mx-auto">
                <i className="fa-solid fa-angle-right"></i>
              </button>
            </li>
          </ul>
        </div>
      </Row>
    </div>
  );
};

export default New;