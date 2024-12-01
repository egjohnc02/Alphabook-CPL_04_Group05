import React, { useEffect, useState } from 'react';
import { Button, Container, Modal, Nav, Table, Form } from 'react-bootstrap';
import "./NewsManagement.css"
import { getAllNews, NewsItem, getAllPressNews, getAllRecruitmentNews, getAllInternalNews } from "../../../page/News/NewsData";

import { db } from "../../../firebase/firebase"
import { addDoc, collection, deleteDoc, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

const NewsManagement = () => {
    type FilterType = "News" | "Press" | "Internal" | "Recruitment" | "Event";
    const [filter, setFilter] = useState<FilterType>("News"); // navs
    const [listNews, setListNews] = useState<NewsItem[]>([]); // list new
    const [totalPage, setTotalPage] = useState<number>(0)
    const [currentPage, setCurrentPage] = useState<number>(1);
    // detail
    
    const [contentDetail, setContentDetail] = useState<NewsItem>()
    const [dbType, setDbType] = useState <"News" | "PressNews" | "RecruitmentNews" | "HotNews">("News")
    // const [contentDetail, setContentDetail] = useState<NewsItem>()

    //=================== Get data
    useEffect(() => {
        const fetchNewsFilter = async () => {
            let news: NewsItem[] = []; 
            if (filter === "Press") {
                news = await getAllPressNews();
                setDbType("PressNews")
            }
            if (filter === "Recruitment") {
                news = await getAllRecruitmentNews();
                setDbType("RecruitmentNews")
            }
            if (filter === "News") {
                news = await getAllNews()
                setDbType("News")
            }
            setListNews(news);
            const totalPageTest = Math.ceil(news.length / 9);
            setTotalPage(totalPageTest);
            console.log(news)
        };
        fetchNewsFilter(); 

    }, [filter]);

    const handleClickNavs = (e: React.MouseEvent<HTMLLIElement>) => {
        const value = e.currentTarget.getAttribute("data-value") as FilterType;
        if (value) setFilter(value);
    };
    const handleChangePage = (e: React.MouseEvent<HTMLButtonElement>) => {
        const page = parseInt(e.currentTarget.value);
        setCurrentPage(page)
    };
    const filterListByPage = listNews.slice(
        (currentPage - 1) * 9,
        Math.min(currentPage * 9, listNews.length) 
    );
//=========================== View Detail ==================================================
    const [showDetail, setShowDetail] = useState(false);
    const handleCloseDetail = () => setShowDetail(false);
    const handleShow = () => setShowDetail(true);
        // Xử lý click show pop up và set id
        const handleNewsDetail = (e: React.MouseEvent<HTMLButtonElement>) => {
            const value = e.currentTarget.getAttribute("value-id");
            
        handleShow();
        // Hàm call content by Id từ Firestore
        const getContentById = async (): Promise<void> => {
            // if(filter == "News") setDbType("News")
            // if(filter == "Press") setDbType("PressNews")
            // if(filter == "Recruitment") setDbType("RecruitmentNews")
            
            const newRef = doc(db, `${dbType}`, `${value}`);
            const newSnap = await getDoc(newRef); // Lấy document từ Firestore          
            const newDetail: NewsItem = {
                id: newSnap.id, // Lấy id của document
                ...newSnap.data(), // Lấy dữ liệu khác
            } as NewsItem;
            setContentDetail(newDetail)
            console.log(newDetail)
            
        };
        getContentById();
    }

//===================== Xoa theo id =========================== 
const handleDeleteById = (e: React.MouseEvent<HTMLButtonElement>) => {
    const value = e.currentTarget.getAttribute("value-id");
    if (!value) {
      console.error("value-id is missing");
      return;
    }
    const deleteContentById = async (): Promise<void> => {
      try {
        const docRef = doc(db, `${dbType}`, `${value}`);
        // Thực hiện xóa document
        await deleteDoc(docRef);
        setListNews((prev) => prev.filter((item) => item.id !== value));
      } catch (err) {
        console.error("Error deleting document:", err);
      }
    };
    deleteContentById();
  };
// =======================Add 1 new ==========================
    // biến luu thong tin
    const [addNews, setAddNews] = useState({
        title: "", 
        img: "", 
        content: "", 
        date: "", 
        author: "",
      })
    // xử lý pop-up
    const [showAdd, setShowAdd] = useState(false);
    const [idshowAdd, setIdShowAdd] = useState("")
    const handleCloseAdd = () => setShowAdd(false);
    const handleShowAdd = () => setShowAdd(true);
    //Xu ly click pop up 
    const handleAddNews = () =>{
        handleShowAdd()
    }
    const handleInputAdd = (e: React.ChangeEvent<HTMLInputElement>) =>{
        const {value, name} = e.target;
        setAddNews({...addNews, [name] : value.toString()});    
    }
    const handleSubmitAddNew = () =>{
        console.log("addNew",addNews)
        console.log("dbtype",dbType)
        console.log("id0",idshowAdd)
        let input = ""
        let dbAdd = ""
        const handleCreateId = () => {
            let inputId = ""
            if (dbType == "News"){
                inputId = "newId"; 
                dbAdd="News";
            } 
            if (dbType == "HotNews"){ 
                inputId = "hnId"; 
                dbAdd="HotNews";
            }
            if (dbType =="PressNews"){
                 inputId = "pnId"; 
                 dbAdd="PressNews";
            }
            if (dbType == "RecruitmentNews"){
                 inputId = "rnId"; 
                 dbAdd="RecruitmentNews";
            }
            const idNext = listNews.length + 1
            input = inputId + idNext
            console.log("id1",input)
            setIdShowAdd(input)
            console.log("id2",input)
        }
        const addToDb = async () =>{
            try{
                const newRef = collection(db, dbAdd);
                await setDoc(doc(newRef, input), addNews); // Tạo document với ID cụ thể
                console.log("success")
            }catch(e) {
                console.log(e)
            }
        }
        handleCreateId()
        addToDb();
        listNews.unshift({...addNews, "id": input})
        setAddNews({
            title: "", 
            img: "", 
            content: "", 
            date: "", 
            author: "",
          })
          handleCloseAdd()
    }
//======================= Xử lý edit
    // xử lý pop-up
    const [updateNew, setUpdateNew] = useState({
        title: "", 
        img: "", 
        content: "", 
        date: "", 
        author: "",
      })
      const [idUpdate, setIdUpdate] = useState<string | null>("") // id - for news item id
    const [showEdit, setShowEdit] = useState(false);
    const handleCloseEdit = () => setShowEdit(false);
    const handleShowEdit = () => setShowEdit(true);

    //Xy lý edit 
    const handleInputEdit = (e: React.ChangeEvent<HTMLInputElement>) =>{
        const {value, name} = e.target;
        setUpdateNew({...updateNew, [name] : value.toString()});    
    }
    //Xu ly click pop up 
    const handleEditNews = (e: React.MouseEvent<HTMLButtonElement>) =>{
        handleShowEdit()
        const value = e.currentTarget.getAttribute("value-id");
        setIdUpdate(value)
        // Hàm call content by Id từ Firestore
        const getContentById = async (): Promise<void> => {
            
            const newRef = doc(db, `${dbType}`, `${value}`);
            const newSnap = await getDoc(newRef); // Lấy document từ Firestore          
            const newDetail: NewsItem = {            
                ...newSnap.data(), // Lấy dữ liệu khác
            } as NewsItem;          
            setUpdateNew(newDetail)
            console.log(newDetail)        
        };
        getContentById()
    }
        // update to bd
        const updateSubmit = () =>{
            const upDateNewToDb = async () =>{
                const newsDoc = doc(db, `${dbType}`, `${idUpdate}`);
                await updateDoc(newsDoc, updateNew)
                setListNews( listNews.map((news) => 
                    news.id === idUpdate ? { ...news, ...updateNew } : news
            )) 
        }
        upDateNewToDb();
        setUpdateNew({
            title: "", 
            img: "", 
            content: "", 
            date: "", 
            author: "",
          })
        handleCloseEdit()
    }


    return (
        <>
            <p className='h3'>Danh sách tin tức</p>
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
                <Button variant="outline-success" onClick={handleAddNews}>Tạo tin tức</Button>
            </div>
            <div className='display-content mt-3'>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#id</th>
                            <th>Tiêu đề </th>
                            <th>Nội dung</th>
                            <th>Ngày</th>
                            <th>Hình ảnh</th>
                            <th>Công cụ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filterListByPage.map((item, key) => (
                            <tr>
                                <td>{item.id}</td>
                                <td>{item.title}</td>
                                <td>
                                    <div className='content-item-detail'>
                                        <p>{item.content}</p>
                                    </div>
                                </td>
                                <td>{item.date}</td>
                                <td><div style={{ width: "100px", aspectRatio: "4 / 3", overflow: "hidden" }}>
                                    <img
                                        src={item.img}
                                        alt=""
                                        style={{
                                            width: "100%",
                                            height: "100%",
                                            objectFit: "cover",
                                        }}
                                    />
                                </div></td>
                                <td>
                                    <div className='container-item'>
                                        <div className='d-flex justify-content-center align-items-center' style={{ height: '80px' }}>
                                            <i className="fa-solid fa-eye px-2 fa-lg" value-id={item.id} onClick={handleNewsDetail}></i>
                                            <i className="fa-solid fa-pen-to-square fa-lg px-2" value-id={item.id} onClick={handleEditNews}></i>
                                            <i className="fa-solid fa-trash-can fa-lg px-2" value-id={item.id} onClick={handleDeleteById}></i>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
            <div className="Pagination-news">
                <div className="pagenav">
                    <ul className="pagination-custom list-unstyled">
                        <li className="page-item">
                            <button className="page-link mx-auto" disabled>
                                <i className="fa-solid fa-angle-left"></i>
                            </button>
                        </li>
                        {Array.from({ length: totalPage }, (_, i) => (
                            i == 3 ? (
                                <li className="page-item">
                                    <button className="page-link mx-auto" disabled>
                                        ...
                                    </button>
                                </li>
                            ) : (
                                <li key={i} className={`page-item ${currentPage == (i + 1) ? 'actived' : ''}`} >
                                    <button className="page-link mx-auto" value={i + 1} onClick={(e) => handleChangePage(e)}>{i + 1}</button>
                                </li>
                            )))}
                        <li className="page-item">
                            <button className="page-link mx-auto">
                                <i className="fa-solid fa-angle-right"></i>
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
            {/* Modal show detai */}
            <Modal show={showDetail} onHide={handleCloseDetail} fullscreen={true}>
                <Modal.Header closeButton>
                <Modal.Title>News Detail</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                {contentDetail ? (
                            <div className='container'>
                                <p className='title-content-custom fw-bold h3 mt-3 text-black'>{contentDetail.title}</p>
                                <div className='info d-flex justify-content-between'>
                                <p><i className="fa-solid fa-clock ms-1"></i> Ngày đăng: {contentDetail.date}</p>
                                    <p><i className="fa-solid fa-user"></i> Viết Bởi: {contentDetail.author}</p>       
                                </div>
                                <div
                                    
                                ><p className='content-detail-text'>{contentDetail.content}</p>
                                <img src={contentDetail.img} width={'100%'} className='mt-2'></img></div>
                            </div>
                        ) : (
                            <div className='container'>
                            <p>Đang tải nội dung...</p>
                            </div>
                            
                        )}
                </Modal.Body>
                <Modal.Footer>                   
                </Modal.Footer>
            </Modal>
                        {/* Modal add */}
                                        {/* Modal add */}
            <Modal show={showAdd} onHide={handleCloseAdd} className='modal-add' dialogClassName="modal-90w">
                <Modal.Header closeButton>
                <Modal.Title>Thêm tin tức mới</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form.Label className='mb-0 mt-2'>Tiêu đề</Form.Label>
                <Form.Control
                    required
                    type="text"
                    placeholder="Title"
                    value={addNews.title} 
                    name= "title"                  
                    onChange={handleInputAdd}
                />
                <Form.Label className='mb-0 mt-3'>Ngày tạo</Form.Label>
                <Form.Control
                    required
                    type="text"
                    placeholder="Date"
                    value={addNews.date} 
                    name= "date"                  
                    onChange={handleInputAdd}
                />
                <Form.Label className='mb-0 mt-3'>Tác giả</Form.Label>
                <Form.Control
                    required
                    type="text"
                    placeholder="Author"
                    value={addNews.author} 
                    name= "author"                  
                    onChange={handleInputAdd}
                />
                <Form.Label className='mb-0 mt-3'>Ảnh minh họa</Form.Label>
                <Form.Control
                    required
                    type="text"
                    placeholder="Image Slide Show"
                    value={addNews.img} 
                    name= "img"                  
                    onChange={handleInputAdd}
                />
                <Form.Label className='mb-0 mt-3'>Nội dung</Form.Label>
                <Form.Control
                    required
                    type="text"
                    as="textarea"
                    placeholder="Content"
                    value={addNews.content} 
                    name= "content"                  
                    onChange={handleInputAdd}
                />
                </Modal.Body>
                <Modal.Footer> 
                <Button variant="success" onClick={handleSubmitAddNew}>Submit</Button>                 
                </Modal.Footer>
            </Modal>

            {/* Modal edit */}
            <Modal show={showEdit} onHide={handleCloseEdit} className='modal-add' dialogClassName="modal-90w">
                <Modal.Header closeButton>
                <Modal.Title>Chỉnh sửa tin tức</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form.Label className='mb-0 mt-2'>Tiêu đề</Form.Label>
                <Form.Control
                    required
                    type="text"
                    placeholder="Title"
                    value={updateNew.title} 
                    name= "title"                  
                    onChange={handleInputEdit}
                />
                <Form.Label className='mb-0 mt-3'>Ngày tạo</Form.Label>
                <Form.Control
                    required
                    type="text"
                    placeholder="Date"
                    value={updateNew.date} 
                    name= "date"                  
                    onChange={handleInputEdit}
                />
                <Form.Label className='mb-0 mt-3'>Tác giả</Form.Label>
                <Form.Control
                    required
                    type="text"
                    placeholder="Author"
                    value={updateNew.author} 
                    name= "author"                  
                    onChange={handleInputEdit}
                />
                <Form.Label className='mb-0 mt-3'>Ảnh minh họa</Form.Label>
                <Form.Control
                    required
                    type="text"
                    placeholder="Image Slide Show"
                    value={updateNew.img} 
                    name= "img"                  
                    onChange={handleInputEdit}
                />
                <Form.Label className='mb-0 mt-3'>Nội dung</Form.Label>
                <Form.Control
                    required
                    type="text"
                    as="textarea"
                    placeholder="Content"
                    value={updateNew.content} 
                    name= "content"                  
                    onChange={handleInputEdit}
                />
                </Modal.Body>
                <Modal.Footer> 
                <Button variant="success" onClick={updateSubmit}>Submit</Button>
                <Button variant="danger" onClick={handleCloseEdit}>Exit</Button>                 
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default NewsManagement;
