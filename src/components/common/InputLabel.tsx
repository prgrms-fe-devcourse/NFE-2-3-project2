import { twMerge } from "tailwind-merge";
import EyeIcon from "../../assets/EyeIcon";
import { useState } from "react";

interface InputLabelProps extends React.ComponentPropsWithoutRef<"input"> {
  label: string;
  id: string;
  type: string;
  errorMessage?: string;
  isWarning?: boolean;
  password?: boolean;
}
export default function InputLabel({
  label,
  id,
  type,
  errorMessage,
  isWarning,
  password = false,
  ...props
}: InputLabelProps) {
  const [isShown, setIsShown] = useState(false);

  return (
    <fieldset className="w-[400px] flex flex-col gap-1">
      <label htmlFor={id} className="text-sm text-gray-22">
        {label}
      </label>
      <div className="flex gap-2 items-center w-full py-2 px-6 focus-within:border-primary rounded-full border border-gray-c8 dark:border-gray-c8/50 dark:bg-white/10">
        <input
          id={id}
          type={password && isShown ? "text" : type}
          className="w-full text-sm bg-transparent"
          {...props}
        />
        {password && (
          <button type="button" onClick={() => setIsShown((prev) => !prev)}>
            <EyeIcon className="w-4 h-4" isShown={isShown} />
          </button>
        )}
      </div>
      <p
        className={twMerge(
          "text-xs h-4",
          isWarning ? "text-red-accent" : "text-transparent select-none"
        )}
      >
        {errorMessage ?? props.placeholder + "."}
      </p>
    </fieldset>
  );
}
