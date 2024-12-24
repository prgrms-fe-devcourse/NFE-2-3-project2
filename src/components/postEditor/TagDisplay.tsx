export default function TagDisplay({ tags }: { tags: string[] }) {
  return (
    <ul
      className="list-none p-0 m-0 w-[545px] flex flex-wrap gap-[12px] overflow-auto"
      style={{ maxWidth: "100%" }}
    >
      {tags.map((tag, index) => (
        <li
          key={index}
          className="min-w-[52px] h-[31px] text-[14px] rounded-[30px] border-2 font-medium text-primary-600 border-primary-600 font-pretendard text-center flex items-center justify-center px-[10px]"
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}
