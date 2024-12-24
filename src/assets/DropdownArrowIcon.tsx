export default function DropdownArrowIcon({
  className,
  color = "#777777",
}: IconProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M12 15L7 10H17L12 15Z" fill={color} />
    </svg>
  );
}
