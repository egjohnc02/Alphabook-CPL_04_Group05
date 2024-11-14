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
  const newsItems = Array.from({ length: 12 }, (_, index) => `News Item ${index + 1}`);
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
                    <p className="p-0 m-0">Tin tức</p>
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
              <ListGroup.Item className="text-muted">Sự kiện</ListGroup.Item>
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
                      Những thách thức của nhà lãnh đạo: Cẩm nang thực nghiệm trong hành trình lãnh đạo của bạn
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
                      Nhằm trách mua phải hàng giả, bạn đọc có thể tham khảo danh sách đại lý phân phối phối
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
              <button className="page-link">
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