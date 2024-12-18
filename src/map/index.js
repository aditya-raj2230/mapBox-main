import React from "react";

import ReactMapGL, {
  Layer,
  Marker,
  NavigationControl,
  Source,
} from "react-map-gl";
import { TOKEN } from "./Geocoder";

// -26.475393195281754, 153.04416685709924

const AppMap = ({
  mapRef,
  setNewPlace,
  newPlace,
  polygonCord,
  layerColor,
  viewport,
  setViewport,
}) => {
  const handleAddClick = (e) => {
    setNewPlace({
      lat: e?.lngLat?.lat,
      lng: e?.lngLat?.lng,
    });
  };
  const geojson = {
    type: "Feature",
    geometry: {
      type: "Polygon",
      coordinates: [polygonCord],
    },
  };

  const layerStyle = {
    id: "maine",
    type: "fill",
    source: "maine", // reference the data source
    layout: {},
    paint: {
      "fill-color": layerColor || "#0080ff", // blue color fill
      "fill-opacity": 0.5,
    },
  };
  // Add a black outline around the polygon.
  const layerOutlineStyle = {
    id: "outline",
    type: "line",
    source: "maine",
    layout: {},
    paint: {
      "line-color": "#000",
      "line-width": 3,
    },
  };

  return (
    <ReactMapGL
      ref={mapRef}
      mapboxAccessToken={TOKEN}
      initialViewState={viewport}
      onViewportChange={(viewport) => setViewport(viewport)}
      mapStyle="mapbox://styles/dmsdesigns/clid0566a000y01q14exw4ruv"
      onDblClick={handleAddClick}
      transitionDuration="200"
      attributionControl={true}
    >
      <Source id="my-data" type="geojson" data={geojson}>
        <Layer {...layerOutlineStyle} />
        <Layer {...layerStyle} />
      </Source>

      {newPlace ? (
        <Marker
          latitude={newPlace?.lat}
          longitude={newPlace?.lng}
          draggable
          onDragEnd={(e) =>
            setNewPlace({ lng: e.lngLat.lng, lat: e.lngLat.lat })
          }
        />
      ) : null}
      <NavigationControl position="bottom-right" />
    </ReactMapGL>
  );
};

export default AppMap;
