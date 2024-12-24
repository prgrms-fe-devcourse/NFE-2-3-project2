import { create } from "zustand";
import { axiosInstance } from "../api/axios";
import { persist } from "zustand/middleware";

interface ChannelStore {
  channels: Channel[];
  isLoaded: boolean;
  fetchChannels: () => void;
  waitForChannelsToLoad: () => Promise<void>;
  getChannels: () => Promise<Channel[]>;
  getIdFromName: (name: string) => Promise<string | undefined>;
  getNameFromId: (id: string) => Promise<string | undefined>;
}

export const useChannelStore = create<ChannelStore>()(
  persist(
    (set, get, api) => ({
      channels: [],
      isLoaded: false,
      fetchChannels: async () => {
        try {
          const { data } = await axiosInstance.get("/channels");
          set({ channels: data, isLoaded: true });
        } catch (error) {
          console.error("채널 정보를 가져오는데 실패했습니다", error);
        }
      },
      waitForChannelsToLoad: async () => {
        if (!get().isLoaded) {
          await new Promise<void>((resolve) => {
            const unsubscribe = api.subscribe((state) => {
              const isLoaded: boolean = state.isLoaded;
              if (isLoaded) {
                unsubscribe();
                resolve();
              }
            });
          });
        }
      },
      getChannels: async () => {
        await get().waitForChannelsToLoad();
        return get().channels;
      },
      getIdFromName: async (name) => {
        await get().waitForChannelsToLoad();
        const targetChannel = get().channels.find(
          (channel) => channel.name === name
        );
        return targetChannel?._id;
      },
      getNameFromId: async (id) => {
        await get().waitForChannelsToLoad();
        const targetChannel = get().channels.find(
          (channel) => channel._id === id
        );
        return targetChannel?.name;
      },
    }),
    {
      name: "channels",
    }
  )
);
