"use client";

import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { Badge } from "../ui/badge";
import { useRecoilState } from "recoil";
import { categoryState } from "@/lib/atoms/category-state";

type Props = {};

const categoryList = [
  "すべて",
  "カフェ",
  "バー",
  "ファミレス",
  "ラーメン",
  "その他飲食",
  "スパ",
  "映画",
  "ショッピングモール",
  "夜景",
  "その他",
];

const CategoryScrollBar = (props: Props) => {
  const [categoryInfo, setCategoryInfo] = useRecoilState<string>(categoryState);
  const onClick = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    setCategoryInfo(e.currentTarget.innerHTML);
  };

  return (
    <ScrollArea className="w-full whitespace-nowrap px-4 pb-2">
      <ScrollBar orientation="horizontal" />
      <div className="flex items-center gap-2">
        {categoryList.map((item) => (
          <Badge
            key={categoryList.indexOf(item)}
            onClick={onClick}
            className="w-fit cursor-pointer border-[1px] border-black bg-white px-3 py-1 text-black hover:bg-white hover:opacity-50"
          >
            {item}
          </Badge>
        ))}
      </div>
    </ScrollArea>
  );
};

export default CategoryScrollBar;
