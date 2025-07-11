import { Col, Row, Card } from "react-bootstrap";
import { HeaderCardProps } from "~/types/index";
import Link from "next/link";

export const HeaderCard: React.FC<{ props: HeaderCardProps }> = ({ props }) => {
  const buttonText = props.buttonText || "Discover";

  return (
    <Card className="headerCard">
      {props.headTitle && (
        <Card.Title className="headerCard__headerTitle">
          {props.headTitle}
        </Card.Title>
      )}
      <div className="headerCard__container">
        <Card.Text className="headerCard__title">{props.title}</Card.Text>
      </div>
      {props.content &&
        props.content.split("\n").map((text, key) => (
          <p key={key} className="headerCard__contents">
            {text}
          </p>
        ))}
      {props.button && (
        <Link href="/events" passHref>
          {buttonText}
        </Link>
      )}
    </Card>
  );
};

export default HeaderCard;
