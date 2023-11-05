import React from 'react';
import Sidebar from '../Sidebar';
import SubContent from '../SubContent';
import SubText from '../SubText';
import SubHeading from '../SubHeading';
import Previous from '../Previous';
import Next from '../Next';

const items = [
    {
     title: "The Basics"   
    },
    {
     title: "Type Scale"   
    }
]

const basicItems = [
    {
        title: "Typeface",
        description:"A typeface is a set of letters, numbers, and accessories that have common design features. These characters are usually grouped into families and used in relation to each other to ensure uniform text representation in designs and forms of text that are relative to each other. Qanelas Soft, Times New Roman, Merriweather, and Roboto are all examples of typefaces."
    },
    {
        title: "Font",
        description:"Often wrongly used interchangeably with typeface, a font refers to variations of a typeface. So this includes the weight, size, line height, tracking (letter spacing), and any other features that are added to a typeface for it to function in a certain capacity. A key relationship between a typeface and a font is that characters in a typeface can be modified to form different fonts."
    },
    {
        title: "Line Height",
        description:"Line height is mostly used to refer to the distance between lines of text. WCAG standards for line height recommend a line height that is at least 1.5 times the chosen font size, especially for small text sizes. For larger fonts, however, evidence has shown that anything between 1.2 and 1.5 times the font size might also be appropriate, especially considering the fact that most large fonts used for headings and subheadings tend not to exceed a single line of text."
    },
]

const Overview = ()=> {
    return (
        <>
        <Sidebar items={items}/>
        <div className="py-[2.5rem]">
        <SubContent
        SubContent= "There are a couple of things to consider when preparing to apply typography to any interface."
        />
        </div>
        <SubText SubHeading="The Basics" height="38.5">
        {basicItems && basicItems.map((basic)=>{
            return (
                <div key={basic.title}>
                <SubContent
                SubContent={basic.title}
                font="bold"
                // fontType="Qanelas Soft"
                />
                <SubContent
                SubContent={basic.description}
                />
                </div>)
        })}
        </SubText> 
        <div className='pt-[2.5rem]'>
        <SubText SubHeading="Type Scale"
        SubContent="Type scale with respect to typography points to the set of incremental steps or rations that dictate how font sizes increase or decrease as you move up or down a given hierarchy. This increase or decrease is usually originated from a base size that serves as the defining font within the scale. These steps create a systemic progression of font sizes that maintain harmony and visual balance within a system because of the relationship they share with the base font."
        height="61.5"
        >
        <SubContent
        SubContent="A modular type scale can be generated using harmonious values like the golden ratio, the major third, the perfect fifth, and so on."
        />
        <div className="py-[1.5rem] bg-gray-500"></div>
        <SubContent
        SubContent="Because of the progressive increase or decrease that governs the content of a type scale, it makes it easier to obtain consistent, related, and harmonious font sizes that can each be used for specific needs when curating digital interfaces."
        />
        </SubText> 
        </div>
        <div className='pt-[6.25rem] gap-4 flex'>
            <Previous content="Case Studies"  parent="identity" child="typography" subchild=""/>
            <div className='h-[24px] w-[16px]'/>
            <Next content="Typography: Guidelines"  parent="identity" child="typography" subchild="guidance"/>
        </div> 
        </>
    )
}

export default Overview;