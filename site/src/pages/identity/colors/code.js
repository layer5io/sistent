import Next from '../Next';
import Previous from '../Previous';
import Sidebar from '../Sidebar';
import SubContent from '../SubContent';

const items = [
  {
    title: 'Introduction'
  }
];

const Code = () => {
  return (
    <>
      <Sidebar items={items} />
      <div className="py-[2.5rem]">
        <SubContent SubContent="Having a color palette is one thing, and organizing it into usable content for cross-functional teams is another. Suffice to say that without proper structure, a good tonal palette can still be unproductive if the target audience have no clue what to do with it. We have organized color into a consumable form to ensure efficient and accurate application in order to achieve desired results." />
      </div>
      <div className="pt-[6.25rem] gap-4 flex">
        <Previous
          content="Color System: Guidelines"
          parent="identity"
          child="color"
          subchild="guidance"
        />
        <div className="h-[24px] w-[16px]" />
        <Next
          content="Typography System: Overview"
          parent="identity"
          child="typography"
          subchild="overview"
        />
      </div>
    </>
  );
};

export default Code;
