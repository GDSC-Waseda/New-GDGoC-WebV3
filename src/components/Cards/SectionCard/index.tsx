import { SectionCardProps } from "~/types/index";

export const SectionCard: React.FC<{ props: SectionCardProps }> = ({
  props,
}) => {
  return (
    <div className="sectionCard">
      <h1 className="sectionCard__title">{props.title}</h1>
      <p className="sectionCard__contents">{props.content}</p>
    </div>
  );
};

export default SectionCard;
