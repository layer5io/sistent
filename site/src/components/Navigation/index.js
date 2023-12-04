import { useContext } from 'react';
import Search from '../../assets/images/Search.svg';
import SearchDark from '../../assets/images/SearchDark.svg';
import Weather from '../../assets/images/Weather.svg';
import WeatherDark from '../../assets/images/WeatherDark.svg';
import ThemeContext from '../Theme';

const Navbar = () => {
  const theme = useContext(ThemeContext);

  return (
    <>
      <div className=" w-[1440px] h-[100px] px-10 py-6 bg-background-default justify-between items-center inline-flex">
        <div className="h-12 justify-center items-center gap-4 flex">
          <div className="w-12 h-12 relative rounded-lg border border-border-strong" />
          <div className="grow shrink basis-0">
            <span className="text-text-default text-2xl font-bold font-qanelas leading-loose">
              Sistent{' '}
            </span>
            <span className="text-text-default text-2xl font-medium font-qanelas-medium leading-loose">
              Design System
            </span>
          </div>
        </div>
        <div className="justify-start items-center gap-8 flex">
          <div className="justify-start items-start gap-8 flex">
            <div className="w-[148px] p-2 rounded-lg border border-text-brand justify-center items-center gap-1 flex">
              <div className="grow shrink basis-0 text-center text-text-brand text-base font-normal font-openSans leading-7">
                Guidelines
              </div>
            </div>
            <div className="w-[148px] px-4 py-2 rounded-lg border border-text-brand justify-center items-center gap-1 flex">
              <div className="grow shrink basis-0 text-center text-text-brand text-base font-normal font-openSans leading-7">
                Core Elements
              </div>
            </div>
            <div className="w-[148px] p-2 rounded-lg border border-text-brand justify-center items-center gap-1 flex">
              <div className="grow shrink basis-0 text-center text-text-brand text-base font-normal font-openSans leading-7">
                Resources
              </div>
            </div>
          </div>
          <div className="justify-end items-center gap-8 flex">
            <div className="w-6 h-6 relative">
              <img src={theme.dark ? SearchDark : Search} />
            </div>
            <div className="w-6 h-6 justify-center items-center flex">
              <div className="w-6 h-6 relative flex-col justify-start items-start flex">
                <img src={theme.dark ? WeatherDark : Weather} onClick={theme.toggleDark} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr className="border-border-default border-solid" />
    </>
  );
};

export default Navbar;
