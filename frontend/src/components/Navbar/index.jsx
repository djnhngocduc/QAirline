import './Navbar.scss';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { TiDeleteOutline } from 'react-icons/ti';
import { FaBars } from 'react-icons/fa';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuOpen = () => {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <>
      <button className="menu" onClick={handleMenuOpen}>
        {isMenuOpen ? <TiDeleteOutline /> : <FaBars />} 
      </button>

      <div className={`nav ${isMenuOpen && "nav--active"}`}>
        <ul className="nav__list">
          <li className="nav__item">
            <Link to="/">
              <img src="/assets/logo.png" alt="Logo" className="nav__item__logo"/>
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
          <li className="nav__item nav__item__account">
            {/* {isLoggedIn ? (
              <>
                <p className="nav__item__link">
                  <img src="/images/user.png" alt="Avatar" className="nav__item__avatar" />
                  Tài khoản 
                </p>

                <ul className="nav__subMenu">
                  <li className="nav__subMenu__item">
                    <Link to="/account/profile" className="nav__subMenu__item__link">
                      Hồ Sơ
                    </Link>
                  </li>
                  <li className="nav__subMenu__item">
                    <Link to="/account/settings" className="nav__subMenu__item__link">
                      Cài Đặt
                    </Link>
                  </li>
                  <li className="nav__subMenu__item">
                    <Link to="/account/logout" className="nav__subMenu__item__link">
                      Đăng xuất
                    </Link>
                  </li>
                </ul>
              </>
            ) : (
              <div className="nav__authLinks">
                <Link to="/account/signin" className="nav__item__link">
                  Đăng Nhập
                </Link>
                <span className="nav__separator">
                  |
                </span>
                <Link to="/account/signup" className="nav__item__link">
                  Đăng ký
                </Link>
              </div>
            )} */}
          </li>
        </ul>
      </div>
    </>
  )
}
export default Navbar;