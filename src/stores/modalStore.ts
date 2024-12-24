import { create } from "zustand";
type ModalOpts = {
  message: string;
  btnText: string; //
  btnColor: string; // main | red
  onClick?: () => void;
  isOneBtn?: boolean;
};

interface ModalStore {
  modalOpen: boolean;
  modalOpts: ModalOpts;
  setModalOpen: (open: boolean, opts?: ModalOpts) => void;
}

export const useModal = create<ModalStore>((set) => ({
  modalOpen: false,
  modalOpts: {
    message: "정말로 포스트를 삭제하시겠습니까?",
    btnText: "삭제",
    btnColor: "main",
    isOneBtn: false,
  },
  setModalOpen: (open, opts) =>
    set((state) => ({
      modalOpen: open,
      modalOpts: opts ? { isOneBtn: false, ...opts } : state.modalOpts,
    })),
}));
