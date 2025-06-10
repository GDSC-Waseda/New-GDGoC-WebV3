import { TextCardProps } from "~/types/index";

export const TextCard: React.FC<{ props: TextCardProps }> = ({ props }) => {
  return (
    <div className="textCard__section">
      <h2 className="textCard__section__title">{props.title}</h2>
      <p className="textCard__section__content">{props.content}</p>
    </div>
  );
};

export default TextCard;
