import { ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";
import ArrowLeftIcon from "../../assets/ArrowLeftIcon";
import ArrowRightIcon from "../../assets/ArrowRightIcon";

interface ArrowButtonProps extends ComponentPropsWithoutRef<"button"> {
  className: string;
  left?: boolean;
  right?: boolean;
}

export default function ArrowButton({
  className,
  left = false,
  right = false,
  ...props
}: ArrowButtonProps) {
  return (
    <button
      type="button"
      className={twMerge(
        "absolute z-10 top-1/2 transform -translate-y-1/2 rounded-full drop-shadow-lg",
        props.disabled ? "bg-gray-ee" : "hover:bg-secondary bg-primary",
        className
      )}
      {...props}
    >
      {left && (
        <ArrowLeftIcon
          className="w-8 h-8"
          color={props.disabled ? "#B8B8B8" : "#222222"}
        />
      )}
      {right && (
        <ArrowRightIcon
          className="w-8 h-8"
          color={props.disabled ? "#B8B8B8" : "#222222"}
        />
      )}
    </button>
  );
}
