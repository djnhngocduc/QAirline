import './Banner.scss';

function Banner() {
  return (
    <div className="banner">
      <div className="banner__content">
        <img src="" alt="Logo" className="banner__logo" />
        <div className="banner__text">
          <span className="banner__text--highlight">
            Ưu đãi đặc biệt: 
          </span>
          <span>
            Giảm 15% cho chuyến bay quốc tế
          </span>
        </div>
        <button className="banner__button">Đặt ngay</button>
      </div>
    </div>
  )
}
export default Banner;