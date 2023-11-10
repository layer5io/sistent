import React from "react";
import PrevIcon from "../../assets/images/Chevron-light.svg"
import { Link } from 'react-router-dom';

const Previous = ({content, parent, child, subchild})=>{
  return (
    <Link to={`/${parent}/${child}/${subchild}`}>
    <div className="w-[394px] h-[108px] px-6 py-4 bg-gray-200 rounded-2xl flex-col justify-start items-start gap-4 inline-flex">
    <div className="justify-start items-center gap-4 inline-flex">
        <div className="w-6 h-6 relative top-left rotate-90"><img src={PrevIcon} alt='prev'/></div>
        <div className="w-[214px] text-gray-950 text-base font-normal font-openSans leading-7">Previous</div>
    </div>
    <div className="self-stretch pr-2 justify-start items-start gap-1 inline-flex">
        <div className="grow shrink basis-0 text-gray-950 text-2xl font-medium font-qanelas leading-loose">{content}</div>
    </div>
   </div>
   </Link>
  )
}

export default Previous;