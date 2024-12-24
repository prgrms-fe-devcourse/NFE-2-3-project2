import { useEffect, useRef, useState } from "react";
import DropdownArrowIcon from "../../assets/DropdownArrowIcon";
import Dropdown from "../common/Dropdown";
import { SORT_OPTIONS } from "../../constants/dashboard";

interface SortButtonProps {
  currentSort: string;
  onSortChange: (option: string) => void;
}

export default function SortButton({
  currentSort,
  onSortChange,
}: SortButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<SortOption>(
    SORT_OPTIONS.find((option) => option.id === currentSort) || SORT_OPTIONS[0]
  );
  const ref = useRef<HTMLElement>(null);

  // currentSort prop이 변경될 때 selectedOption 업데이트
  useEffect(() => {
    const newOption = SORT_OPTIONS.find((option) => option.id === currentSort);
    if (newOption) {
      setSelectedOption(newOption);
    }
  }, [currentSort]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as HTMLElement)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleOptionClick = (option: SortOption) => {
    setSelectedOption(option);
    onSortChange(option.id);
    setIsOpen(false);
  };

  return (
    <section ref={ref} className="w-40 relative">
      <button
        type="button"
        className="flex w-full rounded-lg border border-gray-c8 dark:border-gray-c8/50 py-1 pl-3 pr-1 justify-between bg-white dark:bg-gray-22"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen((prev) => !prev);
        }}
      >
        <p className="text-gray-22 dark:text-gray-ee">{selectedOption.name}</p>
        <DropdownArrowIcon />
      </button>
      <Dropdown
        className="w-full p-3 top-10"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <ul>
          {SORT_OPTIONS.map((option) => (
            <li key={option.id} className="w-full">
              <button
                type="button"
                onClick={() => handleOptionClick(option)}
                className="hover:bg-secondary py-1 w-full text-left px-2 rounded-md hover:dark:text-gray-22"
              >
                {option.name}
              </button>
            </li>
          ))}
        </ul>
      </Dropdown>
    </section>
  );
}
