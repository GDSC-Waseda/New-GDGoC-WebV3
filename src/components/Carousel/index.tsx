import React, { useState } from "react";
import { CarouselCardProps } from "~/types";
import { CarouselCard } from "components/Cards";

interface CarouselProps {
  props: Array<CarouselCardProps>;
}

const Carousel: React.FC<CarouselProps> = ({ props }) => {
  const [centerIndex, setCenterIndex] = useState(1);

  const handleCardClick = (direction: string) => {
    if (direction === "left") {
      setCenterIndex((oldCenterIndex) =>
        oldCenterIndex === 0 ? props.length - 1 : oldCenterIndex - 1
      );
    } else if (direction === "right") {
      setCenterIndex((oldCenterIndex) =>
        oldCenterIndex === props.length - 1 ? 0 : oldCenterIndex + 1
      );
    }
  };

  // Calculate indices for the cards to the left, center, and right of the carousel.
  const leftIndex = centerIndex - 1 < 0 ? props.length - 1 : centerIndex - 1;
  const rightIndex = centerIndex + 1 > props.length - 1 ? 0 : centerIndex + 1;

  return (
    <div className="carousel">
      <button
        className="carousel__button carousel__button--left"
        onClick={() => handleCardClick("left")}
      >
        ◀
      </button>
      <div className="carousel__container">
        <div className="carousel__card" onClick={() => handleCardClick("left")}>
          <CarouselCard props={props[leftIndex]} isActive={false} />
        </div>
        <div
          className="carousel__card active"
          onClick={() => handleCardClick("right")}
        >
          <CarouselCard props={props[centerIndex]} isActive={true} />
        </div>
        <div
          className="carousel__card"
          onClick={() => handleCardClick("right")}
        >
          <CarouselCard props={props[rightIndex]} isActive={false} />
        </div>
      </div>
      <button
        className="carousel__button carousel__button--right"
        onClick={() => handleCardClick("right")}
      >
        ▶
      </button>
    </div>
  );
};

export default Carousel;
