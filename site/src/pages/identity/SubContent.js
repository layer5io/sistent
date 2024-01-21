const SubContent = (props) => {
  return (
    <>
      <div
        className={`w-[53.75rem] text-gray-700 text-base font-${
          props.font ? props.font : 'normal'
        } font-openSans leading-7 tracking-tight`}
      >
        {props.SubContent}
      </div>
      {props.children}
    </>
  );
};

export default SubContent;
