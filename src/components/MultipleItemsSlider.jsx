import Slider from "react-slick";
import SliderCard from "./SliderCard";

function MultipleItemsSlider({ className, recommendedHotels }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    variableWidth: false,
    rows: 1,
    slidesPerRow: 1,
    centerMode: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className={`slider-container relative ${className}`}>
      <Slider {...settings}>
        {recommendedHotels.map((hotel) => (
          <div key={hotel.id} className="px-2 w-full max-w-full">
            <SliderCard {...hotel} className="w-full max-w-full" />
          </div>
        ))}
      </Slider>
    </div>
  );
}
export default MultipleItemsSlider;
