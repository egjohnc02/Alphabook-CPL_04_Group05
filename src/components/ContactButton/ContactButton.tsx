import React, { useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './ContactButton.css';
import contactImage from '../../assets/contact/contact.png';
import { Link } from 'react-router-dom';

const ContactButton: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleList = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="growing-animation" style={{ position: 'fixed', bottom: '110px', right: '30px', zIndex: 1000 }}>
            <button
                onClick={toggleList}
                className="bt shadow growing-item"
                style={{ backgroundColor: '#f47920', color: '#fff', borderRadius: '50%', width: '50px', height: '50px', border: '1px solid #ffffff' }}
            >
                {isOpen ? <i className="bi bi-x-lg"></i> : <img src={contactImage} className="shake-text" style={{ width: '28px', height: '36px' }} alt="Contact" />}
            </button>

            {isOpen && (
                <div className="mt-2 bg-white rounded shadow">
                    <ul className="list-group mb-0 contact-list">
                        <li className="list-group-item">
                            <a
                                href="tel:0123456789"
                                className="d-flex align-items-center py-2 px-3"
                            >
                                <span className="icon-circle bg-danger text-white me-2">
                                    <i className="bi bi-telephone-fill"></i>
                                </span>
                                Gọi ngay cho chúng tôi
                            </a>
                        </li>
                        <li className="list-group-item">
                            <a
                                href="https://www.facebook.com/messages/t/109385691839"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="d-flex align-items-center py-2 px-3"
                            >
                                <span className="icon-circle bg-primary text-white me-2">
                                    <i className="bi bi-messenger"></i>
                                </span>
                                Chat với chúng tôi qua Messenger
                            </a>
                        </li>
                        <li className="list-group-item">
                            <Link to='/hethongnhasach' className="d-flex align-items-center py-2 px-3">
                                <span className="icon-circle bg-warning text-white me-2">
                                    <i className="bi bi-geo-alt-fill"></i>
                                </span>
                                Xem địa chỉ cơ sở
                            </Link>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default ContactButton;