import Link from "next/link";
import Image from "next/image";
import { CarouselCardProps } from "~/types";

export const CarouselCard: React.FC<{
  props: CarouselCardProps;
  isActive: boolean;
}> = ({ props, isActive }) => {
  const isOld = props.old ? "old" : "";
  const activeClass = isActive ? "active" : "";

  const cardContent = (
    <>
      <Image
        src={`/events/${props.image}`}
        width={200}
        height={200}
        layout="fixed"
        alt="image"
      />
      <div className="carousel-card__container">
        <div className="carousel-card__date">{props.title}</div>
        <div className="carousel-card__title">{props.subtitle}</div>
      </div>
    </>
  );

  return (
    <div className={`carousel-card ${isOld} ${activeClass}`}>
      {isActive ? (
        <Link href={props.link}>
          {cardContent}
        </Link>
      ) : (
        cardContent
      )}
    </div>
  );
};

export default CarouselCard;
