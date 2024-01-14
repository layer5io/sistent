import { Link } from 'gatsby';
import React, { useState } from 'react';

const Dropdown = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <div className="dropdown" onClick={toggleDropdown}>
        <div>{props.children}</div>
        <div>D</div>
      </div>
      {isOpen && (
        <ul className="children">
          {props.items.map((item) => (
            <li className="child-item">
              <Link to={item.path}>{item.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Dropdown;
