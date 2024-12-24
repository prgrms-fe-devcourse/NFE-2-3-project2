import { create } from "zustand";

interface ToastStore {
  isToastVisible: boolean;
  toastMessage: string;
  showToast: (message: string, duration?: number) => void;
  hideToast: () => void;
}

export const useToastStore = create<ToastStore>((set) => ({
  isToastVisible: false,
  toastMessage: "",
  showToast: (message, duration = 1500) => {
    set({ isToastVisible: true, toastMessage: message });
    // 지정된 시간 후 토스트 자동 숨김
    setTimeout(
      () => set({ isToastVisible: false, toastMessage: "" }),
      duration
    );
  },
  hideToast: () => set({ isToastVisible: false, toastMessage: "" }),
}));
