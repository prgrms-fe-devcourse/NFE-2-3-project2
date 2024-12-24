import Logo from "../../assets/Logo";
import { Link } from "react-router";

export default function LogoButton() {
  return (
    <Link to="/">
      <h1>
        <Logo className="w-auto h-16" />
      </h1>
    </Link>
  );
}
