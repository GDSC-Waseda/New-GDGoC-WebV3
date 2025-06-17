import { Col, Row, Card } from "react-bootstrap";
import Link from "next/link";

import { SectionCardProps } from "~/types/index";

export const SectionCard: React.FC<{ props: SectionCardProps }> = ({
  props,
}) => {
  return (
    <div className="sectionCard">
        <div className="title">{props.title}</div>
        <p className="content">{props.content}</p>
    </div>
  );
};

export default SectionCard;
