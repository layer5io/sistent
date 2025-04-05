import React from "react";
import Next from '../Next';
import Previous from '../Previous';
import Sidebar from '../Sidebar';
import SubText from '../SubText';
import SubContent from '../SubContent';

const items = [
    {
     title: "Introduction"   
    },
    {
     title: "Color Anatomy"   
    },
    {
     title: "Layer Hierarchy"   
    },
    {
     title: "The Basics"   
    },
    {
     title: "Green Color Accessibility"   
    }
]

const basics = [
    {
        title:'Theme',
        description:'By definition, a theme is a cohesive and consistent look and feel for a product. This consistent look can be achieved with the use of harmonious color palettes, legible fonts and layout patterns. Currently, sistent outlines specifications for light and dark themes.'
    },
    {
        title:'Value',
        description:'A value is the unique visual attribute assigned to a token through the use of themes. This could range from hex codes to rgba values which are used to highlight specific colors in any given instance. We highly recommend that no exact values be referenced anywhere in the design in order to avoid errors and ensure consistency. Instead, tokens should be used to curate and implement the reusable values. More on tokens next.'
    },
    {
        title:'Tokens',
        description:'Tokens can be regarded as a shared language between design and development for communicating detailed information about how to build user interfaces. Generally, a rule of thumb is to represent the context (background, text, component), role (success, warning, brand, inverse), and modifier(s) (secondary, tertiary, hover) in a string of text that will represent set values gotten from the colors in the color palette.'
    },
    {
        title:'Role',
        description:'Roles are parameters that specify the context that colors are being applied to and while different roles can share the same value, the token structure means that they will have different use cases. These values can be different though depending on the current theme.'
    }
]

