import React from "react";
import Slider from "react-slick";
import "./DetailMenuSlider.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function DetailMenuSlider(props) {
  const settings = {
    dots: true,
    autoplay: true,
    autoplaySpeed: 3000,
    infinite: true,
    fade: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <>
      <div style={{ width: "100%", maxWidth: "500px", marginBottom: "30px" }}>
        <Slider {...settings}>
          {props.foodPictures ? (
            props.foodPictures.map((url) => {
              return (
                <img
                  className="detail-menu-img"
                  key={url}
                  src={url}
                  alt="Unable to load"
                ></img>
              );
            })
          ) : (
            <div>
              <img className="detail-menu-img" src="" alt="No Data" />
            </div>
          )}
        </Slider>
      </div>
    </>
  );
}

export default DetailMenuSlider;
