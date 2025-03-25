import './Navbar.scss';
import { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <button className="menu">
        {isMenuOpen ? "×" : "☰"} 
      </button>

      <div className={`nav ${isMenuOpen && "nav--active"}`}>
        <ul className="nav__list">
          <li className="nav__item">
            <Link to="/">
              <img src="" alt="Logo" className="nav__item__logo"/>
            </Link>
          </li>

          <li className="nav__item">
            <p className="nav__item__link">Đặt vé</p>

            <ul className="nav__subMenu">
              <li className="nav__subMenu__item">
                <Link to="/booking/book-ticket" className="nav__subMenu__item__link">
                  Mua Vé
                </Link>
              </li>
              <li className="nav__subMenu__item">
                <Link to="/booking/manage-ticket" className="nav__subMenu__item__link">
                  Quản Lý Vé
                </Link>
              </li>
              <li className="nav__subMenu__item">
                <Link to="/booking/guide" className="nav__subMenu__item__link">
                  Hướng dẫn
                </Link>
              </li>
              <li className="nav__subMenu__item">
                <Link to="/booking/cancel-ticket" className="nav__subMenu__item__link">
                  Điều kiện giá vé
                </Link>
              </li>
            </ul>
          </li>

          <li className="nav__item">
            <p className="nav__item__link">
              Thông tin hành trình
            </p>
            <ul className="nav__subMenu">
              <li className="nav__subMenu__item">
                <Link to="/info/ticket-schedule" className="nav__subMenu__item__link">
                  Lịch Bay
                </Link>
              </li>
              <li className="nav__subMenu__item">
                <Link to="/info/special-services" className="nav__subMenu__item__link">
                  Dịch Vụ Đặc Biệt
                </Link>
              </li>
              <li className="nav__subMenu__item">
                <Link to="/info/check-in" className="nav__subMenu__item__link">
                  Hướng Dẫn Thủ Tục
                </Link>
              </li>
              <li className="nav__subMenu__item">
                <Link to="/info/requirements" className="nav__subMenu__item__link">
                  Yêu Cầu Giấy Tờ
                </Link>
              </li>
              <li className="nav__subMenu__item">
                <Link to="/info/airport" className="nav__subMenu__item__link">
                  Thông Tin Sân Bay
                </Link>
              </li>
            </ul>
          </li>

          <li className="nav__item">
            <p className="nav__item__link">
              Khám phá
            </p>
            <ul className="nav__subMenu">
              <li className="nav__subMenu__item">
                <Link to="/explore/destinations" className="nav__subMenu__item__link">
                  Điểm Đến
                </Link>
              </li>
              <li className="nav__subMenu__item">
                <Link to="/explore/offers" className="nav__subMenu__item__link">
                  Ưu Đãi
                </Link>
              </li>
              <li className="nav__subMenu__item">
                <Link to="/explore/experience" className="nav__subMenu__item__link">
                  Tin Tức
                </Link>
              </li>
            </ul>
          </li>

          <li className="nav__item">
            <p className="nav__item__link">
              QAirline
            </p>
            <ul className="nav__subMenu">
              <li className="nav__subMenu__item">
                <Link to="/qairline/general" className="nav__subMenu__item__link">
                  Thông Tin Chung
                </Link>
              </li>
              <li className="nav__subMenu__item">
                <Link to="/qairline/about" className="nav__subMenu__item__link">
                  Giới Thiệu
                </Link>
              </li>
              <li className="nav__subMenu__item">
                <Link to="/qairline/news" className="nav__subMenu__item__link">
                  Trải Nghiệm
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </>
  )
}
export default Navbar;