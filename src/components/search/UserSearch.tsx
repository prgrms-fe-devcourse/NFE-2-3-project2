import { useState, useEffect, FormEvent } from "react";
import { getUsers } from "../../api/users";
import images from "../../assets";
import UserItem from "../user/UserItem";
import useDebounce from "../../hooks/useDebounce";
import { getSearchUsers } from "../../api/search";
import UserItemSkeleton from "../common/skeleton/UserItemSkeleton";
import { useUserStore } from "../../stores/userStore";

export default function UserSearch({ toggleOpen }: { toggleOpen: () => void }) {
  const [value, setValue] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [users, setUsers] = useState<User[]>([]);
  const onlineUsers = useUserStore((state) => state.onlineUsers);

  const debouncedValue = useDebounce(value.trim());

  const fetchUsers = async (query?: string) => {
    try {
      setLoading(true);
      const data = query ? await getSearchUsers(query) : await getUsers();
      const onlineIds = new Set(onlineUsers.map((user) => user._id));

      setUsers(
        data.sort((user1, user2) => {
          const isInB1 = onlineIds.has(user1._id);
          const isInB2 = onlineIds.has(user2._id);

          if (isInB1 && !isInB2) return -1;
          if (!isInB1 && isInB2) return 1;
          return 0;
        })
      );
    } catch (err) {
      console.error(err);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };

  useEffect(() => {
    fetchUsers(debouncedValue as string);
  }, [debouncedValue]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (value) fetchUsers(value.trim());
  };

  return (
    <div className="fixed top-0 left-0 bottom-0 right-0 bg-black/50 flex items-center justify-center z-[9999]">
      <article className="w-[calc(100%-32px)] max-w-[600px] bg-white dark:bg-grayDark pt-5 pb-[30px] rounded-[8px] flex flex-col md:px-5 px-[44px]">
        <div className="flex justify-end mb-5">
          <button onClick={toggleOpen}>
            <img className="dark:invert" src={images.Close} alt="close icon" />
          </button>
        </div>
        <form
          onSubmit={handleSubmit}
          onKeyDown={(e) => {
            if (e.key === "Enter") e.preventDefault();
          }}
          className="relative mb-5"
        >
          <label htmlFor="search" className="absolute top-[18px] left-[15px]">
            <img
              src={images.Search}
              alt="search icon"
              className="w-[18px] h-[18px]"
            />
          </label>
          <input
            id="search"
            className="w-full border rounded-[8px] border-main pl-[45px] pr-[30px] py-[15px] placeholder:text-sm focus:outline-none placeholder:text-gray dark:bg-grayDark dark:placeholder:text-whiteDark"
            placeholder="사용자를 검색해 보세요"
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
        </form>
        <div className="flex-1 max-h-[450px] scroll overflow-y-auto">
          {loading ? (
            <div className="w-full text-lg font-bold h-[450px] flex flex-col gap-5">
              {Array(5)
                .fill(0)
                .map((_, idx) => (
                  <UserItemSkeleton key={`search-user-${idx}`} />
                ))}
            </div>
          ) : (
            <ul className="flex flex-col gap-5 h-[450px]">
              {users.length ? (
                <>
                  {users.map((user) => (
                    <UserItem
                      key={user._id}
                      user={user}
                      onClick={() => toggleOpen()}
                    />
                  ))}
                </>
              ) : (
                <li className="h-[450px] flex items-center justify-center text-sm ">
                  사용자가 존재하지 않습니다
                </li>
              )}
            </ul>
          )}
        </div>
      </article>
    </div>
  );
}
