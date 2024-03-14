"use client";

import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { Badge } from "../ui/badge";
import { useRecoilState } from "recoil";
import { categoryState } from "@/lib/atoms/category-state";
import { ChangeEvent, useEffect } from "react";

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
  const onClick = (e: ChangeEvent<HTMLInputElement>) => {
    setCategoryInfo(e.currentTarget.value);
  };

  return (
    <ScrollArea className="w-full whitespace-nowrap px-4 pb-2">
      <ScrollBar orientation="horizontal" />
      <div className="flex items-center gap-2">
        {categoryList.map((item) => (
          <div key={item} className="py-1">
            <input
              type="radio"
              id={item}
              className="peer hidden"
              name="categoryOption"
              value={item}
              onChange={onClick}
            />
            <label
              htmlFor={item}
              className="w-fit cursor-pointer rounded-xl border-[1px] border-black bg-white px-3 py-1 text-sm text-black hover:opacity-50 peer-checked:bg-slate-200"
            >
              {item}
            </label>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

export default CategoryScrollBar;
