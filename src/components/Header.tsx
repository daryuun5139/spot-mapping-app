import Link from "next/link";

const Header = () => {
  return (
    <div className="fixed inset-x-0 top-0 z-[10] h-[65px] border-b border-zinc-300 bg-white py-2  dark:bg-gray-950 ">
      <div className="mx-auto flex h-full cursor-default items-end gap-3 px-8">
        <p className="rounded-lg border-2  border-r-4 border-black px-2 py-1 text-xl font-bold md:block">
          spot mapping
        </p>
      </div>
    </div>
  );
};

export default Header;