const Overview = ()=> {
    return (
        <>
        <Sidebar items={items}/>
        <div className="py-[2.5rem]">
        <SubContent
        SubContent="In order to achieve the aim of maintaining a consistent and engaging digital interface across Layer5, whether it is in the form of websites, applications, or experiences, a detailed explanation of color application along with practical use cases is needed. To this end, the following concepts help to shape a suitable identity as we aim for balance throughout our User Interface."
        />
        </div>
        <SubText 
        SubHeading="Introduction"
        SubContent="When the color palette is accurately put to use, it ensures a recognizable consistency in Layer5’s array of digital interfaces and products. This is made possible due to adherence to well defined rules which though specific, are also flexible and give ample room for professionals to curate appealing solutions across all themes."
        length="2"
        />
        <div className='pt-[2.5rem]'>
        <SubText 
        SubHeading="Color Anatomy"
        SubContent="Sistent’s default themes are derived from Layer5’s color palette of which the Keppel Green color serves as the dominant primary action color with subtle shifts in value to enable the required visual accessibility as recommended in the WCAG (Web Content Accessibility Guidelines) 2.1 compliance standards. It is also sometimes combined with Saffron Yellow and Caribbean Green colors accentuate other parts of the user interface like CTA buttons as well as illustrations and icons."
        length="2"
        height="35.25"
        >
        <SubContent
        SubContent="The Charcoal color as well as another accent grey serve as neutrals to complement these greens and create harmonious implementations. These five colors combine to form a foundation for the color system."
        />
        <div className='h-56 py-[1.5rem]'></div>
        </SubText>
        </div>
        <SubText
        SubHeading='Layer Hierarchy'
        SubContent='For backgrounds and surfaces, colors in the neutral palettes are used cohesively to create depth and spatial associations. This hierarchical pattern defines the logic of how colors stack on top of each other in a UI when implementing Sistent themes. This logical pattern goes beyond just themes but is also built across components and accounted for in suggested color tokens as well.'
        length='2'
        height='90.25'
        >
        <SubContent 
        SubContent='There is an alternate relationship between the layer hierarchy in both light and dark themes:
        In the light theme, as layers are stacked towards the topmost surface, they become progressively darker.
        In the dark theme, as layers are stacked towards the topmost surface, they become progressively lighter.
        This means, in effect, that while there is a fine blend of surfaces on any given UI theme, there is also strict adherence to accessibility guidelines and recommendations.'
        />
        <div className='py-[1.5rem] h-[16rem]'></div>
        <SubContent
        SubContent="A similar hierarchy pattern as above is adopted for brilliantly colored backgrounds like brand and alert colors when it comes to interactive states. So as interactions progress from default to hover to pressed, this same principle may apply. However, when trying to establish prominence for other user interface needs, an inverse relationship may be more suitable. Hence, for these brilliant colors:  
        In the light theme, as prominence reduces, layers become progressively lighter.
        In the dark theme, as prominence reduces, layers become progressively darker."
        />
        <div className='py-[1.5rem] h-[26rem]'></div>
        </SubText>
        <div className='pt-[2.5rem]'>
        <SubText
        length="2"
        height="49"
        SubHeading="The Basics"
        SubContent="Let’s start with a few of the common terms that we will come across frequently, as understanding what they mean will inform us of applicable use cases and proper procedures that should not be overlooked."
        >
        {basics && basics.map((basic)=>{
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
        </div>
        <div className='pt-[6.25rem] gap-4 flex'>
            <Previous content="Case Studies" parent="identity" child="color" subchild=""/>
            <div className='h-[24px] w-[16px]'/>
            <Next content="Color System: Guidelines" parent="identity" child="color" subchild="guidance" />
        </div>
        </>
    )
}

export default Overview;

// import React from 'react';
// import Sidebar from '../Sidebar';
// import SubContent from '../SubContent';
// import SubText from '../SubText';
// import SubHeading from '../SubHeading';
// import Previous from '../Previous';
// import Next from '../Next';

// const items = [
//     {
//      title: "The Basics"   
//     },
//     {
//      title: "Type Scale"   
//     }
// ]

// const basicItems = [
//     {
//         title: "Typeface",
//         description:"A typeface is a set of letters, numbers, and accessories that have common design features. These characters are usually grouped into families and used in relation to each other to ensure uniform text representation in designs and forms of text that are relative to each other. Qanelas Soft, Times New Roman, Merriweather, and Roboto are all examples of typefaces."
//     },
//     {
//         title: "Font",
//         description:"Often wrongly used interchangeably with typeface, a font refers to variations of a typeface. So this includes the weight, size, line height, tracking (letter spacing), and any other features that are added to a typeface for it to function in a certain capacity. A key relationship between a typeface and a font is that characters in a typeface can be modified to form different fonts."
//     },
//     {
//         title: "Line Height",
//         description:"Line height is mostly used to refer to the distance between lines of text. WCAG standards for line height recommend a line height that is at least 1.5 times the chosen font size, especially for small text sizes. For larger fonts, however, evidence has shown that anything between 1.2 and 1.5 times the font size might also be appropriate, especially considering the fact that most large fonts used for headings and subheadings tend not to exceed a single line of text."
//     },
// ]

// const Overview = ()=> {
//     return (
//         <>
//         <Sidebar items={items}/>
//         <div className="py-[2.5rem]">
//         <SubContent
//         SubContent= "There are a couple of things to consider when preparing to apply typography to any interface."
//         />
//         </div>
//         <SubText SubHeading="The Basics" height="38.5">
//         {basicItems && basicItems.map((basic)=>{
//             return (
//                 <div key={basic.title}>
//                 <SubContent
//                 SubContent={basic.title}
//                 font="bold"
//                 // fontType="Qanelas Soft"
//                 />
//                 <SubContent
//                 SubContent={basic.description}
//                 />
//                 </div>)
//         })}
//         </SubText> 
//         <div className='pt-[2.5rem]'>
//         <SubText SubHeading="Type Scale"
//         SubContent="Type scale with respect to typography points to the set of incremental steps or rations that dictate how font sizes increase or decrease as you move up or down a given hierarchy. This increase or decrease is usually originated from a base size that serves as the defining font within the scale. These steps create a systemic progression of font sizes that maintain harmony and visual balance within a system because of the relationship they share with the base font."
//         height="61.5"
//         >
//         <SubContent
//         SubContent="A modular type scale can be generated using harmonious values like the golden ratio, the major third, the perfect fifth, and so on."
//         />
//         <div className="py-[1.5rem] bg-gray-500"></div>
//         <SubContent
//         SubContent="Because of the progressive increase or decrease that governs the content of a type scale, it makes it easier to obtain consistent, related, and harmonious font sizes that can each be used for specific needs when curating digital interfaces."
//         />
//         </SubText> 
//         </div>
//         <div className='pt-[6.25rem] gap-4 flex'>
//             <Previous content="Case Studies"  parent="identity" child="typography" subchild=""/>
//             <div className='h-[24px] w-[16px]'/>
//             <Next content="Typography: Guidelines"  parent="identity" child="typography" subchild="guidance"/>
//         </div> 
//         </>
//     )
// }
 
// export default Overview;
