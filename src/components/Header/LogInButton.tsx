import { Link } from "react-router";

export default function LogInButton() {
  return (
    <Link to="/login">
      <button
        type="button"
        className="w-[106px] h-10 rounded-full primary-btn text-base font-medium"
      >
        로그인
      </button>
    </Link>
  );
}
