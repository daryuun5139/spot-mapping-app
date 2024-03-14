"use client";

import { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import MapboxLanguage from "@mapbox/mapbox-gl-language";
import { GeojsonDataType, GeojsonGroupType, RawDataType } from "@/types/spotinfo";
import { useRecoilState, useRecoilValue } from "recoil";
import { cardClicked } from "@/lib/atoms/card-clicked";
import { categoryState } from "@/lib/atoms/category-state";
import "../../style/mapping.css";

type Props = {
  geojsonData: GeojsonDataType[];
};

const MapArea = ({ geojsonData }: Props) => {
  const categoryInfo = useRecoilValue<string>(categoryState);
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

  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const language = new MapboxLanguage({
    defaultLanguage: "ja",
  });
  const markerData: GeojsonGroupType = {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: data,
    },
  };
  const [clickedCardId, setClickedCardId] = useRecoilState(cardClicked);
  const popup = new mapboxgl.Popup({
    closeButton: true,
    closeOnClick: true,
  });

  useEffect(() => {
    if (clickedCardId) {
      geojsonData.map((item) => {
        if (item.id === clickedCardId && map.current) {
          const coordinates = item.geometry.coordinates;
          const description = item.properties.description;
          popup.setLngLat([coordinates[0], coordinates[1]]).setHTML(description).addTo(map.current);
        }
      });
    }

    return () => {
      popup.remove();
    };
  }, [clickedCardId]);

  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current as HTMLElement,
      accessToken: process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [139.7527, 35.6851],
      zoom: 9,
    });

    map.current.on("render", () => {
      if (map.current) {
        map.current.resize();
      }
    });

    map.current.addControl(new mapboxgl.FullscreenControl());
    map.current.addControl(new mapboxgl.ScaleControl(), "bottom-right");
    map.current.addControl(new mapboxgl.NavigationControl(), "bottom-right");
    map.current.addControl(language);

    map.current!.on("load", () => {
      if (map.current) {
        map.current.addSource("places", markerData);

        // Add a layer showing the places.geojsonが読み込まれてから。
        map.current.addLayer({
          id: "places",
          type: "circle",
          source: "places",
          paint: {
            "circle-color": "#EA4336",
            "circle-radius": 6,
            "circle-stroke-width": 1,
            "circle-stroke-color": "#EA4336",
          },
        });
      }
    });

    // Create a popup, but don't add it to the map yet.
    const popup = new mapboxgl.Popup({
      closeButton: true,
      closeOnClick: true,
    });

    map.current.on("click", "places", (e) => {
      if (map.current) {
        // Change the cursor style as a UI indicator.
        map.current.getCanvas().style.cursor = "pointer";
        // Copy coordinates array.
        if (e.features && e.features[0].geometry.type === "Point") {
          const coordinates = e.features[0].geometry.coordinates;
          const description = e.features[0].properties!.description;
          // Ensure that if the map is zoomed out such that multiple
          // copies of the feature are visible, the popup appears
          // over the copy being pointed to.
          while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
          }
          // Populate the popup and set its coordinates
          // based on the feature found.
          popup.setLngLat([coordinates[0], coordinates[1]]).setHTML(description).addTo(map.current);
        }
      }
    });

    map.current.on("mouseenter", "places", (e) => {
      if (map.current) {
        map.current.getCanvas().style.cursor = "pointer";
      }
    });

    map.current.on("mouseleave", "places", () => {
      if (map.current) {
        map.current.getCanvas().style.cursor = "";
      }
    });

    // Clean up on unmount
    // return () => {
    //   if (map.current) {
    //     map.current.remove();
    //   }
    // };
  }, []);

  return <div className="h-full w-full" ref={mapContainer} />;
};

export default MapArea;
