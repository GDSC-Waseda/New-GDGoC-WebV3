import { HeaderCardProps } from "~/types/index";

export const HeaderCard: React.FC<{ props: HeaderCardProps }> = ({ props }) => {
  return (
    <div className="headerCard">
      <h1 className="headerCard__title">{props.title}</h1>
      <p className="headerCard__contents">{props.content}</p>
    </div>
  );
};

export default HeaderCard;
