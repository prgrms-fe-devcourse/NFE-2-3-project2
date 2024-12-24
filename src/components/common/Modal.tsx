import { createPortal } from "react-dom";
import { useModalStore } from "../../store/modalStore";

export default function Modal() {
  const { isOpen, confirmText, cancelText, children, onClose, onConfirm } =
    useModalStore();
  if (!isOpen) return null; // 모달이 닫힌 상태라면 렌더링하지 않음

  return createPortal(
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="min-w-[500px] min-h-[261px] px-[100px] pt-20 pb-[60px] bg-white rounded-xl shadow-xl flex flex-col items-center gap-12">
        <p className="text-center font-semibold text-gray-22 text-xl whitespace-pre-wrap">
          {children}
        </p>
        <div className="self-stretch flex items-center gap-5">
          <button
            type="button"
            onClick={onConfirm}
            className="grow shrink basis-0 h-10 rounded-full justify-center items-center flex text-base font-medium primary-btn"
          >
            {confirmText}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="grow shrink basis-0 h-10 rounded-full justify-center items-center flex text-base font-medium cancel-btn"
          >
            {cancelText}
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("modal")!
  );
}
