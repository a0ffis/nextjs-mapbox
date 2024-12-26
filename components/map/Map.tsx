import { useEffect, useRef } from "react";
import mapboxgl, { Map, Popup, Marker } from "mapbox-gl";

mapboxgl.accessToken = String(process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN);

interface Location {
  id: string;
  name: string;
  point: string; // GeoJSON format string for the point
  area: string; // GeoJSON format string for the polygon
}

export default function Map() {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Initialize the map
    const map: Map = new mapboxgl.Map({
      container: mapContainerRef.current!,
      style: "mapbox://styles/mapbox/navigation-night-v1",
      // style: 'mapbox://styles/mapbox/streets-v12',
      center: [100.523186, 13.736717], // Thailand coordinates
      zoom: 14,
    });

    return () => {
      map.remove(); // Cleanup map on component unmount
    };
  }, []);

  return <div ref={mapContainerRef} style={{ height: "100dvh" }} />;
}
