import React, { useEffect, useRef, useState } from "react";
import './cart.css'

import {Col, Form, ListGroup, Row } from "react-bootstrap";
import thumbnailItemCart from '../../assets/thumnail_item_cart.webp'

const Cart: React.FC = () => {
    const [viewportSize, setViewportSize] = useState('');
    const currentWidth = useRef(window.innerWidth);
    const [checkbox, setCheckBox] = useState(false)

    useEffect(() => {
        const handleResize = () => {
            const newWidth = window.innerWidth; // Lấy giá trị mới nhất của viewport
            currentWidth.current = newWidth; // Cập nhật giá trị trong useRef

            // Cập nhật state chỉ khi vượt qua các ngưỡng xác định
            if (newWidth < 992 && viewportSize !== 'md') {
                setViewportSize('md');
            } else if (newWidth >= 992 && viewportSize !== 'lg') {
                setViewportSize('lg');
            }
        };

        handleResize(); // Kiểm tra kích thước khi component mount

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [viewportSize]); // Thêm viewportSize vào dependency để cập nhật chính xác

    const handleCheckbox = (e: { target: { checked: boolean | ((prevState: boolean) => boolean); }; }) => {
        setCheckBox(e.target.checked)
    }
    return (
        <>
            <div className="container container-sm container-md container-lg d-flex flex-column">
                <Row>
                    <p className="header-cart h2 p-0 m-0 mt-3 ms-3 ">Giỏ hàng của bạn</p>
                    <Col lg={9} className="order-2 order-md-2 order-lg-1 shadow">
                        <ListGroup className="cart mt-3">
                            <ListGroup className="label disable fw-bold text-muted ps-2 pe-1 d-flex flex-row">
                                <p className="label-1">Thông tin sản phẩm</p>
                                <p className="label-2">Đơn giá</p>
                                <p className="label-2">Số lượng</p>
                                <p className="label-2">Thành tiền</p>
                            </ListGroup>
                            {viewportSize == 'lg' && (
                                <>  
                                    <div className="overflow-auto">
                                    <ListGroup.Item>
                                        <div className="item-cart d-flex align-items-center ps-2 pb-3 border-2 border-bottom">
                                            <div className="info-1 d-flex">
                                                <img src={thumbnailItemCart} alt="item-img-cart" className="me-2"></img>
                                                <div className="ms-4 d-flex flex-column justify-content-center align-items-start">
                                                    <p className="title-info-1 text-muted p-0 m-0 text-nowrap">Nhà lãnh đạo 360</p>
                                                    <div className="btn p-0 m-0 bg-none border-0 text-danger">Xóa</div>
                                                </div>
                                            </div>
                                            <p className="info-2-price text-danger fw-bolder ps-1 pt-3">143.200 </p>
                                            <div className="infor-3-count d-flex bg-prrimary align-items-center">
                                                <button className="btn border p-0"><i className="fa-solid fa-minus p-1"></i></button>
                                                <p className="m-0 px-2 ">3</p>
                                                <button className="btn border p-0"><i className="fa-solid fa-plus p-1"></i></button>
                                            </div>
                                            <div className="info-4-total-price">
                                                <p className="text-danger fw-bolder p-0 m-0">429.600 </p>
                                            </div>
                                        </div>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <div className="item-cart d-flex align-items-center ps-2 pb-3 border-2 border-bottom">
                                            <div className="info-1 d-flex">
                                                <img src={thumbnailItemCart} alt="item-img-cart" className="me-2"></img>
                                                <div className="ms-4 d-flex flex-column justify-content-center align-items-start">
                                                    <p className="title-info-1 text-muted p-0 m-0 text-nowrap">Nhà lãnh đạo 360</p>
                                                    <div className="btn p-0 m-0 bg-none border-0 text-danger">Xóa</div>
                                                </div>
                                            </div>
                                            <p className="info-2-price text-danger fw-bolder ps-1 pt-3">143.200 </p>
                                            <div className="infor-3-count d-flex bg-prrimary align-items-center">
                                                <button className="btn border p-0"><i className="fa-solid fa-minus p-1"></i></button>
                                                <p className="m-0 px-2 ">3</p>
                                                <button className="btn border p-0"><i className="fa-solid fa-plus p-1"></i></button>
                                            </div>
                                            <div className="info-4-total-price">
                                                <p className="text-danger fw-bolder p-0 m-0">429.600 </p>
                                            </div>
                                        </div>
                                    </ListGroup.Item>
                                    </div>
                                </>
                            )}
                            {viewportSize == 'md' && (
                                <>
                                    <div className="overflow-scroll ">
                                    <ListGroup.Item>
                                        <div className="item-cart d-flex ps-2 pb-3 border-2 border-bottom">
                                            <div className="info-1 d-flex">
                                                <img src={thumbnailItemCart} alt="item-img-cart" className="me-2"></img>
                                                <div className="ms-4 d-flex flex-column align-items-start">
                                                    <p className="title-info-1 text-muted p-0 m-0 text-nowrap">Nhà lãnh đạo 360</p>
                                                    <div className="d-flex bg-prrimary align-items-center">
                                                        <button className="btn border p-0"><i className="fa-solid fa-minus p-1"></i></button>
                                                        <p className="m-0 px-2 ">3</p>
                                                        <button className="btn border p-0"><i className="fa-solid fa-plus p-1"></i></button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <p className="text-danger info-2-price fw-bolder p-0 m-0 mt-3">143.200 </p>
                                                <div className="btn p-0 m-0 bg-none border-0 text-danger">Xóa</div>
                                            </div>
                                        </div>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <div className="item-cart d-flex ps-2 pb-3 border-2 border-bottom">
                                            <div className="info-1 d-flex">
                                                <img src={thumbnailItemCart} alt="item-img-cart" className="me-2"></img>
                                                <div className="ms-4 d-flex flex-column align-items-start">
                                                    <p className="title-info-1 text-muted p-0 m-0 text-nowrap">Nhà lãnh đạo 360</p>
                                                    <div className="d-flex bg-prrimary align-items-center">
                                                        <button className="btn border p-0"><i className="fa-solid fa-minus p-1"></i></button>
                                                        <p className="m-0 px-2 ">3</p>
                                                        <button className="btn border p-0"><i className="fa-solid fa-plus p-1"></i></button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <p className="text-danger info-2-price fw-bolder p-0 m-0 mt-3">143.200 </p>
                                                <div className="btn p-0 m-0 bg-none border-0 text-danger">Xóa</div>
                                            </div>
                                        </div>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <div className="item-cart d-flex ps-2 pb-3 border-2 border-bottom">
                                            <div className="info-1 d-flex">
                                                <img src={thumbnailItemCart} alt="item-img-cart" className="me-2"></img>
                                                <div className="ms-4 d-flex flex-column align-items-start">
                                                    <p className="title-info-1 text-muted p-0 m-0 text-nowrap">Nhà lãnh đạo 360</p>
                                                    <div className="d-flex bg-prrimary align-items-center">
                                                        <button className="btn border p-0"><i className="fa-solid fa-minus p-1"></i></button>
                                                        <p className="m-0 px-2 ">3</p>
                                                        <button className="btn border p-0"><i className="fa-solid fa-plus p-1"></i></button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div>
                                                <p className="text-danger info-2-price fw-bolder p-0 m-0 mt-3">143.200 </p>
                                                <div className="btn p-0 m-0 bg-none border-0 text-danger">Xóa</div>
                                            </div>
                                        </div>
                                    </ListGroup.Item>
                                    </div>
                                </>
                            )}
                        </ListGroup>
                        <Row>
                            <Col lg={4} className="ms-auto">
                                <div className="total-cart mt-4">
                                    <div className="content-total-cart d-flex justify-content-between mb-4">
                                        <p className="text-muted">Tổng tiền:</p>
                                        <p className="final-price text-danger fw-bolder">588.800 </p>
                                    </div>
                                    <div className="button-card text-white d-flex justify-content-center align-items-center bg-orange rounded-1 mb-3" style={{ height: '55px' }}>
                                        Thanh toán
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                    <Col lg={3} className="order-1 order-md-1 order-lg-2">
                        <div className="cart-filter-content shadow bg-light  h-100">
                            <p className="disable fw-bold text-muted ps-1 pe-1  ms-1 "> Thời gian giao hàng</p>
                            <div className='form-filter d-flex gap-2 ps-1 ms-2 me-2'>
                                <Form.Group controlId="formDate">
                                    <Form.Control type="date" className="bg-transparent form-control-sm" />
                                </Form.Group>
                                <Form.Select aria-label="Default select example" className="text-muted form-select-sm">
                                    <option>Chọn thời gian</option>
                                    <option value="1">08h00 - 12h00</option>
                                    <option value="2">14h-00 - 18h00</option>
                                    <option value="3">19h00 - 21h00</option>
                                </Form.Select>
                            </div>
                            <Form.Check
                                type='checkbox'
                                label='Xuất hóa đơn công ty'
                                className="ms-3 mt-3 custom-checkbox"
                                checked={checkbox}
                                onChange={handleCheckbox}
                            />

                            {checkbox && (<Form className="ps-2 pe-2">
                                <Form.Group className="mb-2 mt-4">
                                    <Form.Label>Tên công ty</Form.Label>
                                    <Form.Control type="text" placeholder="Tên công ty" />
                                </Form.Group>
                                <Form.Group className="mb-2">
                                    <Form.Label>Mã số thuế</Form.Label>
                                    <Form.Control type="text" placeholder="Tên công ty" />
                                </Form.Group>
                                <Form.Group className="mb-2">
                                    <Form.Label>Địa chỉ công ty</Form.Label>
                                    <Form.Control as="textarea" rows={3} />
                                </Form.Group>
                                <Form.Group className="mb-2">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" placeholder="Email nhận hóa đơn" />
                                </Form.Group>
                            </Form>)}
                        </div>
                    </Col>

                </Row>
            </div>
        </>
    );
};

export default Cart;
