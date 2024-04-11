import { IconType } from "react-icons";

export type DropMenuContentProps = {
  content: {
    icon?: IconType;
    text: string;
    onClick: () => void;
  }[];
};

const DropMenuContent: React.FC<DropMenuContentProps> = ({ content }) => {
  return (
    <>
      {content.map((element, index) => (
        <li key={index}>
          <div className="flex flex-row ml-6 mr-10 pb-3 px-3 items-center border-b border-black space-x-3">
            {element.icon && <element.icon size={25} />}
            <span onClick={element.onClick}>{element.text}</span>
          </div>
        </li>
      ))}
    </>
  );
};

export default DropMenuContent;
