import React, { useState } from 'react';
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
                {isOpen ? <span>X</span> : <img src={contactImage} className="shake-text" style={{ width: '28px', height: '36px' }} alt="Contact" />}
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
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-telephone-fill" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"/>
                                    </svg>
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
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-messenger" viewBox="0 0 16 16">
                                        <path d="M0 7.76C0 3.301 3.493 0 8 0s8 3.301 8 7.76-3.493 7.76-8 7.76c-.81 0-1.586-.107-2.316-.307a.64.64 0 0 0-.427.03l-1.588.702a.64.64 0 0 1-.898-.566l-.044-1.423a.64.64 0 0 0-.215-.456C.956 12.108 0 10.092 0 7.76m5.546-1.459-2.35 3.728c-.225.358.214.761.551.506l2.525-1.916a.48.48 0 0 1 .578-.002l1.869 1.402a1.2 1.2 0 0 0 1.735-.32l2.35-3.728c.226-.358-.214-.761-.551-.506L9.728 7.381a.48.48 0 0 1-.578.002L7.281 5.98a1.2 1.2 0 0 0-1.735.32z"/>
                                    </svg>
                                </span>
                                Chat với chúng tôi qua Messenger
                            </a>
                        </li>
                        <li className="list-group-item">
                            <Link to='/hethongnhasach' className="d-flex align-items-center py-2 px-3">
                                <span className="icon-circle bg-warning text-white me-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                                        <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/>
                                    </svg>
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