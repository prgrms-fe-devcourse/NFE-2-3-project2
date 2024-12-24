interface ToastProps {
  isVisible: boolean;
  message: string;
}

export function Toast({ isVisible, message }: ToastProps) {
  if (!isVisible) return null; // Toast가 보이지 않을 때 렌더링하지 않음
  return (
    <div className="toast fixed bottom-20 left-1/2 transform -translate-x-1/2 px-10 py-4 min-w-[500px] rounded-xl flex justify-center items-center z-50 bg-white shadow-xl border dark:bg-[#393939] dark:border-gray-6c">
      <div className="text-center text-base font-medium whitespace-pre-wrap">
        {message}
      </div>
    </div>
  );
}
