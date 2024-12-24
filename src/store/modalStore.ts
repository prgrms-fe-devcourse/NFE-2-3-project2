import { create } from "zustand";

interface ModalStore {
  isOpen: boolean;
  confirmText: string;
  cancelText: string;
  children?: string;
  onClose: () => void;
  onConfirm: () => void;
  setModal: (props: Partial<ModalStore>) => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  isOpen: false,
  confirmText: "",
  cancelText: "",
  children: undefined,
  onClose: () => set({ isOpen: false }), // 모달 닫기
  onConfirm: () => set({ isOpen: false }), // 모달 닫기 후 작업 수행
  setModal: (props) =>
    set((state) => ({
      ...state,
      ...props,
      onClose: () => {
        if (props.onClose) props.onClose();
        set({ isOpen: false });
      },
      onConfirm: () => {
        if (props.onConfirm) props.onConfirm();
        set({ isOpen: false });
      },
    })), // 상태 동적으로 설정
}));
