import './Banner.scss';

function Banner() {
  return (
    <div className="banner">
      <div className="banner__content">
        <div className="banner__container">
          <div className="banner__text">
            <span className="banner__text--highlight">
              Đặc biệt:
            </span>
            <span>
              Giảm 15% cho chuyến bay quốc tế
            </span>
          </div>
        </div>
        <button className="banner__button">Đặt ngay</button>
      </div>
    </div>
  )
}
export default Banner;