import { twMerge } from "tailwind-merge";

import React from "react";

const ButtonComponent: React.FC<ButtonComponent> = ({
  bgcolor,
  textcolor,
  border,
  children,
  onClick,
  disabled,
  disabledBgColor,
}) => {
  return (
    <button
      onClick={onClick}
      className={twMerge(
        `w-[120px] h-[36px] rounded-[10px] flex justify-center items-center cursor-pointer font-bold`,
        bgcolor,
        disabled ? disabledBgColor : bgcolor,
        border,
        textcolor
      )}
    >
      {children}
    </button>
  );
};

export default ButtonComponent;
