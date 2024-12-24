import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import DropdownArrowIcon from "../../assets/DropdownArrowIcon";
import Dropdown from "../common/Dropdown";
import { useChannelStore } from "../../store/channelStore";

interface CategoryDropdownProps {
  channel?: Channel;
  setChannel: React.Dispatch<React.SetStateAction<Channel | undefined>>;
}

export default function CategoryButton({
  channel,
  setChannel,
}: CategoryDropdownProps) {
  const [channels, setChannels] = useState<Channel[]>();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const getChannels = useChannelStore((state) => state.getChannels);

  useEffect(() => {
    const fetchChannelList = async () => {
      const channelList = await getChannels();
      setChannels(channelList ?? []);
    };
    fetchChannelList();

    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as HTMLElement)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleOptionClick = (channel: Channel) => {
    setChannel(channel);
    setIsOpen(false);
  };

  return (
    <section ref={ref} className="w-40 relative">
      <button
        type="button"
        className="flex w-full rounded-lg border border-gray-c8 dark:border-gray-c8/50 py-1 pl-3 pr-1 justify-between bg-white dark:bg-gray-22"
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen((prev) => !prev);
        }}
      >
        <p
          className={twMerge(
            channel
              ? "text-gray-22 dark:text-gray-ee"
              : "text-[#777] dark:text-gray-c8"
          )}
        >
          {channel?.name ?? "--- 선택 ---"}
        </p>
        <DropdownArrowIcon />
      </button>
      <Dropdown
        className="w-full p-3 top-10"
        isOpen={isOpen}
        onClose={() => setIsOpen((prev) => !prev)}
      >
        <ul>
          {channels?.map((channel) => (
            <li key={`channels-${channel._id}`} className="w-full">
              <button
                type="button"
                onClick={() => handleOptionClick(channel)}
                className="hover:bg-secondary py-1 w-full text-left px-2 rounded-md hover:dark:text-gray-22"
              >
                {channel.name}
              </button>
            </li>
          ))}
        </ul>
      </Dropdown>
    </section>
  );
}
