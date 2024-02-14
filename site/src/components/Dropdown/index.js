import { useState } from 'react';
import Sidebar from '../Sidebar';

const Dropdown = () => {
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
    <Sidebar
      drop1={drop1}
      drop2={drop2}
      drop3={drop3}
      drop4={drop4}
      drop5={drop5}
      toggleChevron1={toggleChevron1}
      toggleChevron2={toggleChevron2}
      toggleChevron3={toggleChevron3}
      toggleChevron4={toggleChevron4}
      toggleChevron5={toggleChevron5}
    />
  );
};

export default Dropdown;
