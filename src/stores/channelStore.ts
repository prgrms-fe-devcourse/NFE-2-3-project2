import { create } from "zustand";

interface ChannelStore {
  channelId: string;
  setChannelId: (channelId: string) => void;
}

export const useChannelStore = create<ChannelStore>((set) => ({
  channelId: "675a2e0d0d335f0ddae3a194",
  setChannelId: (channelId: string) => set({ channelId }),
}));
