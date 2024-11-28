import React, { useEffect, useState } from 'react';
import { Button, Container, Modal, Nav, Table } from 'react-bootstrap';
import "./NewsManagement.css"
import { getAllNews, NewsItem, getAllPressNews, getAllRecruitmentNews, getAllInternalNews } from "../../../page/News/NewsData";

import {db} from "../../../firebase/firebase"
import { deleteDoc, doc, getDoc } from "firebase/firestore";

interface ContentDetail {
    id: string;
    title: string;
    author:string;
    date:string;
    content:string;
}
const NewsManagement = () => {
    type FilterType = "News" | "Press" | "Internal" | "Recruitment" | "Event";
    const [filter, setFilter] = useState<FilterType>("News");
    const [listNews, setListNews] = useState<NewsItem[]>([]);
    
//=================== Get data
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
        if (filter === "News") {
            news = await getAllNews()
        }
        setListNews(news);
    };
    fetchNewsFilter(); // Gọi hàm fetchNews

}, [filter]);

const handleClickNavs = (e: React.MouseEvent<HTMLLIElement>) => {
    const value = e.currentTarget.getAttribute("data-value") as FilterType;
    if (value) setFilter(value);
};

//=================== Xử lý pop-up detail
    const [showDetail, setShowDetail] = useState(false);
    const handleCloseDetail = () => setShowDetail(false);
    const handleShow = () => setShowDetail(true);

    // Xử lý click show pop up và set id
        const handleNewsDetail = (e: React.MouseEvent<HTMLButtonElement>) => {
            const value = e.currentTarget.getAttribute("value-id");
            if (value) {
              console.log(value)
              setId(value)
            }
        handleShow();
      }
    // Xử lý contentdatail 
    const [id, setId] = useState("")
    const [contentDetail, setContentDetail] =useState<ContentDetail>()
    const regexParagraph = /<p>(.*?)<\/p>/g;
    const regexImage = /<img>(.*?)<\/img>/g;

    // Hàm này xử lý nội dung và thay thế thẻ <img> và <p>
    const parseContent = (content: string) => {
        // Thay thế các thẻ <img> thành thẻ <img src="URL" />
        const replacedImages = content.replace(regexImage, (_match, url) => `<img src="${url}" alt="Image" style="width: 100%" class="img-content mb-3"/> `);
        // Thay thế các thẻ <p> bằng các thẻ <p> HTML bình thường
        const replacedParagraphs = replacedImages.replace(regexParagraph, (_match, text) => `<p>${text}</p>`);
        return replacedParagraphs;
        // Hàm xử lý click detail  
    };

    // Hàm lấy content id
    useEffect(() => {
        const getContentById = async (): Promise<void> => {
            if (!id) return;
    
            const newRef = doc(db, "ContentNewDetail", id);
            const newSnap = await getDoc(newRef);
    
            if (newSnap.exists()) {
                const contentDetail = newSnap.data() as ContentDetail;
                setContentDetail(contentDetail);
            } else {
                console.log("No such document!");
            }
        };
        getContentById(); // Gọi lại mỗi khi `id` thay đổi
    }, [id])


// =======================Hàm xóa tài liệu theo id
    const deleteContentById = async (id: string): Promise<void> => {
    if (!id)  return;
    console.log(id)
    try {
        // Tạo tham chiếu đến tài liệu cần xóa
        const docRef = doc(db, "ContentNewDetail", "test");
        
        let docRef1 = doc(db, filter, "test")
        if(filter == "Press") docRef1 = doc(db, "PressNews", "test")
        if(filter == "Recruitment") docRef1 = doc(db, "RecruitmentNews", "test")
        // Thực hiện xóa tài liệu
        await deleteDoc(docRef);
        await deleteDoc(docRef1)
    } catch (error) {
        // Log lỗi nếu có
        console.error("Lỗi khi xóa tài liệu: ", error);
    }
};

