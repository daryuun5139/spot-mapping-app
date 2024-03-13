"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { GeojsonDataType } from "@/types/spotinfo";
import { useRecoilState } from "recoil";
import { cardClicked } from "@/lib/atoms/card-clicked";

type Props = {
  geojsonData: GeojsonDataType[];
};

const CardScrollVertical = ({ geojsonData }: Props) => {
  const [cardInfo, setCardInfo] = useRecoilState(cardClicked);
  const onClick = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault(); //これ入れるとonclick機能した。
    // if (!(e.currentTarget instanceof HTMLInputElement)) {
    //   return;
    // }
    setCardInfo(e.currentTarget.id);
    // console.log(e.currentTarget.id);
  };
  return (
    <>
      <ScrollArea className="hidden w-[38%] px-3 py-2 lg:block xl:w-[430px]">
        {geojsonData.map((item) => (
          <Card
            className="mb-4 h-48 cursor-pointer duration-200 hover:opacity-50"
            key={item.id}
            id={item.id}
            onClick={onClick}
          >
            <CardContent className="flex h-full justify-between p-3">
              <div>
                <h2 className="pb-1 font-bold">{item.properties.name}</h2>
                <div className="text-sm">
                  <p className="pb-1">{item.properties.category}</p>
                  <p className="pb-1">{item.properties.address.slice(10)}</p>
                  <p className="pb-1">TELL：{item.properties.tell}</p>
                  <p className="pb-1">営業時間：{item.properties.hours}</p>
                  <p className="pb-1">駐車場：{item.properties.parking > 0 ? "あり" : "なし"}</p>
                </div>
              </div>
              <div className="w-1/2">
                <img src={item.properties.images[0].url} className="h-full rounded-sm" />
              </div>
            </CardContent>
          </Card>
        ))}
      </ScrollArea>
    </>
  );
};

export default CardScrollVertical;
