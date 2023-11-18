import Next from '../Next';
import Previous from '../Previous';
import Sidebar from '../Sidebar';
import SubContent from '../SubContent';
import SubText from '../SubText';

const items = [
  {
    title: 'Basic Colors'
  },
  {
    title: 'Tonal Palettes'
  },
  {
    title: 'Token Specification'
  },
  {
    title: 'Color Roles'
  },
  {
    title: 'Background Colors'
  },
  {
    title: 'Text Colors'
  },
  {
    title: 'Border Colors'
  }
];

const Guidance = () => {
  return (
    <>
      <Sidebar items={items} />
      <div className="py-[2.5rem]">
        <SubContent SubContent="Having a color palette is one thing, and organizing it into usable content for cross-functional teams is another. Suffice to say that without proper structure, a good tonal palette can still be unproductive if the target audience have no clue what to do with it. We have organized color into a consumable form to ensure efficient and accurate application in order to achieve desired results." />
      </div>
      <SubText
        SubHeading="Tonal Palettes"
        SubContent="To attain the desired level of variation across themes, we will have to utilize more than just the hues on a brand’s color palette. It therefore becomes necessary to employ the use of tonal pallets. Tonal palettes are variations of a given hue comprising of the hue’s tints and shades. Armed with this array of harmonious colors, it becomes easier to combine them to actualize different UI elements or states, website pages and various products across any desired number of themes."
        height="72.5"
      >
        <SubContent SubContent="These hues are organized into different levels of brightness and arranged in ranges of 10-90 (total of nine) for neutrals and 10-70 (total of seven) for brand colors, as well as all other hues in our color system. This structure will enable cohesive combinations across all implemented designs. With a base hue of ‘code-40’, tints and shades  are derived to complete the spectrum range.. These color selections are further supported by alert colors that complement the base Keppel Green. Blue, Green, Yellow, and Red hues were chosen for this." />
        <div className="py-[1.5rem] h-[46rem]"></div>
      </SubText>
      <div className="pt-[6.25rem] gap-4 flex">
        <Previous
          content="Color System: Overview"
          parent="identity"
          child="color"
          subchild="overview"
        />
        <div className="h-[24px] w-[16px]" />
        <Next content="Color System: Code" parent="identity" child="color" subchild="code" />
      </div>
    </>
  );
};

export default Guidance;
