import { GeojsonDataType, RawDataType, selectedDataType } from "@/types/spotinfo";
import { createClient } from "microcms-js-sdk";
import type { MicroCMSQueries } from "microcms-js-sdk";

// MicroCMSからデータを取ってくる設定
export const client = createClient({
  serviceDomain: "56s9egxcfm",
  apiKey: process.env.MICROCMS_API_KEY || "",
});

// MicroCMSからデータを取得
export const getList = async (queries?: MicroCMSQueries) => {
  const allData = await client.getList<RawDataType>({
    customRequestInit: {
      // cache: "no-store",
    },
    endpoint: "spotinfo",
    queries,
  });
  return {
    allData: allData.contents,
  };
};

// MicroCMSのデータをGeoJSON形式に変換
export const convertToGeojson = async () => {
  const { allData } = await getList();
  // MicroCMSのデータの一部分を抽出
  const selectedData = allData.map(
    (data: RawDataType): selectedDataType => ({
      id: data.id,
      type: data.type[0],
      properties: data.properties,
      geometry: {
        type: data.geometry.type[0],
        coordinates: [
          data.geometry.coordinates[0].longitude,
          data.geometry.coordinates[0].latitude,
        ],
      },
    })
  );
  // MicroCMSのデータの一部分を削除、変換
  const geoJsonData = selectedData.map((data): GeojsonDataType => {
    delete data.properties.fieldId;
    for (let i in data.properties.images) {
      delete data.properties.images[i].height;
      delete data.properties.images[i].width;
    }
    data.properties.description =
      "<div>" +
      '<img class="image"src="' +
      data.properties.images[0].url +
      '"/>' +
      "<div class='text-box'>" +
      '<p class="name">' +
      data.properties.name +
      "</p>" +
      '<p class="description">' +
      data.properties.description +
      "</p>" +
      "</div>" +
      "</div>";
    return data;
  });
  return geoJsonData;
};
