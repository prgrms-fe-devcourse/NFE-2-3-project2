import React, { useRef, useEffect } from "react";

interface DropdownProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

const Dropdown = ({
  isOpen,
  onClose,
  children,
  className = "",
}: DropdownProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as HTMLElement)
      ) {
        onClose();
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  if (!isOpen) return null;
  return (
    <div
      ref={dropdownRef}
      className={`flex flex-col absolute border dark:border-gray-ee/50 rounded-md bg-white dark:bg-gray-22 overflow-hidden ${className}`}
    >
      {children}
    </div>
  );
};

export default Dropdown;
