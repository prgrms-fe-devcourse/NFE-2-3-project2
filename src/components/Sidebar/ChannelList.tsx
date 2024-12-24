import { NavLink } from "react-router";
import { twMerge } from "tailwind-merge";
import { useChannelStore } from "../../store/channelStore";
import { useEffect, useState } from "react";

export default function ChannelList() {
  const getChannels = useChannelStore((state) => state.getChannels);
  const [channels, setChannels] = useState<Channel[]>([]);

  useEffect(() => {
    const fetchChannels = async () => {
      const loadedChannels = await getChannels();
      setChannels(loadedChannels);
    };

    fetchChannels();
  }, [getChannels]);

  return (
    <section className="h-1/2 max-h-fit overflow-y-hidden flex flex-col">
      <h2 className="border-b border-gray-22 dark:border-gray-ee/50 py-2 mb-2.5 dark:text-gray-ee">
        카테고리
      </h2>
      <div className="flex flex-col gap-1 overflow-y-auto custom-scrollbar">
        {channels.map((channel) => (
          <NavLink
            key={channel._id}
            to={`/channels/${channel.name}`}
            className={({ isActive }) =>
              twMerge(
                "flex items-center shrink-0 h-11 px-7 py-1 rounded-lg transition-colors",
                isActive
                  ? "bg-primary dark:text-gray-22"
                  : "hover:bg-secondary dark:hover:text-gray-22"
              )
            }
          >
            {channel.name}
          </NavLink>
        ))}
      </div>
    </section>
  );
}
