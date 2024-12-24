export default function Tag({ children }: { children: string }) {
  return (
    <>
      <div className="flex items-center justify-center h-9 w-[101px] rounded-[20px] bg-[#E7EFFA]">
        {children}
      </div>
    </>
  );
}
