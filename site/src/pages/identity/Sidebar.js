const Sidebar = (props) => {
  return (
    <div className="float-right w-[11.25rem] h-[3.75rem] px-4 py-6 bg-slate-200 bg-opacity-10 rounded-lg backdrop-blur-lg flex-col justify-start items-start gap-4 inline-flex">
      <div className="text-center text-gray-950 text-xs font-bold font-qanelas leading-normal">
        On this Page
      </div>
      <div className="self-stretch h-[9.5rem] flex-col justify-start items-start gap-2 flex">
        {props.items &&
          props.items.map((item) => {
            return (
              <div key={item.title}>
                <div className="self-stretch justify-start items-center gap-1 inline-flex">
                  <div className="grow shrink basis-0 text-gray-950 text-sm font-normal font-openSans leading-normal">
                    {item.title}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Sidebar;
