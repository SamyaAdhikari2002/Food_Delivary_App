import React from "react";

import { MdMenu } from "react-icons/md";
const Toolbar = ({ openSidebar }) => {
  return (
    <div className="tool-bar">
      <div>
        <button onClick={openSidebar}>
          <MdMenu />
        </button>
      </div>
    </div>
  );
};
export default Toolbar;
