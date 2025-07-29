import Slider from "react-slick";
import SliderCard from "./SliderCard";

function MultipleItemsSlider({ className, recommendedHotels }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    variableWidth: true,
    rows: 1,
    slidesPerRow: 1,
  };

  return (
    <div className={`slider-container relative ${className}`}>
      <Slider {...settings}>
        {recommendedHotels.map((hotel) => (
          <div key={hotel.id} className="min-w-[462px]">
            <SliderCard {...hotel} />
          </div>
        ))}
      </Slider>
    </div>
  );
}
export default MultipleItemsSlider;