// ==================== Xử lý add 
    const [date, setDate] = useState("")
    const [author, setAuthor] = useState("")
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    // xử lý pop-up
    const [showAdd, setShowAdd] = useState(false);
    const handleCloseAdd = () => setShowAdd(false);
    const handleShowAdd = () => setShowAdd(true);

    //Xu ly click pop up 
    const handleAddNews = () =>{
        handleShowAdd()
    }
    return (
        <>
            <div className='navs d-flex justify-content-between'>
                <Nav variant="tabs" defaultActiveKey="link-0">
                    <Nav.Item>
                        <Nav.Link eventKey="link-0" data-value="News" onClick={handleClickNavs}>Tin tức</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="link-1" data-value="Press" onClick={handleClickNavs}>Báo chí</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="link-3" data-value="Recruitment" onClick={handleClickNavs}>Tin tuyển dụng</Nav.Link>
                    </Nav.Item>
                </Nav>
                <Button variant="outline-danger" onClick={handleAddNews}>Add</Button>
            </div>
            <div className='display-content mt-3'>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#id</th>
                            <th>Img</th>
                            <th>Title</th>
                            <th>Content (Shortent)</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listNews.map((item, key) => (
                            <tr>
                                <td>{item.id}</td>
                                <td><img src={item.img} alt="" height={'auto'} width={'200px'}></img></td>
                                <td className='fw-bold' style={{ width: '200px' }}>{item.title}</td>
                                <td className='content-customer' style={{ width: '300px' }}>{item.content}</td>
                                <td>
                                    <div className='d-flex align-items-center' style={{ height: '112px' }}>
                                        <i className="fa-solid fa-eye px-2 fa-lg" value-id={item.id} onClick={handleNewsDetail}></i>
                                        <i className="fa-solid fa-pen-to-square fa-lg px-2"></i>
                                        <i className="fa-solid fa-trash-can fa-lg px-2" value-id={item.id} onClick={(e) =>{
                                            const id = e.currentTarget.getAttribute("value-id");
                                            if(id) deleteContentById(id)
                                            console.log(id)
                                        }}></i>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
                        {/* Modal show detai */}
            <Modal show={showDetail} onHide={handleCloseDetail} fullscreen={true}>
                <Modal.Header closeButton>
                <Modal.Title>News Detail</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                {contentDetail ? (
                            <Container>
                                <p className='title-content-custom fw-bold h3 mt-3 text-black'>{contentDetail.title}</p>
                                <div className='info d-flex justify-content-between'>
                                <p><i className="fa-solid fa-clock ms-1"></i> Ngày đăng: {contentDetail.date}</p>
                                    <p><i className="fa-solid fa-user"></i> Viết Bởi: {contentDetail.author}</p>       
                                </div>
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: parseContent(contentDetail.content),
                                    }}
                                ></div>
                            </Container>
                        ) : (
                            <p>Đang tải nội dung...</p>
                        )}
                </Modal.Body>
                <Modal.Footer>                   
                </Modal.Footer>
            </Modal>
                            {/* Modal add */}
            <Modal show={showAdd} onHide={handleCloseAdd} className='modal-add' dialogClassName="modal-90w">
                <Modal.Header closeButton>
                <Modal.Title>News Detail</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <p>
            Ipsum molestiae natus adipisci modi eligendi? Debitis amet quae unde
            commodi aspernatur enim, consectetur. Cumque deleniti temporibus
            ipsam atque a dolores quisquam quisquam adipisci possimus
            laboriosam. Quibusdam facilis doloribus debitis! Sit quasi quod
            accusamus eos quod. Ab quos consequuntur eaque quo rem! Mollitia
            reiciendis porro quo magni incidunt dolore amet atque facilis ipsum
            deleniti rem!
          </p>
                </Modal.Body>
                <Modal.Footer>                   
                </Modal.Footer>
            </Modal>
            
        </>
    );
}

export default NewsManagement;
