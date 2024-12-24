export default function ArrowLeftIcon({
  className,
  color = "#1D1B20",
}: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <path
        d="M14 18L8 12L14 6L15.4 7.4L10.8 12L15.4 16.6L14 18Z"
        fill={color}
      />
    </svg>
  );
}
