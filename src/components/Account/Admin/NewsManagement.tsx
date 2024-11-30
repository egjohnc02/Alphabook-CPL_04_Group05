import React, { useEffect, useState } from 'react';
import { Button, Container, Modal, Nav, Table, Form } from 'react-bootstrap';
import "./NewsManagement.css"
import { getAllNews, NewsItem, getAllPressNews, getAllRecruitmentNews, getAllInternalNews } from "../../../page/News/NewsData";

import {db} from "../../../firebase/firebase"
import { addDoc, collection, deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
interface ContentDetail {
    id: string;
    title: string;
    author:string;
    date:string;
    content:string;
}
interface InputItem {
    type: 'text' | 'img';
    value: string;
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
    const [idRs, setIdRs] = useState("")
    const [imageSlideShow, setImageSlideShow] = useState("")
    //state content
    const [inputs, setInputs] = useState<InputItem[]>([]); // Quản lý mảng các URL
    const [inputType, setInputType] = useState<'text' | 'img'>('text'); // Loại input đang chọn
    const [contentResult, setContentResult] = useState<string>(""); // Mảng lưu trữ các giá trị đã xử lý
    
    // xử lý pop-up
    const [showAdd, setShowAdd] = useState(false);
    const handleCloseAdd = () => setShowAdd(false);
    const handleShowAdd = () => setShowAdd(true);

    //Xu ly click pop up 
    const handleAddNews = () =>{
        handleShowAdd()
    }
    //Xu ly input add
    const handleInputTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }
    const handleInputDate = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDate(e.target.value)
    }
    const handleInputAuthor = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAuthor(e.target.value)
    }
    const handleInputURLImageSlideShow =(e: React.ChangeEvent<HTMLInputElement>) => {
        setImageSlideShow(e.target.value)
    }
    const handleInputId = () => {
        let id = ""
        if(filter == 'News') id = 'newId' + (listNews.length + 1)
        if(filter == 'Press') id = 'pnId' + (listNews.length + 1)
        if(filter == 'Recruitment') id = 'rnId' + (listNews.length + 1)   
        setIdRs(id) 
    }
    
    // Xu ly add Content
    // Hàm xử lý khi nhấn nút Text
    const handleAddTextInput = () => {
        setInputs((prevInputs) => [...prevInputs, { type: 'text', value: '' }]); // Thêm một ô input text vào mảng
        setInputType('text'); // Chọn loại input là Text
    };

    // Hàm xử lý khi nhấn nút Image
    const handleAddImgInput = () => {
        setInputs((prevInputs) => [...prevInputs, { type: 'img', value: '' }]); // Thêm một ô input img vào mảng
        setInputType('img'); // Chọn loại input là Image
    };
    // Hàm thay đổi giá trị input
    const handleChange = (index: number, value: string) => {
        const updatedInputs = [...inputs];
        updatedInputs[index].value = value; // Cập nhật giá trị của input tại vị trí index
        setInputs(updatedInputs);
    };
    // Hàm xử lý nối các giá trị thành mảng và thêm <p>, <img> nếu cần
    const handleProcessInputs = () => {
        const processedInputs = inputs.map((input) => {
            if (input.type === 'text') {
                return `<p>${input.value}</p>`; // Nếu type là text, thêm <p> vào đầu và </p> vào cuối
            } else if (input.type === 'img') {
                return `<img>${input.value}</img>`; // Nếu type là img, thêm <img> vào đầu và </img> vào cuối
            }
            return '';
        });
        setContentResult(processedInputs.join(''))// Lưu kết quả vào state result
    };
    const handleAddNewsToDb = () => {
        handleInputId();
        handleProcessInputs();
    
        // Tạo biến lưu trữ
        const newNewsItem = {
            id: idRs,
            content: contentResult,
            img: imageSlideShow,
            title: title,
        };
        const newsItemDetail = {
            id: idRs,
            title: title,
            author: author,
            date: date,
            content: contentResult,
        };
    
        // Thêm vào db
        const addNewsItem = async (): Promise<void> => {
            try {
                // Tham chiếu đến collection
                const newsCollectionRef = collection(db, "News"); // Đảm bảo `filter` được định nghĩa
                const newsDetailCollectionRef = collection(db, "ContentNewDetail");
    
                // 1. Thêm document với ID mặc định (Firebase tự tạo)
                await addDoc(newsCollectionRef, newNewsItem);
                await addDoc(newsDetailCollectionRef, newsItemDetail);
                // 2. Thêm document với ID tùy chỉnh trong collection khác
                const customDocRef = doc(newsCollectionRef, idRs); // Tạo tham chiếu với ID tùy chỉnh
                const customDocRef1 = doc(newsDetailCollectionRef, idRs);
    
                await setDoc(customDocRef, newNewsItem);
                await setDoc(customDocRef1, newsItemDetail);
    
                console.log("News item added successfully!");
            } catch (error) {
                console.error("Error adding news item:", error);
            }
        };
    
        // Gọi hàm thêm dữ liệu
        addNewsItem().catch((err) => console.error("Unhandled error:", err));
    };
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
                <Modal.Title>Add News Detail</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form.Label>Image Slide Show</Form.Label>
                <Form.Control
                    required
                    type="text"
                    placeholder="Paste link url"
                    value={imageSlideShow}                   
                    onChange={handleInputURLImageSlideShow}
                />
                <Form.Label>Title</Form.Label>
                <Form.Control
                    required
                    type="text"
                    placeholder="Title"
                    value={title}                   
                    onChange={handleInputTitle}
                />
                <Form.Label>Date</Form.Label>
                <Form.Control
                    required
                    type="text"
                    placeholder="Date"
                    value={date}
                    onChange={handleInputDate}
                    
                />
                <Form.Label>Author</Form.Label>
                <Form.Control
                    required
                    type="text"
                    placeholder="Author"
                    value={author}
                    onChange={handleInputAuthor}
                    
                />
                {/* Content */}
                <hr></hr>
                <Button variant="outline-success" size="sm" className='me-1 mb-1' onClick={handleAddTextInput}>Content</Button>
                <Button variant="outline-warning" size="sm" className='me-1 mb-1' onClick={handleAddImgInput}>Image</Button>
                    {inputs.map((input, index) => (
                        <div key={index}>
                            {input.type === 'text' ? (
                                <Form.Control
                                    type="text"
                                    as="textarea"
                                    value={input.value}
                                    onChange={(e) => handleChange(index, e.target.value)}
                                    placeholder="Content"
                                />
                            ) : (
                                <Form.Control
                                    type="text"
                                    value={input.value}
                                    onChange={(e) => handleChange(index, e.target.value)}
                                    placeholder="Link Url"
                                />
                            )}
                        </div>
                    ))}
                </Modal.Body>
                <Modal.Footer> 
                <Button variant="success" onClick={handleAddNewsToDb}>Submit</Button>                 
                </Modal.Footer>
            </Modal>
            
        </>
    );
}

export default NewsManagement;
