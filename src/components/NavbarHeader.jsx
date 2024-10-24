import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.webp';

export default function NavbarHeader() {
  return (
    <Navbar expand="lg" className="bg-light sticky-top border-bottom">
      <Container className='d-flex justify-content-center'>
        <Navbar.Brand as={Link} to="/home">
          <img src={logo} alt="logo" style={{ width: '270px' }} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/home">Trang chủ</Nav.Link>
            <Nav.Link as={Link} to="/introduce">Về Alpha Books</Nav.Link>

            <NavDropdown title="Tủ sách" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/category/harvard-business-review">Harvard Business Review</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/category/alpha-lead">Alpha Lead</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/category/quan-tri-doanh-nghiep">Quản trị doanh nghiệp</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/category/tai-chinh">Tài chính - Đầu tư - Chứng khoán</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/category/cong-nghe">Công nghệ & Chuyển đổi số</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/category/marketing">Marketing & Bán hàng</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/category/ky-nang">Kỹ năng</NavDropdown.Item>
            </NavDropdown>

            <Nav.Link as={Link} to="/services">Dịch vụ HTXB</Nav.Link>

            <NavDropdown title="Tin tức - Sự kiện" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/news">Tin tức</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/events">Sự kiện</NavDropdown.Item>
            </NavDropdown>

            <Nav.Link as={Link} to="/search">
              <div className='border-end border-black border-2 pe-3'>
                <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                </svg>
              </div>
            </Nav.Link>

            <Nav.Link as={Link} to="/login">
              <div className='border-end border-black border-2 pe-3'>
                <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" className="bi bi-person" viewBox="0 0 16 16">
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"/>
                </svg>
              </div>
            </Nav.Link>

            <Nav.Link as={Link} to="/cart">
              <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" fill="currentColor" className="bi bi-bag" viewBox="0 0 16 16">
                <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 1 0 0 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z"/>
              </svg>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
