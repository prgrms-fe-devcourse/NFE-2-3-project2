export default function SearchResultOfCreateMyItems({
  index,
  placeName,
  category,
  contact,
  location,

  onSelect,
}: {
  index: number;
  placeName: string;
  category: string;
  contact: string;
  location: string;

  onSelect: () => void;
}) {
  return (
    <div
      onClick={() => {
        onSelect();
      }}
      id="searched-items--createcourse"
      className={`w-[416px] h-[70px] rounded-[15px] shadow-default bg-white font-pretendard`}
    >
      <div className="text-custom-black leading-5 flex flex-row justify-between ml-[21px] mr-[26px] mt-[14px] mb-[5px]">
        <p className="overflow-hidden max-w-44 font-semiBold text-ellipsis whitespace-nowrap">
          {index + 1}. {placeName}
        </p>
        <p className="overflow-hidden max-w-44 text-ellipsis whitespace-nowrap text-[14px]">
          {category}
        </p>
      </div>
      <div className="text-custom-gray flex flex-row justify-between ml-[21px] mr-[21px] mb-[10px]">
        <p className="overflow-hidden max-w-44 text-ellipsis whitespace-nowrap text-[14px]">
          {contact}
        </p>
        <p className="overflow-hidden max-w-44 text-ellipsis whitespace-nowrap text-[14px]">
          {location}
        </p>
      </div>
    </div>
  );
}
