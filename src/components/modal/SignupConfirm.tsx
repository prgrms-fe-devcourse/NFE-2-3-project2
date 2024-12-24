import { useNavigate } from "react-router";

interface SignupConfirmProps {
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function SignupConfirm({ setIsModalOpen }: SignupConfirmProps) {
  const navigate = useNavigate();

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black dark:bg-darkGreyDark  bg-opacity-50 dark:bg-opacity-80 flex justify-center items-center">
      <div className="bg-white p-10 rounded-md text-center font-medium dark:bg-blackDark">
        <p className="text-lg mb-4 dark:text-white">
          회원가입이 완료되었습니다.
        </p>
        <button
          onClick={() => {
            setIsModalOpen(false);
            navigate("/login");
          }}
          className="px-4 py-2 bg-[#265CAC] dark:bg-mainDark text-white dark:text-blackDark rounded-md"
        >
          확인
        </button>
      </div>
    </div>
  );
}
