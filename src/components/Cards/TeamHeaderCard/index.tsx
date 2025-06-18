import { Col, Row, Card } from "react-bootstrap";
import Link from "next/link";

import { TeamHeaderCardProps } from "~/types/index";

export const TeamHeaderCard: React.FC<{ props: TeamHeaderCardProps }> = ({
  props,
}) => {
  return (
    <Card className="teamheaderCard">
      {/* {props.headTitle !== undefined && (
        <Card.Title className="headerCard__headerTitle">
          {props.headTitle}
        </Card.Title>
      )}
      <div className="headerCard__container">
        <Card.Text className="headerCard__title">{props.title}</Card.Text>
      </div>
      {props.content !== undefined &&
        props.content.split("\n").map((text, key) => (
          <p key={key} className="headerCard__contents">
            {text}
          </p>
        ))} */}

      <div className="teamheaderCard__left"></div>
      <div className="teamheaderCard__right">
        <div className="title">{props.title}</div>
        <div className="content">
          <p>{props.content}</p>
        </div>
        <ul className="features">
          {props.featureList?.map((feature, id) => (
            <li className="featureItem" key={id}>
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
};

export default TeamHeaderCard;
