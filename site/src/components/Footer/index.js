import React from 'react';

const Footer = () => {
  return (
    <div className="ml-[17.5rem] pt-[5rem]">
      <hr className="border-gray-200 border-solid" />
      <div className="w-[1160px] h-[400px] pl-10 pr-20 justify-between items-start inline-flex">
        <div className="h-[236px] pt-10 justify-between items-start flex gap-32">
          <div className="justify-start items-start gap-8 flex">
            <div className="w-12 h-12 relative rounded-lg border border-gray-500" />
            <div className="grow shrink basis-0 w-[380px] h-auto justify-center items-center gap-1 flex">
              <div className="grow shrink basis-0 text-gray-950 text-base font-normal font-['Open Sans'] leading-7 tracking-tight">
                Sistent is a flexible system of guidelines, components, and tools that highlight
                best practices of user interface design. Supported by open-source code, Sisten
                Design System demistifies collaboration between designers and developers making the
                workflow seamless and enabling teams to create beautiful solutions.
              </div>
            </div>
          </div>
          <div className="h-[156px] justify-start items-start gap-16 flex">
            <div className="grow shrink basis-0 flex-col justify-start items-start gap-1 inline-flex">
              <div className="self-stretch justify-center items-center gap-1 inline-flex">
                <div className="grow shrink basis-0 text-gray-950 text-base font-normal font-['Open Sans'] leading-7 tracking-tight">
                  GitHub
                </div>
              </div>
              <div className="self-stretch justify-center items-center gap-1 inline-flex">
                <div className="grow shrink basis-0 text-gray-950 text-base font-normal font-['Open Sans'] leading-7 tracking-tight">
                  Twitter
                </div>
              </div>
              <div className="self-stretch justify-center items-center gap-1 inline-flex">
                <div className="grow shrink basis-0 text-gray-950 text-base font-normal font-['Open Sans'] leading-7 tracking-tight">
                  YouTube
                </div>
              </div>
              <div className="self-stretch justify-center items-center gap-1 inline-flex">
                <div className="grow shrink basis-0 text-gray-950 text-base font-normal font-['Open Sans'] leading-7 tracking-tight">
                  LinkedIn
                </div>
              </div>
            </div>
            <div className="w-[100px] flex-col justify-start items-start gap-1 inline-flex">
              <div className="self-stretch justify-center items-center gap-1 inline-flex">
                <div className="grow shrink basis-0 text-gray-950 text-base font-normal font-['Open Sans'] leading-7 tracking-tight">
                  Contact Us
                </div>
              </div>
              <div className="self-stretch justify-center items-center gap-1 inline-flex">
                <div className="grow shrink basis-0 text-gray-950 text-base font-normal font-['Open Sans'] leading-7 tracking-tight">
                  Privacy
                </div>
              </div>
              <div className="self-stretch justify-center items-center gap-1 inline-flex">
                <div className="grow shrink basis-0 text-gray-950 text-base font-normal font-['Open Sans'] leading-7 tracking-tight">
                  Terms of use
                </div>
              </div>
              <div className="self-stretch justify-center items-center gap-1 inline-flex">
                <div className="grow shrink basis-0 text-gray-950 text-base font-normal font-['Open Sans'] leading-7 tracking-tight">
                  Accessibility
                </div>
              </div>
              <div className="self-stretch justify-center items-center gap-1 inline-flex">
                <div className="grow shrink basis-0 text-gray-950 text-base font-normal font-['Open Sans'] leading-7 tracking-tight">
                  layer5.io
                </div>
              </div>
            </div>
            <div className="w-[200px] flex-col justify-start items-start gap-1 inline-flex">
              <div className="self-stretch justify-center items-center gap-1 inline-flex">
                <div className="grow shrink basis-0 text-gray-950 text-base font-normal font-['Open Sans'] leading-7 tracking-tight">
                  Any questions? Ask on{' '}
                  <a href="https://discuss.layer5.io">https://discuss.layer5.io</a> or open an issue
                  on GitHub.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
