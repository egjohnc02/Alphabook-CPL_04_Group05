import { useState, useEffect } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';

const BackToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => setIsVisible(window.scrollY > 100);
        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    return (
        isVisible && (
            <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                style={{
                    position: 'fixed',
                    bottom: '50px',
                    right: '30px',
                    background: '#f47920',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    padding: '10px 15px',
                    cursor: 'pointer',
                    zIndex: 1000
                }}
            >
                <i className="bi bi-caret-up-fill"></i>
            </button>
        )
    );
};

export default BackToTop;