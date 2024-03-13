import React from "react";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { Badge } from "../ui/badge";

type Props = {};

const CategoryScrollBar = (props: Props) => {
  const categoryList = [
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
  return (
    <ScrollArea className="w-full whitespace-nowrap px-4 pb-3 pt-2">
      <ScrollBar orientation="horizontal" />
      <div className="flex gap-2">
        {categoryList.map((item) => (
          <Badge
            key={categoryList.indexOf(item)}
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
