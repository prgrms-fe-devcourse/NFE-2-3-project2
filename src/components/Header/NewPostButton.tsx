import { Link } from "react-router";

const NewPostButton = () => (
  <Link to="/write">
    <button
      type="button"
      className="w-[106px] h-10 rounded-full primary-btn text-base font-medium"
    >
      새 포스팅
    </button>
  </Link>
);

export default NewPostButton;
