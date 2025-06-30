import { SectionCardProps } from "~/types/index";

export const SectionCard: React.FC<{ props: SectionCardProps }> = ({
  props,
}) => {
  return (
    <div className="my-5 mx-16 flex justify-center">
      <div className="w-full">
        <h1 className="text-center text-[max(2vw,33px)]">{props.title}</h1>
        {props.content && (
          <p className="pt-2 text-center text-[#404040]">{props.content}</p>
        )}
      </div>
    </div>
  );
};

export default SectionCard;
