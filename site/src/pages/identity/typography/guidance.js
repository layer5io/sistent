import Next from '../Next';
import Previous from '../Previous';
import Sidebar from '../Sidebar';
import SubContent from '../SubContent';
import SubText from '../SubText';

const items = [
  {
    title: 'Type Scale Customization'
  },
  {
    title: 'Font Pairing'
  }
];

const Guidance = () => {
  return (
    <>
      <Sidebar items={items} />
      <div className="py-[2.5rem]">
        <SubContent SubContent="After a suitable typeface has been chosen, it needs to be arranged to form the various fonts that will be used to address different text needs across designs." />
      </div>
      <SubText
        length="2"
        height="123.25"
        SubHeading="Type Scale Customization"
        SubContent="It is not compulsory that all of the sizes in a type scale be used. However, when choosing a size from the scale, ensure to identify possible use cases in proposed designs to ensure efficiency and reduce any chances of having redundant text styles. Remember that less is more and a particular font size can function in multiple capacities. After making a selection of sizes, if there is subsequent need for an additional size because of a recurring use case, then a suitable corresponding size can be chosen from the scale. This is a better practice."
      >
        <SubContent SubContent="For Layer5, we utilized the major third ratio to generate at a type scale that we could work with." />
        <div className="py-[1.5rem] h-[40.5rem]"></div>
        <SubContent SubContent="From this type scale, seven text sizes were selected to account for various needs in our websites and products. These sizes were further modified with suitable font specifications that will provide accurate guidance for usage across implementations." />
        <div className="py-[1.5rem] h-[30rem]"></div>
        <SubContent SubContent="To create even more consistent designs, it is important to consider typography with spacing and spatial proportions in mind. As a rule of thumb, it is advisable that values obtained from the modular scale are rounded off to a multiple of the base space value being used across a set of designs." />
        <SubContent SubContent="In keeping with this, the values of the above sizes are noticeably distinct from the original type scale that it was derived from. This is because our base spacing value is 8px and as such, all the text sizes have been rounded off to a multiple of eight. This same principle is applied to the accompanying line heights of these text sizes as well." />
        <div>
          <SubContent SubContent="Layout Considerations" font="bold" />
          <SubContent SubContent="For any digital product or websites being created, one important thing to be considered is the responsive nature of the design, which translates to what the said design will look like across different screen sizes (desktop, tablet, and mobile). To this end, it is also imperative that the text styles selected account for these different layout sizes as well. As stated earlier, text styles can be used for multiple needs across a given design. The important thing is that necessary information is accurately conveyed and hierarchy and prominence is duly established." />
        </div>
      </SubText>
      <div className="pt-[2.5rem]">
        <SubText
          SubHeading="Font Pairing"
          SubContent="Sometimes, it might be necessary to make use of more than one typeface. In such a case, an applicable principle is that one of the typefaces is used mostly for headings and subheadings, while the other is used for most paragraph and body text needs across the same design. Detailed research on typefaces and their compatibility will help to make informed decisions when it comes to choices of a typeface for font pairing."
          length="2"
        >
          <SubContent SubContent="Layer5 has successfully been able to implement a font pairing of Qanelas Soft for all heading and subheading text and Open Sans for all body, paragraph, and content text needs." />
        </SubText>
      </div>
      <div className="pt-[6.25rem] gap-4 flex">
        <Previous
          content="Typography System: Overview"
          parent="identity"
          child="typography"
          subchild="overview"
        />
        <div className="h-[24px] w-[16px]" />
        <Next
          content="Typography System: Code"
          parent="identity"
          child="typography"
          subchild="code"
        />
      </div>
    </>
  );
};

export default Guidance;
