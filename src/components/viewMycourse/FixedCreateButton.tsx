import { NavLink } from "react-router-dom";

import images from "../../assets/images/importImages";

export default function FixedCreateButton() {
  return (
    <button className="fixed bottom-[100px] left-1/2 transform -translate-x-[calc(50%-324px)] z-[999]">
      <NavLink
        to="/my-course-builder"
        className="flex items-center justify-center"
      >
        <div className="relative w-[64px] h-[64px] border-[3px] bg-primary-500 rounded-full flex items-center justify-center shadow-lg hover:opacity-100 opacity-70">
          <img src={images.plus_white_icon} alt="plus_white_icon" />
        </div>
      </NavLink>
    </button>
  );
}
