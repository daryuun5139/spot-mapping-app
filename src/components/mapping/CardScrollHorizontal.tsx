"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { GeojsonDataType } from "@/types/spotinfo";
import { useRecoilState, useRecoilValue } from "recoil";
import { cardClicked } from "@/lib/atoms/card-clicked";
import { categoryState } from "@/lib/atoms/category-state";

type Props = {
  geojsonData: GeojsonDataType[];
};

const CardScrollHorizontal = ({ geojsonData }: Props) => {
  const [cardInfo, setCardInfo] = useRecoilState<string>(cardClicked);
  const categoryInfo = useRecoilValue<string>(categoryState);
  const onClick = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    setCardInfo(e.currentTarget.id);
  };

  const dataFilter = (geojsonData: GeojsonDataType[]) => {
    let list: GeojsonDataType[] = [];
    if (categoryInfo === "すべて") {
      return {
        data: geojsonData,
      };
    }
    geojsonData.map((item: GeojsonDataType) => {
      if (item.properties.category[0] === categoryInfo) {
        list.push(item);
      }
    });
    return {
      data: list,
    };
  };
  const { data } = dataFilter(geojsonData);

  return (
    <div className="flex w-full px-3 py-2 lg:hidden">
      {data[0] ? (
        <ScrollArea>
          <ScrollBar orientation="horizontal" />
          <div className="flex gap-3">
            {geojsonData.map((item) => (
              <Card
                className="h-52 w-60 cursor-pointer duration-200 hover:opacity-50"
                key={item.id}
                id={item.id}
                onClick={onClick}
              >
                <CardContent className="h-full overflow-scroll p-3">
                  <div>
                    <h2 className="font-bold">{item.properties.name}</h2>
                    <div className="text-sm">
                      <p className="pb-1">{item.properties.category}</p>
                      <p className="pb-1">{item.properties.address.slice(10)}</p>
                      <p className="pb-1">営業時間：{item.properties.hours}</p>
                      <p className="pb-1">
                        駐車場：{item.properties.parking > 0 ? "あり" : "なし"}
                      </p>
                      <img src={item.properties.images[0].url} className="rounded-sm pt-1" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      ) : (
        <Card className="h-52 w-full">
          <CardContent className="flex h-full items-center justify-center p-3">
            <p className="flex ">登録情報がありません</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CardScrollHorizontal;
