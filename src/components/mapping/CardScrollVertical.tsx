"use client";

import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { GeojsonDataType } from "@/types/spotinfo";
import { useRecoilState, useRecoilValue } from "recoil";
import { cardClicked } from "@/lib/atoms/card-clicked";
import { categoryState } from "@/lib/atoms/category-state";

type Props = {
  geojsonData: GeojsonDataType[];
};

const CardScrollVertical = ({ geojsonData }: Props) => {
  const [cardInfo, setCardInfo] = useRecoilState<string>(cardClicked);
  const categoryInfo = useRecoilValue<string>(categoryState);
  const onClick = (e: React.MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    setCardInfo(e.currentTarget.id);
  };

  const dataFilter = (geojsonData: GeojsonDataType[]): GeojsonDataType[] => {
    let list: GeojsonDataType[] = [];
    if (categoryInfo === "すべて") {
      return geojsonData;
    }
    geojsonData.map((item: GeojsonDataType) => {
      if (item.properties.category[0] === categoryInfo) {
        list.push(item);
      }
    });
    return list;
  };

  const data: GeojsonDataType[] = dataFilter(geojsonData);

  return (
    <div className="relative hidden h-full w-[38%] px-3 py-2 lg:flex xl:w-[430px]">
      {data[0] ? (
        <ScrollArea>
          {data.map((item) => {
            return (
              <Card
                className="mb-4 h-full cursor-pointer duration-200 hover:opacity-50"
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
                      <p className="pb-1">
                        駐車場：{item.properties.parking > 0 ? "あり" : "なし"}
                      </p>
                    </div>
                  </div>
                  <div className="w-1/2">
                    <img src={item.properties.images[0].url} className="h-full rounded-sm" />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </ScrollArea>
      ) : (
        <p className="absolute left-1/3 top-1/3">登録情報がありません</p>
      )}
    </div>
  );
};

export default CardScrollVertical;
