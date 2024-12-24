interface ButtonComponent {
  bgcolor?: string;
  textcolor?: string;
  border?: string;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  disabledBgColor?: string;
}
