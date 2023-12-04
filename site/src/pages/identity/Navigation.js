import { Link } from 'react-router-dom';

const Navigation = (props) => {
  return (
    <div className="w-[1120px] h-14 relative mt-[32px]">
      <div className="w-[1160px] h-0.5 left-[-50px] top-[54px] absolute bg-gray-200" />
      <div className="left-0 top-0 absolute justify-start items-start inline-flex">
        <div className="w-[140px] h-14 px-2 pt-4 pb-3 rounded-lg justify-center items-center gap-1 flex">
          <Link
            to={`/identity/${props.type}/overview`}
            className="grow shrink basis-0 text-center text-emerald-700 text-base font-semibold font-openSans leading-7"
          >
            Overview
          </Link>
        </div>
        <div className="w-[140px] h-14 px-2 pt-4 pb-3 rounded-lg justify-center items-center gap-1 flex">
          <Link
            to={`/identity/${props.type}/guidance`}
            className="grow shrink basis-0 text-center text-emerald-700 text-base font-normal font-openSans leading-7"
          >
            Guidance
          </Link>
        </div>
        <div className="w-[140px] h-14 px-2 pt-4 pb-3 rounded-lg justify-center items-center gap-1 flex">
          <Link
            to={`/identity/${props.type}/code`}
            className="grow shrink basis-0 text-center text-emerald-700 text-base font-normal font-openSans leading-7"
          >
            Code
          </Link>
        </div>
      </div>
      <div className="w-[92px] h-1 left-[24px] top-[52px] absolute bg-emerald-700 rounded-tl rounded-tr" />
    </div>
  );
};

export default Navigation;
