import { useState } from 'react';
import { Link } from 'react-router-dom';
import ChevronLightUp from '../../assets/images/Chevron-light-up.svg';
import Chevron from '../../assets/images/Chevron-light.svg';

const Sidebar = () => {
  const [drop1, setDrop1] = useState(false);
  const [drop2, setDrop2] = useState(false);
  const [drop3, setDrop3] = useState(false);
  const [drop4, setDrop4] = useState(false);
  const [drop5, setDrop5] = useState(false);

  const toggleChevron1 = () => {
    setDrop1((prevDrop) => !prevDrop);
  };
  const toggleChevron2 = () => {
    setDrop2((prevDrop) => !prevDrop);
  };
  const toggleChevron3 = () => {
    setDrop3((prevDrop) => !prevDrop);
  };
  const toggleChevron4 = () => {
    setDrop4((prevDrop) => !prevDrop);
  };
  const toggleChevron5 = () => {
    setDrop5((prevDrop) => !prevDrop);
  };
  return (
    <div className="pt-8 pr-4">
      <div className="w-[280px] h-[800px] pr-1 pt-2 border-r border-border-default justify-start items-start gap-1 inline-flex">
        <div className="flex-col justify-start items-start gap-1 inline-flex">
          <div className="w-[264px] rounded-lg justify-center items-center gap-1 inline-flex">
            {drop1 ? (
              <div className="w-[264px] flex-col justify-start items-start inline-flex">
                <div className="hover:bg-border-default hover:rounded-lg grow shrink basis-0 h-14 pl-6 pr-4 py-2 bg-background-default justify-center items-center gap-1 flex">
                  <div className="grow shrink basis-0 text-text-default text-base font-normal font-openSans leading-7 tracking-tight">
                    About Sistent
                  </div>
                  <div className="w-6 h-6 relative">
                    <img src={drop1 ? ChevronLightUp : Chevron} alt="/" onClick={toggleChevron1} />
                  </div>
                </div>
                <div className="hover:bg-border-default hover:rounded-lg self-stretch pl-10 py-2 justify-center items-center gap-1 inline-flex">
                  <div className="grow shrink basis-0 text-text-secondary text-base font-normal font-openSans leading-7 tracking-tight">
                    Introduction
                  </div>
                </div>
                <div className="hover:bg-border-default hover:rounded-lg self-stretch pl-10 py-2 justify-center items-center gap-1 inline-flex">
                  <div className="grow shrink basis-0 text-text-secondary text-base font-normal font-openSans leading-7 tracking-tight">
                    Principles
                  </div>
                </div>
                <div className="hover:bg-border-default hover:rounded-lg self-stretch pl-10 py-2 justify-center items-center gap-1 inline-flex">
                  <div className="grow shrink basis-0 text-text-secondary text-base font-normal font-openSans leading-7 tracking-tight">
                    Contribution
                  </div>
                </div>
                <div className="hover:bg-border-default hover:rounded-lg self-stretch pl-10 py-2 justify-center items-center gap-1 inline-flex">
                  <div className="grow shrink basis-0 text-text-secondary text-base font-normal font-openSans leading-7 tracking-tight">
                    Support
                  </div>
                </div>
                <div className="hover:bg-border-default hover:rounded-lg self-stretch pl-10 py-2 justify-center items-center gap-1 inline-flex">
                  <div className="grow shrink basis-0 text-text-secondary text-base font-normal font-openSans leading-7 tracking-tight">
                    Case Studies
                  </div>
                </div>
              </div>
            ) : (
              <div className="hover:bg-border-default hover:rounded-lg grow shrink basis-0 h-14 pl-6 pr-4 py-2 bg-background-default justify-center items-center gap-1 flex">
                <div className="grow shrink basis-0 text-text-default text-base font-normal font-openSans leading-7 tracking-tight">
                  About Sistent
                </div>
                <div className="w-6 h-6 relative">
                  <img src={drop1 ? ChevronLightUp : Chevron} alt="/" onClick={toggleChevron1} />
                </div>
              </div>
            )}
          </div>
          <div className="w-[264px] bg-background-default rounded-lg justify-center items-center gap-1 inline-flex">
            {drop2 ? (
              <div className="w-[264px] flex-col justify-start items-start inline-flex">
                <div className="hover:bg-border-default hover:rounded-lg grow shrink basis-0 h-14 pl-6 pr-4 py-2 justify-center items-center gap-36 flex">
                  <div className="grow shrink basis-0 text-text-default text-base font-normal font-openSans leading-7 tracking-tight">
                    Identity
                  </div>
                  <div className="w-6 h-6 relative">
                    <img src={drop2 ? ChevronLightUp : Chevron} alt="/" onClick={toggleChevron2} />
                  </div>
                </div>
                <div className="hover:bg-border-default hover:rounded-lg self-stretch pl-10 py-2 justify-center items-center gap-1 inline-flex">
                  <Link
                    to="/identity/color"
                    className="grow shrink basis-0 text-text-secondary text-base font-normal font-openSans leading-7 tracking-tight"
                  >
                    Color
                  </Link>
                </div>
                <div className="hover:bg-border-default hover:rounded-lg self-stretch pl-10 py-2 justify-center items-center gap-1 inline-flex">
                  <Link
                    to="/identity/typography"
                    className="grow shrink basis-0 text-text-secondary text-base font-normal font-openSans leading-7 tracking-tight"
                  >
                    Typography
                  </Link>
                </div>
                <div className="hover:bg-border-default hover:rounded-lg self-stretch pl-10 py-2 justify-center items-center gap-1 inline-flex">
                  <Link
                    to="/identity/spacing"
                    className="grow shrink basis-0 text-text-secondary text-base font-normal font-openSans leading-7 tracking-tight"
                  >
                    Spacing
                  </Link>
                </div>
                <div className="hover:bg-border-default hover:rounded-lg self-stretch pl-10 py-2 justify-center items-center gap-1 inline-flex">
                  <Link
                    to="/identity/layouts"
                    className="grow shrink basis-0 text-text-secondary text-base font-normal font-openSans leading-7 tracking-tight"
                  >
                    Page Layouts
                  </Link>
                </div>
                <div className="hover:bg-border-default hover:rounded-lg self-stretch pl-10 py-2 justify-center items-center gap-1 inline-flex">
                  <Link
                    to="/identity/elevation"
                    className="grow shrink basis-0 text-text-secondary text-base font-normal font-openSans leading-7 tracking-tight"
                  >
                    Elevation
                  </Link>
                </div>
              </div>
            ) : (
              <div className="hover:bg-border-default hover:rounded-lg grow shrink basis-0 h-14 pl-6 pr-4 py-2 justify-center items-center gap-1 flex">
                <div className="grow shrink basis-0 text-text-default text-base font-normal font-openSans leading-7 tracking-tight">
                  Identity
                </div>
                <div className="w-6 h-6 relative">
                  <img src={drop2 ? ChevronLightUp : Chevron} alt="/" onClick={toggleChevron2} />
                </div>
              </div>
            )}
          </div>
          <div className="w-[264px] rounded-lg justify-center items-center gap-1 inline-flex">
            {drop3 ? (
              <div className="w-[264px] flex-col justify-start items-start inline-flex">
                <div className="hover:bg-border-default hover:rounded-lg grow shrink basis-0 h-14 pl-6 pr-4 py-2 bg-background-default justify-center items-center gap-1 flex">
                  <div className="grow shrink basis-0 text-text-default text-base font-normal font-openSans leading-7 tracking-tight">
                    Components
                  </div>
                  <div className="w-6 h-6 relative">
                    <img src={drop3 ? ChevronLightUp : Chevron} alt="/" onClick={toggleChevron3} />
                  </div>
                </div>
                <div className="hover:bg-border-default hover:rounded-lg self-stretch pl-10 py-2 justify-center items-center gap-1 inline-flex">
                  <div className="grow shrink basis-0 text-text-secondary text-base font-normal font-openSans leading-7 tracking-tight">
                    Option 1
                  </div>
                </div>
                <div className="hover:bg-border-default hover:rounded-lg self-stretch pl-10 py-2 justify-center items-center gap-1 inline-flex">
                  <div className="grow shrink basis-0 text-text-secondary text-base font-normal font-openSans leading-7 tracking-tight">
                    Option 1
                  </div>
                </div>
                <div className="hover:bg-border-default hover:rounded-lg self-stretch pl-10 py-2 justify-center items-center gap-1 inline-flex">
                  <div className="grow shrink basis-0 text-text-secondary text-base font-normal font-openSans leading-7 tracking-tight">
                    Option 1
                  </div>
                </div>
                <div className="hover:bg-border-default hover:rounded-lg self-stretch pl-10 py-2 justify-center items-center gap-1 inline-flex">
                  <div className="grow shrink basis-0 text-text-secondary text-base font-normal font-openSans leading-7 tracking-tight">
                    Option 1
                  </div>
                </div>
                <div className="hover:bg-border-default hover:rounded-lg self-stretch pl-10 py-2 justify-center items-center gap-1 inline-flex">
                  <div className="grow shrink basis-0 text-text-secondary text-base font-normal font-openSans leading-7 tracking-tight">
                    Option 1
                  </div>
                </div>
              </div>
            ) : (
              <div className="hover:bg-border-default hover:rounded-lg grow shrink basis-0 h-14 pl-6 pr-4 py-2 bg-background-default justify-center items-center gap-1 flex">
                <div className="grow shrink basis-0 text-text-default text-base font-normal font-openSans leading-7 tracking-tight">
                  Components
                </div>
                <div className="w-6 h-6 relative">
                  <img src={drop3 ? ChevronLightUp : Chevron} alt="/" onClick={toggleChevron3} />
                </div>
              </div>
            )}
          </div>
          <div className="w-[264px] rounded-lg justify-center items-center gap-1 inline-flex">
            {drop4 ? (
              <div className="w-[264px] flex-col justify-start items-start inline-flex">
                <div className="hover:bg-border-default hover:rounded-lg grow shrink basis-0 h-14 pl-6 pr-4 py-2 bg-background-default justify-center items-center gap-1 flex">
                  <div className="grow shrink basis-0 text-text-default text-base font-normal font-openSans leading-7 tracking-tight">
                    Patterns & Templates
                  </div>
                  <div className="w-6 h-6 relative">
                    <img src={drop4 ? ChevronLightUp : Chevron} alt="/" onClick={toggleChevron4} />
                  </div>
                </div>
                <div className="hover:bg-border-default hover:rounded-lg self-stretch pl-10 py-2 justify-center items-center gap-1 inline-flex">
                  <div className="grow shrink basis-0 text-text-secondary text-base font-normal font-openSans leading-7 tracking-tight">
                    Option 1
                  </div>
                </div>
                <div className="hover:bg-border-default hover:rounded-lg self-stretch pl-10 py-2 justify-center items-center gap-1 inline-flex">
                  <div className="grow shrink basis-0 text-text-secondary text-base font-normal font-openSans leading-7 tracking-tight">
                    Option 1
                  </div>
                </div>
                <div className="hover:bg-border-default hover:rounded-lg self-stretch pl-10 py-2 justify-center items-center gap-1 inline-flex">
                  <div className="grow shrink basis-0 text-text-secondary text-base font-normal font-openSans leading-7 tracking-tight">
                    Option 1
                  </div>
                </div>
                <div className="hover:bg-border-default hover:rounded-lg self-stretch pl-10 py-2 justify-center items-center gap-1 inline-flex">
                  <div className="grow shrink basis-0 text-text-secondary text-base font-normal font-openSans leading-7 tracking-tight">
                    Option 1
                  </div>
                </div>
                <div className="hover:bg-border-default hover:rounded-lg self-stretch pl-10 py-2 justify-center items-center gap-1 inline-flex">
                  <div className="grow shrink basis-0 text-text-secondary text-base font-normal font-openSans leading-7 tracking-tight">
                    Option 1
                  </div>
                </div>
              </div>
            ) : (
              <div className="hover:bg-border-default hover:rounded-lg grow shrink basis-0 h-14 pl-6 pr-4 py-2 bg-background-default justify-center items-center gap-1 flex">
                <div className="grow shrink basis-0 text-text-default text-base font-normal font-openSans leading-7 tracking-tight">
                  Patterns & Templates
                </div>
                <div className="w-6 h-6 relative">
                  <img src={drop4 ? ChevronLightUp : Chevron} alt="/" onClick={toggleChevron4} />
                </div>
              </div>
            )}
          </div>
          <div className="w-[264px] rounded-lg justify-center items-center gap-1 inline-flex">
            {drop5 ? (
              <div className="w-[264px] flex-col justify-start items-start inline-flex">
                <div className="hover:bg-border-default hover:rounded-lg grow shrink basis-0 h-14 pl-6 pr-4 py-2 bg-background-default justify-center items-center gap-1 flex">
                  <div className="grow shrink basis-0 text-text-default text-base font-normal font-openSans leading-7 tracking-tight">
                    Visualization & Illustration
                  </div>
                  <div className="w-6 h-6 relative">
                    <img src={drop5 ? ChevronLightUp : Chevron} alt="/" onClick={toggleChevron5} />
                  </div>
                </div>
                <div className="hover:bg-border-default hover:rounded-lg self-stretch pl-10 py-2 justify-center items-center gap-1 inline-flex">
                  <div className="grow shrink basis-0 text-text-secondary text-base font-normal font-openSans leading-7 tracking-tight">
                    Option 1
                  </div>
                </div>
                <div className="hover:bg-border-default hover:rounded-lg self-stretch pl-10 py-2 justify-center items-center gap-1 inline-flex">
                  <div className="grow shrink basis-0 text-text-secondary text-base font-normal font-openSans leading-7 tracking-tight">
                    Option 1
                  </div>
                </div>
                <div className="hover:bg-border-default hover:rounded-lg self-stretch pl-10 py-2 justify-center items-center gap-1 inline-flex">
                  <div className="grow shrink basis-0 text-text-secondary text-base font-normal font-openSans leading-7 tracking-tight">
                    Option 1
                  </div>
                </div>
                <div className="hover:bg-border-default hover:rounded-lg self-stretch pl-10 py-2 justify-center items-center gap-1 inline-flex">
                  <div className="grow shrink basis-0 text-text-secondary text-base font-normal font-openSans leading-7 tracking-tight">
                    Option 1
                  </div>
                </div>
                <div className="hover:bg-border-default hover:rounded-lg self-stretch pl-10 py-2 justify-center items-center gap-1 inline-flex">
                  <div className="grow shrink basis-0 text-text-secondary text-base font-normal font-openSans leading-7 tracking-tight">
                    Option 1
                  </div>
                </div>
              </div>
            ) : (
              <div className="hover:bg-border-default hover:rounded-lg grow shrink basis-0 h-14 pl-6 pr-4 py-2 bg-background-default justify-center items-center gap-1 flex">
                <div className="grow shrink basis-0 text-text-default text-base font-normal font-openSans leading-7 tracking-tight">
                  Visualization & Illustration
                </div>
                <div className="w-6 h-6 relative">
                  <img src={drop5 ? ChevronLightUp : Chevron} alt="/" onClick={toggleChevron5} />
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="opacity-0 w-2 h-[800px] relative">
          <div className="w-1 h-[800px] left-[2px] top-0 absolute bg-border-strong rounded-lg" />
          <div className="w-2 h-[396px] left-0 top-0 absolute bg-border-default rounded-lg">
            Hello
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
