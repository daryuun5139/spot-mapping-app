import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { GeojsonDataType } from "@/types/spotinfo";

type Props = {
  geojsonData: GeojsonDataType[];
};

const CardScrollHorizontal = ({ geojsonData }: Props) => {
  return (
    <>
      <ScrollArea className="flex w-full px-3 py-2 lg:hidden">
        <ScrollBar orientation="horizontal" />
        <div className="flex gap-3">
          {geojsonData.map((item) => (
            <Card className="h-52 w-60" key={item.id}>
              <CardContent className="h-full overflow-scroll p-3">
                <div>
                  <h2 className="font-bold">{item.properties.name}</h2>
                  <div className="text-sm">
                    <p className="pb-1">{item.properties.category}</p>
                    <p className="pb-1">{item.properties.address.slice(10)}</p>
                    <p className="pb-1">営業時間：{item.properties.hours}</p>
                    <p className="pb-1">駐車場：{item.properties.parking > 0 ? "あり" : "なし"}</p>
                    <img src={item.properties.images[0].url} className="rounded-sm pt-1" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </>
  );
};

export default CardScrollHorizontal;
