import React, { useEffect, useState } from 'react';
import { Row, Col, ListGroup } from "react-bootstrap";
import "./news.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import introduceImg from '../../assets/introduce/sidebar_image_blog.webp';
import AutoScrollToTop from '../../utils/AutoScrollToTop';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getAllHotNews, NewsItem } from "./NewsData";  // Import các hàm và kiểu dữ liệu
import { db } from "../../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
const NewsDetail: React.FC = () => {
    const navigate = useNavigate();
    const { filter, id } = useParams<{ filter: string; id: string }>();
    const [stateChange, setStateChange] = useState<string>("")
    const [listHotNews, setListHotNews] = useState<NewsItem[]>([]);
    const [contentDetail, setContentDetail] = useState<NewsItem>()
    const [dbType, setDbType] = useState <"News" | "PressNews" | "RecruitmentNews" | "HotNews">()
    console.log(filter, id)

    useEffect(() => {
        const fetchNews = async () => {
            const hotNews = await getAllHotNews()
            setListHotNews(hotNews)
        };
        // Hàm call content by Id từ Firestore
        const getContentById = async (): Promise<void> => {
            if (!id) return;
            if(filter == "news") setDbType("News")
            if(filter == "press") setDbType("PressNews")
            if(filter == "recruitment") setDbType("RecruitmentNews")
            
            const newRef = doc(db, `${dbType}`, id);
            const newSnap = await getDoc(newRef); // Lấy document từ Firestore          
            const newDetail: NewsItem = {
                id: newSnap.id, // Lấy id của document
                ...newSnap.data(), // Lấy dữ liệu khác
            } as NewsItem;
            setContentDetail(newDetail)
            
        };
        getContentById();
        fetchNews(); // Gọi hàm fetchNews
        setStateChange("id")
    }, [stateChange]);
    
    const handleClick = () => {
        navigate("/news")
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
                                            {/* <li className="mb-2 mt-1" data-value="Press" onClick={handleClick}>Báo chí</li>
                      <li className="mb-2" data-value="Internal" onClick={handleClick}>Tin nội bộ</li>
                      <li data-value="Recruitment" onClick={handleClick}>Tin tuyển dụng</li> */}
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

                {/* Main Content News */}
                <Col sm={12} md={12} lg={9}>
                    <div className='text-muted'>
                         {contentDetail ? (
                            <>
                                <p className='title-content-custom fw-bold h3 mt-3 text-black'>{contentDetail.title}</p>
                                <div className='info d-flex justify-content-between'>
                                <p><i className="fa-solid fa-clock ms-1"></i> Ngày đăng: {contentDetail.date}</p>
                                    <p><i className="fa-solid fa-user"></i> Viết Bởi: {contentDetail.author}</p>       
                                </div>
                                <div
                                    
                                ><p className='content-detail-text'>{contentDetail.content}</p>
                                <img src={contentDetail.img} width={'100%'} className='mt-2'></img></div>
                            </>
                        ) : (
                            <p>Đang tải nội dung...</p>
                        )}
                    </div>

                </Col>
            </Row>

        </div>
    );
};

export default NewsDetail;