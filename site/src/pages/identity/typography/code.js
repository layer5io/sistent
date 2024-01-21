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
        <SubContent SubContent="After a suitable typeface has been chosen, it needs to be arranged to form the various fonts that will be used to address different text needs across designs." />
      </div>
      <div className="pt-[6.25rem] gap-4 flex">
        <Previous
          content="Typography: Guidelines"
          parent="identity"
          child="typography"
          subchild="guidance"
        />
        <div className="h-[24px] w-[16px]" />
        <Next content="" />
      </div>
    </>
  );
};

export default Code;
