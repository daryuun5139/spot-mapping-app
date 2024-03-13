import type { MicroCMSImage } from "microcms-js-sdk";

export type RawDataType = {
  id: string;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
  revisedAt?: string;
  type: ["Feature"];
  properties: {
    fieldId?: "properties";
    name: string;
    category: string[];
    address: string;
    hours: string;
    tell: string;
    parking: number;
    description: string;
    images: MicroCMSImage[];
  };
  geometry: {
    fieldId?: "geometry";
    type: ["Point"];
    coordinates: [
      {
        fieldId?: "coordinates";
        longitude: number;
        latitude: number;
      },
    ];
  };
};

export type selectedDataType = {
  id: string;
  type: "Feature";
  properties: {
    fieldId?: "properties";
    name: string;
    category: string[];
    address: string;
    hours: string;
    tell: string;
    parking: number;
    description: string;
    images: MicroCMSImage[];
  };
  geometry: {
    type: "Point";
    coordinates: [longitude: number, latitude: number];
  };
};

export type GeojsonDataType = {
  id: string;
  type: "Feature";
  properties: {
    name: string;
    category: string[];
    address: string;
    hours: string;
    tell: string;
    parking: number;
    description: string;
    images: MicroCMSImage[];
  };
  geometry: {
    type: "Point";
    coordinates: [longitude: number, latitude: number];
  };
};

export type GeojsonGroupType = {
  type: "geojson";
  data: {
    type: "FeatureCollection";
    features: GeojsonDataType[];
  };
};
