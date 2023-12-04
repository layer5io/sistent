import SubContent from './SubContent';
import SubHeading from './SubHeading';

const SubText = (props) => {
  return (
    <div
      className={`w-[53.75rem] h-${
        props.height ? props.height : 11.25
      } pb-6 border-b-2 border-gray-200 flex-col justify-start items-start gap-6 inline-flex`}
    >
      {props.SubHeading && <SubHeading SubHeading={props.SubHeading} />}
      {props.SubContent && <SubContent SubContent={props.SubContent} />}
      {props.children}
    </div>
  );
};

export default SubText;
