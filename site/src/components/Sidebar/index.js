import React from 'react';
import ChevronLightUp from '../../assets/images/Chevron-light-up.png';
import ChevronLightDown from '../../assets/images/Chevron-light-down.png';
import Chevron from '../../assets/images/Chevron.png';

const Sidebar = () => {
    return (
        <div className='pt-8 pr-4'>
        <div className="w-[280px] h-[800px] pr-1 pt-2 border-r border-gray-200 justify-start items-start gap-1 inline-flex">
            <div className="flex-col justify-start items-start gap-1 inline-flex">
                <div className="w-[264px] rounded-lg justify-center items-center gap-1 inline-flex">
                    {/* <div className="w-[264px] flex-col justify-start items-start inline-flex">
                        <div className="self-stretch pl-10 py-2 justify-center items-center gap-1 inline-flex">
                            <div className="grow shrink basis-0 text-gray-700 text-base font-normal font-['Open Sans'] leading-7 tracking-tight">Introduction</div>
                        </div>
                        <div className="self-stretch pl-10 py-2 justify-center items-center gap-1 inline-flex">
                            <div className="grow shrink basis-0 text-gray-700 text-base font-normal font-['Open Sans'] leading-7 tracking-tight">Principles</div>
                        </div>
                        <div className="self-stretch pl-10 py-2 justify-center items-center gap-1 inline-flex">
                            <div className="grow shrink basis-0 text-gray-700 text-base font-normal font-['Open Sans'] leading-7 tracking-tight">Contribution</div>
                        </div>
                        <div className="self-stretch pl-10 py-2 justify-center items-center gap-1 inline-flex">
                            <div className="grow shrink basis-0 text-gray-700 text-base font-normal font-['Open Sans'] leading-7 tracking-tight">Support</div>
                        </div>
                        <div className="self-stretch pl-10 py-2 justify-center items-center gap-1 inline-flex">
                            <div className="grow shrink basis-0 text-gray-700 text-base font-normal font-['Open Sans'] leading-7 tracking-tight">Case Studies</div>
                        </div>
                    </div> */}
                    <div className="grow shrink basis-0 h-14 pl-6 pr-4 py-2 bg-white justify-center items-center gap-1 flex">
                        <div className="grow shrink basis-0 text-gray-950 text-base font-normal font-['Open Sans'] leading-7 tracking-tight">About Sistent</div>
                        <div className="w-6 h-6 relative"><img src={Chevron} alt="/" /></div>
                    </div>
                </div>
                <div className="w-[264px] bg-white rounded-lg justify-center items-center gap-1 inline-flex">
                    {/* <div className="w-[264px] flex-col justify-start items-start inline-flex">
                        <div className="self-stretch pl-10 py-2 bg-green-100 border-l-4 border-emerald-700 justify-center items-center gap-1 inline-flex">
                            <div className="grow shrink basis-0 text-emerald-700 text-base font-normal font-['Open Sans'] leading-7 tracking-tight">Color</div>
                        </div>
                        <div className="self-stretch pl-10 py-2 justify-center items-center gap-1 inline-flex">
                            <div className="grow shrink basis-0 text-gray-700 text-base font-normal font-['Open Sans'] leading-7 tracking-tight">Typography</div>
                        </div>
                        <div className="self-stretch pl-10 py-2 justify-center items-center gap-1 inline-flex">
                            <div className="grow shrink basis-0 text-gray-700 text-base font-normal font-['Open Sans'] leading-7 tracking-tight">Spacing</div>
                        </div>
                        <div className="self-stretch pl-10 py-2 justify-center items-center gap-1 inline-flex">
                            <div className="grow shrink basis-0 text-gray-700 text-base font-normal font-['Open Sans'] leading-7 tracking-tight">Page Layouts</div>
                        </div>
                        <div className="self-stretch pl-10 py-2 justify-center items-center gap-1 inline-flex">
                            <div className="grow shrink basis-0 text-gray-700 text-base font-normal font-['Open Sans'] leading-7 tracking-tight">Elevation</div>
                        </div>
                    </div> */}
                    <div className="grow shrink basis-0 h-14 pl-6 pr-4 py-2 justify-center items-center gap-1 flex">
                        <div className="grow shrink basis-0 text-emerald-700 text-base font-semibold font-['Open Sans'] leading-7 tracking-tight">Identity</div>
                        <div className="w-6 h-6 relative"><img src={ChevronLightDown} alt='' /></div>
                    </div>
                </div>
                <div className="w-[264px] rounded-lg justify-center items-center gap-1 inline-flex">
                    {/* <div className="w-[264px] flex-col justify-start items-start inline-flex">
                        <div className="self-stretch pl-10 py-2 justify-center items-center gap-1 inline-flex">
                            <div className="grow shrink basis-0 text-gray-700 text-base font-normal font-['Open Sans'] leading-7 tracking-tight">Option 1</div>
                        </div>
                        <div className="self-stretch pl-10 py-2 justify-center items-center gap-1 inline-flex">
                            <div className="grow shrink basis-0 text-gray-700 text-base font-normal font-['Open Sans'] leading-7 tracking-tight">Option 1</div>
                        </div>
                        <div className="self-stretch pl-10 py-2 justify-center items-center gap-1 inline-flex">
                            <div className="grow shrink basis-0 text-gray-700 text-base font-normal font-['Open Sans'] leading-7 tracking-tight">Option 1</div>
                        </div>
                        <div className="self-stretch pl-10 py-2 justify-center items-center gap-1 inline-flex">
                            <div className="grow shrink basis-0 text-gray-700 text-base font-normal font-['Open Sans'] leading-7 tracking-tight">Option 1</div>
                        </div>
                        <div className="self-stretch pl-10 py-2 justify-center items-center gap-1 inline-flex">
                            <div className="grow shrink basis-0 text-gray-700 text-base font-normal font-['Open Sans'] leading-7 tracking-tight">Option 1</div>
                        </div>
                    </div> */}
                    <div className="grow shrink basis-0 h-14 pl-6 pr-4 py-2 bg-white justify-center items-center gap-1 flex">
                        <div className="grow shrink basis-0 text-gray-950 text-base font-normal font-['Open Sans'] leading-7 tracking-tight">Components</div>
                    </div>
                </div>
                <div className="w-[264px] rounded-lg justify-center items-center gap-1 inline-flex">
                    {/* <div className="w-[264px] flex-col justify-start items-start inline-flex">
                        <div className="self-stretch pl-10 py-2 justify-center items-center gap-1 inline-flex">
                            <div className="grow shrink basis-0 text-gray-700 text-base font-normal font-['Open Sans'] leading-7 tracking-tight">Option 1</div>
                        </div>
                        <div className="self-stretch pl-10 py-2 justify-center items-center gap-1 inline-flex">
                            <div className="grow shrink basis-0 text-gray-700 text-base font-normal font-['Open Sans'] leading-7 tracking-tight">Option 1</div>
                        </div>
                        <div className="self-stretch pl-10 py-2 justify-center items-center gap-1 inline-flex">
                            <div className="grow shrink basis-0 text-gray-700 text-base font-normal font-['Open Sans'] leading-7 tracking-tight">Option 1</div>
                        </div>
                        <div className="self-stretch pl-10 py-2 justify-center items-center gap-1 inline-flex">
                            <div className="grow shrink basis-0 text-gray-700 text-base font-normal font-['Open Sans'] leading-7 tracking-tight">Option 1</div>
                        </div>
                        <div className="self-stretch pl-10 py-2 justify-center items-center gap-1 inline-flex">
                            <div className="grow shrink basis-0 text-gray-700 text-base font-normal font-['Open Sans'] leading-7 tracking-tight">Option 1</div>
                        </div>
                    </div> */}
                    <div className="grow shrink basis-0 h-14 pl-6 pr-4 py-2 bg-white justify-center items-center gap-1 flex">
                        <div className="grow shrink basis-0 text-gray-950 text-base font-normal font-['Open Sans'] leading-7 tracking-tight">Patterns & Templates</div>
                    </div>
                </div>
                <div className="w-[264px] rounded-lg justify-center items-center gap-1 inline-flex">
                    {/* <div className="w-[264px] flex-col justify-start items-start inline-flex">
                        <div className="self-stretch pl-10 py-2 justify-center items-center gap-1 inline-flex">
                            <div className="grow shrink basis-0 text-gray-700 text-base font-normal font-['Open Sans'] leading-7 tracking-tight">Option 1</div>
                        </div>
                        <div className="self-stretch pl-10 py-2 justify-center items-center gap-1 inline-flex">
                            <div className="grow shrink basis-0 text-gray-700 text-base font-normal font-['Open Sans'] leading-7 tracking-tight">Option 1</div>
                        </div>
                        <div className="self-stretch pl-10 py-2 justify-center items-center gap-1 inline-flex">
                            <div className="grow shrink basis-0 text-gray-700 text-base font-normal font-['Open Sans'] leading-7 tracking-tight">Option 1</div>
                        </div>
                        <div className="self-stretch pl-10 py-2 justify-center items-center gap-1 inline-flex">
                            <div className="grow shrink basis-0 text-gray-700 text-base font-normal font-['Open Sans'] leading-7 tracking-tight">Option 1</div>
                        </div>
                        <div className="self-stretch pl-10 py-2 justify-center items-center gap-1 inline-flex">
                            <div className="grow shrink basis-0 text-gray-700 text-base font-normal font-['Open Sans'] leading-7 tracking-tight">Option 1</div>
                        </div>
                    </div> */}
                    <div className="grow shrink basis-0 h-14 pl-6 pr-4 py-2 bg-white justify-center items-center gap-1 flex">
                        <div className="grow shrink basis-0 text-gray-950 text-base font-normal font-['Open Sans'] leading-7 tracking-tight">Visualization & Illustration</div>
                    </div>
                </div>
            </div>
            <div className="opacity-0 w-2 h-[800px] relative">
                <div className="w-1 h-[800px] left-[2px] top-0 absolute bg-gray-500 rounded-lg" />
                <div className="w-2 h-[396px] left-0 top-0 absolute bg-gray-200 rounded-lg" />
            </div>
        </div> 
        </div>
            )
}

export default Sidebar;