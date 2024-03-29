import CardScrollVertical from "@/components/mapping/CardScrollVertical";
import CardScrollHorizontal from "@/components/mapping/CardScrollHorizontal";
import MapArea from "@/components/mapping/MapArea";
import { convertToGeojson } from "@/lib/dataQuery";
import { GeojsonDataType } from "@/types/spotinfo";
import CategoryScrollBar from "@/components/mapping/CategoryScrollBar";

export default async function Home() {
  const geojsonData: GeojsonDataType[] = await convertToGeojson();

  return (
    <div className="flex h-[calc(100%)] w-full flex-col p-3 lg:h-[calc(100%-90px)]">
      <div className="flex">
        <CategoryScrollBar />
      </div>
      <div className="flex h-full flex-col justify-between lg:flex-row">
        <CardScrollVertical geojsonData={geojsonData} />
        <div className="flex grow px-3 py-2">
          <div className="mx-auto flex w-full overflow-hidden rounded-2xl">
            <MapArea geojsonData={geojsonData} />
          </div>
        </div>
        <CardScrollHorizontal geojsonData={geojsonData} />
      </div>
    </div>
  );
}
